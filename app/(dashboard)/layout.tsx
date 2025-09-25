import { onLoginUser } from '@/actions/auth/on-login-user'
import Sidebar from '@/components/sidebar/side-bar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = async (props: Props) => {
    const authenticatedUser = await onLoginUser()
    if(!authenticatedUser) return null;

  return(
    <ChatProvider>

      <div className='flex h-screen w-full'>
        <Sidebar domains={authenticatedUser.domain} />

        <div className='flex-1 h-screen flex flex-col py-3 pl-20 md:pl-5'>
          {props.children}
        </div> 

      </div>

    </ChatProvider>
  ) 
  
}

export default layout