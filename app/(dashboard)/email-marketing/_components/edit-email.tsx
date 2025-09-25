"use client"

import FormGenerator from '@/components/forms/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { UserRegFormIptType, UserRegFormType } from '@/constants/form'
import { useEditEmail } from '@/hooks/mail/use-edit-email'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'

type Props = {
    id: string,
    onCreate: () => void,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    setDefault: UseFormSetValue<FieldValues>
}

const EditEmail = (props: Props) => {
    const {loading, template} = useEditEmail(props.id);

    props.setDefault("description", template ? JSON.parse(template) : "");

  return (
    <form onSubmit={props.onCreate} className='flex flex-col gap-3'>

        <Loader loading={loading}>

            <FormGenerator
                name='description'
                label='Message'
                register={props.register}
                errors={props.errors}
                type={UserRegFormType.TEXT}
                inputType={UserRegFormIptType.TEXTAREA}
                lines={10}
                placeholder='Your email description'
                defaultValue={null}
    
            />

            <Button className='bg-grandis hover:bg-grandis/75' type='submit'>Save</Button>

        </Loader>

    </form>
  )
}

export default EditEmail