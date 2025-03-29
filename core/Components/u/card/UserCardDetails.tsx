"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaInstagram,
  FaShare,
  FaHistory,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoClose, IoEllipsisVertical, IoIdCard } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { GiCardPlay } from "react-icons/gi";
import {
  MdCardMembership,
  MdContentCopy,
  MdOutlineDateRange,
} from "react-icons/md";
import { SiVorondesign } from "react-icons/si";
import { RiUser5Fill } from "react-icons/ri";
import { callAPI } from "../../../../lib/utils";
import { useRouter } from "next/router";
import Skeleton from "../../../Atoms/Others/Skeleton";
import { useIsDesktop } from "../../../../hooks/useIsDesktop";
import { useCardDetailsStore } from "../../../../store/useAthCollectionStore";
import { useBuyStore, useCartStore } from "../../../../store/useGlobalStore";
import { AnimatePresence, motion } from "framer-motion";

const CardHistoryModal = ({ isOpen, onClose, cardHistory = [] }) => {
  const [view, setView] = useState<"history" | "gallery">("history");

  // Get the final card (last item in history) or use first item as fallback
  const finalCard = cardHistory?.length
    ? cardHistory[cardHistory.length - 1]
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-[1000px] max-h-[85vh] bg-white bg-opacity-5 backdrop-blur-xl rounded-3xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="p-6 pb-0">
              <h2 className="text-3xl font-bold text-white text-center mb-4">
                Card Minting History
              </h2>
              <div className="flex justify-center gap-6 text-sm border-b border-white/10 pb-3">
                <button
                  onClick={() => setView("history")}
                  className={`px-4 py-2 transition-colors relative ${
                    view === "history" ? "text-white" : "text-gray-400"
                  }`}
                >
                  Card History
                  {view === "history" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-white"
                    />
                  )}
                </button>
                <button
                  onClick={() => setView("gallery")}
                  className={`px-4 py-2 transition-colors relative ${
                    view === "gallery" ? "text-white" : "text-gray-400"
                  }`}
                >
                  Gallery View
                  {view === "gallery" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-white"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 pt-4">
              {view === "history" ? (
                <div className="space-y-12">
                  {/* Selected Card View */}
                  {finalCard && (
                    <div className="bg-white/5 rounded-2xl p-6">
                      <div className="flex items-start gap-6">
                        <div className="w-[252px] h-[342px] relative flex-shrink-0">
                          <Image
                            src={finalCard.image}
                            alt="Final Card"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                          />
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">
                              Final Minted Card
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">
                            Final Minted Card
                          </h3>
                          <p className="text-gray-400 text-sm mb-4">
                            {new Date(finalCard.date)?.toLocaleDateString() ||
                              "Date not available"}
                          </p>
                          <p className="text-gray-300">
                            Special edition featuring{" "}
                            {finalCard.description ||
                              "Card details not available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Evolution Timeline */}
                  {cardHistory?.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-base font-semibold text-white mb-4">
                        Card Evolution Timeline
                      </h4>
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute h-1 w-full bg-gray-800 rounded-full">
                          <div className="absolute h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full" />
                        </div>

                        {/* Timeline points */}
                        <div className="relative flex justify-between pt-3">
                          {cardHistory.map((card, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center"
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold ${
                                  index === 0
                                    ? "bg-blue-500"
                                    : index === cardHistory.length - 1
                                    ? "bg-orange-500"
                                    : "bg-purple-500"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <p className="mt-2 text-xs font-medium text-white">
                                {card.type || `Version ${index + 1}`}
                              </p>
                              <p className="text-[10px] text-gray-400">
                                {new Date(
                                  card.date?.split(" ")[0]
                                ).toLocaleDateString() || "N/A"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Gallery Grid */}
                  {cardHistory?.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-8">
                      {cardHistory.map((card, index) => (
                        <div
                          key={index}
                          className="relative aspect-[3/4] group cursor-pointer"
                        >
                          <Image
                            src={card.image}
                            alt={card.type || `Card Version ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                          />
                          <div className="absolute top-2 left-2">
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                                index === cardHistory.length - 1
                                  ? "bg-orange-500 text-white"
                                  : index === 0
                                  ? "bg-blue-500 text-white"
                                  : "bg-purple-500 text-white"
                              }`}
                            >
                              {card.type || `Version ${index + 1}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {cardHistory?.map((card, index) => (
                    <div
                      key={index}
                      className="relative aspect-[3/4] cursor-pointer group"
                    >
                      <Image
                        src={card.image}
                        alt={card.type || `Card Version ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl">
                        <div className="absolute bottom-4 left-4">
                          <div className="mb-1">
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                                index === cardHistory.length - 1
                                  ? "bg-orange-500 text-white"
                                  : index === 0
                                  ? "bg-blue-500 text-white"
                                  : "bg-purple-500 text-white"
                              }`}
                            >
                              {card.type || `Version ${index + 1}`}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mt-2">
                            {card.date || "Date not available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const UserCardDetails = ({ propCardId = null, model = false }) => {
  const swiperRef = useRef(null);
  const [cardDetailsData, setCardDetailsData] = useState(null);
  const [cardDetailsDataLoading, setCardDetailsDataLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showCopyEffect, setShowCopyEffect] = useState(false);
  const router = useRouter();
  const cardId = propCardId || router.query.cardId;
  const username = router.query.username;
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [displayCard, setDisplayCard] = useState("false");

  const handleFetchCardDetailsData = async ({ cardId }) => {
    setCardDetailsDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/user/${username}/collected/${cardId}`,
    });

    if (response.success) {
      setCardDetailsData(response?.data);
      setDisplayCard(response?.data?.card?.nftImage);
    }
    setCardDetailsDataLoading(false);
  };

  useEffect(() => {
    if (cardId) {
      handleFetchCardDetailsData({ cardId });
    }
  }, [cardId]);

  const slideLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const slideRight = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setShowCopyEffect(true);
    setTimeout(() => setShowCopyEffect(false), 2000);
  };

  return (
    <div className={`relative lg:px-10 px-2  md:py-[25px] h-screen  `}>
      <div className="relative w-full h-full overflow-y-auto border border-white border-opacity-20 rounded-3xl flex flex-col space-y-5 p-5">
        {/* close button */}
        <div className="absolute top-5 right-5 flex items-center gap-4">
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="w-14 h-14 rounded-full border border-white border-opacity-20 flex justify-center items-center hover:bg-white/5 transition-colors"
            title="View Card History"
          >
            <FaHistory size={20} />
          </button>
          <div
            className="w-14 h-14 rounded-full border border-white border-opacity-20 flex justify-center items-center cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => router.push(`/p/${username}/collected`)}
          >
            <IoClose className="text-[30px]" />
          </div>
        </div>
        {/* top related card slider for desktop */}
        <div className="flex flex-row justify-between items-center gap-2">
          <div className=" lg:w-[42%] w-full flex  justify-between items-center gap-2 lg:h-[55px] h-[45px] select-none ">
            {cardDetailsData?.relatedCards?.cards?.length > 5 && (
              <div
                className="px-1 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 flex justify-center items-center cursor-pointer transition-all duration-300"
                onClick={slideLeft}
              >
                <FaAngleLeft size={18} className="text-white" />
              </div>
            )}
            <div className="relative flex-1 w-full h-full select-none">
              {cardDetailsData?.relatedCards?.cards?.length > 5 && (
                <div className="absolute top-0 left-0 w-[20px] h-[55px] bg-gradient-to-l from-transparent to-black z-10" />
              )}
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={8.1}
                spaceBetween={30}
                breakpoints={{
                  320: {
                    slidesPerView: 6, // Small Mobile
                    spaceBetween: 30,
                  },
                  425: {
                    slidesPerView: 6.2, //Large Mobile
                    spaceBetween: 30,
                  },
                  640: {
                    slidesPerView: 9, // Tablet
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 7, // Small Laptop
                    spaceBetween: 20,
                    centeredSlides: false,
                  },
                  1280: {
                    slidesPerView: 8.1, // Large Screens
                    spaceBetween: 20,
                  },
                }}
                className="mySwiper h-[55px]"
                loop={true}
              >
                {cardDetailsDataLoading
                  ? Array(10)
                      ?.fill(0)
                      ?.map((_, idx) => {
                        return (
                          <SwiperSlide key={idx} className="relative h-[55px]">
                            <Card
                              ath={_}
                              cardDetailsDataLoading={cardDetailsDataLoading}
                            />
                          </SwiperSlide>
                        );
                      })
                  : cardDetailsData?.relatedCards?.cards?.length > 0 &&
                    cardDetailsData?.relatedCards?.cards?.map((ath, idx) => (
                      <SwiperSlide
                        key={idx}
                        className="relative h-[55px]"
                        onClick={() => setDisplayCard(ath?.nftImage)}
                      >
                      
                          <Card
                            ath={ath}
                            cardDetailsDataLoading={cardDetailsDataLoading}
                          />
                      </SwiperSlide>
                    ))}
              </Swiper>
              {cardDetailsData?.relatedCards?.cards?.length > 10 && (
                <div className="absolute top-0 right-0 w-[20px] h-[55px] bg-gradient-to-r from-transparent to-black z-10" />
              )}
            </div>
            {cardDetailsData?.relatedCards?.cards?.length > 10 && (
              <div
                className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 flex justify-center items-center cursor-pointer transition-all duration-300"
                onClick={slideRight}
              >
                <FaAngleRight size={18} className="text-white" />
              </div>
            )}
          </div>
        </div>
        {/* below card details conetent */}
        <div className="relative w-full flex-1 flex lg:flex-row flex-col lg:justify-between lg:h-full lg:gap-20 gap-5 lg:overflow-y-auto">
          <div
            className={`lg:sticky relative lg:top-0 lg:flex-[4]  w-full lg:h-full h-[450px] lg:rounded-lg !overflow-hidden ${
              cardDetailsDataLoading ? "border-0" : "lg:border border-0"
            } border-white border-opacity-20 bg-secondary `}
          >
            {/* asbolute */}
            {!cardDetailsDataLoading && (
              <>
                <div className="absolute top-0 left-0 h-full w-full z-0">
                  <Image
                    src={displayCard}
                    alt="bg"
                    width={500}
                    height={500}
                    className={`absolute top-0 left-0 w-full h-full object-cover brightness-[0.2] scale-150 object-top transition-all duration-300 z-0 rounded-lg`}
                  />
                  {/* layer */}
                  <div className="absolute top-0 left-0 w-full h-full z-5 backdrop-blur-xl " />
                </div>
                <div className="absolute top-0 left-0 h-full w-full  flex justify-center items-center z-10">
                  <Image
                    src={displayCard}
                    alt="bg"
                    width={500}
                    height={500}
                    className={`absolute top-0 left-0 w-full h-full lg:object-contain object-cover rounded-lg`}
                  />
                  {/* avatar */}
                  <div className="absolute bottom-0 left-0 p-5  w-full lg:h-[200px] bg-gradient-to-b from-transparent to-black  flex flex-row  justify-end items-end  z-10 gap-2">
                    <div className="flex justify-start items-center gap-2">
                      <div className="flex flex-col justify-center items-end ">
                        <div className="flex  justify-start items-center">
                          <article className="text-sm font-monumentUltraBold font-semibold ">
                            TEAM
                          </article>
                        </div>
                        <div className="flex justify-start items-center space-x-1">
                          {" "}
                          <span className="text-[12px] font-inter">
                            <span>
                              ver{cardDetailsData?.card?.avatar?.verseion}
                            </span>{" "}
                            <span>
                              {cardDetailsData?.card?.avatar?.edition}
                            </span>
                          </span>
                          <span className="text-[12px] font-inter">
                            {cardDetailsData?.card?.avatar?.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="relative lg:flex-[5] w-full lg:h-full h-auto lg:overflow-y-auto scroller-hidden space-y-5 pb-20 lg:px-0 px-2">
            <div className="w-full flex justify-between items-center">
              {/* profileImage */}
              <div className="flex justify-start items-center gap-2">
                <div
                  className={`relative w-[55px] h-[55px] ${
                    cardDetailsDataLoading ? "border-0" : "border-2"
                  } border-white border-opacity-30 rounded-full p-[2px]`}
                >
                  <div className="relative w-full h-full bg-secondary rounded-full">
                    {!cardDetailsDataLoading ? (
                      <Image
                        src={cardDetailsData?.card?.athlete?.profileImage}
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
                  {cardDetailsDataLoading ? (
                    <Skeleton
                      className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                    />
                  ) : (
                    <span className="text-[10px] font-inter">
                      {cardDetailsData?.card?.athlete?.username}
                    </span>
                  )}
                  {cardDetailsDataLoading ? (
                    <Skeleton
                      className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
                    />
                  ) : (
                    <div className="flex  justify-start items-center">
                      <article className="text-sm font-inter font-semibold">
                        {cardDetailsData?.card?.athlete?.name}
                      </article>
                      {cardDetailsData?.card?.athlete?.isVerified && (
                        <BsFillPatchCheckFill
                          size={12}
                          className="text-indigo-500 ml-1"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* bar */}
              <div className="flex justify-end items-center">
                <div className="flex justify-end items-center gap-4">
                  {cardDetailsDataLoading ? (
                    <>
                      <Skeleton
                        className={`bg-secondary  w-[40px] h-[40px] rounded-md mb-1`}
                      />
                      <Skeleton
                        className={`bg-secondary  w-[40px] h-[40px] rounded-md mb-1`}
                      />
                    </>
                  ) : (
                    <>
                      <FaInstagram />
                      <FaXTwitter />
                    </>
                  )}
                </div>
                <div className="relative w-[1px] h-[20px] lg:bg-white lg:bg-opacity-20 lg:mx-4 mx-2" />
                <div className="flex justify-end items-center gap-4">
                  {cardDetailsDataLoading ? (
                    <>
                      <Skeleton
                        className={`bg-secondary  lg:block hidden w-[40px] h-[40px] rounded-md mb-1`}
                      />
                      <Skeleton
                        className={`bg-secondary  lg:block hidden w-[40px] h-[40px] rounded-md mb-1`}
                      />
                      <Skeleton
                        className={`bg-secondary lg:block hidden w-[40px] h-[40px] rounded-md mb-1`}
                      />
                    </>
                  ) : (
                    <>
                      <IoIdCard className="lg:block hidden" />
                      <FaShare className="lg:block hidden" />
                      <div className="relative">
                        <MdContentCopy
                          className={`cursor-pointer transition-all duration-300 ${
                            showCopyEffect ? "text-[#854df2]" : ""
                          }`}
                          onClick={handleCopyUrl}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* card Info */}
            <div className="relative w-full space-y-8 ">
              {/* card Details */}
              <div className="relative w-full space-y-2">
                {!cardDetailsDataLoading && (
                  <article className="font-monumentRegular text-4xl font-semibold">
                    {cardDetailsData?.card?.title}
                  </article>
                )}
                {cardDetailsDataLoading ? (
                  <>
                    <Skeleton
                      className={`bg-secondary w-[80%] h-[18px] rounded-md mb-1`}
                    />
                    <Skeleton
                      className={`bg-secondary w-[60%] h-[18px] rounded-md mb-1`}
                    />
                  </>
                ) : (
                  <article className="font-inter text-xs font-medium text-white text-opacity-80 max-w-[75%]">
                    {cardDetailsData?.card?.description?.length > 200
                      ? showMore
                        ? cardDetailsData?.card?.description
                        : `${cardDetailsData?.card?.description?.substring(
                            0,
                            200
                          )}...`
                      : cardDetailsData?.card?.description}
                    {cardDetailsData?.card?.description?.length > 200 && (
                      <span className="font-bold text-primary opacity-1 cursor-pointer">
                        See More
                      </span>
                    )}
                  </article>
                )}
              </div>
            </div>

            {/* divider */}
            <div className="w-full h-[1px] bg-white bg-opacity-20" />
            <div className="relative w-full space-y-4">
              <span className="font-inter opacity-50 text-[14px]">
                Card Details
              </span>
              <div className="relative  w-full grid md:grid-cols-4 grid-cols-2 gap-5">
                <CardOtherInfoBlock
                  icon={PiMedalMilitaryFill}
                  title={"Special"}
                  value={cardDetailsData?.card?.cardDetails?.special}
                  cardDetailsDataLoading={cardDetailsDataLoading}
                />
                <CardOtherInfoBlock
                  icon={GiCardPlay}
                  title={"Collection"}
                  value={
                    cardDetailsData?.card?.cardDetails?.edition || "Mvpz Gen 1"
                  }
                  cardDetailsDataLoading={cardDetailsDataLoading}
                />
                <CardOtherInfoBlock
                  icon={MdOutlineDateRange}
                  title={"Year"}
                  value={cardDetailsData?.card?.cardDetails?.year}
                  cardDetailsDataLoading={cardDetailsDataLoading}
                />
                <CardOtherInfoBlock
                  icon={MdCardMembership}
                  title={"Membership Tier"}
                  value={cardDetailsData?.card?.cardDetails?.membershipTier}
                  cardDetailsDataLoading={cardDetailsDataLoading}
                />
                <CardOtherInfoBlock
                  icon={SiVorondesign}
                  title={"Design"}
                  value={cardDetailsData?.card?.cardDetails?.design}
                  cardDetailsDataLoading={cardDetailsDataLoading}
                />
                <CardOtherInfoBlock
                  icon={RiUser5Fill}
                  title={"Designer"}
                  value={cardDetailsData?.card?.cardDetails?.designer}
                  cardDetailsDataLoading={cardDetailsDataLoading}
                />
              </div>
            </div>
            {/* divider */}
            {/* <>
                <div className="w-full h-[1px] bg-white bg-opacity-20" />
                <div className="relative w-full space-y-4">
                  <span className="font-inter opacity-50 text-[14px]">
                    Enhancemnet Collections
                  </span>
                  <div className="relative  w-full grid md:grid-cols-5 grid-cols-4 md:gap-2 gap-5">
                    {cardDetailsData?.sameEnhancements?.cards?.map((enh) => {
                      return (
                        <div
                          className="relative w-full h-[175px] bg-secondary rounded-lg overflow-hidden border border-white border-opacity-10"
                          onClick={() =>
                            router.push(
                              `/a/${username}/collected/${enh?.purchaseId}`
                            )
                          }
                        >
                          
                          {!cardDetailsDataLoading && (
                            <div className="absolute top-0 left-0 w-full h-full">
                              {enh?.cardImage && (
                                <Image
                                  src={enh.cardImage}
                                  alt="bgimage"
                                  width={500}
                                  height={500}
                                  className={`relative w-full h-full object-cover rounded-lg  `}
                                />
                              )}
                            </div>
                          )}
                         
                        </div>
                      );
                    })}
                  </div>
                </div>
              </> */}
          </div>
        </div>
      </div>
      {/* Add the history modal */}
      {isHistoryModalOpen && (
        <div className="!font-inter">
          <CardHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            cardHistory={cardDetailsData?.cardHistory}
          />
        </div>
      )}
    </div>
  );
};

const Card = ({ ath, cardDetailsDataLoading }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const username = router.query.username;
  const isDesktop = useIsDesktop();
  const { setCardId } = useCardDetailsStore((state) => state);

  return (
    <div
      className={`relative w-[55px] lg:h-full h-[55px] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer  ${
        ath?.selected ? "border-2 border-white" : "bg-secondary"
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute top-0 left-0 w-full h-full rounded-lg">
        {!cardDetailsDataLoading ? (
          <Image
            src={ath?.nftImage}
            alt="bg"
            width={500}
            height={500}
            className={`relative w-full h-full object-cover brightness-90 object-top transition-all duration-300 ${
              isHover ? "scale-105" : "scale-100"
            }`}
          />
        ) : (
          <Skeleton className="w-full h-full rounded-lg" />
        )}
      </div>
    </div>
  );
};

const CardOtherInfoBlock = ({ title, value, icon, cardDetailsDataLoading }) => {
  let Icon = icon;
  return (
    <div className="relative w-full p-5  bg-secondary rounded-lg border border-white border-opacity-10 flex flex-col justify-start items-start gap-2">
      {cardDetailsDataLoading ? (
        <>
          <Skeleton
            className={`bg-secondary  w-[40px] h-[40px] rounded-md mb-1`}
          />
        </>
      ) : (
        <Icon size={20} />
      )}
      <div className="relative w-full">
        {cardDetailsDataLoading ? (
          <Skeleton
            className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
          />
        ) : (
          <span className="font-inter opacity-50 text-[10px]">{title}</span>
        )}
        {cardDetailsDataLoading ? (
          <Skeleton
            className={`bg-secondary w-full h-[18px] rounded-md mb-1`}
          />
        ) : (
          <article className="text-[14px] font-inter font-bold">
            {value}
          </article>
        )}
      </div>
    </div>
  );
};

export default UserCardDetails;
