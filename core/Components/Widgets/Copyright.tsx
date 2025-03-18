import React from "react";
import { socialMediaList } from "../../../lib/utils";

const Copyright = () => {
  return (
    <div className="w-full flex md:flex-row flex-col justify-between items-center gap-2">
      <article className="md:text-[10px] text-[8px]">
        © 2025 Arenaz LLC. All rights reserved.
      </article>
      <div className="flex flex-1 justify-end items-center gap-5">
      <article className="md:text-[10px] text-[8px]">
       Privacy Policy
      </article> 
      <article className="md:text-[10px] text-[8px]">
       Cookies
      </article> 
      </div>
    </div>
  );
};

export default Copyright;
