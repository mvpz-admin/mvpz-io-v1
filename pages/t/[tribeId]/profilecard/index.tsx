import React, { useEffect, useState } from "react";
import FlipCard from "../../../../core/Atoms/Card/FlipCard";
import Image from "next/image";
import ReactQRCode from "react-qr-code";
import { callAPI } from "../../../../lib/utils";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import Skeleton from "../../../../core/Atoms/Others/Skeleton";
import { formatNumber } from "../../../../utils/global/formating";
import { BsFillPatchCheckFill } from "react-icons/bs";

const Index = () => {
  let router = useRouter();
  const [tribe, setTribe] = useState(null);
  const [loading, setLoading] = useState(false);
  let tribeId = router.query.tribeId;

  const handleFetchProfileData = async ({ tribeId }) => {
    setLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/tribe/${tribeId}/profilecard`,
    });

    if (response.success) {
      setTribe(response?.data?.tribe);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (tribeId) {
      handleFetchProfileData({ tribeId });
    }
  }, [tribeId]);
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <FlipCard
        flip={!loading}
        frontComp={() => (
          <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-secondary">
            <div className="relative z-0 w-full h-[200px] bg-ternary">
              <Image
                src={tribe?.tribeHorizontalBanner || "/images/Future.svg"}
                alt={tribe?.tribeHorizontalBanner}
                width={500}
                height={500}
                className={`relative w-full h-full object-cover ${
                  !tribe?.tribeHorizontalBanner && "brightness-75"
                }`}
              />
            </div>
            <div className="md:w-[250px] w-[200px] md:h-[250px] h-[200px] mx-auto rounded-full overflow-hidden border-[10px] border-secondary relative  -mt-[75px] flex justify-center items-center bg-ternary  ">
              {tribe?.tribeLogo ? (
                <Image
                  src={tribe?.tribeLogo}
                  alt={tribe?.tribeId}
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover"
                />
              ) : (
                <FaUser size={100} className="opacity-50" />
              )}
            </div>

            <article className=" text-center mt-2  font-graffiti  text-primary ">
              #Tribe
            </article>

            <div className="flex flex-col justify-center items-center mt-4  space-y-1">
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <span className="text-[14px] font-inter">{tribe?.tribeShortName}</span>
              )}
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[250px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="text-base text-center font-inter font-semibold">
                    {tribe?.tribeName}
                  </article>
                  {tribe?.isVerified && (
                    <BsFillPatchCheckFill
                      size={18}
                      className="text-indigo-500 ml-1"
                    />
                  )}
                </div>
              )}
              <div className="flex justify-start items-center gap-4 font-inter text-[12px] font-bold">
               
                {loading ? (
                  <Skeleton
                    className={`bg-secondary  w-[50px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex justify-start gap-2">
                    <span>{formatNumber(tribe?._count?.members)}</span>
                    <span className="font-semibold opacity-50">Members</span>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute top-5 left-5 ">
              <Image
                src={"/images/logos/logo-transparent.png"}
                alt="mvpz"
                width={500}
                height={500}
                className="relative h-[20px] object-contain"
              />
            </div>
          </div>
        )}
        backComp={() => (
          <div
            className=" relative w-full h-full rounded-[30px] flex flex-col justify-center items-center "
            style={{
              background: `linear-gradient(to top right, ${tribe?.theme?.primaryColorHex}, ${tribe?.theme?.secondaryColorHex}, ${tribe?.theme?.ternaryColorHex})`,
            }}
          >
            <ReactQRCode
              value={`${process.env.NEXT_PUBLIC_APP_URL}/t/${tribe?.tribeId}`}
              bgColor="transparent"
              fgColor="#fff"
              className="w-[225px] h-[225x]"
            />
            <article className="md:mt-10 mt-5 font-monumentUltraBold text-2xl -rotate-2">
              {tribe?.tribeId}
            </article>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <Image
                src={"/images/logos/logo-transparent.png"}
                alt="mvpz"
                width={500}
                height={500}
                className="relative w-[80px] object-contain"
              />
            </div>
          </div>
        )}
        cardHeight={
         "md:h-[550px] h-[500px]"
        }
        cardWidth="md:w-[350px] w-[300px]"
      />
    </div>
  );
};

export default Index;
