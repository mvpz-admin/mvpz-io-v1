import React, { useEffect, useState } from "react";
import { useGlobalMenuStore } from "../../../store/useGlobalStore";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/router";
import { HomePagesTab, SidebarTab } from "../../../utils/global/global";
const SidebarMenu = () => {
  const { openGlobalMenu, setCloseGlobalMenu } = useGlobalMenuStore(
    (state) => state
  );

  const router = useRouter();
  return (
    <div
      className={`fixed top-0 ${
        openGlobalMenu ? "left-0" : "-left-[100%]"
      } w-full h-full z-50 transition-all duration-100`}
    >
      {/* bg */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={setCloseGlobalMenu}
      >
        {/* conte */}
        <div
          className="absolute top-0 left-0 md:w-[350px] w-full h-screen rounded-3xl bg-[#111] bg-opacity-90 !backdrop-blur-xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="relative px-6 py-6 border-b border-white border-opacity-20 font-inter font-bold flex justify-between items-center ">
            <Image
              src={`/images/logos/mvpzV1.png`}
              alt="poster"
              width={2000}
              height={2000}
              className="relative lg:w-[80px] w-[60px] object-contain cursor-pointer  mt-2"
            />
            <IoClose size={30} onClick={setCloseGlobalMenu} />
          </div>
          {/* content */}
          <div className="w-full flex-1 h-full flex flex-col  overflow-y-auto">
            {SidebarTab.map((item) => (
              <article
                className="p-4 hover:bg-white hover:bg-opacity-10 font-semibold cursor-pointer"
                onClick={() => {
                  router.push(item.url);
                  setCloseGlobalMenu();
                }}
              >
                {item.label}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Block = ({ item, handleRemove }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="relative w-full p-6 flex justify-between items-center rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex-1 w-full pr-6 flex justify-start items-cnter gap-2">
        <div className="relative w-10 h-10 rounded-full bg-white bg-opacity-10">
          {item.thumbnail && (
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={40}
              height={40}
              className="rounded-full relative w-full h-full object-cover"
            />
          )}
          {/* unread notification */}
          {item.isRead === false && (
            <div className="absolute top-[2px] right-[2px] w-2 h-2 rounded-full bg-red-500 z-10"></div>
          )}
        </div>
        <div className="flex-1 relative w-full flex flex-col justify-center items-start ">
          <article className="text-[14px] font-semibold">{item.title}</article>
          <article className="text-[10px]">{item.message}</article>
        </div>
      </div>
      <div>
        {isHover ? (
          <IoClose
            size={20}
            color="white"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(item.id);
            }}
          />
        ) : (
          <article className="text-[10px]">{item.notifyAt}</article>
        )}
      </div>
    </div>
  );
};

export default SidebarMenu;
