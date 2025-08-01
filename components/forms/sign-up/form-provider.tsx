"use client"
import { Skeleton } from '@/components/ui/skeleton'
import { AuthContextProvider } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
    children: React.ReactNode
}

const SignUpFormProvider = (props: Props) => {
  const { form, handleOnSubmit, loading } = useSignUpForm()
  return (
    <AuthContextProvider>
        <FormProvider {...form}>
            <form onSubmit={handleOnSubmit} className='h-full'>

              {loading ? <div className='flex flex-col'>
                {Array(4).fill(0).map((value, index) => (
                  <Skeleton key={index}/>
                ))}
              </div> : <>
                {props.children}
              </>        
              }
            </form> 
        </FormProvider>
    </AuthContextProvider>
  )
}

export default SignUpFormProvider