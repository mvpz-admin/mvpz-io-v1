import React from 'react'
import TBSpot from './Tribe/tBSpot'
import TLines from './Tribe/tLines'
import TTagLine from './Tribe/tTagLine'
import CBSpot from './Community/cBSpot'
import CLine from './Community/cLine'
import CTagLine from './Community/cTagLine'

const CommunityBanner = ({
    primaryColor,
    secondaryColor,
    
}) => {
  return (
    <div className='relative w-full h-full z-0' style={{
        background : `linear-gradient(to top left,${primaryColor},${secondaryColor})`
    }}>
 <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0 '>
        <CBSpot />
    </div>
{/* <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-5'>
        <CLine color={secondaryColor} />
    </div> */}
    <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-10'>
        <CTagLine />
    </div> 
    </div>
  )
}

export default CommunityBanner