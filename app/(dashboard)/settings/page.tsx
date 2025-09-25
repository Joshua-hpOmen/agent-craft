import InfoBar from '@/components/global/info-bar'
import BillingSetting from '@/components/settings/billing-settings'
import ChangePassword from '@/components/settings/change-password'
import DarkModeToggle from '@/components/settings/dark-mode-toggle'
import React from 'react'

const page = () => {
  return (
    <>
        <InfoBar/>
        <div className='overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10'>
            <BillingSetting />
            <DarkModeToggle/>
            <ChangePassword/>
        </div>
    </>
  )
}

export default page