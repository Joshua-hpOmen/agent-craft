import Section from '@/components/global/section-label'
import UploadButton from '@/components/global/upload-button'
import { BotIcon } from '@/icons/bot-icon'
import { RuntimeChatbotType } from '@/types'
import Image from 'next/image'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    chatBot: RuntimeChatbotType
}

const EditChatBot = (props: Props) => {
  return (
    <div className='py-5 flex flex-col gap-5 items-start'>
        <Section label='Chatbot Icon' message="Change the icon for the chatbot." />

        <UploadButton register={props.register} errors={props.errors} label='Edit Image'/>

        {
            props.chatBot?.icon ? (
                <div className='rounded-full overflow-hidden self-end'>
                    <Image src={`https://ucarecdn.com/${props.chatBot.icon}/-/preview/3000x3000`} alt='Chatbot Icon' width={80} height={80} />
                </div>
            ): <div className='rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis self-end'>
                <BotIcon/>
            </div>
        }
    </div>
  )
}

export default EditChatBot