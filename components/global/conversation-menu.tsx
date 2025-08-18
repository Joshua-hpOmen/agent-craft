'use client'
import { useConversation } from '@/hooks/conversations/use-conversation'
import { DomainsType } from '@/types'
import React from 'react'
import TabsMenu from '../tabs'
import { TABS_MENU } from '@/constants/menu'
import { TabsContent } from '../ui/tabs'
import ConversationSearch from './search-conversation'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import Loader from './loader'
import { CardDescription } from '../ui/card'
import ChatCard from './chat-card'

type Props = {
    domain:  DomainsType 
}

const ConversationMenu = (props: Props) => {
    const { register, chatRooms, loading, onGetActiveChatMessages } = useConversation();
  return (
    <div className='py-3 pr-3'>
        <TabsMenu triggers={TABS_MENU}>

            <TabsContent value='unread'>
                <ConversationSearch 
                    domains={props.domain}
                    register={register as unknown as UseFormRegister<FieldValues>}
                />


                <div className='flex flex-col'>

                    <Loader loading={loading}>

                        {
                            chatRooms.length ? (
                                chatRooms.map(room => (
                                    <ChatCard
                                        key={room.chatRoom[0].id}
                                        id={room.chatRoom[0].id}
                                        onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                                        createdAt={room.chatRoom[0].message[0].createdAt}
                                        title={room.email!}
                                        description={room.chatRoom[0].message[0].message}
                                    />
                                ))  
                            ) : <CardDescription>
                                No chats for your domain
                            </CardDescription>
                        }

                    </Loader>

                </div>

            </TabsContent>

        </TabsMenu>
    </div>
  )
}

export default ConversationMenu