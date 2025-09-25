import React from 'react'
import { Progress } from '../ui/progress'

type Props = {
    label: string,
    credits: number,
    end: number
}

const ProgressBar = (props: Props) => {
  return (
    <div className='flex flex-col w-full md:w-7/12 gap-1'>
        <h1 className="font-bold">{props.label}</h1>

        <div className="flex flex-col">
            <div className="flex justify-between text-sm">

                <p>{props.credits}</p>
                <p>{props.end}</p>

            </div>

            <Progress value={(props.credits / props.end) * 100} className='w-full h-4' />

        </div>

    </div>
  )
}

export default ProgressBar