// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FaAngleRight } from "react-icons/fa6";
// import { FaXTwitter } from "react-icons/fa6";
// import { GrInstagram } from "react-icons/gr";
// import { FaChevronLeft, FaTiktok, FaUser } from "react-icons/fa";
// import { FzoneUserProfileLinksEnum } from "../../../../core/Components/HeaderLinks/GlobalLinksEnum";
// import UserProfileFeed from "../../../../core/Components/UserProfileFanzone/UserProfileFeed";
// import UserProfileMedia from "../../../../core/Components/UserProfileFanzone/UserProfileMedia";
// import UserProfileLive from "../../../../core/Components/UserProfileFanzone/UserProfileLive";
// import { useSession } from "next-auth/react";
// import FanzoneLayout from "../../../../core/Layout/FanzoneLayout";
// import UserProfileTribes from "../../../../core/Components/UserProfileFanzone/UserProfileTribes";
// import UserProfileActivity from "../../../../core/Components/UserProfileFanzone/UserProfileActivity";
// import { MdGroups2, MdLocalActivity, MdModeEdit, MdOutlineRssFeed } from "react-icons/md";
// import { callAPI, downloadFile } from "../../../../lib/utils";
// import { FaEdit } from "react-icons/fa";
// import { useRouter } from "next/router";
// import { Loader } from "@mantine/core";
// import UserProfileInfo from "../../../../core/Atoms/Profile/UserProfileInfo";
// import { getIcons } from "../../../../utils/getIcons";
// import OtherFollowingList from "../../../../core/Atoms/Feed/OtherFollowingList";
// import OtherUserTribe from "../../../../core/Components/UserProfileFanzone/OtherUserTribes";
// import UserProfileHeader from "../../../../core/Atoms/Profile/UserProfileHeader";
// import { RiLiveFill, RiTvFill } from "react-icons/ri";
// import NotFound from "../../../../core/Components/Errors/NotFound";
// import SigninRequired from "../../../../core/Components/Errors/SigninRequired";
// import useIsPWA from "../../../../utils/hooks/useIsPWA";



// const Index = () => {
//   const [selectedTab, setSelectedTab] = useState<FzoneUserProfileLinksEnum>(
//     FzoneUserProfileLinksEnum.post
//   );

//   const { data: session } = useSession();
//   const [user, setUser] = useState<any>();
//   const [images, setImages] = useState<any>();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [openModel, setOpenModel] = useState(false);
//   const [follwerLoading,setFollowerLoading] = useState(false)
//   const [userNotFound,setUserNotFound] = useState(false)

//   interface UserSelfFzoneContentProps {
//     selectedTab: FzoneUserProfileLinksEnum;
//   }
  
//   const UserSelfFzoneContent: React.FC<UserSelfFzoneContentProps> = ({
//     selectedTab,
//   }) => {
//     switch (selectedTab) {
//       case FzoneUserProfileLinksEnum.post:
//         return <UserProfileFeed view={"user"}  user={user} />; // Render the UserSelfFeed component
//       case FzoneUserProfileLinksEnum.activity:
//         return <UserProfileActivity view={"user"}/>; // Render the UserSelfMedia component
//       case FzoneUserProfileLinksEnum.tribes:
//         return <OtherUserTribe user={user} />; // Render the UserSelfLive component
//       case FzoneUserProfileLinksEnum.live:
//         return <UserProfileLive />; // Render the UserSelfLive component
//       case FzoneUserProfileLinksEnum.media:
//         return <UserProfileMedia />; // Render the UserSelfLive component
//       default:
//         return null; // Return null or a default component if needed
//     }
//   };

//   const handleOpenInfoModel = () => {
//     setOpenModel(true);
//   };

//   const handleCloseInfoModel = () => {
//     setOpenModel(false);
//   };

