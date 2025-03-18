// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FanzoneTribeLinksEnum } from "../../../../core/Components/HeaderLinks/GlobalLinksEnum";
// import TribeFeed from "../../../../core/Components/TribeCommunityFanzone/TribeFeed";
// import TribeCollections from "../../../../core/Components/TribeCommunityFanzone/TribeCollections";
// import TribeMedia from "../../../../core/Components/TribeCommunityFanzone/TribeMedia";
// import TribeLives from "../../../../core/Components/TribeCommunityFanzone/TribeLives";
// import TribeShouts from "../../../../core/Components/TribeCommunityFanzone/TribeShouts";
// import AtheletPostSlider from "../../../../core/Components/TribeFanzone/AtheletPostSlider";
// import FanzoneLayout from "../../../../core/Layout/FanzoneLayout";
// import TribeCommunityCard from "../../../../core/Atoms/TribeCard/TribeCommunityCard";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { callAPI } from "../../../../lib/utils";
// import { Loader } from "@mantine/core";
// import { HiSpeakerphone } from "react-icons/hi";
// import { FaSquarePlus } from "react-icons/fa6";
// import { TbCardsFilled } from "react-icons/tb";
// import { RiLiveFill, RiTvFill } from "react-icons/ri";
// import { FaChevronLeft, FaShare, FaTrophy } from "react-icons/fa";
// import MenuOptions from "../../../../core/Atoms/Others/MenuOption";
// import { FiMoreVertical } from "react-icons/fi";
// import ModelVr_O from "../../../../core/Atoms/Models/ModelVr_O";
// import SharePost from "../../../../core/Atoms/Feed/SharePost";
// import useIsPWA from "../../../../utils/hooks/useIsPWA";
// import TribeBanner from "../../../../core/Atoms/DeafualtBanners/TribeBanner";
// import CommunityBanner from "../../../../core/Atoms/DeafualtBanners/CommunityBanner";
// import { RxOpenInNewWindow } from "react-icons/rx";

// const Index = () => {
//   const [selectedTab, setSelectedTab] = useState<FanzoneTribeLinksEnum>(
//     FanzoneTribeLinksEnum.feed
//   );
//   const [openShareModel, setOpenShareModel] = useState(false);
//   const [referral, setReferral] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [tribe, setTribe] = useState<any>(null);
//   const [downloadImage, setDownloadImage] = useState<string | null>(null);
//   const [shouts, setShouts] = useState([]);
//   const [shoutsLoading, setShoutLoading] = useState(false);
//   const [memberJoiningLoading, setMemberJoiningLoading] = useState(false);

//   const handleFetchShouts = async () => {
//     if (tribe) {
//       setShoutLoading(true);
//       let response = await callAPI({
//         endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/latest`,
//         method: "POST",
//         body: {
//           tribeId: tribe?.id,
//         },
//       });

//       if (response) {
//         setShouts(response?.posts);
//       }
//       setShoutLoading(false);
//     }
//   };

//   const TribeFzoneContent: React.FC<{ selectedTab: FanzoneTribeLinksEnum }> = ({
//     selectedTab,
//   }) => {
//     const componentMap = {
//       [FanzoneTribeLinksEnum.feed]: (
//         <TribeFeed tribe={tribe} session={session} />
//       ),
//       [FanzoneTribeLinksEnum.shouts]: (
//         <TribeShouts
//           tribe={tribe}
//           handleFetchShouts={handleFetchShouts}
//           session={session}
//         />
//       ),
//       [FanzoneTribeLinksEnum.media]: (
//         <TribeMedia tribe={tribe} session={session} />
//       ),
//       [FanzoneTribeLinksEnum.live]: <TribeLives session={session} />,
//       [FanzoneTribeLinksEnum.store]: <TribeCollections session={session} />,
      
//     };

//     return componentMap[selectedTab] || null; // Return null or a default component if needed
//   };

