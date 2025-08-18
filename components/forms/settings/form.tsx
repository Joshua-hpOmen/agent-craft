"use client"
import { Separator } from '@/components/ui/separator'
import { useSettings } from '@/hooks/settings/use-settings'
import { PlanType, RuntimeChatbotType } from '@/types'
import React from 'react'
import DomainUpdate from './doamin-update'
import CodeSnippet from './code-snippet'
import PremiumBadge from '@/icons/premium-badge'
import EditChatBot from './edit-chatbot'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Loader from '@/components/global/loader'

const WelcomeMessage = dynamic(() => import('./greetings-message'),{ssr: false})

type Props = {
    id: string,
    name: string,
    plan: PlanType,
    chatBot: RuntimeChatbotType 
}

const SettingsForm = (props: Props) => {
    const {register, onDeleteDomain, onUpdateSettings, errors, loading, deleting} =  useSettings(props.id);

  return (
    <form className='flex flex-col gap-8 pb-10' onSubmit={onUpdateSettings}>

        <div className='flex flex-col gap-3'>

            <h2 className='font-bold text-2xl'>Domain Settings</h2>
            <Separator />
            <DomainUpdate name={props.name} register={register} errors={errors}/> 

            <CodeSnippet id={props.id}/>

        </div>

        <div className='flex flex-col gap-3 mt-5'>
        
            <div className="flex gap-4 items-center">
                
                <h2 className="font-bold text-2xl">Chatbot Settings</h2>

                <div className='flex gap-1 bg-cream rounded-full px-3 py-1 text-xs items-center font-bold'>
                    <PremiumBadge/>
                    Premium
                </div>

            </div>

            <Separator /> 

            <div className="grid md:grid-cols-2 md:justify-start">

                <div className="flex flex-col gap-5 md:order-first order-last">
                    <EditChatBot
                        chatBot={props.chatBot}
                        register={register}
                        errors={errors}
                    />

                    <WelcomeMessage
                        message={props.chatBot?.welcomeMessage as string}
                        register={register}
                        errors={errors}
                    />

                </div>

                <div className='relative'>

                    <Image
                        src={"/images/bot-ui.png"}
                        className='sticky top-0'
                        alt='Bot UI image'
                        width={530}
                        height={769}
                    />

                </div>

            </div>
        </div>

        <div className='flex gap-5 justify-end'>
            
            <Button onClick={onDeleteDomain} variant={"destructive"} className='px-10 h-[50px]' type="button">
                <Loader loading={deleting}>Delete Domain</Loader>
            </Button>

            <Button className='w-[100px] h-[50px]' type='submit'>
                <Loader loading={loading}>Save</Loader>
            </Button>
        </div>
    </form>
  )
}

export default SettingsForm