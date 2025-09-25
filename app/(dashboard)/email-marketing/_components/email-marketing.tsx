"use client"

import FormGenerator from '@/components/forms/form-generator'
import Loader from '@/components/global/loader'
import Modal from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { UserRegFormIptType, UserRegFormType } from '@/constants/form'
import { useEmailMarketing } from '@/hooks/mail/use-email-marketing'
import CalIcon from '@/icons/cal-icon'
import { Plans } from '@/lib/generated/prisma'
import { cn } from '@/lib/utils'
import { format } from "date-fns"
import { ContactIcon, PlusIcon } from 'lucide-react'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import CustomerTable from './customer-table'
import EditEmail from './edit-email'

type Props = {
    domains: {
        customer: {
            Domain: {
                name: string
            } | null,
            id: string,
            email: string | null,
        }[]
    }[],
    campaings: {
        name: string,
        id: string,
        customers: string[],
        createdAt: Date,
    }[],
    subscription: {
        plan: Plans,
        credits: number
    } | null
}

const EmailMarketing = (props: Props) => {

    const {
        onSelectedEmails,
        isSelected,
        onCreateCampaign,
        formEmailRegister,
        formEmailErrors,
        formBodyRegister,
        formBodySetValue,
        formBodyErrors,
        loading,
        onSelectCampaign,
        processing,
        campaingId,
        onAddCustomersToCampaign,
        onBulkEmailSender,
        onSetAnsweredId,
        isId,
        onCreateEmailTemplate,
    } = useEmailMarketing();

  return (
    <div className='w-full flex-1 h-0 grid grid-cols-1 lg:grid-cols-2 gap-10 pr-2'>
        <CustomerTable
            domains={props.domains}
            onId={onSetAnsweredId}
            onSelect={onSelectedEmails}
            select={isSelected}
            id={isId}
        />

        <div className="w-full">
            <div className="flex gap-3 justify-end">
                    <Button disabled={isSelected.length === 0 || !campaingId?.length} variant={"outline"} onClick={onAddCustomersToCampaign}>
                    <PlusIcon/> Add to campaign
                </Button>
                <Modal title='Create a new campaign' description='Add your customers and create a marketing campaign' trigger={<Button className='bg-orange/70'>
                    <PlusIcon/> Create Campaign 
                </Button>}>
                    
                    <form className='flex flex-col gap-4' onSubmit={onCreateCampaign}>

                        <FormGenerator 
                            name='name'
                            register={formEmailRegister as unknown as UseFormRegister<FieldValues>}
                            errors={formEmailErrors}
                            inputType={UserRegFormIptType.INPUT}
                            type={UserRegFormType.TEXT}
                            placeholder='Your campaign name' 
                            defaultValue={null}                      
                        />

                        <Button type='submit' className='w-full' disabled={loading}>
                            <Loader loading={loading} className='bg-grandis'>Create Campaign</Loader>
                        </Button>

                    </form>

                </Modal>

                <Card className='p-2'>
                    <CardDescription className='font-bold'>
                        {props.subscription?.credits ?? 0} credits
                    </CardDescription>
                </Card>

            </div>

            <div className="flex flex-col items-end mt-5 gap-3">

                {
                    !!props.campaings.length && props.campaings.map((campaign, index) => (
                        <Card key={index} className={cn('p-5 w-full max-w-full cursor-pointer', campaingId === campaign.id ? "bg-gray-50" : "")} onClick={() => onSelectCampaign(campaign.id)}>

                            <Loader loading={processing}>

                                <CardContent className='p-0 flex flex-col items-center gap-3'>
                                    <div className="flex w-full justify-between items-center">

                                        <div className="flex gap-2 items-center">

                                            <CalIcon/>
                                            <CardDescription>
                                                Created {format(campaign.createdAt, "dd mmmm")}
                                            </CardDescription>

                                        </div>

                                        <div className="flex gap-2">

                                            <ContactIcon/>
                                            <CardDescription>
                                                {campaign.customers.length} customers added
                                            </CardDescription>

                                        </div>

                                    </div> 

                                    <div className="flex w-full justify-between items-center">

                                        <CardTitle className='text-4xl'>{campaign.name}</CardTitle>
                                        
                                        <div className="flex gap-3">

                                            <Modal 
                                                title='Edit Email'
                                                description='This email will be sent to campaign members'
                                                trigger={<Button className='bg-grandis hover:bg-grandis/75'>
                                                    Edit Email
                                                </Button>}
                                            >
                                                <EditEmail
                                                    register={formBodyRegister as unknown as UseFormRegister<FieldValues>}
                                                    errors={formBodyErrors}
                                                    setDefault={formBodySetValue as unknown as UseFormSetValue<FieldValues>}
                                                    onCreate={onCreateEmailTemplate}
                                                    id={campaign.id}
                                                />
                                            </Modal>

                                            <Button 
                                                className='rounded-lg' 
                                                onClick={() => onBulkEmailSender(campaign.customers, campaign.id)}
                                            >
                                                Send
                                            </Button>

                                        </div>
                                    
                                    </div>
                                </CardContent>

                            </Loader>

                        </Card>
                    ))
                }

            </div>

        </div>

    </div>
  )
}

export default EmailMarketing