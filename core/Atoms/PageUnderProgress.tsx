import Image from 'next/image'
import React from 'react'

const PageUnderProgress = () => {
  return (
    <div className='w-full h-[600px] flex flex-col justify-center items-center space-y-8 p-10'>
      <Image src={"/images/underprogess.svg"} alt='page-underprogess' width={500} height={500} className='relative w-full h-[200px] object-fit mb-10'/>
      <article className='text-primary text-4xl text-center'>Page is Underdevelopment.</article>
      <article className='text-xs text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias non necessitatibus rem eaque in, corrupti nemo tempora reiciendis.</article>
    </div>
  )
}

export default PageUnderProgress
