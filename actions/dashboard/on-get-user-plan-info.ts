"use server"

import { db } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onGetUserPlanInfo = async () => {
    const user = await currentUser();
    if(!user) throw new Error("unauthenticated");

    try {
       
        const planInfo = await db.user.findUnique({
            where: {clerkId: user.id},
            select: {
                _count: {
                    select:{
                        domains: true
                    }
                },
                subscription: {
                    select: {
                        plan: true,
                        credits: true
                    }
                }
            }
        })

        if(planInfo) return {plan: planInfo.subscription?.plan ?? "STANDARD", domains: planInfo._count.domains, credits: planInfo.subscription?.credits ?? 0}

    } catch (error) {
       console.log("🔴There was an error in teh onGetUserPlanInfo method", error) 
    }
}