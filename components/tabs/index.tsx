import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { cn } from '@/lib/utils'

type Props = {
    triggers: {
        label: string,
        icon?: React.FC
    }[],
    children: React.ReactNode,
    className?: string,
    button?: React.FC
}

const TabsMenu = (props: Props) => {
  return (
    <Tabs defaultValue={props.triggers[0].label}>

        <TabsList className={cn("pr-5", props.className)}>

            {
                props.triggers.map((trigger) => (
                    <TabsTrigger key={trigger.label} value={trigger.label} className='capitalize flex gap-2 font-semibold'>
                        {trigger.icon && <trigger.icon/>}
                        {trigger.label}
                    </TabsTrigger>
                ))
            }

            {props.button && <props.button/>}

        </TabsList>
        
        {props.children}
    </Tabs>
  )
}

export default TabsMenu