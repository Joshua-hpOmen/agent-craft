import { SIDE_BAR_MENU } from '@/constants/menu'
import { LogOutIcon, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import DomainMenu from './domain-menu'

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

            <Image alt='Logo' src="/images/logo.png" width={0} height={0} style={{width: "50%", height: 'auto'}} />

            <MenuIcon className='cursor-pointer fade-in opacity-0 delay-300 fill-mode-forwards' onClick={props.onExpand}/>

        </div>
        
        <div className='animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10 '>

            <div className='flex flex-col'>

                <p className='text-xs text-gray-500 mb-3'>
                    Menu
                </p>

                {SIDE_BAR_MENU.map((menu, key) => (
                    <MenuItem 
                        size="max"
                        {...menu}
                        key={key}
                        current={props.current}
                    />
                ))}

                <DomainMenu domains={props.domains} />

                <div className='flex flex-col'>
                    <p className='text-xs text-gray-500 mb-4'>OPTIONS</p>
                    <MenuItem
                        size="max"
                        label="Sign Out"
                        icon={LogOutIcon}
                        
                </div>
            </div>

        </div>

    </div>
  )
}

export default MaxMenu