import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { EditIcon } from 'lucide-react'
import { ErrorMessage } from '@hookform/error-message'

type Props = {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    label: string
}

const UploadButton = (props: Props) => {
  return (
    <>
        <div className='flex gap-2 items-center flex-col w-full'>

            <Label
                htmlFor='upload-button'
                className='flex gap02 p-3 rounded-lg bg-cream text-gray-600 cursor-pointer font-semibold text-sm items-center w-full'
            >
                <Input 
                    {...props.register("image")}
                    className='hidden'
                    type='file'
                    id='upload-button'
                />

                <EditIcon />
                {props.label}

            </Label>

            <p className='text-sm text-gray-400 ml-6 w-full'>
                Recommended size is 300px * 300px, size 
                <br />
                less than 2MB
            </p>

        </div>

        <ErrorMessage
            errors={props.errors}
            name="image"
            render={({message}) => (
                <p className='text-red-400 mt-2'>
                    {message === "Required" ? "" : message}
                </p>
            )}
        />
    </>
  )
}

export default UploadButton