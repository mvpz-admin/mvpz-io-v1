import React from 'react'
import TBSpot from './Tribe/tBSpot'
import TLines from './Tribe/tLines'
import TTagLine from './Tribe/tTagLine'

const TribeBanner = ({
    primaryColor,
    secondaryColor,
    
}) => {
  return (
    <div className='relative w-full md:h-[600px] h-[250px] z-0' style={{
        background : primaryColor || "#8c52ff"
    }}>
    <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0'>
        <TBSpot />
    </div>
    <div className='absolute bottom-0 left-0 w-full h-full overflow-hidden z-5'>
        <TLines color={secondaryColor} />
    </div>
    <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-10'>
        <TTagLine />
    </div>
    </div>
  )
}

export default TribeBanner