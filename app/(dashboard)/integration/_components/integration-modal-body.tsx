import StripeConnect from '@/components/settings/stripe-connect'
import { Button } from '@/components/ui/button'
import { CircleCheckIcon } from 'lucide-react'
import React from 'react'

type Props = {
    type: string,
    connections: {
        stripe: boolean 
    }
}

const IntegrationModalBody = (props: Props) => {
    switch (props.type) {
        case "stripe":

            return <div className="flex flex-col gap-2">
                <h2 className="font-bold">Stripe would like to access</h2>
                {["Payment and bank information", "Products and services you sell", "Business and tax information", "Create and update Products"].map((item, key) => <div key={key} className='flex gap-2 items-center pl-3'>
                        <CircleCheckIcon/>
                        <p>{item}</p>
                    </div>
                )}

                <div className="flex justify-between mt-10">
                    <Button variant={"outline"}>Learn more</Button>
                    <StripeConnect connected={props.connections[props.type]} />
                </div>

            </div>

        default:
            return <></>
    }
}

export default IntegrationModalBody