"use server"

import { db } from "@/lib/prisma"

export const onGetAllCustomers = async (id: string) => {

    try {
       
        const allCustomers = await db.user.findUnique({
            where: {clerkId: id},
            select: {
                subscription: {
                    select: {
                        credits: true,
                        plan: true
                    },
                },
                domains: {
                    select: {
                        customer: {
                            select:{
                                id: true,
                                email: true,
                                Domain: {
                                    select: { name: true }
                                }
                            }
                        }
                    }
                }
            }
        })

        if(allCustomers) return allCustomers

    } catch (error) {
       console.log("🔴There is an error in the onGetAllCustomers method", error) 
    }

}