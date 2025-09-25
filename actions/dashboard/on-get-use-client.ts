"use server"

import { db } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onGetUserClietns = async () => {
    
    const user = await currentUser();
    if(!user) throw new Error("unauthenticated")

    try{
        const clients = await db.customer.count({
            where: {
                Domain: {
                    User:{
                        clerkId: user.id
                    }
                }
            }
        })

        if(clients) return clients 
    }catch (error) {
        console.log("🔴There was an error in the onGetUserClients hook", error);
    }
}