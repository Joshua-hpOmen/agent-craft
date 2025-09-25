"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer"

export const onBulkMailer = async (mails: string[], campaingId: string) => {
    const user = await currentUser()
    if(!user) throw new Error("unauthenticated");

    try {
        
        const template = await db.campaign.findUnique({
            where: {id: campaingId},
            select: {
                name: true, 
                template: true
            }
        })

        if(template && template.template) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.NODE_MAILER_EMAIL,
                    pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD
                }
            });
            const mailOptions = {
                from: `"${template.name}" <no-reply@agentcraft.com>`,
                to: mails,
                subject: template.name,
                text: JSON.parse(template.template)
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log("🔴There was an error in sending the campaign", err)
                }else {
                    console.log("🟢Success in sedning campaign", info.response);
                }
            });

            const creditsUsed = await db.user.update({
                where: {clerkId: user.id},
                data: {
                    subscription: {
                        update: {
                            credits: {
                                decrement: mails.length , 
                            }
                        }
                    }
                }
            })

            if(creditsUsed.updatedAt) return {status: 200, message: "Campaign emails sent"};
        }

    } catch (error) {
       console.log("🔴There was an error in the onBulkMailer function", error);
    }
}