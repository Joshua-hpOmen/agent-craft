"use client"
import { UserRegistrationProps, UserRegistrationSchema } from "@/schema/auth-schema"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { onCompleteUserRegistration } from "@/actions/auth/on-complete-user-registration"

export const useSignUpForm = () => {
    const [loading, setLoading] = React.useState(false)
    const {signUp, isLoaded, setActive} = useSignUp()
    const router = useRouter();
    
    const form = useForm<UserRegistrationProps>({
        defaultValues: {
            type: "owner",
        },
        mode: "onBlur",
        resolver: zodResolver(UserRegistrationSchema),
    })
    
    const generateOTP = async (email: string, password: string, onNext: React.Dispatch<React.SetStateAction<number>>) => {
        if(!isLoaded) return;
        setLoading(true) 
        
        try {

            await signUp.create({
                emailAddress: email,
                password: password
            })
            
            await signUp.prepareEmailAddressVerification({strategy: "email_code"})
            onNext(prev => prev+1)
            setLoading(false)
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(`${error.errors[0].message}`)
            setLoading(false)
        }
    }

    const handleOnSubmit =  form.handleSubmit(async (values: UserRegistrationProps) => {
        console.log("🔴Hello World")
        if(!isLoaded) return;

        setLoading(true);
        try {
            console.log("🔴The form is being submitted line1")

            const completeSignUp = await signUp.attemptEmailAddressVerification({ code: values.otp });

            if(completeSignUp.status !== "complete"){
                return { message: "Something went wrong!" };
            }

            if(!signUp.createdUserId) return;

            console.log("🔴The form is being submitted")

            const registered = await onCompleteUserRegistration(values.fullname, signUp.createdUserId, values.type)

            console.log("🔴User has been registered")

            if(registered?.status === 200 && registered.user){
                await setActive({session: completeSignUp.createdSessionId});

                console.log("🔴User has been set active")

                setLoading(false)
                router.push('/dashboard')
            }else{
                throw new Error("")
            }

        } catch {
            toast.error("Something went wrong", {id: "sign-up"})
            setLoading(false)
        }

    })

    return {
        form,
        handleOnSubmit,
        generateOTP,
        loading
    }
}
