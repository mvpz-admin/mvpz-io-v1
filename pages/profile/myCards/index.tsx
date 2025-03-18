// import {
//   Button,
//   Group,
//   Image as MantineImage,
//   Loader,
//   SimpleGrid,
//   Stack,
//   Tabs,
//   Skeleton,
// } from "@mantine/core";
// import { useClipboard, useMediaQuery } from "@mantine/hooks";
// import { notifications } from "@mantine/notifications";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { callAPI, downloadFile } from "../../../lib/utils";
// import Image from "next/image";
// import ModelVr_O from "../../../core/Atoms/Models/ModelVr_O";
// import SharePost from "../../../core/Atoms/Feed/SharePost";
// import { IoReloadOutline } from "react-icons/io5";
// import { FaShare, FaStore } from "react-icons/fa";
// import CollectionCard from "../../../core/Components/Cards/CollectionsCard";
// import ProfileLayout from "../../../core/Layout/ProfileLayout";

// const MoreCardLoading = () => {
//   const largeScreen = useMediaQuery("(min-width: 60em)");
//   return (
//     <div className="relative w-full">
//       <SimpleGrid cols={largeScreen ? 4 : 2}>
//         {" "}
//         {Array(10)
//           .fill(0)
//           .map((_) => (
//             <Skeleton className="md:h-[300px] h-[200px] w-full rounded-md" />
//           ))}
//       </SimpleGrid>
//     </div>
//   );
// };

// const LoaderSekeleton = () => {
//   const largeScreen = useMediaQuery("(min-width: 60em)");
//   return (
//     <div className="relative w-full space-y-5">
//       <div className="relative w-full space-y-3">
//         <div className="w-full h-[30px] flex justify-between items-center">
//           {/* left */}
//           <div className="h-full md:space-x-2 flex justify-start items-center ">
//             <Skeleton className="md:block hidden h-full w-[100px] rounded-md" />
//             <Skeleton className="  h-full md:w-[300px] w-[200px] rounded-md" />
//           </div>
//           {/* right */}
//           <div className="h-full space-x-2 flex justify-start items-center">
//             <Skeleton className="md:block hidden h-full w-[100px] rounded-md" />
//             <Skeleton className="h-full w-[100px] rounded-md" />
//           </div>
//         </div>
//       </div>
//       <div className="relative w-full">
//         <SimpleGrid cols={largeScreen ? 4 : 2}>
//           {" "}
//           {Array(10)
//             .fill(0)
//             .map((_) => (
//               <Skeleton className="h-[300px] w-full rounded-md" />
//             ))}
//         </SimpleGrid>
//       </div>
//     </div>
//   );
// };

// const MyCards = () => {
//   let tabList = ["All", "Athlete", "Activity", "Team", "Championship"];
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [moreLoading, setMoreLoading] = useState(false);
//   const router = useRouter();
//   const clipboard = useClipboard({ timeout: 2000 });
//   const { data: session, status } = useSession();
//   const [openShareModel, setOpenShareModel] = useState(false);
//   const [refreshDate, setRefreshDate] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(null);
//   const [selectedTab, setSelectedTab] = useState("All");

//   async function downloadImages(_cards, authToken, url, prevsCards) {
//     for (let card of _cards) {
//       if (card.enhancementImageNft || card?.baseImageNft) {
//         card.displayImage = await downloadFile(
//           card.enhancementImageNft
//             ? `${url}/file/mvpz-nfts/${card.enhancementImageNft}`
//             : `${url}/file/mvpz-nfts/${card.baseImageNft}`,
//           authToken
//         );
//       }
//       if (
//         card?.owner?.profileImage &&
//         !card?.owner?.profileImage?.includes("https://")
//       ) {
//         let downloadImage = await downloadFile(
//           `${url}/file/mvpz-user-private/${card?.owner?.profileImage}`,
//           authToken
//         );

//         card.owner.profileImage = downloadImage || null;
//       }

