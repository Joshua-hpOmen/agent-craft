import z from "zod"

export type ConversationSearchType = {
    query: string,
    domain: string,
}

export const COnversationSearchSchema = z.object({
    query: z.string().min(1, {message: "You must enter a search query"}),
    domain: z.string().min(1, {message: "You must provide a domain"}),
})