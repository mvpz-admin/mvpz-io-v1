import React, { useEffect, useState } from "react";
import CustomizeShouts from "../Fanzone/CustomizeShouts";
import { callAPI } from "../../../lib/utils";
import Image from "next/image";
import Skeleton from "../../Atoms/Others/Skeleton";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useFeedStore } from "../../../store/useOtherStore";
import WhatsHapping from "../Fanzone/WhatsHapping";
import Post from "../Fanzone/Post";

const TCommunity = ({ tribeId }) => {
  const [pageData, setPageData] = useState<any>();
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [pageError, setPageError] = useState(false); // TODO : Later change

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    setPageData({})
    try {
      let response = await callAPI({
        endpoint: `/v1/fanzone/tribe/${tribeId}`,
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
  return (
    <div className="relativew-full h-full z-5 backdrop-blur-3xl lg:px-10 md:px-5 px-2   overflow-y-auto space-y-10 ">
      <CustomizeShouts loading={pageDataLoading} data={pageData?.shouts} />
      <div className="sticky top-0 w-full flex gap-10 ">
        <div className="w-full lg:flex-[0.6]  h-full space-y-5 pb-10">
          <Feed
            pageData={pageData?.posts}
            pageDataLoading={pageDataLoading }
            feedMoreDataLoading={false}
            handleReFetchFetchFeedData={() => {}}
          />
        </div>
        <div className="sticky top-0 w-full lg:flex-[0.4] lg:block hidden  h-screen overflow-y-auto space-y-4">
          <RelatedTribes
            pageData={pageData}
            pageDataLoading={pageDataLoading}
          />
        </div>
      </div>
    </div>
  );
};

const TeamStripe = ({ team, loading }) => {
  return (
    <div
      className={`relative p-2 bg-white bg-opacity-5 ${
        !loading ? "hover:bg-opacity-10" : "hover:bg-opacity-5"
      } transition-all duration-300 cursor-pointer  rounded-lg flex justify-between items-center gap-2`}
    >
      <div className="flex justify-start items-center gap-2">
        <div
          className={`relative w-[55px] h-[55px] ${
            loading ? "border-0" : "border-2"
          } border-white border-opacity-30 rounded-full p-[2px]`}
        >
          <div className="relative w-full h-full bg-secondary rounded-full overflow-hidden">
            {!loading ? (
              <Image
                src={team?.tribeLogo}
                alt="bg"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full scale-150"
              />
            ) : (
              <Skeleton
                className={`bg-white bg-opacity-10 w-full h-full rounded-full`}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-start ">
          {loading ? (
            <Skeleton
              className={`bg-white bg-opacity-5 w-[100px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <div className="flex  justify-start items-center">
              <article className="text-sm font-inter font-semibold flex items-center">
                {team?.tribeShortName}
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              </article>
            </div>
          )}

          {loading ? (
            <Skeleton
              className={`bg-white bg-opacity-5 w-[150px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <span className="text-[10px] font-inter">
              {team?._count?.members} Members
            </span>
          )}
        </div>
      </div>
      {!loading && (
        <div className="px-3 py-2 border border-white border-opacity-10 bg-primary bg-opacity-5 text-[10px] font-inter font-semibold cursor-pointer rounded-lg">
          + Join
        </div>
      )}
    </div>
  );
};

const RelatedTribes = ({ pageDataLoading, pageData }) => {
  return (
    <div className="w-full flex flex-col h-full rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-5 space-y-4 p-5">
      {/* title */}
      <div className="relative w-full flex justify-between items-center">
        <article className="font-inter font-semibold ">Join Teams</article>
        <div className="px-3 py-2 border border-white border-opacity-10 bg-white bg-opacity-5 text-[10px] font-inter font-semibold cursor-pointer rounded-lg">
          See More
        </div>
      </div>
      <div className="flex-1 w-full h-full overflow-y-auto scroller-hidden space-y-2 ">
        {pageDataLoading
          ? Array(10)
              .fill(0)
              ?.map((_, idx) => {
                return (
                  <TeamStripe team={_} key={idx} loading={pageDataLoading} />
                );
              })
          : pageData?.tribes?.map((team, idx) => {
              return (
                <TeamStripe team={team} key={idx} loading={pageDataLoading} />
              );
            })}
      </div>
    </div>
  );
};

const Feed = ({
  pageDataLoading,
  pageData,
  handleReFetchFetchFeedData,
  feedMoreDataLoading,
}) => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    if (pageData?.length > 0) {
      setFeed(pageData);
    }
  }, [pageData]);

  const { publicFeed } = useFeedStore((state) => state);

  useEffect(() => {
    if (publicFeed) {
      handleReFetchFetchFeedData();
    }
  }, [publicFeed]);

  return (
    <>
      <WhatsHapping loading={pageDataLoading} />
      {pageDataLoading
        ? Array(10)
            ?.fill(0)
            ?.map((_, idx) => {
              return (
                <Post
                  postType={"tribepost"}
                  post={_}
                  loading={pageDataLoading}
                  key={idx}
                />
              );
            })
        : feed?.map((post, idx) => {
            return (
              <Post
                postType={"tribepost"}
                post={post}
                loading={pageDataLoading}
                key={idx}
              />
            );
          })}
      {feedMoreDataLoading &&
        Array(10)
          ?.fill(0)
          ?.map((_, idx) => {
            return (
              <Post
                postType={"tribepost"}
                post={_}
                loading={feedMoreDataLoading}
                key={idx}
              />
            );
          })}
    </>
  );
};

export default TCommunity;
