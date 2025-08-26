"use server"

import { db } from "@/lib/prisma";

export const onGetAllHelpDeskQuestions = async (id: string) => {

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