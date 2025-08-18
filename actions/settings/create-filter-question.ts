"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onCreateFilterQuestions = async (id: string, question: string) => {
    const user = await currentUser();
    if(!user) throw new Error("unauthenticated");

    try {
       
        const filterQuestion = await db.domain.update({
            where: {id},
            data: {
                filterQuestions: {
                    create: {question}
                }
            },
            include: {
                filterQuestions: {
                    select: {
                        id: true,
                        question: true,
                    }
                }
            }
        })

        if(filterQuestion) return {status: 200, message: "Created filter question", questions: filterQuestion.filterQuestions}

    } catch (error) {
       console.log("🔴Something went wrong in the onCreataeFIleterQuestion function", error) 
    }
}