import Image from "next/image";
import React, { useEffect, useState } from "react";
import TribeAthleteCard from "../../../../core/Atoms/TribeCard/TribeAthleteCard";
import TribeVideoCard from "../../../../core/Atoms/TribeCard/TribeVideoCard";
import TribeMediaCard from "../../../../core/Atoms/TribeCard/TribeMediaCard";
import TribeEventCard from "../../../../core/Atoms/TribeCard/TribeEventCard";
import { useRouter } from "next/router";
import { callAPI } from "../../../../lib/utils";
import { Loader } from "@mantine/core";
import { getIcons } from "../../../../utils/getIcons";
import { useSession } from "next-auth/react";
import { PiCaretRight } from "react-icons/pi";
import { FaChevronLeft, FaShare } from "react-icons/fa";
import ModelVr_O from "../../../../core/Atoms/Models/ModelVr_O";
import SharePost from "../../../../core/Atoms/Feed/SharePost";
import useIsPWA from "../../../../utils/hooks/useIsPWA";
import TribeBanner from "../../../../core/Atoms/DeafualtBanners/TribeBanner";
import { useMediaQuery } from "@mantine/hooks";

const Index = () => {
  const router = useRouter();
  const [tribe, setTribe] = useState<any>();
  const [athletes, setAthletes] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [downloadImage, setDownloadImage] = useState<any>();
  const [pageLoading, setPageLoading] = useState(true);
  const [memberJoiningLoading, setMemberJoiningLoading] = useState(false);
  const { data: session } = useSession();
  const [openShareModel, setOpenShareModel] = useState(false);

  const [referral, setReferral] = useState(null);
  const largeScreen = useMediaQuery("(min-width: 60em)");

  const handleFetchTribe = async () => {
    setLoading(true);
    const respone = await callAPI({
      method: "POST",
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/tribe_details/${router.query?.name}`,
      body: {
        request: router?.query?.action && "follow",
      },
    });
    const referral = await callAPI({ endpoint: "/api/user/getReferralInvite" });
    if (respone) {
      setReferral(referral);
      setTribe(respone?.tribe);
      setAthletes(respone?.athleteUsers);
      setIsMember(respone?.isMember);
      setDownloadImage(respone?.imageDownload);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.query?.name) {
      handleFetchTribe();
    }
    setPageLoading(false);
  }, [router.query?.name]);

  // useEffect(() => {
  //   if (!session?.user) {
  //     router.push("/auth/signin");
  //   }

  //   setPageLoading(false);
  // }, [session]);

  const handleJoinCommunity = async () => {
    setMemberJoiningLoading(true);
    const response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/member/create`,
      method: "POST",
      body: {
        tribeId: tribe?.id,
      },
    });
    if (response) {
      setTimeout(() => {
        handleFetchTribe();
        setMemberJoiningLoading(false);
      }, 2000);
    }
  };

  const handleShare = () => {
    setOpenShareModel(true);
  };

  const Banner = () => {
    return (
      <div className="relative w-full h-auto ">
        {tribe?.tribeBanner ? (
          <Image
            src={tribe?.tribeBanner}
            alt="tribe name"
            title="tribe name"
            width={500}
            height={500}
            className="relative w-full md:h-[500px]  h-[300px] object-cover z-0 rounded-lg"
          />
        ) : (
          <TribeBanner
            primaryColor={tribe?.organisation?.primaryColorHex}
            secondaryColor={tribe?.organisation?.secondaryColorHex}
          />
        )}
        {/* gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black z-5"></div>
        {/* name */}
        <div className="absolute bottom-0 w-full flex flex-col justify-center items-center space-y-4">
          <article className=" md:text-2xl text-xl font-bold">
            {tribe?.tribeShortName}
          </article>
          <article className="md:text-xl text-sm max-w-[90%] mx-auto font-bold opacity-75 text-center">
            {tribe?.tribeName}
          </article>
        </div>
      </div>
    );
  };

  const Descriptions = () => {
    return (
      <div className="relative w-full py-10 space-y-5 ">
        <div className="w-full font-medium text-[10px] text-center">
          <article>{tribe?.about}</article>
          <br />
        </div>
        <div className="relative flex justify-center items-center space-x-5 ">
          {tribe?.socialLinks?.map((link) => {
            return (
              <a href={link?.link} target="_blank">
                {getIcons(link?.socialBrand || link?.name)}
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  const Athletes = () => {
    return (
      athletes?.length > 0 && (
        <div className="w-full h-full space-y-8">
          <article className="md:text-2xl text-xl md:text-left text-center">
            Athletes
          </article>
          <div className="flex flex-wrap md:justify-start justify-center items-center gap-5">
            {athletes?.map((athelete, idx) => {
              return (
                <TribeAthleteCard
                  athlete={athelete}
                  orgColor={tribe}
                  imageUrl={downloadImage}
                />
              );
            })}
          </div>
        </div>
      )
    );
  };

  const Media = () => {
    return (
      tribe?.media?.length > 0 && (
        <div className="w-full h-full space-y-8">
          <article className="md:text-2xl text-xl md:text-left text-center">
            Media
          </article>
          <div className="flex flex-wrap  md:justify-start justify-center items-center gap-x-5 gap-y-10">
            {tribe?.media?.map((media) => {
              return <TribeMediaCard key={media?.id} media={media} />;
            })}
          </div>
        </div>
      )
    );
  };

  const Live = () => {
    return (
      tribe?.live?.length > 0 && (
        <div className="w-full h-full space-y-8">
          <article className="md:text-2xl text-xl">Live</article>
          <div className="flex flex-wrap justify-start items-center gap-x-5 gap-y-10">
            <TribeVideoCard
              name="UCLA at Rutgers | Highlights | Big Ten Football | 10/19/2024"
              thumbnail="https://res.cloudinary.com/dv667zlni/image/upload/v1729630894/maxresdefault_pat0dw.jpg"
              uploadOn=""
              url=""
            />
            <TribeVideoCard
              name="UCLA at USC | Highlights | Big Ten Volleyball | 10/13/2024"
              thumbnail="https://res.cloudinary.com/dv667zlni/image/upload/v1729630949/hq720_hdp9so.jpg"
              uploadOn=""
              url=""
            />
            <TribeVideoCard
              name="Rutgers vs UCLA | NCAA College Soccer | Highlights - October 18, 2024"
              thumbnail="https://res.cloudinary.com/dv667zlni/image/upload/v1729630994/hq720_owmvzn.jpg"
              uploadOn=""
              url=""
            />
          </div>
        </div>
      )
    );
  };

  const UpcommingEvents = () => {
    return (
      tribe?.upcomingEvents?.length > 0 && (
        <div className="w-full h-full space-y-8">
          <article className="md:text-2xl text-xl md:text-start text-center">
            Upcomming Events
          </article>
          <div className="relative space-y-10">
            {tribe?.upcomingEvents?.map((event) => {
              return <TribeEventCard event={event} />;
            })}
          </div>
        </div>
      )
    );
  };
  const isPWA = useIsPWA();

  return (
    <>
      {isPWA && (
        <div
          className="flex px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] justify-start items-center gap-2 text-sm cursor-pointer mb-10"
          onClick={() => router.back()}
        >
          <FaChevronLeft /> Back
        </div>
      )}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px]  w-full flex flex-col justify-center items-center pb-40">
        {loading || pageLoading ? (
          <Loader />
        ) : (
          <>
            {/* Profile */}
            <Banner />
            <Descriptions />
            <div className="w-full space-y-20">
              {/* athlete */}
              <Athletes />
              {/* Media */}
              <Media />
              {/* Live */}
              <Live />
              {/* events */}
              <UpcommingEvents />
            </div>
            {!isMember ? (
              <div className="sticky left-0 md:bottom-0 bottom-20 w-full  py-10  bg-gradient-to-b from-transparent to-black bg-opacity-50 flex  justify-center items-end gap-2 ">
                <div
                  className="px-5 py-4  bg-white rounded-3xl cursor-pointer flex justify-center items-center gap-x-2"
                  onClick={handleJoinCommunity}
                >
                  <article className="md:text-xs text-[10px] text-black">
                    Join Community
                  </article>
                  {memberJoiningLoading && (
                    <Loader size={20} className="text-primary" />
                  )}
                </div>
              </div>
            ) : (
              <div className="sticky left-0 md:bottom-0 bottom-20 w-full  py-10  bg-gradient-to-b from-transparent to-black bg-opacity-50 flex  justify-center items-end gap-2 ">
                <div
                  className="px-5 py-4  bg-white rounded-3xl cursor-pointer flex justify-center items-center gap-x-2"
                  onClick={() =>
                    router.push(
                      `/fanzone/tribe/community/${tribe?.tribeName}`
                    )
                  }
                >
                  <article className="md:text-xs text-[10px] text-black">
                    Go To Community
                  </article>
                  <PiCaretRight className="text-black md:text-xs text-[10px]" />
                </div>
                <div
                  className="px-4 py-4  bg-primary rounded-3xl cursor-pointer flex justify-center items-center gap-x-2"
                  onClick={handleShare}
                >
                  {/* <article className="text-xs ">
                 Share
                </article> */}
                  <FaShare className="md:text-xs text-[10px]" />
                </div>
              </div>
            )}

            {openShareModel && (
              <ModelVr_O
                open={openShareModel}
                setHandleOpen={setOpenShareModel}
                extraClass="!z-50"
              >
                <SharePost
                  pathname={`/tribe/${router.query?.name}/profilecard${
                    referral?.inviteCode
                      ? `?referralCode=${referral?.inviteCode}`
                      : ""
                  }`}
                />
              </ModelVr_O>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Index;
