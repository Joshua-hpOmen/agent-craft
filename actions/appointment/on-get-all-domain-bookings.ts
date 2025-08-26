"use server"

import { db } from "@/lib/prisma";

export const onGetAllDomainBookings = async (domainId: string) => {

    try {
       
       const domainBookings = await db.bookings.findMany({
        where: {domainId},
        select: {
           slot: true,
           date: true 
        }
       }) 

       if(domainBookings) return domainBookings;
        
    } catch (error) {
        console.log("🔴There was an error in the onGetAllDomainBookings function", error);
    }

}