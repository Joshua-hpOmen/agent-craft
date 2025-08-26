"use client"
import { useChatBot } from '@/hooks/chatbot/use-chatbot'
import { BotIcon } from '@/icons/bot-icon'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Botwindow from './bot-window'

type Props = {}

const LLMChatBot = (props: Props) => {
  const { botOpened, onOpenChatbot, onStartChatting, onChats, register, onLLMResponding, messageWindowRef, currentChatbot, loading, setOnChats, onRealTime } = useChatBot()
  return (

    <div className='h-screen flex flex-col justify-end items-end gap-4 bg-background'>

      {
        botOpened && <Botwindow
          setChat={setOnChats}
          realtimeMode={onRealTime}
          helpDesk={currentChatbot!.helpdesk}
          domainName={currentChatbot!.name}
          ref={messageWindowRef}
          help={!!currentChatbot?.helpdesk.length}
          theme={currentChatbot?.chatBot?.background}
          textColor={currentChatbot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onLLMResponding}
        />

      }

      <div className={cn("rounded-full relative cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis", loading ? "invisible" : "visible")} onClick={onOpenChatbot}>

        {
          currentChatbot?.chatBot?.icon ? (
            <Image alt='Bot-image' fill src={`https://ucarecdn/${currentChatbot.chatBot.icon}/-/preview/3000x3000`} />
          ) : (
            <BotIcon />
          )
        }

      </div>

    </div>

  )
}

export default LLMChatBot