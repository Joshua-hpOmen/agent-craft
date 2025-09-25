import { onGetAllBookingForCurrentUser } from '@/actions/appointment/on-get-all-booking-for-current-user';
import InfoBar from '@/components/global/info-bar';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import AllAppointments from './_components/all-appointments';
import { Card, CardContent } from '@/components/ui/card';
import {format} from "date-fns"
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Divide } from 'lucide-react';


type Props = {}

const page = async (props: Props) => {

    const user = await currentUser();
    if(!user) return;

    const domainBooking = await onGetAllBookingForCurrentUser(user.id)
    const today = new Date();

    if(!domainBooking) return <div className="w-full flex justify-center">
        <p>No Appointments</p>
    </div>

  return (
    <>
        <InfoBar/>
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
            <div className="lg:col-span-2 overflow-y-auto">
                <AllAppointments bookings={domainBooking?.bookings} />
            </div>
            <div className="col-span-1 flex gap-3 md:flex-col flex-wrap mr-2">
                {domainBooking && domainBooking.bookings.map(book => book.date.getDate() === today.getDate() && (
                        <Card key={book.id} className='rounded-xl overflow-hidden py-0'>

                            <CardContent className='p-0 flex'>

                                <div className="w-4/12 text-xl bg-peach py-10 flex justify-center items-center font-bold">{book.slot}</div>
                                <div className="flex flex-col flex-1">

                                    <div className="flex gap-3 justify-center w-full p-3">
                                        <p className="text-sm">
                                            <b>Created:</b> <br />
                                            {format(book.createdAt, "hh:mm a")}
                                        </p>
                                        <p className="text-sm">
                                            <b>Domain:</b> <br />
                                            {book.Customer?.Domain?.name}
                                        </p>
                                    </div>

                                    <Separator/>

                                    <div className="w-full flex items-center p-3 gap-2">
                                        <Avatar>
                                            <AvatarFallback>{book.email[0]}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-sm">{book.email}</p>
                                    </div>

                                </div>

                            </CardContent>

                        </Card>
                    )
                )}
                {!domainBooking.bookings && <div className='w-full justify-center flex'>
                   <p>No appointsments today</p> 
                </div>}
            </div>
        </div>
    </>
  )
}

export default page