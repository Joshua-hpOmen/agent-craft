"use server"

import { pusherServer } from "@/lib/utils"

export const onRealTimeChat = async (chattRoom: string, message: string, id: string, role: "assistant" | "user") => {

    // pusherServer.trigger(chattRoom, "realtime-mode", {
    //     chat: {
    //         message,
    //         id,
    //         role
    //     }
    // })

}