"use client"

import React from "react"

export enum ChatsRole {
    ASSISTANT = "assistant",
    USER = "user",
}

export type ChatType = {
    message: string,
    id: string,
    role: ChatsRole | null,
    createdAt : Date,
    seen: boolean
} 

type ChatInitialValueProps = {
    realtime: boolean,
    setRealTime: React.Dispatch<React.SetStateAction<boolean>>,
    chatRoom: string | undefined,
    setChatRoom: React.Dispatch<React.SetStateAction<string | undefined>>,
    chats: ChatType[],
    setChat: React.Dispatch<React.SetStateAction<ChatType[]>>  
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const chatContext = React.createContext<ChatInitialValueProps | undefined>(undefined)

type Props = {
    children: React.ReactNode
}

export const ChatProvider = (props: Props) => {
    const [chats, setChat] = React.useState<ChatType[]>([])
    const [loading, setLoading] = React.useState(false)
    const [chatRoom, setChatRoom] = React.useState<string | undefined>(undefined)
    const [realtime, setRealTime] = React.useState(false)

    const values = {
        realtime,
        setRealTime,
        chatRoom,
        setChatRoom,
        chats,
        setChat,
        loading,
        setLoading
    }

    return <chatContext.Provider value={{...values}}>
        {props.children}
    </chatContext.Provider>
}

export const useChatContext = () => {
    const context = React.useContext(chatContext);
    if(!context) throw new Error("Context should be used within the provider");
    return context 
}