import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { MenuLogo } from '@/icons/menu-logo';

type Props = {
    trigger: React.ReactNode,
    children: React.ReactNode,
    title: string,
    description: string,
    logo?: string
    type?: "Integration",
}

const Modal = (props: Props) => {
 switch (props.type) {
    case "Integration":

        return <Dialog>

            <DialogTrigger asChild>{props.trigger}</DialogTrigger>

            <DialogContent>
                <div className="flex justify-center gap-3 items-center py-2">

                    <div className="w-12 h-12 relative">
                        <MenuLogo onClick={() => ""} />
                    </div>

                    <div className="text-gray-400">
                        <ArrowLeftIcon size={20}/>
                        <ArrowRightIcon size={20}/>
                    </div>

                    <div className="w-18 h-18 relative">
                        <Image src={`https://ucarecdn.com/${props.logo}/`} fill alt='Logo' objectFit='contain'/>
                    </div>

                </div>
                <DialogHeader className='flex items-center'>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
                </DialogHeader>

                {props.children}
            </DialogContent>

        </Dialog>

    default:
        return <Dialog>
            <DialogTrigger asChild>{props.trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-xl'>{props.title}</DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
                </DialogHeader>
                {props.children}
            </DialogContent>
        </Dialog>
 } 
}

export default Modal