import { cn, extractUUIDFromString } from '@/lib/utils'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { UserIcon } from 'lucide-react'
import {format} from "date-fns"
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    message: {
        role: "assistant" | "user",
        content: string,
        link?: string
    },
    createdAt?: Date
}

const Bubble = (props: Props) => {
  const newDate = new Date();
  const image = extractUUIDFromString(props.message.content);
  
  return (
    <div className={cn("flex gap-2 items-end", props.message.role === "assistant" ? "self-start": "self-end flex-row-reverse")}>

        {
            props.message.role === "assistant" ? <Avatar className='w-5 h-5'>
                <AvatarImage alt='@shadcn' src={'https://github.com/shadcn.png'}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar> : <Avatar className='w-5 h-5'>
                <AvatarFallback>
                    <UserIcon/>
                </AvatarFallback>
            </Avatar>
        }
        <div className={cn("flex flex-col-reverse gap-3 min-w-[200px] max-w-[300px] p-4 rounded-t-md", props.message.role === "assistant" ? "bg-muted rounded-r-md" : "bg-grandis rounded-l-md")}>

            {
                props.createdAt ? <div className="flex gap-2 text-xs text-gray-600">
                    <p>
                        {format(props.createdAt, "MMMM yyyy")}
                    </p>
                    <p>
                        {format(props.createdAt, "hh:mm a")}
                    </p>
                </div> : <div className="text-xs">
                    {format(newDate, "hh:mm a")}
                </div>
            }

            {
                image ? <div className="relative aspect-square">
                    <Image src={`https://ucarecdn.com/${image[0]}/-/preview/3000x3000`} fill alt="Icon/avatar" />
                </div> : <p className="text-sm">
                    {props.message.content.replace("(complete)", " ")}
                    {
                        props.message.link && <Link className='underline font-bold pl-2' href={props.message.link} target='_blank'>
                            Your link
                        </Link>
                    }
                </p>
            }

        </div>

    </div>
  )
}

export default Bubble