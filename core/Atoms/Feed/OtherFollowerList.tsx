import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { callAPI, downloadFile } from "../../../lib/utils";
import { useSession } from "next-auth/react";
import { Loader, Skeleton } from "@mantine/core";
import { useRouter } from "next/router";
import MenuOptions from "../Others/MenuOption";

const OtherFollowerList = ({ athId }) => {
  const [myFollowerList, setFollowerList] = useState([]);
  const { data: session } = useSession();
  const [imageDownload, setImageDownload] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const FollowerUserCard: React.FC<{
    id: string;
    image: string;
    name: string;
    role: string;
    username : string
  }> = ({ id, image, name, role,  username}) => {
    const [downloadedImage, setDownloadedImage] = useState("");
    const router = useRouter()

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

      setDownloadedImage(downloadedImages?.profileImage);
    }

    useEffect(() => {
      downloadUserImages(
        { image },
        imageDownload?.authorizationToken,
        imageDownload?.downloadUrl
      );
    }, [image]);

 
    const handleViewProfile = () =>{
      if(role === "Athlete"){
        router.push(`/fanzone/tribe/profile/athlete/${username}`)
      }else{
        router.push(`/fanzone/profile/user/${username}`)
      }
    } 
    return (
        <div className="flex justify-between items-center">
        <div className="flex justify-start items-center space-x-3">
          <div className="relative w-[40px] h-[40px] bg-ternary rounded-full p-1">
            {downloadedImage ? (
              <Image
                src={downloadedImage}
                title={name}
                alt="ath-name"
                width={500}
                height={500}
                className="relative w-full h-full rounded-full"
              />
            ) : (
              <article className="w-full h-full bg-primary rounded-full flex justify-center items-center text-[12px]">
                {name?.substring(0, 2)}
              </article>
            )}
            <div className="absolute top-0 left-0 w-full h-full border border-white rounded-full"></div>
          </div>
          <div className="flex flex-col justify-center items-start space-y-1">
            <article className="text-[10px] flex justify-start items-center font-normal">
              {name}{" "}
              {role === "Athlete" ? (
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-2"
                />
              ) : null}
            </article>
           
          </div>
        </div>
        <MenuOptions options={[
          {
            label: "View Profile"
          }
        ]} onSelect={(e) => {
          switch(e){
            case "View Profile":
              return handleViewProfile()
          }
        }} position="left">
          <div>
          <IoMdMore />
        </div>
        </MenuOptions>
      </div>
    );
  };

  const handleMyFollowingList = async () => {
    setLoading(true);
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/follower/followerList/${athId}`,
    });

    if (response) {
      setFollowerList(response?.followers);
      setImageDownload(response?.imageDownload);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (athId) {
      handleMyFollowingList();
    }
  }, [athId]);

  const FollowingUserLoadingCard = () => {
    return (
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center space-x-3">
          <div className="relative w-[40px] h-[40px] bg-ternary rounded-full p-1">
            <Skeleton className="w-full h-full rounded-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-full border border-white rounded-full"></div>
          </div>
          <div className="flex flex-col justify-center items-start space-y-1">
            <div className="w-[100px] h-[10px]">
              <Skeleton className="w-full h-full rounded-sm" />
            </div>
            <div className="w-[40px] h-[10px]">
              <Skeleton className="w-full h-full rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full overflow-y-auto  bg-secondary rounded-lg ">
      <div className="sticky top-0 left-0 w-full bg-secondary py-5 px-5 rounded-t-lg z-10">
        <article className="text-sm">Followers</article>
        <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
      </div>
      <div className="relative p-5 space-y-6 z-0">
        {loading ? (
          Array(10)
            .fill(null)
            .map((_, index) => <FollowingUserLoadingCard key={index} />)
        ) : myFollowerList?.length > 0 ? (
          myFollowerList.map((user) => (
            <FollowerUserCard
              key={user.id}
              id={user?.id}
              image={user?.image}
              name={user?.name}
              role={user?.role}
              username={user?.username}
            />
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <article className="opacity-50">0 Followers</article>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default OtherFollowerList;
