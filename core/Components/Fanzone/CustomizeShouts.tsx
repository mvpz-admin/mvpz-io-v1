"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// swiper css
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import Skeleton from "../../Atoms/Others/Skeleton";
import { extractPostDetails } from "../../../utils/global/global";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";

const ShoutsHightlightSection = ({ shout, loading }) => {
  let { hasMore, postTitle } =
    !loading && extractPostDetails({ message: shout?.message });
      let router = useRouter();
  return (
    <div
      title={shout?.title}
      className="relative !flex md:flex-row flex-col justify-start items-center md:gap-4 font-inter  md:w-[300px] w-[275px] md:h-[175px] h-[150px] rounded-lg  z-0"
      onClick={() => router.push(`/fanzone/p/shoutpost/${shout.id}`)}
    >
      {/* Bg Image */}
      <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden bg-secondary">
        {!loading && (
          <Image
            src={shout?.thumbnail}
            alt={shout?.title}
            width={500}
            height={500}
            className="reltaive w-full h-full object-cover brightness-90"
          />
        ) }
      </div>
      {/* Content */}
      <div className={`absolute top-0 left-0 w-full h-full rounded-lg ${loading ? "bg-secondray" : "bg-gradient-to-t"} from-[rgba(0,0,0,0.8)] via-transparent to-[rgba(0,0,0,0.5)] p-2 flex flex-col`}>
        <div className="flex justify-start items-center gap-2">
          {/* images */}
          <div
            className={`relative w-[55px] h-[55px] ${
              loading ? "border-0" : "border-2"
            } border-white border-opacity-30 rounded-full p-[2px]`}
          >
            {!loading ? (
              <Image
                src={shout?.postedBy?.profileImage}
                alt={shout?.title}
                width={500}
                height={500}
                className="reltaive w-full h-full object-cover rounded-full"
              />
            ) : (
              <Skeleton className={`bg-ternary w-full h-full rounded-full`} />
            )}
          </div>
          <div className="flex flex-col justify-center items-start ">
            <div className="flex  justify-start items-center">
              <article className="text-[12px] font-inter">
                {shout?.postedBy?.username}
              </article>
            </div>
            <div className="flex justify-start items-center">
              <span className="text-xs font-inter font-semibold">
                {shout?.postedBy?.name}
              </span>{" "}
              {shout?.postedBy?.isVerified && (
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              )}
            </div>
          </div>
        </div>

        {/* spacer */}
        <div className="w-full h-full flex-1"></div>

        {/* context  */}
        <div className="block ">
          {loading ? (
            <Skeleton
              className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <article className="cursor-pointer text-[.82em] font-[600] text-white hover:underline hover:ease-linear hover:duration-300">
              {postTitle}
            </article>
          )}
          {loading ? (
            <Skeleton
              className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <span className="text-[10px] font-[500] uppercase text-secondary">
              {shout?.upload_on}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const CustomizeShouts = ({ loading, data }) => {
  return (
    <div className="relative w-full  ">
      <Swiper
        slidesPerView={3.3}
        spaceBetween={10}
        speed={500}
        breakpoints={{
          320: {
            slidesPerView: 1.1, // Small Mobile
            spaceBetween: 1,
            centeredSlides: true,
          },
          425: {
            slidesPerView: 1.2, //Large Mobile
            spaceBetween: 1,
            centeredSlides: true,
          },
          640: {
            slidesPerView: 1.8, // Tablet
            spaceBetween: 20,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 2.5, // Small Laptop
            spaceBetween: 20,
            centeredSlides: false,
          },
          1280: {
            slidesPerView: 3.5, // Large Screens
            spaceBetween: 20,
            centeredSlides: false,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {loading
          ? Array(8)
              ?.fill(0)
              ?.map((_) => {
                return (
                  <SwiperSlide>
                    <ShoutsHightlightSection shout={_} loading={loading} />
                  </SwiperSlide>
                );
              })
          : data?.map((shout) => {
              return (
                <SwiperSlide>
                  <ShoutsHightlightSection shout={shout} loading={loading} />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
};

export default CustomizeShouts;
