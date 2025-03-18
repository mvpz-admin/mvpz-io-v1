import React, { useEffect, useState } from "react";
import Skeleton from "../../../Atoms/Others/Skeleton";
import { callAPI } from "../../../../lib/utils";
import Image from "next/image";
import { formatNumber } from "../../../../utils/global/formating";
import { IoIosShareAlt } from "react-icons/io";
import { useAuthStore } from "../../../../store/useAuthStore";
import { useLoginProcessStore, usePostTipStore } from "../../../../store/useGlobalStore";

const PostReactionsBar = ({ pageDataLoading, pageData, postType }) => {
  let [isHover, setIsHover] = useState(false);
  let [isLiked, setIsLiked] = useState({
    isLiked: false,
    likedType: null,
  });
  let [reactions, setReactions] = useState({
    heart: 0,
    clap: 0,
    fire: 0,
    good_luck: 0,
    totalReactions: 0,
  });

  const isLoggedIn = useAuthStore((state) => state.user);
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const { setOpenTipModel } = usePostTipStore((state) => state);

  useEffect(() => {
    if (pageData) {
      setIsLiked(pageData?.isLiked);
      setReactions(pageData?.reactions);
    }
  }, [pageData]);

  const handleToggleLike = async (likeType) => {
   if(isLoggedIn?.token){
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
      endpoint: `/v1/post/${postType}/${pageData?.id}/react/${likeType}`,
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
    setOpenLoginModel();
   }
  };

  const handleOpenTipModel = async () => {
    if (isLoggedIn) {
      setOpenTipModel({
        postedBy: {
          id: pageData?.postedBy?.id,
          name: pageData?.postedBy?.name,
          profileImage: pageData?.postedBy?.profileImage,
          isVerified: pageData?.postedBy?.isVerified,
        },
        postId: pageData?.id,
        postThumbnail: pageData?.thumbnail,
        postFor: postType,
      });
    } else {
      setOpenLoginModel();
    }
  };

  return (
    <div
      className="relative w-full  border border-white border-opacity-10 rounded-lg"
      id="comments"
    >
      <div className="relative w-full py-4 px-4 flex justify-between items-center">
        {/* left section */}
        <div className="flex justify-center items-center gap-6 font-inter text-[12px] font-semibold">
          {pageDataLoading ? (
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
                  <HightlightLike
                    likeType={isLiked?.likedType}
                    totalReactions={formatNumber(reactions?.totalReactions)}
                  />
                ) : (
                  <Image
                    src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741550745/heart_2_kqmow9.png`}
                    alt="tip"
                    width={500}
                    height={500}
                    className="relative w-5 h-5"
                  />
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
              <div className="flex justify-start items-start gap-2 cursor-pointer">
                <Image
                  src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741550651/bubble-chat_dsxmxf.png`}
                  alt="tip"
                  width={500}
                  height={500}
                  className="relative w-5 h-5"
                />
                {pageData?._count?.comments > 0 && (
                  <article className="font-inter text-[12px] font-bold">
                    {formatNumber(pageData?._count?.comments)}
                  </article>
                )}
              </div>
              <div className="flex justify-start items-start gap-2 cursor-pointer" title="tip" onClick={handleOpenTipModel}>
                <Image
                  src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741550534/bonus_2_eexxyv.png`}
                  alt="tip"
                  width={500}
                  height={500}
                  className="relative w-5 h-5"
                />
                {pageData?._count?.tips > 0 && (
                  <article className="font-inter text-[12px] font-bold">
                    {formatNumber(pageData?._count?.tips)}
                  </article>
                )}
              </div>
            </>
          )}
        </div>
        {pageDataLoading ? (
          <Skeleton
            className={`bg-secondary w-[20px] h-[18px] rounded-md mb-1`}
          />
        ) : (
          <IoIosShareAlt size={20} />
        )}
      </div>
    </div>
  );
};

const HightlightLike = ({
  likeType,
  totalReactions,
}: {
  likeType: "hearts" | "claps" | "fires" | "good_luck" | null;
  totalReactions: string;
}) => {
  let Comp = ({ icon, reactions }) => {
    return (
      <div className="flex justify-start items-center gap-2">
        <img src={icon} className="w-6 h-6 borde-2 border-black " />
        <div>
          <article className="font-inter text-[12px] font-bold">
            {reactions}
          </article>
        </div>
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
          reactions={totalReactions}
        />
      );
    case "claps":
      return (
        <Comp
          icon={
            "https://res.cloudinary.com/dv667zlni/image/upload/v1741383184/clapping_1_trpyg7.png"
          }
          reactions={totalReactions}
        />
      );

    case "fires":
      return (
        <Comp
          icon={
            "https://res.cloudinary.com/dv667zlni/image/upload/v1741373381/fire_e780s7.png"
          }
          reactions={totalReactions}
        />
      );

    case "good_luck":
      return (
        <Comp
          icon={
            "https://res.cloudinary.com/dv667zlni/image/upload/v1741373510/clover_kkchmg.png"
          }
          reactions={totalReactions}
        />
      );
  }
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

export default PostReactionsBar;
