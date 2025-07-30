"use client"
import { useAuthContextHook } from '@/context/use-auth-context'
import { UserType } from '@/types/user-type'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form'

type Props = {}

const RegistrationFormStep = (props: Props) => {
  const {register, formState: {errors}, setValue} = useFormContext();
  const {currentStep} = useAuthContextHook();
  const [onUserType, setOnUserType] = React.useState<UserType>(UserType.OWNER);
  const [onOTP, setOnOTP] = React.useState();
  setValue("otp", onOTP)

  switch (currentStep) {
    case 1:

        return (
            <TypeSelectionForm register={register} userType={onUserType} setUserType={setOnUserType}/>
        );    

    case 2:
        return;
    case 3:
        return;
  }
  
  return (
    <div>RegistrationFormStep</div>
  )
}

export default RegistrationFormStep