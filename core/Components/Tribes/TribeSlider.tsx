"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";
import Skeleton from "../../Atoms/Others/Skeleton";

const TribeSlider = ({
  tribes,
  swiperRef,
  setActiveIndex,
  pageDataLoading,
}) => {
  const router = useRouter();
  const slideLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
      setActiveIndex(swiperRef.current.realIndex);
    }
  };

  const slideRight = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      setActiveIndex(swiperRef.current.realIndex);
    }
  };

  return (
    <div className="relative w-full h-[400px]  flex justify-center items-center gap-2">
      <div
        className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 flex justify-center items-center cursor-pointer transition-all duration-300"
        onClick={slideLeft}
      >
        <FaAngleLeft size={18} className="text-white" />
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper h-[400px] w-full"
        loop={true}
      >
        {pageDataLoading
          ? Array(5)
              .fill(0)
              .map((_, idx) => {
                return (
                  <SwiperSlide className="relative h-[400px]">
                    <TribeSlide
                      tribe={_}
                      key={idx}
                      pageDataLoading={pageDataLoading}
                    />
                  </SwiperSlide>
                );
              })
          : tribes?.map((tribe, idx) => {
              return (
                <SwiperSlide className="relative h-[400px]">
                  <TribeSlide
                    tribe={tribe}
                    key={idx}
                    pageDataLoading={pageDataLoading}
                  />
                </SwiperSlide>
              );
            })}
      </Swiper>
      <div
        className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 flex justify-center items-center cursor-pointer transition-all duration-300"
        onClick={slideRight}
      >
        <FaAngleRight size={18} className="text-white" />
      </div>
    </div>
  );
};

const TribeSlide = ({ tribe, pageDataLoading }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  return (
    <div
      className="relative w-full h-full rounded-xl bg-secondary overflow-hidden transition-all duration-300 cursor-pointer bg-black"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* images */}
      <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-ternary">
        {!pageDataLoading && (
          <Image
            src={tribe?.tribeHorizontalBanner}
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
      <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent p-5 flex flex-col justify-end items-start">
        {/* content */}
        <div className="relative w-full flex justify-between items-end">
          {/* left side */}
          <div className="flex flex-col justify-start items-start gap-2">
            <div
              className={`relative w-[80px] h-[80px] border-2 border-white ${
                pageDataLoading ? "border-opacity-20" : "border-opacity-30"
              } rounded-lg p-[2px]`}
              onClick={() => router.push(`/t/${tribe?.tribeId}`)}
            >
              <div className="relative w-full h-full bg-ternary rounded-lg overflow-hidden">
              {!pageDataLoading && ( <Image
                  src={tribe?.tribeLogo}
                  alt="bg"
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover rounded-lg scale-150"
                />)}
              </div>
            </div>
            <div className="flex flex-col justify-center items-start ">
            {pageDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
                  />
                ) : (  <div className="flex  justify-start items-center">
                <article className="text-[20px] font-inter font-semibold">
                  {tribe?.tribeName}
                </article>
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              </div> )}
              {pageDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[250px] h-[18px] rounded-md mb-1`}
                  />
                ) : (  <span className="text-[14px] font-inter">{tribe?.tribeId}</span>)}
            </div>
          </div>
          {/* right side */}
          {pageDataLoading ? (
                  <Skeleton
                    className={`bg-secondary  w-[100px] h-[40px] rounded-md mb-1`}
                  />
                ) : (  <>
          {tribe?.checkIsAlreadyJoin ? (
            <div className="relative">
              <button
                className={`relative flex-1 px-4 py-3 h-full text-xs font-inter font-bold rounded-lg transition-all duration-300 text-white backdrop-blur-lg border border-white border-opacity-40 bg-opacity-10 hover:bg-opacity-20  `}
                onClick={() => router.push(`/t/${tribe?.tribeId}`)}
              >
                Join Now +
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                className={`relative flex-1 px-4 py-3 h-full text-xs font-inter font-bold rounded-lg transition-all duration-300 text-white backdrop-blur-lg border border-white border-opacity-40 bg-primary bg-opacity-10 hover:bg-opacity-20 `}
                onClick={() => router.push(`/t/${tribe?.tribeId}/community`)}
              >
                Go To Community
              </button>
            </div>
          )}
          </>)}
        </div>
      </div>
    </div>
  );
};

export default TribeSlider;
