import React from "react";
import { IoPeople } from "react-icons/io5";

const ReferralsEarningsBlock = ({
    earnings,
    loading
}) => {
  return (
    <div className="relative w-full h-[300px] p-5 rounded-md border border-primary shadow shadow-primary flex flex-col justify-between items-start">
      <div className="flex justify-start items-center gap-2 w-full">
        <IoPeople size={50} className="text-yellow-500" />
        <div className="w-full">
          <article className="text-2xl mb-1 uppercase ">
            Referral
          </article>
        </div>
      </div>
      <div className="w-full ">
        <div className="w-full">
          <article className="font-extrabold">Total Earn</article>
          <article className="text-[40px]">{loading ? "--" : `$${parseFloat(earnings?.signupReferralsAmount + earnings?.productReferralsAmount).toFixed(2)}`}</article>
        </div>
        <div className="w-full h-[1px] bg-white mb-4 opacity-35"></div>
        <div className="w-full flex justify-center items-center gap-5">
          <div className="flex-[0.5]">
            <article className="text-[16px] text-white">{loading ? "--" : `$${earnings?.productReferralsAmount}`}</article>
            <article className="text-[10px] opacity-50">
              Earn From Product Referral
            </article>
          </div>
          <div className="w-[1px] h-[50px] bg-white my-4 opacity-35"></div>
          <div className="flex-[0.5]">
            <article className="text-[16px] text-white">{loading? "--" :`$${earnings?.signupReferralsAmount}`}</article>
            <article className="text-[11px] opacity-50">
              Earn From Signup Referral
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsEarningsBlock;