//   const fetchTribeDetails = async () => {
//     const response = await callAPI({
//       method: "POST",
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/tribe_details/community/${router.query?.name}`,
//     });

//     const referral = await callAPI({ endpoint: "/api/user/getReferralInvite" });
//     if (response) {
//       setReferral(referral);
//       setTribe(response?.tribe);
//       setDownloadImage(response?.imageDownload);
//       return {
//         isMember: response?.isMember,
//         shortName: response?.tribe?.organisation?.shortName,
//       };
//     }
//     return { isMember: false, shortName: "" };
//   };

//   const handlePageLoad = async () => {
//     if (!session?.user) {
//       router.push("/auth/signin");
//       return;
//     }

//     const { isMember, shortName } = await fetchTribeDetails();

//     if (!isMember) {
//       router.push(`/fanzone/tribe/${shortName}`);
//     }
//     handleFetchShouts();
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (session?.user) {
//       handlePageLoad();
//     }
//   }, [router?.pathname, session?.user]);

//   const icons = {
//     Feed: FaSquarePlus,
//     Shouts: HiSpeakerphone,
//     Store: TbCardsFilled,
//     Media: RiTvFill,
//     Live: RiLiveFill,
//     Task : FaTrophy,
//   };

//   const handleLeave = async () => {
//     setMemberJoiningLoading(true);
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/member/leave`,
//       method: "DELETE",
//       body: {
//         tribeId: tribe?.id,
//       },
//     });
//     if (response) {
//       setTimeout(() => {
//         setMemberJoiningLoading(false);
//         router.push("/fanzone")
//       }, 2000);
//     }
//   };

//   const NavigationHeader = () => {
//     return (
//       <>
//         <div className={`md:block hidden w-full relative z-0 cursor-pointer`}>
//           <div
//             className="w-full py-5  flex md:justify-center justify-start items-center space-x-10 overflow-x-auto scroller-hidden md:pr-0 px-10"
//             style={{
//               background: `linear-gradient(to left, transparent, ${tribe?.organisation?.primaryColorHex} , transparent)`,
//             }}
//           >
//             {Object.values(FanzoneTribeLinksEnum).map((tab) => (
//               <div className="flex justify-start items-center gap-2">
//                 {/* {tab === "Task" && <RxOpenInNewWindow color="white" />} */}
//                 <article
//                 key={tab}
//                 className={`md:text-base text-sm font-bold cursor-pointer`}
//                 style={{
//                   color:
//                     selectedTab === tab
//                       ? tribe?.organisation?.secondaryColorHex
//                       : "#fff",
//                 }}
//                 // onClick={() => setSelectedTab(tab)}
//                 onClick={() => tab === "Task" ? router.push(`/mvpz-challenges?tribe=${router.query.name}`) : setSelectedTab(tab)}
//                 >
//                  {
//                   tab
//                  }
     
//               </article>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className={`md:hidden block relative z-0 cursor-pointer`}>
//           <div
//             className="w-full py-5  flex justify-between items-center  overflow-x-auto scroller-hidden md:pr-0 px-5 space-x-1"
//             style={{
//               background: tribe?.organisation?.primaryColorHex,
//             }}
//           >
//             {Object.values(FanzoneTribeLinksEnum).map((tab) => {
//               const key = tab.charAt(0).toUpperCase() + tab.slice(1);
//               const IconComponent = icons[key as keyof typeof icons];
//               return (
//                 <div
//                   key={tab}
//                   className={`space-y-1 flex flex-col justify-center items-center`}
//                   style={{
//                     color:
//                       selectedTab === tab
//                         ? tribe?.organisation?.secondaryColorHex
//                         : "#fff",
//                   }}
//                   onClick={() => tab === "Task" ? router.push(`/mvpz-challenges`) :  setSelectedTab(tab)}
//                   // onClick={() =>   setSelectedTab(tab)}
//                 >
//                   {IconComponent && <IconComponent size={22} />}
//                   <article
//                     className={`text-[10px] ${
//                       selectedTab === tab ? "font-bold" : "font-normal"
//                     } cursor-pointer`}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </article>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </>
//     );
//   };

//   const Header = () => (
//     <div className="relative w-full md:h-[400px] h-[200px]">
//       { tribe?.tribeHorizontalBanner || tribe?.tribeBanner ? <Image
//         src={tribe?.tribeHorizontalBanner || tribe?.tribeBanner}
//         alt="tribe banner"
//         width={500}
//         height={300}
//         className="relative w-full h-full object-cover"
//       /> : 
//       <CommunityBanner primaryColor={tribe?.organisation?.primaryColorHex} secondaryColor={tribe?.organisation?.secondaryColorHex}/>
//       }
//     </div>
//   );

