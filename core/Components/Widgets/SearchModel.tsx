import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useGlobalStore } from "../../../store/useGlobalStore";
import Image from "next/image";
import Skeleton from "../../Atoms/Others/Skeleton";
import { useRouter } from "next/router";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { GoArrowUpRight } from "react-icons/go";
import { callAPI } from "../../../lib/utils";

const SearchModel = ({ setFocusSearch, searchInputRef }) => {
  const router = useRouter();
  const [searchedData, setSearchedData] = useState({
    searchedUser: [{}, {}, {}, {}, {}],
    topAthletes: [{}, {}, {}, {}, {}],
    topTribes: [{}, {}, {}, {}, {}],
  });
  const [searchedDataLoading, setSearchedDataLoading] = useState(true);
  const [searchedKey, setSearchedKey] = useState("");

  const handleSearch = async (key) => {
    setSearchedDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/global/search/${key}`,
    });

    if (response.success) {
      setSearchedData(response?.data);
    }
    setSearchedDataLoading(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchedKey.length >= 3) {
        handleSearch(searchedKey);
      } else {
        setSearchedData({
          searchedUser: [{}, {}, {}, {}, {}],
          topAthletes: [{}, {}, {}, {}, {}],
          topTribes: [{}, {}, {}, {}, {}],
        });
      }
    }, 1000); // 2-second debounce

    return () => clearTimeout(delayDebounce);
  }, [searchedKey]);

  const {
    addToRecentSearch,
    removeFromSearch,
    removeAll,
    recentSearchs,
    defaultSearchLoading,
    defaultSearchList,
  } = useGlobalStore((state) => state);

  const SectionContainer = ({
    title = "",
    isRecentSearch = false,
    searchList = [],
    loading,
  }) => {
    let Row = ({ row, idx }) => {
      const handleNavigate = (row) => {
        addToRecentSearch({
          isVerified: row.isVerified,
          title: row?.title,
          thumbnail: row?.thumbnail,
          url: row?.url,
        });
        router.push(row?.url);
        setFocusSearch(false);
      };

      const handleRemove = (url) => {
        removeFromSearch(url);
      };
      return (
        <div
          className="flex justify-between items-center px-2 py-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-lg"
          key={idx}
          onClick={() => handleNavigate(row)}
        >
          <div className="flex justify-start items-center gap-2">
            <div
              className={`relative w-[55px] h-[55px] ${
                loading ? "border-0" : "border-2"
              } border-white border-opacity-30 rounded-full p-[2px]`}
            >
              <div className="relative w-full h-full bg-secondary rounded-full">
                {!loading  ? (
                   (
                    row?.thumbnail &&
                    <Image
                      src={row?.thumbnail}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover rounded-full"
                    />
                  )
                ) : (
                  <Skeleton
                    className={`bg-white bg-opacity-10 w-full h-full rounded-full`}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-start ">
              <div className="flex justify-start items-center">
                {loading || !row?.title ? (
                  <Skeleton
                    className={`bg-secondary w-[200px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <>
                    <article className="text-sm font-inter font-medium">
                      {row?.title}
                    </article>
                    {row?.isVerified && (
                      <BsFillPatchCheckFill
                        size={10}
                        className="text-indigo-500 ml-1"
                      />
                    )}
                  </>
                )}
              </div>
              {!isRecentSearch && (
                <div className="flex justify-start items-center">
                  {loading || !row.subtitle1 ? (
                    <Skeleton
                      className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                    />
                  ) : (
                    <span className="text-[10px] font-inter">
                      {row?.subtitle1}
                    </span>
                  )}
                  <div
                    className={`mx-1 w-1 h-1 bg-white ${
                      loading || !row.subtitle2 ? "bg-opacity-0" : "bg-opacity-50"
                    } rounded-full`}
                  ></div>
                  {loading || !row.subtitle2 ? (
                    <Skeleton
                      className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                    />
                  ) : (
                    <span className="text-[10px] font-inter">
                      {row?.subtitle2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* close or Go */}
          {loading ? (
            <Skeleton
              className={`bg-secondary w-[40px] h-[40px] rounded-md mb-1`}
            />
          ) : (
            <div className="flex justify-center items-center gap-2 w-[30px] h-[30px] bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg cursor-pointer">
              {isRecentSearch ? (
                <IoIosClose
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(row?.url);
                  }}
                />
              ) : (
                <GoArrowUpRight
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(row);
                  }}
                />
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="w-full relative space-y-2">
        {/* header */}
        <div className="w-full flex justify-between items-center px-5 ">
          <div className="relative">
            <span className="font-nato font-normal text-[14px] text-white text-opacity-50">
              {title}
            </span>
          </div>
          {isRecentSearch && (
            <div className="relative" onClick={removeAll}>
              <span className="font-nato font-normal text-[12px] text-blue-500 cursor-pointer">
                CLEAR
              </span>
            </div>
          )}
        </div>
        {/* sections */}
        <div className="relative w-full flex-col px-2">
          {loading
            ? Array(5)
                .fill(0)
                ?.map((_, idx) => {
                  return <Row row={_} idx={idx} />;
                })
            : searchList?.map((row, idx) => {
                return <Row row={row} idx={idx} />;
              })}
        </div>
      </div>
    );
  };

  const SearchedList = () => {

    return (
      <>
        {searchedData?.searchedUser?.length > 0 && (
          <SectionContainer
            title="User Accounts"
            searchList={searchedData?.searchedUser}
            loading={searchedDataLoading}
          />
        )}
        {searchedData?.topAthletes?.length > 0 && (
          <SectionContainer
            title="Athletes"
            searchList={searchedData?.topAthletes}
            loading={searchedDataLoading}
          />
        )}
        {searchedData?.topTribes?.length > 0 && (
          <SectionContainer
            title="Teams"
            searchList={searchedData?.topTribes}
            loading={searchedDataLoading}
          />
        )}
      </>
    );
  };

  const DefaultSearchList = () => {
    return (
      <>
        {recentSearchs?.length > 0 && (
          <SectionContainer
            isRecentSearch
            title="Recent Search"
            searchList={recentSearchs}
            loading={defaultSearchLoading}
          />
        )}
        <SectionContainer
          title="Top Athlete"
          searchList={defaultSearchList?.topAthletes}
          loading={defaultSearchLoading}
        />
        <SectionContainer
          title="Top Teams"
          searchList={defaultSearchList?.topTribes}
          loading={defaultSearchLoading}
        />
      </>
    );
  };

  return (
    <>
      <div
        className={`flex justify-start items-center gap-2 h-[75px] w-full border-b border-white border-opacity-10  cursor-pointer  px-5`}
      >
        <IoSearch size={22} className="md:block hidden" />
        <FaChevronLeft
          size={20}
          className="md:hidden true"
          onClick={() => setFocusSearch(false)}
        />
        <input
          ref={searchInputRef}
          className="w-full h-full relative flex-1 bg-transparent outline-none placeholder:text-xl text-xl"
          placeholder="Search Anything..."
          onFocus={() => setFocusSearch(true)}
          onChange={(e) => setSearchedKey(e.target.value)}
          value={searchedKey}
        />
      </div>
      {/* search list */}
      <div className="relative w-full flex-1 overflow-y-auto py-5 space-y-4">
        {/* recent searches */}
        {searchedKey?.length >= 3 ? <SearchedList /> : <DefaultSearchList />}
      </div>
    </>
  );
};

export default SearchModel;
