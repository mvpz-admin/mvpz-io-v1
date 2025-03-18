import React, { useEffect, useState } from "react";
import AvaCollectionHeader from "../../../../core/Components/a/ava/AvaCollectionHeader";
import { IoSearch } from "react-icons/io5";
import SelectFeild from "../../../../core/Atoms/Inputs/SelectFeild";
import { AthCollectionfilterOptions } from "../../../../utils/global/global";
import { RiArrowUpDownFill } from "react-icons/ri";
import X5x5Display from "../../../../core/Components/a/ava/X5x5Display";
import { useRouter } from "next/router";
import { callAPI } from "../../../../lib/utils";

const Index = () => {
  let [avaCollectionData, setAvaCollectionData] = useState(null);
  let [avaCollectionDataLoading, setAvaCollectionDataLoading] = useState(false);
  const [openFilter, setOpenFliter] = useState(true);
  const router = useRouter()
  const avaId = router.query.avaId
  const username = router.query.username

   const handleFetchCollectionData = async ({ avaId }) => {
    setAvaCollectionDataLoading(true);
      let response = await callAPI({
           endpoint: `/v1/profiles/athlete/${username}/ava/${avaId}`,
         });
  
      if (response.success) {
        setAvaCollectionData(response?.data);
      }
      setAvaCollectionDataLoading(false);
    };
  
    useEffect(() => {
      if (avaId) {
        handleFetchCollectionData({ avaId });
      }
    }, [avaId]);

  return (
    <div className="relative w-full min-h-screen z-0">
      {/* container */}
      <AvaCollectionHeader title={avaCollectionData?.title} avaCollectionData={avaCollectionData?.athlete}  avaCollectionDataLoading={avaCollectionDataLoading}/>
      {/* Tabs & Content */}
       {/* Tabs */}
       <div
        className={`relative  w-full  flex justify-between items-center  border-b border-white py-2 pb-3  transition-all duration-300  md:px-8 px-2 border-opacity-10 gap-2 z-10 `}
      >
        {/* left section */}
        <div className="flex flex-1 justify-start items-center md:gap-5 gap-2 ">
          {/* Filter For Desktop */}
          
          <article className="md:block hidden font-inter text-[16px] font-semibold opacity-80">
            100 Result
          </article>
          <div className="relative h-[45px] md:w-[500px] md:flex-none flex-1 bg-white bg-opacity-10 rounded-lg border border-white border-opacity-5 flex justify-start items-center gap-2 overflow-hidden px-2">
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
            className={` h-[45px] px-4 md:hidden justify-center items-center font-inter text-[16px] font-semibold  transition-all duration-300 cursor-pointer rounded-lg text-white bg-white bg-opacity-10 hover:bg-opacity-20`}
            onClick={() => setOpenFliter(!openFilter)}
          >
            <RiArrowUpDownFill className=" text-[16px]" />
          </div>
         
        </div>
       
      </div>
       {/* Content */}
       <X5x5Display cards={avaCollectionData?.collections?.cards} />
    </div>
  );
};

export default Index;
