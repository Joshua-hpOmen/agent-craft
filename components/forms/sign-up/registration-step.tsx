"use client"
import { useAuthContextHook } from '@/context/use-auth-context'
import { UserType } from '@/types/user-type'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const DetailForm = dynamic(() => import("./account-details-form"), {
  ssr: false,
  loading: () => <div className='flex flex-col gap-4'>
    {Array(4).fill(0).map((val, index) => <Skeleton className='h-[300px] w-[800px] rounded-md' key={index}/>)}
  </div>
})

const OTPForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: () =>  <div className='flex flex-col gap-4'>
    {Array(4).fill(0).map((val, index) => <Skeleton className='h-[300px] w-[800px] rounded-md' key={index}/>)}
  </div>
})


const RegistrationFormStep = () => {
  const {register, formState: {errors}, setValue} = useFormContext();
  const {currentStep} = useAuthContextHook();
  const [onUserType, setOnUserType] = React.useState<UserType>(UserType.OWNER);
  const [onOTP, setOnOTP] = React.useState<string>("");
  setValue("otp", onOTP)
  console.log(errors)
  switch (currentStep) {
    case 1:

        return (
            <TypeSelectionForm register={register} userType={onUserType} setUserType={setOnUserType}/>
        );    

    case 2:
        return <DetailForm errros={errors} register={register}/>;
    case 3:
        return <OTPForm
          onOTP={onOTP}
          setOTP={setOnOTP}
        />
  }
  
}

export default RegistrationFormStep