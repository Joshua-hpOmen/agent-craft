"use server"

import { db } from "@/lib/prisma"

export const onGetAllBookingForCurrentUser = async (userId: string) => {
    try {
       
        const bookings = await db.bookings.findMany({
            where: {
                Customer: {
                    Domain: {
                        User: { clerkId: userId }
                    }
                }
            },

            select: {
                id: true,
                slot: true,
                createdAt: true,
                date: true, 
                email: true,
                domainId: true,
                Customer: {
                    select: {
                        Domain: { select: {name: true} }
                    }
                }
            }
        })

        if(bookings) return {bookings}

    } catch (error) {
       console.log("🔴There was an error in the onGetAllBookingForCurrentUser function", error) 
    }
}