import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import QuestionsForm from './questions-form'

type Props = {
  questions: {
    id: string
    question: string
    answered: string | null
  }[]
  type: 'Appointment' | 'Payment'
  register: UseFormRegister<FieldValues>
  error: FieldErrors<FieldValues>
  onNext: () => void
  step: number
  date: Date | undefined
  onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>
  onBack(): void
  onSlot(slot: string): void
  slot?: string
  loading: boolean
  bookings?:
    | {
        date: Date
        slot: string
      }[]
    | undefined
  products?:
    | {
        name: string
        image: string
        price: number
      }[]
    | undefined
  amount?: number
  stripeId?: string

}

const PortalSteps = (props: Props) => {
  if(props.step === 1){

    return <QuestionsForm
        register={props.register}
        error={props.error}
        onNext={props.onNext}
        questions={props.questions}
    />

  }

  // if(props.step == 2 && props.type === "Appointment"){

  //   return <BookingAppointmentDate 
  //       date={props.date}
  //       bookings={props.bookings}
  //       currentSlot={props.slot}
  //       register={props.register}
  //       onBack={props.onBack}
  //       onBooking={props.onBooking}
  //       onSlot={props.onSlot}
  //       loading={props.loading}
  //   />
  // }

  // if(props.step === 2 && props.type === "Payment"){
  //   return <PaymentCheckOut 
  //       products={props.products}
  //       stripeId={props.stripeId}
  //       onBack={props.onBack}
  //       onNext={props.onNext}
  //       amount={props.amount}
  //   />
  // }
}

export default PortalSteps