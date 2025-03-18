import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaShieldHeart } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi";

const HPEarningsBlock = () => {
  return (
    <div className="relative w-full h-[300px] p-5 rounded-md border border-primary shadow shadow-primary flex flex-col justify-between items-start opacity-50">
      <div className="flex justify-start items-center gap-2 w-full">
        <FaShieldHeart size={50} className="text-red-500" />
        <div className="w-full">
          <article className="text-2xl mb-1 uppercase ">XP</article>
        </div>
      </div>
      <div className="w-full ">
        <div className="w-full">
          <article className="font-extrabold">Total Earn</article>
          <article className="text-[40px]">--</article>
        </div>
        <div className="w-full h-[1px] bg-white mb-4 opacity-35"></div>
        <div className="w-full flex justify-center items-center gap-5">
          <div className="flex-[0.5]">
            <article className="text-[16px] text-white">--</article>
            <article className="text-[10px] opacity-50">You Earn from the Latest Tip.</article>
          </div>
          <div className="w-[1px] h-[50px] bg-white my-4 opacity-35"></div>
          <div className="flex-[0.5]">
            <article className="text-[16px] text-white">--</article>
            <article className="text-[11px] opacity-50">Your Highest Tip Yet Till Date.</article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HPEarningsBlock;
