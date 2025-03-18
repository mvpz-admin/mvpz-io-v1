"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperClass from "swiper";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MinorCard from "./MinorCard";

const EnhancementModal = ({ openStories, setOpenStories, enhacemnets }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    if (openStories) {
      setCurrentSlide(0);
    }
  }, [openStories]);

  const handleNextSlide = () => {
    if (currentSlide <= enhacemnets?.length - 1) {
      goToSlide(currentSlide + 1);
    }
  };

  const handlePriveSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md">
      {/* close button */}
      <div
        className="absolute top-10 right-10 cursor-pointer"
        onClick={() => setOpenStories(false)}
      >
        <IoMdClose className="text-white" size={20} />
      </div>

      {/* conntent */}
      <div className="w-full h-full flex justify-center items-center md:p-20 p-5">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1} // Default for mobile
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 }, // Tablets
            1024: { slidesPerView: 3, spaceBetween: 10 }, // Desktops
          }}
          centeredSlides={enhacemnets?.length == 1}
          spaceBetween={20}
          mousewheel={false}
          draggable={false}
          allowTouchMove={false}
          className="mySwiper w-full "
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        >
          {enhacemnets?.map((collection, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className="relative md:w-[375px] w-full h-[500px] bg-secondary rounded-xl overflow-hidden">
                  <div className="w-full h-full relative">
                    {collection?.type == "minor" ? (
                      <MinorCard
                        badgeIcon={collection?.badgeIcon}
                        baseImage={collection?.baseImage}
                      />
                    ) : (
                      <Image
                        src={collection?.cardNFTImage}
                        alt={collection?.name}
                        width={500}
                        height={500}
                        className="relative w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-[#111] to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-5 flex-col justify-center items-center gap-2 z-10">
                      <article className="text-[8px] text-white opacity-90 text-center">
                        {collection?.enhType}
                      </article>
                      <article className="text-center text-xl font-monumentUltraBold">
                        {collection?.title}
                      </article>
                      <article className="text-center text-[10px]  text-white opacity-50 ">
                        {collection?.description}
                      </article>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* controller */}

      <div
        className="absolute top-1/2 -translate-y-1/2 left-10 z-50"
        onClick={handlePriveSlide}
      >
        <FaChevronLeft />
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 right-10 z-50"
        onClick={handleNextSlide}
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

export default EnhancementModal;
