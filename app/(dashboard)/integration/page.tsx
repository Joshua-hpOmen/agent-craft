import { onGetPaymentConnected } from '@/actions/stripe/on-get-payment-connected'
import InfoBar from '@/components/global/info-bar'
import React from 'react'
import IntegrationsList from './_components/integration-list'

type Props = {}

const page = async (props: Props) => {
  
    const payment = await onGetPaymentConnected();

    const connections = {
        stripe: !!payment
    }

  return (
    <>
        <InfoBar/>
        <IntegrationsList connections={connections} />
    </>
  )
}

export default page