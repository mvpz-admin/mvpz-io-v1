import React from 'react'

const Biography = ({profileData, profileDataLoading}) => {
  return (
   <div className="relative w-full">
         <div
           dangerouslySetInnerHTML={{
             __html: 
             profileData?.biography || profileData?.bio,
           }}
           className="font-inter text-[12px]"
         />
       </div>
  )
}

export default Biography
