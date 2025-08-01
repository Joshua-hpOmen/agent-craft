"use client"
import { UserType } from '@/types/user-type'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

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

        <UserTypeCard value={UserType.OWNER} title="I own a business"
            text="Setting up my account for my company" 
            register={props.register} 
            userType={props.userType} 
            setUserType={props.setUserType}
        />
        
        <UserTypeCard value={UserType.STUDENT} title="I'm a student"
            text="Looking to learn about the tool" 
            register={props.register} 
            userType={props.userType} 
            setUserType={props.setUserType}
        />
    </>
  )

}

export default TypeSelectionForm