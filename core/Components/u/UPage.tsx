import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { callAPI } from "../../../lib/utils";
import UserAccountDetails from "./profile/UserAccountDetails";
import UCollections from "./UCollections";
import UPosts from "./UPosts";
import UTribes from "./UTribes";

let tabs = [
  {
    label: "Collected",
    id: "collected",
  },
  {
    label: "Posts",
    id: "posts",
  },
  {
    label: "Tribes",
    id: "tribes",
  },
];
const UPage = ({ makeSelectedTab, username }) => {
 
  const [selectedTab, setSelectedTab] = useState(makeSelectedTab);
  // const [bottomReached, setBottomReached] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileDataLoading, setProfileDataLoading] = useState(false);
  const router = useRouter();

  const handleFetchProfileData = async ({ username }) => {
    setProfileDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/user/${username}`,
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

  useEffect(() => {
    console.log({ makeSelectedTab });
    if (makeSelectedTab) {
      setSelectedTab(makeSelectedTab);
    }
  }, [makeSelectedTab]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.innerHeight + window.scrollY;
  //     const pageHeight = document.documentElement.offsetHeight;

  //     if (scrollPosition >= pageHeight) {
  //       setBottomReached(true);
  //     } else {
  //       setBottomReached(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Tabs Screen
  const TabScreens = () => {
    switch (selectedTab) {
      case "collected":
        return <UCollections sectionActive={true} username={username}/>;
      case "posts":
        return <UPosts username={username}/>;
      case "tribes":
        return <UTribes username={username}  />;
    }
  };

  return (
    <div className="relative w-full min-h-screen z-0">
      <UserAccountDetails profileData={profileData} profileDataLoading={profileDataLoading}/>
      {/* Tabs & Content */}
      <div className="relative w-full md:px-10 px-5 pt-5">
        {/* Tabs */}
        <div className="  flex justify-start items-center gap-2">
          {tabs?.map((tab, index) => {
            return (
              <div
                className="relative"
                onClick={() =>
                  router.push(`/p/${router.query.username}/${tab?.id}#${tab?.id}`)
                }
              >
                <button
                  className={`py-4 px-4  font-inter text-[16px] font-semibold  transition-all duration-300 cursor-pointer rounded-lg text-white bg-white ${
                    selectedTab == tab.id
                      ? "text-opacity-100 bg-opacity-10 border-opacity-10 "
                      : "text-opacity-60 hover:text-opacity-80 bg-opacity-0 border-opacity-0"
                  }`}
                >
                  {tab?.label}
                </button>
              </div>
            );
          })}
        </div>
        {/* Divider */}
        <div
          className={`relative w-full h-[1px] bg-white bg-opacity-10 transition-all duration-300  ${
           true ? " opacity-100" : "  opacity-0"
          } mt-5 mb-2`}
        />
      </div>
      {/* Content */}
      <div className="relative w-full ">
        <TabScreens />
      </div>
    </div>
  );
};

export default UPage;
