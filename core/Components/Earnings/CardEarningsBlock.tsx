import React from "react";
import { TbCardsFilled } from "react-icons/tb";

const CardEarningsBlock = ({
    loading,
    earnings
}) => {
  return (
    <div className="relative w-full h-[300px] p-5 rounded-md border border-primary shadow shadow-primary flex flex-col justify-between items-start">
      <div className="flex justify-start items-center gap-2 w-full">
        <TbCardsFilled size={50} color="orange" />
        <div className="w-full">
          <article className="text-2xl mb-1 uppercase ">Card</article>
          <article className="text-[10px] opacity-50">
            Revenue from Card Sales
          </article>
        </div>
       
      </div>
    
      <div className="w-full ">
        <div className="w-full">
          <article className="font-extrabold">Total Earn</article>
          <article className="text-[40px]">{loading? "--" : `$${earnings?.earnedMoney}`}</article>
        </div>
        <div className="w-full h-[1px] bg-white mb-4 opacity-35"></div>
        <div className="w-full flex justify-center items-center gap-5">
          <div className="flex-[0.5]">
            <article className="text-[16px] text-white">{loading ? "--" : `${earnings?.cardSold}`}</article>
            <article className="text-[10px] opacity-50">
                Card Sold
            </article>
          </div>
          <div className="w-[1px] h-[50px] bg-white my-4 opacity-35"></div>
          <div className="flex-[0.5]">
            <article className="text-[16px] text-white">{loading? "--" :`${earnings?.cardLeft}`}</article>
            <article className="text-[11px] opacity-50">
              Card Left
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEarningsBlock;
