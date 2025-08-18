"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onGetAllHelpDeskQuestions = async (id: string) => {
    const user = await currentUser();

    if(!user) throw new Error("unauthenticated");

    try {
       
        const allHelpDeskQuestions = await db.domain.findUnique({
            where: {id},
            select: {
                helpdesk: {
                    select: {
                        id: true,
                        question: true,
                        answer: true
                    }
                }
            }
        })

        if(allHelpDeskQuestions) return {status: 200, message: "Retrieved all helpdesk questions", questions: [...allHelpDeskQuestions.helpdesk] }

    } catch (error) {
       console.log("🔴There was an error in the onGetAllHelpDeskQuestions function", error) 
    }

}