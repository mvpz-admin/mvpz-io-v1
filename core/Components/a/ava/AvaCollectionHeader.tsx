import Image from 'next/image'
import React from 'react'
import Skeleton from '../../../Atoms/Others/Skeleton'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { formatNumber } from '../../../../utils/global/formating'

const AvaCollectionHeader = ({title,avaCollectionDataLoading, avaCollectionData}) => {
  return (
    <>
      <div className="relative w-full md:h-[450px] h-[400px] z-0">
        {/* Bg Image */}
        <div className="absolute top-0 left-0 w-full h-full bg-ternary z-0">
          {!avaCollectionDataLoading && avaCollectionData?.bannerImage && (
            <Image
              src={avaCollectionData?.bannerImage}
              alt="bgimage"
              width={1000}
              height={1000}
              className="relative w-full h-full object-cover grayscale"
            />
          )}
        </div>
        {/* Bglayer */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-5 flex flex-col justify-end items-start space-y-5 pb-10">
          <div className="md:px-10 px-5 w-full flex md:flex-row flex-col md:justify-between md:items-end">
            {/* left Section */}
            <div className="flex md:flex-row flex-col  md:justify-start md:items-center md:gap-5 ">
              <div
                className={`relative md:w-[125px] w-[75px] md:h-[125px] h-[75px] ${
                  avaCollectionDataLoading ? "border-0" : "border-2"
                } border-white  md:rounded-full rounded-md p-[2px]`}
              >
                <div className="relative w-full h-full bg-secondary md:rounded-full rounded-md">
                  {!avaCollectionDataLoading && avaCollectionData?.profileImage && (
                    <Image
                      src={avaCollectionData?.profileImage}
                      alt="bg"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover md:rounded-full rounded-md"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center items-start mt-4 ">
                {avaCollectionDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <span className="md:text-[14px] text-[12px] font-inter">
                    {avaCollectionData?.username}
                  </span>
                )}
                {avaCollectionDataLoading ? (
                  <Skeleton
                    className={`bg-secondary w-[250px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex  justify-start items-center">
                    <article className="md:text-2xl text-xl font-inter font-semibold">
                      {avaCollectionData?.name}
                    </article>

                    {avaCollectionData?.isVerified && (
                      <BsFillPatchCheckFill
                        size={18}
                        className="text-indigo-500 ml-1"
                      />
                    )}
                  </div>
                )}
                <div
                  className={`flex justify-start items-center ${
                    avaCollectionData ? "gap-2 " : "gap-4"
                  } font-inter md:text-[12px] text-[12px] font-bold`}
                >
                  {avaCollectionDataLoading ? (
                    <Skeleton
                      className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                    />
                  ) : (
                    <div className="flex justify-start gap-2">
                      <span>
                        {formatNumber(avaCollectionData?._count?.followers)}
                      </span>
                      <span className="font-semibold md:opacity-50 opacity-75">
                        Followers
                      </span>
                    </div>
                  )}
                  {avaCollectionDataLoading ? (
                    <Skeleton
                      className={`bg-secondary  w-[50px] h-[18px] rounded-md mb-1`}
                    />
                  ) : (
                    <div className="flex justify-start gap-2">
                      <span>
                        {formatNumber(avaCollectionData?._count?.following)}
                      </span>
                      <span className="font-semibold md:opacity-50 opacity-75">
                        Following
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
           
          </div>
          <div className="md:px-10 px-5 w-full flex md:flex-row flex-col md:justify-between md:items-end">
            <article className="font-inter text-4xl font-bold">{title}</article>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default AvaCollectionHeader
