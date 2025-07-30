import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = async (props: Props) => {
    const user = await currentUser()
    if(user) redirect("/")


  return (
    <div className='h-screen flex w-screen justify-center'>

        <div className='w-[600px] flex flex-col items-start p-6'>

            <Image src={'/images/logo.png'} alt='Logo' sizes='100vw' style={{width: "20%", height: "auto"}} width={0} height={0}/>
            {props.children}

        </div>

        <div className='hidden lg:flex flex-1 w-full max-w-[4000px] overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3'>

            <h2 className='text-gravel md:text-4xl font-bold'>Hi, I&apos;m your Ai powered sales assistant, Corrina!</h2>

            <p className='text-iridium md:text-sm mb-10'>
                Corrina is capable of capturing lead info without a form...{""}
                <br />
                soemthing never done before 😎.
            </p>

            <Image src={"/images/app-ui.png"} alt='app image' loading="lazy" sizes='30' className='absolute shrink-0 !w-[1600px] top-54' width={0} height={0}/>

        </div>

    </div>
  )
}

export default layout