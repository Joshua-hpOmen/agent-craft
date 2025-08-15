import { useDomain } from '@/hooks/sidebar/use-domain'
import { cn } from '@/lib/utils'
import React from 'react'
import AppDrawer from '../global/drawer'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import FormGenerator from '../forms/form-generator'
import { UserRegFormIptType, UserRegFormType } from '@/constants/form'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UploadButton from '../global/upload-button'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    min?: boolean,
    domains: {
        id: string,
        name: string,
        icon: string | null,
    }[] | null | undefined
}

const DomainMenu = (props: Props) => {

  const {register, onAddDaomain, loading, errors, isDomain} = useDomain();

  return (
    <div className={cn("flex flex-col gap-3", props.min ? "mt-6": "mt-3")}>

      <div className='flex justify-between w-full items-center'>

        {!props.min && <p className='text-sm text-gray-500'>Domains</p>}
        <AppDrawer 
          description='Add in your daomin address to integrate your chatbot' 
          title="Add your business domain"
          onOpen={<div className='cursor-pointer text-gray-500 rounded-full border-2'>
            <PlusIcon/>
          </div>}>

            {loading ? <div className='w-full h-full flex items-center justify-center'><Loader2Icon className='text-primary animate-spin'/></div> : <>
                <form 
                  className='mt-3 w-6/12 flex flex-col gap-3'
                  onSubmit={onAddDaomain}
                >

                  <FormGenerator
                    name="domain"
                    errors={errors}
                    placeholder='mydomain.com'
                    type={UserRegFormType.TEXT}
                    inputType={UserRegFormIptType.INPUT}
                    register={register as unknown as UseFormRegister<FieldValues>}
                  />

                  <UploadButton
                    register={register as unknown as UseFormRegister<FieldValues>}
                    label="Upload Icon"
                    errors={errors}
                  />

                  <Button className='w-full' type='submit'>
                    Add Domain
                  </Button>

                </form>
            </>}

        </AppDrawer>

      </div>

      <div className='flex flex-col gap-1 text-ironside font-medium'>
            {
              props.domains && props.domains.map(domain => {
                console.log(domain.id)
                return <Link 
                  key={domain.id}
                  className={cn("flex gap-3 items-center hover:bg-white rounded-lg transition duration-100 justify-center ease-in-out cursor-pointer", !props.min ? 'p-2' : "py-2", domain.name.split(".")[0] === isDomain && "bg-white")}
                  href={`/settings/${domain.name.split(".")[0]}`}
                >
                  <Image 
                    src={`https://ucarecdn.com/${domain.icon}/-/preview/3000x2293`}
                    alt='Logo'
                    width={20}
                    height={20}
                  />  

                  {!props.min && <p className='text-sm'>{domain.name}</p>}
                </Link>
              })
            }
      </div>

    </div>
  )
}

export default DomainMenu