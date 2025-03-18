import Image from 'next/image'
import React from 'react'
import { formatDateT1 } from '../../../utils/dates'
import { Skeleton } from '@mantine/core'



const TribeMediaLoadingCard  = () => {
  return (
    <div className='relative w-[240px] space-y-4 overflow-hidden'>
      <div className='relative  h-[160px] rounded-md overflow-hidden bg-secondary' title='video name'>
        <Skeleton className='w-full h-full rounded-md' />
      </div>
      <div className='w-full space-y-2'>
      <Skeleton className='w-full h-[20px] rounded-sm' />
      <Skeleton className='w-[80%] h-[20px] rounded-sm' />
      <Skeleton className='w-[30px] h-[20px] rounded-sm' />
       
      </div>
    </div>
  )
}

export default TribeMediaLoadingCard