// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FaAngleRight, FaSquarePlus } from "react-icons/fa6";
// import { FaXTwitter } from "react-icons/fa6";
// import { GrInstagram } from "react-icons/gr";
// import { FaChevronLeft, FaEdit, FaUser } from "react-icons/fa";
// import { FzoneAtheletProfileLinksEnum } from "../../../../../core/Components/HeaderLinks/GlobalLinksEnum";
// import FanzoneLayout from "../../../../../core/Layout/FanzoneLayout";
// import { useSession } from "next-auth/react";
// import FollowerList from "../../../../../core/Atoms/Feed/FollowerList";
// import AtheletShout from "../../../../../core/Components/TribeAtheleteFanzone/AtheletShout";
// import AtheletActivity from "../../../../../core/Components/TribeAtheleteFanzone/AtheletActivity";
// import AthleteTribes from "../../../../../core/Components/TribeAtheleteFanzone/AtheletTribes";
// import AtheletCard from "../../../../../core/Components/TribeAtheleteFanzone/AtheletCard";
// import ModelVr_O from "../../../../../core/Atoms/Models/ModelVr_O";
// import AthleteProfileInfo from "../../../../../core/Atoms/Profile/AthleteProfileInfo";
// import { callAPI, downloadFile } from "../../../../../lib/utils";
// import { useRouter } from "next/router";
// import { Loader } from "@mantine/core";
// import AtheletCreateCard from "../../../../../core/Components/TribeAtheleteFanzone/AtheletCreateCard";
// import { getIcons } from "../../../../../utils/getIcons";
// import AthProfileHeader from "../../../../../core/Atoms/Profile/AthProfileHeader";
// import { HiOutlineDocumentText } from "react-icons/hi";
// import { MdLocalActivity, MdOutlineGroups3, MdOutlineLocalActivity } from "react-icons/md";
// import { IoIdCardSharp } from "react-icons/io5";
// import { TiGroup } from "react-icons/ti";
// import { TbCardsFilled } from "react-icons/tb";
// import useIsPWA from "../../../../../utils/hooks/useIsPWA";

// interface AtheletFzoneContentProps {
//   selectedTab: FzoneAtheletProfileLinksEnum;
// }

// const Index = () => {
//   const [selectedTab, setSelectedTab] = useState<FzoneAtheletProfileLinksEnum>(
//     FzoneAtheletProfileLinksEnum.shout
//   );

//   // navigation header
//   const NavigationHeader = () => {
//     return (
//       <>
//       <div className="md:block hidden w-full bg-black sticky top-10 z-10">
//         <div
//         className="w-full py-5  flex justify-center md:items-center items-start space-x-10 overflow-x-auto scroller-hidden md:pr-0 px-20"
//         style={{
//             background: `linear-gradient(to left, transparent, ${
//               user?.organisation?.primaryColorHex || "var(--primary)"
//             }, transparent)`,
//           }}
//         >
//           <article
//             className="font-bold cursor-pointer"
//             onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.shout)}
//             style={{
//               color:
//                 selectedTab === FzoneAtheletProfileLinksEnum.shout
//                   ? user?.organisation?.secondaryColorHex
//                   : "white",
//             }}
//           >
//             Shout
//           </article>
//           <article
//             className="font-bold cursor-pointer"
//             onClick={() =>
//               setSelectedTab(FzoneAtheletProfileLinksEnum.activity)
//             }
//             style={{
//               color:
//                 selectedTab === FzoneAtheletProfileLinksEnum.activity
//                   ? user?.organisation?.secondaryColorHex
//                   : "white",
//             }}
//           >
//             Activity
//           </article>
//           <article
//             className="font-bold cursor-pointer"
//             onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.tribes)}
//             style={{
//               color:
//                 selectedTab === FzoneAtheletProfileLinksEnum.tribes
//                   ? user?.organisation?.secondaryColorHex
//                   : "white",
//             }}
//           >
//             Tribes
//           </article>

