import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { formatNumber } from "../../../../utils/global/formating";
import { IoIdCard } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { FaCheck, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Skeleton from "../../../Atoms/Others/Skeleton";
import { callAPI } from "../../../../lib/utils";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useRouter } from "next/router";

const UserAccountDetails = ({ profileData, profileDataLoading }) => {
  const [showMore, setShowMore] = useState(false);
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
  return (
    <>
      {/* container */}
      <div className="relative w-full md:h-[400px] h-[250px] z-0">
        {/* Bg Image */}
        <div className="absolute top-0 left-0 w-full h-full bg-ternary z-0">
          {profileData?.bannerImage && (
            <Image
              src={profileData?.bannerImage}
              alt="bgimage"
              width={1000}
              height={1000}
              className="relative w-full h-full object-cover "
            />
          )}
        </div>
      </div>
      <div className="relative w-full md:px-10 px-5">
        <div className="relative w-[150px] h-[150px] border-2 border-black bg-black  rounded-full p-[2px] -mt-[100px]">
          <div className="relative w-full h-full bg-secondary rounded-full">
            {profileData?.profileImage && (
              <Image
                src={profileData?.profileImage}
                alt="bg"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full"
              />
            )}
          </div>
        </div>
        <div className=" w-full flex md:flex-row flex-col md:justify-between md:items-end">
          {/* left Section */}
          <div className="flex  justify-start items-center gap-5">
            <div className="flex flex-col justify-center items-start mt-4 ">
              {profileDataLoading ? (
                <Skeleton
                  className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <span className="text-[14px] font-inter">
                  {profileData?.username}
                </span>
              )}
              {profileDataLoading ? (
                <Skeleton
                  className={`bg-secondary w-[250px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="text-2xl font-inter font-semibold">
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
              <div className="flex justify-start items-center gap-4 font-inter text-[12px] font-bold">
                {profileDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex justify-start gap-2">
                    <span>{formatNumber(profileData?._count?.followers)}</span>
                    <span className="font-semibold opacity-50">Followers</span>
                  </div>
                )}
                {profileDataLoading ? (
                  <Skeleton
                    className={`bg-secondary  w-[50px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex justify-start gap-2">
                    <span>{formatNumber(profileData?._count?.following)}</span>
                    <span className="font-semibold opacity-50">Following</span>
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
            {user?.username !== profileData?.username ? (
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
              ) : 
              <div
                      className="flex justify-center items-center  gap-2 px-3 py-2 border border-white border-opacity-20 rounded-lg backdrop-blur-md font-inter font-bold md:text-base text-sm cursor-pointer"
                      
                    >
                      Edit Profile
                    </div>}
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
                  <IoIdCard size={22} onClick={() => router.push(`/p/${profileData?.username}/profilecard`)}/>
                  <IoMdMore size={22} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Athlete More Info */}
      <div className="relative w-full  md:px-10 px-5 md:py-5 py-0">
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
          <div className="flex justify-start items-center gap-3 text-primary mt-2 ">
            <FaInstagram size={18} />
            <FaXTwitter size={18} />
            <FaTiktok size={18} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserAccountDetails;