//   async function downloadUserImages(_user, authToken, url) {
//     let downloadedImages = {} as any;
//     if (_user?.image) {
//           if (_user?.image.includes("https")) {
//             downloadedImages.profileImage = _user?.image;
//           } else {
//             downloadedImages.profileImage = await downloadFile(
//               `${url}/file/mvpz-user-private/${_user.image}`,
//               authToken
//             );
//           }
//         }
//         if(_user?.bannerImage){
//           if (_user?.bannerImage.includes("https") ){
//             downloadedImages.bannerImage = _user?.bannerImage
//           } else {
//             downloadedImages.bannerImage = await downloadFile(
//               `${url}/file/mvpz-user-private/${_user.bannerImage}`,
//               authToken
//             );
//           }
//         }
//     setImages(downloadedImages);
//   }

//   const fetchAth = async () => {
//     setLoading(true);
//     let response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/${router?.query?.username}${!!router?.query?.action ? `?action=${router?.query?.action}` : ""}`,
//     });

//     if(!response.success){
//       setLoading(false)
//       return setUserNotFound(true)
//     }

//      const referral = await callAPI({ endpoint: "/api/user/getReferralInvite" });

  
//       setUser({...response?.user,referral});
//       await downloadUserImages(
//         response.user,
//         response.imageDownload?.authorizationToken,
//         response.imageDownload?.downloadUrl
//       );

//     setLoading(false);
//   };

//   useEffect(() => {
//     if (router?.query?.username) {
//       fetchAth();
//     }
//   }, [router?.query?.username]);


//   const handleAddFollow = async ()=> {
//     setFollowerLoading(true)
//     const response = await callAPI({
//       endpoint : `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/follower/addFollower`,
//       method : "POST",
//       body : {
//         followerId : user?.id
//       }
//     })
//     if(response){
//       fetchAth()
//     }
//     setFollowerLoading(false)
//   }
  
//   const handleAddUnfollow = async ()=> {
//     setFollowerLoading(true)
//     const response = await callAPI({
//       endpoint : `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/follower/removeFollower`,
//       method : "DELETE",
//       body : {
//         followerId : user?.id
//       }
//     })
//     if(response){
//       fetchAth()
//     }
//     setFollowerLoading(false)
//   }

//   // navigation header
//   const NavigationHeader = () => {
//     return (
//       <>
//         <div className="md:block hidden w-full bg-black sticky top-10 z-10">
//           <div className="w-full py-5 bg-gradient-to-l from-transparent via-primary to-transparent flex justify-center items-center space-x-10 overflow-x-auto scroller-hidden md:pr-0 px-20 ">
//             <article
//               className="md:text-base text-sm font-bold cursor-pointer"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.post)}
//             >
//               Post
//             </article>
//             <article
//               className="md:text-base text-sm font-bold cursor-pointer"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.activity)}
//             >
//               Activity
//             </article>
//             <article
//               className="md:text-base text-sm font-bold cursor-pointer"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.tribes)}
//             >
//               Tribes
//             </article>
//             <article
//               className="md:text-base text-sm font-bold cursor-pointer"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.media)}
//             >
//               Media
//             </article>
//             <article
//               className="md:text-base text-sm font-bold cursor-pointer"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.live)}
//             >
//               Live
//             </article>
//           </div>
//         </div>
//         <div className="md:hidden block w-full bg-black sticky top-10 z-10">
//           <div className="w-full py-5 bg-secondary flex justify-between items-center  overflow-x-auto scroller-hidden px-5 ">
//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.post)}
//               style={{
//                 color : selectedTab  === FzoneUserProfileLinksEnum.post ? "#854df2": "white"
//               }}
//             >
//               <MdOutlineRssFeed size={22}/>
//               <article className={`text-[10px] ${selectedTab  === FzoneUserProfileLinksEnum.post ? "font-bold" : "font-normal"} cursor-pointer`}>
//                 Post
//               </article>
//             </div>
//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.activity)}
//               style={{
//                 color : selectedTab  === FzoneUserProfileLinksEnum.activity ? "#854df2": "white"
//               }}
//             >
//               <MdLocalActivity size={22} />
//               <article className={`text-[10px] ${selectedTab  === FzoneUserProfileLinksEnum.activity ? "font-bold" : "font-normal"} cursor-pointer`}>
//                 Activity
//               </article>
//             </div>
//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.tribes)}
//               style={{
//                 color : selectedTab  === FzoneUserProfileLinksEnum.tribes ? "#854df2": "white"
//               }}
//             >
//               <MdGroups2 size={22}/>
//               <article className={`text-[10px] ${selectedTab  === FzoneUserProfileLinksEnum.tribes ? "font-bold" : "font-normal"} cursor-pointer`}>
//                 Tribes
//               </article>
//             </div>
//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.media)}
//               style={{
//                 color : selectedTab  === FzoneUserProfileLinksEnum.media ? "#854df2": "white"
//               }}
//             >
//               <RiTvFill size={22} />
//               <article className={`text-[10px] ${selectedTab  === FzoneUserProfileLinksEnum.media ? "font-bold" : "font-normal"} cursor-pointer`}>
                
