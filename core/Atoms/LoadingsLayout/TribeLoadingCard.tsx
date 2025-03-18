import { Skeleton } from '@mantine/core';
import React from 'react'

const TribeLoadingCard = () => {
    const CardBanner = () => {
        return (
          <div className="relative w-full h-[70%] ">
            <div className="relative w-full h-full bg-ternary rounded-t-xl overflow-hidden ">
              <Skeleton className='w-full h-full' />
            </div>
            <div className="absolute w-[80px] h-[80px]  bottom-0 left-[50%] -translate-x-[50%] -mb-[30px] p-2 bg-secondary rounded-full">
              <div className="relative w-full h-full rounded-full bg-ternary">
              <Skeleton className='w-full h-full rounded-full' />
              </div>
            </div>
          </div>
        );
      };
    
      const CardInfo = () => {
        return (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex flex-col justify-center items-center px-5">
            <div className='w-[50px] h-[20px]'>
                <Skeleton className='w-full h-full' />
            </div>
          </div>
        );
      };
  return (
    <div
      className="relative w-full h-full bg-secondary rounded-xl  cursor-pointer"
     
    >
      <CardBanner />
      <CardInfo />
    </div>
  )
}

export default TribeLoadingCard
