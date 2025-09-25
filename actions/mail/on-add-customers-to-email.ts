"use server"

import { db } from "@/lib/prisma";

export const onAddCustomersToEmail = async (isSelected: string[], campaignId: string) => {
    try {
        
        const customersAdded = await db.campaign.update({
            where: {id: campaignId},
            data: {
                customers: isSelected,
            }
        })

        if(customersAdded) return { status: 200, message: "Customers added to campaign"};

    } catch (error) {
       console.log("🔴There was an error in the onAddCustomersToEmail function", error);
    }
}