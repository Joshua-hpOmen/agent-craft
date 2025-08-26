"use client"

import { pusherClient } from "@/lib/utils"
import React from "react"

export const useRealtime = (chatRoom: string, setChats: React.Dispatch<React.SetStateAction<{
    role: 'user' | 'assistant'
    content: string
    link?: string | undefined
}[]>>) => {

    React.useEffect(() => {

        // pusherClient.subscribe(chatRoom);
        // pusherClient.bind("realtime-mode", data => {
        //     setChats(prev => [
        //         ...prev,
        //         {
        //             role: data.chat.role,
        //             content: data.chat.message
        //         }
        //     ])
        // }) 


        // return () => pusherClient.unsubscribe("realtime-mode");

    }, [chatRoom, setChats])

}