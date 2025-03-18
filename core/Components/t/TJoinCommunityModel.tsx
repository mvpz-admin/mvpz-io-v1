import Image from "next/image";
import React, { useState } from "react";
import Skeleton from "../../Atoms/Others/Skeleton";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { formatNumber } from "../../../utils/global/formating";
import { IoIdCard } from "react-icons/io5";
import { FaInstagram, FaShare, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  useGlobalPageLoading,
  useLoginProcessStore,
} from "../../../store/useGlobalStore";
import { callAPI } from "../../../lib/utils";
import { useAuthStore } from "../../../store/useAuthStore";
import { useRouter } from "next/router";
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";

const TJoinCommunityModel = ({ pageDataLoading, pageData, tribeId }) => {
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const [joiningLoading, setJoiningLoading] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.user)?.token;
  const router = useRouter();

  const handleToggleJoin = async () => {
    if (isLoggedIn) {
      setJoiningLoading(true);
      try {
        let response = await callAPI({
          endpoint: `/v1/profiles/tribe/${tribeId}/join`,
          method: "PUT",
        });

        if (response?.success) {
          router.reload();
        }
      } catch (error) {
        console.log({ error });
      }
      setJoiningLoading(false);
    } else {
      setOpenLoginModel();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="relative md:w-[800px] h-screen md:h-[600px] w-full md:rounded-xl md:border border-white border-opacity-20 bg-secondary overflow-hidden overflow-y-auto">
        {/* Banner */}
        <div className="absolute top-0 left-0 w-full h-[250px] bg-ternary z-0">
          {!pageDataLoading && (
            <Image
              src={pageData?.tribe?.tribeHorizontalBanner}
              alt="bgimage"
              width={1000}
              height={1000}
              className="relative w-full h-full object-cover"
            />
          )}
        </div>
        {/* Bglayer */}
        <div className="absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-transparent to-[#111] z-5 flex flex-col justify-end items-start space-y-5"></div>
        {/* content */}
        <div className="absolute top-0 left-0 w-full z-10 pt-28 space-y-10">
          <div className="md:px-10 px-5   gap-5 w-full flex md:flex-row flex-col md:justify-between md:items-end">
            {/* left Section */}
            <div className="flex flex-col justify-start items-start gap-2">
              <div
                className={`relative w-[100px] h-[100px] border-2 border-white ${
                  pageDataLoading ? "border-opacity-20" : "border-opacity-100"
                } rounded-lg p-[2p`}
              >
                <div className="relative w-full h-full bg-ternary rounded-lg overflow-hidden">
                  {!pageDataLoading && (
                    <Image
                      src={pageData?.tribe?.tribeLogo}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover rounded-lg scale-150"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center items-start mt-4 ">
                {pageDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex  justify-start items-center">
                    <article className="text-2xl font-inter font-semibold">
                      {pageData?.tribe?.tribeShortName}
                    </article>
                    <BsFillPatchCheckFill
                      size={18}
                      className="text-indigo-500 ml-1"
                    />
                  </div>
                )}
                {pageDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[250px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <span className="text-[14px] font-inter">
                    {pageData?.tribe?.tribeName}
                  </span>
                )}
                <div className="flex justify-start items-center gap-4 font-inter text-[12px] font-bold">
                  <div className="flex justify-start gap-2">
                    {pageDataLoading ? (
                      <>
                        <Skeleton
                          className={`bg-secondary w-[18px] h-[18px] rounded-md mb-1`}
                        />
                        <Skeleton
                          className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                        />
                      </>
                    ) : (
                      <>
                        <span>
                          {formatNumber(pageData?.tribe?._count?.members)}
                        </span>
                        <span className="font-semibold opacity-50">
                          Members
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* right section */}
            <div className="flex md:flex-row flex-row-reverse md:justify-end justify-between items-center pb-8 ">
              <div className="flex justify-end items-center gap-4 ">
                {/* Join & Leave  */}
                {pageDataLoading ? (
                  <Skeleton
                    className={`bg-secondary  w-[100px] h-[40px] rounded-md mb-1`}
                  />
                ) : (
                  <div
                    className={`flex justify-center items-center px-3 py-2 border border-white border-opacity-10 rounded-lg backdrop-blur-md font-inter font-bold cursor-pointer text-[14px] bg-transparent`}
                    onClick={() => handleToggleJoin()}
                  >
                    Join Tribe
                  </div>
                )}
              </div>
              <div className="md:block hidden w-[1px] h-[25px] bg-white bg-opacity-40 mx-8" />
              {/* more optios */}
              <div className="flex md:flex-row flex-row-reverse justify-end items-center gap-5">
                {pageDataLoading ? (
                  <>
                    <Skeleton
                      className={`bg-secondary  w-[40px] h-[40px] rounded-md mb-1`}
                    />
                    <Skeleton
                      className={`bg-secondary  w-[40px] h-[40px] rounded-md mb-1`}
                    />
                    <Skeleton
                      className={`bg-secondary  w-[40px] h-[40px] rounded-md mb-1`}
                    />
                  </>
                ) : (
                  <>
                    <IoIdCard size={22} />
                    <FaShare size={22} />
                  </>
                )}
              </div>
            </div>
          </div>
          {/* /* Athlete More Info  */}
          <div className="relative w-full  md:px-10 px-5 ">
            {pageDataLoading ? (
              <>
                <Skeleton
                  className={`bg-secondary w-[500px] h-[18px] rounded-md mb-1`}
                />
                <Skeleton
                  className={`bg-secondary w-[200px] h-[18px] rounded-md mb-1`}
                />
              </>
            ) : (
              <div className=" w-full mb-2">
                <article className="font-inter text-[14px] font-medium">
                  {pageData?.tribe?.about}
                </article>
              </div>
            )}
            {!pageDataLoading && (
              <div className="flex justify-start items-center gap-3 text-primary ">
                <FaInstagram size={18} />
                <FaXTwitter size={18} />
                <FaTiktok size={18} />
              </div>
            )}
          </div>
        </div>
        {/* Loading Var */}
        {joiningLoading && (
          <>
            <div className="absolute top-0 left-0 w-full z-50">
              <LineLoadingEffect />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TJoinCommunityModel;
