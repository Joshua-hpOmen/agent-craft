import React from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '../ui/drawer'

type Props = {
    onOpen: React.ReactNode,
    children: React.ReactNode,
    title: string
    description: string,
}

const AppDrawer = (props: Props) => {
  return (
    <Drawer>

        <DrawerTrigger>
            {props.onOpen}
        </DrawerTrigger>

        <DrawerContent>

            <div className='container flex flex-col items-center gap-2 pb-10'>

                <DrawerTitle>
                    {props.title}
                </DrawerTitle>

                <DrawerDescription>
                    {props.description}
                </DrawerDescription>

                {props.children}

            </div>

        </DrawerContent>

    </Drawer>
  )
}

export default AppDrawer