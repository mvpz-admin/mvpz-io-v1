"use client";

import React, { useEffect, useRef, useState } from "react";
import MarketplaceLayout from "../../../../core/Layout/MarketplaceLayout";
import { FaAngleLeft, FaAngleRight, FaHeart, FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import { SiOpenbadges, SiVorondesign } from "react-icons/si";
import Tooltip from "../../../../core/Atoms/Others/Tooltip";
import ModelVr_O from "../../../../core/Atoms/Models/ModelVr_O";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperClass from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-coverflow";
import CardCollectionStories from "../../../../core/Components/Cards/CardCollectionStories";
import { RiSendPlane2Fill, RiUser5Fill } from "react-icons/ri";
import {
  MdCardMembership,
  MdOutlineDateRange,
  MdShoppingBasket,
  MdSportsMotorsports,
  MdSportsScore,
} from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiCardPlay, GiCheckedShield } from "react-icons/gi";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { IoIosCard } from "react-icons/io";
import { callAPI, downloadFile } from "../../../../lib/utils";
import FlippingCardLoader from "../../../../core/Atoms/Others/Loader";
import MinorCard from "../../../../core/Components/Cards/MinorCard";

const CardDetails = ({ type, stats }) => {
  const CardDataComponent = ({ icon, title, value }) => {
    let Icon = icon;
    return (
      <div className="flex-[0.5] flex justify-start items-center gap-2">
        <div className="w-10 h-10 rounded-full border border-white border-opacity-5 bg-secondary flex justify-center items-center">
          <Icon size={18} />
        </div>
        <div className="flex flex-col justify-center items-start">
          <article className="text-[10px] opacity-50 ">{title}</article>
          <article className="text-[12px] font-monumentUltraBold">
            {value}
          </article>
        </div>
      </div>
    );
  };
  return (
    <div className=" relative space-y-10  md:w-[450px] w-full mb-10">
      {type == "Athlete" && (
        <div className="relative w-full space-y-3">
          <article>Player Info</article>
          <div className="relative w-full space-y-5">
            <div className="flex justify-start items-center gap-10">
              <CardDataComponent
                icon={MdSportsMotorsports}
                title={"Athlete Name"}
                value={stats?.athleteName}
              />
              <CardDataComponent
                icon={HiMiniUserGroup}
                title={"Tribe"}
                value={stats?.tribe}
              />
            </div>
            <div className="flex justify-start items-center gap-10">
              <CardDataComponent
                icon={MdSportsScore}
                title={"Sport"}
                value={stats?.sport}
              />
              <CardDataComponent
                icon={GiCheckedShield}
                title={"Postion"}
                value={stats?.position}
              />
            </div>
          </div>
        </div>
      )}
      <div className="relative space-y-3">
        <article>Card Details</article>
        <div className="relative w-full space-y-5">
          <div className="flex justify-start items-center gap-10">
            <CardDataComponent
              icon={PiMedalMilitaryFill}
              title={"Special"}
              value={stats?.special}
            />
            <CardDataComponent
              icon={GiCardPlay}
              title={"Collection"}
              value={stats?.collection}
            />
          </div>
          <div className="flex justify-start items-center gap-10">
            <CardDataComponent
              icon={MdOutlineDateRange}
              title={"Year"}
              value={stats?.year}
            />
            <CardDataComponent
              icon={MdCardMembership}
              title={"Membership Tier"}
              value={stats?.membershipTier}
            />
          </div>
          <div className="flex justify-start items-center gap-10">
            <CardDataComponent
              icon={SiVorondesign}
              title={"Design"}
              value={stats?.design}
            />
            <CardDataComponent
              icon={RiUser5Fill}
              title={"Designer"}
              value={stats?.designer}
            />
          </div>
        </div>
      </div>
      <div className="relative space-y-3">
        <article>Purchased Details</article>
        <div className="relative w-full space-y-5">
          <div className="flex justify-start items-center gap-10">
            <CardDataComponent
              icon={IoIosCard}
              title={"Serial Number"}
              value={stats?.serialNumber}
            />
            <CardDataComponent
              icon={MdShoppingBasket}
              title={"Purchased On"}
              value={new Date(stats?.purchaseOn)?.toDateString()}
            />
          </div>
        </div>
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
                  className="relative w-full h-full object-cover border border-white border-opacity-5"
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
      <div className="w-full relative space-y-10 mb-10">
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
                    ) : (
                      <div className="absolute top-0 left-0 w-full h-full rounded-full  bg-white bg-opacity-5" />
                    )}
                    <div className="absolute top-0 right-0 bg-[#f12711] py-1 px-2 rounded-full text-[8px] z-50 ">
                      {set?.enhancements?.length}/{set?.totalEnh}
                    </div>
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

const SimilarProducts = ({ products }) => {
  return (
    <div className="w-full">
      <article className="text-xl mb-4">Similar Products</article>
      {products?.length > 0 ? (
        <div className="flex justify-start items-center flex-wrap gap-5">
          {products?.map((product, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col justify-center items-center space-y-5"
                onClick={() => {}}
              >
                <div className="w-[150px] h-[225px] rounded-md overflow-x-hidden hover:brightness-90 cursor-pointer ">
                  <Image
                    src={product?.thumbnail || "https://res.cloudinary.com/dv667zlni/image/upload/v1739252733/107596074_zzwmg4.jpg"}
                    alt={product?.serialNumber}
                    width={500}
                    height={500}
                    className="relative w-full h-full object-cover"
                  />
                </div>

                <article className="text-[10px]">
                  {product?.serialNumber}
                </article>
              </div>
            );
          })}
        </div>
      ) : (
        <article>No Product Available</article>
      )}
    </div>
  );
};

