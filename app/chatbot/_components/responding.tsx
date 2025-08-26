import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const Responding = () => {
  return (
    <div className='self-start flex items-end gap-3'>
        
        <Avatar className='w-5 h-5'>
            <AvatarImage src={"https://github.com/shadcn.png"} alt='@shadcn' />

            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        
        <div className='chat-bubble'>

            <div className="typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>

        </div>

    </div>
  )
}

export default Responding