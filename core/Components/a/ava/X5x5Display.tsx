import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Card = ({ card }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  return (
    <div
      className="relative w-full h-[350px] bg-secondary rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => router.push(`${window.location.pathname}/card/${card?.id}`)}
    >
      {/* bgImage */}
      <div className="absolute top-0 left-0 w-full h-full">
        {card?.nftImage && (
          <Image
            src={card?.nftImage}
            alt="bgimage"
            width={500}
            height={500}
            className="relative w-full h-full object-cover rounded-lg"
          />
        )}
      </div>
      {/* layer */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent flex flex-col justify-end items-center">
        {/* content */}
        <div className="w-full h-[100px] bg-black bg-opacity-10 backdrop-blur-md ">
          <div className="flex justify-start items-center gap-2 p-4">
            <div className="flex flex-col justify-center items-start ">
              <span className="text-[10px] font-inter">
                {card?.tribe?.tribeShortName}
              </span>
              <div className="flex  justify-start items-center">
                <article className="text-sm font-inter font-semibold">
                  {card?.title?.length > 20
                    ? `${card?.title?.substring(0, 20)}...`
                    : card?.title}
                </article>
              </div>
            </div>
          </div>
          <div
            className={`w-full transition-all duration-300 bg-white bg-opacity-5 flex-1   flex justify-center items-center text-[10px] py-[8px] font-inter font-bold`}
          >
            ${card?.price}.00
          </div>
        </div>
        {/* Buy Button */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[40px] bg-primary flex justify-start items-center transition-all duration-300 ${
            isHover ? "translate-y-0" : "translate-y-10"
          }`}
        >
          <div className="w-[80%] h-full flex justify-center items-center">
            <article className="text-[10px]">Buy Now</article>
          </div>
          <div className="h-full w-[1px] bg-white" />
          <div className="flex-1 w-full h-full flex justify-center items-center">
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};

const X5x5Display = ({ cards}) => {
  return (
    <div
      className={`relative w-full grid grid-cols-5 gap-5 p-5 h-full cursor-pointer`}
    >
      {cards?.map((card, idx) => (
        <Card card={card} key={idx} />
      ))}
    </div>
  );
};

export default X5x5Display;
