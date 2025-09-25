"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onDeleteChatRoom = async (chatRoomId: string) => {

    const user = await currentUser();
    if(!user) throw new Error("unauthenticated");

    try {
       
        await db.chatRoom.delete({ where: { id: chatRoomId }});

    } catch (error) {
       console.log("🔴There was an error in the onDeleteChatRoom function", error) 
    }

}