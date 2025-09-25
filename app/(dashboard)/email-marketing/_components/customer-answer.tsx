import Loader from '@/components/global/loader'
import { CardDescription } from '@/components/ui/card'
import { useCustomerAnswers } from '@/hooks/mail/use-customer-answers'
import React from 'react'

type Props = {
    id?: string
}

const CustomerAnswers = (props: Props) => {
    const {answers, loading} = useCustomerAnswers(props.id!)

  return (
    <div className='flex flex-col gap-5 mt-10'>

        <Loader loading={loading}>

            {
                answers.map((answer) => (
                    answer.customer.map(customer => (
                        customer.questions.length > 0 && customer.questions.map(( question, key ) => (
                            <div key={key}>
                                <p>{question.question}</p>
                                <CardDescription>{question.answered}</CardDescription>
                            </div>
                        ))
                    ))
                ))
            }

        </Loader>

    </div>
  )
}

export default CustomerAnswers