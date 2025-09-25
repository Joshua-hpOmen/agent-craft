"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onCreateMarketingCampaign = async (name: string) => {

    const user = await currentUser();
    if(!user) throw new Error("unauthenticated");

    try {
        
        const campaign = await db.user.update({
            where: {clerkId: user.id},
            data: {
                campaign: {
                    create: {
                        name: name
                    }
                }
            }
        });

        if(campaign) return {status: 200, message: "You're campaign was created"};

    } catch (error) {
       console.log("🔴There was an error in the onCreateMarketingCampaign", error) 
    }

}