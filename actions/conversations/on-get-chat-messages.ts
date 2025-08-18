"use server"

import { db } from "@/lib/prisma"

export const onGetChatMessages = async (id: string) => {

    try {
       
       const messages = await db.chatRoom.findMany({
        where: {id},
        select: {
            id: true,
            live: true,
            message: {
                select: {
                    id: true,
                    role: true,
                    message: true,
                    createdAt: true,
                    seen: true
                },
                orderBy: {createdAt: "asc"},
            }
        }
       })

       if(messages) return messages;
        
    } catch (error) {
       console.log("🔴There was an error in the onGetChatMessages function", error) 
    }

}