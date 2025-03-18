import React from 'react'
import { PiTShirtFill } from 'react-icons/pi'

const ApparelEarningsBlock = () => {
  return (
     <div className="relative w-full h-[300px] p-5 rounded-md border border-primary shadow shadow-primary flex flex-col justify-between items-start opacity-50">
                  <div className="flex justify-start items-center gap-2 w-full">
                    <PiTShirtFill size={50} className="text-blue-500" />
                    <div className="w-full">
                      <article className="text-2xl mb-1 uppercase ">
                        Apparel
                      </article>
                     
                    </div>
                    
                  </div>
                  <div className="max-w-full]">
                  <article className="font-extrabold">Total Earn</article>
                    <article className="text-[50px] text-white">--</article>
                    
                  </div>
                  <div className="absolute bottom-0 right-0 w-[280px] h-[280px]">
                   
                  </div>
                </div>
  )
}

export default ApparelEarningsBlock