import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { formatNumber } from "../../../utils/global/formating";
import { IoIdCard } from "react-icons/io5";
import { FaShare } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import Skeleton from "../../Atoms/Others/Skeleton";
import { useAuthStore } from "../../../store/useAuthStore";
import {
  useGlobalPageLoading,
  useLoginProcessStore,
} from "../../../store/useGlobalStore";
import { callAPI } from "../../../lib/utils";
import MenuOptions from "../../Atoms/Others/MenuOption";
import { useRouter } from "next/router";
import TJoinCommunityModel from "./TJoinCommunityModel";

const TProfileBar = ({
  children,
  tribeId,
  pageData,
  pageDataLoading,
  community = false,
}) => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.user)?.token;
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const [isMember, setIsMember] = useState(false);
  const [joiningLoading, setJoiningLoading] = useState(false);
  const { setPageLoading } = useGlobalPageLoading((state) => state);

  useEffect(() => {
    if (pageData) {
      setIsMember(pageData?.tribe?.isMember);
    }
  }, [pageData]);

  const handleToggleJoin = async () => {
    if (isLoggedIn) {
      setJoiningLoading(true);
      setPageLoading(true);
      try {
        let response = await callAPI({
          endpoint: `/v1/profiles/tribe/${tribeId}/join`,
          method: "PUT",
        });

        setIsMember(response?.data?.isMember);
      } catch (error) {
        console.log({ error });
      }
      setPageLoading(false);
      setJoiningLoading(false);
    } else {
      setOpenLoginModel();
    }
  };
  return (
    <div className={`relative w-full min-h-screen z-0`}>
      {/* container */}
      <div className="relative w-full h-[450px] z-0">
        {/* Bg Image */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#111] via-[#1f1f1f] to-[#2f2f2f] z-0">
          {!pageDataLoading &&pageData?.tribe?.tribeHorizontalBanner && (
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
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-5 flex flex-col justify-end items-start space-y-5"></div>

        {/* content */}
        <div className="absolute top-0 left-0 w-full z-10 pt-28 space-y-10">
          <div className="md:px-10 px-5  pt-28 gap-5 w-full flex md:flex-row flex-col md:justify-between md:items-end">
            {/* left Section */}
            <div className="flex flex-col justify-start items-start gap-2">
              <div
                className={`relative w-[100px] h-[100px] border-2 border-white ${
                  pageDataLoading ? "border-opacity-20" : "border-opacity-100"
                } rounded-lg p-[2p`}
              >
                <div className="relative w-full h-full bg-ternary rounded-lg overflow-hidden">
                  {!pageDataLoading && pageData?.tribe?.tribeLogo && (
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
                ) : isLoggedIn ? (
                  (community || !isMember) && (
                    <div
                      className={`flex justify-center items-center px-3 py-2 border border-white border-opacity-10 rounded-lg backdrop-blur-md font-inter font-bold cursor-pointer text-[14px] ${
                        isMember ? "bg-red-500 " : "bg-transparent"
                      }`}
                      onClick={() => !joiningLoading && handleToggleJoin()}
                    >
                      {!isMember ? "Join Tribe" : "Leave Tribe"}
                    </div>
                  )
                ) : (
                  <div
                    className={`flex justify-center items-center px-3 py-2 border border-white border-opacity-10 rounded-lg backdrop-blur-md font-inter font-bold cursor-pointer text-[14px] bg-transparent`}
                    onClick={() => setOpenLoginModel()}
                  >
                    Join Tribe
                  </div>
                )}
                {!pageDataLoading && !community && isMember && (
                  <div
                    className={`flex justify-center items-center px-3 py-2 border border-white border-opacity-10 rounded-lg backdrop-blur-md font-inter font-bold cursor-pointer text-[14px] bg-primary text-white`}
                    onClick={() => router.push(`/t/${tribeId}/community`)}
                  >
                    Go To Community
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
                    <MenuOptions
                      position="left"
                      onSelect={() => handleToggleJoin()}
                      options={[
                        {
                          label: "Leave Tribe",
                          id: "Leave Tribe",
                        },
                      ]}
                    >
                      <IoMdMore size={22} />
                    </MenuOptions>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* /* Children  */}
          {children}
          {/* model for community page to join tribe */}
        </div>
      {!pageDataLoading &&  <>
        {community && (!isLoggedIn || !isMember) && (
          <TJoinCommunityModel
            pageData={pageData}
            pageDataLoading={pageDataLoading}
            tribeId={tribeId}
          />
        )}
        </>}
      </div>
    </div>
  );
};

export default TProfileBar;
