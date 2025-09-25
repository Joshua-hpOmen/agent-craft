"use client"

import { pusherClient } from "@/lib/utils"
import React from "react"

export const useRealtime = (chatRoom: string, setChats: React.Dispatch<React.SetStateAction<{
    role: 'user' | 'assistant'
    content: string
    link?: string | undefined
}[]>>) => {

    React.useEffect(() => {

        pusherClient.subscribe(chatRoom);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pusherClient.bind("realtime-mode", (data: any) => {
            console.log("🔴The psuherClient has been binded");
            
            setChats(prev => [
                ...prev,
                {
                    role: data.chat.role,
                    content: data.chat.message
                }
            ])
        }) 


        return () => {
            pusherClient.unbind("realtime-mode")
            pusherClient.unsubscribe(chatRoom)
        };

    }, [chatRoom, setChats])

}