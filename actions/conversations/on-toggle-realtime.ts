"use server"

import { db } from "@/lib/prisma"

export const onToggleRealtime = async (id: string, state: boolean) => {

    try {
       
        const chatRoom = await db.chatRoom.update({
            where: {id},
            data: { live: state },
            select: {
                id: true,
                live: true 
            }
        })

        if(!chatRoom) throw new Error("");
        return {
            status: 200,
            message: `Realtime mode ${chatRoom.live ? "enabled" : "disabled" }`,
            chatRoom
        }
        

    } catch (error) {
        console.log("🔴There was an error in the onToggleRealtime", error)
    }

}