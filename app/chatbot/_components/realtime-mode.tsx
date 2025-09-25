import { Card } from '@/components/ui/card'
import { useRealtime } from '@/hooks/chatbot/use-realtime'
import React from 'react'

type Props = {
    chatRoomId: string,
    setChats: React.Dispatch<React.SetStateAction<{
        role: "assistant" | "user",
        content: string,
        link?: string | undefined
    }[]>>
}

const RealtimeMode = (props: Props) => {
  
  useRealtime(props.chatRoomId, props.setChats);

  return (
    <Card className='px-3 rounded-full py-1 bg-orange font-bold text-white text-sm'>
        Real Time
    </Card>
  )
}

export default RealtimeMode