//   const LeftContent = () => (
//     <div className="flex-1 w-full h-auto relative">
//       <div className="sticky top-0 mt-10 z-10">
//         <TribeFzoneContent selectedTab={selectedTab} />
//       </div>
//     </div>
//   );

//   const RightContent = () => (
//     <div className="w-full space-y-6">
//       <TribeCommunityCard
//         banner={tribe?.tribeVerticalBanner || tribe?.tribeVerticalBanner}
//         theme={{
//           primaryColor: tribe?.organisation?.primaryColorHex,
//           secondaryColor: tribe?.organisation?.secondaryColorHex,
//         }}
//         name={tribe?.tribeName}
//         member={tribe?.memberCount}
//         shortName={tribe?.tribeShortName}
//       />

//       <div className="bg-secondary p-5 rounded-md w-full">
//         <div className="flex justify-between items-start">
//           <div className="flex flex-col justify-start items-start   mb-4">
//             <div className="flex justify-start items-center gap-2 mb-1">
//               {" "}
//               <TbCardsFilled size={20} />
//               <article className="text-sm  ">Profile Card</article>
//             </div>
//             <article className="text-[8px] opacity-50">
//               Check Your Tribe Card
//             </article>
//           </div>
//           <div className="mt-2">
//             <MenuOptions
//               position="bottom"
//               options={[
//                 {
//                   label: "Share",
//                   iconPosition: "left",
//                   icon: <FaShare />,
//                 },
//               ]}
//               onSelect={() => setOpenShareModel(true)}
//             >
//               <FiMoreVertical />
//             </MenuOptions>
//           </div>
//         </div>
//         <div className="flex justify-center items-center gap-4">
//           <div
//             className="p-3 w-full flex justify-center items-center bg-primary text-white text-xs rounded-md cursor-pointer "
//             style={{
//               background: tribe?.organisation?.primaryColorHex,
//               color: tribe?.organisation?.secondaryColorHex,
//             }}
//             onClick={() =>
//               router?.push(`/tribe/${router.query?.name}/profilecard`)
//             }
//           >
//             Preview
//           </div>
//         </div>
//       </div>

//       <div
//         className="p-3 w-full flex justify-center items-center bg-secondary text-red-500 text-xs rounded-md cursor-pointer gap-4"
//         onClick={handleLeave}
//       >
//         Leave Community {memberJoiningLoading && <Loader size={15} color="white" />}
//       </div>
//     </div>
//   );

//   const isPWA = useIsPWA()

//   return (
//     <>
//       <div className="relative md:gap-y-10 gap-y-5 pt-10">
//       {isPWA && <div className="flex px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] justify-start items-center gap-2 text-sm cursor-pointer mb-10" onClick={() => router.back()}><FaChevronLeft /> Back</div>}
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <Loader />
//           </div>
//         ) : (
//           <>
//             <div className="relative z-0 w-full px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] md:gap-y-10 gap-y-5">
//               <Header />
//               <div className="w-full md:py-10 py-5">
//                 {shouts?.length > 4 && <AtheletPostSlider
//                   tribeId={tribe?.id}
//                   shouts={shouts}
//                   imageDownload={downloadImage}
//                   theme={{
//                     primaryColor: tribe?.organisation?.primaryColorHex,
//                     secondaryColor: tribe?.organisation?.secondaryColorHex,
//                   }}
//                 />}
//               </div>
//               <NavigationHeader />
//             </div>
//             <FanzoneLayout >
//               <LeftContent />
//             </FanzoneLayout>
//           </>
//         )}
//       </div>
//       {openShareModel && (
//         <ModelVr_O
//           open={openShareModel}
//           setHandleOpen={setOpenShareModel}
//           extraClass="!z-50"
//         >
//           <SharePost
//             pathname={`/tribe/${router.query?.name}/profilecard${
//               referral?.inviteCode
//                 ? `?referralCode=${referral?.inviteCode}`
//                 : ""
//             }`}
//           />
//         </ModelVr_O>
//       )}{" "}
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