"use client"

import { onGetAllCustomerResponses } from "@/actions/mailer/on-get-all-customer-responses";
import React from "react";

export const useCustomerAnswers = (id: string) => {
    const [loading, setLoading] = React.useState(false);
    const [answers, setAnswers] = React.useState<{
        customer: { 
            questions: {question: string, answered: string | null}[]
        }[]
    }[]>([])

    const onGetCustomerAnswers = React.useCallback(async () => {
        try {

            setLoading(true);
            const answer = await onGetAllCustomerResponses(id);
            setLoading(false);
            if(answer) setAnswers(answer.domains);

        } catch (error) {
            console.log("🔴There was an error in the onGetCustomerAnswers function", error)
        }
    }, [id])

    React.useEffect(() => {
        onGetCustomerAnswers();
    }, [onGetCustomerAnswers]);

    return {answers, loading}
}