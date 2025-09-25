import Modal from '@/components/modal'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CloudIcon } from 'lucide-react'
import React from 'react'
import IntegrationModalBody from './integration-modal-body'

type Props = {
    name: "stripe",
    logo: string,
    title: string,
    description: string,
    connections: {
        stripe: boolean
    }
}

const IntefrationTrigger = (props: Props) => {
  return (
    <Modal title={props.title} type="Integration" logo={props.logo} description={props.description} trigger={
        <Card className='px-3 py-2 cursor-pointer flex gap-2 flex-row'>
            <CloudIcon/>
            {props.connections[props.name] ? "Connected" : "Connect"}
        </Card>
    }>
        <Separator/>

        <IntegrationModalBody connections={props.connections} type={props.name} />
        
    </Modal>
  )
}

export default IntefrationTrigger