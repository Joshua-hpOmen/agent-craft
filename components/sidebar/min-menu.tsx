import React from 'react'

type Props ={
    onExpand: () => void,
    current: string,
    onSignOut: () => void,
    domains: {
        id: string,
        name:string,
        icon: string | null,
    }[] | null | undefined
}


const MinMenu = (props: Props) => {
  return (
    <div>MinMenu</div>
  )
}

export default MinMenu