import { onGetChatMessages } from "@/actions/conversations/on-get-chat-messages"
import { onGetDomainChatRooms } from "@/actions/conversations/on-get-domain-chat-rooms"
import { useChatContext } from "@/context/user-chat-context"
import { COnversationSearchSchema, ConversationSearchType } from "@/schema/conversation-schema"
import { ChatRoomsType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"

export const useConversation = () => {

    const {register, watch, control} = useForm<ConversationSearchType>({
        resolver: zodResolver(COnversationSearchSchema),
        mode: "onChange"
    })

    const {setLoading: loadMessage, setChat, setChatRoom} = useChatContext();

    const [chatRooms, setChatRooms] = React.useState<ChatRoomsType>([]);
    const [loading, setLoading] = React.useState(false);
    const [activeChatId, setActiveChat] = React.useState("");
    const [activeDomain, setActiveDomain] = React.useState<string>("")

    React.useEffect(() => {

       const search = watch(async (value) => {

        setLoading(true);

        try {
     
            const rooms = await onGetDomainChatRooms(value.domain!)
            if(!!rooms?.customer.length) {
                setLoading(false);
                setChatRooms(rooms.customer);
                setActiveDomain(value.domain!)
            }
 
        } catch (error) {
         console.log("🔴There was an error in the useConversation hook", error) 
        }

       }) 


       return () => search.unsubscribe();


    }, [watch])

    const triggerRefresh = async () => {
        const rooms = await onGetDomainChatRooms(activeDomain);
        if(!rooms) return;
        setChatRooms(rooms.customer);
    }

    const onGetActiveChatMessages = async (id: string) => {

        try {
           
            loadMessage(true);
            const messages = await onGetChatMessages(id);
            if(messages){
                setChatRoom(id);
                loadMessage(false);
                setChat(messages[0].message)
            }

        } catch (error) {
           console.log("🔴There was an error in the onGetActiveChatMessages function", error) 
        }

    }

    return {
        register,
        chatRooms,
        loading,
        onGetActiveChatMessages,
        control,
        setActiveChat,
        activeChatId,
        triggerRefresh 
    }

}