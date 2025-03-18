import React, { useEffect, useState } from "react";
import ACollections from "./ACollections";
import { useRouter } from "next/router";
import AOverview from "./AOverview";
import ATribes from "./ATribes";
import { callAPI } from "../../../lib/utils";
import { AthletePTabs } from "../../../utils/global/global";
import AthAccountDetails from "./profile/AthAccountDetails";
import MobileModel from "../../Atoms/Models/MobileModel";
import AthCardDetails from "./card/AthCardDetails";
import { useCardDetailsStore } from "../../../store/useAthCollectionStore";
import AShouts from "./AShouts";

const APage = ({ makeSelectedTab, username }) => {
  const [selectedTab, setSelectedTab] = useState(makeSelectedTab);
  const [bottomReached, setBottomReached] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [profileDataLoading, setProfileDataLoading] = useState(false);
  const router = useRouter();
  const { cardId, setCardId } = useCardDetailsStore((state) => state);

  const handleFetchProfileData = async ({ username }) => {
    setProfileDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/athlete/${username}`,
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

  // Update selectedTab when the URL changes
  useEffect(() => {
    if (router.query.tab) {
      setSelectedTab(router.query.tab);
    }
  }, [router.query.tab]);

  useEffect(() => {
    if (makeSelectedTab) {
      setSelectedTab(makeSelectedTab);
    }
  }, [makeSelectedTab]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.offsetHeight;

      setBottomReached(scrollPosition >= pageHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tabs Screen
  const TabScreens = () => {
    switch (selectedTab) {
      case "overview":
        return <AOverview sectionActive={bottomReached} username={username} />;
      case "collections":
        return (
          <ACollections sectionActive={bottomReached} username={username} />
        );
      case "shouts":
        return <AShouts username={username} />;
      case "tribes":
        return <ATribes username={username} />;
      default:
        return <AOverview sectionActive={bottomReached} username={username} />;
    }
  };

  return (
    <>
      <div className="relative w-full min-h-screen z-0">
        {/* Account Details */}
        <AthAccountDetails
          profileData={profileData}
          profileDataLoading={profileDataLoading}
        />

        {/* Tabs & Content */}
        <div className="relative w-full md:px-10 px-2 pt-5">
          {/* Tabs */}
          <div className="w-full overflow-x-auto whitespace-nowrap scroller-hidden">
            <div className="flex justify-start items-center gap-2">
              {AthletePTabs?.map((tab, index) => (
                <div className="relative" key={index}>
                  <button
                    className={`py-4  px-4 font-inter md:text-[16px] text-[12px] md:font-semibold font-bold transition-all duration-300 cursor-pointer rounded-lg text-white bg-white ${
                      selectedTab === tab.id
                        ? "text-opacity-100 bg-opacity-10 border-opacity-10"
                        : "text-opacity-60 hover:text-opacity-80 bg-opacity-0 border-opacity-0"
                    }`}
                    onClick={() => {
                      setSelectedTab(tab.id); // Update local state
                      router.push(
                        `/a/${router.query.username}/${tab.id}#${tab.id}`,
                        undefined,
                        { shallow: true }
                      ); // Update URL without reload
                    }}
                  >
                    {tab?.label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className={`relative w-full h-[1px] bg-white bg-opacity-10 transition-all duration-300 ${
              !bottomReached ? "opacity-100" : "opacity-0"
            } md:mt-5 mt-4 mb-2`}
          />

          {/* Content */}
          <div className="relative w-full ">{TabScreens()}</div>
        </div>
      </div>
      <MobileModel
        isOpen={!!cardId}
        onClose={() => setCardId(null)}
        slideType="bottom-to-top"
        height="lg"
      >
        <AthCardDetails propCardId={cardId} model={true} />
      </MobileModel>
    </>
  );
};

export default APage;
