import InfoBar from '@/components/global/info-bar'
import BillingSetting from '@/components/settings/billing-settings'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
        <InfoBar/>
        <div className='overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10'>
            <BillingSetting />
        </div>
    </>
  )
}

export default page