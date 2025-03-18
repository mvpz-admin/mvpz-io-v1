// import Image from "next/image";
// import React, { use, useEffect, useState } from "react";
// import { FaAngleRight } from "react-icons/fa6";
// import { FaXTwitter } from "react-icons/fa6";
// import { GrInstagram } from "react-icons/gr";
// import { FaChevronLeft, FaTiktok, FaUser } from "react-icons/fa";
// import { FzoneAtheletProfileLinksEnum } from "../../../../../../core/Components/HeaderLinks/GlobalLinksEnum";
// import FanzoneLayout from "../../../../../../core/Layout/FanzoneLayout";
// import { useSession } from "next-auth/react";
// import FollowerList from "../../../../../../core/Atoms/Feed/FollowerList";
// import AtheletShout from "../../../../../../core/Components/TribeAtheleteFanzone/AtheletShout";
// import AtheletActivity from "../../../../../../core/Components/TribeAtheleteFanzone/AtheletActivity";
// import AthleteTribes from "../../../../../../core/Components/TribeAtheleteFanzone/AtheletTribes";
// import AtheletCard from "../../../../../../core/Components/TribeAtheleteFanzone/AtheletCard";
// import ModelVr_O from "../../../../../../core/Atoms/Models/ModelVr_O";
// import AthleteProfileInfo from "../../../../../../core/Atoms/Profile/AthleteProfileInfo";
// import { useRouter } from "next/router";
// import { callAPI, downloadFile } from "../../../../../../lib/utils";
// import { Loader } from "@mantine/core";
// import OtherFollowerList from "../../../../../../core/Atoms/Feed/OtherFollowerList";
// import { getIcons } from "../../../../../../utils/getIcons";
// import AthProfileHeader from "../../../../../../core/Atoms/Profile/AthProfileHeader";
// import { HiSpeakerphone } from "react-icons/hi";
// import { MdLocalActivity } from "react-icons/md";
// import { TiGroup } from "react-icons/ti";
// import { TbCardsFilled } from "react-icons/tb";
// import NotFound from "../../../../../../core/Components/Errors/NotFound";
// import useIsPWA from "../../../../../../utils/hooks/useIsPWA";

// interface AtheletFzoneContentProps {
//   selectedTab: FzoneAtheletProfileLinksEnum;
// }

// const Index = () => {
//   const { data: session } = useSession();
//   const [selectedTab, setSelectedTab] = useState<FzoneAtheletProfileLinksEnum>(
//     session?.user
//       ? FzoneAtheletProfileLinksEnum.shout
//       : FzoneAtheletProfileLinksEnum.card
//   );
//   const router = useRouter();
//   const [openModel, setOpenModel] = useState(false);
//   const [images, setImages] = useState();
//   const [loading, setLoading] = useState(false);
//   const [follwerLoading, setFollowerLoading] = useState(false);
//   const [userNotFound, setUserNotFound] = useState(false);

//   const [ath, setAth] = useState<any>();

//   const handleOpenInfoModel = () => {
//     setOpenModel(true);
//   };

//   const handleCloseInfoModel = () => {
//     setOpenModel(false);
//   };

//   async function downloadUserImages(_user, authToken, url) {
//     let downloadedImages = {} as any;
//     if (_user?.image) {
//       if (_user?.image.includes("https")) {
//         downloadedImages.profileImage = _user?.image;
//       } else {
//         downloadedImages.profileImage = await downloadFile(
//           `${url}/file/mvpz-user-private/${_user.image}`,
//           authToken
//         );
//       }
//     }
//     if (_user?.bannerImage) {
//       if (_user?.bannerImage.includes("https")) {
//         downloadedImages.bannerImage = _user?.bannerImage;
//       } else {
//         downloadedImages.bannerImage = await downloadFile(
//           `${url}/file/mvpz-user-private/${_user.bannerImage}`,
//           authToken
//         );
//       }
//     }
//     if (_user?.cardImage) {
//       downloadedImages.cardImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${_user?.cardImage}`,
//         authToken
//       );
//     }

//     setImages(downloadedImages);
//   }

//   const fetchAth = async () => {
//     if (router?.query?.athleteId) {
//       setLoading(true);
//       let response = await callAPI({
//         endpoint: `${
//           process.env.NEXT_PUBLIC_APP_URL
//         }/api/user/getUser?username=${router?.query?.athleteId}&role=athlete${
//           !!router?.query?.action ? `&action=${router?.query?.action}` : ""
//         }`,
//       });

//       if (!response.success) {
//         setLoading(false);
//         return setUserNotFound(true);
//       }

//       const referral = await callAPI({
//         endpoint: "/api/user/getReferralInvite",
//       });

//       setAth({ ...response, user: { ...response?.user, referral } });
//       await downloadUserImages(
//         response.user,
//         response.imageDownload?.authorizationToken,
//         response.imageDownload?.downloadUrl
//       );

