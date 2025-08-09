"use client"
import { onIntegrateDomain } from "@/actions/settings"
import { AddDomainSchema } from "@/schema/settings-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {UploadClient} from "@uploadcare/upload-client"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const uploadClient = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY!
})

export const useDomain = () => {
    const { register, handleSubmit, formState: {errors}, reset} = useForm<z.infer<typeof AddDomainSchema>>({
        resolver: zodResolver(AddDomainSchema),

    })

    const pathname = usePathname();
    const [loading, setLoading] = React.useState(false);
    const [isDomain, setIsDomain] = React.useState<string | undefined>(undefined)
    const router = useRouter();

    React.useEffect(() => {
        setIsDomain(pathname.split("/").pop())
    }, [pathname])

    const onAddDaomain = handleSubmit(async (values: z.infer<typeof AddDomainSchema>) => {
        setLoading(true);
        const upload = await  uploadClient.uploadFile(values.image[0])
        const domain = await onIntegrateDomain(values.domain, upload.uuid);

        if(domain) {
            reset();
            setLoading(false);

            if(domain.status === 200){
                toast.success(domain.message, {id: "add-domain"})
            }else {
                toast.error(domain.message, {id: "add-domain"})
            }

            router.refresh();
        }

    })

    return {
        register,
        onAddDaomain,
        errors,
        loading,
        isDomain
    }
}