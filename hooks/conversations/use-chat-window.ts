"use client"

import { onOwnerSentMessage } from "@/actions/conversations/on-owner-sent-message";
import { onRealTimeChat } from "@/actions/conversations/on-real-time-chat";
import { useChatContext } from "@/context/user-chat-context"
import { pusherClient } from "@/lib/utils";
import { ChatMessageSchema, ChatMessageType } from "@/schema/conversation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { cuid } from "zod";

export const useChatWindow = () => {
    const {chats, loading, setChat, chatRoom} = useChatContext();

    const messageWindoweRef = React.useRef<HTMLDivElement | null>(null);

    const {register, handleSubmit, reset} = useForm<ChatMessageType>({
        resolver: zodResolver(ChatMessageSchema),
        mode: "onChange"
    })

    const onScrollToBotton = React.useCallback(() => {

        if(!messageWindoweRef.current) return;
        messageWindoweRef.current.scroll({
            top: messageWindoweRef.current.scrollHeight,
            left: 0, 
            behavior: "smooth",
        });

    }, []);

    React.useEffect(() => {
       onScrollToBotton(); 
    }, [onScrollToBotton, messageWindoweRef, chats]);

    
    //WIP

    React.useEffect(() => {
        
        if(!chatRoom) return;

        pusherClient.subscribe(chatRoom);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pusherClient.bind("realtime-mode", (data: any) => {
            setChat(prev => [...prev, data.chat])
        })

        return () => {
            pusherClient.unbind("realtime-mode");
            pusherClient.unsubscribe(chatRoom)
        };

    }, [chatRoom, setChat]);

    const onHandleSentMessage = handleSubmit(async (values) => {

        try {
           
            reset()

            if(!values.content) return;

            onOwnerSentMessage(chatRoom!, values.content!, "assistant");

            await onRealTimeChat(
                chatRoom!,
                values.content,
                `${cuid()}`,
                "assistant"
            )


        } catch (error) {
           console.log("🔴There was an error in the onHandleSentMessage function", error) 
        }

    })

    return {
        messageWindoweRef,
        register,
        onHandleSentMessage,
        chats,
        loading,
        chatRoom
    }

}