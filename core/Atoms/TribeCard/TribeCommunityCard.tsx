import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import CommunityVeritcalBanner from "../DeafualtBanners/CommunityVeritcalBanner";

interface TribeCommunityCard {
  banner: string;
  theme: {
    primaryColor : string;
    secondaryColor : string;
  };
  shortName: string;
  name: string;
  member: string;
}

const TribeCommunityCard : React.FC<TribeCommunityCard> = ({
  banner,
  theme,
  shortName,
  name,
  member
}) => {
  const router = useRouter();
  return (
    <div
      className="relative md:w-[280px] w-full h-[400px] bg-secondary rounded-md overflow-hidden cursor-pointer"
      onClick={() => router.push(`/fanzone/tribe/${name}`)}
    >
      {banner ? <Image
        src={
          banner
        }
        alt="tribe"
        title="tribe name"
        width={500}
        height={500}
        className="relative w-full h-full object-cover"
      /> : 
      <CommunityVeritcalBanner primaryColor={theme.primaryColor} secondaryColor={theme?.secondaryColor} />
      }
      <div className="absolute top-0 left-0 w-full h-full z-10  flex flex-col justify-end items-center py-10 space-y-2 p-2" 
       style={{
        background: `linear-gradient(to bottom, transparent, ${banner ? theme.primaryColor : "#000"})`,
      }}
      >
        <div className="flex  justify-center items-center gap-2 " style={{color: theme?.secondaryColor}}>
          <article className="text-3xl font-bold text-center" >{shortName}</article>
          <FaChevronRight size={20} />
        </div>
        <article className="text-xs text-center font-bold opacity-80" >{name}</article>
        <article className="text-xs opacity-60">{member} Members</article>
      </div>
    </div>
  );
};

export default TribeCommunityCard;
