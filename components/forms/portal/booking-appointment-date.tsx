import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { APPOINTMENT_TIME_SLOTS } from '@/constants/constants'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon } from 'lucide-react'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    date: Date | undefined,
    onBooking: React.Dispatch<React.SetStateAction<Date| undefined>>,
    onBack: () => void,
    onSlot: (slot: string) => void,
    currentSlot?: string,
    loading: boolean,
    bookings: {
        date: Date,
        slot: string,
    }[] | undefined,
    register: UseFormRegister<FieldValues>
}

const BookingAppointmentDate = (props: Props) => {
  return (
    <div className='flex flex-col gap-5 justify-center'>

        <div className="flex justify-center">
            <h2 className="text-4xl font-bold mb-5">Book a meeting</h2>
        </div>

        <div className="flex gap-10 flex-col md:flex-row">

            <div className="w-[300px]">
                <h6 className="">Discovery Call</h6>
                <CardDescription>
                    During this call, we aim to explore potential avenues for partnership, promotional opportunities, or any other means through which we can contribute to the success of you company
                </CardDescription>
            </div>
            <div className='flex gap-5'>
                <div>
                    <Calendar mode="single" className='rounded-md border' selected={props.date} onSelect={props.onBooking}/>
                </div>

                <div className="flex flex-col gap-5">

                    {APPOINTMENT_TIME_SLOTS.map((slot, key) => (
                        <Label htmlFor={'slot-'+key} key={key}>
                            <Card onClick={() => props.onSlot(slot.slot)} className={cn("px-10 py-4",props.currentSlot === slot.slot ? "bg-grandis" : "bg-peach", props.bookings && props.bookings.some(book => `${book.date.getDate()}/${book.date.getMonth()}` === `${props.date?.getDate()}/${props.date?.getMonth()}` && book.slot === slot.slot) ? "bg-gray-300" : "cursor-pointer border-orange/65 hover:bg-grandis transition duration-150 ease-in-out")}>

                                <Input className='hidden' type="radio" value={slot.slot} {...props.register("slot")} id={'slot-'+key} {...(props.bookings && props.bookings.some((book) => book.date === props.date && book.slot === slot.slot) ? { disabled: true} : {disabled: false})}/>
                                {slot.slot}
                            </Card>
                        </Label>
                    ))}

                </div>
            </div> 

        </div>
        
        <div className="flex gap-5 justify-center mt-5">
            <Button type='button' className='flex gap-2 items-center' onClick={props.onBack} variant={"outline"}>
                <ChevronLeftIcon/> Back
            </Button>

            <Button type='submit' disabled={!props.currentSlot}>
                <Loader loading={props.loading}>Book Now</Loader>
            </Button>
        </div>

    </div>
  )
}

export default BookingAppointmentDate