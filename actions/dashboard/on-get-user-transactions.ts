"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onGetUserTransactions = async () => {
    const user = await currentUser();

    if(!user) throw new Error("unauthenticated");

    try {
       
        const products = await db.product.findMany({
            where: {
                Domain: {
                    User: {
                        clerkId: user.id
                    }
                }
            },
            select: {
                price: true,
            }
        })

        if(products) {
            const total = products.reduce(( accumVal, next ) => accumVal + next.price, 0)

            return total
        }

    } catch (error) {
       console.log("🔴There was an error in the onGetUserTotalProducts", error) 
    }
}