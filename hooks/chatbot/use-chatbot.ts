"use client"

import { onGetCurrentChatbot } from "@/actions/chatbot/on-get-current-chat-bot"
import { onLLMAssistant } from "@/actions/chatbot/on-llm-assistant"
import { postToParent, upload } from "@/lib/utils"
import { ChatMessageSchema, ChatMessageType } from "@/schema/conversation-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"

type ChatTypeForLLM = { role: "assistant" | "user", content: string }[]

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
    const [customerId, setCustomerId] = React.useState<string | null>(null);

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

        reset()

        if(values.image.length){
            const uploded = await upload.uploadFile(values.image[0]);

            const isInRealtime = Boolean(onRealTime?.mode);
            if(!isInRealtime) setOnChats(prev => [...prev, {role: "user", content: values.content ?? "", link: `https://ucarecdn.com/${uploded.uuid}/-/preview/3000x3000` }]);
            setOnLLMResponding(!isInRealtime);


            const response = await onLLMAssistant(currentBotId!, onChats as ChatTypeForLLM, "user", uploded.uuid, customerId);

            if(response){
                setOnLLMResponding(false);
                if(response.live){

                    setOnRealtime(prev => ({
                        ...prev,
                        chatRoom: response.chatRoom,
                        mode: response.live
                    }));

                } else {
                    //@ts-expect-error there can be a link provided
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setOnChats((prev: any) => [...prev, {role: response.response?.role, content: response.response?.content, link: response.response?.link}])
                }

                if(response.response && !!response.response.customerId && !customerId){
                   setCustomerId(response.response.customerId);
                }
            }
        }

        if(values.content){
            const isInRealtime = Boolean(onRealTime?.mode);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if(!isInRealtime) setOnChats((prev:any) => [...prev, {role:"user", content: values.content}]);
            setOnLLMResponding(!isInRealtime);
    
            console.log("🔴This is the realtime bool for responding at realtime", !!onRealTime?.chatRoom)

            const response = await onLLMAssistant(currentBotId, onChats as ChatTypeForLLM, "user", values.content, customerId)
            
            setOnLLMResponding(false);
            if(response){
                
                if(response.live){
                    setOnRealtime(prev => ({
                        ...prev,
                        chatRoom: response.chatRoom,
                        mode: response.live
                    }))
                }else {
                    //@ts-expect-error The error is not valid as the response potentially contains a link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
                    setOnChats((prev: any) => [...prev, {role: response.response?.role, content: response.response?.content, link: response.response?.link}])
                }

                if(response.response && !!response.response.customerId && !customerId){
                   setCustomerId(response.response.customerId);
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