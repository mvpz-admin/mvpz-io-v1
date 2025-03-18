import { Loader } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { callAPI } from "../../../lib/utils";
import { notifications } from "@mantine/notifications";

const NotificationsModel = ({
  setOpenNotification,
  notifications: nList,
  loading,
  updateSession,
}) => {
  const [clearLoading, setClearLoading] = useState(false);

  const getIconByNotifyType = (type) => {
    switch (type) {
      case "TIP":
        return "/images/notifications/tip.png";
      case "GENERAL":
      case "SYSTEM":
        return "/images/notifications/system.png";
      case "COMMENT":
        return "/images/notifications/comment.png";
      case "FOLLOW":
        return "/images/notifications/follow.png";
      case "LUCK":
        return "/images/notifications/clover.png";
      case "FIRE":
        return "/images/notifications/fire.png";
      case "CLAP":
        return "/images/notifications/clap.png";
    }
  };

  const handleClear = async () => {
    setClearLoading(true);
    const response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/notifications/clear/all`,
    });

    if (!response?.success) {
      setClearLoading(false);
      return notifications.show({ message: response.error });
    }

    setClearLoading(false);
    updateSession();
    notifications.show({ message: response.message });
    setOpenNotification(false);
  };

  const NotificationCard = ({ notification: notify }) => {
    const [showClose, setShowClose] = useState(false);
    const [deletNotifyLoading, setDeletNotifyLoading] = useState(false);

    const handleDeleteNotification = async () => {
      setDeletNotifyLoading(true);
      const response = await callAPI({
        endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/notifications/delete/${notify?.id}`,
      });

      if (!response?.success) {
        setClearLoading(false);
        return notifications.show({ message: response.error });
      }

      setDeletNotifyLoading(false);
      updateSession();
    };

    return (
      <div
        className="relative w-full min-h-[100px] flex justify-start items-center p-2 px-3 bg-secondary rounded-md gap-4 cursor-pointer hover:brightness-110"
        onMouseEnter={() => notify.type !== "SYSTEM" && setShowClose(true)}
        onMouseLeave={() => notify.type !== "SYSTEM" && setShowClose(false)}
        onClick={() => notify.url && (window.location.href = notify.url)}
      >
        <div className="relative w-10 h-10">
          <Image
            src={getIconByNotifyType(notify?.type)}
            alt={notify?.type}
            width={500}
            height={500}
            className="relative w-full h-full object-contain  z-0 "
          />
          {!notify?.isRead && notify.type !== "SYSTEM" && (
            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></div>
          )}
          {notify.type === "SYSTEM" && (
            <Image
              src={"/images/notifications/system-verified.png"}
              alt={notify?.type}
              width={500}
              height={500}
              className=" w-3 h-3 object-content  absolute -top-1 -right-1"
            />
          )}
        </div>
        <div className="flex flex-col justify-center items-start gap-[0.5] max-w-[75%]">
          <div className="flex justify-start items-center gap-1 mb-1">
            <article className="text-[11px] ">{notify?.title}</article>
          </div>
          <article className="text-[9px] opacity-50">{notify?.message}</article>
        </div>
        {showClose && (
          <div className=" absolute top-1/2 -translate-y-1/2 right-4">
            {deletNotifyLoading ? (
              <Loader variant="dots" size={16} color="white" />
            ) : (
              <IoMdClose
                size={20}
                cursor={"pointer"}
                onClick={handleDeleteNotification}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0  w-full h-full md:bg-transparent md:backdrop-blur-md bg-secondary z-50 px-5 py-10 flex flex-col justify-start md:items-center items-start">
      <div className=" md:w-[400px] w-full flex justify-between items-center mb-4 px-1">
        {nList?.length > 1 && (
          <div
            className="flex justify-start items-center gap-1 "
            onClick={handleClear}
          >
            {clearLoading ? (
              <Loader variant="dots" color="white" size={20} />
            ) : (
              <article className="text-[12px] cursor-pointer">
                Clear All
              </article>
            )}
          </div>
        )}
        <div
          className="flex justify-start items-center gap-1 "
          onClick={() => setOpenNotification(false)}
        >
          <IoMdClose size={18} />
          <article className="text-[12px] cursor-pointer">Close</article>
        </div>
      </div>
      <div className="flex-1 w-full h-full bg-ternary md:w-[400px] ">
        {loading ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <article className="text-xs mb-2">Loading Notifications</article>
            <Loader variant="dots" size={20} color="white" />
          </div>
        ) : (
          <>
            {nList?.length > 0 ? (
              <div className="w-full h-full flex flex-col justify-start items-start p-4 overflow-y-auto gap-1">
                {nList?.map((notification, idx) => {
                  return (
                    <NotificationCard key={idx} notification={notification} />
                  );
                })}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <article className="text-base">No Notification Yet!</article>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsModel;
