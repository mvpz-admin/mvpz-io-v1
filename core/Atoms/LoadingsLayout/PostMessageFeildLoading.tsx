import Image from "next/image";
import React from "react";
import { Skeleton } from "@mantine/core";

const PostMessageFeildLoading: React.FC<{}> = ({}) => {
  return (
    <>
      <div className="relative w-full h-[80px]  py-4 flex justify-between items-center gap-5  cursor-pointer select-none ">
        <div className="h-full  flex justify-start items-center gap-5">
          <div className="relative h-full w-[50px] ">
            <Skeleton className=" h-[50px] w-[50px] rounded-full" />
          </div>
          <Skeleton className="md:w-[400px] w-[100px] h-[20px] rounded-md" />
        </div>

        <div className="h-full  flex justify-start items-center gap-5 px-4">
          <Skeleton className="w-[20px] h-[20px] rounded-sm" />
          <Skeleton className="w-[20px] h-[20px] rounded-sm" />
        </div>
        <Skeleton className="absolute bottom-0 left-0 w-full h-[1px]" />
      </div>
    </>
  );
};

export default PostMessageFeildLoading;
