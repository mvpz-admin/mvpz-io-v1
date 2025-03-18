import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const BuyCardModel = ({
    username
}) => {
    const router = useRouter()
  return (
    <div className='md:w-[60vw] w-[80vw]  bg-secondary rounded-md p-10 space-y-10 '>
      <div className='w-full'>
      <div className='w-full text-center md:text-2xl text-lg'>Join The Tribe to Interact!</div>
      <div className='w-full text-center text-[10px] text-white opacity-50 '>You need a card from this team to be apart of the Tribe!</div>
      </div>
      <div className='flex justify-center items-center'>
        <Image src={"/images/market.png"} alt='market card' width={500} height={500} className='relative w-full object-contain'/>
      </div>
      <div className='flex  justify-center items-center space-x-4'>
        <div className='px-5 py-2 bg-primary rounded-md cursor-pointer md:text-base text-[8px] text-center' onClick={() => router?.push("/mvpz-store")}>Get Card</div>
      </div>
    </div>
  )
}

export default BuyCardModel
