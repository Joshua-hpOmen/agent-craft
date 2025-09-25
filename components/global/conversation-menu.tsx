'use client'
import { useConversation } from '@/hooks/conversations/use-conversation'
import { DomainsType } from '@/types'
import React from 'react'
import TabsMenu from '../tabs'
import { TABS_MENU } from '@/constants/menu'
import { TabsContent } from '../ui/tabs'
import ConversationSearch from './search-conversation'
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import Loader from './loader'
import { CardDescription } from '../ui/card'
import ChatCard from './chat-card'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../ui/context-menu'
import { StarIcon, TrashIcon } from 'lucide-react'
import { onStarChatRoom } from '@/actions/chatbot/on-star-chat-room'
import { onDeleteChatRoom } from '@/actions/chatbot/on-delete-chat-room'

type Props = {
    domain:  DomainsType 
}

const ConversationMenu = (props: Props) => {
    const { register, chatRooms, loading, onGetActiveChatMessages, control, activeChatId, setActiveChat, triggerRefresh } = useConversation();
   
  return (
    <div className='py-3 pr-3 scrollHide max-h-full overflow-y-auto'>
        <TabsMenu triggers={TABS_MENU}>

            <TabsContent value='all'>
                <ConversationSearch 
                    domains={props.domain}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    control={control as unknown as Control<FieldValues>}
                />


                <div className='flex flex-col gap-1'>

                    <Loader loading={loading}>

                        {
                            !!chatRooms.length ? (
                                chatRooms.map(room => (
                                    !!room.chatRoom[0]?.message.length &&
                                        <ContextMenu  key={room.chatRoom[0].id}>
                                            <ContextMenuTrigger>
                                                <ChatCard
                                                    setActiveChat={() => setActiveChat(room.chatRoom[0].id)}
                                                    activeChatId={activeChatId}
                                                    id={room.chatRoom[0].id}
                                                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                                                    createdAt={room.chatRoom[0].message[0].createdAt}
                                                    title={room.email!}
                                                    description={room.chatRoom[0].message[0].message}
                                                    stared={room.chatRoom[0].stared}
                                                />
                                            </ContextMenuTrigger>

                                            <ContextMenuContent>
                                                <ContextMenuItem onClick={async () => { await onDeleteChatRoom(room.chatRoom[0].id); triggerRefresh()}}>
                                                    <TrashIcon className='stroke-red-700'/>Delete
                                                </ContextMenuItem>
                                                <ContextMenuItem onClick={async () => { await onStarChatRoom(room.chatRoom[0].id, room.chatRoom[0].stared); triggerRefresh()}}>
                                                    <StarIcon/>Star
                                                </ContextMenuItem>
                                            </ContextMenuContent>

                                        </ContextMenu>
                                ))  
                            ) : <CardDescription>
                                No chats for your domain
                            </CardDescription>
                        }

                    </Loader>

                </div>

            </TabsContent>
            <TabsContent value="unread">

                <ConversationSearch 
                    domains={props.domain}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    control={control as unknown as Control<FieldValues>}
                />

                <Loader loading={loading}>
                        {
                            !!chatRooms.length ? (
                                chatRooms.map(room => (
                                    !!room.chatRoom[0]?.message.length && !room.chatRoom[0].message[room.chatRoom[0].message.length  - 1].seen &&
                                        <ContextMenu  key={room.chatRoom[0].id}>
                                            <ContextMenuTrigger>
                                                <ChatCard
                                                    setActiveChat={() => setActiveChat(room.chatRoom[0].id)}
                                                    activeChatId={activeChatId}
                                                    id={room.chatRoom[0].id}
                                                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                                                    createdAt={room.chatRoom[0].message[0].createdAt}
                                                    title={room.email!}
                                                    description={room.chatRoom[0].message[0].message}
                                                    stared={room.chatRoom[0].stared}
                                                />
                                            </ContextMenuTrigger>

                                            <ContextMenuContent>
                                                <ContextMenuItem onClick={async () => { await onDeleteChatRoom(room.chatRoom[0].id); triggerRefresh()}}>
                                                    <TrashIcon className='stroke-red-700'/>Delete
                                                </ContextMenuItem>
                                                <ContextMenuItem onClick={async () => { await onStarChatRoom(room.chatRoom[0].id, room.chatRoom[0].stared); triggerRefresh() }}>
                                                    <StarIcon/>Star
                                                </ContextMenuItem>
                                            </ContextMenuContent>

                                        </ContextMenu>
                                ))  
                            ) : <CardDescription>
                                No chats for your domain
                            </CardDescription>
                        }
                </Loader>


            </TabsContent>

            <TabsContent value='expired'>


                <ConversationSearch 
                    domains={props.domain}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    control={control as unknown as Control<FieldValues>}
                />

                <Loader loading={loading}>
                        {
                            !!chatRooms.length ? (
                                chatRooms.map(room => {
                                    const isUrget = room.chatRoom[0]?.message[room.chatRoom[0].message.length  - 1].createdAt.getHours() - new Date().getHours();

                                    return !!room.chatRoom[0]?.message.length && !isUrget  &&
                                        <ContextMenu  key={room.chatRoom[0].id}>
                                            <ContextMenuTrigger>
                                                <ChatCard
                                                    setActiveChat={() => setActiveChat(room.chatRoom[0].id)}
                                                    activeChatId={activeChatId}
                                                    id={room.chatRoom[0].id}
                                                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                                                    createdAt={room.chatRoom[0].message[0].createdAt}
                                                    title={room.email!}
                                                    description={room.chatRoom[0].message[0].message}
                                                    stared={room.chatRoom[0].stared}
                                                />
                                            </ContextMenuTrigger>

                                            <ContextMenuContent>
                                                <ContextMenuItem onClick={async () => { await onDeleteChatRoom(room.chatRoom[0].id); triggerRefresh()}}>
                                                    <TrashIcon className='stroke-red-700'/>Delete
                                                </ContextMenuItem>
                                                <ContextMenuItem onClick={async () => { await onStarChatRoom(room.chatRoom[0].id, room.chatRoom[0].stared); triggerRefresh() }}>
                                                    <StarIcon/>Star
                                                </ContextMenuItem>
                                            </ContextMenuContent>

                                        </ContextMenu>
                                })  
                            ) : <CardDescription>
                                No chats for your domain
                            </CardDescription>
                        }
                </Loader>

            </TabsContent>

            <TabsContent value='starred'>

                <ConversationSearch 
                    domains={props.domain}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    control={control as unknown as Control<FieldValues>}
                />

                <Loader loading={loading}>
                        {
                            !!chatRooms.length ? (
                                chatRooms.map(room => (
                                    !!room.chatRoom[0]?.message.length && room.chatRoom[0].stared &&
                                        <ContextMenu  key={room.chatRoom[0].id}>
                                            <ContextMenuTrigger>
                                                <ChatCard
                                                    setActiveChat={() => setActiveChat(room.chatRoom[0].id)}
                                                    activeChatId={activeChatId}
                                                    id={room.chatRoom[0].id}
                                                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                                                    createdAt={room.chatRoom[0].message[0].createdAt}
                                                    title={room.email!}
                                                    description={room.chatRoom[0].message[0].message}
                                                    stared={room.chatRoom[0].stared}
                                                />
                                            </ContextMenuTrigger>

                                            <ContextMenuContent>
                                                <ContextMenuItem onClick={async () => { await onDeleteChatRoom(room.chatRoom[0].id); triggerRefresh() }}>
                                                    <TrashIcon className='stroke-red-700'/>Delete
                                                </ContextMenuItem>
                                                <ContextMenuItem onClick={async () => { await onStarChatRoom(room.chatRoom[0].id, room.chatRoom[0].stared); triggerRefresh() }}>
                                                    <StarIcon/>Star
                                                </ContextMenuItem>
                                            </ContextMenuContent>

                                        </ContextMenu>
                                ))  
                            ) : <CardDescription>
                                No chats for your domain
                            </CardDescription>
                        }
                </Loader>

            </TabsContent>

        </TabsMenu>
    </div>
  )
}

export default ConversationMenu