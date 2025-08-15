import { SIDE_BAR_MENU } from '@/constants/menu'
import { LogOutIcon, MenuIcon, MonitorSmartphoneIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import DomainMenu from './domain-menu'
import { MENU_ITEMS_SIZES } from '@/types'
import MenuItem from './menu-item'

type Props = {
    onExpand: () => void,
    current: string,
    onSignOut: () => void,
    domains: {
        id: string,
        name:string,
        icon: string | null,
    }[] | null | undefined
}

const MaxMenu = (props: Props) => {
  return (
    <div className='py-3 px-4 flex flex-col h-full'>

        <div className='flex justify-between items-center'>

            <Image alt='Logo' src="/images/logo.png" style={{width: "50%", height: 'auto'}} width={400} height={0}/>

            <MenuIcon className='cursor-pointer fill-mode-forwards' onClick={props.onExpand}/>

        </div>
        
        <div className='animate-fade-in fill-mode-forwards flex flex-col justify-between h-full pt-10 '>

            <div className='flex flex-col'>

                <p className='text-xs text-gray-500 mb-3'>
                    Menu
                </p>

                {SIDE_BAR_MENU.map((menu, key) => (
                    <MenuItem 
                        size={MENU_ITEMS_SIZES.MAX}
                        {...menu}
                        key={key}
                        current={props.current}
                    />
                ))}

                <DomainMenu domains={props.domains} />

            </div>

            <div className='flex flex-col'>
                <p className='text-xs text-gray-500 mb-4'>OPTIONS</p>
                <MenuItem
                    size={MENU_ITEMS_SIZES.MAX}
                    label="Sign Out"
                    icon={LogOutIcon}
                    onSignOut={props.onSignOut}
                />

                <MenuItem
                    size={MENU_ITEMS_SIZES.MAX}
                    label="Mobile App"
                    icon={MonitorSmartphoneIcon}
                />   

            </div>

        </div>

    </div>
  )
}

export default MaxMenu