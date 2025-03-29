"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Skeleton from "../../Atoms/Others/Skeleton";
import { useRouter } from "next/router";

const HomeAthlete = ({ athletes, loading }) => {
  const swiperRef = useRef(null);
  const router = useRouter()

  const Card = ({ ath, loading }) => {
    const [isHover, setIsHover] = useState(false);

    return (
      <div
        className="relative w-[250px] h-full rounded-lg bg-secondary overflow-hidden transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() =>
          router.push(`/a/${ath.username}`)
        }
      >
        {/* images */}
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-secondary">
          {!loading && (
            <Image
              src={ath?.verticalImage}
              alt="bg"
              width={500}
              height={500}
              className={`relative w-full h-full object-cover brightness-90 object-top transition-all duration-300 ${
                isHover ? "scale-105" : "scale-100"
              }`}
            />
          )}
        </div>
        {/* layer */}
        <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent p-2 flex flex-col justify-end items-start">
          <div className="flex justify-start items-center gap-2">
            <div
              className={`relative w-[55px] h-[55px] ${
                loading ? "border-0" : "border-2"
              } border-white border-opacity-30 rounded-full p-[2px]`}
            >
              <div className="relative w-full h-full bg-secondary rounded-full">
                {!loading ? (
                  <Image
                    src={ath?.profileImage}
                    alt="bg"
                    width={500}
                    height={500}
                    className="relative w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <Skeleton
                    className={`bg-white bg-opacity-10 w-full h-full rounded-full`}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-start ">
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <span className="text-[10px] font-inter">{ath?.username}</span>
              )}
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="text-sm font-inter font-semibold">
                    {ath?.name}
                  </article>

                  {ath?.isVerified && (
                    <BsFillPatchCheckFill
                      size={12}
                      className="text-indigo-500 ml-1"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const slideLeft = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const slideRight = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="relative w-full h-[375px]  flex justify-center items-center gap-2">
      <div
        className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 md:flex hidden justify-center items-center cursor-pointer transition-all duration-300"
        onClick={slideLeft}
      >
        <FaAngleLeft size={18} className="text-white" />
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={4.5}
        spaceBetween={30}
        centeredSlides={false}
        breakpoints={{
          320: {
            slidesPerView: 1.6, // Small Mobile
            spaceBetween: 1,
            centeredSlides : true
          },
          425: {
            slidesPerView: 1.8, //Large Mobile
            spaceBetween: 1,
            centeredSlides : true
          },
          640: {
            slidesPerView: 2.8, // Tablet
            spaceBetween: 20,
            centeredSlides : false
          },
          1024: {
            slidesPerView: 3.6, // Small Laptop
            spaceBetween: 20,
            centeredSlides : false
          },
          1280: {
            slidesPerView: 5, // Large Screens
            spaceBetween: 20,
            centeredSlides : false
          },
        }}
        className="mySwiper h-[375px]"
        loop={true}
      >
        {
        loading ?
        Array(8)?.fill(0)?.map((ath, idx) => {
          return (
            <SwiperSlide className="relative h-[300px]">
              <Card ath={ath} key={idx} loading={loading} />
            </SwiperSlide>
          );
        }):
        athletes?.map((ath, idx) => {
          return (
            <SwiperSlide className="relative h-[300px]">
              <Card ath={ath} key={idx} loading={loading} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 md:flex hidden justify-center items-center cursor-pointer transition-all duration-300"
        onClick={slideRight}
      >
        <FaAngleRight size={18} className="text-white" />
      </div>
    </div>
  );
};

export default HomeAthlete;
