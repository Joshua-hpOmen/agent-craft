import React from 'react'
import { Button } from '../ui/button'
import Loader from '../global/loader'
import { useStripe } from '@/hooks/billings/use-stripe'

type Props = {
    connected: boolean
}

const StripeConnect = (props: Props) => {
  
    const {onStripeAccountPending, onStripeConnect} = useStripe()

  return (
    <Button disabled={props.connected} onClick={onStripeConnect}>
        <Loader loading={onStripeAccountPending}>
            {props.connected ? "Connected" : "Connect to stripe"}
        </Loader>
    </Button>
  )
}

export default StripeConnect