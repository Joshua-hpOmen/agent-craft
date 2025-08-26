import { UploadClient } from "@uploadcare/upload-client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractUUIDFromString = (url: string) => {
  return url.match(
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
  )
}

export const pusherClient = /* new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {cluster: "mt1"} ) */ ""

export const pusherServer  =  {};
// new PusherServer({
//   appId: process.env.PUSHER_APP_ID as string,
//   key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
//   secret: process.env.PUSHER_APP_SECRET as string,
//   cluster: "mt1",
//   useTLS: true
// })

export const postToParent = (message: string) => {
  window.parent.postMessage(message, "*")
}

export const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
})

export const extractEmailsFromString = (text: string) => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
}

export const extractURLFromString = (url: string) => {
  return url.match(/https?:\/\/[^\s"<>]+/)
}
