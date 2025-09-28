"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2Icon, ClipboardIcon, EyeOffIcon, UserIcon } from 'lucide-react';
import React from 'react';

const CopyCredentials = () => {
    const [clickEmail, setClickEmail] = React.useState(false);
    const [clickPass, setClickPass] = React.useState(false);

    const handleCopy = (copyInst: string) => {
        window.navigator.clipboard.writeText(copyInst === "email" ? "craftsuitexampleacc123@gmail.com" : "passwordlike123")

        if(copyInst === "email") {
            setClickEmail(true);
            setTimeout(() => setClickEmail(false), 1000)
        }else if(copyInst === "pass") {
            setClickPass(true);
            setTimeout(() => setClickPass(false), 1000)
        }
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Testing Credentials</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-5'>

            <div className='relative'>
                <div>
                    <UserIcon/>
                </div>
                <div>
                    craftsuitexampleacc123@gmail.com
                </div>

                <div onClick={() => handleCopy('email')} className='bg-grandis rounded-full p-2 absolute top-0 right-2'>
                    {
                        clickEmail ? <CheckCircle2Icon/> : <ClipboardIcon/>
                    }
                </div>
            </div>


            
            <div className='relative'>
                <div>
                    <EyeOffIcon/>
                </div>
                <div>
                    passwordlike123
                </div>

                <div onClick={() => handleCopy('pass')} className='bg-grandis rounded-full p-2 absolute top-0 right-2'>
                    {
                        clickPass ? <CheckCircle2Icon/> : <ClipboardIcon/>
                    }
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default CopyCredentials