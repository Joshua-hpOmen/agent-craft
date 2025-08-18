"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onDeleteUserDomain = async (id: string) => {
    const user = await currentUser();

    if(!user) throw new Error("unauthenticated");

    try {

        const findUser = await db.user.findUnique({where: { clerkId: user.id }, select: {id: true}});

        if(!findUser) throw new Error("Not valid user");
       
        const deleted = await db.domain.delete({
            where: {id, userId: findUser.id}
        })

        if(deleted) return {status: 200, message: "Deleted domain"};

    } catch (error) {
       console.log("🔴There was an error in onDeleteUserDomain", error) 
    }
}