import { cn } from '@/lib/utils'
import { MENU_ITEMS_SIZES } from '@/types'
import Link from 'next/link'
import React from 'react'

type Props = {
    size: MENU_ITEMS_SIZES,
    label: string,
    icon: React.FC,
    path?: string,
    current?: string,
    onSignOut?: () => void
}

const MenuItem = (props: Props) => {
  
  return (
    <Link onClick={props.onSignOut} className={cn("flex items-center gap-2 px-1 py-2 rounded-lg my-1", !props.current ? "text-gray-500": props.current === "plan" ? "bg-white font-bold text-black" : "text-gray-500")} href={props.path ? `/${props.path}` : "#"}>
        {<props.icon/>}
        {props.size === MENU_ITEMS_SIZES.MAX && props.label}
    </Link>
  )
}

export default MenuItem