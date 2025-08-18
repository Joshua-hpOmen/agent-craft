"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { uuid } from "zod";

export const onCreateHelpDeskQuestion = async (id: string, question: string, answer: string) => {

    const user = await currentUser();

    if(!user) throw new Error('unauthenticated');

    try {
       
        const helpDeskQuestion = await db.domain.update({
            where: {id},
            data : {
                helpdesk: {
                    create: {
                        question,
                        answer
                    }
                }
            },

            include: {
                helpdesk: {
                    select: {
                        id: true,
                        question: true,
                        answer: true
                    }
                }
            }
        })

        if(helpDeskQuestion) {
            return { status: 200, message: "New help desk question added", question: helpDeskQuestion.helpdesk}
        }

    } catch (error) {
       console.log("🔴There was an error in the onCreateHelpDeskQUestion function", error) 
    }

};