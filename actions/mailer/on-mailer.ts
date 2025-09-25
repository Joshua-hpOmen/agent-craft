"use server"
import nodeMailer from "nodemailer";

export const onMailer = async (email: string) => {

    console.log("🔴This is the pass key: ", process.env.NODE_MAILER_GMAIL_APP_PASSWORD)
    console.log("🔴This is the email: ", process.env.NODE_MAILER_EMAIL)

    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD as string,
            user: process.env.NODE_MAILER_EMAIL as string
        }
    })

    const mailOptions = {
        from: '"AgentCraft Support" <no-reply@agentcraft.com>',
        to: email,
        subject: "Realtime Support Activated",
        text: "One of your customers on Agent-Craft, just switched to realtime mode",
        html: "<p>One of your customers just switched to <b>Realtime Mode</b></p>"
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("🔴There was an error in the sending of mail", error)
        }else {
            console.log("🟢Email sent:" + info.response)
        }
    })

}