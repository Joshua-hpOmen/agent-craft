export enum MENU_ITEMS_SIZES {
    MAX = "max",
    MIN = "min"
}

export enum PlanType {
    STANDARD = "STANDARD",
    PRO = "PRO",
    ULTIMATE = "ULTIMATE"
}

export type RuntimeChatbotType =  {
    id: string, 
    icon: string | null,
    welcomeMessage: string | null, 
} | null

export type DomainsType = {
    name: string;
    id: string;
    icon: string;
}[]  | undefined

export type ChatRoomsType = {
    chatRoom: {
        id: string,
        createdAt: Date,
        stared: boolean,
        message: {
            message: string,
            createdAt: Date,
            seen: boolean
        }[]
    }[],
    email: string | null
}[]