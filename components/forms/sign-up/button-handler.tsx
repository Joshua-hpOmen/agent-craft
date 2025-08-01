"use client"
import { Button } from '@/components/ui/button'
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import Link from 'next/link'
import { useFormContext } from 'react-hook-form'

const ButtonHandler = () => {
    const {currentStep, setCurrentStep}= useAuthContextHook()
    const {formState, getFieldState, getValues} = useFormContext();
    const {generateOTP, loading} = useSignUpForm()
    
    const {isDirty: isName} = getFieldState("fullname", formState)
    const {isDirty: isEmail} = getFieldState("email", formState)
    const {isDirty: isPassword} = getFieldState("password", formState)

    switch (currentStep) {
        case 1:
                return <div className='w-full flex flex-col gaap-3 items-center'>
                    <Button type='submit' className='w-full cursor-pointer'  onClick={() => setCurrentStep(prev => prev+1)}>
                        Continue
                    </Button>

                    <p>
                        Already have an account? {" "}
                        <Link href={"/auth/sign-in"} className='font-bold'>
                            Sign in
                        </Link>
                    </p>

                </div>
        case 2:
            return <div className='w-full flex flex-col gaap-3 items-center'>
                <div id='clerk-captcha'/>
                <Button type='submit' className='w-full cursor-pointer' disabled={!isName || !isEmail || !isPassword || loading} onClick={() => generateOTP(
                    getValues("email"),
                    getValues("password"),
                    setCurrentStep
                )}>
                    Continue
                </Button>

                <p>
                    Already have an account? {" "}
                    <Link href={"/auth/sign-in"} className='font-bold'>
                        Sign in
                    </Link>
                </p>

            </div>
        
        case 3:
            return <div className='w-full flex flex-col gap-4 items-center'>
                <Button className='w-full cursor-pointer' disabled={loading} type="submit"> 
                    Create an account
                </Button>

                <p>
                    Already have an account?{" "}
                    <Link href={'/auth/sign-up'} className='font-bold'>
                        Sign In 
                    </Link>
                </p>

            </div>    
        default:
            break;
    }

}

export default ButtonHandler