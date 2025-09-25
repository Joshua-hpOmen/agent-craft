import { onGetAllCustomers } from '@/actions/mail/on-gell-all-customers';
import { onGetAllCampaings } from '@/actions/mail/on-get-all-campaigns';
import InfoBar from '@/components/global/info-bar';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import EmailMarketing from './_components/email-marketing';

const page = async () => {
    
    const user = await currentUser();
    if(!user) return;

    const customers = await onGetAllCustomers(user.id)
    const campaigns = await onGetAllCampaings(user.id)

  return (
   <>
    <InfoBar/>
    <EmailMarketing domains={customers?.domains ?? []} campaings={campaigns?.campaign ?? []} subscription={customers?.subscription ?? null} />
   </> 
  )
}

export default page