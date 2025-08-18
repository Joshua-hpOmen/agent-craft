"use client"
import { UserRegFormIptType, UserRegFormType } from '@/constants/form'
import { useFilterQuestions } from '@/hooks/settings/use-filter-questions'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../forms/form-generator'
import Loader from '../global/loader'
import Section from '../global/section-label'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

type Props = {
    id: string,
}

const FileterQuestions = (props: Props) => {
    const { register, onAddFilterQuestions, errors, isQuestions, loading } = useFilterQuestions(props.id)

  return (
   <Card className='w-full grid grid-cols-1 lg:grid-cols-2'>

        <CardContent className='p-6 border-r-[1px]'>

            <CardTitle>Help Desk</CardTitle>

            <form className="flex flex-col gap-6 mt-10" onSubmit={onAddFilterQuestions}>

                <div className="flex flex-col gap-3">

                    <Section
                        label='Question'
                        message='Add a question that you want your chatbot to ask.'
                    />

                    <FormGenerator
                        inputType={UserRegFormIptType.INPUT}
                        register={register as unknown as UseFormRegister<FieldValues>}
                        errors={errors}
                        name='question'
                        placeholder='Type your question'
                        type={UserRegFormType.TEXT}
                        form='filter-questions-form'
                    />

                </div>

                <Button type='submit' className='bg-orange hover:bg-orange/70 transition duration-150 ease-in-out text-white font-semibold'>
                    Create
                </Button>

            </form>

        </CardContent>

        <CardContent className='p-6 overflow-y-auto chat-window'>

            <Loader loading={loading}>
                {isQuestions.length ? (
                    <>
                        {
                            isQuestions.map(question => (
                                <p key={question.id}>
                                    {question.question}
                                </p>
                            ))
                        }
                    </>
                ) : <CardDescription>No questions created</CardDescription>}
            </Loader>

        </CardContent>


   </Card> 
  )
}

export default FileterQuestions