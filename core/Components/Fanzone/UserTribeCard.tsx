import Image from "next/image";
import React from "react";
import Skeleton from "../../Atoms/Others/Skeleton";
import { formatNumber } from "../../../utils/global/formating";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";

const UserTribeCard = ({ tribe, loading }) => {
  const router = useRouter();
  return (
    <div className="relative w-full  border border-white border-opacity-20 rounded-xl flex flex-col overflow-hidden pb-5">
      <div className="relative w-full  h-[250px] z-0">
        {/* Bg Image */}
        <div className="absolute top-0 left-0 w-full h-full bg-ternary z-0">
          {tribe?.tribeHorizontalBanner && (
            <Image
              src={tribe?.tribeHorizontalBanner}
              alt="bgimage"
              width={1000}
              height={1000}
              className="relative w-full h-full object-cover "
            />
          )}
        </div>
      </div>
      <div className="relative w-full  px-5 space-y-2">
        <div className="relative w-[100px] h-[100px] border-2 border-black bg-black  rounded-full p-[2px] -mt-[70px]">
          <div className="relative w-full h-full bg-secondary rounded-full">
            {tribe?.tribeLogo && (
              <Image
                src={tribe?.tribeLogo}
                alt="bg"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full"
              />
            )}
          </div>
        </div>
        <div className=" w-full flex md:flex-row flex-col md:justify-between md:items-end space-y-2">
          {/* left Section */}
          <div className="flex  justify-start items-center gap-5">
            <div className="flex flex-col justify-center items-start mt-4 ">
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <span className="text-[14px] font-inter">{tribe?.tribeId}</span>
              )}
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[250px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="text-2xl font-inter font-semibold">
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
                    className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex justify-start gap-2">
                    <span>{formatNumber(tribe?._count?.members)}</span>
                    <span className="font-semibold opacity-50">Members</span>
                  </div>
                )}
              </div>
            </div>
          </div>
         
        </div>
        
      </div>
    </div>
  );
};

export default UserTribeCard;
