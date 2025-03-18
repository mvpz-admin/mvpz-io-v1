import React, { useEffect, useRef, useState } from "react";
import Footer from "../../core/Components/Widgets/Footer";
import Image from "next/image";
import TribeSlider from "../../core/Components/Tribes/TribeSlider";
import FanzoneLayout from "../../core/Layout/FanzoneLayout";
import TribeList from "../../core/Components/Tribes/TribeList";
import { callAPI } from "../../lib/utils";
import { useRouter } from "next/router";
import { useAuthStore } from "../../store/useAuthStore";
import Skeleton from "../../core/Atoms/Others/Skeleton";

const Index = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageData, setPageData] = useState<any>();
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [pageError, setPageError] = useState(false); // TODO : Later change
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.user)?.token;

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: "/v1/fanzone/tribe/home",
      });

      setPageData(response?.data);
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false);
  };

  useEffect(() => {
    handleFetchPageData();
  }, [router.pathname]);

  return (
    <FanzoneLayout>
      <div className="relative w-full min-h-screen z-0">
        {/* top section */}
        <div className="absolute w-full h-[450px] z-0">
          <div className="absolute top-0 left-0 w-full h-full z-0 transition-all duration-500 bg-secondary">
            {!pageDataLoading && pageData?.topTribes?.map((grd, idx) => (
              <Image
                key={idx}
                src={grd.tribeHorizontalBanner}
                alt="bg"
                width={500}
                height={500}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${
                  idx === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-full z-5 bg-gradient-to-b from-transparent to-black"></div>
        </div>

        {/* blur Layer */}
        <div className="absolute top-0 left-0 w-full h-full z-5 backdrop-blur-3xl"></div>

        {/* content */}
        <div className="absolute top-0 left-0 w-full z-10 pt-28 space-y-10">
          {/* Below content */}
          <div className="relative w-full  px-2  ">
            <TribeSlider
              swiperRef={swiperRef}
              tribes={pageData?.topTribes}
              setActiveIndex={setActiveIndex}
              pageDataLoading={pageDataLoading}
            />
          </div>

          {isLoggedIn && pageData?.myTribes?.lenght > 0 && (
            <div className="relative w-full  space-y-4 md:px-10 px-2">
             {!pageDataLoading &&  (<div className="relative w-full ">
                <article className="font-inter font-bold">My Teams</article>
              </div>)}
              <TribeList
                tribes={pageData?.myTribes}
                pageDataLoading={pageDataLoading}
              />
            </div>
          )}
          {/* Payler Cards */}
          <div className="relative w-full space-y-4 md:px-10 px-2">
          {!pageDataLoading && ( <div className="relative  ">
              <article className="font-inter font-bold">Other Teams</article>
            </div>)}
            <TribeList
              tribes={pageData?.otherTribes}
              pageDataLoading={pageDataLoading}
              suggestions={true}
            />
          </div>
          <Footer />
        </div>
      </div>
    </FanzoneLayout>
  );
};

export default Index;
