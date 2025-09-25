import React from 'react'

type Props = {
    title: string,
    value: number,
    icon: React.ReactNode,
    sales?: boolean
}

const DashboardCard = (props: Props) => {
  return (
    <div className='bg-muted rounded-lg flex flex-col gap-3 px-10 py-10 md:pr-20 md:w-fit w-full'>
       <div className="flex gap-3">
            {props.icon}
            <h2 className="font-bold text-xl">{props.title}</h2>
        </div> 

        <p className="font-bold text-4xl">
            {props.sales && "$"}
            {props.value}
        </p>
    </div>
  )
}

export default DashboardCard