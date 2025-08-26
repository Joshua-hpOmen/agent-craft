"use server"

import { db } from "@/lib/prisma"

export const onStorConversation = async (id: string, message: string, role: "assistant" | "user",) => {

    await db.chatRoom.update({
        where: {id},
        data: {
            message: {
                create: {
                    message,
                    role
                }
            }
        }
    })

}