"use client";

import { url } from "inspector";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillTrophy } from "react-icons/ai";
import {
  FaCompass,
} from "react-icons/fa";
import { FaHandFist, FaSquarePlus } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { PiFilmSlateFill, PiNewspaperClippingFill } from "react-icons/pi";
import { SiApplenews, SiLinkfire, SiTeamspeak } from "react-icons/si";
import dynamic from "next/dynamic";
import { useFeedStore } from "../../store/useOtherStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useLoginProcessStore } from "../../store/useGlobalStore";
import { callAPI } from "../../lib/utils";
import { RiTeamFill } from "react-icons/ri";

const PostEditor = dynamic(
  () => import("../../core/Components/Fanzone/CEditor"),
  { ssr: false }
);

const LinksSections = ({ title = null, list = [] }) => {
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const isLoggedIn = useAuthStore((state) => state.user)?.token;
  const router = useRouter();
  let pathname = router.pathname;
  const handleNavigate = (item) => {
    if (isLoggedIn) {
      if (item?.url) {
        router.push(item.url);
      } else {
        let func = item?.func;
        func();
      }
    } else {
      setOpenLoginModel();
    }
  };
  return (
    <div className="relative w-full pb-5 mb-5 border-b border-white border-opacity-10 space-y-2">
      {title && (
        <article className="md:block hidden text-[12px] font-nato font-normal opacity-50 px-2">
          {title}
        </article>
      )}
      {list?.map((item) => {
        let Icon = item?.icon;

        return (
          <div
            className={`flex justify-start items-center p-2 gap-3 bg-white  ${
              pathname === item.url ? "bg-opacity-10 " : "bg-opacity-0"
            }   hover:bg-opacity-10 rounded-lg cursor-pointer transition-all duration-300`}
            onClick={() => handleNavigate(item)}
          >
            {!Icon ? (
              <div className="w-[22px] h-[22px] relative rounded-full overflow-hidden">
                <Image
                  src={item?.thumbnail}
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full overflow-hidden scale-150"
                />
              </div>
            ) : (
              <Icon size={22} className={"opacity-90"} />
            )}
            <article className="md:block hidden text-sm font-inter font-semibold opacity-90">
              {item?.label}
            </article>
          </div>
        );
      })}
    </div>
  );
};

const TribeLinksSections = ({ title = null, list = [], loading }) => {
  const router = useRouter();

  const handleNavigate = (item) => {
    router.push(item?.url);
  };
  return (
    <div className="relative w-full pb-5 mb-5 border-b border-white border-opacity-10 space-y-2">
      {title && (
        <article className="md:block hidden text-[12px] font-nato font-normal opacity-50 px-2">
          {title}
        </article>
      )}
      {list?.map((item) => {
        return (
          <div
            className={`flex justify-start items-center p-2 gap-3 bg-white bg-opacity-0   hover:bg-opacity-10 rounded-lg cursor-pointer transition-all duration-300`}
            onClick={() => handleNavigate(item)}
          >
            <div className="w-[22px] h-[22px] relative rounded-full overflow-hidden bg-secondary">
              {item?.tribeLogo && (
                <Image
                  src={item?.tribeLogo}
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full overflow-hidden scale-150"
                />
              )}
            </div>

            <article className="md:block hidden text-sm font-inter font-semibold opacity-90">
              {item?.tribeShortName}
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default function FanzoneLayout({ children }) {
  const router = useRouter();
  const [openEditor, setOpenEditor] = useState(false);
  const { uploading } = useFeedStore((state) => state);
  const isLoggedIn = useAuthStore((state) => state.user)?.token;
  const [myTribes, setMyTribes] = useState([]);
  const [tribesLoading, setTribesLoading] = useState(false);
  let post = router.query.p;

  const handleFetchMyTribes = async () => {
    setTribesLoading(true);
    try {
      let response = await callAPI({
        endpoint: "/v1/fanzone/myTribes",
      });

      setMyTribes(response?.data);
    } catch (error) {
      console.log({ error });
    }
    setTribesLoading(false);
  };

  useEffect(() => {
    handleFetchMyTribes();
  }, [router.pathname]);

  const handleOpenModel = () => {
    router.replace(
      {
        pathname: window.location.pathname,
        query: {
          p: "feed",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleCloseModel = () => {
    if (!uploading) {
      router.replace(
        {
          pathname: window.location.pathname,
          query: {},
        },
        undefined,
        { shallow: true }
      );

      setOpenEditor(false);
    }
  };

  useEffect(() => {
    if (!!post && isLoggedIn) {
      setOpenEditor(true);
    }
  }, [router.query]);

  let mainLinks = [
    {
      label: "Fanzone",
      icon: FaHandFist,
      url: "/fanzone",
    },
    {
      label: "Create",
      icon: FaSquarePlus,
      url: null,
      func: handleOpenModel,
    },
    {
      label: "Shouts",
      icon: HiSpeakerphone,
      url: "/shouts",
    },
    {
      label: "Tribes",
      icon: RiTeamFill,
      url: "/tribes",
    },
    
  ];

  let exploreLinks = [
    {
      label: "For You",
      icon: FaCompass,
      url: "/",
    },
    {
      label: "Trending",
      icon: SiLinkfire,
      url: "/",
    },
    {
      label: "News",
      icon: PiNewspaperClippingFill,
      url: null,
    },
    {
      label: "Sports",
      icon: AiFillTrophy,
      url: "/fanzone/explore",
    },
    {
      label: "Entertaiment",
      icon: PiFilmSlateFill,
      url: "/fanzone/explore",
    },
  ];

  

  return (
    <div className={`relative flex flex-row h-screen overflow-y-auto`}>
      {/* Sidebar */}
      <div className="sticky top-0 left-0 lg:flex-[0.15] md:flex-[0.2]  md:w-full h-full border-r border-white border-opacity-10 bg-[rgba(17,17,17,0.5)] md:px-5 px-2 py-5 md:pt-[125px] overflow-y-auto ">
        <LinksSections list={mainLinks} />
        {/* <LinksSections title={"Explore"} list={exploreLinks} /> */}
        {isLoggedIn ? (
          <TribeLinksSections
            title={"My Tribes"}
            list={myTribes}
            loading={tribesLoading}
          />
        ) : (
          <TribeLinksSections
            title={"Tribes Suggestions"}
            list={myTribes}
            loading={tribesLoading}
          />
        )}
      </div>

      <main className="relative lg:flex-[0.85] md:flex-[0.8] flex-1 w-full min-h-screen ">
        {children}
      </main>
      {openEditor && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={handleCloseModel}
        >
          <PostEditor handleCloseModel={handleCloseModel} />
        </div>
      )}
    </div>
  );
}
