"use client"
import { useChatTime } from '@/hooks/conversations/use-chat-time'
import React from 'react'
import { Card, CardContent, CardDescription } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon, UserIcon } from 'lucide-react'
import { UrgentIcon } from '@/icons/urgent-icon'
import { cn } from '@/lib/utils'

type Props = {
    title: string,
    description?: string | undefined,
    createdAt: Date,
    id: string,
    onChat: () => void,
    seen?: boolean,
    setActiveChat: () => void,
    activeChatId: string,
    stared: boolean
}

//WIP

const ChatCard = (props: Props) => {
  const { messageSentAt, urgent } = useChatTime(props.createdAt, props.id);

  return (
   <Card className={cn('rounded-2 border-r-0 hover:bg-muted cursor-pointer transition duration-150 ease-in-out p-0', props.activeChatId === props.id && "bg-orange/40")} onClick={() => {props.onChat(); props.setActiveChat()}}>
        
        <CardContent className='py-4 flex gap-3'>

            <div>
                <Avatar>
                    <AvatarFallback className='bg-muted'>
                        <UserIcon/>
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="flex justify-between w-full gap-2 items-center">
                <div>

                    <div className="flex gap-5 items-center justify-center">

                        <CardDescription className='font-bold leading-none text-gray-600'>
                            {props.title}
                        </CardDescription>

                        <div className='flex gap-1 items-center px-1'>
                            {urgent && !props.seen && <UrgentIcon />}
                            {props.stared && <StarIcon stroke='orange'/>} 
                        </div>

                    </div>

                    <CardDescription>
                        {props.description ? props.description.substring(0, 20) + "..." : "This chatroom is empty"}
                    </CardDescription>

                </div>

                <div className='flex w-[70px] justify-end'>
                    <CardDescription className='text-xs text-nowrap'>
                        {props.createdAt ? messageSentAt : ""}
                    </CardDescription>
                </div>

            </div>

        </CardContent>

   </Card> 
  )
}

export default ChatCard