import Image from "next/image";
import { useRouter } from "next/router";
import Skeleton from "../../../Atoms/Others/Skeleton";
import { FaHistory } from "react-icons/fa";
import { useState } from "react";

export const DisplayCard = ({ card, loading, type }) => {
  const router = useRouter();
  const username = router.query.username;
  return (
    card.cardImage && <div
      className="relative w-full h-[375px] bg-secondary rounded-lg overflow-hidden border border-white border-opacity-10"
      onClick={() =>
        router.push(`/a/${username}/collected/${card?.id}`)
      }
    >
      {/* bgImage */}
      {!loading && (
        <div className="absolute top-0 left-0 w-full h-full">
          {card && (
            <Image
              src={card.cardImage}
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
        <div className="w-full  bg-black bg-opacity-10 backdrop-blur-md ">
          <div className="flex justify-start items-center gap-2 p-4">
            <div className="flex flex-col justify-center items-start ">
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[125px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="text-[10px] font-inter ">
                    #{card?.avatar?.title}
                  </article>
                </div>
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
        </div>
      </div>

     {/* {!loading && <div className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-transparent  flex justify-between items-center p-5">
      
        <div className="flex justify-start items-center">
          <article className=" font-monumentUltraBold font-semibold">
            {card?.count}x
          </article>
        </div>
       
      </div>} */}
    </div>
  );
};
