import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import ToggleIconSwitch from "../../Atoms/Inputs/ToggleIconSwitch";
import { BsGrid, BsGrid1X2, BsGrid3X3Gap } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import { callAPI } from "../../../lib/utils";
import X3x3Display from "./display/X3x3Display";
import X2x2Display from "./display/X2x2Display";
import X2CardDisplay from "./display/X2CardDisplay";
import MobileDisplay from "./display/MobileDisplay";





let toggleTab = [
  {
    id: "3x3Display",
    icon: BsGrid3X3Gap,
  },
  {
    id: "2x2Display",
    icon: BsGrid,
  },
  {
    id: "x2Design",
    icon: BsGrid1X2,
  },
];

let statusList = [
  {
    label: "All",
    id: "all",
  },
  {
    label: "Listed",
    id: "listed",
  },
  {
    label: "Sold Out",
    id: "Sold Out",
  },
];

const Status = () => {
  const [openOption, setOpenOption] = useState(true);

  return (
    <div className="relative w-full space-y-2 border-b border-white border-opacity-20 pb-4 select-none">
      {/* tag */}
      <div
        className="flex justify-between items-center"
        onClick={() => setOpenOption(!openOption)}
      >
        <article className="font-inter text-[16px] font-medium">Status</article>
        <FaAngleDown
          className={`transition-all duration-300 ${
            openOption ? "-rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {/* filter */}
      {openOption && (
        <div className="flex flex-wrap justify-start items-start gap-2 pt-4">
          {statusList?.map((status) => {
            return (
              <div
                className={`h-[40px] px-4 flex justify-center items-center font-inter text-[16px] font-semibold  transition-all duration-300 cursor-pointer rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20  `}
              >
                <article className="font-inter text-[12px] font-semibold opacity-80">
                  {status?.label}
                </article>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Avatars = ({ teams }) => {
  const [openOption, setOpenOption] = useState(true);

  return (
    <div className="relative w-full space-y-2 border-b border-white border-opacity-20 pb-4 select-none">
      {/* tag */}
      <div
        className="flex justify-between items-center"
        onClick={() => setOpenOption(!openOption)}
      >
        <article className="font-inter text-[16px] font-medium">Teams</article>
        <FaAngleDown
          className={`transition-all duration-300 ${
            openOption ? "-rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {/* filter */}
      {openOption && (
        <div className="flex flex-wrap justify-start items-start gap-2 pt-4">
          {teams?.map((img) => {
            return (
              <div className="relative w-[55px] h-[55px] border-2 border-white border-opacity-30 rounded-full p-[2px]">
                <div className="relative w-full h-full bg-secondary rounded-full">
                  {img?.tribeLogo && (
                    <Image
                      src={img?.tribeLogo}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const UCollections = ({ sectionActive, username }) => {
  const [display, setDisplay] = useState({ id: "x2Design" });
  const [collectionData, setCollectionData] = useState(null);
  const [collectionDataLoading, setCollectionDataLoading] = useState(false);

  const handleFetchCollectionData = async ({ username }) => {
    setCollectionDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/user/${username}/collections`,
    });

    if (response.success) {
      setCollectionData(response?.data);
    }
    setCollectionDataLoading(false);
  };

  useEffect(() => {
    if (username) {
      handleFetchCollectionData({ username });
    }
  }, [username]);

  const CardsDisplay = () => {
    switch (display?.id) {
      case "3x3Display":
        return (
          <X3x3Display
          loading={collectionDataLoading}
            cards={collectionData?.collections}
            sectionActive={sectionActive}
          />
        );
      case "2x2Display":
        return (
          <X2x2Display
          loading={collectionDataLoading}
            cards={collectionData?.collections}
            sectionActive={sectionActive}
          />
        );
      case "x2Design":
        return (
          <X2CardDisplay
          loading={collectionDataLoading}
            cards={collectionData?.collections}
            sectionActive={sectionActive}
          />
        );
    }
  };

  return (
    <div
      className={`relative flex flex-col w-full px-2  z-0`}
      id="collected"
    >
      {/* Tabs */}
      <div
        className={`relative  w-full  flex justify-between items-center gap-2 border-b border-white py-2 pb-3  transition-all duration-300  md:px-8 px-2 ${
          sectionActive ? "border-opacity-10" : "border-opacity-0"
        } gap-2 z-0 `}
      >
        {/* left section */}
        <div className="flex flex-1 justify-start items-center md:gap-5 gap-2 ">
        
          <article className="md:block hidden font-inter text-[16px] font-semibold opacity-80">
            {collectionData?.collections?.totalResult} Result
          </article>
          <div className="relative h-[45px] md:w-[500px] flex-1 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-5 flex justify-start items-center gap-2 overflow-hidden px-2">
            <IoSearch size={20} />{" "}
            <input
              className="flex-1 relative w-full h-full bg-transparent outline-none "
              placeholder="Find avatars or cards"
            />
          </div>
        </div>

        {/* right section */}
        <div className="relative flex justify-end items-center gap-5 z-5 ">
         
          <div className="md:block hidden relative h-[45px]">
            <ToggleIconSwitch
              tabs={toggleTab}
              defaultSelected={3}
              onChange={(tab) => setDisplay(tab)}
            />
          </div>
        </div>
      </div>
      {/* Other Options */}
      <div className="md:hidden  flex justify-start items-start px-2 my-2">
        <article className="md:hidden block font-inter text-[16px] font-semibold opacity-80">
          {collectionData?.collections?.totalResult} Result
        </article>
      </div>
      {/* Section */}
      <div className="relative w-full grow bg-opacity-10 flex gap-5 md:px-8 px-0 overflow-hidden z-0">
        {/* Filter Section */}
     
        <div
          className={` athleteCardCollection  flex-1 w-full pb-5 `}
        >
          {/* For Desktop  */}
          <div className="relative md:block hidden ">{CardsDisplay()}</div>
          {/* For Mobile */}
          <div className="relative md:hidden block ">
            <MobileDisplay
            loading={collectionDataLoading}
              cards={collectionData?.collections}
              sectionActive={sectionActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UCollections;