//           <article
//             className="font-bold cursor-pointer"
//             onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.card)}
//             style={{
//               color:
//                 selectedTab === FzoneAtheletProfileLinksEnum.card
//                   ? user?.organisation?.secondaryColorHex
//                   : "white",
//             }}
//           >
//             Card
//           </article>
//         </div>
//       </div>
//       <div className="md:hidden block w-full bg-black sticky top-10 z-10">
//         <div
//         className="w-full py-5 flex justify-between items-center   overflow-x-auto scroller-hidden px-5"
//         style={{
//           backgroundColor : user?.organisation?.primaryColorHex
//         }}
//         >
//           <div
//             className="flex flex-col justify-center items-center space-y-1"
//             onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.shout)}
//             style={{
//               color:
//                 selectedTab === FzoneAtheletProfileLinksEnum.shout
//                   ? user?.organisation?.secondaryColorHex
//                   : "white",
//             }}
//           >
//             {/* Shout */}
//             <FaSquarePlus size={23} />
//             <article className={`text-[10px] ${selectedTab === FzoneAtheletProfileLinksEnum.shout ? "font-bold" : "font-normal"}`}>Shout</article>
//           </div>
//           <div
//             className="flex flex-col justify-center items-center space-y-1"
//             onClick={() =>
//               setSelectedTab(FzoneAtheletProfileLinksEnum.activity)
//             }
//             style={{
//               color:
//                 selectedTab === FzoneAtheletProfileLinksEnum.activity
//                   ? user?.organisation?.secondaryColorHex
//                   : "white",
//             }}
//           >
//             {/* Activity */}
//             <MdLocalActivity size={23}/>
//             <article className={`text-[10px] ${selectedTab === FzoneAtheletProfileLinksEnum.activity ? "font-bold" : "font-normal"}`}>Activity</article>
//           </div>
//           <div
//             className="flex flex-col justify-center items-center space-y-1"
//             onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.tribes)}
//             style={{
//               color:
//                 selectedTab === FzoneAtheletProfileLinksEnum.tribes
//                   ? user?.organisation?.secondaryColorHex
//                   : "white",
//             }}
//           >
//             {/* Tribes */}
//             <TiGroup  size={23}/>
//             <article className={`text-[10px] ${selectedTab === FzoneAtheletProfileLinksEnum.tribes ? "font-bold" : "font-normal"}`}>Tribes</article>
//           </div>

//           <div
//             className="flex flex-col justify-center items-center space-y-1"
//             onClick={() => setSelectedTab(FzoneAtheletProfileLinksEnum.card)}
//             style={{
//               color:
//                 selectedTab === FzoneAtheletProfileLinksEnum.card
//                   ? user?.organisation?.secondaryColorHex
//                   : "white",
//             }}
//           >
//             {/* Card */}
//             <TbCardsFilled size={23}/>
//             <article className={`text-[10px] ${selectedTab === FzoneAtheletProfileLinksEnum.card ? "font-bold" : "font-normal"}`}>Card</article>
//           </div>
//         </div>
//       </div>
//       </>
//     );
//   };

//   // header
//   // const ProfileHeader = ({ handleOpenInfoModel, ath, images }) => {
//   //   const router = useRouter();

//   //   return (
//   //     <div className="relative w-full bg-secondary rounded-md p-5   overflow-hidden">
//   //       {/*  */}

