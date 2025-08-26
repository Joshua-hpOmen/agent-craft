import React from 'react'
import PortalBanner from './_components/portal-banner'

type Props = {
    children: React.ReactNode
}

const layout = (props: Props) => {
  return (
    <div className="flex container justify-between">

        <PortalBanner/>
        <div className="container flex justify-center flex-1 h-0">
            {props.children}
        </div>

    </div>
  )
}

export default layout