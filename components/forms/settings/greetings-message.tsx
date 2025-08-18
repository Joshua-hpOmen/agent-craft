import Section from '@/components/global/section-label'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { UserRegFormIptType, UserRegFormType } from '@/constants/form'

type Props = {
    message: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
}

const WelcomeMessage = (props: Props) => {
  return (
    <div className='flex flex-col gap-2'>

        <Section label='Greeting message' message='Customize your welcome message'/>

        <div className='lg:w-[500px]'>

            <FormGenerator 
                register={props.register}
                placeholder={props.message}
                lines={2}
                errors={props.errors}
                name='welcomeMessage'
                type={UserRegFormType.TEXT}
                inputType={UserRegFormIptType.TEXTAREA}
            />

        </div>

    </div>
  )
}

export default WelcomeMessage