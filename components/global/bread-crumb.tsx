"use client"
import useSidebar from '@/context/use-side-bar'
import React from 'react'
import Loader from './loader'
import { Switch } from '../ui/switch'

type Props = {}

const BreadCrumb = (props: Props) => {
    //WIP: setup the header

    const {chatRoom, expand, loading, onActivateRealTime, onExpand, page, onSignOut, realtime} = useSidebar()
  return (
    <div className='flex flex-col'>

      <div className='fkex gap-5 items-center'>
        <h2 className='text-3xl font-bold capitalize'>{page}</h2>
        {page === "conversation" && chatRoom && <Loader loading={loading}>
          <Switch 
            defaultChecked={realtime}
            onClick={e => onActivateRealTime(e)}
            className='data-[state=checked]:bg-orange data-[state=unchecked]:bg-peach'
          />  
        </Loader>}
      </div>

      <p className="text-gray-500 text-sm">
        {page == 'settings'
          ? 'Manage your account settings, preferences and integrations'
          : page == 'dashboard'
          ? 'A detailed overview of your metrics, usage, customers and more'
          : page == 'appointment'
          ? 'View and edit all your appointments'
          : page == 'email-marketing'
          ? 'Send bulk emails to your customers'
          : page == 'integration'
          ? 'Connect third-party applications into Corinna-AI'
          : 'Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to.'}
      </p>

    </div>
  )
}

export default BreadCrumb