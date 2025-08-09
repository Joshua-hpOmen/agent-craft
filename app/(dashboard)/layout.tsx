import { onLoginUser } from '@/actions/auth/on-login-user'
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

        

      </div>

    </ChatProvider>
  ) 
  
}

export default layout