import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EMAIL_MARKETING_HEADER } from '@/constants/menu'
import { cn } from '@/lib/utils'
import CustomerAnswers from './customer-answer'

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
    onSelect: (email: string) => void
    select: string[],
    onId: (id: string) => void,
    id?: string
}

const CustomerTable = (props: Props) => {
  return (
    <Table className="rounded-t-xl overflow-hidden">
        
        <TableHeader className='bg-grandis'>
            <TableRow>
                {EMAIL_MARKETING_HEADER.map((header, key) => (
                    <TableHead key={key}>
                        <TableHead className={cn(key === EMAIL_MARKETING_HEADER.length - 1 && "text-right", "text-right")}>
                            {header}
                        </TableHead>
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>

        <TableBody>

            {
                props.domains.map((domain) => (
                    domain.customer.map(customer => (
                        <TableRow key={customer.id}>

                            <TableCell>
                                <Button 
                                    onClick={() => props.onSelect(customer.email!)}
                                    className={cn('rounded-full p-0 w-5 h-5 border-4 cursor-pointer', props.select.includes(customer.email!) ? "bg-orange" : "bg-peach")}
                                />
                            </TableCell>

                            <TableCell>
                                {customer.email}
                            </TableCell>

                            <TableCell>

                                <Sheet>

                                    <SheetTrigger>
                                        <Button className='bg-grandis py-2 px-4 cursor-pointer text-gray-700 hover:bg-orange' onClick={() => props.onId(customer.id)}>
                                            View
                                        </Button>
                                    </SheetTrigger>

                                    <SheetContent className='px-[4%] pt-5'>

                                        <SheetTitle className='text-2xl font-bold'>
                                            Answers
                                        </SheetTitle>

                                        <SheetDescription>
                                            Customer answers are stored by the bot when your customers respond back to the questions asked by the bot.
                                        </SheetDescription>

                                        <CustomerAnswers id={props.id}/>

                                    </SheetContent>
                                </Sheet>

                            </TableCell>

                            <TableCell className='text-right'>
                                {customer.Domain?.name}
                            </TableCell>

                        </TableRow>
                    ))
                ))
            }

        </TableBody>

    </Table>
  )
}

export default CustomerTable