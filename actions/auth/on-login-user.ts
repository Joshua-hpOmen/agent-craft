"use server"
import { db } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { onGetAllAccountDomains } from "../settings"

export const onLoginUser = async () => {
    const user = await currentUser()
    if(!user) redirect("/auth/sign-in");

    try {
        const authenticated = await db.user.findUnique({
            where: { clerkId: user.id },
            select: {
                fullname: true,
                id: true,
                type: true
            }
        })

        if(!authenticated) throw new Error();

        const domains = await onGetAllAccountDomains()
        return {status: 200, user: authenticated, domain: domains?.domains}
    } catch  {
       return { status: 400 } 
    }
}