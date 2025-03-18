import Image from "next/image";
import React, { useState } from "react";
import { getIcons } from "../../../utils/getIcons";
import { Loader } from "@mantine/core";
import {
  FaAngleRight,
  FaEdit,
  FaEye,
  FaShare,
  FaUser,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
import { useRouter } from "next/router";
import ModelVr_O from "../Models/ModelVr_O";
import SharePost from "../Feed/SharePost";
import { MdOutlineOpenInNew } from "react-icons/md";
import { PiCardsFill } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";
import { FiMoreVertical } from "react-icons/fi";
import MenuOptions from "../Others/MenuOption";
import { IoIdCardSharp } from "react-icons/io5";

const UserProfileHeader = ({
  handleOpenInfoModel,
  ath,
  images,
  handleAddUnfollow = () => {},
  handleAddFollow = () => {},
  follwerLoading = false,
  editable = false,
  showFollow = false,
}) => {
  const router = useRouter();
  const [selectedBanner, setSelectedBanner] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [openShareModel, setOpenShareModel] = useState(false);

  const handleOpenShare = () => {
    setOpenShareModel(true);
  };

  const handleSelectOptions = (val) => {
    switch (val?.id) {
      case "profileCard":
        router.push(`/user/${ath?.username}/profilecard`);
        return;
      case "share":
        handleOpenShare();
        return;
      case "follow":
        handleAddFollow();
        return;
      case "unfollow":
        handleAddFollow();
        return;
      case "edit":
        router.push("/profile");
        return;
    }
  };

  return (
    <>
      <div className="relative w-full flexflex-col justify-start items-center bg-secondary rounded-md  overflow-hidden">
        {/*  */}
        <div className="relative w-full md:h-[225px] h-[175px] bg-ternary">
          {images?.bannerImage ? (
            <Image
              src={images?.bannerImage}
              alt="athelet banner"
              width={500}
              height={500}
              className="relative w-full h-full object-cover object-center brightness-75"
              onClick={() => setSelectedBanner(images?.bannerImage)}
            />
          ) : (
            <Image
              src={`/images/profilebanner.png`}
              alt="athelet banner"
              width={500}
              height={500}
              className="relative w-full h-full object-cover object-center brightness-75"
              onClick={() => setSelectedBanner("/images/profilebanner.png")}
            />
          )}
        </div>
        {/*  */}
        <div className="relative w-full h-full flex flex-col justify-start items-start space-x-5 z-10  md:px-10 p-5">
          <div className="md:w-[200px] w-[160px]   md:h-[200px] h-[160px] bg-secondary p-2 rounded-full overflow-hidden -mt-28 mb-5">
            <div className="w-full h-full rounded-full bg-ternary flex justify-center items-center">
              {images?.profileImage ? (
                <Image
                  src={images?.profileImage}
                  alt="user profile"
                  title={images?.name}
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover rounded-full overflow-hidden  "
                  onClick={handleOpenInfoModel}
                />
              ) : (
                <FaUser
                  className="md:text-[50px] text-[25px] opacity-50"
                  onClick={handleOpenInfoModel}
                />
              )}
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col justify-center items-start space-y-3  pb-10">
            <div className="space-y-1">
              <div className="flex justify-start items-center space-x-2">
                <article className="text-white md:text-2xl text-base ">
                  {ath?.name || ath?.name}
                </article>
              </div>
              <article className="block text-[10px] mt-1">
                {ath?.favoriteCollegeTeam}
              </article>{" "}
              <div className="flex justify-start items-center span-x-4 ">
                <div className="flex justify-start items-center  text-white opacity-50 cursor-pointer ">
                  <article className="md:block hidden  text-[10px]">
                    {ath?.aboutMe?.length > 200
                      ? `${ath?.aboutMe?.substring(0, 200)}...`
                      : ath?.aboutMe}
                  </article>{" "}
                  <article className="md:hidden block  text-[10px]">
                    {ath?.aboutMe?.length > 150
                      ? `${ath?.aboutMe?.substring(0, 150)}...`
                      : ath?.aboutMe}
                  </article>{" "}
                </div>
              </div>
            </div>

            <article
              className="text-xs cursor-pointer text-primary"
              onClick={handleOpenInfoModel}
            >
              About Info
            </article>
          </div>
          <div className="absolute top-0 right-0 md:p-8 p-4 flex justify-end items-center space-x-2">
         
              <div
                className=" md:text-sm text-xs  cursor-pointer flex justify-start items-center  gap-2 z-10 "
                onClick={() =>
                  router.push(`/user/${ath?.username}/profilecard`)
                }
              >
                <IoIdCardSharp size={20} />
              </div>

             
      
            <div className="md:block hidden">
              {editable && (
                <article
                  className="px-3 py-2  md:text-sm text-xs rounded-md bg-primary cursor-pointer flex justify-start items-center gap-2 z-10"
                  onClick={() => router.push("/profile")}
                >
                  <FaEdit />
                  <article className="text-[10px]">Edit</article>
                </article>
              )}
            </div>

            <div className="md:block hidden">
              {showFollow && (
                <>
                  {ath?.isFollowing ? (
                    <div
                      className="px-3 py-2 md:text-sm text-xs rounded-md bg-red-700 cursor-pointer flex justify-start items-center gap-2 z-10"
                      onClick={() => handleAddUnfollow()}
                    >
                      <FaUserMinus />
                      <article className="text-[10px]">Unfollow</article>{" "}
                      {follwerLoading && <Loader color="white" size={15} />}
                    </div>
                  ) : (
                    <div
                      className="px-3 py-2  md:text-sm text-xs rounded-md bg-primary cursor-pointer flex justify-start items-center gap-2 z-10"
                      onClick={() => handleAddFollow()}
                    >
                      <FaUserPlus />
                      <article className="text-[10px]">Follow</article>{" "}
                      {follwerLoading && <Loader color="white" size={15} />}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="md:block hidden">
              <MenuOptions
                options={[
                  {
                    id: "share",
                    label: "Share",
                    icon: <FaShare />,
                    iconPosition: "left",
                  },
                ]}
                onSelect={(val) => handleSelectOptions(val)}
                position="left"
              >
                <FiMoreVertical />
              </MenuOptions>
            </div>

            <div className="md:hidden block">
              <MenuOptions
                options={
                  showFollow
                    ? [
                        !ath?.isFollowing
                          ? {
                              id: "follow",
                              label: "Follow",
                              icon: <FaUserPlus />,
                              iconPosition: "left",
                            }
                          : {
                              id: "unfollow",
                              label: "Unfollow",
                              icon: <FaUserMinus />,
                              iconPosition: "left",
                            },
                        {
                          id: "profileCard",
                          label: "Profile Card",
                          icon: <FaEye />,
                          iconPosition: "left",
                        },
                        {
                          id: "share",
                          label: "Share",
                          icon: <FaShare />,
                          iconPosition: "left",
                        },
                      ]
                    : [
                        {
                          id: "edit",
                          label: "Edit",
                          icon: <FaEdit />,
                          iconPosition: "left",
                        },

                        {
                          id: "share",
                          label: "Share",
                          icon: <FaShare />,
                          iconPosition: "left",
                        },
                      ]
                }
                onSelect={(val) => handleSelectOptions(val)}
                position="left"
              >
                <FiMoreVertical />
              </MenuOptions>
            </div>
          </div>
        </div>
        {/*  */}

        <div className="absolute top-0 right-0 p-4 flex justify-end items-center space-x-5 ">
          {ath?.socialLinks?.map((link) => {
            return (
              <a href={link?.link} target="_blank">
                {getIcons(link?.socialBrand)}
              </a>
            );
          })}
        </div>

        {/* <div className="absolute top-0 right-0 p-4 flex justify-end items-center space-x-5 ">
           <MenuOptions
              position="left"
              options={[
                {
                  label: "Share",
                  iconPosition: "left",
                  icon: <FaShare />,
                },
              ]}
              onSelect={() => setOpenShareModel(true)}
            >
              <FiMoreVertical />
            </MenuOptions>
        </div> */}
        {/* */}
      </div>
      {selectedBanner && (
        <ModelVr_O
          open={!!selectedBanner}
          setHandleOpen={() => setSelectedBanner("")}
          extraClass="!bg-transparent"
        >
          <div className="w-[80vw] md:p-10 p-5 flex justify-center items-center">
            <Image
              src={selectedBanner}
              alt="banner"
              width={500}
              height={500}
              className="relative w-full"
            />
          </div>
        </ModelVr_O>
      )}
      {selectedImage && (
        <ModelVr_O
          open={!!selectedImage}
          setHandleOpen={() => setSelectedImage("")}
          extraClass="!bg-transparent"
        >
          <div className="w-[80vw] p-10 flex justify-center items-center">
            <Image
              src={selectedImage}
              alt="banner"
              width={500}
              height={500}
              className="relative w-[200px] h-"
            />
          </div>
        </ModelVr_O>
      )}
      {openShareModel && (
        <ModelVr_O
          open={openShareModel}
          setHandleOpen={setOpenShareModel}
          extraClass="!z-50"
        >
          <SharePost
            title="Share Profile Card"
            pathname={`/user/${ath?.username}/profilecard?referralCode=${ath?.referral?.inviteCode}`}
            showPreview
            privewTitle="Open"
            previewIcon={() => <MdOutlineOpenInNew />}
          />
        </ModelVr_O>
      )}
    </>
  );
};

export default UserProfileHeader;
