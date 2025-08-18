import { DomainsType } from '@/types'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
    domains: DomainsType,
    register: UseFormRegister<FieldValues>
}

const ConversationSearch = (props: Props) => {
  return (
    <div className='flex flex-col py-3 w-full'>
        <Select {...props.register("domain")}>

            <SelectTrigger className='w-full'>
                <SelectValue placeholder="Domain name"/>
            </SelectTrigger>

            <SelectContent>
                {
                    props.domains?.map(domain => (
                        <SelectItem value={domain.id} key={domain.id}>
                            {domain.name}
                        </SelectItem>
                    ))
                }
            </SelectContent>

        </Select>
    </div>
  )
}

export default ConversationSearch