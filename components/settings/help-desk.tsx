"use client"
import { useHelpDesk } from '@/hooks/settings/use-help-desk'
import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import Section from '../global/section-label'
import FormGenerator from '../forms/form-generator'
import { UserRegFormIptType, UserRegFormType } from '@/constants/form'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Button } from '../ui/button'
import Loader from '../global/loader'
import { Accordion, AccordionItem ,AccordionContent, AccordionTrigger } from '../ui/accordion'

type Props = {
    id: string,
}

const HelpDesk = (props: Props) => {
    const { register, onSubmitQuestion, errors, isQuestions, loading } = useHelpDesk(props.id)
  return (
    <Card className='w-full grid grid-cols-1 lg:grid-cols-2'>

        <CardContent className='p-6 border-r-[1px]'>
            <CardTitle>Help Desk</CardTitle>

            <form className="flex flex-col gap-6 mt-10" onSubmit={onSubmitQuestion}>

                <div className="flex flex-col gap-6 mt-10">
                    <Section
                        label='Question'
                        message='Add a question that you believe is frequently asked'
                    />

                    <FormGenerator
                        inputType={UserRegFormIptType.INPUT}
                        register={register as unknown as UseFormRegister<FieldValues>}
                        errors={errors}
                        name='question'
                        placeholder='Type you question'
                        type={UserRegFormType.TEXT}
                        form="help-desk-form"
                    />
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <Section
                        label='Answer to question'
                        message='The answer for the question above.'
                    />

                    <FormGenerator
                        inputType={UserRegFormIptType.TEXTAREA}
                        register={register as unknown as UseFormRegister<FieldValues>}
                        errors={errors}
                        name='answer'
                        placeholder='Type your answer'
                        type={UserRegFormType.TEXT}
                        lines={5}
                        form="help-desk-form"
                    />
                </div>

                <Button className='bg-orange hover:bg-orange/70 transition duration-150 ease-in-out text-white font-semibold'>
                    Create
                </Button>
            </form>
        </CardContent>

        <CardContent className='p-6 overflow-y-auto chat-window'>

            <Loader loading={loading}>
                {isQuestions.length ? (
                    <Accordion type="single" collapsible className='w-full' defaultValue={isQuestions[0].id}>
                        {
                            isQuestions.map(question => (

                                <AccordionItem value={question.id} key={question.id}>
                                   <AccordionTrigger>{question.question}</AccordionTrigger> 
                                   <AccordionContent>{question.answer}</AccordionContent>
                                </AccordionItem>

                            ))
                        }
                    </Accordion>
                ) : <CardDescription>No questions created</CardDescription>}
            </Loader>

        </CardContent>

    </Card>
  )
}

export default HelpDesk