const Index = () => {
  let router = useRouter();
  let [cardDetails, setCardDetails] = useState<any>({});
  let [selectedTab, setSelectedTab] = useState("Details");
  let tabs = ["Details", "Similar Products"];
  const [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(true);
  let [enhacemnets, setEnhancements] = useState([]);

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

    // Execute all downloads in parallel
    await Promise.all(downloadTasks);

    setCardDetails(_card);
    let filterEnhancementsCards = [];
    _card?.avatars?.map((avatar) => {
      let { title, description, year, shortCutName, enhancements } = avatar;
      enhancements?.map((enh) => {
        // if (enh?.type == "minor") {
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
        // }
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
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/${router.query.id}`,
    });

    await downloadImages(
      response?.data,
      response.imageDownload?.authorizationToken,
      response.imageDownload?.downloadUrl
    );
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.id) {
      handleFetchCardDetails();
    }
  }, [router.query.id]);

  const tabsComp = {
    Details: (
      <>
        {cardDetails?.avatars?.length > 0 && (
          <Enhancements avatars={cardDetails?.avatars} />
        )}
        <CardDetails type={cardDetails?.type} stats={cardDetails?.stats} />
      </>
    ),
    "Similar Products": <SimilarProducts products={[]} />,
  };

  return (
    <div className="relative min-h-screen bg-black w-full  md:py-16 py-5 md:px-10 px-5 ">
      <div
        className="flex justify-start items-center gap-2 cursor-pointer md:px-10 px-0 mb-10"
        onClick={() => router.push(`/profile/myCards`)}
      >
        <FaAngleLeft />
        <article className="text-[14px]">My Collections</article>
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
        <>
          <div className="w-full md:h-screen h-auto flex  md:flex-row flex-col  justify-start items-start gap-20 md:px-10 ">
            <div className="md:sticky top-40 md:w-[450px] flex justify-start items-center w-full ">
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
                          {!_?.type ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={_.cardNFTImage || "https://res.cloudinary.com/dv667zlni/image/upload/v1739252733/107596074_zzwmg4.jpg"}
                                alt="thumbanail"
                                width={500}
                                height={500}
                                className="relative w-full h-full object-cover z-0"
                              />
                            </div>
                          ) : _?.type == "major" ? (
                            <Image
                              src={_.cardNFTImage || "https://res.cloudinary.com/dv667zlni/image/upload/v1739252733/107596074_zzwmg4.jpg"}
                              alt="thumbanail"
                              width={500}
                              height={500}
                              className="relative w-full h-full object-cover z-0"
                            />
                          ) : (
                            <MinorCard
                              badgeIcon={_.badgeIcon}
                              baseImage={_.baseImage}
                            />
                          )}
                          <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-[#111] to-transparent" />
                          <div className="absolute bottom-0 left-0 w-full p-5 flex-col justify-center items-center gap-2 z-10">
                            {_?.ver ? (
                              <article className="text-[10px] text-primary opacity-90 text-center ">
                                {_?.ver}v
                              </article>
                            ) : (
                              <div className="flex justify-center items-center gap-2 mb-2">
                                <SiOpenbadges size={14} />{" "}
                                <article className="text-[10px]">
                                  {enhacemnets?.length - 1 } Enhancment
                                </article>
                              </div>
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
              <div className="w-full mb-10">
                <article className="text-xs font-monumentRegular mb-2 opacity-50">
                  {cardDetails?.serialNumber}
                </article>
                <article className="text-2xl font-monumentRegular mb-2">
                  {cardDetails?.title}
                </article>
                <article className="text-sm font-inter font-semibold max-w-[80%]">
                  {cardDetails?.description}
                </article>
              </div>
              {/* SELLER & ATHLETE */}
              {cardDetails?.tribe ||
                (cardDetails?.athlete && (
                  <div className="flex justify-start items-center gap-x-14 mb-10">
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
                                alt={cardDetails?.athlete?.tribeShortcutName}
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
              {/* TABS */}
              {/* <div className="w-full overflow-x-auto whitespace-nowrap scroller-hidden ">
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
              </div> */}
              {/* Tab View */}
              <div className="w-full my-8">{tabsComp[selectedTab]}</div>

              <div className="flex justify-start items-center gap-5">
                {cardDetails?.enhanceAvailable && (
                  <div
                    className={`px-4 py-2 rounded-md bg-primary border border-white border-opacity-5 font-monumentRegular font-semibold cursor-pointer text-sm flex justify-start items-center gap-2`}
                    onClick={() =>
                      router.push(
                        `/profile/myCards/card/enhance/${router.query.id}`
                      )
                    }
                  >
                    <SiOpenbadges />
                    <article className="text-base">Enhance</article>
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-md bg-secondary border border-white border-opacity-5 font-monumentRegular font-semibold cursor-pointer text-sm flex justify-start items-center gap-2 `}
                  onClick={() =>
                    router.push(`/profile/myCards/card/sell/${router.query.id}`)
                  }
                >
                  <RiSendPlane2Fill />
                  <article className="text-base">Sell Card</article>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {open && (
        <CardCollectionStories
          openStories={open}
          setOpenStories={setOpen}
          collections={data}
        />
      )} */}
    </div>
  );
};

export default Index;
