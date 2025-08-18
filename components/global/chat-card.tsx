"use client"
import { useChatTime } from '@/hooks/settings/use-chat-time'
import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { UserIcon } from 'lucide-react'
import { UrgentIcon } from '@/icons/urgent-icon'

type Props = {
    title: string,
    description?: string,
    createdAt: Date,
    id: string,
    onChat: () => void,
    seen?: boolean
}

const ChatCard = (props: Props) => {
  const { messageSentAt, urgent } = useChatTime(props.createdAt, props.id) 

  return (
   <Card className='rounded-none border-r-0 hover:bg-muted cursor-pointer transition duration-150 ease-in-out' onClick={props.onChat}>
        
        <CardContent className='py-4 flex gap-3'>

            <div>
                <Avatar>
                    <AvatarFallback className='bg-mute'>
                        <UserIcon/>
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="flex justify-between w-full">
                <div>

                    <div className="fkex gap-5 items-center">

                        <CardDescription className='font-bold leading-none text-gray-600'>
                            {props.title}
                        </CardDescription>
                    
                        {urgent && !props.seen && <UrgentIcon />}

                    </div>

                    <CardDescription>
                        {props.description ? props.description.substring(0, 20) + "..." : "This chatroom is empty"}
                    </CardDescription>

                </div>

                <div className='w-[100px] flex justify-end'>
                    <CardDescription className='text-xs'>
                        {props.createdAt ? messageSentAt : ""}
                    </CardDescription>
                </div>

            </div>

        </CardContent>

   </Card> 
  )
}

export default ChatCard