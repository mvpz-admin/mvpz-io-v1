import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { callAPI } from "../../../lib/utils";
import { useSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa";
import CommunityVeritcalBanner from "../DeafualtBanners/CommunityVeritcalBanner";

const TribeCard: React.FC<{
  tribe: any;
  imageDownload: any;
  isMember?: boolean;
}> = ({ tribe, imageDownload, isMember = false }) => {
  const router = useRouter();

  

  const handleRedirect = () => {
    if (isMember) {
      router.push(`/fanzone/tribe/community/${tribe?.tribeName}`);
    } else {
      router.push(`/fanzone/tribe/${tribe?.tribeName}`);
    }
  };

  const CardBanner = () => {
    return (
      <div
        className={`relative w-full ${
          isMember ? "md:h-[70%] h-[60%]" : "md:h-[65%] h-[60%]"
        } `}
      >
        <div className="relative w-full h-full bg-ternary rounded-t-xl overflow-hidden ">
          {tribe?.tribeVerticalBanner || tribe?.tribeBanner ? (
            <Image
              src={tribe?.tribeVerticalBanner || tribe?.tribeBanner}
              alt="team"
              title={tribe?.organisation?.name}
              width={500}
              height={500}
              className="relative h-full w-full  object-cover scale-110"
            />
          ) : (
            <CommunityVeritcalBanner
              primaryColor={tribe?.organisation?.primaryColorHex}
              secondaryColor={tribe?.organisation?.secondaryColorHex}
            />
          )}
        </div>
        <div className="absolute w-[100px] h-[100px]  bottom-0 left-[50%] -translate-x-[50%] -mb-[30px] p-2 bg-secondary rounded-full">
          <div className="relative w-full h-full rounded-full bg-ternary overflow-hidden">
            {tribe?.tribeLogo ? (
              <Image
                src={tribe?.tribeLogo}
                alt="team"
                title={tribe?.
                  organisation
                  ?.shortName}
                width={500}
                height={500}
                className="relative h-full w-full rounded-full object-cover scale-150"
              />
            ) : (
              <div
                className="w-full h-full flex justify-center items-center rounded-full "
                style={{
                  background: tribe?.organisation?.primaryColorHex,
                }}
              >
                <article className="font-bold text-[8px]" style={{
                  color : tribe?.organisation?.secondaryColorHex,
                }}>
                  { tribe?.organisation?.nickName }
                </article>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CardInfo = () => {
    return (
      <div
        className={`absolute ${
          isMember ? " md:bottom-2 bottom-4" : "md:bottom-5 bottom-6"
        } left-1/2 -translate-x-1/2 w-full flex flex-col justify-center items-center px-5`}
      >
        <article className=" md:text-md text-xs font-bold text-center mb-2 capitalize">
          {(tribe?.tribeName)?.substring(
            0,
            10
          )}
        </article>
        {!isMember && (
          <div className="px-3 py-1 text-[10px] bg-primary rounded-md">
            JOIN
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className="relative w-full h-full bg-secondary rounded-xl  cursor-pointer"
      onClick={handleRedirect}
    >
      <CardBanner />
      <CardInfo />
    </div>
  );
};

export default TribeCard;
