import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaTiktok } from "react-icons/fa";
import { getIcons } from "../../../utils/getIcons";
import { useRouter } from "next/router";

const AthleteProfileInfo = ({ open, handleCloseInfoModel, ath, images , editable = true}) => {
  useEffect(() => {
    const lockScroll = () => {
      window.document.body.style.overflow = "hidden";
      window.document.documentElement.style.overflow = "hidden"; // For Safari
    };

    const unlockScroll = () => {
      window.document.body.style.overflow = "auto";
      window.document.documentElement.style.overflow = "auto"; // For Safari
    };

    if (open) lockScroll();
    if (!open) unlockScroll();

    return () => unlockScroll();
  }, [open]);

  function closeHandleBtn() {
    window.document.body.style.overflowY = "auto";
    handleCloseInfoModel();
  }

  let iamges = [images?.profileImage];

  const Slider = () => {
    return (
      <div className="w-full md:min-h-[540px] min-h-[300px]  bg-ternary">
        {iamges?.length > 0 && (
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper w-full md:min-h-[540px] min-h-[300px]"
          >
            {iamges.map((assest, id) => {
              return (
                <>
                  <SwiperSlide
                    key={id + assest}
                    className="relative w-full h-full"
                  >
                    {assest && (
                      <Image
                        src={assest}
                        alt="asset image"
                        width={500}
                        height={500}
                        className="relative w-full  object-contain brightness-90 "
                      />
                    )}
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>
        )}
      </div>
    );
  };

  const InfoLayout = () => {
    return (
      <div className="w-full">
        <div className="lg:hidden md:hidden md:p-10 p-5 space-y-6 ">
          <div className="w-full  flex-col justify-start items-start space-y-1">
            <article className="text-2xl opacity-90">{ath?.user?.name}</article>
          </div>
          <div className="w-full h-[0.5px] bg-white bg-opacity-[0.4]"></div>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col-reverse md:gap-2 gap-4 p-10">
          <div className="flex-[0.3] w-full h-full flex-col justify-start items-start space-y-6 pr-5">
            <div className="w-full  flex-col justify-start items-start space-y-1 lg:flex hidden">
              <article className="text-2xl opacity-90">
                {ath?.user?.name}
              </article>
            </div>
            <div className="w-full h-[0.5px] bg-white bg-opacity-[0.4]"></div>
            <div className="w-full flex flex-col justify-start items-start space-y-1">
              <article className="">School</article>
              <article className="text-[10px] opacity-80">
                {ath?.user?.currentSchool}
              </article>
            </div>
            <div className="w-full flex flex-col justify-start items-start space-y-1">
              <article>Sport</article>
              <article className="text-[10px] opacity-80">
                {ath?.user?.primarySport}
              </article>
            </div>
            <div className="w-full flex flex-col justify-start items-start space-y-1">
              <article>Position</article>
              <article className="text-[10px] opacity-80">
                {ath?.user?.primaryPosition}
              </article>
            </div>
            {ath?.user?.year && (
              <div className="w-full flex flex-col justify-start items-start space-y-1">
                <article>Year</article>
                <article className="text-[10px] opacity-80">
                  {ath?.user?.year}
                </article>
              </div>
            )}
            {ath?.user?.homeTown && (
              <div className="w-full flex flex-col justify-start items-start space-y-1">
                <article>Hometown</article>
                <article className="text-[10px] opacity-80">
                  {ath?.user?.homeTown}
                </article>
              </div>
            )}
            {ath?.user?.height && (
              <div className="w-full flex flex-col justify-start items-start space-y-1">
                <article>Height</article>
                <article className="text-[10px] opacity-80">
                  {ath?.user?.height}
                </article>
              </div>
            )}
            {ath?.user?.weight && (
              <div className="w-full flex flex-col justify-start items-start space-y-1">
                <article>Weight</article>
                <article className="text-[10px] opacity-80">
                  {ath?.user?.weight}
                </article>
              </div>
            )}
            <div className="flex flex-wrap justify-start items-center gap-5">
              {ath?.user?.socialLinks?.map((link) => {
                return (
                  <a href={link?.link} target="_blank">
                    {getIcons(link?.socialBrand)}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="w-[0.5px]  bg-white bg-opacity-[0.5]"></div>
          <div className="flex-[0.7] w-full h-full flex flex-col justify-start items-start space-y-6 lg:pl-5">
            <article className="text-xl">About</article>
            <div className="w-full">
              <article className="text-xs opacity-80">
                {ath?.user?.aboutMe}
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-md overflow-hidden z-50">
      <div className="relative w-[90vw] sm:w-[80vw] md:w-[80vw] lg:w-[60vw] xl:w-[50vw] h-[80vh] bg-secondary ">
       {editable && <div
          className="absolute top-5 left-5 text-white cursor-pointer z-10"
          onClick={() => router.push("/profile")}
        >
          Edit
        </div>}
        <IoIosCloseCircle
          onClick={closeHandleBtn}
          size={30}
          className="absolute top-5 right-5 z-10 cursor-pointer"
        />
        <div className="relative w-full h-full overflow-y-auto z-0">
          {/* slider */}
          <Slider />
          <InfoLayout />
        </div>
      </div>
    </div>
  );
};

export default AthleteProfileInfo;
