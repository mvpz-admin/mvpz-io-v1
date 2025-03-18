import Image from "next/image";
import React, { useEffect, useState } from "react";
import { postedAtTime } from "../../../utils/dates";
import { downloadFile } from "../../../lib/utils";
import { FaHandsClapping } from "react-icons/fa6";
import {
  PiCloverFill,
  PiCloverLight,
  PiHandsClappingFill,
} from "react-icons/pi";
import { MdOfflineBolt, MdOutlineOfflineBolt } from "react-icons/md";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoChatbubbles } from "react-icons/io5";
import ModelVr_O from "../Models/ModelVr_O";

const TribeAtheletPostCard = ({
  theme,
  shout,
  imageDownload,
  handleOpenModel,
}) => {
  const [profileImage, setProfileImage] = useState();

  async function downloadUserImages(_user, authToken, url) {
    let downloadedImages = {} as any;
   if (_user?.image) {
         if (_user?.image.includes("https")) {
           downloadedImages.profileImage = _user?.image;
         } else {
           downloadedImages.profileImage = await downloadFile(
             `${url}/file/mvpz-user-private/${_user.image}`,
             authToken
           );
         }
       }
       if(_user?.bannerImage){
         if (_user?.bannerImage.includes("https") ){
           downloadedImages.bannerImage = _user?.bannerImage
         } else {
           downloadedImages.bannerImage = await downloadFile(
             `${url}/file/mvpz-user-private/${_user.bannerImage}`,
             authToken
           );
         }
       }

    setProfileImage(downloadedImages?.profileImage);
  }

  useEffect(() => {
    downloadUserImages(
      shout?.postedBy,
      imageDownload?.authorizationToken,
      imageDownload?.downloadUrl
    );
  }, [shout]);

  return (
    <>
      <div
        className="relative  w-[300px] pt-10"
        onClick={() => {
          handleOpenModel(shout?.id);
        }}
      >
        <div className="relattive h-[200px] bg-secondary bg-opacity-[0.2] rounded-md px-5 flex flex-col justify-center items-start space-y-4">
          <div className="relative md:w-[75px] w-[60px] md:h-[75px] h-[60px] rounded-full  overflow-hidden -mt-[120px] flex justify-center items-center p-5">
            <div
              className="absolute w-full h-full "
              style={{
                background: "white",
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%]  rounded-full bg-secondary">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="user profile"
                    width={500}
                    height={500}
                    className={
                      "relative w-full h-full rounded-full object-cover"
                    }
                  />
                ) : (
                  <article className="w-full h-full bg-primary rounded-full flex justify-center items-center text-[12px]">
                    {shout?.postedBy?.username?.substring(0, 2)}
                  </article>
                )}
              </div>
            </div>
          </div>
          <div className="w-full  space-y-2 h-[40px] ">
            <article
              className="md:text-base text-sm font-bold"
             
            >
              {shout?.postedBy?.name}
            </article>
            <article className="text-[10px] font-normal">{shout?.message?.length > 50 ? `${shout?.message?.substring(0,50)}...` : shout?.message}</article>
          </div>
          {/* date  */}
          <article className="absolute top-10 right-5 md:text-xs text-[10px] opacity-50">
            {postedAtTime(shout?.createdAt)}
          </article>
        </div>
        <div className="absolute bottom-0 p-5 left-0 flex justify-between items-center w-full ">
          <div className="flex justify-start items-center gap-x-4">
            <div className="flex justify-start items-center gap-x-1">
              {shout?.hasClapped ? (
                <FaHandsClapping size={18} className={`text-yellow-500 $ `} />
              ) : (
                <PiHandsClappingFill
                  size={18}
                  className={`text-yellow-500 $ `}
                />
              )}
              <span className="text-[10px] font-bold font-nato">
                {shout?._count?.claps}
              </span>
            </div>
            <div className="flex justify-start items-center gap-x-1">
              {shout?.hasClover ? (
                <PiCloverFill size={18} className={`text-green-500 $ `} />
              ) : (
                <PiCloverLight size={18} className={`text-green-500 $ `} />
              )}
              <span className="text-[10px] font-bold font-nato">
                {shout?._count?.clovers}
              </span>
            </div>
            <div className="flex justify-start items-center gap-x-1">
              {shout?.hasBolt ? (
                <MdOfflineBolt size={18} className={`text-orange-500 $ `} />
              ) : (
                <MdOutlineOfflineBolt
                  size={18}
                  className={`text-orange-500 $ `}
                />
              )}
              <span className="text-[10px] font-bold font-nato">
                {shout?._count?.bolts}
              </span>
            </div>
            <div className="flex justify-start items-center gap-x-1 opacity-10">
              <HiOutlineCurrencyDollar
                size={18}
                className={`text-[#AEE269] $ `}
              />
              <span className="text-[10px] font-bold font-nato">{0}</span>
            </div>
          </div>
          <div className="flex justify-start items-center gap-x-1">
            <IoChatbubbles size={20} className={`text-[#96B5F6]`} />
            <span className="text-[10px] font-bold font-nato">{0}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TribeAtheletPostCard;
