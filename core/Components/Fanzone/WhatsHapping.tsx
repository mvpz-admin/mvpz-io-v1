import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { IoImage, IoVideocam } from "react-icons/io5";
import { useAuthStore } from "../../../store/useAuthStore";
import { useLoginProcessStore } from "../../../store/useGlobalStore";


const WhatsHapping = ({loading}) => {
  const router = useRouter();
  const {user} = useAuthStore((state) => state)
  const isLoggedIn = useAuthStore((state) => state.user)?.token; 
  const {setOpenLoginModel} = useLoginProcessStore((state) => state)
  const handleOpenModel = () => {
    router.replace(
      {
        pathname: window.location.pathname,
        query: {
          p: "feed",
        },
      },
      undefined,
      { shallow: true }
    );
  };


  const handleOpenPostModel = () => {
    if(!loading){
      if(isLoggedIn){
        handleOpenModel()
      }else{
        setOpenLoginModel()
      }
    }

  }

  return (
    <div
      className="w-full  rounded-full  border-2 border-white border-opacity-10  bg-white bg-opacity-10 flex justify-between items-center gap-10 cursor-pointer p-2"
      onClick={handleOpenPostModel}
    >
      <div className="flex  flex-1 justify-center items-center md:gap-3 gap-2">
        <div className=" relative h-[45px] w-[45px] md:border-1 border-white border-opacity-90 rounded-full md:p-[2px] ">
          <div className="relative w-full h-full bg-secondary rounded-full">
            <Image
              src={user?.profileImage || "https://res.cloudinary.com/dv667zlni/image/upload/v1741769354/user_1_jgrhuq.png"}
              alt="bg"
              width={500}
              height={500}
              className="relative w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 h-full  py-2 ">
          <article className="font-inter md:text-base text-[12px] font-medium opacity-50 ">
            What is Happeing!?
          </article>
        </div>
      </div>
      <div className="flex   justify-end items-center md:gap-4 gap-2 mr-2">
        <IoImage className={"md:text-[20px] text-[16px]"} />
        <IoVideocam className={"md:text-[20px] text-[16px]"} />
      </div>
    </div>
  );
};

export default WhatsHapping;
