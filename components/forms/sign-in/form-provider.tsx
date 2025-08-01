"use client"
                
import { Skeleton } from '@/components/ui/skeleton'
import { AuthContextProvider } from '@/context/use-auth-context'
import { useSingInForm } from '@/hooks/sign-in/use-sign-in'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
    children: React.ReactNode
}

const SignInFormProvider = (props: Props) => {
    const {form, handleSubmit, loading} = useSingInForm()
  return (
    <AuthContextProvider>

        <FormProvider {...form}>

            <form onSubmit={handleSubmit}>

                <div className='flex flex-col justify-between gap-3 h-full'>

                    {loading ? <div>
                       <Skeleton className='h-[100px] w-[300px]'/> 
                    </div> : <div>
                        {props.children}
                    </div>}

                </div>

            </form>

        </FormProvider>

    </AuthContextProvider>
  )
}

export default SignInFormProvider