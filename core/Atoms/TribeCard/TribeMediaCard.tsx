import Image from 'next/image'
import React from 'react'
import { formatDateT1 } from '../../../utils/dates'



const TribeMediaCard  = ({media}) => {
  return (
    <a href={media?.articleUrl} target='_blank'>
      <div className='relative md:w-[240px] w-full space-y-4 overflow-hidden'>
      <div className='relative  h-[160px] rounded-md overflow-hidden bg-secondary' title='video name'>
       {media?.imageUrl?.includes("https://") && <Image src={media?.imageUrl} title={media?.title} alt='thumbnail' width={500} height={500} className='relative w-full h-full object-cover z-0'/>}
      </div>
      <div className='w-full space-y-2'>
        <article className='text-xs' title={media?.title}>{media?.title?.length > 50 ? `${media?.title?.substring(0,50)}...` : media?.title}</article>
        <article className='text-[8px] font-bold text-white opacity-50'>{formatDateT1(media?.uploadedOn)}</article>
      </div>
    </div>
    </a>
  )
}

export default TribeMediaCard