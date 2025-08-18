"use client"
import { onCreateFilterQuestions } from "@/actions/settings/create-filter-question";
import { onGetAllFilterQuestions } from "@/actions/settings/get-all-filter-questions";
import { FilterQuestionsSchema, FilterQuestionsType } from "@/schema/settings-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useFilterQuestions = (id: string) => {
    
    const {register, handleSubmit, formState: {errors} , reset} = useForm<FilterQuestionsType>({
        resolver: zodResolver(FilterQuestionsSchema),
        mode: "onChange"
    })

    const [loading, setLoading] = React.useState(false);
    const [isQuestions, setIsQUestions] = React.useState<{id: string, question: string}[]>([])

    const onAddFilterQuestions = handleSubmit(async (values) => {
        setLoading(true);

        const questions = await onCreateFilterQuestions(id, values.question);

        if(questions){
            setIsQUestions(questions.questions!)
            toast.success(questions.message, {id: "filter-question"})
        }else {
            toast.error("Oops!\nSomething went wrong!", {id: "filter-question"})
        }

        reset();
        setLoading(false);
    })

    const onGetQuestions = React.useCallback(async () => {
        setLoading(true);
        const questions = await onGetAllFilterQuestions(id);

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
        onAddFilterQuestions,
        errors,
        isQuestions,
        loading
    }

}