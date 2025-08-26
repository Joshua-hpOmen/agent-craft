"use server"

import { db } from "@/lib/prisma";

export const onOwnerSentMessage = async (chatRoom: string, message: string, role: "assistant" | "user") => {

    try {
    
        const chat = await db.chatRoom.update({
            where: {id: chatRoom},
            data: {
                message: {
                    create: {
                        message,
                        role
                    }
                }
            },
            select: {
                message: {
                    select: {
                        id: true,
                        role: true,
                        message: true,
                        createdAt: true,
                        seen: true,
                    },
                    orderBy: {
                        createdAt: "desc"
                    },
                    take: 1
                }
            }
        })

        if(chat) return chat;

    } catch (error) {
       console.log("🔴There was an error in the onOwnerSentMessage function", error);
    }

}