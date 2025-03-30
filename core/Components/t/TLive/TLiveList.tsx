import React from 'react'
import { IoFileTrayOutline } from 'react-icons/io5'

const TLiveList = () => {
  return (
    <div className='w-full h-[500px] flex flex-col justify-center items-center'>
        <IoFileTrayOutline className='text-ternary md:text-[80px] text-[40px] mb-2' />
        <div className='text-secondary text-2xl font-bold opacity-50'>No Live Streams</div>
    </div>
  )
}

export default TLiveList