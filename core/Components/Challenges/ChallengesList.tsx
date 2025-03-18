import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Accordion, Loader, Skeleton } from "@mantine/core";
import Image from "next/image";
import { downloadEncryptedImage } from "../../../utils/media";
import { getMedalHexCode } from "../../../utils/others";
import { FaAngleLeft, FaLock } from "react-icons/fa";
import Tooltip from "../../Atoms/Others/Tooltip";
import { useRouter } from "next/router";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { callAPI } from "../../../lib/utils";
import { notifications } from "@mantine/notifications";
import FlipCard from "../../Atoms/Card/FlipCard";

// Helper function to format time (days, hours, minutes, seconds)
const formatTime = (time: number) => {
  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  if (days > 0) {
    return `${days} days left`;
  }

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

interface TimerProps {
  startDate: string; // ISO string format date
  endDate: string; // ISO string format date
}

const Timer: React.FC<TimerProps> = ({ startDate, endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerMessage, setTimerMessage] = useState<string>("");

  useEffect(() => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();

    // Check if current time is before the start date
    if (now < start) {
      setTimerMessage("Starts in:");
      setTimeRemaining(Math.floor((start - now) / 1000)); // Show time until start date
    }
    // Check if current time is after start date but before end date
    else if (now >= start && now < end) {
      setTimerMessage("Ends in:");
      setTimeRemaining(Math.floor((end - now) / 1000)); // Show time until end date
    } else {
      setTimerMessage("Event has ended.");
      setTimeRemaining(null); // No timer if event has ended
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev !== null && prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  return (
    <div className="flex justify-start items-center gap-2 text-xs ">
      <h2 className="">{timerMessage}</h2>
      {timeRemaining !== null && timeRemaining > 0 ? (
        <p>{formatTime(timeRemaining)}</p>
      ) : (
        <p>
          {timerMessage === "Challenge has ended."
            ? "The Challenge has already ended."
            : "The Challenge is starting soon!"}
        </p>
      )}
    </div>
  );
};

const Card = ({ card, imageToken, isCollection = false }) => {
  const [image, setImage] = useState("");

  const downloadImage = async () => {
    let image = await downloadEncryptedImage({
      imagePath: isCollection
        ? "/file/mvpz-nfts-optimized/"
        : "/file/mvpz-nfts/" + card?.nftEntity?.cardImageNFT ||
          card?.cardImageNFT,
      authToken: imageToken?.authorizationToken,
      bbUrl: imageToken?.downloadUrl,
    });
    setImage(image);
  };

  useEffect(() => {
    if(card){
      downloadImage();
    }
  }, [card]);
  let titleArray = card?.nftEntity?.title?.split(" ");
  let title =
    titleArray?.length > 2
      ? titleArray[0] + " " + titleArray[titleArray?.length - 1]
      : card?.nftEntity?.title;
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div className="relative w-full h-[310px] rounded-md bg-ternary overflow-hidden z-0">
        <Skeleton className="relative w-full h-full rounded-md z-0" />
        {image && (
          <Image
            src={image}
            alt="nftImage"
            width={500}
            height={500}
            className={`absolute top-0 left-0 w-full h-full object-cover z-10 ${
              card?.hasCard ? "brightness-100" : "brightness-50"
            }`}
          />
        )}
      </div>
      <div className="my-2 w-full z-0">
      <article className="md:block hidden text-start">
            {title.length > 13 ? `${title.substring(0, 13)}...` : title}
          </article>

          <article className="md:hidden block text-start">
            {title?.split(" ")[0]}
          </article>
        <div className="flex justify-between items-center w-full text-[10px]">
          <article>{card?.nftEntity?.type}</article>
          {card?.nftEntity?.design && (
            <article
              style={{
                color: getMedalHexCode(card?.nftEntity?.design),
              }}
            >
              {card?.nftEntity?.design}
            </article>
          )}
        </div>
      </div>
      {/* {card?.hasCard && (
        <div className="absolute top-2 right-2 z-5">
          <Image src={`/images/collections/sheriff.png`} alt="collected" width={500} height={500} className="relative w-5 h-5 object-contain"/>
        </div>
      )} */}
    </div>
  );
};

interface CardType {
  title: string;
  type: string;
  design?: "Base" | "Enhance 1" | "Enhance 2" | "1 of 1";
  image: string;
  selectedCard: {
    id: string;
    sreialNo: string;
    title: string;
    xp: any;
  };
}

const ChallengeTab = ({
  challenge,
  setChallenge,
  imageToken,
  
}: {
  challenge: any;
  setChallenge: (value: any) => void;
  imageToken: { authorizationToken: string; downloadUrl: string };
  collections: any;
}) => {
  const [fillCard, setFillCard] = useState<{ [key: string]: CardType }>({});
  const [loading, setLoading] = useState(true);
  const [challegeLoading,setChallnegeLoading] = useState(false)

  useEffect(() => {
    if (!challenge?.challengeCards) return;

    const fetchImages = async () => {
      setLoading(true);

      const imagePromises = challenge.challengeCards.map(async (card: any) => {
        const image = await downloadEncryptedImage({
          imagePath: `/file/mvpz-nfts/${card.nftEntity?.cardImageNFT}`,
          authToken: imageToken?.authorizationToken,
          bbUrl: imageToken?.downloadUrl,
        });

        return {
          id: card.nftEntityId,
          data: {
            cCardId: card.id,
            title: card.title,
            type: card.type,
            design: card.nftEntity?.design,
            image,
            selectedCard: null,
          },
        };
      });

      const results = await Promise.all(imagePromises);
      const updatedFillCard = results.reduce((acc, { id, data }) => {
        acc[id] = data;
        return acc;
      }, {} as { [key: string]: CardType });

      setFillCard(updatedFillCard);
      setLoading(false);
    };

    fetchImages();
  }, [challenge, imageToken]);

  const UploadCardImage = ({ id, card }) => {
    let [selectedImage, setSelectedImage] = useState("");
    const [slotLoading, setSlotLoading] = useState(false);
    const titleWords = card.title.split(" ");
    const title =
      titleWords.length > 2
        ? `${titleWords[0]} ${titleWords[titleWords.length - 1]}`
        : card.title;

    const downloadImage = async () => {
      let image = await downloadEncryptedImage({
        imagePath: "/file/mvpz-nfts-optimized/" + card?.selectedCard?.image,
        authToken: imageToken?.authorizationToken,
        bbUrl: imageToken?.downloadUrl,
      });
      setSelectedImage(image);
    };

    useEffect(() => {
      downloadImage();
    }, [card]);

    const handleFillSlot = async () => {
      setSlotLoading(true);
      const res = await callAPI({
        endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/challenges/getNft?id=${id}`,
        method: "GET",
      });

      if (!res.success) {
        return notifications?.show({
          message: "Something went wrong : Please try again, later!",
        });
      }

      let nft = res?.data?.nft;

      setFillCard((prev) => ({
        ...prev,
        [id]: {
          ...fillCard[id],
          selectedCard: {
            id: nft?.id,
            sreialNo: nft?.cardSerialNumber,
            title: nft?.nftEntity?.title,
            xp: res.data?.xpEarn?.factorValue,
          },
        },
      }));

      setSlotLoading(false);
    };

    return (
      <div key={id} className="flex flex-col items-center space-y-2">
        <div className="relative w-full h-[310px] rounded-md ">
          {slotLoading ? (
            <div className="w-full h-full rounded-md">
              <Skeleton className="w-full h-full rounded-md" />
            </div>
          ) : card?.selectedCard?.id ? (
            <>
              <FlipCard
                showBackButton={false}
                cardHeight="h-[310px]"
                cardWidth="w-full rounded-md"
                frontComp={() => (
                  <>
                    <Image
                      src={selectedImage ? selectedImage : card.image}
                      alt="NFT Image"
                      width={500}
                      height={500}
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </>
                )}
                backComp={() => (
                  <>
                    <div className="relative w-full h-full rounded-md bg-secondary">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image
                          src={"/images/notifications/xp.png"}
                          alt="xp"
                          width={500}
                          height={500}
                          className="relative h-[50px] w-auto object-contain"
                        />
                        <div>
                          <article className="text-[#7AFE03]">
                            {card?.selectedCard?.xp}XP
                          </article>
                        </div>
                      </div>
                      <div className="absolute bottom-5 left-0 w-full  flex flex-col justify-start items-center">
                        <article className="md:block hidden text-xs">
                          {card?.title}
                        </article>
                         <article className="md:hidden block text-xs">
                          {card?.title?.split(" ")[0]}
                        </article>
                        <article className="text-[10px]">
                          {card?.selectedCard?.sreialNo}
                        </article>
                      </div>
                    </div>
                  </>
                )}
              />
            </>
          ) : (
            <>
              <Image
                src={selectedImage ? selectedImage : card.image}
                alt="NFT Image"
                width={500}
                height={500}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              {!selectedImage && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <article className="text-center text-[12px] text-white">
                    Select Card
                  </article>
                </div>
              )}
            </>
          )}
        </div>

        <div className="relative w-full">
          <article className="md:block hidden text-start">
            {title.length > 13 ? `${title.substring(0, 13)}...` : title}
          </article>

          <article className="md:hidden block text-start">
            {title?.split(" ")[0]}
          </article>

          <div className="flex justify-between items-center w-full text-[10px] mb-2">
            <article>{card.type}</article>
            {card.design && (
              <article style={{ color: getMedalHexCode(card.design) }}>
                {card.design}
              </article>
            )}
          </div>
        </div>
        <div
          className="p-2 mt-5 mb-10 rounded-md bg-primary text-[10px] inline-flex justify-center items-center mx-auto cursor-pointer"
          onClick={() => (!slotLoading && !card?.selectedCard?.id) && handleFillSlot()}
        >
          {slotLoading ? (
            <Loader variant="dots" color="white" size={16} />
          ) : !card?.selectedCard?.id ? (
            "Fill Slot"
          ) : (
            "Filled "
          )}
        </div>
      </div>
    );
  };

  const hanldeCompleteChallene = async () => {

    let cardList = Object?.values(fillCard)

    setChallnegeLoading(true);
      const res = await callAPI({
        endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/challenges/completeChallenge`,
        method: "POST",
        body : {
          challengeId : challenge?.id,
          cardList : cardList
        }
      });

      if (!res.success) {
        return notifications?.show({
          message: "Something went wrong : Please try again, later!",
        });
      }

      window.location.href = res?.data?.redirectURI

      setChallnegeLoading(false)
  }

  return (
    <>
      <div className="relative w-full">
        <div
          className="flex items-center gap-1 cursor-pointer mb-5"
          onClick={() => setChallenge(null)}
        >
          <FaAngleLeft /> <article>Back</article>
        </div>

        <article className="text-2xl mb-10">{challenge?.title}</article>

        <section>
          <article className="text-2xl mb-2">Task:</article>
          <div
            dangerouslySetInnerHTML={{ __html: challenge?.description }}
            className="text-[12px]"
          />
        </section>

        <div className="w-full h-[1px] bg-white bg-opacity-50 my-5"></div>

        <section>
          <article className="text-2xl mb-2">Perk:</article>
          <div
            dangerouslySetInnerHTML={{ __html: challenge?.perkDescription }}
            className="text-[12px]"
          />
        </section>

        <div className="w-full h-[1px] bg-white bg-opacity-50 my-5"></div>

        <section>
          <article className="text-2xl mb-5">Fill The Cards:</article>

          {loading ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-10 gap-5">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="relative w-full h-[310px] rounded-md"
                />
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-10 gap-5">
              {Object.entries(fillCard).map(([id, card]) => {
                return <UploadCardImage id={id} card={card} />;
              })}
            </div>
          )}

          <div className="flex justify-center items-center w-full">
            {Object.values(fillCard)?.every((_) => _.selectedCard?.id) && Object.values(fillCard)?.length > 0  && (
              <div className="p-2 px-3 text-xs  justify-center items-center gap-2 my-10  bg-primary rounded-md inline-flex mx-auto cursor-pointer" onClick={hanldeCompleteChallene}>
               {challegeLoading ? <Loader variant="dots" color="white" className="text-white"/> :  "Complete Challenge"}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

const ChallengesList = ({ list, collections, loading, imageToken }) => {
  const [openChallenge, setOpenChallenge] = useState(null);
  const router = useRouter();
  return !openChallenge ? (
    <div className="relative w-full">
      {list.map((challenge) => {
        return (
          <div className="relative w-full border-b md:py-10 py-20   px-2">
            {/* header */}
            <article className="reltive mb-5 md:text-xl text-base font-monumentUltraBold ">
              {challenge?.title?.split("🏆 Challenge:")?.lenght > 0
                ? challenge?.title?.split("🏆 Challenge:")[1]
                : challenge?.title?.split("🏆 Challenge:")[0]}
            </article>
            <Accordion>
              <Accordion.Item value="features">
                <Accordion.Control className="md:text-base text-xs">Challenge Descriptions</Accordion.Control>
                <Accordion.Panel style={{ width: "100%", overflow: "hidden" }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: challenge?.description }}
                    className="md:text-[12px] text-[10px]"
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item value="features">
                <Accordion.Control className="md:text-base text-xs">Perk</Accordion.Control>
                <Accordion.Panel style={{ width: "100%", overflow: "hidden" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: challenge?.perkDescription,
                    }}
                    className="md:text-[12px] text-[10px]"
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
            {/* <div
              dangerouslySetInnerHTML={{ __html: challenge?.description }}
              className="text-[12px]"
            /> */}
            <div className="my-10 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-10 gap-5">
              {challenge?.challengeCards?.map((card, indx) => {
                return  <Card card={card} imageToken={imageToken} />;
              })}
            </div>
            {/* <div
              dangerouslySetInnerHTML={{ __html: challenge?.perkDescription }}
              className="text-[12px]"
            /> */}
            <div className="pt-10">
              <Timer
                startDate={challenge?.startDate}
                endDate={challenge?.endDate}
              />
            </div>

            <div className="absolute  bottom-10 right-0 flex justify-start items-center gap-1 z-5">
              <Image
                src={"/images/notifications/xp.png"}
                alt="xp"
                width={500}
                height={500}
                className="relative h-[50px] w-auto object-contain"
              />
              <div>
                <article className="text-[#7AFE03]">
                  {challenge?.totalXp * challenge?.perkXP}XP
                </article>
                <article>{challenge?.totalXp}XP</article>
              </div>
            </div>

            <div className="absolute  md:top-10 top-5 right-0 flex justify-start items-center  gap-5 z-5 ">
              <div className=" flex justify-start items-center gap-1 z-5">
                <div>
                  {challenge.totalUserCompletedChallenge +
                    "/" +
                    challenge.challengeLimit}
                </div>
              </div>
              <div className=" justify-start items-center gap-1 z-5 ">
                {challenge?.isEligible ? (
                  challenge?.isCompleted 
                  ?
                  <div
                    className="uppercase text-[10px] font-monumentUltraBold py-2 px-3 bg-green-600 rounded-md cursor-pointer "
                  >
                    Completed
                  </div>
                  :
                  <div
                  className="uppercase text-[10px] font-monumentUltraBold py-2 px-3 bg-primary rounded-md cursor-pointer"
                  onClick={() => setOpenChallenge(challenge)}
                >
                  Challenge
                </div>
                ) : (
                  <Tooltip text="To unlock this challenge, purchase the required card! 🚀">
                    <div
                      className="uppercase text-[10px] font-monumentUltraBold py-2 px-3 bg-primary rounded-md cursor-pointer gap-2 flex justify-center items-center"
                      onClick={() => router?.push("/mvpz-store")}
                    >
                      <FaLock /> UNLOCK
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>

            {challenge?.tribeExp && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"></div>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <ChallengeTab

      challenge={openChallenge}
      setChallenge={setOpenChallenge}
      imageToken={imageToken}
      collections={collections}
    />
  );
};

export default ChallengesList;
