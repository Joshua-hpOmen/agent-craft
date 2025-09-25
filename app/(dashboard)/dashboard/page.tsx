import { onGetUserClietns } from '@/actions/dashboard/on-get-use-client';
import { onGetUserAppointments } from '@/actions/dashboard/on-get-user-appointments';
import { onGetUserPlanInfo } from '@/actions/dashboard/on-get-user-plan-info';
import { onGetUserTransactions as onGetUserTotalProducts } from '@/actions/dashboard/on-get-user-transactions';
import InfoBar from '@/components/global/info-bar';
import CalIcon from '@/icons/cal-icon';
import PersonIcon from '@/icons/person-icon';
import { DollarSignIcon } from 'lucide-react';
import DashboardCard from './_components/dashboard-card';
import MoneyIcon from '@/icons/money-icon';
import { TransactionsIcon } from '@/icons/transactions-icon';
import PlanUsage from './_components/plan-usage';
import { PlanType } from '@/types';
import { Separator } from '@/components/ui/separator';

type Props = {}

const page =  async (props: Props) => {
    const clients = await onGetUserClietns();
    const sales = 5000;
    const bookings = await onGetUserAppointments() 
    const planInfo = await onGetUserPlanInfo()
    const transactions = await onGetUserTotalProducts()

  return (
    <>
        <InfoBar/>
        <div className="overflow-y-hidden w-full chat-window flex-1 h-0">
            <div className="flex gap-5 flex-wrap">
                <DashboardCard value={clients ?? 0} title="Potential Clients" icon={<PersonIcon/>} />
                <DashboardCard value={transactions! * clients! || 55000} sales title='Pipleiline Value' icon={<DollarSignIcon/>} />
                <DashboardCard value={bookings || 0} title='Appointments' icon={<CalIcon/>} />
                <DashboardCard value={sales} title='Total Sales' sales icon={<MoneyIcon/>} />
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
                <div>

                    <div>
                        <h2 className="font-bold text-2xl">Plan Usage</h2>
                        <p className="text-sm font-light">
                            A deatiled overview of your metrics, usage, customers, and more
                        </p>
                    </div>

                    <PlanUsage plan={planInfo?.plan as PlanType} credits={planInfo?.credits || 0} domains={planInfo?.domains || 0} clients={clients || 0} />

                </div>

                <div className="flex flex-col mr-2">

                    <div className="w-full flex justify-between items-start mb-5">

                        <div className="flex gap-3 items-center">
                            <TransactionsIcon/>
                            <p className="font-bold">Recent Transactions</p>
                        </div>

                        <p className="text-sm">See more...</p>

                    </div>


                    <Separator />

                    <div>No transactions.</div>

                </div>


            </div>

        </div>
    </>
  )
}

export default page