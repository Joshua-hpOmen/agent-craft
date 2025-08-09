import React from 'react'

type Props = {
    label: string,
    message: string
}

const Section = (props: Props) => {
  return (
    <div>
        <p className='text-sm font-medium'>{props.label}</p>
        <p className='text-sm font-light'>{props.message}</p>
    </div>
  )
}

export default Section