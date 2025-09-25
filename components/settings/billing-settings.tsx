import { onGetSubscriptionPlan } from '@/actions/settings'
import { pricingCards } from '@/constants/landing-page'
import { CheckCircle2Icon, PlusIcon } from 'lucide-react'
import Section from '../global/section-label'
import { Card, CardContent, CardDescription } from '../ui/card'

const BillingSetting = async () => {
    const plan = await onGetSubscriptionPlan()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        <div className='lg:col-span-1'>
            <Section label="Billing settings" message="Add payment info, upgrade and modify your plan"/>
        </div>

        <div className='lg:col-span-1 flex justify-start lg:justify-center'>
          
          <Card className='border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center'>

            <CardContent className='flex gap-2 items-center'>

              <div className='rounded-full border-2 p-1'>
                <PlusIcon className='text-gray-400'/>
              </div>

              <CardDescription className='font-semibold'>
                Upgrade Plan
              </CardDescription>

            </CardContent>

          </Card>

        </div>

        <div className='lg:col-span-1'>

          <h3 className="text-xl font-semibold mb-2">Current Plan</h3>

          <p className="text-sm font-semibold">{plan}</p>
          <p className="text-sm font-light flex flex-col gap-3 mt-2">
            {
              pricingCards.find(card => card.title.toUpperCase() === plan )?.features.map(feature => (
                <div key={feature} className='flex gap-2'>
                    <CheckCircle2Icon className='stroke-muted-foreground'/>
                    <p className="text-muted-foreground">{feature}</p>
                </div>
              ))
            }
          </p>

        </div>

    </div>
  )
}

export default BillingSetting