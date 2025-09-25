"use server"

import { db } from "@/lib/prisma"

export const onStarChatRoom = async (chatRoomId: string, stared: boolean) => {

    try {
       
        await db.chatRoom.update({
            where: {id: chatRoomId},
            data: {
                stared: !stared
            }
        })

    } catch (error) {
       console.log("🔴There was an error in the onStarChatRoom function", error) 
    }

}