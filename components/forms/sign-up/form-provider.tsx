"use client"
import { AuthContextProvider } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
    children: React.ReactNode
}

const SignUpFormProvider = (props: Props) => {
  const { form, handleOnSubmit, generateOTP, loading } = useSignUpForm()
  return (
    <AuthContextProvider>
        <FormProvider {...form}>
            <form onSubmit={handleOnSubmit} className='h-full'>
              {props.children}        
            </form> 
        </FormProvider>
    </AuthContextProvider>
  )
}

export default SignUpFormProvider