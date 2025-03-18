import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "../../../Atoms/Others/Skeleton";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { formatNumber } from "../../../../utils/global/formating";
import { IoIdCard } from "react-icons/io5";
import {
  FaCheck,
  FaHandHoldingUsd,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { useAuthStore } from "../../../../store/useAuthStore";
import {
  useGlobalPageLoading,
  useLoginProcessStore,
  usePostTipStore,
} from "../../../../store/useGlobalStore";
import { callAPI } from "../../../../lib/utils";
import MenuOptions from "../../../Atoms/Others/MenuOption";
import { useRouter } from "next/router";

const AthAccountDetails = ({ profileDataLoading, profileData }) => {
  const [showMore, setShowMore] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.user);
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const { setOpenTipModel } = usePostTipStore((state) => state);
  const [following, setFollowing] = useState(null);
  const { user } = useAuthStore((state) => state);
  const router = useRouter()

  const handleToggleFollow = async () => {
    setFollowing(!following);
    const response = await callAPI({
      endpoint: `/v1/profiles/user/${profileData?.username}/follow`,
      method: "PUT",
    });
    if (!response.success) {
      setFollowing(!following);
    }
  };

  useEffect(() => {
    if (profileData) {
      setFollowing(profileData?.userFollowing);
    }
  }, [profileData]);

  const handleOpenTipModel = async () => {
    if (isLoggedIn) {
      setOpenTipModel({
        postedBy: {
          id: profileData?.id,
          name: profileData?.name,
          profileImage: profileData?.profileImage,
          isVerified: profileData?.isVerified,
        },
        postFor: "athleteprofile",
      });
    } else {
      setOpenLoginModel();
    }
  };
  return (
    <>
      {/* container */}
      <div className="relative w-full md:h-[450px] h-[400px] z-0">
        {/* Bg Image */}
        <div className="absolute top-0 left-0 w-full h-full bg-ternary z-0">
          {!profileDataLoading && profileData?.bannerImage && (
            <Image
              src={profileData?.bannerImage}
              alt="bgimage"
              width={1000}
              height={1000}
              className="relative w-full h-full object-cover "
            />
          )}
        </div>
        {/* Bglayer */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-5 flex flex-col justify-end items-start">
          <div className="md:px-10 px-5 w-full flex md:flex-row flex-col md:justify-between md:items-end">
            {/* left Section */}
            <div className="flex md:flex-row flex-col  md:justify-start md:items-center md:gap-5 ">
              <div
                className={`relative md:w-[125px] w-[75px] md:h-[125px] h-[75px] ${
                  profileDataLoading ? "border-0" : "border-2"
                } border-white  md:rounded-full rounded-md p-[2px]`}
              >
                <div className="relative w-full h-full bg-secondary md:rounded-full rounded-md">
                  {!profileDataLoading && profileData?.profileImage && (
                    <Image
                      src={profileData?.profileImage}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover md:rounded-full rounded-md"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center items-start mt-4 ">
                {profileDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <span className="md:text-[14px] text-[12px] font-inter">
                    {profileData?.username}
                  </span>
                )}
                {profileDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[250px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex  justify-start items-center">
                    <article className="md:text-2xl text-xl font-inter font-semibold">
                      {profileData?.name}
                    </article>

                    {profileData?.isVerified && (
                      <BsFillPatchCheckFill
                        size={18}
                        className="text-indigo-500 ml-1"
                      />
                    )}
                  </div>
                )}
                <div
                  className={`flex justify-start items-center ${
                    profileData ? "gap-2 " : "gap-4"
                  } font-inter md:text-[12px] text-[12px] font-bold`}
                >
                  {profileDataLoading ? (
                    <Skeleton
                      className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                    />
                  ) : (
                    <div className="flex justify-start gap-2">
                      <span>
                        {formatNumber(profileData?._count?.followers)}
                      </span>
                      <span className="font-semibold md:opacity-50 opacity-75">
                        Followers
                      </span>
                    </div>
                  )}
                  {profileDataLoading ? (
                    <Skeleton
                      className={`bg-secondary  w-[50px] h-[18px] rounded-md mb-1`}
                    />
                  ) : (
                    <div className="flex justify-start gap-2">
                      <span>
                        {formatNumber(profileData?._count?.following)}
                      </span>
                      <span className="font-semibold md:opacity-50 opacity-75">
                        Following
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* divder only for mobile */}
            <div className="md:hidden block w-full h-[1px] bg-white bg-opacity-0 my-2" />
            {/* right section */}
            <div className="relative md:w-auto w-full flex md:justify-end justify-between md:items-center pb-8 ">
              {/* social media  */}
              {user?.username !== profileData?.username && (
                <>
                  {profileDataLoading ? (
                    <Skeleton
                      className={`bg-secondary  w-[100px] h-[40px] rounded-md mb-1`}
                    />
                  ) : (
                    <div
                      className="flex justify-center items-center  gap-2 px-3 py-2 border border-white border-opacity-10 rounded-lg backdrop-blur-md font-inter font-bold md:text-base text-sm cursor-pointer"
                      onClick={handleToggleFollow}
                    >
                      {following ? (
                        <>
                          <FaCheck size={14} /> Following
                        </>
                      ) : (
                        "Follow"
                      )}
                    </div>
                  )}
                </>
              )}
              <div className="md:block hidden w-[1px] h-[25px] bg-white bg-opacity-40 mx-8" />
              {/* more optios */}
              <div className="flex justify-end items-center gap-5">
                {profileDataLoading ? (
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
                    <IoIdCard className="md:text-[22px] text-[20px]" onClick={() => router.push(`/a/${profileData?.username}/profilecard`)}/>
                    {user?.username !== profileData?.username && (
                      <FaHandHoldingUsd
                        className="md:text-[22px] text-[20px] cursor-pointer"
                        onClick={handleOpenTipModel}
                      />
                    )}
                    <MenuOptions
                    position="left"
                      options={[
                        {
                          label: "Share",
                          id: "SHARE",
                        },
                      ]}
                      onSelect={() => {}}
                    >
                      <IoMdMore className="md:text-[22px] text-[20px]" />
                    </MenuOptions>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Athlete More Info */}

      <div className="relative w-full  md:px-10 px-5 py-5">
        {profileDataLoading ? (
          <Skeleton
            className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
          />
        ) : (
          <article className="text-[10px] font-inter font-semibold opacity-50 mb-1">
            Joined February 2021
          </article>
        )}
        {profileDataLoading ? (
          <>
            <Skeleton
              className={`bg-secondary w-[500px] h-[18px] rounded-md mb-1`}
            />
            <Skeleton
              className={`bg-secondary w-[200px] h-[18px] rounded-md mb-1`}
            />
          </>
        ) : (
          <>
            {profileData?.bio && (
              <div className="md:max-w-[75%] w-full mb-2">
                <article className="font-inter text-[14px] font-medium">
                  {profileData?.bio?.length > 200
                    ? showMore
                      ? profileData?.bio
                      : `${profileData?.bio?.substring(0, 200)}...`
                    : profileData?.bio}{" "}
                  {profileData?.bio?.length > 200 && (
                    <span
                      className="ml-2 font-bold text-primary cursor-pointer"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {!showMore ? "See More" : "See Less"}
                    </span>
                  )}
                </article>
              </div>
            )}
          </>
        )}
        {!profileDataLoading && (
          <div className="flex justify-start items-center gap-3 text-primary ">
            <>
              <FaInstagram size={18} />
              <FaXTwitter size={18} />
              <FaTiktok size={18} />
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default AthAccountDetails;
