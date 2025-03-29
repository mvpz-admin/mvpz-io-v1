import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import {
  FaHandHoldingUsd,
  FaInstagram,
  FaShare,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { IoIdCard } from "react-icons/io5";
import { TribesHomeTabs } from "../../../utils/global/global";
import TAll from "./TAthletes";
import { useRouter } from "next/router";
import { callAPI } from "../../../lib/utils";
import { formatNumber } from "../../../utils/global/formating";
import TProfileBar from "./TProfileBar";
import Skeleton from "../../Atoms/Others/Skeleton";
import TAthletes from "./TAthletes";
import TAthletesCard from "./TAll/TAthletesCard";

const TPage = ({ tribeId }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>(TribesHomeTabs[0].id);
  const [showMore, setShowMore] = useState(false);
  const [pageData, setPageData] = useState<any>();
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [pageError, setPageError] = useState(false); // TODO : Later change

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: `/v1/profiles/tribe/${tribeId}`,
      });

      setPageData(response?.data);
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false);
  };

  useEffect(() => {
    if (tribeId) {
      handleFetchPageData();
    }
  }, [tribeId]);

  const RenderComponents = () => {
    switch (selectedTab) {
      case "Athletes":
        return <TAthletes tribeId={tribeId} />;
      case "Media":
      case "Live":
      case "Challenge":
        return <TAll tribeId />;
    }
  };

  return (
    <TProfileBar
      pageData={pageData}
      tribeId={tribeId}
      pageDataLoading={pageDataLoading}
    >
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
          <div className="md:max-w-[75%] w-full mb-2">
            <article className="font-inter text-[14px] font-medium">
              {pageData?.tribe?.about?.length > 200
                ? showMore
                  ? pageData?.tribe?.about
                  : `${pageData?.tribe?.about?.substring(0, 200)}...`
                : pageData?.tribe?.about}{" "}
              {pageData?.tribe?.about?.length > 200 && (
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
        {!pageDataLoading && (
          <div className="flex justify-start items-center gap-3 text-primary ">
            <FaInstagram size={18} />
            <FaXTwitter size={18} />
            <FaTiktok size={18} />
          </div>
        )}
      </div>
      {/* Tabs */}
      <div className="relative w-full  md:px-10 px-5 flex flex-col justify-start items-start ">
        <div className="w-full overflow-x-auto whitespace-nowrap scroller-hidden">
          <div className="flex justify-start items-center gap-2">
            {TribesHomeTabs.map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-center px-4 py-2 rounded-full bg-white ${
                  item?.id == selectedTab ? "bg-opacity-20" : "bg-opacity-0"
                } hover:bg-opacity-10 border border-white border-opacity-0 font-inter font-semibold cursor-pointer text-sm`}
                onClick={() => setSelectedTab(item?.id)}
              >
                {item.label}
              </div>
            ))}
            <div
              className={`flex justify-center px-4 py-2 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 border border-white border-opacity-0 font-inter font-semibold cursor-pointer text-sm`}
              onClick={() => router.push(`/t/${tribeId}/challenges`)}
            >
              Challenges
            </div>
            <div
              className={`flex justify-center px-4 py-2 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 border border-white border-opacity-0 font-inter font-semibold cursor-pointer text-sm`}
              onClick={() => router.push(`/t/${tribeId}/utilities`)}
            >
              Utilities
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      {/* {RenderComponents()} */}
      <TAthletesCard
        athletes={pageData?.tribe?.athletes}
        loading={pageDataLoading}
      />
    </TProfileBar>
  );
};

export default TPage;