//   //       <div className="relative  w-full md:h-[300px] h-[100px] bg-ternary z-0">
//   //         {images?.bannerImage ? (
//   //           <Image
//   //             src={images?.bannerImage}
//   //             alt="athelet banner"
//   //             width={500}
//   //             height={500}
//   //             className="relative w-full h-full object-cover object-center"
//   //           />
//   //         ) : (
//   //           <Image
//   //             src={`/images/profilebanner.png`}
//   //             alt="athelet banner"
//   //             width={500}
//   //             height={500}
//   //             className="relative w-full h-full object-cover object-center"
//   //           />
//   //         )}
//   //       </div>
//   //       {/*  */}
//   //       <div className="relative w-full h-full flex justify-center items-end space-x-5 z-10 ">
//   //         <div className="w-full flex-1 flex flex-col justify-center items-start space-y-3 pb-4">
//   //           <div className="md:w-[200px] w-[125px]  md:h-[200px] h-[125px] bg-secondary p-2 rounded-full overflow-hidden md:-mt-[100px] -mt-[50px] ml-[10px]">
//   //             <div className="flex-1w-full h-full rounded-full bg-ternary flex justify-center items-center">
//   //               {images?.profileImage ? (
//   //                 <Image
//   //                   src={images?.profileImage}
//   //                   alt="user profile"
//   //                   title={images?.name}
//   //                   width={500}
//   //                   height={500}
//   //                   className="relative w-full h-full object-cover rounded-full overflow-hidden "
//   //                 />
//   //               ) : (
//   //                 <FaUser className="md:text-[50px] text-[25px] opacity-50" />
//   //               )}
//   //             </div>
//   //           </div>
//   //           <div className="flex justify-between items-center px-5">
//   //             <div className=" flex flex-col space-y-2">
//   //               <div className="space-y-1">
//   //                 <div className="flex justify-start items-center gap-2">
//   //                   <article className="text-white md:text-2xl text-base ">
//   //                     {ath?.user?.name}
//   //                   </article>
//   //                 </div>
//   //                 <div className="flex justify-start items-center span-x-4 ">
//   //                   <div className="flex justify-start items-center  text-white opacity-50 cursor-pointer ">
//   //                     <article className="md:block hidden text-[10px]">
//   //                       {ath?.user?.currentSchool}
//   //                     </article>{" "}
//   //                     <article className="md:hidden block text-[10px]">
//   //                       {ath?.user?.currentSchool?.length > 40
//   //                         ? ath?.user?.currentSchool?.substring(0, 40) + "..."
//   //                         : ath?.user?.currentSchool}
//   //                     </article>{" "}
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //               <article
//   //                 className="text-xs cursor-pointer text-primary"
//   //                 onClick={handleOpenInfoModel}
//   //               >
//   //                 About Info
//   //               </article>
//   //             </div>
//   //             <div
//   //               className="absolute top-5 right-0 text-primary cursor-pointer"
//   //               onClick={() => router.push("/profile")}
//   //             >
//   //               Edit
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </div>
//   //       {/*  */}
//   //       <div className="absolute top-0 right-0 p-4 flex justify-end items-center space-x-5 ">
//   //         {ath?.user?.socialLinks?.map((link) => {
//   //           return (
//   //             <a href={link?.link} target="_blank">
//   //               {getIcons(link?.socialBrand)}
//   //             </a>
//   //           );
//   //         })}
//   //       </div>
//   //     </div>
//   //   );
//   // };
//   // layout left
//   const LeftContent = () => {
//     return (
//       <div className="flex-1 w-full h-auto">
//         <div className="sticky top-0 md:mt-10 mt-5 z-10 ">
//           <AtheletFzoneContent selectedTab={selectedTab} />
//         </div>
//       </div>
//     );
//   };

//   const UserFollowerList = () => {
//     return (
//       <div className="relative mb-10 h-[400px] ">
//         <FollowerList />
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

//   const [openModel, setOpenModel] = useState(false);

//   const handleOpenInfoModel = () => {
//     setOpenModel(true);
//   };

//   const handleCloseInfoModel = () => {
//     setOpenModel(false);
//   };
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState({} as any);
//   const [images, setImages] = useState();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [requestCardDetails, setRequestCardDetails] = useState(null);

//   console.log({user});
  

