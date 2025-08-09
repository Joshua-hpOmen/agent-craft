"use client"
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useChatContext } from './user-chat-context'
import { toast } from 'sonner'
import { onToggleRealtime } from '@/actions/conversations/on-toggle-realtime'
import { onGetConversationMode } from '@/actions/conversations/on-get-conversation'
import { useClerk } from '@clerk/nextjs'

const useSidebar = () => {
    const [expand, setExpand] = React.useState<boolean | undefined>(undefined)
    const router = useRouter();
    const pathname = usePathname();
    const [realtime, setRealTime] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)

    const {chatRoom} = useChatContext();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onActivateRealTime = async (e: any) => {

        try {
           
           const realtime = await onToggleRealtime(
                chatRoom!,
                e.target.ariachecked === "true" ? false : true  
           ) 
        
           if(realtime) {
                setRealTime(realtime.chatRoom.live)
                toast.success(`Success\n${realtime.message}`, {id: "activat-realtime"})
           }

        } catch (error) {
            console.log("🔴There was an error in onActivateRealTime", error)            
        }
    }

    const onGetCurrentMode = React.useCallback(async () => {
        setLoading(true);
        const mode = await onGetConversationMode(chatRoom!)
        if(mode) {
            setRealTime(mode.live);
            setLoading(false)
        }
    }, [chatRoom])

    React.useEffect(() => {
        if(chatRoom) { onGetCurrentMode() }
    }, [chatRoom, onGetCurrentMode])

    const page = pathname.split("/").pop()
    const {signOut} = useClerk()
    const onSignOut = () => signOut(() => router.push("/"))
    const onExpand = () => setExpand(prev => !prev) 

    return {
        expand,
        onExpand,
        page,
        onSignOut,
        realtime,
        onActivateRealTime,
        chatRoom,
        loading
    }
}

export default useSidebar