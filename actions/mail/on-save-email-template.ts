"use server"

import { db } from "@/lib/prisma"

export const onSaveEmailTemplate = async (template: string, campaignId: string) => {

    try {
        
        const update = await db.campaign.update({
            where: {id: campaignId},
            data: {
                template
            },
        })

        if(update) return {status: 200, message: "Updated the email template"};

    } catch (error) {
       console.log("🔴There was an error in the onSaveEmailTemplate function", error) 
    }

}