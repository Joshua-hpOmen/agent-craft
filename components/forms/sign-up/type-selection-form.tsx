"use client"
import { UserType } from '@/types/user-type'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    register: UseFormRegister<FieldValues>,
    userType: UserType,
    setUserType: React.Dispatch<React.SetStateAction<UserType>>

}

const TypeSelectionForm = (props: Props) => {
    
  return (
    <>
        <h2 className='text-gravel md:text-4xl font-bold'>Create an account</h2>

        <p className='text-iridium md:text-sm'>
            Tell us about yourself! Whtat do youd do? Lets&apos; tailor your
            <br />
           experience so it best suits you. 
        </p>
    </>
  )

}

export default TypeSelectionForm