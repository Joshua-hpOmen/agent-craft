"use server"
import { db } from "@/lib/prisma"

export const onGetConversationMode = async (id: string) => {
    try {

       const mode = await db.chatRoom.findUnique({
        where:{id},
        select: { live : true }
       })
    
       return mode;

    } catch (error) {
        console.log("🔴There was an error in onGetConversationMode",error)        
    }
}