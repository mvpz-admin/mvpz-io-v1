import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useLoginProcessStore } from "../../../store/useGlobalStore";


const DefaultHeader = () => {
    const router = useRouter()
    const {setOpenLoginModel} = useLoginProcessStore((state) => state)
  return (
    <div className="relative w-full flex justify-between items-center ">
      <a href="/">
        <Image
          src={`/images/logos/mvpzV1.png`}
          alt="poster"
          width={2000}
          height={2000}
          className="relative w-[100px] object-cover cursor-pointer "
        />
      </a>

      <div className="flex justify-end items-center gap-10">
        <div className="flex justify-start items-center gap-8 font-inter font-bold text-[14px]">
          <div className="flex justify-end items-center gap-2">
            <span>Blog</span>
          </div>
          <div className="flex justify-end items-center gap-2">
            {" "}
            <span>Support</span>
          </div>
        </div>
        <div className="bg-primary text-white border-white border border-opacity-5 rounded-full px-4 py-2 text-xs flex justify-start items-center gap-2 cursor-pointer" onClick={setOpenLoginModel}>
          <span>Login</span>
        </div>
      </div>
    </div>
  );
};

export default DefaultHeader;


