import React, { useEffect, useState } from "react";
import FanzoneLayout from "../../core/Layout/FanzoneLayout";
import Image from "next/image";
import CustomizeShouts from "../../core/Components/Fanzone/CustomizeShouts";
import Post from "../../core/Components/Fanzone/Post";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { callAPI } from "../../lib/utils";
import { Skeleton } from "@mantine/core";
import WhatsHapping from "../../core/Components/Fanzone/WhatsHapping";
import { useFeedStore } from "../../store/useOtherStore";

const Fanzone = () => {
  const router = useRouter();
  const [pageData, setPageData] = useState<any>();
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [feedDataLoading, setFeedDataLoading] = useState(false);
  const [feedMoreDataLoading, setFeedMoreDataLoading] = useState(false);
  const [pageError, setPageError] = useState(false); // TODO : Later change
  const [page, setPage] = useState(0);
  const [bottomReached, setBottomReached] = useState(false);

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: "/v1/fanzone/home",
      });

      setPageData(response?.data);
      setPage(1);
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false);
  };

  useEffect(() => {
    if (router?.pathname && pageData?.posts?.length == 0) handleFetchPageData();
  }, [router.pathname]);



  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.offsetHeight;

      if (scrollPosition >= pageHeight) {
        setBottomReached(true);
      } else {
        setBottomReached(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (bottomReached) {
      handleFetchPageData();
    }
  }, [bottomReached]);

  useEffect(() => {
    handleFetchPageData();
  }, [router.pathname]);

  return (
    <FanzoneLayout>
      <div className="relative w-full min-h-screen">
        {/* bg-gradient */}
        <div className="absolute w-full h-[450px] z-0">
          <div className="absolute top-0 left-0 w-full h-full z-0 transition-all duration-500">
            <Image
              src={
                "https://res.cloudinary.com/dv667zlni/image/upload/v1740160244/3_qnjkg3.png"
              }
              alt="bg"
              width={500}
              height={500}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 opacity-50`}
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full z-5 bg-gradient-to-b from-transparent to-black"></div>
        </div>
        {/* bg-blur */}
        <div className="absolute top-0 left-0 w-full h-full z-5 backdrop-blur-3xl lg:px-10 md:px-5 px-2 py-5 md:pt-[125px] overflow-y-auto space-y-10 ">
          <div className="sticky top-0 w-full flex gap-10 ">
            <div className="w-full lg:flex-[0.6]  h-full space-y-5 pb-10">
              <Feed
                pageData={pageData?.shouts}
                pageDataLoading={pageDataLoading || feedDataLoading}
                feedMoreDataLoading={feedMoreDataLoading}
                handleReFetchFetchFeedData={handleFetchPageData}
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
      </div>
    </FanzoneLayout>
  );
};

const TeamStripe = ({ team, loading }) => {
  const router = useRouter();
  return (
    <div
      className={`relative p-2 bg-white bg-opacity-5 ${
        !loading ? "hover:bg-opacity-10" : "hover:bg-opacity-5"
      } transition-all duration-300 cursor-pointer  rounded-lg flex justify-between items-center gap-2`}
      onClick={() => router.push(`/t/${team?.tribeId}`)}
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
  const router = useRouter();
  return (
    <div className="w-full flex flex-col h-full rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-5 space-y-4 p-5">
      {/* title */}
      <div className="relative w-full flex justify-between items-center">
        <article className="font-inter font-semibold ">Join Teams</article>
        <div
          className="px-3 py-2 border border-white border-opacity-10 bg-white bg-opacity-5 text-[10px] font-inter font-semibold cursor-pointer rounded-lg"
          onClick={() => router.push(`/tribes`)}
        >
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
      {pageDataLoading
        ? Array(10)
            ?.fill(0)
            ?.map((_, idx) => {
              return (
                <Post
                  postType={"shoutpost"}
                  post={_}
                  loading={pageDataLoading}
                  key={idx}
                />
              );
            })
        : feed?.map((post, idx) => {
            return (
              <Post
                postType={"shoutpost"}
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
                postType={"shoutpost"}
                post={_}
                loading={feedMoreDataLoading}
                key={idx}
              />
            );
          })}
    </>
  );
};

export default Fanzone;
