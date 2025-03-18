import React, { useState } from 'react'

const TribeCollections = ({session}) => {
  const [collections,setCollections] = useState("")
  return (
    <div className='relative w-full space-y-10'>
      <div className="relative py-5 ">
        <article className="md:text-2xl text-lg">Collections</article>
        <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
        
      </div>
      <div className="w-full md:h-[400px] h-[300px] flex justify-center items-center rounded-md bg-secondary">
      <article className="text-xl opacity-50">No Collection Yet!</article>
    </div>
    </div>
  )
}

export default TribeCollections