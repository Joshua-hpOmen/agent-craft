"use client"
import { useChatWindow } from '@/hooks/conversations/use-chat-window'
import React from 'react'
import Loader from './loader'
import Bubble from './bubble'
import { Button } from '../ui/button'
import { PaperclipIcon } from 'lucide-react'
import { Textarea } from '../ui/textarea'

const Messenger = () => {
    const { messageWindoweRef, register, onHandleSentMessage, chats, loading, chatRoom } = useChatWindow();

  return (
    <div className='flex-1 flex flex-col h-0 relative overflow-y-auto scrollHide'>

        <div className="flex-1 h-0 w-full flex flex-col">

            <Loader loading={loading}>
                <div className="w-full flex-1 h-0 flex flex-col gap-3 pl-5 py-5 chat-window overflow-y-auto" ref={messageWindoweRef}>

                    {
                        chats.length ? (
                            chats.map(chat => (
                                <Bubble
                                    key={chat.id}
                                    message={{role: chat.role! as "assistant" | "user", content: chat.message}}
                                    createdAt={chat.createdAt}
                                />
                            ))
                        ) : <div>No Chat selected</div>
                    }

                </div>
            </Loader>

        </div>

        <form className='flex px-3 pt-3 pb-10 flex-col backdrop-blur-sm bg-muted w-full' onSubmit={onHandleSentMessage}>
                
            <div className="flex justify-between">
                <Textarea {...register("content")} placeholder='Type your message' className='focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none resize-none whitespace-pre-wrap break-words overflow-x-hidden overflow-y-auto'/>

                <div className='flex gap-2 justify-center items-center px-5 w-[170px] flex-row-reverse'>
                    <Button className='px-7' type='submit' disabled={!chatRoom || loading}>
                        Send
                    </Button>

                    <PaperclipIcon className='stroke-muted-foreground'/>
                </div>
            </div> 
        </form>

    </div>
  )
}

export default Messenger