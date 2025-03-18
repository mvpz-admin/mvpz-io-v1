import React, { useEffect, useState } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";

const SearchOptionsMenu = ({
  title = "Select Tribe",
  setClose = (state: any) => {},
  selectedOpt = {
    label: null,
    id: null,
  },
  setSelectedOpt = (state: any) => {},
  list = [],
}) => {
  const [optList, setOptList] = useState([]);
  const [searchValue,setSearchValue] = useState("")

  useEffect(() => {
    setOptList(list);
  }, [list]);

  const handleFilter = () => {
    if(searchValue?.length > 0){
      const filterOptions = optList?.filter(_ => _?.label?.includes(searchValue))
      setOptList(filterOptions)
    }else{
      setOptList(list)
    }
  }

  useEffect(() => {
    handleFilter()
  },[searchValue])
  

  

  return (
    <div className="md:absolute fixed top-0 left-0 z-[500] w-full md:h-full  h-screen bg-secondary flex flex-col justify-center items-center pb-5">
      <div className="w-full p-4 flex justify-between items-center bg-[#1f1f1f]">
        <div className="lex-col justify-center items-start">
          <article className="text-[12px] text-primary">{title}</article>
          <article className="text-[8px]  ">Choose Tribe To Post</article>
        </div>
        <div onClick={() => setClose(false)}>
          <article className="text-[10px] cursor-pointer">Cancel</article>
        </div>
      </div>
      <div className="flex-1 w-full h-full overflow-y-auto px-4 py-6 pb-10">
        <div className="relative top-0 w-full h-[40px] border border-opacity-[0.5] rounded-md mb-4 z-10 ">
          <input
            className="w-full h-full rounded-md p-2 pl-10 text-xs"
            placeholder="Search Tribe"
            value={searchValue}
            onChange={(e) =>  setSearchValue(e.target.value)}
          />
          <FaSearch
            className="absolute top-1/2 -translate-y-1/2 left-4 "
            size={16}
          />
        </div>
        <div className="relative w-full h-full z-0 pb-10 ">
          {optList?.map((_) => {
            return (
              <div className="relative p-3  pl-8 flex justify-start items-center bg-ternary rounded-md mb-1 cursor-pointer hover:brightness-110" onClick={() => {
                setSelectedOpt(_)
                setClose(false)
              }}>
                <article className="text-[10px]">{_?.label}</article>
                {selectedOpt?.label == _?.label ? (
                  <FaCheck className="absolute top-1/2 -translate-y-1/2 left-2 " size={12} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchOptionsMenu;
