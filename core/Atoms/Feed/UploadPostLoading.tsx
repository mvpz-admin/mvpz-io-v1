import { Loader } from '@mantine/core'
import Image from 'next/image';
import React from 'react'
import { FaImage } from "react-icons/fa6";

const UploadPostLoading = () => {
  return (
    <div className='flex justify-between items-center  border-t-[0.1px] border-[rgba(255,255,255,0.5)] border-b-[0.1px] py-5'>
        <div className='flex justify-start items-center space-x-5'>
        <Image src={"/images/photo.png"} alt='post' width={500} height={500} className='relative w-[40px] h-[40px] object-fit' />
        <div className='flex flex-col justify-center items-start'>
            <article className='font-bold'>Uploading Your Post</article>
            <article className='text-[10px]'>your post is adding to mvpz.</article>
        </div>
        </div>
        <Loader />
    </div>
  )
}

export default UploadPostLoading