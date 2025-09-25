"use client"

import { onGetEmailTemplate } from "@/actions/mail/on-get-template";
import React from "react"

export const useEditEmail = (id: string) => {
    const [loading, setLoading] = React.useState(false);
    const [template, setTemplate] = React.useState("");

    const onGetTemplate = React.useCallback(async () => {
        try {

            setLoading(true);
            const email = await onGetEmailTemplate(id);

            if(email) setTemplate(email.template ?? '');
            setLoading(false);
            
        } catch (error) {
            console.log("🔴There was an error in the oGetTemplate function", error);
        }
    }, [id])

    React.useEffect(() => {
        onGetTemplate()
    }, [onGetTemplate])

    return {loading, template}
}