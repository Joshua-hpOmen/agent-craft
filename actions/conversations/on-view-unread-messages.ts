"use server"

import { db } from "@/lib/prisma";

export const onViewUnReadMessages = async (chatRoomId: string) => {

    try {
       
            await db.chatMessage.updateMany({
                where: {chatRoomId},
                data: {
                    seen: true
                }
            })

    } catch (error) {
       console.log("🔴There was an error in the onViewUnReadMessages function", error);
    }
}