import Bubble from '@/components/global/bubble'
import TabsMenu from '@/components/tabs'
import { Accordion, AccordionContent, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { TabsContent } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { BOT_TABS_MENU } from '@/constants/menu'
import ChatIcon from '@/icons/chat-icon'
import { ChatMessageType } from '@/schema/conversation-schema'
import { AccordionItem } from '@radix-ui/react-accordion'
import { Link2Icon, SendIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import RealtimeMode from './realtime-mode'
import Responding from './responding'

type Props = {
  
  register: UseFormRegister<ChatMessageType>
  chats: { role: 'assistant' | 'user'; content: string; link?: string }[]
  onChat: () => void
  onResponding: boolean
  domainName: string
  theme?: string | null
  textColor?: string | null
  help?: boolean
  realtimeMode:
    | {
        chatRoom: string
        mode: boolean
      }
    | undefined
  helpDesk: {
    id: string
    question: string
    answer: string
    domainId: string | null
  }[]
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant'
        content: string
        link?: string | undefined
      }[]
    >
  >
}

const Botwindow = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return <div className='h-[650px] w-[450px] flex flex-col bg-white rounded-xl mr-[80px] border-[1px] overflow-hidden justify-between'>

       <div className="flex justify-between px-4 pt-4">

            <div className="flex gap-2">

                <Avatar className='w-20 h-20'>

                    <AvatarImage src={"https://github.com/shadcn.png"} alt='@shadcn'/>
                    <AvatarFallback>
                        CN
                    </AvatarFallback>
                </Avatar>

                <div className="flex items-start flex-col">

                    <h3 className="text-lg font-bold leading-none">Sales Rep - {props.domainName}</h3>

                    <p className="text-sm">
                        {props.domainName.split(".com")[0]}
                    </p>

                    {props.realtimeMode?.mode && <RealtimeMode setChats={props.setChat} chatRoomId={props.realtimeMode.chatRoom} />}
                    
                </div>

            </div>

            <div className="relative w-16 h-16">

                <Image fill alt='users' objectFit="contain" src={'/images/prop-user.png'} />

            </div>

        </div> 

        <TabsMenu triggers={props.help ? BOT_TABS_MENU :  [{label: "chat", icon: ChatIcon}]} className='w-full flex-1 mt-3 px-2'>

            <TabsContent value='chat'>

                <Separator />

                <div className="flex flex-col h-full">

                    <div ref={ref} style={{ backgroundColor: props.theme || "", color: props.textColor || ""}} className="px-3 flex h-[400px] flex-col py-5 gap-3 chat-window overflow-y-auto">

                        {
                            props.chats.map((chat, key) => (
                                <Bubble key={key} message={chat} /> 
                            ))
                        }

                        {props.onResponding && <Responding />}

                    </div>

                    <form className="flex px-3 flex-col flex-1 bg-porcelain" onSubmit={props.onChat}>

                        <div className="flex justify-between items-center">

                            <Textarea {...props.register("content")} className='focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 resize-none py-1 bg-porcelain rounded-none outline-none border-none overflow-y-auto' placeholder='Type your message...' />

                            <div className='flex gap-2 items-center'>
                                <Button type='submit' className='mt-3'>
                                    <SendIcon/>
                                </Button>

                                <Label htmlFor='bot-image'>

                                    <Link2Icon />
                                    <Input type='file' id='bot-image' {...props.register("image")} className='hidden' />
                        
                                </Label>
                            </div>
                        </div>

                    </form>

                </div>

            </TabsContent>

            {
                props.help && (
                    <TabsContent value="helpdesk">

                        <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col">

                            <div>
                                <h1 className='text-lg font-bold'>Help Desk</h1>

                                <p className='text-sm text-muted-foreground'>Browse from a list fo questions people usually ask.</p>
                            </div>

                            <Separator />

                            <Accordion type='single' collapsible defaultValue='item-1'>

                                {
                                    props.helpDesk.map((desk, index) => (
                                       <AccordionItem key={desk.id} value={`item-${index+1}`}>
                                        <AccordionTrigger>{desk.question}</AccordionTrigger>
                                        <AccordionContent>
                                           {desk.answer} 
                                        </AccordionContent>
                                       </AccordionItem> 
                                    ))
                                }
                            </Accordion>

                        </div>

                    </TabsContent>
                )
            }

        </TabsMenu>

    </div>
}) 

export default Botwindow
Botwindow.displayName = "Botwindow"