"use client"

import { onBookNewAppointment } from "@/actions/appointment/on-book-new-appointment"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const usePortal = (customerId: string, domainId: string, email: string) => {
    const {register, setValue, formState: {errors}, handleSubmit} = useForm()

    const [step, setStep] = React.useState(2)
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [selectedSlot, setSelectedSlot] = React.useState<string | undefined>("");
    const [loading, setLoading] = React.useState(false);

    setValue("date", date);

    const onNext = () => setStep(prev => prev+1);
    const onPrev = () => setStep(prev => prev -1);

    const onBookAppointement = handleSubmit(async (values) => {

        try {
           setLoading(true);

           const booked = await onBookNewAppointment(domainId, customerId, values.slot, values.date, email);

           if(booked && booked.status === 200){
            setLoading(false);
            toast.success(booked.message, {id: "book-app"})
            setStep(3);
           }


        } catch (error) {
           console.log("There was an error in the onBookAPpointement function", error) 
        }

    })


    const onSelectedTimeSlote = (slot: string) => setSelectedSlot(slot);

    return {
        step,
        onNext,
        onPrev,
        register,
        errors,
        loading,
        onBookAppointement,
        date,
        setDate,
        onSelectedTimeSlote,
        selectedSlot
    }
}
