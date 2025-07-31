"use client"
import { Button } from '@/components/ui/button'
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'

type Props = {}

const ButtonHandler = (props: Props) => {
    const {currentStep, setCurrentStep}= useAuthContextHook()
    const {formState, getFieldState, getValues} = useFormContext();
    const {generateOTP} = useSignUpForm()
    
    const {isDirty: isName} = getFieldState("fullname", formState)
    const {isDirty: isEmail} = getFieldState("email", formState)
    const {isDirty: isPassword} = getFieldState("password", formState)

    if(currentStep === 3){
        return <div className='w-full flex flex-col gap-4 items-center'>
            <Button className='w-full' type="submit">
                Create an account
            </Button>

            <p>
                Already have an account?{" "}
                <Link href={'/auth/sign-up'} className='font-bold'>
                    Sign In 
                </Link>
            </p>

        </div>
    }

  return (
    <div className='w-full flex flex-col gaap-3 items-center'>
        <Button type='submit' className='w-full'  onClick={() => setCurrentStep(prev => prev+1)}>
            Continue
        </Button>

        <p>
            Already have an account? {" "}
            <Link href={"/auth/sign-in"} className='font-bold'>
                Sign in
            </Link>
        </p>

    </div>
  )
}

export default ButtonHandler