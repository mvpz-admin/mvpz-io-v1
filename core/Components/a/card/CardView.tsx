import React from 'react'
import FlipCard from '../../../Atoms/Card/FlipCard'
import Image from 'next/image'
import ReactQRCode from "react-qr-code";

const CardView = ({cardDetailsData, closeModel}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-xl' onClick={closeModel}>
       <div onClick={(e) => e.stopPropagation()}>
       <FlipCard
        showBackButton={false}
        frontComp={() => (
          <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-secondary">
            <Image src={cardDetailsData?.card?.nftImage} alt="card" width={500} height={500} className="relative w-full h-full object-cover" />
          </div>
        )}
        backComp={() => (
          <div
            className=" relative w-full h-full rounded-[30px] flex flex-col justify-center items-center "
            style={{
                background: `linear-gradient(to top right, #8A2387, #E94057, #F27121)`,
            }}
          >
            <ReactQRCode
              value={`${process.env.NEXT_PUBLIC_APP_URL}/a/${cardDetailsData?.card?.avatar?.username}`}
              bgColor="transparent"
              fgColor="#fff"
              className="w-[225px] h-[225x]"
            />
            <article className="md:mt-10 mt-5 font-monumentUltraBold text-2xl -rotate-2">
              {cardDetailsData?.card?.athlete?.username}
            </article>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <Image
                src={"/images/logos/logo-transparent.png"}
                alt="mvpz"
                width={500}
                height={500}
                className="relative w-[80px] object-contain"
              />
            </div>
          </div>
        )}
        cardHeight={
         "md:h-[550px] h-[500px]"
        }
        cardWidth="md:w-[350px] w-[300px]"
        />
       </div>
    </div>
  )
}

export default CardView