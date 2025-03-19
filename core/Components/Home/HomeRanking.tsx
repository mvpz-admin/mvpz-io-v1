import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import ToggleSwitch from "../../Atoms/Inputs/ToggleSwitch";
import { HomePageLeaderboardTab } from "../../../utils/global/global";
import Skeleton from "../../Atoms/Others/Skeleton";
import { useRouter } from "next/router";

const profileImages = [
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241138/pexels-photo-2894292_la0tjc.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241136/pexels-photo-3705645_tiv7p5.jpg",
  "https://res.cloudinary.com/dv667zlni/image/upload/v1740241128/pexels-photo-2887774_g5kodl.jpg",
];

const ListTabel = ({ list, loading }) => {
  const ListRow = ({ row }) => {
    const [showCollections, setShowCollections] = useState(false);
    const router = useRouter()
    return (
      <div
        className={`w-full flex justify-between items-center rounded-lg border border-white border-opacity-0 ${
          !loading && "hover:border-opacity-10"
        } bg-white bg-opacity-0 ${
          !loading && " hover:bg-opacity-5"
        } transition-all duration-300 cursor-pointer p-3 `}
        key={10}
        onClick={() =>
          router.push(`/p/${row.username}`)
        }
      >
        <div className="flex-[0.1] md:flex hidden justify-start items-center">
          {loading ? (
            <Skeleton
              className={`bg-secondary w-[18px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <span className="font-inter font-semibold md:text-[14px] text-[12px]">
              {row?.rank}
            </span>
          )}
        </div>
        <div className="flex-[0.6] flex justify-start items-center gap-2">
          <div className="flex justify-start items-center gap-4">
            <div
              className={`relative w-[55px] h-[55px] ${
                loading ? "border-0" : "border-2"
              } border-white border-opacity-30 rounded-full p-[2px]`}
              onMouseEnter={() => !loading && setShowCollections(true)}
              onMouseLeave={() => !loading && setShowCollections(false)}
            >
              <div className="relative w-full h-full bg-secondary rounded-full">
                {!loading ? (
                  <Image
                    src={row?.profileImage}
                    alt="bg"
                    width={500}
                    height={500}
                    className="relative w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <Skeleton
                    className={`bg-white bg-opacity-10 w-full h-full rounded-full`}
                  />
                )}
              </div>
              {!loading && (
                <div
                  className={`${
                    showCollections ? "grid" : "hidden"
                  } absolute transition-all duration-300 bottom-[110%] w-[300px] h-[100px] grid grid-cols-3 gap-1 bg-secondary rounded-lg border border-white border-opacity-10 overflow-hidden`}
                >
                  <div className="w-full h-full border-r border-white border-opacity-5">
                    <Image
                      src={profileImages[0]}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover "
                    />
                  </div>
                  <div className="w-full h-full border-r border-white border-opacity-5">
                    <Image
                      src={profileImages[1]}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover "
                    />
                  </div>
                  <div className="w-full h-full ">
                    <Image
                      src={profileImages[2]}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover "
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center items-start ">
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <span className="text-[10px] font-inter">{row?.username}</span>
              )}
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="md:text-base text-xs font-inter font-semibold">
                    {row?.name}
                  </article>
                  {row?.isVerified && (
                    <BsFillPatchCheckFill
                      size={12}
                      className="text-indigo-500 ml-1"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-[0.2] flex justify-end items-center">
          {loading ? (
            <Skeleton
              className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <span className="font-inter font-semibold md:text-[14px] text-[12px]">
              {row?._count?.purchaseCards}
            </span>
          )}
        </div>
        <div className="flex-[0.2] flex justify-end items-center">
          {loading ? (
            <Skeleton
              className={`bg-secondary w-[60px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <span className="font-inter font-semibold md:text-[14px] text-[12px]">
              {row?.xp}XP
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full space-y-4">
      {/* header */}
      <div className="flex justify-between items-center gap-4 py-2 border-b border-white border-opacity-20 px-2 text-[12px] font-inter font-normal opacity-50">
        <div className="flex-[0.1] md:flex hidden justify-start items-center">
          <span>Rank</span>
        </div>
        <div className="flex-[0.6] flex justify-start items-center">
          <span>Name</span>
        </div>
        <div className="flex-[0.2] flex justify-end items-center">
          <span>Cards</span>
        </div>
        <div className="flex-[0.2] flex justify-end items-center">
          <span>XP</span>
        </div>
      </div>
      <div className="flex flex-col">
        {loading
          ? Array(5)
              .fill(0)
              ?.map((item, idx) => {
                return <ListRow key={idx} row={item} />;
              })
          : list?.map((item, idx) => {
              return <ListRow key={idx} row={item} />;
            })}
      </div>
    </div>
  );
};

const HomeRanking = ({ leaderboard, loading }) => {
  const [selectedTab, setSelectedTab] = useState<"TRENDING" | "TOP">(
    "TRENDING"
  );
  const [leaderList, setLeaderList] = useState(Array(10).fill(0));

  useEffect(() => {
    if (leaderboard) {
      {
        setSelectedTab("TRENDING"),
          setLeaderList(leaderboard?.trendingLeaderboard);
      }
    }
  }, [leaderboard]);

  useEffect(() => {
    if (selectedTab == "TRENDING") {
      setLeaderList(leaderboard?.trendingLeaderboard);
    } else if (selectedTab == "TOP") {
      setLeaderList(leaderboard?.topLeaderboard);
    }
  }, [selectedTab]);

  return (
    <div className="relative w-full space-y-4">
      {/* Tabs */}
      <div className="flex justify-between items-center">
        <div className="w-auto">
          <ToggleSwitch
            tabs={HomePageLeaderboardTab}
            onToggle={(tab) => setSelectedTab(tab)}
          />
        </div>

        {/* <div className="w-auto">
          <button
            className={`relative flex-1 px-4 py-3 md:text-sm text-xs font-semibold rounded-lg transition-all duration-300 text-white bg-white bg-opacity-10 hover:bg-opacity-20  `}
          >
            View All
          </button>
        </div> */}
      </div>
      {/* Leaderboard */}
      <div className="flex justify-start items-start gap-20">
        {/* Left Container */}
        <div className="md:flex-[0.5] flex-1 w-full relative">
          <ListTabel list={leaderList?.slice(0, 5)} loading={loading} />
        </div>
        {/* Right Container */}
        <div className="md:block hidden flex-[0.5] w-full relative">
          <ListTabel list={leaderList?.slice(5, 10)} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default HomeRanking;
