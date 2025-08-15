"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onChatBotImageUpdate = async (id: string, icon: string) => {
    const user = await currentUser();

    if(!user) throw new Error("unauthenticated");

    try {
       const domain = await db.domain.update({
        where: {id},
        data: { 
            chatBot: {
                update: {
                    data: {
                        icon,
                    }
                }
            }
        }   
       }) 

       if(domain) return {status: 200, message: "Oops something went wrong!"};

       return { status: 400, message: "Oops something went wrong"};
    } catch (error) {
        console.log("🔴There was an error in onChatBotImageUpdate", error);
    }
}