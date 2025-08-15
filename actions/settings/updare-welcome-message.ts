"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onUpdateWelcomMessage = async (id: string, welcomeMessage: string) => {
    const user  = currentUser();

    if(!user) throw new Error("unauthenticated");

    try {

        const update =await db.domain.update({
            where: {id},
            data: {
                chatBot: {
                    update: { welcomeMessage, }
                }
            }
        })

        if(update) return { status: 200, message: "Welcome message updated" };

    } catch (error) {
       console.log("🔴There was an error in onUpdateWelcomeMessage", error);
    }
}