import React from "react";
import { IoIosClose } from "react-icons/io";

const BlockedUserPostView = ({
    handleClose,
    username
}) => {
  return (
    <div className="relative ">
    <div className="absolute top-2 right-2 w-[50px] h-[50px] bg-black bg-opacity-50 z-10  rounded-full cursor-pointer flex justify-center items-center" onClick={handleClose}>
        <IoIosClose className="text-primary text-3xl"/>
    </div>
      <div className="relative w-full h-[400px] bg-secondary rounded-md flex flex-col justify-center items-center md:p-10 p-2 space-y-6" >
        <div className="space-y-4">
          <article className="md:text-3xl text-xl text-center">
            You have Block {username}
          </article>
          <article className="md:text-[10px] text-[10px] text-center md:px-10 px-2">
          You have successfully blocked this user. They will no longer be able to interact with your posts or contact you. If you change your mind, you can unblock them at any time from your settings.
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

export default BlockedUserPostView;
