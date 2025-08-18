import { onGetCurrentDomainInfo } from '@/actions/settings/on-get-current-domain-info';
import SettingsForm from '@/components/forms/settings/form';
import InfoBar from '@/components/global/info-bar';
import BotTrainingForm from '@/components/settings/bot-training';
import { PlanType } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: Promise<{ domain: string}>
}

const page = async (props: Props) => {
    const params = await props.params;
    
    const domain = await onGetCurrentDomainInfo(params.domain);
    if(!domain) redirect("/dashboard");

  return (
    <>
        <InfoBar/>
        <div className="overflow-y-auto w-full chat-window flex-1 h-0">

            <SettingsForm 
                plan={domain.subscription!.plan as PlanType}
                chatBot={domain.domains[0].chatBot}
                id={domain.domains[0].id}
                name={domain.domains[0].name}
            />

            <BotTrainingForm 
                id={domain.domains[0].id}
            />

        </div>
    </>
  )
}

export default page