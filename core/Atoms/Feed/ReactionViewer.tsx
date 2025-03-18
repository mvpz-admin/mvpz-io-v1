import React, { useEffect, useState } from "react";
import { FaHandsClapping } from "react-icons/fa6";
import { MdMoreVert, MdOfflineBolt } from "react-icons/md";
import {
  PiBellSimpleLight,
  PiCloverFill,
  PiUserMinusLight,
  PiXLight,
} from "react-icons/pi";
import MenuOptions from "../Others/MenuOption";
import Image from "next/image";
import { useRouter } from "next/router";
import { callAPI, downloadFile } from "../../../lib/utils";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { Loader } from "@mantine/core";

interface ReactionViewerProps {
  postId: string;
  postType: "Public Post" | "Tribe Post" | "Shout Post";
}

interface UserProfileBarProps {
  user: any;
  downloadImageCred: any;
}

const UserProfileBar: React.FC<UserProfileBarProps> = ({
  user,
  downloadImageCred,
}) => {
  const [profileImage, setProfileImage] = useState();

  async function downloadUserImages(user: any, authToken: string, url: string) {
    let downloadedImage = user?.postedBy?.image?.includes("https")
      ? user?.postedBy?.image
      : await downloadFile(
          `${url}/file/mvpz-user-private/${user?.postedBy?.image}`,
          authToken
        );

    if (downloadedImage) {
      setProfileImage(downloadedImage);
    }
  }

  useEffect(() => {
    downloadUserImages(
      user,
      downloadImageCred?.authorizationToken,
      downloadImageCred?.downloadUrl
    );
  }, [user?.id]);

  const router = useRouter();

  return (
    <div className="w-full flex justify-between items-center">
      <div
        className="flex justify-start items-center gap-5 cursor-pointer pt-5"
        onClick={() => !user?.postedBy?.isAnonymous &&  router.push(`/fanzone/profile/user/${user?.id}`)}
      >
        <div
          className="w-[45px] h-[45px] p-[1px] bg-white rounded-full overflow-hidden flex justify-center items-center"
          title={user?.postedBy?.username}
        >
          {!profileImage ? (
            <Image
              src={profileImage}
              alt="user profile"
              width={500}
              height={500}
              className="relative w-full h-full rounded-full object-cover"
            />
          ) : (
            <article className="w-full h-full bg-primary rounded-full flex justify-center items-center text-[12px]">
              {user?.postedBy?.username?.substring(0, 2)}
            </article>
          )}
        </div>
        <div className="flex flex-col items-start justify-center ">
          <article className={`text-xs font-semibold ${!user?.postedBy?.isAnonymous &&  "hover:underline"}`}>
            {user?.postedBy?.username}
          </article>
          {user?.action ? (
            <article className="text-[10px] opacity-50 font-normal">
              {user?.action}
            </article>
          ) : (
            <article className="text-[10px] opacity-50 font-normal">
              Feed @UFC
            </article>
          )}
        </div>
      </div>
      {!user?.postedBy?.isAnonymous &&  <MenuOptions
        onSelect={() => {}}
        options={[
          { label: "Hide Post", icon: <PiXLight />, iconPosition: "left" },
          {
            label: "Report",
            icon: <PiBellSimpleLight />,
            iconPosition: "left",
          },
          {
            label: "Block User",
            icon: <PiUserMinusLight />,
            iconPosition: "left",
          },
        ]}
        position="left"
      >
        <MdMoreVert size={18} />
      </MenuOptions>}
    </div>
  );
};

const ReactionViewer: React.FC<ReactionViewerProps> = ({
  postId,
  postType,
}) => {
  const [clapUsers, setClapUsers] = useState<any[]>([]);
  const [cloverUsers, setCloverUsers] = useState<any[]>([]);
  const [boltUsers, setBoltUsers] = useState<any[]>([]);
  const [downloadImageCred, setDownloadImageCred] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderUserList = () => {
    switch (activeTab) {
      case 0:
        return [
          ...clapUsers.map((user) => ({ ...user, action: "has clapped." })),
          ...cloverUsers.map((user) => ({ ...user, action: "has clovered." })),
          ...boltUsers.map((user) => ({ ...user, action: "has bolted." })),
        ];
      case 1:
        return clapUsers;
      case 2:
        return cloverUsers;
      case 3:
        return boltUsers;
      default:
        return [];
    }
  };

  const handleFetchReactions = async () => {
    setLoading(true);

    let response: any = {};

    switch (postType) {
      case "Public Post":
        response = await callAPI({
          endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/reactions/${postId}`,
        });
        break;
      case "Tribe Post":
        response = await callAPI({
          endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/reactions/${postId}`,
        });
        break;
      case "Shout Post":
        response = await callAPI({
          endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/reactions/${postId}`,
        });
        break;
    }

    if (response) {
      setDownloadImageCred(response?.reactions?.imageDownload);
      setClapUsers(response?.reactions?.claps);
      setCloverUsers(response?.reactions?.clovers);
      setBoltUsers(response?.reactions?.bolts);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetchReactions();
  }, [postId]);

  const TABS = [
    {
      label: `All ${clapUsers?.length + cloverUsers?.length + boltUsers?.length}`,
    },
    {
      label: "Claps",
      icons: <FaHandsClapping className="text-[20px] text-yellow-500" />,
    },
    {
      label: "Clovers",
      icons: <PiCloverFill className="text-[20px] text-green-500" />,
    },
    {
      label: "Bolts",
      icons: <MdOfflineBolt className="text-[20px] text-orange-500" />,
    },
  ];

  const displayedUserList = renderUserList();

  return (
    <div className="max-w-lg mx-auto mt-10 bg-secondary h-[80vh] md:w-[40vw] w-[90vw]">
      {/* Tabs */}
      <div className="relative flex justify-between items-center py-2 ">
        {TABS.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 flex justify-center items-center gap-2 py-2 text-center md:text-base text-xs font-semibold hover:bg-white hover:bg-opacity-10 ${
              activeTab === index ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icons} {tab.label}
          </button>
        ))}
        <div
          className="absolute bottom-0 h-1 bg-primary transition-all duration-300"
          style={{
            width: `${100 / TABS.length}%`,
            transform: `translateX(${activeTab * 100}%)`,
          }}
        />
        <div className="absolute bottom-0 w-full h-[0.5px] bg-white bg-opacity-50" />
      </div>

      {/* User list for the selected reaction */}
      <div className="mt-5 md:px-0 px-5">
        <h2 className="text-sm font-semibold text-white text-opacity-75">
          User Reactions
        </h2>
        <ul className="mt-3 w-full h-[60vh] flex justify-center items-center flex-1 overflow-y-auto space-y-5 py-5">
          {loading ? (
            <Loader />
          ) : displayedUserList.length > 0 ? (
            <div className="w-full h-full overflow-y-auto ">
              {displayedUserList.map((user, index) => (
                <li key={index} className="relative py-1 pb-5 ">
                  <UserProfileBar
                    downloadImageCred={downloadImageCred}
                    user={user}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-20"></div>
                </li>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center space-y-5">
              <div>
                <TbMoodEmptyFilled
                  size={77}
                  className="text-white text-opacity-50"
                />
              </div>
              <article className="text-center text-xl text-white text-opacity-50">
                No Reaction Yet!
              </article>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReactionViewer;
