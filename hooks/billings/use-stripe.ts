"use client"

import React from "react"

export const useStripe = () => {

    const [onStripeAccountPending, setOnStripeAccountPending] = React.useState(false);

    const onStripeConnect = async () => {
        try {
           setOnStripeAccountPending(true) 
           const account = await fetch("/api/stripe/connect")

           if(account.ok) {
            setOnStripeAccountPending(false);
            const url = await account.json();
            window.location.href = url
           }


        } catch (error) {
            console.log("🔴There was an error in the useStripe hook", error)
        }
    }

    return {onStripeAccountPending, onStripeConnect}
}