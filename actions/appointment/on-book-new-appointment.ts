"use server"

import { db } from "@/lib/prisma"

export const onBookNewAppointment = async (domainId: string, customerId: string, slot: string, date: string, email: string) => {

    try {
       
        const booking = await db.customer.update({
            where: {id: customerId},
            data: {
                booking:{
                    create: {
                        domainId,
                        slot,
                        date,
                        email
                    }
                }
            }
        });

        if(booking) return { status: 200, message: "Booking created" };

    } catch (error) {
       console.log("🔴There was an error in the onBookNewAppointment function", error) 
    }

}