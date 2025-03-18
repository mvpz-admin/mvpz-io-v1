"use client";
import React, { useState } from "react";
import "swiper/css";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Skeleton from "../../Atoms/Others/Skeleton";

const TribeList = ({ tribes, pageDataLoading, suggestions = false }) => {
  return (
    <div className="relative w-full flex flex-wrap justify-between items-center gap-y-10 ">
      {pageDataLoading
        ? Array(8)
            ?.fill(0)
            ?.map((_, idx) => {
              return (
                <Card
                  tribe={_}
                  suggestions={suggestions}
                  pageDataLoading={pageDataLoading}
                  key={idx}
                />
              );
            })
        : tribes?.map((tribe, idx) => {
            return (
              <Card
                tribe={tribe}
                suggestions={suggestions}
                pageDataLoading={pageDataLoading}
                key={idx}
              />
            );
          })}
    </div>
  );
};

const Card = ({ tribe, suggestions, pageDataLoading }) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="relative w-[250px] h-[325px] rounded-lg bg-secondary overflow-hidden transition-all duration-300 border border-white border-opacity-5 cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* images */}
      <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-secondary  overflow-hidden">
        {!pageDataLoading && (
          <Image
            src={tribe?.tribeVerticalBanner}
            alt="bg"
            width={500}
            height={500}
            className={`relative w-full h-full object-cover brightness-90 object-top transition-all duration-300 ${
              isHover ? "scale-105" : "scale-100"
            }`}
          />
        )}
      </div>
      {/* layer */}
      <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent p-2 flex flex-col justify-end items-start">
        {/* content */}
        <div className="flex justify-start items-center gap-2">
          <div className="relative  w-[55px] h-[55px] border-2 border-white border-opacity-30 rounded-lg p-[2px]">
            <div className="relative w-full h-full bg-secondary rounded-lg overflow-hidden">
              {!pageDataLoading && (
                <Image
                  src={tribe?.tribeLogo}
                  alt="bg"
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover rounded-lg scale-150"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1  w-full justify-center items-start ">
            {pageDataLoading ? (
              <Skeleton
                className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
              />
            ) : (
              <div className="flex  justify-start items-center">
                <article className="text-sm font-inter font-semibold">
                  {tribe?.tribeId}
                </article>
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              </div>
            )}
            {pageDataLoading ? (
              <Skeleton
                className={`bg-secondary w-[125px] h-[18px] rounded-md mb-1`}
              />
            ) : (
              <span className="text-[10px] font-inter font-medium">
                {tribe?.tribeName}
              </span>
            )}
          </div>
        </div>
        {/* Join Now */}
        {suggestions &&
          (pageDataLoading ? (
            <Skeleton
              className={`absolute top-2 right-2 bg-secondary w-[105px] h-[40px] rounded-md mb-1`}
            />
          ) : (
            <div
              className="absolute top-2 right-2 flex justify-start items-center gap-2 px-2 py-2 backdrop-blur-lg rounded-lg bg-black bg-opacity-50 border border-white border-opacity-10 "
              onClick={() => router.push(`/t/${tribe?.tribeId}`)}
            >
              <span className="font-inter text-xs font-bold">Join Now</span>
            </div>
          ))}
        {/* New Join */}
        {!suggestions && (
           pageDataLoading ? (
            <Skeleton
              className={`absolute top-2 right-2 bg-secondary w-[105px] h-[40px] rounded-md mb-1`}
            />
          ) : (<div
            className="absolute top-2 right-2 flex justify-start items-center gap-2 px-2 py-2 backdrop-blur-lg rounded-lg bg-primary bg-opacity-50 border border-white border-opacity-10 "
            onClick={() => router.push(`/t/${tribe?.tribeId}/community`)}
          >
            <span className="font-inter text-xs font-bold">
              Go To Community
            </span>
          </div>)
        )}
      </div>
    </div>
  );
};

export default TribeList;
