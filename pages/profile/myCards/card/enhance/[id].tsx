"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";

import EnhancementModal from "../../../../../core/Components/Cards/EnhancementModal";
import { callAPI, downloadFile } from "../../../../../lib/utils";
import FlippingCardLoader from "../../../../../core/Atoms/Others/Loader";
import MinorCard from "../../../../../core/Components/Cards/MinorCard";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const Index = () => {
  let router = useRouter();
  let [selectAvatarCard, setSelectAvatarCard] = useState(null);
  let [accordionOpen, setAccordionOpen] = useState(true);
  let [selectedEnhancements, setSelectedEnhancements] = useState<any>([]);
  let [openModel, setOpenModel] = useState(false);
  let [enhancementDetails, setEnhancementDetails] = useState<any>({});
  let [loading, setLoading] = useState(true);
  let [subTotal, setSubtotal] = useState(0);
  let [processLoading, setProcessLoading] = useState(false);

  const calcSelectedItems = () => {
    let value = 0;
    selectedEnhancements?.map((_) => {
      if (_?.price) {
        value += Number(_?.price);
      }
    });

    setSubtotal(value);
  };

  useEffect(() => {
    calcSelectedItems();
  }, [selectedEnhancements]);




  async function downloadImages(_card, authToken, url) {
    const downloadFileIfNeeded = async (path, folder) => {
      console.log({
        path, folder
      });
      
      if (!path || path.includes("https://")) return path;
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

    setEnhancementDetails(_card);
    setSelectAvatarCard(_card?.avatars[0]);
    return true;
  }

  const handleFetchEnhancementDetails = async () => {
    setLoading(true);
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/enhance/details/${router.query.id}`,
    });

    await downloadImages(
      response?.data,
      response.imageDownload?.authorizationToken,
      response.imageDownload?.downloadUrl
    );
    setLoading(false);
  };

  const handleInitiateEnhancement = async () => {
    setProcessLoading(true);
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/enhance/initiate`,
      method: "POST",
      body: {
        selectedEnhancements,
        serialNumber: enhancementDetails?.serialNumber,
      },
    });

    if (!response?.success) {
      setProcessLoading(false);
      return notifications.show({ message: response?.error });
    }

    window.location.href = response.url;
    setProcessLoading(false);
  };

  useEffect(() => {
    if (router.query.id) {
      handleFetchEnhancementDetails();
    }
  }, [router.query.id]);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  const handleCheckboxChange = (selectedEnh: any) => {
    setSelectedEnhancements((prev: any[]) => {
      if (prev.some((enh: any) => enh.id === selectedEnh.id)) {
        return prev.filter((enh: any) => enh.id !== selectedEnh.id); // Remove if already selected
      } else {
        return [...prev, selectedEnh]; // Add if not selected
      }
    });
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
        <>
          <div className="w-full md:h-screen h-auto flex  md:flex-row flex-col  justify-start items-start gap-20 md:px-10 ">
            <div className="flex-1 w-full min-h-screen pb-20">
              <div className="w-full mb-10">
                <article className="text-xs font-monumentRegular mb-2 opacity-50">
                  {enhancementDetails?.serialNumber}
                </article>
                <article className="text-2xl font-monumentRegular mb-2">
                  {enhancementDetails?.title}
                </article>
                <article className="md:text-sm text-xs font-inter font-semibold md:max-w-[80%]">
                  {enhancementDetails?.description}
                </article>
              </div>
              {/* TRIBE & ATHLETE */}
              {enhancementDetails?.tribe ||
                (enhancementDetails?.athlete && (
                  <div className="flex justify-start items-center gap-x-14 mb-10">
                    <div className=" relative space-y-2">
                      <article>
                        {!!enhancementDetails?.athlete ? "Athlete" : "Tribe"}
                      </article>
                      <div className="flex justify-start items-center gap-2">
                        <div className="w-14 h-14 rounded-full bg-ternary border border-white border-opacity-5 overflow-hidden flex justify-center items-center">
                          {!!enhancementDetails?.athlete ? (
                            enhancementDetails?.athlete?.image ? (
                              <Image
                                src={enhancementDetails?.athlete?.image}
                                alt={
                                  enhancementDetails?.athlete?.tribeShortcutName
                                }
                                width={500}
                                height={500}
                                className="relative w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <article>
                                {
                                  enhancementDetails?.athlete
                                    ?.athleteShorcutName
                                }
                              </article>
                            )
                          ) : enhancementDetails?.athlete?.image ? (
                            <Image
                              src={enhancementDetails?.tribe?.image}
                              alt={enhancementDetails?.tribe?.tribeShortcutName}
                              width={500}
                              height={500}
                              className="relative w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <article>
                              {enhancementDetails?.tribe?.tribeShortcutName}
                            </article>
                          )}
                        </div>
                        <div className="relative flex-1 w-full mb-1 ">
                          <article className="text-xs">
                            {!!enhancementDetails?.athlete
                              ? enhancementDetails?.athlete?.name
                              : enhancementDetails?.tribe?.name}
                          </article>
                          <article className="text-[8px] opacity-50">
                            {!!enhancementDetails?.athlete
                              ? enhancementDetails?.athlete?.username
                              : enhancementDetails?.tribe?.athleteCount}
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {/* AVATARS */}
              {enhancementDetails?.avatars?.length > 0 && (
                <div className=" relative flex-1 w-full space-y-5 mb-10">
                  <article>Avatars</article>
                  <div className="relative w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scroller-hidden z-0">
                    <div className="flex justify-start items-center md:gap-5 gap-2">
                      {enhancementDetails?.avatars?.map((set) => (
                        <div
                          className="flex flex-col justify-center items-center gap-2 "
                          onClick={() => setSelectAvatarCard(set)}
                        >
                          <div className="relative flex justify-center items-center md:w-[105px] w-[85px] md:h-[105px] h-[85px] rounded-full">
                            <div
                              className={`relative md:w-[100px] w-[80px] md:h-[100px] h-[80px] rounded-full overflow-hidden cursor-pointer z-10`}
                            >
                              <Image
                                src={set?.thumbnail}
                                alt={set?.title}
                                width={500}
                                height={500}
                                className="relative w-full h-full rounded-full object-cover"
                              />
                            </div>
                            {selectAvatarCard?.id === set?.id && (
                              <div className="absolute top-0 left-0 w-full h-full rounded-full  bg-gradient-to-t from-[#f12711] to-[#f5af19] animate-spin-slow" />
                            )}
                          </div>
                          <article className="text-[8px] md:max-w-[100px] md:block hidden">
                            {set?.title}
                          </article>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* ENHANCEMENT LIST */}
              <div className=" relative flex-1 w-full space-y-5 ">
                <article>Enhancements</article>
                {!!selectAvatarCard && (
                  <div className="relative w-full flex-1 space-y-10">
                    <div className="relativ ew-full">
                      <div className="relative w-full bg-secondary p-5 rounded-md space-y-2">
                        <button
                          className="w-full text-left font-semibold flex justify-between items-center "
                          onClick={toggleAccordion}
                        >
                          <article className="font-monumentUltraBold">
                            {selectAvatarCard?.title}
                          </article>
                          {accordionOpen ? (
                            <FaCaretUp size={20} />
                          ) : (
                            <FaCaretDown size={20} />
                          )}
                        </button>
                        <article className="text-[10px]">3 Enhancement</article>
                 
                      </div>

                      {accordionOpen && (
                        <div className="p-4 space-y-2">
                          {selectAvatarCard.enhancements.map((enhancement) => (
                            <div
                              key={enhancement.id}
                              className=" w-full flex  justify-start items-center gap-2  cursor-pointer p-2"
                            >
                              <input
                                type="checkbox"
                                checked={selectedEnhancements?.some(
                                  (_) => _?.id == enhancement.id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(enhancement)
                                }
                              />
                              <div className="flex-1 flex justify-start items-center gap-5">
                                <div className="w-[100px] h-[125px] rounded-md overflow-hidden bg-ternary">
                                  {enhancement?.type == "minor" ? (
                                    <MinorCard
                                      badgeIcon={enhancement?.badgeIcon}
                                      baseImage={enhancement?.baseImage}
                                    />
                                  ) : (
                                    <Image
                                      src={enhancement?.cardNFTImage}
                                      alt={enhancement?.name}
                                      width={500}
                                      height={500}
                                      className="relative w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-1 flex flex-col justify-start items-start gap-2">
                                  <article className="text-[8px] text-primary">
                                    {enhancement?.enhType}
                                  </article>
                                  <article>{enhancement?.title}</article>
                                  <article className="text-[10px] opacity-50 md:max-w-[80%] w-full">
                                    {enhancement?.description}
                                  </article>
                                  <article className="text-[10px] font-monumentUltraBold">
                                    {enhancement?.price
                                      ? `Price : $${enhancement.price}.00`
                                      : "Free"}
                                  </article>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="md:sticky top-40 md:w-[400px] w-full h-full  space-y-10 scroller-hidden md:mb-0 mb-20">
              <div className="relative w-full rounded-md overflow-hidden">
                <Image
                  src={enhancementDetails?.cardImageNFT}
                  alt={enhancementDetails?.title}
                  width={500}
                  height={500}
                  className="relative w-full object-cover hover:brightness-110 cursor-pointer z-0"
                />
                <div className="absolute top-0 left-0 w-full h-full rounded-md">
                  {selectedEnhancements?.slice()?.reverse()?.map(
                    (_, idx) =>
                      idx < 3 && (
                        <>
                          {_?.type == "minor" ? (
                            <MinorCard
                              badgeIcon={_?.badgeIcon}
                              baseImage={_?.baseImage}
                            />
                          ) : (
                            <Image
                              src={_.cardNFTImage}
                              alt={_.name}
                              width={500}
                              height={500}
                              className="relative w-full h-full object-cover"
                            />
                          )}
                        </>
                      )
                  )}
                </div>
                {selectedEnhancements?.length > 0 && (
                  <>
                    <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#111] to-transparent" />
                    <div className="absolute bottom-0 left-0 flex justify-start items-center gap-2 p-4 z-10">
                      <div
                        className="flex justify-start items-center cursor-pointer "
                        onClick={() => setOpenModel(true)}
                      >
                        {selectedEnhancements?.map(
                          (_, idx) =>
                            idx < 3 && (
                              <div className="border w-8 h-8  -ml-2 rounded-full overflow-hidden">
                                {_?.type == "minor" ? (
                                  <MinorCard
                                    badgeIcon={_?.badgeIcon}
                                    baseImage={_?.baseImage}
                                  />
                                ) : (
                                  <Image
                                    src={_?.cardNFTImage}
                                    alt={_?.name}
                                    width={500}
                                    height={500}
                                    className="relative w-full h-full object-cover"
                                  />
                                )}
                              </div>
                            )
                        )}
                      </div>
                      <article className="text-[10px]">
                        {selectedEnhancements?.length > 3
                          ? `${selectedEnhancements?.length - 3}+ Enhancement`
                          : `${selectedEnhancements?.length} Enhancement`}
                      </article>
                    </div>
                  </>
                )}
              </div>

              <div className="relative w-full space-y-5">
                <article className="text-xl font-monumentUltraBold">
                  Checkout
                </article>
                <div className="w-full h-auto relative   py-4 rounded-md">
                  <div className="w-full flex justify-between items-center gap-2 mb-3">
                    <article className="text-sm">Serial Number :</article>
                    <article className="text-[10px] opacity-60">
                      {enhancementDetails?.serialNumber}
                    </article>
                  </div>
                  <div className="w-full flex justify-between items-center gap-2 mb-3">
                    <article className="text-sm">Total Item :</article>
                    <article className="text-[10px] opacity-60">
                      {selectedEnhancements?.length} Ehancement
                    </article>
                  </div>
                  <div className="w-full flex justify-between items-center gap-2">
                    <article className="text-sm">Subtotal :</article>
                    <article className="text-[10px] text-white">
                      ${subTotal}
                    </article>
                  </div>
                  <div className="w-full h-[1px] bg-white bg-opacity-50 my-5" />
                  <div
                    className="w-full flex justify-center items-center p-2 bg-primary rounded-md text-white font-monumentRegular"
                    onClick={() =>
                      !processLoading && handleInitiateEnhancement()
                    }
                  >
                    {processLoading ? (
                      <Loader variant="dots" color="white" className="py-2" />
                    ) : (
                      <>Pay ${subTotal}</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {openModel && (
            <EnhancementModal
              enhacemnets={selectedEnhancements}
              setOpenStories={setOpenModel}
              openStories={openModel}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Index;