//       // Download avatars' thumbnails in parallel
//       // if (card?.avatars?.length) {
//       //   card.avatars.forEach(async(avatar, index) => {
//       //     if (avatar?.thumbnail) {
//       //       let downloadImage = await downloadFile(
//       //         `${url}/file/mvpz-nfts/${avatar?.thumbnail}`,
//       //         authToken
//       //       );
//       //       card.avatars[index].thumbnail = downloadImage
//       //     }
//       //   });
//       // }
//     }

//     setCards([...prevsCards, ..._cards]);
//     setLoading(false);
//     setMoreLoading(false);
//   }

//   const fetchCards = async () => {
//     currentPage == 1 ? setLoading(true) : setLoading(false);
//     currentPage > 1 && setMoreLoading(true);
//     let prevCards = cards;
//     setCards([]);
//     const result = await callAPI({
//       endpoint: `/api/card/myCards?page=${currentPage}&pageType=${selectedTab}`,
//     });
//     if (result.cards?.length) {
//       setHasMore(result?.pagination?.hasMore);
//       downloadImages(
//         result.cards,
//         result.imageDownload?.authorizationToken,
//         result.imageDownload?.downloadUrl,
//         prevCards
//       );
//     } else {
//       setLoading(false);
//       setMoreLoading(false);
//     }
//     if (result.lastRefreshedDate) {
//       setRefreshDate(result.lastRefreshedDate);
//     }
//   };

//   async function refreshCards() {
//     setLoading(true);
//     const result = await callAPI({
//       endpoint: "/api/user/refreshCards",
//       method: "POST",
//     });
//     if (result.message) {
//       notifications.show({ message: result.message });
//     }
//     fetchCards();
//     setLoading(false);
//   }

//   const gotoMint = async () => {
//     router.push("/mvpz-store");
//   };

//   const copyPublicUrl = () => {
//     if (session?.user?.id) {
//       clipboard.copy(
//         `https://mvpz.io/user/publicProfileCards?userId=${session?.user?.id}`
//       );
//     }
//   };

//   if (session?.user?.deactivated) {
//     router.push("/signout");
//   }

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/fanzone");
//     }
//     const redirectUrl = localStorage.getItem("redirectUrl");
//     if (!!redirectUrl) {
//       localStorage.removeItem("redirectUrl");
//       router.push(redirectUrl);
//     } else {
//       fetchCards();
//     }
//   }, [currentPage, router.pathname]);

//   useEffect(() => {
//     setCards([]);
//     fetchCards();
//   }, [selectedTab]);

//   return (
//     <ProfileLayout>
//       <article className="md:text-[50px] text-2xl text-center  uppercase font-graffiti mb-10">
//         <span className="text-primary">My</span> Collections
//       </article>

