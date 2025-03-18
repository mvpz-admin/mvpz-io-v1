import Image from "next/image";
import React, { useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { extractPostDetails } from "../../../utils/global/global";
import { callAPI } from "../../../lib/utils";
import { log } from "node:console";
import { formatNumber } from "../../../utils/global/formating";
import Skeleton from "../../Atoms/Others/Skeleton";
import { useRouter } from "next/router";
import { useAuthStore } from "../../../store/useAuthStore";
import { useLoginProcessStore, usePostTipStore } from "../../../store/useGlobalStore";



const Post = ({
  postType,
  post,
  suggestion = false,
  loading,
}: {
  postType: "publicpost" | "tribepost" | "shoutpost";
  post: any;
  suggestion?: boolean;
  loading: boolean;
}) => {
  let [isHover, setIsHover] = useState(false);
  let [following, setFollowing] = useState(post?.postedBy?.following);
  let router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.user)?.token; 
  const {setOpenLoginModel} = useLoginProcessStore((state) => state)
  const {setOpenTipModel} = usePostTipStore((state) => state)
  

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

  const handleToggleFollow = async () => {
    if(isLoggedIn){
      setFollowing(!following);
      const response = await callAPI({
        endpoint: `/v1/profiles/user/${post?.postedBy?.username}/follow`,
        method: "PUT",
      });
      if (!response.success) {
        setFollowing(!following);
      }
    }else{
      setOpenLoginModel()
    }
    
  };

  const handleToggleLike = async (likeType) => {
   if(isLoggedIn){
    if (isLiked?.likedType === likeType) {
      // Unlike logic
      setIsLiked({ isLiked: false, likedType: null });
      setReactions((prev) => ({
        ...prev,
        [likeType]: Math.max(0, prev[likeType] - 1),
        totalReactions: Math.max(0, prev.totalReactions - 1),
      }));
    } else {
      // New like logic
      setIsLiked({ isLiked: true, likedType: likeType });
      setReactions((prev) => ({
        ...prev,
        [likeType]: prev[likeType] + 1,
        totalReactions: prev.totalReactions + 1,
      }));
    }

    const response = await callAPI({
      endpoint: `/v1/post/${postType}/${post?.id}/react/${likeType}`,
      method: "PUT",
    });

    if (!response.success) {
      setIsLiked({ isLiked: false, likedType: null });
      setReactions((prev) => ({
        ...prev,
        [likeType]: Math.max(0, prev[likeType] - 1),
        totalReactions: Math.max(0, prev.totalReactions - 1),
      }));
    }
   }else{
    setOpenLoginModel()
   }
  };

  const handleOpenTipModel = async () => {
    if(isLoggedIn){
      setOpenTipModel({
        postedBy : {
          id : post?.postedBy?.id,
          name : post?.postedBy?.name,
          profileImage : post?.postedBy?.profileImage,
          isVerified : post?.postedBy?.isVerified,
        },
        postId : post?.id,
        postThumbnail : post?.thumbnail,
        postFor : postType
      })
    }else{
      setOpenLoginModel()
    }
  }

  let { hasMore, postTitle } =
    !loading && extractPostDetails({ message: post?.message, maxLength: 400 });

  return (
    <>
    <div className="relative w-full  border border-white border-opacity-20 rounded-lg">
      {/* header */}
      <div className="flex justify-between items-center py-2 px-4">
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
                <article
                  className="md:block hidden  text-[12px] font-inter  text-blue-500 cursor-pointer font-medium"
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
          {loading ? (
            <Skeleton
              className={`bg-secondary w-[18px] h-[18px] rounded-md mb-1`}
            />
          ) : (
            <FaEllipsisV size={14} opacity={0.8} />
          )}
        </div>
      </div>
      {/* media */}
      <div
        className="w-full  border-y border-white border-opacity-20 space-y-5 "
        onClick={() => router.push(`/fanzone/p/${postType}/${post.id}`)}
      >
        {loading ? (
          <Media media={{}} loading={loading} />
        ) : (
          post?.thumbnail && <Media media={post?.thumbnail} loading={loading} />
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
      {/* Footer */}
      {!suggestion && (
        <div className="relative w-full py-4 px-4 flex justify-between items-center">
          {/* left section */}
          <div className="flex justify-center items-center gap-4">
            {loading ? (
              <>
                <Skeleton
                  className={`bg-secondary w-[20px] h-[18px] rounded-md mb-1`}
                />
                <Skeleton
                  className={`bg-secondary w-[20px] h-[18px] rounded-md mb-1`}
                />
                <Skeleton
                  className={`bg-secondary w-[20px] h-[18px] rounded-md mb-1`}
                />
              </>
            ) : (
              <>
                <div
                  className="relative cursor-pointer"
                  onClick={() => setIsHover(!isHover)}
                >
                  {isLiked?.isLiked ? (
                    <HightlightLike likeType={isLiked?.likedType} />
                  ) : (
                    <Image src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741550745/heart_2_kqmow9.png`} alt="tip" width={500} height={500} className="relative w-5 h-5"/>
                  )}

                  <div
                    className={`absolute left-0 bottom-[150%] transition-all duration-300 ${
                      isHover ? "visible" : "invisible"
                    } `}
                  >
                    {isHover && (
                      <ReactionModel onReact={(id) => handleToggleLike(id)} />
                    )}
                  </div>
                </div>
                <Image
                  src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741550651/bubble-chat_dsxmxf.png`}
                  alt="tip"
                  width={500}
                  height={500}
                  className="relative w-5 h-5 cursor-pointer"
                  onClick={() =>
                    router.push(`/fanzone/p/${postType}/${post.id}#comments`)
                  }
                />

                <Image
                  src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741550534/bonus_2_eexxyv.png`}
                  alt="tip"
                  width={500}
                  height={500}
                  className="relative w-5 h-5 cursor-pointer"
                  onClick={handleOpenTipModel}
                />
              </>
            )}
          </div>
          {!loading ? (
            <IoIosShareAlt size={20} />
          ) : (
            <Skeleton
              className={`bg-secondary w-[20px] h-[18px] rounded-md mb-1`}
            />
          )}
        </div>
      )}
    </div>
   

    </>
  );
};

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
const ReactionType = ({ id, icon, title, onReact }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="relative w-[30px] h-[30px] cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => onReact(id)}
    >
      <Image
        src={icon}
        alt={title}
        width={500}
        height={500}
        className="relative w-full h-full object-cover transition-all duration-300 hover:scale-150"
      />
      {isHover && (
        <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 px-4 py-2 bg-secondary rounded-full border border-white border-opacity-10 font-inter text-[10px] font-bold w-[100px] flex justify-center items-center">
          <div>{title}</div>
        </div>
      )}
    </div>
  );
};

const ReactionModel = ({ onReact }) => (
  <div className="rounded-full p-2 flex justify-start items-center backdrop-blur-xl bg-secondary bg-opacity-100 border border-white border-opacity-10 gap-2">
    {[
      {
        id: "hearts",
        title: "Heart",
        icon: "https://res.cloudinary.com/dv667zlni/image/upload/v1741383072/heart_cxoh8d.png",
      },
      {
        id: "claps",
        title: "Clap",
        icon: "https://res.cloudinary.com/dv667zlni/image/upload/v1741383184/clapping_1_trpyg7.png",
      },
      {
        id: "fires",
        title: "Fire",
        icon: "https://res.cloudinary.com/dv667zlni/image/upload/v1741373381/fire_e780s7.png",
      },
      {
        id: "good_luck",
        title: "Good Luck",
        icon: "https://res.cloudinary.com/dv667zlni/image/upload/v1741373510/clover_kkchmg.png",
      },
    ].map((reaction) => (
      <ReactionType
        key={reaction.id}
        {...reaction}
        onReact={(id) => onReact(id)}
      />
    ))}
  </div>
);
const HightlightLike = ({
  likeType,
}: {
  likeType: "hearts" | "claps" | "fires" | "good_luck" | null;
}) => {
  let Comp = ({ icon, label }) => {
    return (
      <div className="flex justify-start items-center gap-2">
        <img src={icon} className="w-6 h-6 borde-2 border-black " />
        <article className="font-inter text-[12px] font-bold">{label}</article>
      </div>
    );
  };

  switch (likeType) {
    case "hearts":
      return (
        <Comp
          icon={
            "https://res.cloudinary.com/dv667zlni/image/upload/v1741383072/heart_cxoh8d.png"
          }
          label={"Liked"}
        />
      );
    case "claps":
      return (
        <Comp
          icon={
            "https://res.cloudinary.com/dv667zlni/image/upload/v1741383184/clapping_1_trpyg7.png"
          }
          label={"Claped"}
        />
      );

    case "fires":
      return (
        <Comp
          icon={
            "https://res.cloudinary.com/dv667zlni/image/upload/v1741373381/fire_e780s7.png"
          }
          label={"Fire"}
        />
      );

    case "good_luck":
      return (
        <Comp
          icon={
            "https://res.cloudinary.com/dv667zlni/image/upload/v1741373510/clover_kkchmg.png"
          }
          label={"Good Luck"}
        />
      );
  }
};

export default Post;
