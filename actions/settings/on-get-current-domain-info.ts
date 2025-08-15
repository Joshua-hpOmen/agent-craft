"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onGetCurrentDomainInfo = async (domain: string) => {
    const user = await currentUser();
    
    if(!user) throw new Error("unauthenticate");
   
    try {
       const userDomain = await db.user.findUnique({
        where: {
            clerkId: user.id,
        },
        select: {
            subscription: {
                select: { plan: true },
            },
            domains: {
                where: {
                    name: { contains: domain}
                },
                select: {
                    id: true, 
                    name: true,
                    icon: true,
                    userId: true,
                    chatBot: {
                        select: {
                            id: true,
                            welcomeMessage: true,
                            icon: true,
                        }
                    }
                }
            },
        }

       }) 

       if(userDomain) return userDomain;

       throw new Error("no such domain");

    } catch (error) {
        console.log("🔴There was an error in the ongetcurrentdomainInfo function", error)
    }
}