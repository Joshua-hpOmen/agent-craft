"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onGetSubscriptionPlan = async () => {
    try {
        const user = await currentUser();
        if(!user) return;

        const plan = await db.user.findUnique({
            where: {clerkId: user.id},
            select: {
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if(plan) {
            return plan.subscription?.plan
        }
    } catch (error) {
        console.log("🔴There was an error within the onGetSubscriptionPlan function", error)
    }
}

export const onGetAllAccountDomains = async () => {
    const user = await currentUser();
    if(!user) return;

    try {
        const domains = await db.user.findUnique({ 
            where: {clerkId: user.id},
            select: {
                id: true, 

                domains: {

                    select: {
                        name: true,
                        icon: true,
                        id: true,
                        customer: {

                            select: {

                                chatRoom: {
                                    select: {
                                        id: true,
                                        live: true
                                    }
                                }

                            }

                        }
                    }

                }
            }
        })

        return {...domains}
    } catch (error) {
       console.log("🔴There was an error in the onGetAllAccountDomains function", error) 
    }
}

export const onIntegrateDomain = async (domain: string, icon: string) => {
    const user = await currentUser();
    if(!user) return;

    try {

       const subscription = await db.user.findUnique({
        where: {clerkId: user.id},
        //This is to check if they go over their plan
        select: {
            _count : {
                select: { domains: true }
            },
            subscription: {
                select: { plan: true }
            }
        },
       }) 

       const domainExists = await db.user.findUnique({
            where: { 
                clerkId: user.id,
                domains: {
                    some: { name: domain }
                }
            },

       })

       if(!domainExists){
            if( (subscription?.subscription?.plan === "STANDARD" && subscription._count.domains < 1) 
                || (subscription?.subscription?.plan === "PRO" && subscription._count.domains < 5) 
                || (subscription?.subscription?.plan === "ULTIMATE" && subscription._count.domains < 10)
            ){

                const newDomain = await db.user.update({

                    where: {clerkId: user.id},
                    data: {
                        domains: {
                            create: {
                                name: domain,
                                icon,
                                chatBot: {
                                    create: {
                                        welcomeMessage: "Hey there, have a question? Text use here",
                                    }
                                }
                            }
                        }
                    }

                })

                if (newDomain) return { status: 200, message: "Domain successfully added"}
            }

            return {
                status: 400,
                message: "You've reached the max number of domains, upgrade your plan",
            }
       }

       return {
        status: 400,
        message: "Domain already exists",
       }

    } catch (error) {
        console.log("🔴There was an error in onIntegrateDomain", error)
    }
} 