import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "../../../Atoms/Others/Skeleton";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { callAPI } from "../../../../lib/utils";

const PostProfileBar = ({ pageDataLoading, pageData }) => {
  const [following, setFollowing] = useState(null);

  const handleToggleFollow = async () => {
    setFollowing(!following);
    const response = await callAPI({
      endpoint: `/v1/profiles/user/${pageData?.postedBy?.username}/follow`,
      method: "PUT",
    });
    if (!response.success) {
      setFollowing(!following);
    }
  };

  useEffect(() => {
    if (pageData) {
      setFollowing(pageData?.postedBy?.following);
    }
  }, [pageData]);

  return (
    <div className="relative w-full  border border-white border-opacity-10 rounded-lg">
      <div className="flex justify-between items-center py-2 px-4">
        {/* left section */}
        <div className="flex justify-start items-center gap-2">
          <div
            className={`relative w-[55px] h-[55px] ${
              pageDataLoading ? "border-0" : "border-2"
            } border-white border-opacity-30 rounded-full p-[2px]`}
          >
            <div className="relative w-full h-full bg-secondary rounded-full">
              {!pageDataLoading ? (
                <Image
                  src={pageData?.postedBy?.profileImage}
                  alt="bg"
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover rounded-full"
                />
              ) : (
                <Skeleton
                  className={`bg-white bg-opacity-10 w-full h-full rounded-full`}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-start ">
            {pageDataLoading ? (
              <Skeleton
                className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
              />
            ) : (
              <div className="flex justify-start items-center">
                <span className="text-[14px] font-inter">
                  {pageData?.postedBy?.name}
                </span>{" "}
                {pageData?.postedBy?.isVerified && (
                  <BsFillPatchCheckFill
                    size={12}
                    className="text-indigo-500 ml-1"
                  />
                )}
              </div>
            )}
            {pageDataLoading ? (
              <Skeleton
                className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
              />
            ) : (
              <div className="flex  justify-start items-center">
                <article className="text-xs font-inter opacity-80  ">
                  {pageData?.postedBy?.username}
                </article>

                <div className="w-1 h-1 rounded-full bg-white bg-opacity-50 mx-[5px]" />
                <article className="text-xs font-inter opacity-80 ">
                  {pageData?.upload_on}
                </article>
                <div className="w-1 h-1 rounded-full bg-white bg-opacity-50 mx-[5px]" />
                <article
                  className="text-xs font-inter font-medium text-blue-500 cursor-pointer"
                  onClick={() => handleToggleFollow()}
                >
                  {following ? "Following" : "Follow"}
                </article>
              </div>
            )}
          </div>
        </div>
        {/* right section */}
        <div className="relative">
          <FaEllipsisV size={14} opacity={0.8} />
        </div>
      </div>
    </div>
  );
};

export default PostProfileBar;
