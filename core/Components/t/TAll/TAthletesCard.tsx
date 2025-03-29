"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { Skeleton } from "@mantine/core";

const TAthletesCard = ({ athletes, loading }) => {
  const swiperRef = useRef(null);



  const slideLeft = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const slideRight = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div
      className={`relative w-full h-[375px]  flex flex-wrap justify-start items-center gap-2 ${
        athletes?.length < 5 && "md:px-10 px-5"
      }`}
    >
      {loading
        ? Array(8)
            ?.fill(0)
            ?.map((ath, idx) => {
              return <Card ath={ath} key={idx} loading={loading} />;
            })
        : athletes?.map((ath, idx) => {
            return <Card ath={ath} key={idx} loading={loading} />;
          })}
    </div>
  );
};

const Card = ({ ath, loading }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  return (
    <div
      className="relative w-[280px]  h-[375px] rounded-lg bg-secondary overflow-hidden transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => router.push(`/a/${ath.username}`)}
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


export default TAthletesCard;