//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (router?.query?.athleteId) {
//       fetchAth();
//       let query = router?.asPath?.split("#")[1];
//       if (query) {
//         switch (query) {
//           case "buycard":
//             return setSelectedTab(FzoneAtheletProfileLinksEnum.card);
//         }
//       }
//     }
//   }, [router?.query?.athleteId]);

//   const handleAddFollow = async () => {
//     if (!session?.user) {
//       //  action
//       const referralCode = router?.query?.referralCode;
//       if (referralCode) {
//         router.push(`/auth/signin?referralCode=${referralCode}`);
//       } else {
//         router.push(`/auth/signin`);
//       }
//       return;
//     }
//     setFollowerLoading(true);
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/follower/addFollower`,
//       method: "POST",
//       body: {
//         followerId: ath?.user?.id,
//       },
//     });
//     if (response) {
//       fetchAth();
//     }
//     setFollowerLoading(false);
//   };

//   const handleAddUnfollow = async () => {
//     setFollowerLoading(true);
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/follower/removeFollower`,
//       method: "DELETE",
//       body: {
//         followerId: ath?.user?.id,
//       },
//     });
//     if (response) {
//       fetchAth();
//     }
//     setFollowerLoading(false);
//   };
//   const handleActionANdTab = async () => {
//     let tab = router?.query.tab;

//     if (tab) {
//       switch (tab) {
//         case "shout":
//           setSelectedTab(FzoneAtheletProfileLinksEnum.shout);
//           break;
//         case "activity":
//           setSelectedTab(FzoneAtheletProfileLinksEnum.activity);
//           break;
//         case "tribes":
//           setSelectedTab(FzoneAtheletProfileLinksEnum.tribes);
//           break;
//         case "card":
//           setSelectedTab(FzoneAtheletProfileLinksEnum.card);
//           break;
//       }
//     }
//   };

//   useEffect(() => {
//     if (session?.user) {
//       handleActionANdTab();
//     }
//   }, [router.query, session?.user]);

//   const AtheletFzoneContent: React.FC<AtheletFzoneContentProps> = ({
//     selectedTab,
//   }) => {
//     switch (selectedTab) {
//       case FzoneAtheletProfileLinksEnum.shout:
//         return <AtheletShout isSearchAthlete={true} userId={ath?.user?.id} />;
//       case FzoneAtheletProfileLinksEnum.activity:
//         return <AtheletActivity isSearchAthlete={true} ath={ath?.user} />;
//       case FzoneAtheletProfileLinksEnum.tribes:
//         return <AthleteTribes ath={ath} isSearchAthlete={true} />;
//       case FzoneAtheletProfileLinksEnum.card:
//         return (
//           <AtheletCard
//             ath={ath}
//             isSearchAthlete={true}
//             handleAddFollow={handleAddFollow}
//           />
//         );
//       default:
//         return null; // Return null or a default component if needed
//     }
//   };

//   // navigation header
//   const NavigationHeader = () => {
//     return (
//       <>
//         <div className="md:block hidden w-full bg-black sticky top-10 z-10">
//           <div
//             className="w-full py-5  flex justify-center items-center space-x-10 overflow-x-auto scroller-hidden md:pr-0 px-20"
//             style={{
//               background: `linear-gradient(to left, transparent, ${
//                 ath?.user?.organisation?.primaryColorHex || "var(--primary)"
//               }, transparent)`,
//             }}
//           >
//             <article
//               className="font-bold md:text-base text-xs cursor-pointer md:ml-0 ml-36"
//               style={{
//                 color:
//                   selectedTab === FzoneAtheletProfileLinksEnum.shout
//                     ? ath?.user?.organisation?.secondaryColorHex
//                     : "white",
//               }}
//               onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.shout)}
//             >
//               Shout
//             </article>
//             <article
//               className="font-bold md:text-base text-xs cursor-pointer"
//               style={{
//                 color:
//                   selectedTab === FzoneAtheletProfileLinksEnum.activity
//                     ? ath?.user?.organisation?.secondaryColorHex
//                     : "white",
//               }}
//               onClick={() =>
//                 setSelectedTab(FzoneAtheletProfileLinksEnum.activity)
//               }
//             >
//               Activity
//             </article>
//             <article
//               className="font-bold md:text-base text-xs cursor-pointer"
//               onClick={() =>
//                 setSelectedTab(FzoneAtheletProfileLinksEnum.tribes)
//               }
//               style={{
//                 color:
//                   selectedTab === FzoneAtheletProfileLinksEnum.tribes
//                     ? ath?.user?.organisation?.secondaryColorHex
//                     : "white",
//               }}
//             >
//               Tribes
//             </article>

