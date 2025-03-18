import { Skeleton } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RxOpenInNewWindow } from "react-icons/rx";

const TribeHorizontalLoadingCard = () => {
  const router = useRouter();

  return (
    <div
      className="w-full h-full bg-secondary rounded-md flex flex-col overflow-hidden"
      onClick={() => router.push("/fanzone/tribe/community/@ucla")}
    >
      <div className="relative flex-[0.5] w-full h-full bg-ternary overflow-hidden">
       <Skeleton className="w-full h-full"/>
      </div>
      <div className="relative w-full flex-[0.5] p-10 pr-5 flex md:flex-row flex-col justify-start md:items-end items-start gap-5 -mt-20 ">
        <div className=" md:w-[200px] h-[150px] md:h-[200px] w-[150px] bg-secondary rounded-full p-2 ">
          <div className="w-full h-full bg-ternary rounded-full overflow-hidden">
          <Skeleton className="w-full h-full rounded-full"/>
          </div>
        </div>
        <div className="relative h-auto pb-5 flex-1 space-y-2">
        <Skeleton className="w-[100px] h-[20px]"/>
        <Skeleton className="w-[200px] h-[20px]"/>
        <Skeleton className="w-[200px] h-[20px]"/>
        </div>
      </div>
    </div>
  );
};

export default TribeHorizontalLoadingCard;
