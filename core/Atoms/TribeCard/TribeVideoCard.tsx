import Image from 'next/image'
import React from 'react'

interface TribeVideoCard{
    url : string
    thumbnail: string
    name : string
    uploadOn : string
}

const TribeVideoCard : React.FC<TribeVideoCard> = ({name,thumbnail,uploadOn,url}) => {

  return (
    <div className='relative w-[325px] space-y-4 overflow-hidden'>
      <div className='relative  h-[200px] rounded-md overflow-hidden bg-secondary' title='video name'>
        <Image src={thumbnail} alt='thumbnail' width={500} height={500} className='relative w-full h-full object-cover z-0'/>
        <div className='absolute bottom-2 right-1 px-2 bg-ternary rounded-xl'>
            <button className='text-[8px] font-bold'>2:00</button>
        </div>
      </div>
      <div className='w-full space-y-2'>
        <article className='text-xs' title={name}>{name.length > 50 ? `${name.substring(0,50)}...` : name}</article>
        <article className='text-[8px] font-bold text-white opacity-50'>10th june 2020</article>
      </div>
    </div>
  )
}

export default TribeVideoCard
