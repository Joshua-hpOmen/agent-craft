"use server"

import { pusherServer } from "@/lib/utils"

export const onRealTimeChat = async (chattRoom: string, message: string, id: string, role: "assistant" | "user") => {

    console.log("🔴The chat is in realtime")

    pusherServer.trigger(chattRoom, "realtime-mode", {
        chat: {
            message,
            id,
            role
        }
    })

}