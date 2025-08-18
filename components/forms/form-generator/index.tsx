import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserRegFormIptType, UserRegFormOptsType, UserRegFormType } from '@/constants/form'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import {ErrorMessage} from "@hookform/error-message"
import { Textarea } from '@/components/ui/textarea'

type Props = {
    type: UserRegFormType,
    inputType: UserRegFormIptType,
    options?: UserRegFormOptsType,
    label?: string,  
    placeholder: string,
    register: UseFormRegister<FieldValues>,
    name: string,
    errors: FieldErrors<FieldValues>
    lines?: number
    form?: string
}

const FormGenerator = (props: Props) => {
    switch (props.inputType) {
        case UserRegFormIptType.SELECT:
            return <Label>
                {props.label}

                <select form={props.form} id={`select-${props.label}`} {...props.register(props.name)}>

                    {props.options?.length && props.options.map(opt => (
                        <option key={opt.id} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}

                </select>

                <ErrorMessage
                    errors={props.errors}
                    name={props.name}
                    render= {({message}) => (
                        <p className="text-red-400 mt-2 text-sm">
                            {message === "Required" ? '' : message}
                        </p>
                    )}
                />

            </Label>

        case UserRegFormIptType.TEXTAREA:
            return  <Label className='flex flex-col gap-2' htmlFor={`input-${props.label}`}>
                {props.label}

                <Textarea 
                    id={`input-${props.label}`}
                    placeholder={props.placeholder}
                    rows={props.lines}
                    form={props.form}
                    {...props.register(props.name)}
                />

                <ErrorMessage
                    errors={props.errors}
                    name={props.name}
                    render= {({message}) => (
                        <p className="text-red-400 mt-2 text-sm">
                            {message === "Required" ? '' : message}
                        </p>
                    )}
                />

            </Label>

        case UserRegFormIptType.INPUT:
            return <Label className='flex flex-col gap-2 items-start' htmlFor={`input-${props.label}`}>
                {props.label}

                <Input 
                    id={`input-${props.label}`}
                    type={props.type}
                    placeholder={props.placeholder}
                    form={props.form}
                    {...props.register(props.name)}
                />

                <ErrorMessage
                    errors={props.errors}
                    name={props.name}
                    render= {({message}) => (
                        <p className="text-red-400 mt-2 text-sm">
                            {message === "Required" ? '' : message}
                        </p>
                    )}
                />

            </Label>
        default:
            return <></>
    }

}

export default FormGenerator