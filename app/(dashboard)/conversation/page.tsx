import { onGetAllAccountDomains } from '@/actions/settings'
import ConversationMenu from '@/components/global/conversation-menu'
import InfoBar from '@/components/global/info-bar'
import Messenger from '@/components/global/messenger'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const page = async () => {
  const domains = await onGetAllAccountDomains()
  return (
    <div className="min-w-full h-full flex max-h-full overflow-hidden">

        <ConversationMenu domain={domains?.domains} />
        
        <Separator orientation='vertical' />

        <div className="flex-1 flex flex-col">
            <div className="px-5">
                <InfoBar />
            </div>

            <Messenger />
        </div>
    

    </div>
  )
}

export default page