"use server"

import { db } from "@/lib/prisma"
import { extractEmailsFromString, extractURLFromString } from "@/lib/utils"
import { onStorConversation } from "./on-store-conversation"
import { onRealTimeChat } from "../conversations/on-real-time-chat"
import { clerkClient } from "@clerk/nextjs/server"
import { onMailer } from "../mailer/on-mailer"
import { onStoreConversation } from "./on-store-conversations"
import { groq } from "@/lib/grok-instance"


export const onLLMAssistant = async (id: string, chat: { role: "assistant" | "user", content: string }[], author: "user", message: string) => {

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

            if (extractdEmail && extractdEmail[0]) {

                const checkcustomerExists = await db.domain.findUnique({
                    where: { id },
                    select: {
                        User: {
                            select: { clerkId: true },
                        },
                        name: true,
                        customer: {
                            where: {
                                email: { startsWith: extractdEmail[0] }
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

                if (checkcustomerExists && !checkcustomerExists.customer.length) {

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
                        }
                    });

                    if (newCustomer) {

                        const response = {
                            role: "assistant",
                            content: `Welcome aboard ${extractdEmail[0].split("@")[0]}! I'm glad to connect with you. Is there anything you need help with?`
                        }

                        return { response }
                    }

                }

                if (checkcustomerExists && checkcustomerExists.customer[0].chatRoom[0].live) {
                    //This block is giving the control to the owner of the chatbot

                    await onStorConversation(checkcustomerExists.customer[0].chatRoom[0].id!, message, author);

                    onRealTimeChat(checkcustomerExists.customer[0].chatRoom[0].id, message, "user", author);


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

                await onStoreConversation(checkcustomerExists!.customer[0].chatRoom[0].id, message, author);

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

                                3. If the customer asks about **appointments or meetings**, you MUST always reply with this hyperlink:  
                                <a href="${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/portal/${id}/appointment/${checkcustomerExists?.customer[0].id}" target="_blank">Click here to manage your appointment</a> 

                                4. If the customer asks about **products**, you MUST always reply with this hyperlink:  
                                <a href="${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/portal/${id}/payment/${checkcustomerExists?.customer[0].id}" target="_blank">Click here to view the product</a>  

                                5. Do not mention sending emails. Do not describe your actions. Be short, direct, respectful, and stay in character.  

                                Questions to ask (use "(complete)" after them): [${chatBotDomain.filterQuestions.map((q) => q.question).join(', ')}]
                            `

                        },
                        ...chat,
                        {
                            role: 'user',
                            content: message,
                        },
                    ],
                    model: "gemma2-9b-it",
                })

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
                            content: chatCompletion.choices[0].message.content.replace("(realtime)", "")
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

                        const response = {
                            role: "assistant",
                            content: "Great! you can follow the link to proceed",
                            link: link.slice(0, -1)
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
                    }

                    await onStorConversation(
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
                        role: 'assistant',
                        content: `
                        You are a highly knowledgeable and experienced sales representative for a ${chatBotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
                        Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel welcomed.

                        Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

                    `,
                    },
                    ...chat,
                    {
                        role: 'user',
                        content: message,
                    },
                ],
                model: "gemma2-9b-it",
            })

            if (chatCompletion) {

                const response = {
                    role: "assistant",
                    content: chatCompletion.choices[0].message.content
                }

                return { response }

            }

        }

    } catch (error) {
        console.log("🔴There was an error in the onLLMAssistant function", error)
    }

}