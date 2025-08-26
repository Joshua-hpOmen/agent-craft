import { onDomainCustomerResponses } from '@/actions/appointment/on-domain-customer-responses'
import { onGetAllDomainBookings } from '@/actions/appointment/on-get-all-domain-bookings'
import React from 'react'
import PortalForm from '../../../../../components/forms/portal/portal-form'

type Props = {
  params: Promise<{domainId: string, customerId: string}>
}

const page = async (props: Props) => {

  const params = await props.params

  const questions = await onDomainCustomerResponses(params.customerId);
  const booking = await onGetAllDomainBookings(params.domainId);

  if(!questions) return;

  return (
    <PortalForm
      bookings={booking}
      email={questions.email!}
      customerId={params.customerId}
      questions={questions.questions}
      type="Appointment"
      domainId={params.domainId}
    />
  )
}

export default page