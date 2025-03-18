"use client";

import React, { useEffect, useRef, useState } from "react";
import MarketplaceLayout from "../../../core/Layout/MarketplaceLayout";
import { FaAngleLeft, FaAngleRight, FaHeart } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { SiOpenbadges } from "react-icons/si";
import Tooltip from "../../../core/Atoms/Others/Tooltip";
import ModelVr_O from "../../../core/Atoms/Models/ModelVr_O";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperClass from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { callAPI, downloadFile } from "../../../lib/utils";
import FlippingCardLoader from "../../../core/Atoms/Others/Loader";
import MinorCard from "../../../core/Components/Cards/MinorCard";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";

const CardHistory = ({ trades }) => {
  return (
    <div className="w-full">
      <article className="text-xl mb-4">Trade History</article>
      <div className="w-full">
        {trades?.map((trade, idx) => {
          return (
            <div
              className="flex justify-start items-center gap-4 mb-5"
              key={idx}
            >
              <div className="w-10 h-10 rounded-full bg-ternary border border-white border-opacity-5 overflow-hidden">
                <Image
                  src={trade?.buyer?.image}
                  alt={trade?.buyer?.name}
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="relative flex-1 w-full">
                <article className="text-sm">{trade?.buyer?.name}</article>
                <article className="text-[10px] opacity-50">
                  buy at <strong>${trade?.buyAtPrice}</strong> on{" "}
                  <strong>{new Date(trade?.purchaseOne).toDateString()}</strong>
                </article>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Enhancements = ({ avatars }) => {
  let [selectAvatarCard, setSelectAvatarCard] = useState(null);

  const AvatarsModel = () => {
    const tabs = ["Avatar History"];
    const [selectedTab, setSelectedTab] = useState("Avatar History");
    const swiperRef = useRef<SwiperClass | null>(null);
    const [selectedDetails, setSelectedDetails] = useState(null);

    const goToSlide = (index: number) => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(index);
      }
    };

    const DetailsTab = () => {
      return (
        <div className="w-full space-y-5 overflow-y-auto mb-10">
          <div className="flex flex-col justify-start items-center space-y-5">
            <div
              className="w-full flex justify-start items-center gap-1"
              onClick={() => goToSlide(0)}
            >
              <FaAngleLeft />
              <article className="text-xs cursor-pointer">History</article>
            </div>
            <div className="relative md:w-[400px]">
              {selectedDetails?.type == "minor" ? (
                <MinorCard
                  badgeIcon={selectedDetails?.badgeIcon}
                  baseImage={selectedDetails?.baseImage}
                />
              ) : (
                <Image
                  src={selectedDetails?.cardNFTImage || "https://res.cloudinary.com/dv667zlni/image/upload/v1739252733/107596074_zzwmg4.jpg"}
                  alt={selectedDetails?.name}
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover"
                />
              )}
            </div>
            <div className="w-full flex flex-col justify-start items-center">
              <article className="text-xs font-inter font-bold text-primary mb-1">
                {selectedDetails?.ver}
              </article>
              <article className="text-sm mb-1">
                {selectedDetails?.title}
              </article>
              <article className="text-[10px] mb-2">
                {selectedDetails?.enhType}
              </article>
              <article className="text-xs opacity-50 text-center">
                {selectedDetails?.description}
              </article>
            </div>
          </div>
        </div>
      );
    };

    const HistoryTab = () => {
      return (
        <div className="w-full space-y-5 overflow-y-auto">
          <div className="w-full">
            <article className="text-[10px] text-start text-primary mb-1">
              {selectAvatarCard?.year}
            </article>
            <article className="text-3xl mb-1 text-start">
              {selectAvatarCard?.title}
            </article>
            <article className="text-xs font-inter font-semibold opacity-50 mb-2">
              {selectAvatarCard?.description}
            </article>
          </div>
          <div className="w-full my-5">
            <article>
              {selectAvatarCard?.enhancements?.length} Enhancements{" "}
            </article>
          </div>
          {selectAvatarCard?.enhancements?.map((enhancement, idx) => {
            return (
              <div
                key={idx}
                className="w-full p-5 bg-secondary hover:bg-ternary rounded-md border border-white border-opacity-5 flex justify-start items-center gap-5 cursor-pointer"
                onClick={() => {
                  setSelectedDetails(enhancement);
                  goToSlide(1);
                }}
              >
                <div className="w-[100px] h-[125px] rounded-md overflow-hidden">
                  {enhancement?.type == "minor" ? (
                    <MinorCard
                      badgeIcon={enhancement?.badgeIcon}
                      baseImage={enhancement?.baseImage}
                    />
                  ) : (
                    <Image
                      src={enhancement.cardNFTImage || "https://res.cloudinary.com/dv667zlni/image/upload/v1739252733/107596074_zzwmg4.jpg"}
                      alt={enhancement.name}
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 w-full h-full">
                  <article className="text-xs font-inter font-bold text-primary mb-1">
                    {enhancement?.ver}v
                  </article>
                  <article className="text-sm mb-1">
                    {enhancement?.title}
                  </article>
                  <article className="text-[10px] mb-2">
                    {enhancement?.enhType}
                  </article>
                  <article className="text-xs opacity-50">
                    {enhancement?.description?.substring(0, 50)}...
                  </article>
                </div>
                <FaAngleRight />
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div className="w-full h-[90vh] flex flex-col justify-start items-start overflow-y-auto md:p-10 p-5 ">
        <Swiper
          className="mySwiper w-[600px]"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          draggable={false}
          allowTouchMove={false}
        >
          <SwiperSlide className="w-full overflow-y-auto">
            <HistoryTab />
          </SwiperSlide>
          <SwiperSlide className="w-full overflow-y-auto">
            <DetailsTab />
          </SwiperSlide>
        </Swiper>
      </div>
    );
  };

  return (
    <>
      <div className="w-full relative space-y-10">
        {/* Enhancement */}
        <div className="w-full">
          <article className="text-xl mb-4">Avatars</article>
          <div className="relative w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scroller-hidden z-0">
            <div className="flex justify-start items-center flex-wrap gap-5">
              {avatars?.map((set) => (
                <div
                  className="flex flex-col justify-center items-center gap-2 "
                  onClick={() => setSelectAvatarCard(set)}
                >
                  <div className="relative flex justify-center items-center md:w-[105px] w-[85px] md:h-[105px] h-[85px] rounded-full">
                    <div
                      className={`relative md:w-[100px] w-[80px] md:h-[100px] h-[80px] rounded-full overflow-hidden cursor-pointer z-10`}
                    >
                      <Image
                        src={set?.thumbnail || "https://res.cloudinary.com/dv667zlni/image/upload/v1739252733/107596074_zzwmg4.jpg"}
                        alt={set.title}
                        width={500}
                        height={500}
                        className="relative w-full h-full rounded-full object-cover"
                      />
                    </div>
                    {selectAvatarCard?.id === set?.id ? (
                      <div className="absolute top-0 left-0 w-full h-full rounded-full  bg-gradient-to-t from-[#f12711] to-[#f5af19] animate-spin-slow" />
                      
                    ) : <div className="absolute top-0 left-0 w-full h-full rounded-full  bg-white bg-opacity-5" />}
                  </div>
                  <article className="text-[8px] md:max-w-[100px] md:block hidden">
                    {set?.title}
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectAvatarCard && (
        <ModelVr_O
          open={!!selectAvatarCard}
          setHandleOpen={() => setSelectAvatarCard(null)}
        >
          <AvatarsModel />
        </ModelVr_O>
      )}
    </>
  );
};

const Index = () => {
  let router = useRouter();
  let [selectedTab, setSelectedTab] = useState("Details");
  let tabs = ["Details", "History"];
  let [cardDetails, setCardDetails] = useState<any>({});
  let [loading, setLoading] = useState(true);
  let [enhacemnets, setEnhancements] = useState([]);
  let [isLike,setIsLike] = useState(false)
  let [isWishlist,setIsWishlist] = useState(false)
  let [processLoading,setProcessLoading] = useState(false)


  const tabsComp = {
    Details: <Enhancements avatars={cardDetails?.avatars} />,
    History: <CardHistory trades={cardDetails?.tradeHistory} />,
  };

  async function downloadImages(_card, authToken, url) {
    const downloadFileIfNeeded = async (path, folder) => {
      if (!path || path.includes("https://")) return null;
      return downloadFile(`${url}/file/${folder}/${path}`, authToken);
    };

    const downloadTasks = [];

    // Download athlete image
    if (_card?.athlete?.image) {
      downloadTasks.push(
        downloadFileIfNeeded(_card.athlete.image, "mvpz-user-private").then(
          (img) => (_card.athlete.image = img)
        )
      );
    }

    // Download athlete image
    if (_card?.seller?.image) {
      downloadTasks.push(
        downloadFileIfNeeded(_card.seller.image, "mvpz-user-private").then(
          (img) => (_card.seller.image = img)
        )
      );
    }

    // Download primaryDisplayImage first, else fallback to cardNftImage
    if (_card?.cardImageNFT) {
      downloadTasks.push(
        downloadFileIfNeeded(_card.cardImageNFT, "mvpz-nfts").then(
          (img) => (_card.cardImageNFT = img)
        )
      );
    }

    // Download avatars' thumbnails in parallel
    if (_card?.avatars?.length) {
      _card.avatars.forEach((avatar, index) => {
        if (avatar?.thumbnail) {
          downloadTasks.push(
            downloadFileIfNeeded(avatar.thumbnail, "mvpz-nfts").then(
              (img) => (_card.avatars[index].thumbnail = img)
            )
          );
        }

        // Download each avatar's enhancements images
        if (avatar?.enhancements?.length) {
          avatar.enhancements.forEach((enhancement, enhIndex) => {
            if (enhancement?.cardNFTImage) {
              downloadTasks.push(
                downloadFileIfNeeded(
                  enhancement.cardNFTImage,
                  "mvpz-nfts"
                ).then(
                  (img) =>
                    (_card.avatars[index].enhancements[enhIndex].cardNFTImage =
                      img)
                )
              );
            }
          });
        }
      });
    }

    if (_card.tradetradeHistory?.length) {
      _card.tradetradeHistory.forEach((tradeBuyer, enhIndex) => {
        if (tradeBuyer?.buyer?.cardNFTImage) {
          downloadTasks.push(
            downloadFileIfNeeded(
              tradeBuyer?.buyer.image,
              "mvpz-user-private"
            ).then((img) => (_card.tradetradeHistory[enhIndex].image = img))
          );
        }
      });
    }

    // Execute all downloads in parallel
    await Promise.all(downloadTasks);

    setIsLike(_card?.isLiked)
    setIsWishlist(_card?.isWhislisted)
    setCardDetails(_card);
    let filterEnhancementsCards = [];
    _card?.avatars?.map((avatar) => {
      let { title, description, year, shortCutName, enhancements } = avatar;
      enhancements?.map((enh) => {
        if (enh?.type == "major") {
          filterEnhancementsCards.push({
            ...enh,
            avatar: {
              title,
              description,
              year,
              shortCutName,
              enhacemnetsCount: avatar?.enhancements,
            },
          });
        }
      });
    });

    let baseCard = [
      {
        title: _card?.title,
        description: _card?.serialNumber,
        cardNFTImage: _card?.cardImageNFT,
        isBaseCard: true,
      },
    ];

    setEnhancements([...baseCard, ...filterEnhancementsCards]);

    return true;
  }

  const handleFetchCardDetails = async () => {
    setLoading(true);
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/market/details/${router.query.cardId}/${router?.query?.sellerId}`,
    });

    await downloadImages(
      response?.data,
      response.imageDownload?.authorizationToken,
      response.imageDownload?.downloadUrl
    );
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.cardId) {
      handleFetchCardDetails();
    }
  }, [router.query.cardId]);

  const handleLike = async () => {
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/market/like`,
      method : "POST",
      body : {
        cardId : router.query.cardId
      }
    });

    notifications.show({
      message : response?.message
    })

    setIsLike(response?.isLike)

  }

  const handleWishList = async () => {
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/market/wishlist`,
      method : "POST",
      body : {
        cardId : router.query.cardId
      }
    });

    notifications.show({
      message : response?.message
    })

    setIsWishlist(response?.isWishlist)
  }


  const handleBuy = async () => {
    setProcessLoading(true)
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/quicksell/buy/initiate`,
      method : "POST",
      body : {
        marketCardId : router.query.cardId
      }
    });

    if(response.success){
      
      window.location.href = response?.data?.checkoutUrl
      setProcessLoading(false)
    }

  }

  return (
    <MarketplaceLayout>
      <div className="min-h-screen bg-black w-full pt-[125px] py-16 md:px-10 px-5 space-y-10">
        <div
          className="flex justify-start items-center gap-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <FaAngleLeft />
          <article className="text-[14px]">Marketplace</article>
        </div>
        {loading ? (
          <>
            <div className="w-full md:h-[80vh] h-auto flex justify-center items-center gap-20 md:px-10 ">
              <FlippingCardLoader
                loadingMessages={[
                  "Loading...",
                  "Fetching data...",
                  "Almost there...",
                  "Preparing content...",
                  "Finalizing setup...",
                ]}
              />
            </div>
          </>
        ) : (
          <div className="w-full md:h-screen h-auto flex  md:flex-row flex-col  justify-start items-start gap-20 md:px-10 ">
            <div className="md:sticky top-40  md:w-[450px] flex justify-start items-center w-full space-y-10 scroller-hidden ">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper md:w-[400px] w-full md:h-[550px] rounded-md"
              >
                {enhacemnets?.map((_) => {
                  return (
                    <SwiperSlide className=" w-full md:h-[600px] rounded-md overflow-hidden">
                      {
                        <div className="relative w-full h-full rounded-md">
                          <Image
                            src={_.cardNFTImage || "https://res.cloudinary.com/dv667zlni/image/upload/v1739252733/107596074_zzwmg4.jpg"}
                            alt="thumbanail"
                            width={500}
                            height={500}
                            className="relative w-full h-full object-cover z-0"
                          />
                          <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-[#111] to-transparent" />
                          <div className="absolute bottom-0 left-0 w-full p-5 flex-col justify-center items-center gap-2 z-10">
                            {_?.ver && (
                              <article className="text-[10px] text-primary opacity-90 text-center ">
                                {_?.ver}v
                              </article>
                            )}
                            <article className="text-center text-xl font-monumentUltraBold">
                              {_?.title}
                            </article>
                            <article className="text-center text-[10px]  text-white opacity-50 ">
                              {_?.description}
                            </article>
                          </div>
                        </div>
                      }
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="flex-1 w-full min-h-screen pb-20">
              <div className="flex justify-start items-center gap-2 mb-6">
                {cardDetails?.totalEnh > 0 && <div className="px-4 py-2 rounded-md bg-secondary flex justify-start items-center border border-white border-opacity-5 gap-4">
                  <SiOpenbadges />
                  <article className="text-xs">{cardDetails?.totalEnh} Enhs</article>
                </div>}
                <div className="px-4 py-2 rounded-md bg-secondary flex justify-start items-center border border-white border-opacity-5 gap-4 cursor-pointer" onClick={handleLike}>
                  <FaHeart color={isLike && "red"} />
                  <article className="text-xs">
                    {cardDetails?.totalLikes > 0 && cardDetails?.totalLikes}{" "}
                    Like
                  </article>
                </div>
              </div>

              <div className="w-full mb-10">
                <article className="text-2xl font-monumentRegular mb-2">
                  {cardDetails?.title}
                </article>
                <article className="text-sm font-inter font-semibold max-w-[80%]">
                  {cardDetails?.description}
                </article>
              </div>

              {/* SELLER & ATHLETE */}
              <div className="flex justify-start items-center gap-x-14 mb-10">
                <div className=" relative space-y-2">
                  <article>Seller</article>
                  <div className="flex justify-start items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-ternary border border-white border-opacity-5 overflow-hidden flex justify-center items-center">
                      {cardDetails?.seller?.profileImage ||
                      cardDetails?.seller?.image ? (
                        <Image
                          src={
                            cardDetails?.seller?.profileImage ||
                            cardDetails?.seller?.image
                          }
                          alt={cardDetails?.seller?.shortuctName}
                          width={500}
                          height={500}
                          className="relative w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <article>{cardDetails?.seller?.shortuctName}</article>
                      )}
                    </div>
                    <div className="relative flex-1 w-full mb-1 ">
                      <article className="text-xs">
                        {cardDetails?.seller?.name}
                      </article>
                      <article className="text-[8px] opacity-50">
                        {cardDetails?.seller?.username}
                      </article>
                    </div>
                  </div>
                </div>
                <div className=" relative space-y-2">
                  {cardDetails?.tribe ||
                    (cardDetails?.athlete && (
                      <div className="flex justify-start items-center gap-x-14">
                        <div className=" relative space-y-2">
                          <article>
                            {!!cardDetails?.athlete ? "Athlete" : "Tribe"}
                          </article>
                          <div className="flex justify-start items-center gap-2">
                            <div className="w-14 h-14 rounded-full bg-ternary border border-white border-opacity-5 overflow-hidden flex justify-center items-center">
                              {!!cardDetails?.athlete ? (
                                cardDetails?.athlete?.image ? (
                                  <Image
                                    src={cardDetails?.athlete?.image}
                                    alt={
                                      cardDetails?.athlete?.tribeShortcutName
                                    }
                                    width={500}
                                    height={500}
                                    className="relative w-full h-full object-cover rounded-full"
                                  />
                                ) : (
                                  <article>
                                    {cardDetails?.athlete?.athleteShorcutName}
                                  </article>
                                )
                              ) : cardDetails?.athlete?.image ? (
                                <Image
                                  src={cardDetails?.tribe?.image}
                                  alt={cardDetails?.tribe?.tribeShortcutName}
                                  width={500}
                                  height={500}
                                  className="relative w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <article>
                                  {cardDetails?.tribe?.tribeShortcutName}
                                </article>
                              )}
                            </div>
                            <div className="relative flex-1 w-full mb-1 ">
                              <article className="text-xs">
                                {!!cardDetails?.athlete
                                  ? cardDetails?.athlete?.name
                                  : cardDetails?.tribe?.name}
                              </article>
                              <article className="text-[8px] opacity-50">
                                {!!cardDetails?.athlete
                                  ? cardDetails?.athlete?.username
                                  : cardDetails?.tribe?.athleteCount}
                              </article>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {cardDetails?.avatars?.length > 0 ? (
                <>
                  {/* TABS */}
                  <div className="flex justify-start items-center gap-5">
                    {tabs?.map((tab, idx) => {
                      return (
                        <div
                          key={idx + tab}
                          className={`px-4 py-2 rounded-full ${
                            selectedTab == tab
                              ? "bg-primary border border-white border-opacity-50"
                              : "bg-secondary hover:bg-ternary border border-white border-opacity-5"
                          } font-inter font-semibold cursor-pointer text-sm `}
                          onClick={() => setSelectedTab(tab)}
                        >
                          <article className="text-xs">{tab}</article>
                        </div>
                      );
                    })}
                  </div>
                  {/* Tab View */}
                  <div className="w-full my-8">{tabsComp[selectedTab]}</div>
                </>
              ) : (
                <CardHistory trades={cardDetails?.tradetradeHistory} />
              )}

              <div className="w-full mb-5">
                <article className="text-md mb-2">Price</article>
                <article className=" text-3xl font-monumentUltraBold">
                  ${cardDetails?.price}
                </article>
              </div>

              <div className="flex justify-start items-center gap-5">
                <div
                  className={`px-4 py-2 rounded-md bg-primary border border-white border-opacity-5 font-monumentRegular font-semibold cursor-pointer text-sm `}
                  onClick={handleBuy}
                >
                  {processLoading ? <Loader variant="dots" color="white" className="py-2 "/> : <article className="text-lg">Buy Now</article>}
                </div>
                <div
                  className={`px-4 py-2 rounded-md bg-secondary border border-white border-opacity-5 font-monumentRegular font-semibold cursor-pointer text-sm`}
                  onClick={handleWishList}
                >
                  <article className="text-lg">{isWishlist ? "Remove From Wishlist" : "Wishlist"}</article>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MarketplaceLayout>
  );
};

export default Index;
