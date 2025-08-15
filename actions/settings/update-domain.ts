"use server"

import { db } from "@/lib/prisma"

export const onUpdateDomain = async (id: string, domain:string) => {
    try {
       const domainExists = await db.domain.findFirst({
        where: {name: {contains: domain}},
       })
       
       if(!domainExists) {
        const newDomain = await db.domain.update({
            where: {id},
            data: {name: domain}
        })

        if(newDomain) {
            return {
                status: 200,
                message: "Updated domain"
            }
        }
       
        return { status: 400, message: "Oops something went wrong!"};
       }

       return { status: 400, message: "Domain with this name already exists"};

    } catch (error) {
        console.log("🔴There was an error in the onUpdateDomain method", error);
    }
}