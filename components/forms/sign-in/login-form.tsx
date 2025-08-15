"use client"
import { USER_SIGNIN_FORM } from '@/constants/form'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormGenerator from '../form-generator'

const LoginForm = () => {
    const {register, formState: {errors}} = useFormContext()
  return (
    <>
        <h2 className='text-gravel md:text-4xl font-bold'>Login</h2>

        <p className='text-iridium md:text-sm'>
            You will recieve an OTP <b><small>(one time password)</small></b>
        </p>

        {USER_SIGNIN_FORM.map(val => (
          <FormGenerator  
              key={val.id} 
              type={val.type} 
              inputType={val.inputType} 
              placeholder={val.placeholder} 
              register={register} 
              name={val.name} 
              errors={errors}
          />)
        )}
    </>
  )
}

export default LoginForm