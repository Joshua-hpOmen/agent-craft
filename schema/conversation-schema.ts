import z from "zod"
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "./settings-schema"

export type ConversationSearchType = {
    query: string,
    domain: string,
}

export const COnversationSearchSchema = z.object({
    query: z.string().min(1, {message: "You must enter a search query"}),
    domain: z.string().min(1, {message: "You must provide a domain"}),
})

export type ChatMessageType = {
    content?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any
}

export const ChatMessageSchema = z.object({
    content: z.string().optional().or(z.literal("").transform(() => undefined)),
    image: z.any().optional()
}).refine(schema => {
    if(!schema.image?.length) return true;

    if(ACCEPTED_FILE_TYPES.includes(schema.image[0].type() && schema.image[0].size <= MAX_UPLOAD_SIZE)) return true;
})