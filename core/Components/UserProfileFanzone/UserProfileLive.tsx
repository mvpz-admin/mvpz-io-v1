import React from 'react'

const UserProfileLive = () => {
  return (
    <div className='w-full space-y-10'>
      <div className="relative py-5 ">
        <article className="md:text-2xl text-lg">Live</article>
        <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
      </div>
      <div className="w-full h-[400px] flex justify-center items-center">
            <article className="text-xl opacity-50">No Live Posted Yet!</article>
          </div>
      </div>
  )
}

export default UserProfileLive