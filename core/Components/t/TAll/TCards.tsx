"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/router";
import { Skeleton } from "@mantine/core";

const Card = ({ card, loading }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative w-[280px]  h-full rounded-lg bg-secondary overflow-hidden transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() =>
        router.push(`/a/${card?.nftEntity?.athlete?.username}/card/${card?.id}`)
      }
    >
      {/* images */}
      <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-ternary">
        {!loading && (
          <Image
            src={card?.cardNFTImage}
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
        {/* content */}
        <div className="flex justify-start items-center gap-2">
          <div
            className={`relative w-[55px] h-[55px] ${
              loading ? "border-0" : "border-2"
            } border-white border-opacity-30 rounded-full p-[2px]`}
          >
            <div className="relative w-full h-full bg-secondary rounded-full">
              {!loading ? (
                <Image
                  src={card?.nftEntity?.athlete?.profileImage}
                  alt="bg"
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover rounded-full"
                />
              ) : (
                <Skeleton className={`bg-ternary w-full h-full rounded-full`} />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-start ">
            {loading ? (
              <Skeleton
                className={`bg-ternary w-[100px] h-[18px] rounded-md mb-1`}
              />
            ) : (
              <span className="text-[10px] font-inter">
                {card?.nftEntity?.athlete?.username}
              </span>
            )}
            {loading ? (
              <Skeleton
                className={`bg-ternary  w-[150px] h-[18px] rounded-md`}
              />
            ) : (
              <div className="flex  justify-start items-center">
                <article className="text-sm font-inter font-semibold">
                  {card?.nftEntity?.athlete?.name}
                </article>
                {card?.nftEntity?.athlete?.isVerified && (
                  <BsFillPatchCheckFill
                    size={12}
                    className="text-indigo-500 ml-1"
                  />
                )}
              </div>
            )}
          </div>
        </div>
        {/* cart */}
        <div className="absolute top-4 left-4 flex justify-start items-center gap-2">
          {loading ? (
            <Skeleton
              className={`bg-white bg-opacity-10 w-[100px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <>
              <FaShoppingCart size={20} />
              <span className="font-inter text-xs font-bold">
                ${card?.price}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const TCards = ({ cards, loading }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div
      className={`relative w-full h-[375px]  flex justify-center items-center gap-2 ${
        cards?.length < 5 && "md:px-10 px-5"
      }`}
    >
      {cards?.length > 5 && (
        <div
          className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 md:flex hidden justify-center items-center cursor-pointer transition-all duration-300"
          onClick={slideLeft}
        >
          <FaAngleLeft size={18} className="text-white" />
        </div>
      )}
      <div className="relative w-full">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={4.5}
          spaceBetween={30}
          centeredSlides={false}
          breakpoints={{
            320: {
              slidesPerView: 1.3, // Small Mobile
              spaceBetween: 1,
              centeredSlides: true,
            },
            425: {
              slidesPerView: 1.4, //Large Mobile
              spaceBetween: 1,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2.4, // Tablet
              spaceBetween: 20,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3.3, // Small Laptop
              spaceBetween: 20,
              centeredSlides: false,
            },
            1280: {
              slidesPerView: 4.5, // Large Screens
              spaceBetween: 20,
              centeredSlides: false,
            },
          }}
          className="mySwiper h-[375px]"
          loop={true}
        >
          {loading
            ? Array(8)
                ?.fill(0)
                ?.map((_, idx) => {
                  return (
                    <SwiperSlide className="relative h-[375px]">
                      <Card card={_} loading={loading} key={idx} />
                    </SwiperSlide>
                  );
                })
            : cards?.map((card, idx) => {
                return (
                  <SwiperSlide className="relative h-[375px]">
                    <Card card={card} loading={loading} key={idx} />
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </div>
      {cards?.length > 5 && (
        <div
          className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 md:flex hidden justify-center items-center cursor-pointer transition-all duration-300"
          onClick={slideRight}
        >
          <FaAngleRight size={18} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default TCards;
