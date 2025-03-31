import React from 'react'
import { IoFileTrayOutline } from 'react-icons/io5'
import FeaturesLayout from '../../core/Layout/FeaturesLayout'

const Index = () => {
  return (
    <FeaturesLayout title="Packs" description="">
    <div className="md:px-10 px-5">
      <div className="w-full h-[500px] flex flex-col justify-center items-center">
        <IoFileTrayOutline className="text-ternary md:text-[80px] text-[40px] mb-2" />
        <div className="text-secondary text-2xl font-bold opacity-50">
          No Packs Yet!
        </div>
        <article className="text-sm text-secondary opacity-50">
          Packs will be available soon.
        </article>
      </div>
    </div>
  </FeaturesLayout>
  )
}

export default Index
