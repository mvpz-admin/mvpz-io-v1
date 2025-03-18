import Image from "next/image";
import React from "react";
import MenuOptions from "../../Atoms/Others/MenuOption";
import { FaBagShopping } from "react-icons/fa6";
import { FaHeart, FaUser, FaVrCardboard } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { useRouter } from "next/router";


const MarketCards = ({ card }) => {
  const router = useRouter();

  const handleNavigateMenu = (e) => {
    switch (e.id) {
      case "VIEW_CARD":
        return router.push(`/mvpz-market/card/${card?.id}?sellerId=${card?.sellerInfo?.id}`);
      case "SELLER_PROFILE":
        return router.push(`/fanzone/profile/user/${card?.sellerInfo?.username}`);
    }
  };

  return (
    <div className="w-full h-auto rounded-md md:p-5 p-2 bg-secondary border border-white border-opacity-5 cursor-pointer">
      {/* Form */}
      <div className="md:flex hidden  justify-start items-center mb-3 gap-2">
        <div className="w-10 h-10 rounded-full bg-ternary border border-white border-opacity-5 overflow-hidden">
          <Image
            src={card?.sellerInfo?.profileImage}
            alt={card?.sellerInfo?.name}
            width={500}
            height={500}
            className="relative w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="relative flex-1 w-full">
          <article className="text-xs">{card?.sellerInfo?.name}</article>
          <article className="text-[8px] opacity-50">
            {card?.sellerInfo?.username}
          </article>
        </div>
      </div>
      <Image
        src={card?.displayImage}
        alt={card?.title}
        width={500}
        height={500}
        className="relative rounded-md w-full lg:h-[375px] md:h-[230px] object-cover"
        onClick={() =>
          router.push(`/mvpz-market/card/${card?.id}?sellerId=${card?.sellerInfo?.id}`)
        }
      />
      <div className="relative w-full h-full mt-5">
        <article className="text-[10px] text-primary mb-1">
          {card?.sellerInfo?.name?.length > 15
            ? card?.sellerInfo?.name?.substring(0, 15) + "..."
            : card?.sellerInfo?.name}
        </article>
        <article className="text-xs font-monumentUltraBold mb-2">
          {card?.title?.length > 20
            ? card?.title?.substring(0, 20) + "..."
            : card?.title}
        </article>
        <div className="w-full flex justify-between items-center ">
          <article className="opacity-50 text-xs font-monumentRegular">
            Price ${card?.price}
          </article>
        </div>

        {/* more options */}
        <div
          className="absolute top-0 right-0"
          onClick={(e) => e.preventDefault()}
        >
          <MenuOptions
            options={[
              {
                id: "VIEW_CARD",
                label: "View Card",
                icon: <FaVrCardboard />,
                iconPosition: "left",
              },
              {
                id: "SELLER_PROFILE",
                label: "Seller Profile",
                icon: <FaUser />,
                iconPosition: "left",
              },
            ]}
            onSelect={(e) => handleNavigateMenu(e)}
          >
            <IoMdMore />
          </MenuOptions>
        </div>
      </div>
    </div>
  );
};

export default MarketCards;
