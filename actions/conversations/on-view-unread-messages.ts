"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onViewUnReadMessages = async (chatRoomId: string) => {
    const user = await currentUser();

    if(!user) throw new Error("unauthorised");

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