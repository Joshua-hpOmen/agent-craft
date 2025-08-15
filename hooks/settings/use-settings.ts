"use client"
import { onUpdatePassword } from "@/actions/settings";
import { onChatBotImageUpdate } from "@/actions/settings/chatbot-image-update";
import { onUpdateWelcomMessage } from "@/actions/settings/updare-welcome-message";
import { onUpdateDomain } from "@/actions/settings/update-domain";
import { ChangePasswordSchema, ChangePasswordType } from "@/schema/auth-schema";
import { DomainSettingsSchema, DomainSettingsType } from "@/schema/settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {UploadClient} from "@uploadcare/upload-client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!
})

export const useThemeMode = () => {
   const {setTheme, theme} = useTheme() 
   return {
    setTheme,
    theme
   }
}

export const useChangePassword = () => {
    const [loading, setLoading] = React.useState(false)
    const {register, handleSubmit, formState: {errors} , reset} = useForm<ChangePasswordType>({
        resolver: zodResolver(ChangePasswordSchema),
        mode: "onChange"
    })

    const onChangePassword = handleSubmit(async (values) => {

        try {
           
            setLoading(true);
            const updated = await onUpdatePassword(values.password)

            if(updated){
                reset();
                setLoading(false);
                toast.success(updated.message, {id: 'change-password'});
            }

        } catch (error) {
            setLoading(false)
            console.log("🔴There was an erro in changePassword", error);
        }

    })

    return {
        register,
        onChangePassword,
        loading,
        errors
    }
}

export const useSettings = (id: string) => {

    const {register, handleSubmit, formState: {errors} , reset} = useForm<DomainSettingsType>({
        resolver: zodResolver(DomainSettingsSchema),
        mode: "onChange"
    })

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const onUpdateSettings  = handleSubmit(async (values) => {
        setLoading(true);

        if(values.domain){
            const domain = await onUpdateDomain(id, values.domain);

            if(!domain || domain.status === 400){
                toast.error(domain?.message ?? "Something went wrong", {id: "update-domain"});
            }else{
                toast.success(domain.message, {id: "update-domain"})
            }

            setLoading(false);
        }


        if(values.image[0]){
            const uploaded = await upload.uploadFile(values.image[0]);
            const image = await onChatBotImageUpdate(id, uploaded.uuid);

            if(!image || image.status !== 200){
                toast.error(image?.message ?? "Something went wrong", {id: "update-icon"});
            } else {
                toast.success(image.message, {id: "update-icon"});
            }

            setLoading(false);
        };

        if(values.welcomeMessage){
            const message = await onUpdateWelcomMessage(id, values.welcomeMessage);

            if(!message){
                toast.error("Something went wrong", {id: "update-icon"});
            } else {
                toast.success(message.message, {id: "update-icon"});
            }

            setLoading(false);
        };

    })
    
}