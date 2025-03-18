import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import TribeCard from "../../Atoms/TribeCard/TribeCard";
import TribeAddCard from "../../Atoms/TribeCard/TribeAddCard";
import { callAPI } from "../../../lib/utils";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import TribeLoadingCard from "../../Atoms/LoadingsLayout/TribeLoadingCard";

const TribeSectionHeader = () => {
const router = useRouter()

  return (
    <div className="flex justify-between items-center">
      <article className="md:text-xl text-sm font-bold">Your Tribe</article>
      <article className="md:text-xl text-lg font-bold cursor-pointer hover:text-primary" onClick={() => router.push("/fanzone/tribe/search")}>
        +
      </article>
    </div>
  );
};

const TribeLoadingSectionSwiper = () => {
  return (
    <Swiper
      slidesPerView={3.5}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        // Adjust for iPhone
        320: {
          slidesPerView: 1.9,
          spaceBetween: 5,
        },
        // Adjust for small tablets like iPad Mini
        768: {
          slidesPerView: 2.8,
          spaceBetween: 5,
        },
        // Adjust for iPad Pro
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 10,
        },
        1440: {
          slidesPerView: 3.4,
          spaceBetween: 10,
        },
        // Adjust for larger screens
        1500: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
      }}
      className="relative mySwiper w-full overflow-hidden"
    >


      {Array(5)?.fill(0)?.map((_,idx) => {
        return (
          <SwiperSlide className="relative py-2" key={idx}>
            <div className="md:w-[200px] w-[175px] md:h-[250px] h-[225px]">
            <TribeLoadingCard />
            </div>
            
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const TribeSectionSwiper = ({tribes}) => {
  return (
    <Swiper
      slidesPerView={3.5}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        // Adjust for iPhone
        320: {
          slidesPerView: 1.9,
          spaceBetween: 5,
        },
        // Adjust for small tablets like iPad Mini
        768: {
          slidesPerView: 2.8,
          spaceBetween: 5,
        },
        // Adjust for iPad Pro
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 10,
        },
        1440: {
          slidesPerView: 3.4,
          spaceBetween: 10,
        },
        // Adjust for larger screens
        1500: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
      }}
      className="relative mySwiper w-full overflow-hidden"
    >
      {tribes?.length === 0 && <SwiperSlide className="relative py-2 md:w-[200px] w-[175px] md:h-[250px] h-[225px]">
        <TribeAddCard />
      </SwiperSlide>}

      {tribes?.map((tribe, index) => {
        return (
          <SwiperSlide className="relative py-2" key={tribe?.name}>
            <div className="md:w-[200px] w-[175px] md:h-[250px] h-[225px]">
            <TribeCard
             tribe={tribe}
             imageDownload={{}}
             isMember={true}
            />
            </div>
            
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const GlobalAddTribe = () => {

  const [tribes,setTribes] = useState<any>([])
  const {data : session} = useSession()
  const [loading,setLoading] = useState(true)
  

  const handleGetTribeList = async () => {
    setLoading(true)
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/tribes`,
    })

    if(response){
      setTribes(response)
    }
    setLoading(false)
  } 

  useEffect(() => {
    if(session?.user){
      handleGetTribeList()
    }
   
  },[session])
  return (
    <div className="relative w-full gap-10 overflow-hidden space-y-5">
      <TribeSectionHeader  />
      {
        loading ? <TribeLoadingSectionSwiper /> : <TribeSectionSwiper tribes={tribes}/> 
      }
      
    </div>
  );
};

export default GlobalAddTribe;
