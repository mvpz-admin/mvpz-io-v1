import { Skeleton } from "@mantine/core";
import React from "react";

const PostLoadingCard = () => {
  return (
    <div className="w-full h-full space-y-10">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <div className="w-[45px] h-[45px] rounded-full">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
          <div className="block">
            <div className="w-[150px] h-[20px] mb-2">
              <Skeleton className="w-full h-full rounded-sm" />
            </div>
            <div className="w-[100px] h-[20px]">
              <Skeleton className="w-full h-full rounded-sm" />
            </div>
          </div>
        </div>
        
      </div>
      <div className="w-full h-auto space-y-5">
        <div className="w-full h-[400px]">
          <Skeleton className="w-full h-full rounded-md" />
        </div>
        <div className="block">
          <div className="w-full h-[20px] mb-2">
            <Skeleton className="w-full h-full rounded-sm" />
          </div>
          <div className="w-[200px] h-[20px] mb-2">
            <Skeleton className="w-full h-full rounded-sm" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-x-5">
        <div className="w-[30px] h-[30px] rounded-full">
            <Skeleton className="w-full h-full rounded-full" />
          </div> <div className="w-[30px] h-[30px] rounded-full">
            <Skeleton className="w-full h-full rounded-full" />
          </div> <div className="w-[30px] h-[30px] rounded-full">
            <Skeleton className="w-full h-full rounded-full" />
          </div> <div className="w-[30px] h-[30px] rounded-full">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
        </div>
        <div className="w-[50px] h-[20px] rounded-sm">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
      </div>
      <div className="py-8">
        <div className="w-full h-[0.5px] bg-white opacity-[0.2]"></div>
      </div>
    </div>
  );
};

export default PostLoadingCard;
