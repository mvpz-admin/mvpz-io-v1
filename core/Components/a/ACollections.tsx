import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import ToggleIconSwitch from "../../Atoms/Inputs/ToggleIconSwitch";
import { BsGrid, BsGrid1X2, BsGrid3X3Gap } from "react-icons/bs";
import SelectFeild from "../../Atoms/Inputs/SelectFeild";
import X3x3Display from "./display/X3x3Display";
import X2x2Display from "./display/X2x2Display";
import X2CardDisplay from "./display/X2CardDisplay";
import { FaAngleDown } from "react-icons/fa";
import Image from "next/image";
import { callAPI } from "../../../lib/utils";
import { RiArrowUpDownFill } from "react-icons/ri";
import MobileDisplay from "./display/MobileDisplay";
import { AthCollectionfilterOptions } from "../../../utils/global/global";




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

const ACollections = ({ sectionActive, username }) => {
  const [openFilter, setOpenFliter] = useState(true);
  const [openMobileFilter, setOpenMobileFliter] = useState(true);
  const [display, setDisplay] = useState({ id: "x2Design" });
  const [collectionData, setCollectionData] = useState(null);
  const [collectionDataLoading, setCollectionDataLoading] = useState(false);

  const handleFetchCollectionData = async ({ username }) => {
    setCollectionDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/athlete/${username}/collections`,
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
            cards={collectionData?.collections?.cards}
            loading={collectionDataLoading}
            openFilter={openFilter}
            sectionActive={sectionActive}
          />
        );
      case "2x2Display":
        return (
          <X2x2Display
            cards={collectionData?.collections?.cards}
            loading={collectionDataLoading}
            openFilter={openFilter}
            sectionActive={sectionActive}
          />
        );
      case "x2Design":
        return (
          <X2CardDisplay
            cards={collectionData?.collections?.cards}
            loading={collectionDataLoading}
            openFilter={openFilter}
            sectionActive={sectionActive}
          />
        );
    }
  };

  return (
    <div
      className={`relative flex flex-col w-full  z-0`}
      id="collections"
    >
      {/* Tabs */}
      <div
        className={`relative  w-full  flex justify-between items-center gap-2 border-b border-white py-2 pb-3  transition-all duration-300  md:px-8 px-2 ${
          sectionActive ? "border-opacity-10" : "border-opacity-0"
        } gap-2 z-0 `}
      >
        {/* left section */}
        <div className="flex flex-1 justify-start items-center md:gap-5 gap-2 ">
          {/* Filter For Desktop */}
          <div
            className={` h-[45px] px-4 md:flex hidden justify-center items-center font-inter text-[16px] font-semibold  transition-all duration-300 cursor-pointer rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20`}
            onClick={() => setOpenFliter(!openFilter)}
          >
            <FaFilter className="md:text-[16px] text-[14px]" />
          </div>
          {/* Filter For Mobile */}
          <div
            className={`h-[45px] px-4 md:hidden flex justify-center items-center font-inter text-[16px] font-semibold  transition-all duration-300 cursor-pointer rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20`}
            onClick={() => setOpenMobileFliter(!openFilter)}
          >
            <FaFilter className="md:text-[16px] text-[14px]" />
          </div>
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
          {/* Filter Options For Desktop */}
          <div className="md:block hidden relative w-[250px] h-[45px]">
            <SelectFeild options={AthCollectionfilterOptions} />
          </div>
          {/* Filter Options For Mobile */}
          <div
            className={`md:hidden  h-[45px] px-4 flex justify-center items-center font-inter text-[16px] font-semibold  transition-all duration-300 cursor-pointer rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20`}
            onClick={() => setOpenFliter(!openFilter)}
          >
            <RiArrowUpDownFill className=" text-[16px]" />
          </div>
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
        {openFilter && (
          <div
            className={`md:block hidden flex-[0.2] w-full h-full ${
              sectionActive ? "overflow-y-auto" : "overflow-y-hidden"
            } py-5 space-y-4`}
          >
            {/* Status */}
            <Status />
            {/* Avatars */}
            <Avatars teams={collectionData?.teams} />
          </div>
        )}
        <div
          className={` athleteCardCollection ${
            openFilter ? "md:flex-[0.8] flex-1" : "flex-1"
          } w-full pb-5 `}
        >
          {/* For Desktop  */}
          <div className="relative md:block hidden ">{CardsDisplay()}</div>
          {/* For Mobile */}
          <div className="relative md:hidden block ">
            <MobileDisplay
              cards={collectionData?.collections?.cards}
              loading={collectionDataLoading}
              sectionActive={sectionActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACollections;
