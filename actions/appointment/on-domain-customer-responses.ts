"use server"

import { db } from "@/lib/prisma"

export const onDomainCustomerResponses = async (customerId: string) => {
    try {
        
        const customerQuestions = await db.customer.findUnique({
            where: {id: customerId},
            select: {
                email: true,
                questions: {
                    select: {
                        id: true,
                        question: true,
                        answered: true
                    }
                }
            }
        })

        if(customerQuestions) return customerQuestions;

    } catch (error) {
       console.log("🔴There was an error in the onDomainCustomerResponses function", error) 
    }
}