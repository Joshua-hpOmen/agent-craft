import { DomainsType } from '@/types'
import React from 'react'
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
    domains: DomainsType,
    register: UseFormRegister<FieldValues>,
    control: Control<FieldValues>
}

const ConversationSearch = (props: Props) => {
  return (

    <form className='flex flex-col py-3 w-full'>
        <Controller
            name="domain"
            control={props.control}
            render={({field}) => (
                
                <Select {...props.register("domain")} onValueChange={field.onChange} defaultValue={field.value}>

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
            ) }
        />
    </form>
  )
}

export default ConversationSearch