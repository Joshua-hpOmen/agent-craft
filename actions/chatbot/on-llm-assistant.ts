"use server"

import { db } from "@/lib/prisma"
import { extractEmailsFromString, extractURLFromString } from "@/lib/utils"
import { onRealTimeChat } from "../conversations/on-real-time-chat"
import { clerkClient } from "@clerk/nextjs/server"
import { onMailer } from "../mailer/on-mailer"
import { onStoreConversation } from "./on-store-conversations"
import { groq } from "@/lib/grok-instance"
import { cuid, uuid } from "zod"


export const onLLMAssistant = async (id: string, chat: { role: "assistant" | "user", content: string }[], author: "user", message: string, customerId: string | null) => {

    try {

        const chatBotDomain = await db.domain.findUnique({
            where: { id },
            select: {
                name: true,
                filterQuestions: {
                    where: { answered: null },
                    select: { question: true },
                }
            }
        })

        if (chatBotDomain) {
            const extractdEmail = extractEmailsFromString(message);

            let isCustomer = false;

            try {
                if(customerId) isCustomer = !!(await db.customer.findUnique({where: {id: customerId}}))?.id;
            } catch (error) {
                console.log("🔴There was an error and the customerId is not valid", error);
            }

            if (!!extractdEmail[0] || !!isCustomer) {

                if (!customerId) {

                    const newCustomer = await db.domain.update({
                        where: { id },
                        data: {
                            customer: {
                                create: {
                                    email: extractdEmail[0],
                                    questions: {
                                        create: chatBotDomain.filterQuestions
                                    },
                                    chatRoom: {
                                        create: {}
                                    }
                                }
                            }
                        },
                        select: {
                            customer: {
                                where: {
                                    email: extractdEmail[0],
                                },
                                select: {
                                    id: true,
                                }
                            }    
                        }
                    });

                    if (newCustomer) {

                        const response = {
                            role: "assistant",
                            //@ts-expect-error Its is implicit that if there is no customer id then it will be the case that extracted email && extractedEmail[0] is true
                            content: `Welcome aboard ${extractdEmail[0].split("@")[0]}! I'm glad to connect with you. Is there anything you need help with?`,
                            customerId: newCustomer.customer[0].id
                        }

                        return { response }
                    }

                }

                const checkcustomerExists = await db.domain.findUnique({
                    where: { id },
                    select: {
                        User: {
                            select: { clerkId: true },
                        },
                        name: true,
                        customer: {
                            where: {
                                id: customerId ?? ""
                            },
                            select: {
                                id: true,
                                email: true,
                                questions: true,
                                chatRoom: {
                                    select: {
                                        id: true,
                                        live: true,
                                        mailed: true,
                                    }
                                }
                            }
                        }
                    }
                });

                

                if (checkcustomerExists && checkcustomerExists.customer[0].chatRoom[0].live) {
                    //This block is giving the control to the owner of the chatbot

                    onStoreConversation(checkcustomerExists.customer[0].chatRoom[0].id!, message, author);

                    onRealTimeChat(checkcustomerExists.customer[0].chatRoom[0].id, message, `${cuid()}`, author);

                    //WIP: make sure that this mailer is actually working.
                    if (!checkcustomerExists.customer[0].chatRoom[0].mailed) {
                        const user = await (await clerkClient()).users.getUser(checkcustomerExists.User!.clerkId);

                        onMailer(user.emailAddresses[0].emailAddress)

                        const mailed = await db.chatRoom.update({
                            where: { id: checkcustomerExists.customer[0].chatRoom[0].id },
                            data: {
                                mailed: true,
                            }
                        })

                        if (mailed) {
                            return {
                                live: true,
                                chatRoom: checkcustomerExists.customer[0].chatRoom[0].id
                            }
                        }
                    }

                    return {
                        live: true,
                        chatRoom: checkcustomerExists.customer[0].chatRoom[0].id
                    }

                }

                onStoreConversation(checkcustomerExists!.customer[0].chatRoom[0].id, message, author);
                    
                const chatCompletion = await groq.chat.completions.create({
                    messages: [
                        {
                            role: 'assistant',
                            content: `
                                You are a chatbot that must always follow these rules:

                                1. You will be given an array of questions.  
                                - When you ask a question from this array, append the keyword "(complete)" at the end of the question.  
                                - Never use "(complete)" for other questions.

                                2. If the customer says something inappropriate or out of context, reply with:  
                                "This is beyond me and I will get a real user to continue the conversation. (realtime)"

                                3. If the customer asks anything about appointments or meetings, you MUST always reply with this hyperlink:  
                                ${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/portal/${id}/appointment/${checkcustomerExists?.customer[0].id}
                                
                                
                                4. If the customer asks about anything products, you MUST always reply with this hyperlink:  
                                ${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/portal/${id}/payment/${checkcustomerExists?.customer[0].id}                                

                                You are not to book or handle anything with the booking of products or appointments or meetings, you are never to handle anything to do with sending the customer emails.

                                and very importantly use only the links prodvided to you above in the response

                                5. Do not mention sending emails. Do not describe your actions. Be short, direct, respectful, and stay in character.  

                                Questions to ask (use "(complete)" after them): [${chatBotDomain.filterQuestions.map((q) => q.question).join(', ')}]
                            `

                        },
                        ...chat.map(chatInst => ({role: chatInst.role, content: chatInst.content})),
                        {
                            role: 'user',
                            content: message,
                        },
                    ],
                    model: "gemma2-9b-it",
                });

                if (chatCompletion.choices[0].message.content?.includes("(realtime)")) {

                    //This again is to give control to the owner

                    const realtime = await db.chatRoom.update({
                        where: { id: checkcustomerExists?.customer[0].chatRoom[0].id },
                        data: {
                            live: true,
                        }
                    })

                    if (realtime) {
                        const response = {
                            role: "assistant",
                            content: chatCompletion.choices[0].message.content.replace("(realtime)", ""),
                            customerId
                        }

                        return { response };
                    }

                }


                if (chat[chat.length - 1].content.includes("(complete)")) {

                    //This is to update which questions are answered and the responses the LLM made to the user

                    const firstUnanswerdQuestions = await db.customerResponses.findFirst({
                        where: {
                            customerId: checkcustomerExists?.customer[0].id,
                            answered: null
                        },

                        select: { id: true },

                        orderBy: { question: "asc" }
                    })

                    if (firstUnanswerdQuestions) {
                        await db.customerResponses.update({
                            where: { id: firstUnanswerdQuestions.id },
                            data: {
                                answered: message
                            }
                        })
                    }

                }

                if (chatCompletion) {

                    const generatedLink = extractURLFromString(chatCompletion.choices[0].message.content as string)

                    if (generatedLink) {

                        //If the LLM linked the user to the payment page to their products or book an appointment on my website

                        const link = generatedLink[0];
                        console.log("🔴There is a generated link", generatedLink)
                        console.log("🔴There is a generated passed into the subsequent functions link", link)

                        const response = {
                            role: "assistant",
                            content: "Great! you can follow the link to proceed",
                            link: link,
                            customerId
                        }

                        await onStoreConversation(
                            checkcustomerExists!.customer[0].chatRoom[0].id,
                            `${response.content} ${response.link}`,
                            "assistant"
                        )

                        return { response };
                    }

                    const response = {
                        role: "assistant",
                        content: chatCompletion.choices[0].message.content,
                        customerId
                    }

                    await onStoreConversation(
                        checkcustomerExists!.customer[0].chatRoom[0].id,
                        `${response.content}`,
                        "assistant"
                    )

                    return { response };

                }
            }


            //At this point i have checked all other possible cases meaning no customer assuming the customer is anonymous

            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "assistant",
                        content: `
                        You are a highly knowledgeable and experienced sales representative for a ${chatBotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
                        Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel welcomed.

                        Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

                        You are not to handle any sending of emails nor are u to hanle any booking of meetings, you are only to request their emails for buying of products or booking of appointments.

                    `,
                    },
                    ...chat,
                    {
                        role: 'user',
                        content: message,
                    },
                ],
                model: "llama-3.3-70b-versatile",
            })

            if (chatCompletion) {

                const response = {
                    role: "assistant",
                    content: chatCompletion.choices[0].message.content,
                    customerId
                }

                return { response }

            }

        }

    } catch (error) {
        console.log("🔴There was an error in the onLLMAssistant function", error)
    }

}