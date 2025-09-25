"use server"

import { db } from "@/lib/prisma"

export const onGetEmailTemplate = async (id: string) => {

    try {
        
        const template = await db.campaign.findUnique({
            where: {id},
            select: {
                template: true,
            }
        })

        if(template) return template;

    } catch (error) {
        console.log("🔴There was an error in the onGetTemplate function", error)
    }

}