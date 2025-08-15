import React from 'react'
import { Spinner } from './spinner'
import { cn } from '@/lib/utils'

type Props = {
    loading: boolean,
    children: React.ReactNode,
    className?: string,
    noPadding?: boolean
}

const Loader = (props: Props) => {
  return props.loading ? <div className={cn(props.className || 'w-full py-5 flex justify-center')}>
        <Spinner noPadding={props.noPadding}/>
    </div> : (props.children)
  
}

export default Loader