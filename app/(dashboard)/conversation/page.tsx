import { onGetAllAccountDomains } from '@/actions/settings'
import ConversationMenu from '@/components/global/conversation-menu'
import InfoBar from '@/components/global/info-bar'
import Messenger from '@/components/global/messenger'
import { Separator } from '@/components/ui/separator'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  const domains = await onGetAllAccountDomains()
  return (
    <div className="w-full h-full flex">

        <ConversationMenu domain={domains?.domains} />
        
        <Separator orientation='vertical' />

        <div className="w-full flex flex-col">
            <div className="px-5">
                <InfoBar />
            </div>

            <Messenger />
        </div>
    

    </div>
  )
}

export default page