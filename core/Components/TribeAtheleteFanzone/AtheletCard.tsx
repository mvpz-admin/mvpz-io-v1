import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { callAPI, downloadFile } from "../../../lib/utils";
import {
  Accordion,
  Button,
  Card,
  Checkbox,
  Loader,
  Menu,
  Modal,
  Skeleton,
  Tabs,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { notifications } from "@mantine/notifications";
import FlipCard from "../../Atoms/Card/FlipCard";
import ReactQRCode from "react-qr-code";

const AtheletCard = ({ handleAddFollow, ath, isSearchAthlete = false }) => {
  const [cardInfo, setCardInfo] = useState<any>();
  const [cardImage, setCardImage] = useState<any>([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardNftImage, setCardNftImage] = useState<any>();
  const { data: session, status } = useSession();
  const [availableEnhancemnet, setAvailableEnhancement] = useState([]);
  const [purcashedCard, setPurcashedCard] = useState([]);
  const [imageDownload, setImageDownload] = useState<any>({});
  const [opened, setOpened] = useState(false);
  const [selectedEnhancements, setSelectedEnhancements] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBaseCard, setSelectedBaseCard] = useState("");
  const [enhLoader, setEnhLoader] = useState(false);

  const toggleEnhancement = (enh: any) => {
    setSelectedEnhancements((prev) =>
      prev.includes(enh) ? prev.filter((e) => e !== enh) : [...prev, enh]
    );

    setSelectedTypes((prev) =>
      prev.includes(enh.type.subType)
        ? prev.filter((e) => e !== enh.type.subType)
        : [...prev, enh.type.subType]
    );
  };

  console.log({
    selectedEnhancements,
  });

  const totalPrice = selectedEnhancements.reduce(
    (sum, enh) => sum + (enh.price || 0),
    0
  );

  async function downloadUserImages(_user, authToken, url) {
    let downloadedImages = {} as any;
    if (_user?.cardImageNFT) {
      downloadedImages.cardImage = await downloadFile(
        `${url}/file/mvpz-nfts/${_user?.cardImageNFT}`,
        authToken
      );
    }

    return downloadedImages?.cardImage;
  }

  const gotoCheckout = async (id = null) => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    setLoading(true);

    if (product || id) {
      const result = await callAPI({
        endpoint: `/api/purchase/initiate`,
        method: "POST",
        body: {
          priceId: id || product?.stripePriceId,
          cardType: "digital",
          packType: "athlete",
          athleteId: ath?.user?.id,
        },
      });
      setLoading(false);
      if (result?.checkoutUrl) {
        router.push(result.checkoutUrl);
      }
    }
  };

  const fetchCard = async () => {
    setLoading(true);

    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/athlete/card/${
        ath?.user?.id || ath?.id
      }`,
    });

    if (response) {
      console.log({ response });

      let image = await downloadUserImages(
        response?.card,
        response?.imageDownload?.authorizationToken,
        response?.imageDownload?.downloadUrl
      );

      setImageDownload(response?.imageDownload);
      setCardInfo(response?.card);
      setCardImage(response?.card);
      fetchProducts(response?.card);
      setCardNftImage(image?.cardImage || image);
      setAvailableEnhancement(
        response?.card?.purchasedCard?.length > 0
          ? response?.card?.availableEnhancements
          : []
      );
      setPurcashedCard(response?.card?.purchasedCard);
      setLoading(false);
    }
  };

  const clearQuery = () => {
    router.replace(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true }
    );
  };

  const fetchProducts = async (card) => {
    const res = await callAPI({
      endpoint: "/api/product/getActive?type=athlete",
    });

    if (res.length) {
      setProduct(res[0]);
      let action = router.query.action;

      if (action == "buy") {
        if (card) {
          await clearQuery();
          handleAddFollow();
          gotoCheckout(res[0]?.stripePriceId);
        } else {
          notifications.show({
            message: "Card Comming Soon..., Stay Tune.",
          });
          router.push(window.location.pathname);
        }
      }
    }
  };

  useEffect(() => {
    if (ath) {
      fetchCard();
    }
  }, [ath]);

  const router = useRouter();

  const handleSelectEnhance = (e) => {
    router.push(`/profile/myCards/card/enhance/${e.cardSerialNumber}`)
    return 
    // setAvailableEnhancement(e.availablePurchaseEnhancements);
    // setSelectedBaseCard(e.cardSerialNumber);
    // setOpened(true);
  };

  const handleBuyEnh = async () => {
    setEnhLoader(true);
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/enhancement/initiate`,
      method: "POST",
      body: {
        selectedEnhancements,
        selectedBaseCard,
      },
    });

    if (response.success) {
      if (!response.paid) {
        setEnhLoader(false);
        setOpened(false);
        setSelectedBaseCard(null);
        setSelectedEnhancements(null);
        return notifications.show({ message: response?.message });
      }
    }
  };

  const CardComp = () => {
    return (
      <>
        {loading ? (
          <div className="relative w-full h-full bg-ternary rounded-md z-0">
            <Skeleton className="w-full h-[500px]" />
          </div>
        ) : (
          <>
            <Image
              src={cardNftImage}
              alt="card"
              width={500}
              height={500}
              className="relative w-full h-full object-contain overflow-hidden rounded-md z-0"
            />
            <div className="absolute top-10 -left-5 h-[40px] w-[80px]  rounded-[30px] bg-secondary flex justify-center items-center p-2 z-10">
              {
                <article className="w-full full bg-primary flex justify-center items-center rounded-[30px] ">
                  ${product?.cost}
                </article>
              }
            </div>{" "}
          </>
        )}
        {cardInfo && (
          <div className="flex justify-center items-center gap-5 my-5">
            <div
              className="px-5 py-2 bg-primary rounded-md cursor-pointer text-xs"
              onClick={() =>
                !!gotoCheckout ? gotoCheckout() : router.push("/genone")
              }
            >
              {cardInfo?.isAlreadyPurchased ? "Buy Again" : "Buy Now"}
            </div>
            {purcashedCard?.length > 0 && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <div className="px-5 py-2 bg-primary rounded-md cursor-pointer text-xs">
                    Enhance
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                  {purcashedCard?.map((_) => (
                    <Menu.Label onClick={() => handleSelectEnhance(_)}>
                      {_?.cardSerialNumber}
                    </Menu.Label>
                  ))}
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
        )}
      </>
    );
  };

  const CardTab = () => {
    return (
      <div className="w-full md:min-h-[700px] rounded-md bg-secondary md:p-10 p-5 flex  md:flex-row flex-col justify-start items-center gap-8">
        {cardImage ? (
          <div className="relative flex flex-col justify-center items-center md:w-[60%] w-full ">
            <div className="relative w-full">
              <CardComp />
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:w-[60%] w-full ">
            <div className="w-full h-full  bg-ternary rounded-md relative flex justify-center items-center  overflow-hidden">
              <Image
                src={`/images/card-backside.png`}
                alt="card"
                width={500}
                height={500}
                className="relative w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <div className="md:block hidden w-[0.5px] h-[700px] bg-white opacity-20"></div>
        <div className=" flex md:w-[40%] w-full h-full flex-col justify-start items-start space-y-10 overflow-y-auto ">
          <div className="w-full space-y-10">
            <div className="w-full space-y-4">
              <div className="flex flex-col justify-start items-start">
                <article className="tesm">Sport</article>
                <article className="text-[10px] opacity-50">
                  {cardInfo?.sport || "N/A"}
                </article>
              </div>
              <div className="flex flex-col justify-start items-start">
                <article className="tesm">Position</article>
                <article className="text-[10px] opacity-50">
                  {cardInfo?.position || "N/A"}
                </article>
              </div>
              <div className="flex flex-col justify-start items-start">
                <article className="tesm">School</article>
                <article className="text-[10px] opacity-50">
                  {cardInfo?.school || "N/A"}
                </article>
              </div>
            </div>
            <div className="w-full h-[1px] bg-white opacity-50 mt-10"></div>
          </div>
          <div className=" w-full space-y-10">
            <div className="w-full space-y-4">
              <div className="flex flex-col justify-start items-start">
                <article className="tesm">Special</article>
                <article className="text-[10px] opacity-50">
                  {cardInfo?.special || "N/A"}
                </article>
              </div>
              <div className="flex flex-col justify-start items-start">
                <article className="tesm">Collection</article>
                <article className="text-[10px] opacity-50">
                  {cardInfo?.edition || "N/A"}
                </article>
              </div>
              <div className="flex flex-col justify-start items-start">
                <article className="tesm">Year</article>
                <article className="text-[10px] opacity-50">
                  {cardInfo?.year || "N/A"}
                </article>
              </div>
            </div>
            <div className="w-full h-[1px] bg-white opacity-50"></div>
          </div>

          <div className=" w-full space-y-10">
            <div className="w-full space-y-4">
              <div className="flex flex-col justify-start items-start">
                <article className="tesm">Design</article>
                <article className="text-[10px] opacity-50">
                  {cardInfo?.design || "N/A"}
                </article>
              </div>
              <div className="flex flex-col justify-start items-start">
                <article className="tesm">Designer</article>
                <article className="text-[10px] opacity-50">
                  {cardInfo?.designer || "N/A"}
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="p-4 flex flex-col items-center">
      <CardTab />
    
    </div>
  );
};

export default AtheletCard;
