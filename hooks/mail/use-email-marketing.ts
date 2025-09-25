"use client"

import { onAddCustomersToEmail } from "@/actions/mail/on-add-customers-to-email";
import { onBulkMailer } from "@/actions/mail/on-bulk-mailer";
import { onCreateMarketingCampaign } from "@/actions/mail/on-create-marketing-campaign";
import { onSaveEmailTemplate } from "@/actions/mail/on-save-email-template";
import { EmailMarketingBodySchema, EmailMarketingSchema } from "@/schema/marketing-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useEmailMarketing = () => {
    const [isSelected, setIsSelected] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [campaingId, setCampaignId] = React.useState<string | undefined>();
    const [processing, setProcessing] = React.useState(false);
    const [isId, setIsId] = React.useState<string| undefined>();
    const [editing, setEditing] = React.useState(false);

    const formEmail = useForm({
        resolver: zodResolver(EmailMarketingSchema)
    })

    const formBody = useForm({
        resolver: zodResolver(EmailMarketingBodySchema)
    })
    

    const router = useRouter();

    const onCreateCampaign = formEmail.handleSubmit(async (values) => {
        try {
           
            setLoading(true);
            const campaign = await onCreateMarketingCampaign(values.name)
            toast.loading("Creating campaign", {id: 'create-campaign'})

            if(campaign) {

                formEmail.reset();
                toast.success("Created campaign", {id: 'create-campaign'})

                setLoading(false);
                router.refresh();
            }

        } catch (error) {
           console.log("🔴There was an error in the onCreateCampaing function", error)
           toast.error("Oops!\nSomething went wrong");
        }
    })

    const onCreateEmailTemplate = formBody.handleSubmit(async (values) => {
        try {
            setEditing(true);
            const template = JSON.stringify(values.description);
            const emailTemplate = await onSaveEmailTemplate(template, campaingId!);
            if(emailTemplate) {
                toast.success(emailTemplate.message)
                setEditing(false)
            }
        } catch (error) {
           console.log("🔴There was an error in the onCreateEmailTemplate", error) 
           toast.error("Oops!\nSomething went wrong", {id: "body-template"});
        }
    })

    const onSelectCampaign = (id: string) => setCampaignId(id);

    const onAddCustomersToCampaign = async () => {
        try {
            setProcessing(true);
            const customersAdded = await onAddCustomersToEmail(isSelected, campaingId!);

            if(customersAdded) {
                toast.success(customersAdded.message);
                setProcessing(false)
                setCampaignId(undefined)
                router.refresh()
            }
        } catch (error) {
           console.log("🔴There was an error in the onAddCustomersToCampaign function", error) 
            toast.error("Oops!\nSomething went wrong.", {id: "add-customers"})
        }
    }

    const onSelectedEmails = (email: string) => {
        const duplicate = isSelected.find(emailInst => emailInst === email);
        if(!!duplicate) {
            setIsSelected(isSelected.filter(emailInst => emailInst !== email));
        }else {
            setIsSelected(prev => [...prev, email])
        }
    }

    const onBulkEmailSender = async (emails: string[], campaignId: string) => {
        try {
            
            const mails = await onBulkMailer(emails, campaignId);

            if(mails) {
                toast.success(mails.message, {id: "bulk-email"});
                router.refresh()
            }

        } catch (error) {
          console.log("🔴There was an error in the onBulkEmailSender function", error);
          toast.error("Oops!\nSomething went wrong!", {id: "bulk-email"})
        }
    }

    const onSetAnsweredId = (id: string) => setIsId(id);

    return {
        onSelectedEmails,
        isSelected,
        onCreateCampaign,
        formEmailRegister: formEmail.register,
        formEmailErrors: formEmail.formState.errors,
        formBodyRegister: formBody.register,
        formBodySetValue: formBody.setValue,
        formBodyErrors: formBody.formState.errors,
        loading,
        onSelectCampaign,
        processing,
        campaingId,
        onAddCustomersToCampaign,
        onBulkEmailSender,
        onSetAnsweredId,
        isId,
        onCreateEmailTemplate,
        editing,
    }

}