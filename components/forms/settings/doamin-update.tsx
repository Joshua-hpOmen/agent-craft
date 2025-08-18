import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { UserRegFormIptType, UserRegFormType } from '@/constants/form'

type Props = {
    name: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>
}

const DomainUpdate = (props: Props) => {
  return (
    <div className='flex gap-2 pt-5 items-end w-[400px]'>
        <FormGenerator 
            name={props.name}
            label='Domain name'
            register={props.register}
            errors={props.errors}
            placeholder={props.name}
            type={UserRegFormType.TEXT}
            inputType={UserRegFormIptType.INPUT}
        /> 
    </div>
  )
}

export default DomainUpdate