//       {loading ? (
//         <LoaderSekeleton />
//       ) : cards.length > 0 ? (
//         <div className="relative w-full space-y-5">
//           {/* Top Header */}
//           <>
//             <article className="md:hidden  block text-sm font-inter font-semibold mb-2">
//               Last refreshed:{" "}
//               {!!refreshDate
//                 ? new Date(refreshDate).toLocaleDateString() +
//                   " " +
//                   new Date().toLocaleTimeString()
//                 : new Date().toLocaleDateString() +
//                   " " +
//                   new Date().toLocaleTimeString()}
//             </article>
//             <div className="flex justify-between items-center space-x-5">
//               <div className="flex justify-start items-center gap-x-5">
//                 <div
//                   className={`px-4 py-2 rounded-md bg-secondary hover:bg-ternary border border-white border-opacity-5 font-inter font-semibold cursor-pointer text-sm flex justify-start items-center gap-2`}
//                   onClick={refreshCards}
//                 >
//                   <IoReloadOutline className={loading && "animate-spin"} />
//                   Refresh
//                 </div>
//                 <article className="md:block hidden text-sm font-inter font-semibold">
//                   Last refreshed:{" "}
//                   {!!refreshDate
//                     ? new Date(refreshDate).toLocaleDateString() +
//                       " " +
//                       new Date().toLocaleTimeString()
//                     : new Date().toLocaleDateString() +
//                       " " +
//                       new Date().toLocaleTimeString()}
//                 </article>
//               </div>
//               <div className="md:flex hidden  justify-end items-center gap-x-5">
//                 {!!cards.length && (
//                   <div
//                     className={`px-4 py-2 rounded-md bg-secondary hover:bg-ternary border border-white border-opacity-5 font-inter font-semibold cursor-pointer text-sm flex justify-start items-center gap-2`}
//                     onClick={() => setOpenShareModel(true)}
//                   >
//                     <FaShare />
//                     Share Collection
//                   </div>
//                 )}
//                 <div
//                   className={`px-4 py-2 rounded-md bg-secondary hover:bg-ternary border border-white border-opacity-5 font-inter font-semibold cursor-pointer text-sm flex justify-start items-center gap-2`}
//                   onClick={gotoMint}
//                 >
//                   <FaStore />
//                   Shopping
//                 </div>
//               </div>
//               <div className="md:hidden flex  justify-end items-center gap-x-5">
//                 {!!cards.length && (
//                   <div
//                     className={`px-4 py-2 rounded-md bg-secondary hover:bg-ternary border border-white border-opacity-5 font-inter font-semibold cursor-pointer text-sm flex justify-start items-center gap-2`}
//                     onClick={() => setOpenShareModel(true)}
//                   >
//                     <FaShare />
//                     {/* Share Collection */}
//                   </div>
//                 )}
//                 <div
//                   className={`px-4 py-2 rounded-md bg-secondary hover:bg-ternary border border-white border-opacity-5 font-inter font-semibold cursor-pointer text-sm flex justify-start items-center gap-2`}
//                   onClick={gotoMint}
//                 >
//                   <FaStore />
//                   {/* Shopping */}
//                 </div>
//               </div>
//             </div>
//           </>
//           {/* Second Header */}
//           <>
//             <div className="w-full overflow-x-auto whitespace-nowrap scroller-hidden ">
//               <div className="flex justify-start items-center gap-2">
//                 {tabList?.map((tab, idx) => {
//                   return (
//                     <div
//                       key={idx + tab}
//                       className={`px-4 py-2 rounded-full ${
//                         selectedTab == tab
//                           ? "bg-primary border border-white border-opacity-50"
//                           : "bg-secondary hover:bg-ternary border border-white border-opacity-5"
//                       } font-inter font-semibold cursor-pointer text-sm `}
//                       onClick={() => setSelectedTab(tab)}
//                     >
//                       {tab}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </>
//           {/* Cards */}
//           <>
//             <div className="relative w-full h-auto grid  md:grid-cols-3 grid-cols-2 my-10 lg:gap-10 gap-5">
//               {cards?.map((card) => {
//                 return <CollectionCard key={card?.title} card={card} />;
//               })}
//             </div>
//           </>
//         </div>
//       ) : moreLoading ? (
//         <MoreCardLoading />
//       ) : (
//         <Stack>
//           <Image
//             alt=""
//             width={1000}
//             height={500}
//             src="/images/genone.png"
//           ></Image>
//           {/* <Image  src="/images/Applynow.png"></Image> */}
//           <Group position="center">
//             <Button onClick={gotoMint}>BUY NOW</Button>
//           </Group>
//         </Stack>
//       )}

//       {openShareModel && (
//         <ModelVr_O
//           open={openShareModel}
//           setHandleOpen={setOpenShareModel}
//           extraClass="!z-[1000]"
//         >
//           <SharePost
//             title="Share Collection"
//             pathname={`/profile/collections/publicProfileCards?userId=${session?.user?.id}`}
//           />
//         </ModelVr_O>
//       )}

//       {hasMore && !loading && (
//         <div className="w-full flex  justify-center items-center mt-10">
//           <div
//             className="px-4 py-2 rounded-md bg-secondary hover:bg-ternary border border-white border-opacity-5 font-inter font-semibold cursor-pointer text-sm flex justify-start items-center gap-2"
//             onClick={() => !moreLoading && setCurrentPage((prev) => prev + 1)}
//           >
//             <article className="text-xs text-white">
//               {moreLoading || loading ? "Loading..." : "Load More"}
//             </article>
//             {moreLoading ||
//               (loading && (
//                 <Loader variant="oval" className="text-primary" size={20} />
//               ))}
//           </div>
//         </div>
//       )}
//     </ProfileLayout>
//   );
// };

// export default MyCards;


import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index