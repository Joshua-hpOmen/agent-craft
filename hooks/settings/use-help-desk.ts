"use client"

import { onCreateHelpDeskQuestion } from "@/actions/settings/create-help-desk-question"
import { onGetAllHelpDeskQuestions } from "@/actions/settings/get-all-help-desk-questions"
import { HelpDeskQuestionSchema, HelpDeskQuestionsType } from "@/schema/settings-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const useHelpDesk = (id: string) => {

    const {register, handleSubmit, formState: {errors} , reset} = useForm<HelpDeskQuestionsType>({
        resolver: zodResolver(HelpDeskQuestionSchema),
        mode: "onChange"
    })

    const [loading, setLoading] = React.useState(false);
    const [isQuestions, setIsQUestions] = React.useState<{id: string, question: string, answer: string}[]>([])

    const onSubmitQuestion = handleSubmit(async (values) => {
        setLoading(true);

        const questions = await onCreateHelpDeskQuestion(id, values.question, values.answer);

        if(questions){
            setIsQUestions(questions.question!)
            toast.success(questions.message, {id: "add-question"})
        }else {
            toast.error("Oops!\nSomething went wrong!", {id: "add-question"})
        }

        reset();
        setLoading(false);
    })

    const onGetQuestions = React.useCallback(async () => {
        setLoading(true);
        const questions = await onGetAllHelpDeskQuestions(id);

        if(questions) {
            setIsQUestions(questions.questions);
        }
        setLoading(false);
    }, [id])

    React.useEffect(() => {
        onGetQuestions()
    }, [onGetQuestions])

    return {
        register,
        onSubmitQuestion,
        errors,
        isQuestions,
        loading
    }
}