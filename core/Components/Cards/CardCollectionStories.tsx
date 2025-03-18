"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperClass from "swiper";
import Image from "next/image";

const SLIDE_DURATION = 4000; // 4 seconds

const NestedCardCollectionStores = ({ collection, nextStories }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    if (collection) {
      setCurrentSlide(0);
      setProgress(0);
    }
  }, [collection]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((prevSlide) => {
            const isLastSlide = prevSlide + 1 >= collection?.cards.length;
            if (isLastSlide) {
              nextStories(); // Ensure this function moves to the next story
              return prevSlide; // Prevents exceeding array bounds
            }
            const nextSlide = prevSlide + 1;
            goToSlide(nextSlide);
            return nextSlide;
          });
          return 0; // Reset progress when changing slides
        }
        return prev + 100 / (SLIDE_DURATION / 100);
      });
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [currentSlide, collection, nextStories]); // Ensure `nextStories` is a dependency

  return (
    <div className="w-full h-full relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        centeredSlides={true}
        mousewheel={false}
        draggable={false}
        allowTouchMove={false}
        className="mySwiper w-full h-full"
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
      >
        {collection?.cards?.map((card, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-full relative">
              <Image
                src={card?.image}
                alt={card?.title}
                width={500}
                height={500}
                className="relative w-full h-full object-cover z-0"
              />
              <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#111] to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-5 flex-col justify-start items-center gap-2 z-10">
                <article className="text-center text-xs font-monumentUltraBold">
                  {card?.title}
                </article>
                <article className="text-center text-[10px] opacity-50">
                  {card?.description}
                </article>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-[#111] to-transparent" />
      <div className="absolute top-0 left-0 w-full p-5 z-10">
        <div className="w-full h-full flex justify-start items-center gap-2 mb-2">
          {collection?.cards?.map((_, index) => (
            <div
              key={index}
              className="flex-1 w-full h-1 bg-white bg-opacity-20 rounded-full relative overflow-hidden"
            >
              {currentSlide > index ? (
                <div className="absolute top-0 left-0 w-full h-full bg-white transition-all duration-300" />
              ) : currentSlide === index ? (
                <div
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-ternary border border-white border-opacity-20">
            <Image
              src={collection?.thumbnail}
              alt={collection?.title}
              width={500}
              height={500}
              className="relative w-full h-full object-cover z-0"
            />
          </div>
          <div className="flex-1 flex flex-col justify-start items-start w-full">
            <article className=" text-xs font-monumentUltraBold">
              {collection?.title}
            </article>
            <article className="text-[10px] font-inter font-semibold opacity-50">
              {collection?.subtitle}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardCollectionStories = ({
  openStories,
  setOpenStories,
  collections,
}) => {
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
    setCurrentSlide((prevSlide) => {
      const nextSlide =
        prevSlide + 1 < collections.length ? prevSlide + 1 : prevSlide;

      goToSlide(nextSlide);
      return nextSlide;
    });
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
      <div className="w-full h-full flex justify-center items-center md:p-10 p-5">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1} // Default for mobile
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 }, // Tablets
            1024: { slidesPerView: 3, spaceBetween: 30 }, // Desktops
          }}
          spaceBetween={20}
          centeredSlides={true}
          mousewheel={false}
          draggable={false}
          allowTouchMove={false}
          className="mySwiper w-full "
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        >
          {collections?.map((collection, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className="relative md:w-[375px] w-full h-[500px] bg-secondary rounded-xl overflow-hidden">
                  {idx == currentSlide ? (
                    <div className="w-full h-full relative">
                      <NestedCardCollectionStores
                        collection={collection}
                        nextStories={handleNextSlide}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <Image
                        src={collection?.thumbnail}
                        alt={collection?.title}
                        width={500}
                        height={500}
                        className="relative w-full h-full object-cover z-0"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#111] to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full p-5 flex-col justify-start items-center gap-2 z-10">
                        <article className="text-center text-xl font-monumentUltraBold">
                          {collection?.title}
                        </article>
                        <article className="text-center text-xs font-graffiti text-primary">
                          {collection?.subtitle}
                        </article>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CardCollectionStories;
