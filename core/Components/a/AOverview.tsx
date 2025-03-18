import Image from "next/image";
import React, { useEffect, useState } from "react";
import RoundProgressBar from "../../Atoms/Inputs/RoundProgressBar";
import Biography from "./overview/Biography";
import Stats from "./overview/Stats";
import Records from "./overview/Records";
import Matches from "./overview/Matches";
import News from "./overview/News";
import { callAPI } from "../../../lib/utils";
import { useRouter } from "next/router";
import { AthleteOverviewTabs } from "../../../utils/global/global";

const AOverview = ({ sectionActive, username }) => {
  const [profileData, setProfileData] = useState(null);
  const [profileDataLoading, setProfileDataLoading] = useState(false);

  const handleFetchProfileData = async ({ username }) => {
    setProfileDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/athlete/${username}/overview`,
    });

    if (response.success) {
      setProfileData(response?.data);
    }
    setProfileDataLoading(false);
  };

  useEffect(() => {
    if (username) {
      handleFetchProfileData({ username });
    }
  }, [username]);

  return (
    <div
      className={`relative flex flex-col w-full h-[75vh]  overflow-y-auto z-0 border-t border-white ${
        sectionActive ? "border-opacity-10" : "border-opacity-0"
      } space-y-4 pb-5 scroller-hidden`}
      id="overview"
    >
      {/* container */}
      <div className="relative w-full  bg-opacity-10  gap-5   z-0">
      <Biography
            profileData={profileData}
            profileDataLoading={profileDataLoading}
          />
        {/* 
        //Header 
        <div className="relative w-full h-full ">
         // header 
          <div className="relative w-full h-[400px] bg-secondary">
            // bgImage 
            <div className="absolute top-0 left-0 w-full h-full z-0">
             {profileData?.theme?.bgImage && <Image
                src={profileData?.theme?.bgImage}
                alt="bg"
                width={1000}
                height={1000}
                className="w-full h-full object-cover grayscale opacity-80"
              />}
            </div>
            //layer 
            <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-black to-transparent " />
            //container
            <div className=" absolute top-20 left-0 w-full h-full z-20 space-y-10">
              <Header profileData={profileData} profileDataLoading={profileDataLoading}/>
              <Content profileData={profileData} profileDataLoading={profileDataLoading} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

const StatsProgess = ({
  title,
  subtitle,
  progressPer,
  progressTitle,
  progessValue,
  theme = "#EC1C24",
}) => {
  return (
    <div className="flex  justify-center items-center gap-4 ">
      {/* left */}
      <div className="relative">
        {/* bar */}
        <RoundProgressBar
          progress={progressPer}
          size={65}
          strokeWidth={6}
          color={theme}
        />
        {/* content  */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center ">
          <span className="text-[14px] font-inter font-bold">
            {progessValue}
          </span>
          <span className="text-[8px] font-inter opacity-80 uppercase">
            {progressTitle}
          </span>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col justify-center items-start ">
        <span className="text-[10px] font-semibold font-inter opacity-80 uppercase">
          {title}
        </span>
        <span className="text-[12px] font-inter font-bold uppercase">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

const Header = ({ profileData, profileDataLoading }) => {
  return (
    <>
      <div className="relative w-full  flex justify-center items-end gap-10 ">
        <div className="relative w-[400px] ">
          {profileData?.tpProfileImage && (
            <Image
              src={profileData?.tpProfileImage}
              alt="bg"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="relative w-full flex-1 h-full flex flex-col justify-end items-start ">
          {/* name */}
          <div className="relative w-full mb-5">
            <article className="text-4xl relative text-white">
              {profileData?.name?.firstName}
            </article>
            <article
              className="text-6xl relative"
              style={{
                color: profileData?.theme?.color,
              }}
            >
              {profileData?.name?.lastName}
            </article>
          </div>
          <div className="relative w-full space-y-5  mb-10">
            {/* row 1 */}
            <div className="flex justify-start items-center gap-10">
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Height
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.height}
                </span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Weight
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.weight}
                </span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Age
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.age}
                </span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Birthday
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.dob}
                </span>
              </div>
            </div>
            {/* row 2 */}
            <div className="flex justify-start items-center gap-10">
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Current League
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.currentLeague}
                </span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Current Team
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.currentTeam}
                </span>
              </div>
            </div>
            {/* row 3 */}
            <div className="flex justify-start items-center gap-10">
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Sports
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.primarySport}
                </span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Current Position
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.primaryPosition}
                </span>
              </div>
              <div className="flex flex-col justify-center items-start ">
                <span className="text-[12px] font-inter opacity-80 uppercase">
                  Nationality
                </span>
                <span className="text-[16px] font-inter font-bold">
                  {profileData?.nationality}
                </span>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="relative w-full flex justify-start items-center gap-10 ">
            <StatsProgess
              progressPer={100}
              progessValue={23.2}
              progressTitle={"AVG"}
              title={"POINTS"}
              subtitle={"PER GAME"}
              theme={profileData?.theme?.color}
            />
            <StatsProgess
              progressPer={80}
              progessValue={7.2}
              progressTitle={"AVG"}
              title={"ASSISTS"}
              subtitle={"PER GAME"}
              theme={profileData?.theme?.color}
            />
            <StatsProgess
              progressPer={55}
              progessValue={3.7}
              progressTitle={"AVG"}
              title={"REBOUND"}
              subtitle={"PER GAME"}
              theme={profileData?.theme?.color}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Content = ({ profileData, profileDataLoading }) => {
  const [selectedTab, setSelectedTab] = useState(AthleteOverviewTabs[0]?.id);

  const TabsContent = () => {
    switch (selectedTab) {
      case "BIOGRAPHY":
        return (
          <Biography
            profileData={profileData}
            profileDataLoading={profileDataLoading}
          />
        );
      case "STATS":
        return <Stats />;
      case "RECORDS":
        return <Records />;
      case "MATCHES":
        return <Matches />;
      case "NEWS":
        return <News />;
    }
  };
  return (
    <div className="relative w-full  ">
      {/* Tabs */}
      <div className="sticky top-0 w-full overflow-x-auto whitespace-nowrap scroller-hidden z-10  py-5 bg-black border-b border-white border-opacity-20">
        <div className="flex justify-start items-center gap-4 ">
          {AthleteOverviewTabs?.map((tab, idx) => {
            return (
              <div
                key={idx}
                className={`flex justify-center px-4 py-2 rounded-full bg-white ${
                  selectedTab == tab?.id ? "bg-opacity-20" : "bg-opacity-0"
                } hover:bg-opacity-10 border border-white border-opacity-0 font-inter font-semibold cursor-pointer text-sm`}
                onClick={() => setSelectedTab(tab?.id)}
              >
                {tab.label}
              </div>
            );
          })}
        </div>
      </div>
      {/* Content */}
      <div className="w-full relative z-0 mt-10 min-h-[75vh] pb-10">
        {TabsContent()}
      </div>
    </div>
  );
};

export default AOverview;
