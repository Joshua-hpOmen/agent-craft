"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onGetPaymentConnected = async () => {

    try {
       const user = await currentUser();

       if(!user) return;

       const connected = await db.user.findUnique({
        where: {clerkId: user.id},
        select: {stripeId: true}
       })

       if(connected) return connected.stripeId;


    } catch (error) {
       console.log("🔴There was an error in the onGetPaymentConnected function", error) 
    }

}