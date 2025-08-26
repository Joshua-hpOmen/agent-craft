"use client"

import { onGetCurrentChatbot } from "@/actions/chatbot/on-get-current-chat-bot"
import { onLLMAssistant } from "@/actions/chatbot/on-llm-assistant"
import { postToParent, upload } from "@/lib/utils"
import { ChatMessageSchema, ChatMessageType } from "@/schema/conversation-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"

export const useChatBot = () => {
    const {register, handleSubmit, reset} = useForm<ChatMessageType>({
        resolver: zodResolver(ChatMessageSchema),
    })

    const [currentChatbot, setCurrentChatbot] = React.useState< 
        | {
            name: string,
            chatBot: {
                id: string,
                icon: string | null,
                welcomeMessage: string | null,
                background: string | null,
                textColor: string | null,
                helpdesk: boolean,
            } | null,
            helpdesk: {
                id: string,
                question: string,
                answer: string,
                domainId: string | null
            }[]
        } | undefined
    >()
    
    const messageWindowRef = React.useRef<HTMLDivElement | null>(null);

    const [botOpened, setBotOpened] = React.useState(false);
    const onOpenChatbot = () => setBotOpened(prev => !prev);

    const [loading, setLoading] = React.useState(false);
    const [onChats, setOnChats] = React.useState<{role: "assistant" | "user", content: string, link?: string}[]>([])
    const [onLLMResponding, setOnLLMResponding] = React.useState(false);
    const [currentBotId, setCurrentBotId] = React.useState("");

    const [onRealTime, setOnRealtime] = React.useState<{chatRoom: string, mode: boolean} | undefined>(undefined);

    const onScrollToBottom = React.useCallback(() => {
        if(!messageWindowRef.current) return;
        if(!botOpened) return;

        messageWindowRef.current.scroll({
            top: messageWindowRef.current.scrollHeight,
            left: 0,
            behavior: "smooth",
        })
    
    }, [botOpened])

    React.useEffect(() => {
        onScrollToBottom();
    }, [onChats, messageWindowRef, onScrollToBottom, botOpened])

    React.useEffect(() => {
        postToParent(JSON.stringify({
            width: botOpened ? 550 : 80,
            height: botOpened ? 800: 80,
        }))
    }, [botOpened])

    let limitRequest = 0;

    const onGetDomainChatBot = React.useCallback(async (id: string) => {
        setCurrentBotId(id);
        const chatbot = await onGetCurrentChatbot(id);

        if(chatbot) {
            setOnChats(prev => [...prev, {role: "assistant", content: chatbot.chatBot!.welcomeMessage!}])
            setCurrentChatbot(chatbot);
            setLoading(false)
        }
    }, []);

    React.useEffect(() => {
        
        window.addEventListener("message", (e) => {
            const botid = e.data

            if(limitRequest < 1 && typeof botid === "string"){
                onGetDomainChatBot(botid);
                limitRequest++;
            }
        })

    }, [limitRequest, onGetDomainChatBot])


    const onStartChatting = handleSubmit(async (values) => {
        reset();

        if(values.image.length){
            const uploded = await upload.uploadFile(values.image[0]);
            setOnChats(prev => [...prev, {role: "user", content: uploded.uuid}])
            setOnLLMResponding(true);
            const response = await onLLMAssistant(currentBotId!, onChats, "user", uploded.uuid);

            if(response){
                setOnLLMResponding(false);
                if(response.live){

                    setOnRealtime(prev => ({
                        ...prev,
                        chatRoom: response.chatRoom,
                        mode: response.live
                    }));

                } else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setOnChats((prev: any) => [...prev, response.response])
                }
            }
        }

        if(values.content){
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setOnChats((prev:any) => [...prev, {role:"user", content: values.content}])
            setOnLLMResponding(true);
    
            const response = await onLLMAssistant(currentBotId, onChats, "user", values.content)


            if(response){
                setOnLLMResponding(false);

                if(response.live){
                    setOnRealtime(prev => ({
                        ...prev,
                        chatRoom: response.chatRoom,
                        mode: response.live
                    }))
                }else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setOnChats((prev: any) => [...prev, response.response])
                }


            } 
        
        }

    })

    return {
        botOpened,
        onOpenChatbot,
        onStartChatting,
        onChats,
        register,
        onLLMResponding,
        messageWindowRef,
        currentChatbot,
        loading,
        setOnChats,
        onRealTime
    }
}