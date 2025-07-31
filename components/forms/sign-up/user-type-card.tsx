"use client"
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { UserType } from '@/types/user-type'
import { UserIcon } from 'lucide-react'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    value: string,
    title: string, 
    text: string,
    register: UseFormRegister<FieldValues>,
    userType: UserType
    setUserType: React.Dispatch<React.SetStateAction<UserType>>
}

const UserTypeCard = (props: Props) => {
  return (
    <Label htmlFor={props.value}>
        <Card className={cn("w-full cursor-pointer", props.userType === props.value && "border-orange")}>
          
          <CardContent className='flex justify-between p-2'>

            <div className='flex items-center gap-3'>

              <Card className={cn("flex justify-center p-3", props.userType === props.value && "border-orange")}>
                <UserIcon size={30} className={cn(props.userType === props.value ? "text-orange" : "text-gray-400")} />
              </Card>

              <div className=''>
                <CardDescription className='font-bold'>{props.title}</CardDescription>
                <CardDescription className='text-light'>{props.text}</CardDescription>
              </div>

            </div>
            
            <div>
              <div className={cn("w-4 h-4 rounded-full", props.userType === props.value ? "bg-peach": "bg-transparent")}>
                <Input
                  {...props.register("type", { onChange: e => props.setUserType(e.target.value) })}
                  value={props.value}
                  id={props.value}
                  className='hidden'
                  type='radio'
                />
              </div>
            </div>

          </CardContent>

        </Card>
    </Label>
  )
}

export default UserTypeCard