import React from 'react'
import PortalBanner from './_components/portal-banner'

type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
  return (
    <div className="flex h-screen container justify-between flex-col">

        <PortalBanner/>
        <div className="container flex justify-center flex-1">
            {props.children}
        </div>

    </div>
  )
}

export default layout