import React from 'react'
import TabsMenu from '../tabs'
import { HELP_DESK_TABS_MENU } from '@/constants/menu'
import { TabsContent } from '../ui/tabs'
import HelpDesk from './help-desk'
import FileterQuestions from './filter-questions'

type Props = {
    id: string,
}

const BotTrainingForm = (props: Props) => {
  return (
    <div className='py-5 mb-10 flex-col gap-5 items-start'>

        <div className="flex flex-col gap-24">
            <h2 className="font-bold text-2xl ">Bot Training</h2>
        </div>

        <p className="text-sm font-light">
            Set FAQ questions, create questions for capturing lead information and train your bot to act the way you wnat it to.
        </p>

        <br />

        <TabsMenu triggers={HELP_DESK_TABS_MENU}>

            <TabsContent value='help desk' className='w-full'>
                <HelpDesk id={props.id}/>
            </TabsContent>

            <TabsContent value='questions'>
                <FileterQuestions id={props.id}/>
            </TabsContent>

        </TabsMenu>
    </div>
  )
}

export default BotTrainingForm