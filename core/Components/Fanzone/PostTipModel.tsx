import React, { useState } from "react";
import { usePostTipStore } from "../../../store/useGlobalStore";
import { IoChevronBackOutline, IoClose, IoInformation } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import TipSlider from "./Post/TipSlider";
import TextFeild from "../../Atoms/Inputs/TextFeild";
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";
import { callAPI } from "../../../lib/utils";
import { useAuthStore } from "../../../store/useAuthStore";
import { useRouter } from "next/router";

const PostTipModel = () => {
  const { setCloseTipModel, postedBy, postId, postFor } = usePostTipStore(
    (state) => state
  );
  const { user } = useAuthStore((state) => state);
  const [showFetaureInfo, setShowFeatureInfo] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center font-inter"
      onClick={setCloseTipModel}
    >
      <div
        className="relative md:w-[650px] w-[95%] md:h-[400px] h-[425px] rounded-xl bg-secondary  flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex justify-between items-center gap-10 p-6 bg-ternary ">
          {/* Left Side */}
          <div className="relative flex flex-col ">
            <article className="text-lg font-semibold">
              Tip {postedBy?.name}
            </article>
            {postFor === "athleteprofile" ? (
              <article className="text-xs opacity-50">
                Support your favorite athlete – every tip makes a difference!
              </article>
            ) : (
              <article className="text-xs opacity-50">
                Like this post? Send a tip and make their day!
              </article>
            )}
          </div>
          {/* Right Side */}
          <div className="flex justify-end items-center gap-3">
            {!showFetaureInfo && (
              <AiOutlineQuestionCircle
                cursor={"pointer"}
                size={25}
                onClick={() => setShowFeatureInfo(!showFetaureInfo)}
              />
            )}
            <IoClose cursor={"pointer"} size={25} onClick={setCloseTipModel} />
          </div>
        </div>
        {/* content */}
        <div className="relative flex-1 w-full h-full overflow-y-auto scroller-hidden p-6">
          {!showFetaureInfo ? (
            <PayTip
              postId={postId}
              user={user}
              postedBy={postedBy}
              postFor={postFor}
              setCloseTipModel={setCloseTipModel}
            />
          ) : (
            <FeatureInfo backToPay={() => setShowFeatureInfo(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

const PayTip = ({ postedBy, user, postId, postFor, setCloseTipModel }) => {
  const [tipAmount, setTipAmount] = useState(1);
  const [customTip, setCustomTip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePost = async () => {
    setError(false);
    setLoading(true);

    let response = await callAPI({
      endpoint: `/v1/pay/tip/${postFor}/initiate`,
      method: "POST",
      body: {
        fromUserId: user?.id,
        toUserId: postedBy?.id,
        tipAmount,
        postId,
        callbackUrl: window.location.pathname,
      },
    });

    if (!response.success) {
      setLoading(false);
      return setError(response.error);
    }

    window.location.href = response?.data?.checkoutUrl;

    setLoading(false);
    setCloseTipModel();
  };

  return (
    <>
      <div className="relative w-full h-full flex flex-col">
        {/* PostedBY */}
        <div className="w-full p-4 rounded-lg border border-white border-opacity-10 flex justify-between items-center gap-5 bg-ternary">
          {/* left section */}
          <div className="flex justify-start items-center  gap-2 ">
            {/* Profile Image */}
            <div className="relative w-[65px] h-[65px] rounded-full border border-white border-opacity-20">
              <Image
                src={
                  postedBy?.profileImage ||
                  "https://res.cloudinary.com/dv667zlni/image/upload/v1741769354/user_1_jgrhuq.png"
                }
                alt={postedBy?.name}
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>
            {/* TO Tip Info */}
            <div className="relative flex flex-col">
              <div className="flex justify-start items-center">
                <article className="font-semibold text-base">
                  {postedBy?.name}
                </article>
                {postedBy?.isVerified && (
                  <BsFillPatchCheckFill
                    size={12}
                    className="text-indigo-500 ml-1"
                  />
                )}
              </div>
              {/* info */}
              {postFor === "athleteprofile" ? (
                <article className="text-[12px] opacity-50">
                  Keep pushing, you’re an inspiration!
                </article>
              ) : (
                <article className="text-[12px] opacity-50">
                  Thanks for the amazing content!
                </article>
              )}
            </div>
          </div>
          {/* right Section */}
          <article className="font-inter font-bold text-xl text-white">
            ${Number(tipAmount).toFixed(2)}
          </article>
        </div>
        {/* tip selection */}
        <div className="relative w-full py-5 px-2">
          {!customTip ? (
            <TipSlider onChange={(vale) => setTipAmount(vale)} />
          ) : (
            <TextFeild
              icon={"$"}
              type="number"
              inputStyle={`pl-[28px]`}
              value={tipAmount}
              min={1}
              onChange={(e) =>
                setTipAmount(Math.max(1, Number(e.target.value)))
              }
            />
          )}
        </div>
        {/* buttons */}
        <div className="absolute bottom-2 right-2  flex justify-end items-end gap-5 font-inter text-[14px] font-semibold w-full">
          <button
            className="px-3 py-2 bg-primary rounded-full bg-gradient-to-l from-[#8A2387] via-[#E94057] to-[#F27121] "
            onClick={() => setCustomTip(!customTip)}
          >
            Custom Tip
          </button>
          <button
            className="px-3 py-2 bg-primary rounded-full"
            onClick={() => !loading && handlePost()}
          >
            Pay Tip
          </button>
        </div>
      </div>
      {/* loading effect */}
      {loading && (
        <div className="absolute top-0 left-0 w-full z-10">
          <LineLoadingEffect />
        </div>
      )}
    </>
  );
};

const FeatureInfo = ({ backToPay }) => {
  return (
    <div className="relative w-full">
      <div
        className="mb-5 font-bold flex justify-start items-center gap-1 text-primary cursor-pointer"
        onClick={backToPay}
      >
        <IoMdArrowBack />
        <span>Pay Tip</span>
      </div>
      <article className="text-base font-semibold opacity-75">
        Introducing MVPZ Tips – Support Creators & Athletes!
      </article>
      <p className="text-[10px] opacity-50">
        MVPZ lets you go beyond just liking a post—now, you can{" "}
        <strong>tip</strong> your favorite athletes and creators to show real
        support! Whether it's an inspiring highlight, a game-changing moment, or
        just content you love, your tip helps them continue creating and
        growing.
      </p>
      <br />
      <article className="text-base font-semibold opacity-75">
        How it Works:
      </article>
      <ul className="text-[10px] opacity-50">
        <li>
          Click the <strong>"Tip"</strong> button on any post.
        </li>
        <li>Choose your tip amount and add an optional message.</li>
        <li>Your tip is sent instantly, and the creator gets notified!</li>
      </ul>
      <br />
      <p className="text-[10px] opacity-50">
        Your support makes a difference.{" "}
        <strong>Tip, uplift, and be part of their journey!</strong> 🚀
      </p>
    </div>
  );
};

export default PostTipModel;
