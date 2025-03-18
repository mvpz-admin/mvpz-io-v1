import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";
import { callAPI } from "../../../lib/utils";
import { Loader } from "@mantine/core";
import CommunityBanner from "../DeafualtBanners/CommunityBanner";

const TribeHorizontalCard = ({ tribe, showLeave = true, handleLeaveTribe}) => {
  const router = useRouter();
  const [loading,setLoading] = useState(false)

  const handleOnclic = async () => {
    setLoading(true)
    await handleLeaveTribe(tribe?.id)
    setLoading(false)

    console.log({tribe});
    
  }

  return (
    <div
      className="w-full   bg-secondary rounded-md flex flex-col overflow-hidden"
      
    >
      <div className="relative  w-full md:h-[300px] h-[200px] bg-ternary ">
        {tribe?.tribeHorizontalBanner || tribe?.tribeBanner ?<Image
          src={tribe?.tribeHorizontalBanner || tribe?.tribeBanner}
          alt="tribe banner"
          title={tribe?.name}
          width={500}
          height={500}
          className="relative w-full h-full object-cover "
        /> : <CommunityBanner primaryColor={tribe?.organisation?.primaryColorHex} secondaryColor={tribe?.organisation?.secondaryColorHex} />}
        <div className="absolute left-5 -bottom-10 md:h-[175px]   md:w-[175px] w-[125px] bg-secondary rounded-full p-2 ">
          <div className="w-full h-full bg-ternary rounded-full overflow-hidden">
            <Image
              src={tribe?.tribeLogo}
              alt="tribe logo"
              width={500}
              height={500}
              className="relative w-full h-full object-cover "
            />
          </div>
        </div>
      </div>
      <div className="relative w-full  md:h-[200px]  md:p-10 p-5 md:pl-14 pl-8 pr-5 md:pb-5 md:pt-0 pt-14 flex md:flex-row flex-col justify-start md:items-end items-start gap-5  ">
        
        <div className="relative h-auto md:pb-5 pb-2 flex-1">
          <article className="text-xl hover:underline cursor-pointer mb-1 flex justify-start items-center gap-2" onClick={() => router.push(`/fanzone/tribe/community/${tribe?.organisation?.shortName}`)}>
            {tribe?.tribeName} <RxOpenInNewWindow className="text-primary" />
          </article>
          <article className="md:block hidden text-[10px] font-light mb-6 max-w-[80%]">
            {tribe?.about?.length > 150
              ? tribe?.about?.substring(0, 150) + "..."
              : tribe?.about}
          </article>
          <article className="md:hidden block text-[10px] font-light mb-6 max-w-[80%]">
            {tribe?.about?.length > 75
              ? tribe?.about?.substring(0, 75) + "..."
              : tribe?.about}
          </article>
         <div className="flex justify-start md:items-center items-start  gap-2">
         <article className="md:text-xs text-[8px]">
            {tribe?._count?.athletes } Athelets
          </article>
          <div className="w-1 h-1 md:block hidden rounded-full bg-primary"></div>
                <article className="md:text-xs text-[8px]">
            {tribe?._count?.members } Members
          </article>
         </div>
          {/* leave */}
          {showLeave && (
            <div className="absolute md:bottom-5 bottom-2 right-0 h-[30px] px-2 flex justify-center items-center gap-2 bg-red-500 rounded-sm cursor-pointer md:text-[10px] text-[8px]" onClick={handleOnclic}>
              Leave Tribe {loading && <Loader size={12} color="white" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TribeHorizontalCard;