//             <article
//               className="font-bold md:text-base text-xs cursor-pointer"
//               onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.card)}
//               style={{
//                 color:
//                   selectedTab === FzoneAtheletProfileLinksEnum.card
//                     ? ath?.user?.organisation?.secondaryColorHex
//                     : "white",
//               }}
//             >
//               Card
//             </article>
//           </div>
//         </div>
//         <div className="md:hidden block w-full bg-black sticky top-10 z-10">
//           <div
//             className="w-full py-5  flex justify-between items-center  px-5"
//             style={{
//               background: ath?.user?.organisation?.primaryColorHex,
//             }}
//           >
//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               style={{
//                 color:
//                   selectedTab === FzoneAtheletProfileLinksEnum.shout
//                     ? ath?.user?.organisation?.secondaryColorHex
//                     : "white",
//               }}
//               onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.shout)}
//             >
//               <HiSpeakerphone size={22} />
//               <article
//                 className={`${
//                   selectedTab === FzoneAtheletProfileLinksEnum?.shout
//                     ? "font-bold"
//                     : "font-normal"
//                 } md:text-base text-xs cursor-pointer `}
//               >
//                 Shout
//               </article>
//             </div>
//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               style={{
//                 color:
//                   selectedTab === FzoneAtheletProfileLinksEnum.activity
//                     ? ath?.user?.organisation?.secondaryColorHex
//                     : "white",
//               }}
//               onClick={() =>
//                 setSelectedTab(FzoneAtheletProfileLinksEnum.activity)
//               }
//             >
//               <MdLocalActivity size={22} />
//               <article
//                 className={`${
//                   selectedTab === FzoneAtheletProfileLinksEnum?.activity
//                     ? "font-bold"
//                     : "font-normal"
//                 } md:text-base text-xs cursor-pointer `}
//               >
//                 Activity
//               </article>
//             </div>
//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               onClick={() =>
//                 setSelectedTab(FzoneAtheletProfileLinksEnum.tribes)
//               }
//               style={{
//                 color:
//                   selectedTab === FzoneAtheletProfileLinksEnum.tribes
//                     ? ath?.user?.organisation?.secondaryColorHex
//                     : "white",
//               }}
//             >
//               <TiGroup size={22} />
//               <article
//                 className={`${
//                   selectedTab === FzoneAtheletProfileLinksEnum?.tribes
//                     ? "font-bold"
//                     : "font-normal"
//                 } md:text-base text-xs cursor-pointer `}
//               >
//                 Tribes
//               </article>
//             </div>

//             <div
//               className="flex justify-center items-center flex-col space-y-1"
//               onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.card)}
//               style={{
//                 color:
//                   selectedTab === FzoneAtheletProfileLinksEnum.card
//                     ? ath?.user?.organisation?.secondaryColorHex
//                     : "white",
//               }}
//             >
//               <TbCardsFilled size={22} />
//               <article
//                 className={`${
//                   selectedTab === FzoneAtheletProfileLinksEnum?.card
//                     ? "font-bold"
//                     : "font-normal"
//                 } md:text-base text-xs cursor-pointer `}
//               >
//                 Card
//               </article>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   const LeftContent = () => {
//     return (
//       <div className="flex-1 w-full h-auto">
//         <div className="sticky top-0 mt-10 z-10 ">
//           <AtheletFzoneContent selectedTab={selectedTab} />
//         </div>
//       </div>
//     );
//   };

//   const UserFollowerList = () => {
//     return (
//       <div className="relative mb-10 h-[400px] ">
//         <OtherFollowerList athId={ath?.user?.id} />
//       </div>
//     );
//   };

//   const rightComp = () => {
//     return (
//       <>
//         <UserFollowerList />
//       </>
//     );
//   };

//   const isPWA = useIsPWA();

//   return loading ? (
//     <div className="flex justify-center items-center">
//       <Loader />
//     </div>
//   ) : userNotFound ? (
//     <>
//       <NotFound title="Athlete Not Found!" />
//     </>
//   ) : (
//     <>
//       {isPWA && (
//         <div
//           className="flex px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] justify-start items-center gap-2 text-sm cursor-pointer mb-10"
//           onClick={() => router.back()}
//         >
//           <FaChevronLeft /> Back
//         </div>
//       )}
//       <div className="relative w-full md:pb-5 gap-y-5 z-0 pt-10">
//         <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] flex flex-col gap-y-10">
//           <AthProfileHeader
//             handleOpenInfoModel={handleOpenInfoModel}
//             ath={ath}
//             images={images}
//             follwerLoading={follwerLoading}
//             handleAddFollow={handleAddFollow}
//             handleAddUnfollow={handleAddUnfollow}
//             editable={false}
//             showFollow={true}
//           />
//           <NavigationHeader />
//         </div>

//         <FanzoneLayout rightMoreComp={rightComp}>
//           <LeftContent />
//         </FanzoneLayout>
//       </div>
//       {openModel ? (
//         <AthleteProfileInfo
//           open={openModel}
//           handleCloseInfoModel={handleCloseInfoModel}
//           ath={ath}
//           images={images}
//           editable={false}
//         />
//       ) : null}
//     </>
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