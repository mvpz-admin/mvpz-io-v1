import React, { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "../../store/useAuthStore";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import { useRouter } from "next/router";

const XpLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <div className="relative h-screen md:p-10 p-5  md:pt-[100px] overflow-y-auto flex md:flex-row flex-col md:justify-center justify-start md:items-start items-center md:gap-10 gap-5">
      {/* left menu */}
      <div className="md:sticky top-0 md:flex-[0.25] w-full md:h-full border border-white border-opacity-15 rounded-xl  ">
        {/* user profile */}
        <div className="flex  gap-2  border-b border-white border-opacity-15  p-5 mb-5" >
          <div className="w-10 h-10 bg-secondary rounded-full overflow-hidden border border-white border-opacity-50">
            {user?.profileImage && (
              <Image
                src={user?.profileImage}
                alt="user"
                width={100}
                height={100}
                className="relative w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <article className="text-[10px] opacity-80 ">
              {user?.username}
            </article>
            <div className="flex items-center ">
              <article className="font-bold text-[14px]">{user?.name}</article>
              {user?.isVerified && (
                <BsFillPatchCheckFill
                  size={16}
                  className="text-indigo-500 ml-1"
                />
              )}
            </div>
          </div>
        </div>
        {/* display user xp */}
        <div className="flex flex-col gap-2 px-5">
          {/* xp bar */}
          <div className="flex h-[50px]  gap-2  border border-white border-opacity-15  p-2 rounded-lg  justify-start items-center cursor-pointer" onClick={() => router.push("/xp/xp-leaderboard")}>
            <div className="relartive w-10 rounded-lg h-full bg-ternary flex items-center justify-center">
              <Image
                src={`/images/other/xp.svg`}
                alt="xp"
                width={20}
                height={20}
                className="w-[20px] h-[20px] object-contain"
              />
            </div>
            <article className="text-[14px]  font-bold ">Leaderboard</article>
          </div>
          {/* rewards */}
          <div className="flex h-[50px]  gap-2  border border-white border-opacity-15  p-2 rounded-lg  justify-start items-center cursor-pointer" onClick={() => router.push("/xp/rewards")}>
            <div className="relartive w-10 rounded-lg h-full bg-ternary flex items-center justify-center">
              <FaMedal size={14} />
            </div>
            <article className="text-[14px]  font-bold ">Rewards</article>
          </div>
          {/* ranks */}
          <div className="flex h-[50px]  gap-2  border border-white border-opacity-15  p-2 rounded-lg  justify-start items-center cursor-pointer" onClick={() => router.push("/xp/ranks")}>
            <div className="relartive w-10 rounded-lg h-full bg-ternary flex items-center justify-center">
              <AiFillTrophy size={14} />
            </div>
            <article className="text-[14px]  font-bold ">Ranks</article>
          </div>
        </div>
      </div>
      <div className="flex-[0.75] w-full h-auto   p-5">{children}</div>
    </div>
  );
};

export default XpLayout;
