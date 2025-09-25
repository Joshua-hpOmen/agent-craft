import { HeadphonesIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import BreadCrumb from './bread-crumb'

const InfoBar = () => {
  return (
    <div className='flex w-full justify-between items-center py-1 mb-8 '>

        <BreadCrumb/>
        <div className='flex gap-3 items-center'>

            <Avatar>
                <AvatarFallback className='bg-orange text-white'>
                    <HeadphonesIcon/>
                </AvatarFallback>
            </Avatar>

            <Avatar>
                <AvatarImage src={'https://github.com/shadcn.png'} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        </div>

    </div>
  )
}

export default InfoBar