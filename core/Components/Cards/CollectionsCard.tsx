import Image from "next/image";
import React from "react";
import MenuOptions from "../../Atoms/Others/MenuOption";
import { FaVrCardboard } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { useRouter } from "next/router";
import { SiOpenbadges } from "react-icons/si";
import { RiSendPlane2Fill } from "react-icons/ri";
import Tooltip from "../../Atoms/Others/Tooltip";

const CollectionCard = ({ card }) => {
  const router = useRouter();
console.log({avatars : card?.avatars});

  const handleNavigateMenu = (e) => {
    switch (e.id) {
      case "VIEW_CARD":
        return router.push(`/profile/myCards/card/${card?.serialNumber}`);
      case "ENHANCE_CARD":
        return router.push(
          `/profile/myCards/card/enhance/${card?.id}?onCard=${card?.serialNumber}`
        );
      case "LIST_IN_MARKET":
        return router.push(`/profile/myCards/card/sell/${card?.serialNumber}`);
    }
  };

  return (
    <div className="w-full h-auto rounded-md md:p-5 p-2 bg-secondary border border-white border-opacity-5 cursor-pointer">
      {/* Form */}
      <div className="md:flex hidden  justify-start items-center mb-3 gap-2">
        <div className="w-10 h-10 rounded-full bg-ternary border border-white border-opacity-5 overflow-hidden">
          {card?.owner?.profileImage ? (
            <Image
              src={card?.owner?.profileImage}
              alt={card?.owner?.name}
              width={500}
              height={500}
              className="relative w-full h-full object-contain rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full bg-ternary">
              <article className="text-[8px] font-monumentRegular">
                {card?.owner?.shortuctName}
              </article>
            </div>
          )}
        </div>
        <div className="relative flex-1 w-full">
          <article className="text-xs">{card?.owner?.name}</article>
          <article className="text-[8px] opacity-50">{card?.type}</article>
        </div>
      </div>
      <div className="relative rounded-md w-full lg:h-[375px] md:h-[230px] h-[190px] overflow-hidden">
        {card?.displayImage ? (
          <Image
            src={card?.displayImage}
            alt={card?.title}
            width={500}
            height={500}
            className="relative w-full h-full object-cover"
            onClick={() =>
              router.push(`/profile/myCards/card/${card?.serialNumber}`)
            }
          />
        ) : (
          <div className="w-full h-full bg-ternary flex justify-center items-center">
            <article>No Preview</article>
          </div>
        )}
      </div>
      <div className="relative w-full h-full mt-5">
        <article className="text-[10px] text-primary mb-1">
          {card?.serialNumber}
        </article>
        <article className="text-xs font-monumentUltraBold mb-2">
          {card?.title}
        </article>
        <div className="w-full flex justify-between items-center mt-4">
          {/* <article className="opacity-50 text-[10px] font-monumentRegular">
            Price Value ${card?.price}
          </article> */}
          <div className="flex justify-start items-center gap-2">
            <div className="flex justify-start items-center gap-2 p-2 bg-ternary rounded-md border-white border border-opacity-5">
        
              <SiOpenbadges size={14} /> <article className="text-[10px]">{card?.avatars?.length} Avatar</article>
            </div>
          </div>
          {card?.totalEnhancements > 0 && (
            <div className="relative">
              {card?.purchasedEnhancements}/{card?.totalEnhancements}
            </div>
          )}
        </div>

        {/* more options */}
        <div
          className="absolute top-0 right-0"
          onClick={(e) => e.preventDefault()}
        >
          <MenuOptions
            position="left"
            options={
              card?.totalEnhancements > 0
                ? [
                    {
                      id: "VIEW_CARD",
                      label: "View Card",
                      icon: <FaVrCardboard />,
                      iconPosition: "left",
                    },
                    {
                      id: "ENHANCE_CARD",
                      label: "Enhance Card",
                      icon: <SiOpenbadges />,
                      iconPosition: "left",
                    },
                    {
                      id: "LIST_IN_MARKET",
                      label: "Sell In Market",
                      icon: <RiSendPlane2Fill />,
                      iconPosition: "left",
                    },
                  ]
                : [
                    {
                      id: "VIEW_CARD",
                      label: "View Card",
                      icon: <FaVrCardboard />,
                      iconPosition: "left",
                    },
                    {
                      id: "LIST_IN_MARKET",
                      label: "Sell In Market",
                      icon: <RiSendPlane2Fill />,
                      iconPosition: "left",
                    },
                  ]
            }
            onSelect={(e) => handleNavigateMenu(e)}
          >
            <IoMdMore />
          </MenuOptions>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
