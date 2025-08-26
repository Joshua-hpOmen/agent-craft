"use server"

import { db } from "@/lib/prisma"

export const onGetCurrentChatbot = async (id: string) => {

    try {
       
       const chatbot = await db.domain.findUnique({
        where: {id},
        select: {
            name: true,
            helpdesk: true,
            chatBot: {
                select: {
                    id: true, 
                    welcomeMessage: true,
                    icon: true,
                    textColor: true,
                    background: true,
                    helpdesk: true,
                }
            }
        }
       }) 

       if(chatbot) return chatbot;

    } catch (error) {
       console.log("🔴There was an error in the onGetCurrentChatbot function", error) 
    }

}