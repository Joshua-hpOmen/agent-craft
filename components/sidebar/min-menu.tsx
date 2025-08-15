import { SIDE_BAR_MENU } from '@/constants/menu'
import { MenuLogo } from '@/icons/menu-logo'
import React from 'react'
import MenuItem from './menu-item'
import { MENU_ITEMS_SIZES } from '@/types'
import DomainMenu from './domain-menu'
import { LogOutIcon, MonitorSmartphoneIcon } from 'lucide-react'

type Props ={
    onExpand: () => void,
    current: string,
    onSignOut: () => void,
    domains: {
        id: string,
        name:string,
        icon: string | null,
    }[] | null | undefined,
}


const MinMenu = (props: Props) => {
  return (
    <div className="p-3 flex flex-col items-center h-full">
      <span className="animate-fade-in delay-300 fill-mode-forwards cursor-pointer">
        <MenuLogo onClick={props.onExpand} />
      </span>
      <div className="animate-fade-in delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem
              size={MENU_ITEMS_SIZES.MIN}
              {...menu}
              key={key}
              current={props.current}
            />
          ))}
          <DomainMenu
            min
            domains={props.domains}
          />
        </div>
        <div className="flex flex-col">
          <MenuItem
            size={MENU_ITEMS_SIZES.MIN}
            label="Sign out"
            icon={LogOutIcon}
            onSignOut={props.onSignOut}
          />
          <MenuItem
            size={MENU_ITEMS_SIZES.MIN}
            label="Mobile App"
            icon={MonitorSmartphoneIcon}
          />
        </div>
      </div>
    </div>
  )
}

export default MinMenu