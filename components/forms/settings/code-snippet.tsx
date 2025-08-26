"use client"
import Section from '@/components/global/section-label'
import { CircleCheckIcon, CopyIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    id: string
}

const CodeSnippet = (props: Props) => {
    const [hasCopied, setCopy] = React.useState(false)

    const snippet = `
    <script>
        const iframe = document.createElement("iframe");
        
        const iframeStyles = (styleString) => {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
        }
        
        iframeStyles(\`
            .chat-frame {
                position: fixed;
                bottom: 50px;
                right: 50px;
                border: none;
            }
        \`)
        
        iframe.src = "${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/chatbot"
        iframe.classList.add('chat-frame')
        document.body.appendChild(iframe)
        
        window.addEventListener("message", (e) => {
            if(e.origin !== "${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}") return null
            let dimensions = JSON.parse(e.data)
            iframe.width = dimensions.width
            iframe.height = dimensions.height
            iframe.contentWindow.postMessage("${props.id}", "${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/")
        })
    </script>
        `

    const handleClick = () => {

        navigator.clipboard.writeText(snippet); 
        setCopy(true)
        toast.success("Copied to clipboard");
        setTimeout(() => {
            setCopy(false)
        }, 1200)
    } 

  return (
    <div className='mt-10 flex flex-col gap-5 items-start'>

        <Section 
            label='Code snippet'
            message='Copy and paste this code snippet into the header tag of your website'
        />

        <div className='bg-muted px-10 rounded-lg inline-block relative'>

            {!hasCopied ? <CopyIcon
                    className='absolute top-5 right-5 text-gray-500 cursor-pointer'
                    onClick={() => handleClick()}
                /> : <CircleCheckIcon  className='absolute top-5 right-5 stroke-orange cursor-pointer'/>
            }
            
            <pre>
                <code className='text-gray-500 text-wrap'>{snippet}</code>
            </pre>

        </div>

    </div>
  )
}

export default CodeSnippet