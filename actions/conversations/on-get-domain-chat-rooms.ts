"use server"

import { db } from "@/lib/prisma"

export const onGetDomainChatRooms = async (id: string) => {

    try {
       
        const domains = await db.domain.findUnique({
            where: {id},

            select: {
                customer: {

                    select: {

                        email: true,
                        chatRoom: {

                            select: {
                                createdAt: true,
                                id: true,
                                stared: true,
                                message: {
                                    select: {
                                        message: true,
                                        createdAt: true,
                                        seen: true
                                    },
                                    orderBy: { createdAt: "asc" },
                                    take: 1,
                                },

                            }
                        }

                    }

                }
            }
        })
        
        if(domains) return domains;

        console.log("🔴There was no domains found")

    } catch (error) {
       console.log("🔴There was an error in the onGetDomainChatRooms", error) 
    }

}