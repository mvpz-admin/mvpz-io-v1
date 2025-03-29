import React, { useEffect, useState } from "react";
import { useNotifications } from "../../../store/useGlobalStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { callAPI } from "../../../lib/utils";

const NotificationsModel = () => {
  const {
    setCloseModel,
    openModel,
    notifications,
    setFilterNotifications,
    setClearAllNotifications,
  } = useNotifications((state) => state);
  const isLoggedIn = useAuthStore((state) => state.user);
  const [error, setError] = useState(null);

  const handleRemove = async (id) => {
    setFilterNotifications(id);
    await callAPI({
      endpoint: `/v1/global/notifications/clear-notify?notifyId=${id}`,
      method: "PUT",
    });
  };

  const handleClearAll = async () => {
    setClearAllNotifications();
    await callAPI({
      endpoint: "/v1/global/notifications/clear-all",
      method: "PUT",
    });
  };

  const handleMarkAllRead = async () => {
    await callAPI({
      endpoint: "/v1/global/notifications/mark-all-read",
      method: "PUT",
    });
  };

  useEffect(() => {
    if (openModel) {
      handleMarkAllRead();
    }
  }, [openModel]);

  return (
    <div
      className={`fixed top-0 ${
        openModel ? "right-0" : "-right-[100%]"
      } w-full h-full z-50 transition-all duration-100`}
    >
      {/* bg */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={setCloseModel}
      >
        {/* conte */}
        <div
          className="absolute top-0 right-0 md:w-[400px] w-full h-screen rounded-3xl bg-[#111] bg-opacity-90 !backdrop-blur-xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="relative px-6 py-6 border-b border-white border-opacity-20 font-inter font-bold flex justify-between items-center ">
            <article className="text-xl"> Notifications</article>
            <IoClose size={30} onClick={setCloseModel} />
          </div>
          {/* content */}
          <div className="w-full flex-1 h-full flex flex-col  overflow-y-auto">
            <div className="flex justify-between items-center font-inter text-[14px] font-semibold  px-6 py-6  ">
              <article>
                {notifications?.length > 99 ? "99+" : notifications?.length}{" "}
                Notifications
              </article>
              <article
                className="cursor-pointer hover:underline text-[12px]"
                onClick={handleClearAll}
              >
                Clear All
              </article>
            </div>
            <div className="relative flex-1 w-full h-full overflow-y-auto scroller-hidden space-y-2">
              {notifications?.map((item, idx) => (
                <Block key={idx} item={item} handleRemove={handleRemove} />
              ))}
            </div>
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

export default NotificationsModel;
