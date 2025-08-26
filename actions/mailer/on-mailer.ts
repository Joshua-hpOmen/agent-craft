"use server"
import nodeMailer from "nodemailer";

export const onMailer = async (email: string) => {

    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
            pass: process.env.NODE_MAILER_EMAIL
        }
    })

    const mailOptions = {
        to: email,
        subject: "Realtime Support",
        text: "One of your customers on Agent-Craft, just switched to realtime mode"
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("🔴There was an error in the ")
        }else {
            console.log("🟢Email sent:" + info.response)
        }
    })

}