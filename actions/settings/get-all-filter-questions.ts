"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"


export const onGetAllFilterQuestions = async (id: string) => {
    const user = await currentUser();

    if(!user) throw new Error("unathenticated");

    try {
        
        const allFilterQuestions = await db.domain.findUnique({
            where: {id},
            select: {
                filterQuestions: {
                    select: {
                        id: true,
                        question: true
                    },
                    orderBy: {question: "asc"},
                }
            }
        })

        if(allFilterQuestions) return {status: 200, questions: [...allFilterQuestions.filterQuestions]}

    } catch (error) {
       console.log("🔴There was an errror in the onGetAllFIlterQuestions function", error) 
    }
}