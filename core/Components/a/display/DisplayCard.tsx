import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useBuyStore, useCartStore } from "../../../../store/useGlobalStore";
import { FaCheck } from "react-icons/fa";
import { Skeleton } from "@mantine/core";

export const DisplayCard = ({ card, loading, type }) => {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  const username = router.query.username;
  const { checkIdInCard, addToCart, removeFromCart } = useCartStore(
    (state) => state
  );
  const { addToBuy } = useBuyStore((state) => state);

  return (
    <div
      className="relative w-full h-[375px] bg-secondary rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => router.push(`/a/${username}/card/${card?.id}`)}
    >
      {/* bgImage */}
      {!loading && (
        <div className="absolute top-0 left-0 w-full h-full">
          {card?.nftImage && (
            <Image
              src={card?.nftImage}
              alt="bgimage"
              width={500}
              height={500}
              className={`relative w-full h-full object-cover rounded-lg  ${
                card?.isSoldOut && "grayscale"
              }`}
            />
          )}
        </div>
      )}
      {/* layer */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent flex flex-col justify-end items-center">
        {/* content */}
        <div className="w-full h-[105px] bg-black bg-opacity-10 backdrop-blur-md ">
          <div className="flex justify-start items-center gap-2 p-4">
            {type == "MobileDisplay" && type == "X2CardDisplay" && (
              <div className="relative w-[55px] h-[55px] border-2 border-white border-opacity-30 rounded-full p-[2px]">
                <div className="relative w-full h-full bg-secondary rounded-full">
                  {card?.tribe?.tribeLogo && (
                    <Image
                      src={card?.tribe?.tribeLogo}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center items-start ">
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <span className="text-[10px] font-inter">
                  {card?.tribe?.tribeShortName}
                </span>
              )}
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[125px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="text-sm font-inter font-semibold">
                    {card?.title}
                  </article>
                </div>
              )}
            </div>
          </div>
          <div
            className={`w-full transition-all duration-300 bg-white bg-opacity-5 flex-1   flex justify-center items-center text-[10px] py-[8px] font-inter font-bold`}
          >
            {!loading && <>${card?.price}</>}
          </div>
        </div>
        {/* Buy Button */}
        {!loading && (
          <div
            className={`absolute bottom-0 left-0 w-full h-[40px] bg-primary flex justify-start items-center transition-all duration-300 ${
              isHover && !card?.card?.isSoldOut
                ? "translate-y-0"
                : "translate-y-10"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              addToBuy({
                id: card.id,
                productType: "card",
                thumnail: card?.nftImage,
                title: card?.title,
                subtitle: card?.tribe?.tribeShortName,
                price: card?.price,
                isBaseReq: !card?.hasBaseCard,
              });
            }}
          >
            <div className="w-full h-full flex justify-center items-center">
              <article className="text-[10px]">Buy Now</article>
            </div>
          </div>
        )}
      </div>
      {/* Add To Card */}
      {!loading && (
        <>
          {!card?.isSoldOut && (isHover || checkIdInCard(card?.id)) && (
            <div
              className={`absolute top-2 right-2 h-10 w-10 rounded-full bg-primary flex justify-center items-center transition-all duration-300 `}
            >
              {!checkIdInCard(card?.id) ? (
                <div
                  className="relative h-10 w-10 rounded-full bg-primary flex justify-center items-center transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: card.id,
                      productType: "card",
                      thumnail: card?.nftImage,
                      title: card?.title,
                      subtitle: card?.tribe?.tribeShortName,
                      price: card?.price,
                      isBaseReq: !card?.hasBaseCard,
                    });
                  }}
                >
                  {" "}
                  <TiPlus size={20} className="text-white" />
                </div>
              ) : (
                <div
                  className="relative h-10 w-10 rounded-full bg-primary flex justify-center items-center transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(card.id);
                  }}
                >
                  <FaCheck size={20} className="text-white" />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
