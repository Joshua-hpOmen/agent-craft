"use client"
import useSidebar from '@/context/use-side-bar'
import { cn } from '@/lib/utils'
import React from 'react'
import MaxMenu from './max-menu'
import MinMenu from './min-menu'

type Props = {
    domains: {
        id: string,
        name: string,
        icon: string
    }[] | undefined | null
}

const Sidebar = (props: Props) => {
    const { expand, onExpand, page, onSignOut } = useSidebar()

  return (
    <div className={cn("bg-cream h-full w-[60px] fill-mode-forwards fixed md:relative", expand ? "open-sidebar" : "close-sidebar")}>

      {expand ? (
        <MaxMenu
          domains={props.domains}
          current= {page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ): (
        <MinMenu
          domains={props.domains}
          current= {page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      )}

    </div>
  )
}

export default Sidebar