import React from 'react'
import { formatDateT1 } from '../../../utils/dates'



const TribeEventCard = ({event}) => {
  return (
    <a href={event?.eventUrl} target='_blank'>
      <div className='relative w-full py-10 space-y-2 cursor-pointer'>
        <article className='font-bold text-xs opacity-90 md:text-start text-center'>{event?.title}</article>
        <article className='text-[12px] text-white opacity-50 md:text-start text-center'>{event?.description.length > 200 ? `${event?.description?.substring(0,200)}...`:event?.description}</article>
        <div className='flex md:justify-start justify-center items-start text-[10px] text-primary'>{formatDateT1(event?.date)}</div>
        <div className='absolute bottom-0 left-0 w-full h-[1px] bg-white bg-opacity-10'></div>
    </div>
    </a>
  )
}

export default TribeEventCard