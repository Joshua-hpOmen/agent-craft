"use client"
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { INTEGRATION_LIST_ITEMS } from '@/constants/constants'
import Image from 'next/image'
import React from 'react'
import IntefrationTrigger from './integration-trigger'

type Props = {
    connections: {stripe: boolean}
}

const IntegrationsList = (props: Props) => {
  return (
    <div className="flex-1 grid- grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3">

      {INTEGRATION_LIST_ITEMS.map(item => <Card key={item.id}>
          <CardContent className='flex flex-col p-5 gap-2'>

            <div className="flex w-full justify-between items-start gap-x-20">
              <div>

                <div className="w-15 h-15 relative">
                  <Image src={`https://ucarecdn.com/${item.logo}/`} alt='Logo' fill sizes='100vw' objectFit="contain"/> 
                </div>

                <h2 className="font-bold capitalize">{item.name}</h2>

              </div>

              <IntefrationTrigger connections={props.connections} title={item.title} description={item.modalDescription} logo={item.logo} name={item.name} />

            </div>

            <CardDescription>{item.description}</CardDescription>

          </CardContent>
      </Card>)}

    </div>
  )
}

export default IntegrationsList 