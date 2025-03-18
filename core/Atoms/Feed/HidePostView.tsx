import React from "react";
import { IoIosClose } from "react-icons/io";

const HidePostView = ({
    handleClose
}) => {
  return (
    <div className="relative ">
    <div className="absolute top-2 right-2 w-[50px] h-[50px] bg-black bg-opacity-50 z-10  rounded-full cursor-pointer flex justify-center items-center" onClick={handleClose}>
        <IoIosClose className="text-primary text-3xl"/>
    </div>
      <div className="relative w-full h-[400px] bg-secondary rounded-md flex flex-col justify-center items-center md:p-10 p-2 space-y-6" >
        <div className="space-y-4">
          <article className="md:text-3xl text-xl text-center">
            Post Hidden Successfully!
          </article>
          <article className="md:text-[10px] text-[10px] text-center md:px-10 px-2">
          You have successfully hidden this post. It will no longer be visible to others on your profile. You can unhide it at any time if you wish to make it visible again.
          </article>
        </div>
        <div className="px-5 py-2 bg-primary rounded-md text-[10px] cursor-pointer" onClick={handleClose}>
          Hide Message
        </div>
      </div>
      <div className="py-8">
        <div className="w-full h-[0.5px] bg-white opacity-[0.4]"></div>
      </div>
    </div>
  );
};

export default HidePostView;
