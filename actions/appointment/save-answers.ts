"use server"

import { db } from "@/lib/prisma"

export const onSaveAnswers = async (questions: Record<string, string>, customerId: string) => {

    try {
       
        for(const question in questions){
            await db.customer.update({
                where: {id: customerId},
                data: {
                    questions: {
                        update: {
                            where: { id: question },
                            data: {answered: questions[question]}
                        }
                    }
                }
            });
        }

        return {status: 200}

    } catch (error) {
       console.log("🔴There was an error in the onSaveAnswers method", error) 
    }

}