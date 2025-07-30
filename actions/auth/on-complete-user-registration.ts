"use server"

import { db } from "@/lib/prisma"

export const onCompleteUserRegistration = async (fullname: string, clerkId: string, type: string) => {
    try {
        const registered = await db.user.create({
            data: {
                fullname,
                clerkId,
                type,
                subscription: {
                    create: {}
                }
            },
            select: {
                fullname: true,
                id: true,
                type: true
            }
        })

        if(registered) return {status: 200, user: registered};

    } catch {
        return { status: 400 }
    }
}