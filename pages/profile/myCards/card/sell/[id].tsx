"use client";

import Image from "next/image";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { callAPI, downloadFile } from "../../../../../lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperClass from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css/effect-coverflow";
import FlippingCardLoader from "../../../../../core/Atoms/Others/Loader";
import { Button, Checkbox, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const Index = () => {
  const router = useRouter();
  let [cardDetails, setCardDetails] = useState<any>({});
  let [loading, setLoading] = useState(true);
  let [enhacemnets, setEnhancements] = useState([]);
  let [isAgree, setIsAgree] = useState(true);
  let [marketData, setMarketData] = useState({
    maketId: null,
    title: "",
    description: "",
    sellingPrice: 20,
  });

  let [processLoading, setProccessLoading] = useState(false);

  async function downloadImages(_card, authToken, url) {
    const downloadFileIfNeeded = async (path, folder) => {
      if (!path || path.includes("https://")) return null;
      return downloadFile(`${url}/file/${folder}/${path}`, authToken);
    };

    const downloadTasks = [];

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
    setMarketData((prev) => ({
      ...prev,
      sellingPrice: _card?.startSellingPrice,
    }));

    setMarketData((prev) => ({
        ...prev,
        maketId: _card?.liveInfo?.id,
        title: _card?.liveInfo?.title,
        description: _card?.liveInfo?.description,
        price: _card?.liveInfo?.sellingPrice,
      }));
  
    return true;
  }

  const handleFetchCardDetails = async () => {
    setLoading(true);
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/quicksell/details/${router.query.id}`,
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

  const handleSell = async () => {
    if(!isAgree){
        return
    }
    setProccessLoading(true);
    const response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/quicksell/add`,
      method: "POST",
      body: {
        cardId: cardDetails?.id,
        title: marketData?.title,
        description: marketData.description,
        price: marketData?.sellingPrice,
      },
    });

    if (!response?.success) {
      setProccessLoading(false);
      notifications.show({ message: response?.error });
      return;
    }

    notifications.show({ message: "Product Listed Successfully!" });

    let liveInfo = response.data.liveInfo;

    setCardDetails((prev) => ({
      ...prev,
      isLive: true,
    }));

    setMarketData((prev) => ({
      ...prev,
      maketId: liveInfo?.id,
      title: liveInfo?.title,
      description: liveInfo?.description,
      price: liveInfo?.sellingPrice,
    }));

    setProccessLoading(false);
  };

  const handleUnlist = async () => {
    setProccessLoading(true);
    const response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/quicksell/remove/${marketData?.maketId}`,
      method: "PUT",
    });

    if (!response?.success) {
      setProccessLoading(false);
      notifications.show({ message: response?.error });
      return;
    }

    notifications.show({ message: "Product Unlisted From Market!" });

    let minAmt = response.data.startSellingPrice;

    setCardDetails((prev) => ({
      ...prev,
      isLive: false,
    }));

    setMarketData((prev) => ({
      ...prev,
      maketId: null,
      title: "",
      description: "",
      price: minAmt,
    }));

    setProccessLoading(false);
  };
  return (
    <div className="relative min-h-screen bg-black w-full  md:py-16 py-5 md:px-10 px-5 ">
      <div
        className="flex justify-start items-center gap-2 cursor-pointer md:px-10 px-0 mb-10"
        onClick={() =>
          router.push(`/profile/myCards/card/${router?.query?.id}`)
        }
      >
        <FaAngleLeft />
        <article className="md:text-[14px] text-[10px]">
          {router?.query?.id}
        </article>
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
        <div className="w-full md:h-screen h-auto flex  md:flex-row flex-col-reverse  justify-start items-start gap-20 md:px-10 ">
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
            {/* FORM */}
            <div className="relative w-full h-full space-y-5 mb-10">
              <div className="w-full h-full relative space-y-3">
                <div className="flex justify-start items-center gap-2">
                  <article>Title</article>{" "}
                  <span className="text-red-500">*</span>
                </div>
                <div className="w-full h-[50px] rounded-md bg-secondary border border-white border-opacity-5">
                  <input
                    type="text"
                    className="w-full h-full rounded-md bg-transparent p-2"
                    value={marketData.title}
                    onChange={(e) =>
                      setMarketData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    maxLength={20}
                    readOnly={cardDetails?.isLive}
                  />
                </div>
              </div>
              <div className="w-full h-full relative space-y-3">
                <div className="flex justify-start items-center gap-2">
                  <article>Description</article>{" "}
                  <span className="text-red-500">*</span>
                </div>
                <div className="w-full h-[200px] rounded-md bg-secondary border border-white border-opacity-5">
                  <textarea
                    className="w-full h-full rounded-md bg-transparent p-4"
                    value={marketData.description}
                    onChange={(e) =>
                      setMarketData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    maxLength={200}
                    readOnly={cardDetails?.isLive}
                  />
                </div>
              </div>
              <div className="w-full h-full relative space-y-3">
                <div className="flex justify-start items-center gap-2">
                  <article>Price</article>{" "}
                  <span className="text-red-500">*</span>
                </div>
                <div className="w-full h-[50px] rounded-md bg-secondary border border-white border-opacity-5">
                  <input
                    type="number"
                    className="w-full h-full rounded-md bg-transparent p-4"
                    value={marketData.sellingPrice}
                    onChange={(e) =>
                      setMarketData((prev) => ({
                        ...prev,
                        sellingPrice: Number(e.target.value),
                      }))
                    }
                    min={20}
                    readOnly={cardDetails?.isLive}
                  />
                </div>
              </div>
            </div>
            {/* aggree */}
            {!cardDetails?.isLive && <div className="flex justify-start items-center gap-2 mb-4">
              <Checkbox
                checked={isAgree}
                onClick={() => setIsAgree(!isAgree)}
              />
              <article className="text-[10px] opacity-50">
                By listing this card, you confirm your right to sell it and
                agree to our marketplace terms. All sales are final.
              </article>
            </div>}
            {cardDetails?.isLive ? (
              <Button onClick={handleUnlist} disabled={!isAgree}>
                {processLoading ? (
                  <Loader variant="dots" color="white" className="py-2" />
                ) : (
                  "Unlist"
                )}
              </Button>
            ) : (
              <Button onClick={handleSell} disabled={!isAgree}>  {processLoading ? (
                <Loader variant="dots" color="white" className="py-2" />
              ) : ("Sell In Market")}</Button>
            )}
          </div>
          <div className="md:sticky top-40 md:w-[450px] flex justify-start items-center w-full space-y-10 scroller-hidden md:mb-0 mb-20">
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
                          src={_.cardNFTImage}
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
        </div>
      )}
    </div>
  );
};

export default Index;
