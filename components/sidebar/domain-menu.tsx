import { useDomain } from '@/hooks/sidebar/use-domain'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    min?: boolean,
    domains: {
        id: string,
        name: string,
        icon: string | "",
    }[] | null | undefined
}

const DomainMenu = (props: Props) => {

  const {register, onAddDaomain, loading, errors, isDomain} = useDomain();

  return (
    <div className={cn("flex flex-col gap-3", props.min ? "mt-6": "mt-3")}>

      <div className='flex justify-between w-full items-center'>

        {!props.min && <p className='text-xs text-gray-500'>Domains</p>}
        <AppDrawer></AppDrawer>

      </div>

    </div>
  )
}

export default DomainMenu