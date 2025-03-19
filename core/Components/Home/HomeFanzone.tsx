import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import Skeleton from "../../Atoms/Others/Skeleton";
import { formatNumber } from "../../../utils/global/formating";
import { extractPostDetails } from "../../../utils/global/global";
import { useRouter } from "next/router";
import { useAuthStore } from "../../../store/useAuthStore";
import { useLoginProcessStore } from "../../../store/useGlobalStore";
import { callAPI } from "../../../lib/utils";
import { Loader } from "@mantine/core";

const TeamStripe = ({ team, loading }) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.user)?.token;
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const [joiningLoading, setJoiningLoading] = useState(false);
  const [isJoined,setIsJoined] = useState(false)
  const handleToggleJoin = async () => {
    if (isLoggedIn) {
      setJoiningLoading(true);
      try {
        let response = await callAPI({
          endpoint: `/v1/profiles/tribe/${team?.tribeId}/join`,
          method: "PUT",
        });

        setIsJoined(response?.data?.isMember);
      } catch (error) {
        console.log({ error });
      }
      setJoiningLoading(false);
    } else {
      setOpenLoginModel();
    }
  };

  useEffect(() => {
    if(team){
      setIsJoined(team?.isMember)
    }
  },[team])

  return (
    <div
      className={`relative p-2 bg-white bg-opacity-5 ${
        !loading ? "hover:bg-opacity-10" : "hover:bg-opacity-5"
      } transition-all duration-300 cursor-pointer  rounded-lg flex justify-between items-center gap-2`}
      onClick={() => router.push(`/t/${team?.tribeId}`)}
    >
      <div className="flex justify-start items-center gap-2">
        <div
          className={`relative w-[55px] h-[55px] ${
            loading ? "border-0" : "border-2"
          } border-white border-opacity-30 rounded-full p-[2px]`}
        >
          <div className="relative w-full h-full bg-secondary rounded-full overflow-hidden">
            {!loading ? (
              <Image
                src={team?.tribeLogo}
                alt="bg"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full scale-150"
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
              className={`bg-white bg-opacity-5 w-[100px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <div className="flex  justify-start items-center">
              <article className="text-sm font-inter font-semibold flex items-center">
                {team?.tribeShortName}
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              </article>
            </div>
          )}

          {loading ? (
            <Skeleton
              className={`bg-white bg-opacity-5 w-[150px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <span className="text-[10px] font-inter">
              {team?._count?.members} Members
            </span>
          )}
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        {!loading && (
          <div
            className="px-3 py-2 border border-white border-opacity-10 bg-primary bg-opacity-5 text-[10px] font-inter font-semibold cursor-pointer rounded-lg h-[30px] w-[70px] flex justify-center items-center"
            onClick={handleToggleJoin}
          >
            {joiningLoading ? <Loader variant="dots" color="white" size={18}/> :  isJoined ? <>Joined </> : <>+ Join</>}
          </div>
        )}
      </div>
    </div>
  );
};

const Shouts = ({ shouts, loading }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const slideLeft = () => {
    if (swiperRef.current && !loading) swiperRef.current.slidePrev();
  };

  const slideRight = () => {
    if (swiperRef.current && !loading) swiperRef.current.slideNext();
  };

  useEffect(() => {
    let intervarl = setInterval(() => {
      if (swiperRef.current) swiperRef.current.slideNext();
    }, 4000);

    return () => {
      clearInterval(intervarl);
    };
  }, []);

  const handleSetSlide = (idx) => {
    if (swiperRef.current) swiperRef.current.slideTo(idx);
  };

  return (
    <div className="relative w-full  md:h-[500px] h-[400px] rounded-lg overflow-hidden select-none">
      {/* media */}
      <div className="absolute top-0 left-0 w-full  md:h-[500px] h-[400px]">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop={!loading}
          className="mySwiper w-full h-full"
          mousewheel={false}
          keyboard={{ enabled: false }}
          draggable={false}
          allowTouchMove={false}
          simulateTouch={false}
        >
          {shouts?.map((shout, idx) => {
            let { hasMore, postTitle } =
              !loading && extractPostDetails({ message: shout?.message });
            return (
              <SwiperSlide
                className="relative w-full  md:h-[500px] h-[400px] rounded-lg"
                key={idx}
              >
                <div className="absolute top-0 left-0 w-full h-full z-0 bg-secondary">
                  {!loading && shout?.thumbnail && (
                    <Image
                      src={shout?.thumbnail}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover z-0"
                    />
                  )}
                </div>
                <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent flex p-5">
                  <div className="relative md:flex-[0.7] flex-1 flex flex-col w-full h-full">
                    <div className="relative flex-1 w-full h-full" />
                    {/* bottom slide */}
                    <div className="flex flex-col space-y-2">
                      <div
                        className="flex justify-start items-center gap-2"
                        onClick={() =>
                          router.push(`/a/${shout?.postedBy?.username}`)
                        }
                      >
                        <div
                          className={`relative w-[55px] h-[55px] ${
                            loading ? "border-0" : "border-2"
                          } border-white border-opacity-30 rounded-full p-[2px]`}
                        >
                          <div className="relative w-full h-full bg-secondary rounded-full">
                            {!loading ? (
                              <Image
                                src={shout?.postedBy?.profileImage}
                                alt="bg"
                                width={500}
                                height={500}
                                className="relative w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <Skeleton
                                className={`bg-ternary w-full h-full rounded-full`}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                          {loading ? (
                            <Skeleton
                              className={`bg-ternary w-[100px] h-[18px] rounded-md mb-1`}
                            />
                          ) : (
                            <span className="text-[10px] font-inter">
                              {shout?.postedBy?.username}
                            </span>
                          )}
                          {loading ? (
                            <Skeleton
                              className={`bg-ternary  w-[150px] h-[18px] rounded-md`}
                            />
                          ) : (
                            <div className="flex justify-start items-center">
                              <article className="text-sm font-inter font-semibold">
                                {shout?.postedBy?.name}
                              </article>
                              {shout?.postedBy?.isVerified && (
                                <BsFillPatchCheckFill
                                  size={12}
                                  className="text-indigo-500 ml-1"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {loading ? (
                        <div className="relative w-full">
                          <Skeleton
                            className={`bg-ternary  md:w-full h-[18px] rounded-md mb-1`}
                          />
                          <Skeleton
                            className={`bg-ternary  md:w-[50%] h-[18px] rounded-md`}
                          />
                        </div>
                      ) : (
                        <article
                          className="font-inter text-3xl font-semibold"
                          onClick={() =>
                            router.push(`/fanzone/p/shoutpost/${shout?.id}`)
                          }
                        >
                          {postTitle}

                          {hasMore && (
                            <span className="ml-2 text-[10px] font-normal cursor-pointer text-primary">
                              Read More
                            </span>
                          )}
                        </article>
                      )}
                      {shout?._count?.comments > 0 && (
                        <div className="flex justify-start items-center space-x-3">
                          <div className="flex justify-start items-center gap-1">
                            <IoChatbubbleOutline />
                            <span className="font-inter text-[12px]">
                              {formatNumber(shout?._count?.comments)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* Navigation */}
      <div className="absolute top-5 left-5 flex justify-start items-center space-x-2 z-10">
        <div
          className="relative w-10 h-10 bg-white bg-opacity-10 border border-white border-opacity-20 hover:border-opacity-30 flex justify-center items-center rounded-lg cursor-pointer transition-all duration-300"
          onClick={slideLeft}
        >
          <FaChevronLeft className="text-white" />
        </div>
        <div
          className="relative w-10 h-10 bg-white bg-opacity-10 border border-white border-opacity-20 hover:border-opacity-30 flex justify-center items-center rounded-lg cursor-pointer transition-all duration-300"
          onClick={slideRight}
        >
          <FaChevronRight className="text-white" />
        </div>
      </div>
      {/* Swiper */}
      <div className="md:block hidden absolute top-0 right-0 h-full w-auto p-5 border-l border-white border-opacity-10 z-20 backdrop-blur-lg">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          className="mySwiper h-full"
          direction="vertical"
        >
          {shouts?.map((shout, idx) => {
            return (
              <SwiperSlide
                className="relative h-full cursor-pointer"
                key={idx}
                onClick={() => handleSetSlide(idx)}
              >
                <div
                  className={`relative w-[80px] h-[80px] ${
                    !loading ? "border-2" : "border-none"
                  } transition-all duration-300 border-white ${
                    activeIndex === idx
                      ? "border-opacity-100"
                      : "border-opacity-30"
                  } rounded-full p-[2px]`}
                >
                  <div className="relative w-full h-full bg-secondary rounded-full z-0">
                    {!loading ? (
                      <Image
                        src={shout?.postedBy?.profileImage}
                        alt="bg"
                        width={500}
                        height={500}
                        className={`relative w-full h-full object-cover rounded-full z-0 ${
                          shout?.media?.mediaType == "video"
                            ? "brightness-75"
                            : "brightness-100"
                        }`}
                      />
                    ) : (
                      <Skeleton
                        className={`bg-ternary w-full h-full rounded-full`}
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

const HomeFanzone = ({ fanzone, loading }) => {
  let shouts = fanzone?.shouts || Array(5).fill(0);
  let tribes = fanzone?.tribes || Array(5).fill(0);
  const router = useRouter();
  return (
    <div className="w-full flex md:flex-row flex-col  justify-center items-center md:gap-10 gap-5 md:h-[500px] h-auto">
      {/* Posts */}
      <div className="md:flex-[0.75] flex-1 md:h-[500px] h-[400px] w-full  rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-5">
        <Shouts shouts={shouts} loading={loading} />
      </div>
      {/* Teams */}
      <div className="md:flex-[0.25] flex-1 md:h-[500px] h-[400px] flex flex-col w-full  rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-5 space-y-4 p-5">
        {/* title */}
        <div className="relative w-full flex justify-between items-center">
          <article className="font-inter font-semibold ">Join Teams</article>

          <div
            className="px-3 py-2 border border-white border-opacity-10 bg-white bg-opacity-5 hover:bg-opacity-20 text-[10px] font-inter font-semibold cursor-pointer rounded-lg transition-all duration-300"
            onClick={() => router.push(`/tribes`)}
          >
            See More
          </div>
        </div>
        <div className="flex-1 w-full h-full overflow-y-auto scroller-hidden space-y-2 ">
          {tribes?.map((team, idx) => {
            return <TeamStripe team={team} loading={loading} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeFanzone;