//                 Media
//               </article>
//             </div>
//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               onClick={() => setSelectedTab(FzoneUserProfileLinksEnum.live)}
//               style={{
//                 color : selectedTab  === FzoneUserProfileLinksEnum.live ? "#854df2": "white"
//               }}
//             >
//               <RiLiveFill size={22}/>
//               <article className={`text-[10px] ${selectedTab  === FzoneUserProfileLinksEnum.live ? "font-bold" : "font-normal"} cursor-pointer`}>
//                 Live
//               </article>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };


//   // layout left
//   const LeftContent = () => {
//     return (
//       !loading &&
//       session?.user ?
//       <div className="flex-1 w-full h-auto">
//         <UserSelfFzoneContent selectedTab={selectedTab} />
//       </div>
//       : 
//       <div className="w-full mt-10 ">
//         <SigninRequired />
//       </div>
//     );
//   };

//   const UserFollowingList = () => {
//     return (
//       <div className="relative mb-10 h-[400px] ">
//         <OtherFollowingList userId={user?.id} hideFollowing={true}/>
//       </div>
//     );
//   };

//   const rightComp = () => {
//     return (
//       <>
//         <UserFollowingList />
//       </>
//     );
//   };

//   const isPWA = useIsPWA()

//   return loading ? (
//     <div className="flex justify-center items-center">
//       <Loader />
//     </div>
//   ) : (
//     userNotFound ?
//     <>
//     <NotFound title="User Not Found!" />
//     </>
//     :
//    <>
//    {isPWA && <div className="flex px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] justify-start items-center gap-2 text-sm cursor-pointer mb-10" onClick={() => router.back()}><FaChevronLeft /> Back</div>}
//     <div className="relative w-full h-auto  md:pb-10 py-1 gap-y-2 z-0 pt-10">
//       <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px]  ">
//        <div className="mb-10">
//        <UserProfileHeader ath={user} handleOpenInfoModel={handleOpenInfoModel} images={images} follwerLoading={follwerLoading} handleAddFollow={handleAddFollow} handleAddUnfollow={handleAddUnfollow} showFollow={
//           user?.id !== session?.user?.id
//         }/>
//        </div>
//         <NavigationHeader />
//       </div>

//       <FanzoneLayout layoutTailClass="lg:!h-[90vh]" rightMoreComp={rightComp}>
//         <LeftContent />
//       </FanzoneLayout>
//       {openModel ? (
//         <UserProfileInfo
//           open={openModel}
//           handleCloseInfoModel={handleCloseInfoModel}
//           user={{ user }}
//           images={images}
//           editable={false}
//         />
//       ) : null}
//     </div>
//    </>
//   );
// };

// export default Index;

import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index