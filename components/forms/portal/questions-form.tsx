import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'
import { UserRegFormIptType, UserRegFormType } from '@/constants/form'
import { Button } from '@/components/ui/button'

type Props = {
    onNext: () => void
    register: UseFormRegister<FieldValues>
    error: FieldErrors<FieldValues>,
    questions: {
        id: string,
        question: string
        answered: string | null
    }[]
}

const QuestionsForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-5 justify-center">

        <div className="flex justify-center">
            <h2 className='text-4xl font-bold mb-5'>Account Details</h2>
        </div>

        {props.questions.map(ques => <FormGenerator
                defaultValue={ques.answered}
                key={ques.id}
                name={`question-${ques.id}`}
                errors={props.error}
                type={UserRegFormType.TEXT}
                inputType={UserRegFormIptType.INPUT}
                placeholder={ques.answered || "Not answered"}
                register={props.register}
                label={ques.question}
            />
        )}

        <Button className='mt-5' type='button' onClick={props.onNext}>
            Next
        </Button>

    </div>
  )
}

export default QuestionsForm