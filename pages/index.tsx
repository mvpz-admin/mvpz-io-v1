import Image from "next/image";
import React, { useEffect, useState } from "react";
import HomeFanzone from "../core/Components/Home/HomeFanzone";
import HomeRanking from "../core/Components/Home/HomeRanking";
import HomeCards from "../core/Components/Home/HomeCards";
import HomeAthlete from "../core/Components/Home/HomeAthlete";
import HomeMarketCard from "../core/Components/Home/HomeMarketCard";
import Footer from "../core/Components/Widgets/Footer";
import { useRouter } from "next/router";
import { HomePageGradients, HomePagesTab } from "../utils/global/global";
import { callAPI } from "../lib/utils";
import HomeTabs from "../core/Components/Widgets/HomeTabs";

function getRandomNumber() {
  return Math.floor(Math.random() * 2);
}

const Index = () => {
  const router = useRouter();
  const [gradient, setGradient] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const [pageData,setPageData] = useState<any>()
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [pageError, setPageError] = useState(false); // TODO : Later change

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: "/v1/home",
      });

      setPageData(response?.data)
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false)
  };

  useEffect(() => {
    handleFetchPageData()
  },[router.pathname])

  useEffect(() => {
    let gradientUpdates: NodeJS.Timeout | null = null;

    const handleUpdateGradient = () => {
      if (showAnimation) {
        setGradient(getRandomNumber());
      }
    };

    if (showAnimation) {
      gradientUpdates = setInterval(handleUpdateGradient, 5000);
    }

    return () => {
      if (gradientUpdates) clearInterval(gradientUpdates);
    };
  }, [showAnimation]); // Depend on `showAnimation`

  return (
    <div className="relative w-full min-h-screen z-0">
      {/* top section */}
      {/* <div className="absolute w-full h-[450px] z-0">
        <div className="absolute top-0 left-0 w-full h-full z-0 transition-all duration-500">
          {HomePageGradients.map((grd, idx) => (
            <Image
              key={idx}
              src={grd}
              alt="bg"
              width={500}
              height={500}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 brightness-50 ${
                idx === gradient ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-5 bg-gradient-to-b from-transparent to-black"></div>
      </div> */}

      {/* blur Layer */}
      <div className="absolute top-0 left-0 w-full h-full z-5 backdrop-blur-3xl"></div>

      {/* content */}
      <div className="absolute top-0 left-0 w-full z-10 md:space-y-5">
        {/* Tabs */}
        <div className="relative w-full  md:px-10 px-5 flex flex-col justify-start items-start md:pt-28 pt-0 z-10">
          <HomeTabs setGradient={setGradient} setShowAnimation={setShowAnimation} />
        </div>
        {/* Below content */}
        <div className="relative w-full pt-10">
           {/* Athlete */}
           <div className="relative w-full  space-y-4 mb-10">
            {/* <div className="flex justify-between items-center  md:px-10 px-2">
              <article className="md:text-xl text-base font-inter font-bold">
                Top Athletes
              </article>
              <div className="w-auto">
                <button
                  className={`relative flex-1 px-4 py-3 md:text-sm text-xs font-semibold rounded-lg transition-all duration-300 text-white bg-white bg-opacity-10 hover:bg-opacity-20  `}
                >
                  View All
                </button>
              </div>
            </div> */}
            <HomeAthlete athletes={pageData?.topAthletes} loading={pageDataLoading}/>
          </div>
           {/* Top Posts */}
           <div className="relative w-full md:px-10 px-2 mb-10">
           <HomeFanzone fanzone={pageData?.fanzone} loading={pageDataLoading} />
          </div>
          {/* Athletes */}
          <div className="relativew-full space-y-4 mb-10">
            <HomeCards  cards={pageData?.enhCards} loading={pageDataLoading}/>
          </div>
          {/* Rankings */}
          <div className="relative w-full md:px-10 px-2 mb-10">
            <HomeRanking leaderboard={pageData?.leaderboard} loading={pageDataLoading}/>
          </div>
         
          {/* Athlete */}
          {/* <div className="relative w-full  space-y-4 mb-10">
            <div className="flex justify-between items-center  md:px-10 px-2">
              <article className="md:text-xl text-base font-inter font-bold">
                Market Cards
              </article>
              <div className="w-auto">
                <button
                  className={`relative flex-1 px-4 py-3 md:text-sm text-xs font-semibold rounded-lg transition-all duration-300 text-white bg-white bg-opacity-10 hover:bg-opacity-20  `}
                >
                  View All
                </button>
              </div>
            </div>
            <HomeMarketCard cards={pageData?.baseCards} loading={pageDataLoading}/>
          </div> */}
          {/* Foolter */}
        <Footer />
        </div>
        
      </div>
    </div>
  );
};

export default Index;
