"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaInstagram,
  FaShare,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoClose, IoEllipsisVertical, IoIdCard } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { GiCardPlay } from "react-icons/gi";
import { MdCardMembership, MdContentCopy, MdOutlineDateRange } from "react-icons/md";
import { SiVorondesign } from "react-icons/si";
import { RiUser5Fill } from "react-icons/ri";
import { callAPI } from "../../../../lib/utils";
import { useRouter } from "next/router";
import Skeleton from "../../../../core/Atoms/Others/Skeleton";
import { useIsDesktop } from "../../../../hooks/useIsDesktop";
import { useCardDetailsStore } from "../../../../store/useAthCollectionStore";
import { useBuyStore, useCartStore } from "../../../../store/useGlobalStore";

const AthCardDetails = ({ propCardId = null, model = false }) => {
  const swiperRef = useRef(null);
  const [cardDetailsData, setCardDetailsData] = useState(null);
  const [cardDetailsDataLoading, setCardDetailsDataLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showCopyEffect, setShowCopyEffect] = useState(false);
  const router = useRouter();
  const cardId = propCardId || router.query.cardId;
  const username = router.query.username;
  const { checkIdInCard, addToCart, removeFromCart } = useCartStore(
    (state) => state
  );
  const { addToBuy } = useBuyStore((state) => state);

  const handleFetchCardDetailsData = async ({ cardId }) => {
    setCardDetailsDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/athlete/${username}/card/${cardId}`,
    });

    if (response.success) {
      setCardDetailsData(response?.data);
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
        <div
          className="absolute top-5 right-5 w-14 h-14 rounded-full border border-white border-opacity-20 flex justify-center items-center"
          onClick={() => router.push(`/a/${username}/collections`)}
        >
          <IoClose className="text-[30px]" />
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
                      <SwiperSlide key={idx} className="relative h-[55px]">
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
                    src={cardDetailsData?.card?.nftImage}
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
                    src={cardDetailsData?.card?.nftImage}
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
                          className={`cursor-pointer transition-all duration-300 ${showCopyEffect ? 'text-[#854df2]' : ''}`}
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
            {/* payout */}
            <div className="relative w-full">
              {cardDetailsDataLoading ? (
                <Skeleton
                  className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <span className="font-inter opacity-50 text-[14px]">
                  BUY FOR
                </span>
              )}
              {cardDetailsDataLoading ? (
                <Skeleton
                  className={`bg-secondary w-[250px] h-[40px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex justify-start items-center gap-2 my-2">
                  <article className="text-4xl font-impact ">
                    ${cardDetailsData?.card?.price}
                  </article>
                  <div className="font-inter text-[10px] px-2 py-1 bg-secondary border border-white border-opacity-10 rounded-lg">
                    {cardDetailsData?.card?.cardLeft} Card Left
                  </div>
                </div>
              )}
              {/* button */}
              <div className="flex justify-start items-center gap-2 mt-5 h-[40px]">
                {cardDetailsDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[250px] h-[40px] rounded-md mb-1 md:flex-1  flex-[0.5`}
                  />
                ) : !cardDetailsData?.card?.isSoldOut ? (
                  <div
                    className="md:flex-1  flex-[0.5] h-full px-4 py-2 bg-gradient-to-r from-[#854df2] to-[#8c52ff] rounded-lg border border-white border-opacity-20 flex justify-center items-center gap-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToBuy({
                        id: cardDetailsData?.card?.id,
                        productType: "card",
                        thumnail: cardDetailsData?.card?.nftImage,
                        title: cardDetailsData?.card?.title,
                        subtitle: `#${cardDetailsData?.card?.avatar?.title}`,
                        price: cardDetailsData?.card?.price,
                        isBaseReq: !cardDetailsData?.card?.hasBaseCard,
                      });
                    }}
                  >
                    <article className="font-inter font-bold">Buy Now</article>
                  </div>
                ) : (
                  <div className="md:flex-1  flex-[0.5] h-full px-4 py-2 bg-secondary rounded-lg border border-white border-opacity-20 flex justify-center items-center gap-5">
                    <article className="font-inter font-bold">Sold Out</article>
                  </div>
                )}
                {cardDetailsDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[250px] h-[40px] rounded-md mb-1 md:flex-[0.4] flex-[0.5]`}
                  />
                ) : !checkIdInCard(cardDetailsData?.card?.id) ? (
                  <div
                    className="md:flex-[0.4] flex-[0.5] h-full px-4 py-2 bg-secondary rounded-lg border border-white border-opacity-20 flex justify-center items-center gap-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: cardDetailsData?.card?.id,
                        productType: "card",
                        thumnail: cardDetailsData?.card?.nftImage,
                        title: cardDetailsData?.card?.title,
                        subtitle: `#${cardDetailsData?.card?.avatar?.title}`,
                        price: cardDetailsData?.card?.price,
                        isBaseReq: !cardDetailsData?.card?.hasBaseCard,
                      });
                    }}
                  >
                    <article className="font-inter font-bold">
                      Add To Cart
                    </article>
                  </div>
                ) : (
                  <div className="md:flex-[0.4] flex-[0.5] h-full px-4 py-2 bg-ternary cursor-not-allowed rounded-lg border border-white border-opacity-20 flex justify-center items-center gap-5">
                    <article
                      className="font-inter font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(cardDetailsData?.card?.id);
                      }}
                    >
                      Remove From Cart
                    </article>
                  </div>
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
            {/* {cardDetailsData?.otherAvatars?.length > 0 && (
            <>
              <div className="w-full h-[1px] bg-white bg-opacity-20" />
              <div className="relative w-full space-y-4">
                <span className="font-inter opacity-50 text-[14px]">
                  Collections
                </span>
                <div className="relative  w-full grid md:grid-cols-6 grid-cols-5 md:gap-2 gap-5">
                  {cardDetailsData?.otherAvatars?.map((tribe) => {
                    return (
                      <div className="relative w-[75px] h-[75px] border-2 border-white border-opacity-30 rounded-full p-[2px]">
                        <div className="relative w-full h-full bg-secondary rounded-full overflow-hidden">
                          {!cardDetailsDataLoading && tribe?.thumbnail && (
                            <Image
                              src={tribe?.thumbnail}
                              alt="bg"
                              width={500}
                              height={500}
                              className="relative w-full h-full object-cover rounded-full scale-150"
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )} */}
          </div>
        </div>
      </div>
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
      onClick={() =>
        isDesktop
          ? router.push(`/a/${username}/card/${ath?.id}`, undefined, {
              shallow: false,
            })
          : setCardId(ath?.id)
      }
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

export default AthCardDetails;
