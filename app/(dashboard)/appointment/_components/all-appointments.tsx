import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { APPOINTMENT_TABLE_HEADER } from '@/constants/menu'
import { cn } from '@/lib/utils'
import React from 'react'
import {format} from "date-fns"
import { CardDescription } from '@/components/ui/card'

type Props = {
    bookings: {
        Customer: {
            Domain: {
                name: string
            } | null
        } | null,
        id: string,
        email: string,
        domainId: string | null,
        date: Date,
        slot: string,
        createdAt: Date,
    }[] | undefined
}

const AllAppointments = (props: Props) => {
  return (
    <Table className='rounded-t-xl overflow-hidden'>

        <TableHeader>
            <TableRow className='bg-grandis'>

                {APPOINTMENT_TABLE_HEADER.map((header, key) => (  
                    <TableHead key={key} className={cn(key === APPOINTMENT_TABLE_HEADER.length - 1 && "text-right")}>
                        {header}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>

        <TableBody>

            {
                props.bookings ? (
                    props.bookings.map(booking => <TableRow key={booking.id}>

                        <TableCell>{booking.email}</TableCell>
                        <TableCell>
                            <div>
                                {format(booking.date, "dd MMMM yyyy")}
                            </div>
                            <div className="uppercase">{booking.slot}</div>
                        </TableCell>
                        <TableCell>
                            <div>
                                {format(booking.createdAt, "dd MMMM yyyy")}
                            </div>
                            <div>
                                {format(booking.createdAt, "hh:mm a")}
                            </div>
                        </TableCell>
                        <TableCell>
                            {booking.Customer?.Domain?.name}
                        </TableCell>
                    </TableRow>)
                ) : (
                    <CardDescription className='col-span-4'>No Appointments</CardDescription>
                )
            }

        </TableBody>

    </Table>
  )
}

export default AllAppointments