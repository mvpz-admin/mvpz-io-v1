import Image from "next/image";
import React, { useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { extractPostDetails } from "../../../utils/global/global";
import { callAPI } from "../../../lib/utils";
import { formatNumber } from "../../../utils/global/formating";
import Skeleton from "../../Atoms/Others/Skeleton";
import { useRouter } from "next/router";

const Media = ({ media, loading }) => {
  return (
    <div
      className={`relative w-full ${
        loading ? "h-[500px]" : "max-h-[650px]"
      }  bg-black gap-1 overflow-hidden`}
    >
      <div className="w-full h-full bg-secondary">
        {!loading && (
          <Image
            src={media}
            alt="img"
            width={500}
            height={500}
            className="relative w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};
const EmptyMedia = () => {
  return (
    <div className={`relative w-full h-[80px] bg-black gap-1 overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-full z-0 transition-all duration-500">
        <Image
          src={
            "https://res.cloudinary.com/dv667zlni/image/upload/v1740160071/5_xerhen.png"
          }
          alt="bg"
          width={500}
          height={500}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 opacity-100`}
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-5 bg-gradient-to-b from-transparent to-black"></div>
      <div className="absolute top-0 left-0 w-full h-full z-5 backdrop-blur-3xl px-10 pt-[125px] overflow-y-auto space-y-10 "></div>
    </div>
  );
};

const PostSuggestion = ({
  postType,
  post,
  loading,
}: {
  postType: "publicpost" | "tribepost" | "shoutpost";
  post: any;
  suggestion?: boolean;
  loading: boolean;
}) => {
  let router = useRouter();
  

  let [isLiked, setIsLiked] = useState(
    post?.isLiked || {
      isLiked: false,
      likedType: null,
    }
  );

  let [reactions, setReactions] = useState(
    post?.reactions || {
      heart: 0,
      clap: 0,
      fire: 0,
      good_luck: 0,
      totalReactions: 0,
    }
  );

  

  let { hasMore, postTitle } =
    !loading && extractPostDetails({ message: post?.message, maxLength: 100 });

  return (
    <div className="relative w-full  border border-white border-opacity-20 rounded-lg overflow-hidden">
      {/* media */}
      <div
        className="relative w-full  border-white border-opacity-20  "
        onClick={() => router.push(`/fanzone/p/${postType}/${post.id}`)}
      >
        {/* absolute - header */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center py-2 px-4 z-10 backdrop-blur-xl bg-black bg-opacity-20">
          {/* left section */}
          <div className="flex justify-start items-center gap-2">
            <div
              className={`relative w-[55px] h-[55px] ${
                loading ? "border-0" : "border-2"
              } border-white border-opacity-30 rounded-full p-[2px]`}
            >
              <div className="relative w-full h-full bg-secondary rounded-full">
                {!loading ? (
                  <Image
                    src={post?.postedBy?.profileImage}
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
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex justify-start items-center">
                  <span className="text-[12px] font-inter font-medium">
                    {post?.postedBy?.name}
                  </span>{" "}
                  {post?.postedBy?.isVerified && (
                    <BsFillPatchCheckFill
                      size={12}
                      className="text-indigo-500 ml-1"
                    />
                  )}
                </div>
              )}
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[150px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="text-[10px] font-inter opacity-80 ">
                    {post?.postedBy?.username}
                  </article>

                  <div className="w-1 h-1 rounded-full bg-white bg-opacity-50 mx-[5px]" />
                  <article className="text-[10px] font-inter opacity-80 ">
                    {post?.upload_on}
                  </article>
                  <div className="md:block hidden w-1 h-1 rounded-full bg-white bg-opacity-50 mx-[5px]" />
                 
                </div>
              )}
            </div>
          </div>
          {/* right section */}
          <div className="relative">
            {loading ? (
              <Skeleton
                className={`bg-secondary w-[18px] h-[18px] rounded-md mb-1`}
              />
            ) : (
              <FaEllipsisV size={14} opacity={0.8} />
            )}
          </div>
        </div>
        {/* content */}
        <div className="relative w-full z-0">
          {loading ? (
            <Media media={{}} loading={loading} />
          ) : post?.thumbnail ? (
            <Media media={post?.thumbnail} loading={loading} />
          ) : (
            <EmptyMedia />
          )}

          <div className="relative w-full px-4 py-4 space-y-4">
            {!loading && (
              <article className="relative text-[14px] font-inter ">
                {postTitle}
                {hasMore && (
                  <span className="font-bold text-primary cursor-pointer">
                    See More
                  </span>
                )}
              </article>
            )}
            <div className=" flex justify-between items-center gap-2 font-inter text-[10px] font-medium">
              <div className="flex justify-start items-center gap-2  relative cursor-pointer">
                {reactions?.totalReactions > 0 && (
                  <div className="flex justify-start items-center gap-2 -space-x-3">
                    {[
                      reactions?.hearts > 0 &&
                        "https://res.cloudinary.com/dv667zlni/image/upload/v1741383072/heart_cxoh8d.png",
                      reactions?.claps > 0 &&
                        "https://res.cloudinary.com/dv667zlni/image/upload/v1741383184/clapping_1_trpyg7.png",
                      reactions?.fires > 0 &&
                        "https://res.cloudinary.com/dv667zlni/image/upload/v1741373422/fire_1_hoeaxn.png",
                      reactions?.good_luck > 0 &&
                        "https://res.cloudinary.com/dv667zlni/image/upload/v1741373510/clover_kkchmg.png",
                    ]?.map((_, idx) => {
                      return (
                        _ && (
                          <img
                            src={_}
                            className="w-4 h-4 borde-2 border-black "
                          />
                        )
                      );
                    })}
                  </div>
                )}
                {loading ? (
                  <Skeleton
                    className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <article>
                    <span className="opacity-80">
                      {" "}
                      {formatNumber(reactions?.totalReactions)}
                    </span>{" "}
                    <span className="font-semibold">Reactions</span>
                  </article>
                )}
              </div>
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex justify-end items-center gap-2 cursor-pointer">
                  <div
                    className="relative cursor-pointer"
                    onClick={() =>
                      router.push(`/fanzone/p/${postType}/${post.id}`)
                    }
                  >
                    <article>
                      {" "}
                      <span className="opacity-80">
                        {" "}
                        {post?._count?.comments}{" "}
                      </span>
                      <span className="font-semibold">Comments</span>
                    </article>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSuggestion;
