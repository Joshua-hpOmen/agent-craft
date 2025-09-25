import ProgressBar from '@/components/global/progress'
import { PlanType } from '@/types'
import React from 'react'

type Props = {
    plan: PlanType,
    credits: number,
    domains: number,
    clients: number
}

const PlanUsage = (props: Props) => {
  return (
    <div className='flex flex-col gap-5 py-5'>
        
        <ProgressBar end={props.plan === PlanType.STANDARD ? 10 : props.plan === PlanType.PRO ? 50 : 500} label={"Email Credits"} credits={props.credits} />
        <ProgressBar end={props.plan === PlanType.STANDARD ? 1 : props.plan === PlanType.PRO ? 2 : 100} label={"Domains"} credits={props.domains} />
        <ProgressBar end={props.plan === PlanType.STANDARD ? 10 : props.plan === PlanType.PRO ? 50 : 500} label={"Contacts"} credits={props.clients} />

    </div>
  )
}

export default PlanUsage