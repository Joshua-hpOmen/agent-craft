"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onGetUserAppointments = async () => {
    const user = await currentUser();
    if(!user) throw new Error("unauthenticated");

    try {
       
        const bookings = await db.bookings.count({
            where: {
                Customer:{
                    Domain: {
                        User: {clerkId: user.id}
                    }
                }
            }
        })

        if(bookings) return bookings

    } catch (error) {
       console.log("🔴There was an error in the onGetUserAppointments method", error) 
    }
} 