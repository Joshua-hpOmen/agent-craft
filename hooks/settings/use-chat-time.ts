"use client"
import {format} from "date-fns"

import { useChatContext } from "@/context/user-chat-context"
import React from "react";
import { onViewUnReadMessages } from "@/actions/conversations/on-view-unread-messages";

export const useChatTime = (createdAt: Date, roomId: string) => {
    const {chatRoom} = useChatContext();
    const [messageSentAt, setMessageSentAt] = React.useState<string>();
    const [urgent, setUrgent] = React.useState(false);

    const onSetMessageRecievedDate = React.useCallback(() => {
        const dateRecieved = new Date(createdAt);
        const current = new Date();
        const difference = current.getDate() - dateRecieved.getDate();

        if(difference <= 0){
            setMessageSentAt(format(dateRecieved, "hh : mm a"));

            if(current.getHours() - dateRecieved.getHours() < 2){
                setUrgent(true);
            }
        } else {
            setMessageSentAt(`${dateRecieved.getDate} ${format(dateRecieved, "LLLL")}`);
        }
    }, [createdAt])

    const onSeenChat = React.useCallback(async () => {

        if(chatRoom === roomId && urgent) {
            await onViewUnReadMessages(roomId);
            setUrgent(false)
        }

    }, [chatRoom, roomId, urgent]);

    React.useEffect(() => {

        onSeenChat()

    }, [chatRoom, onSeenChat]);

    React.useEffect(() => {
        onSetMessageRecievedDate();
    }, [onSetMessageRecievedDate])

    return {messageSentAt, urgent, onSeenChat};
}