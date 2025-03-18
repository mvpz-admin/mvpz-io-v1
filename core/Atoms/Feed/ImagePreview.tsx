import NxtImage from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import VideoPlayer from "../Media/VideoPlayer";

const ImagePreview: React.FC<{
  media: any;
  mediaCon: any;
  handleClose: () => void;
}> = ({ media, mediaCon, handleClose }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const MediaImageCard: React.FC<{ url: string }> = ({ url }) => {
    return (
      <NxtImage
        src={url}
        alt="Post 01"
        width={500}
        height={500}
        className={`relative 
        object-contain h-full w-auto mx-auto 
            z-0`}
      />
    );
  };

  const MediaVideoCard: React.FC<{
    url: string;
  }> = ({ url }) => {
    return (
        <VideoPlayer url={url}/>
      )
    
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center md:p-20 !select-none">
      <div
        className=" absolute top-5 right-5 flex justify-center items-center w-[50px] h-[50px] rounded-full cursor-pointer z-10"
        onClick={handleClose}
      >
        <IoIosClose size={40} />
      </div>
      <div className=" absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center ">
        <span className="font-mono text-xs">
          {slideIndex + 1}/{mediaCon.length}
        </span>
      </div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        onSlideChange={(slide) => setSlideIndex(slide.activeIndex)}
        className="mySwiper w-full md:h-full h-[50vh] my-auto flex justify-center items-center"
        initialSlide={media?.slideNo}
      >
        {mediaCon.map((assest, id) => {
          return (
            <>
              <SwiperSlide
                key={id + assest.id}
                className="relative w-full  h-full flex justify-center items-center"
              >
                <div className="w-full h-full max-w-[90%] mx-auto  flex justify-center items-center">
                  {assest.mediaType === "image" ? (
                    <MediaImageCard url={assest.url} />
                  ) : (
                    <MediaVideoCard url={assest.url} />
                  )}
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImagePreview;
