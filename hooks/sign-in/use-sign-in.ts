import { UserLoginProps, UserLoginSchema } from "@/schema/auth-schema";
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSingInForm = () => {
    const {isLoaded, setActive, signIn} = useSignIn();
    const [loading, setLoading]= React.useState<boolean>(false)
    const router = useRouter()
    
    const form = useForm<UserLoginProps>({
        mode: "onBlur",
        resolver: zodResolver(UserLoginSchema)
    })

    const handleSubmit = form.handleSubmit(async (values: UserLoginProps) => {
        if(!isLoaded) return;

        try {
           
            setLoading(true)
            const authenticated = await signIn.create({
                identifier: values.email,
                password: values.password
            })

            if(authenticated.status !== "complete"){
                await setActive({session: authenticated.createdSessionId})

                toast.success("Welcome back!",{id: "sign-in"})
                router.push("/dashboard")
            }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any){
           setLoading(false) 
           if(error.errors[0].code === "form_password_incorrect"){
            toast.error("Email/password is incorrect try again", {id: "sign-in"})
           }
        }
    })

    return {
        form,
        handleSubmit,
        loading
    }
}