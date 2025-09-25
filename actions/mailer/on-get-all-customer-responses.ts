"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onGetAllCustomerResponses = async (id: string) => {

    const user = await currentUser();
    if(!user) throw new Error("unauthenticated");

    try {
        const answers = await db.user.findUnique({
            where: {clerkId: user.id},
            select: {
                domains: {
                    select: {
                        customer: {
                            select: {
                                questions: {
                                    where: {
                                        customerId: id,
                                        answered: {
                                            not: null
                                        }
                                    },
                                    select: {
                                        question: true,
                                        answered: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if(answers) return answers;

    } catch (error) {
        console.log("🔴There was an error in the onGetAllCustomerResponses function", error)
    }

}