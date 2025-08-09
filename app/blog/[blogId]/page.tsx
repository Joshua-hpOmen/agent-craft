import React from 'react'
import blogs from "@/lib/blogs/blog-json.json";
import { redirect } from 'next/navigation';
import Image from 'next/image';
type Props = {
    params: Promise<{blogId: string}>
}

const page = async (props: Props) => {
    const params = await props.params

    const selectedBlog = blogs.find(blog => blog.id === params["blogId"])
    if(!selectedBlog) redirect("/");
    
  return (
    <div className='h-screen w-screen p-[10%] flex flex-col gap-5'>
        <h1 className='font-bold text-5xl'>{selectedBlog.heading}</h1>

        <p className='text-lg'>{selectedBlog.paraOne}</p>

        <section className='flex justify-center w-full'>
          <Image src={selectedBlog.image} alt='Blog-Image' className='rounded-md' style={{width: "100%", height: "auto"}} width={0} height={0}/>
        </section>

        <p className='text-lg'>{selectedBlog.paraTwo}</p>
        <p className='text-lg'>{selectedBlog.paraThree}</p>
    </div>
  )
}

export default page