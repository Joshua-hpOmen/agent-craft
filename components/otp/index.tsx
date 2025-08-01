import React from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'

type Props = {
    otp: string,
    setOtp: React.Dispatch<React.SetStateAction<string>>
}

const OTPInput = (props: Props) => {
  return (
    <InputOTP maxLength={6} value={props.otp} onChange={otp => props.setOtp(otp)}>
        <InputOTPGroup>

            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />

        </InputOTPGroup>

        <InputOTPSeparator />

        <InputOTPGroup>

            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />

        </InputOTPGroup>
    </InputOTP>
  )
}

export default OTPInput