//   async function fetchRequestCard() {
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/athlete/request_details`,
//       method: "GET",
//     });

    

//     if (response) {
//       setRequestCardDetails(response);
//     }
//   }

//   useEffect(() => {
//     fetchRequestCard();
//   }, []);

//   useEffect(() => {
//     if (user?.role === "User") {
//       router.push("/fanzone/profile/user");
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!session?.user.id) {
//       router.push("/auth/signin");
//     }
//   }, [session]);

//   const fetchUser = async () => {
//     setLoading(true);
//     const result = await callAPI({ endpoint: "/api/user/getProfile" });

//     if (result.user) {
//       result.user.twitterUrl =
//         result.user.socialLinks?.find(
//           (l) => l.socialBrand === "X" || l.socialBrand === "twitter"
//         )?.link || null;
//       result.user.instagramUrl =
//         result.user.socialLinks?.find((l) => l.socialBrand === "instagram")
//           ?.link || null;
//       result.user.facebookUrl =
//         result.user.socialLinks?.find((l) => l.socialBrand === "facebook")
//           ?.link || null;
//       result.user.linkedinUrl =
//         result.user.socialLinks?.find((l) => l.socialBrand === "linkedin")
//           ?.link || null;
//       result.user.tiktokUrl =
//         result.user.socialLinks?.find((l) => l.socialBrand === "tiktok")
//           ?.link || null;
//       setUser(result.user);
//       if (result.imageDownload) {
//         await downloadUserImages(
//           result.user,
//           result.imageDownload?.authorizationToken,
//           result.imageDownload?.downloadUrl
//         );
//       }
//     }
//     setLoading(false);
//   };

//   async function downloadUserImages(_user, authToken, url) {
//     let downloadedImages = {} as any;
//     if (_user.image) {
//       if (_user.image.includes("http")) {
//         downloadedImages.profileImage = _user.image;
//       } else {
//         downloadedImages.profileImage = await downloadFile(
//           `${url}/file/mvpz-user-private/${_user.image}`,
//           authToken
//         );
//       }
//     }
//     if (_user.bannerImage) {
//       downloadedImages.bannerImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${_user.bannerImage}`,
//         authToken
//       );
//     }
//     if (_user.cardImage) {
//       downloadedImages.cardImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${_user.cardImage}`,
//         authToken
//       );
//     }
//     setImages(downloadedImages);
//   }

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const AtheletFzoneContent: React.FC<AtheletFzoneContentProps> = ({
//     selectedTab,
//   }) => {
//     switch (selectedTab) {
//       case FzoneAtheletProfileLinksEnum.shout:
//         return <AtheletShout />;
//       case FzoneAtheletProfileLinksEnum.activity:
//         return <AtheletActivity  ath={user}/>;
//       case FzoneAtheletProfileLinksEnum.tribes:
//         return <AthleteTribes ath={{ user }} />;
//       case FzoneAtheletProfileLinksEnum.card:
//         return requestCardDetails?.card?.cardApproval === "CardApproved" ? (
//           <AtheletCard handleAddFollow={() => {}} ath={user} isSearchAthlete={false} />
//         ) : (
//           <AtheletCreateCard ath={user} viewMode={false} />
//         );
//       default:
//         return null; // Return null or a default component if needed
//     }
//   };

//   const isPWA = useIsPWA()

//   return (
//     <>
//       {loading ? (
//         <div className="flex justify-center items-center">
//           <Loader />
//         </div>
//       ) : (
//         <>
//         {isPWA && <div className="flex px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] justify-start items-center gap-2 text-sm cursor-pointer mb-10" onClick={() => router.back()}><FaChevronLeft /> Back</div>}
//           <div className="relative w-full md:pb-10 py-1 space-y-5 z-0">
//             <div className="w-full px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] space-y-10">
//               {/* <ProfileHeader
//                 handleOpenInfoModel={handleOpenInfoModel}
//                 ath={{ user: user }}
//                 images={images}
//               /> */}
//               <AthProfileHeader ath={{user : user}} handleOpenInfoModel={handleOpenInfoModel} images={images} editable={true} showFollow={false}/>
//               <NavigationHeader />
//             </div>

//             <FanzoneLayout
//               rightMoreComp={rightComp}
//               layoutTailClass="lg:!h-auto !h-auto"
//             >
//               <LeftContent />
//             </FanzoneLayout>
//           </div>
//           {openModel ? (
//             <AthleteProfileInfo
//               open={openModel}
//               handleCloseInfoModel={handleCloseInfoModel}
//               ath={{ user }}
//               images={images}
//             />
//           ) : null}
//         </>
//       )}
//     </>
//   );
// };

// export default Index;


// import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index