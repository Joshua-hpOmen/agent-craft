"use server"

import { db } from "@/lib/prisma"

export const onGetAllCampaings = async (id: string) => {
    try {
       
        const campaings = await db.user.findUnique({
            where: {clerkId: id},

            select: {
                campaign: {
                    select: {
                        name: true,
                        id: true,
                        customers: true,
                        createdAt: true
                    }
                }
            }
        })

        if(campaings) return campaings;

    } catch (error) {
       console.log("🔴There was an error in the onGetAllCampaings function", error) 
    }
}