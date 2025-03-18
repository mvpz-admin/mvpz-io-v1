// import {
//   Button,
//   Container,
//   CopyButton,
//   Group,
//   Loader,
//   Skeleton,
// } from "@mantine/core";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useEffect } from "react";
// import { callAPI, downloadFile } from "../../../lib/utils";
// import AthleteProfile from "../../../components/profile/AthleteProfile";
// import FlipCard from "../../../core/Atoms/Card/FlipCard";
// import Image from "next/image";
// import ReactQRCode from "react-qr-code";
// import { FaShare, FaUser, FaUserPlus } from "react-icons/fa";
// import ModelVr_O from "../../../core/Atoms/Models/ModelVr_O";
// import SharePost from "../../../core/Atoms/Feed/SharePost";
// import NotFound from "../../../core/Components/Errors/NotFound";

// const Athlete = (props) => {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const { username } = router.query;
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const [organization, setOrganization] = useState(null);
//   const [cards, setCards] = useState([]);
//   const [product, setProduct] = useState(null);
//   const [copying, setCopying] = useState(false);
//   const [userNotFound, setUserNotFound] = useState(false);

//   const [openShareModel, setOpenShareModel] = useState(false);

//   async function downloadCardImages(_cards, authToken, url) {
//     for (let card of _cards) {
//       if (card.nftEntity?.cardImageNFT) {
//         card.displayImage = await downloadFile(
//           `${url}/file/mvpz-nfts-optimized/${card.nftEntity.cardImageNFT}`,
//           authToken
//         );
//       }
//     }
//     setCards(_cards);
//   }

//   async function downloadUserImages(_user, authToken, url) {
//     if (_user.image) {
//       _user.profileImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${_user.image}`,
//         authToken
//       );
//     }
//     if (_user.bannerImage) {
//       _user.bannerDisplayImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${_user.bannerImage}`,
//         authToken
//       );
//     }
//     if (_user.cardImage) {
//       _user.cardDisplayImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${_user.cardImage}`,
//         authToken
//       );
//     } else if (_user.athleteCard?.cardImageNFT) {
//       _user.cardDisplayImage = await downloadFile(
//         `${url}/file/mvpz-nfts-optimized/${_user.athleteCard.cardImageNFT}`,
//         authToken
//       );
//     }
//     return _user;
//   }

//   const fetchUser = async () => {
//     if (username) {
//       // setLoading(true);
//       const result = await callAPI({
//         method: "GET",
//         endpoint: `/api/user/getUser?username=${username}&role=user`,
//       });

//       if (!result.success) {
//         setLoading(false);
//         return setUserNotFound(true);
//       }

//       if (result.user) {
//         const _user = await downloadUserImages(
//           result.user,
//           result.imageDownload?.authorizationToken,
//           result.imageDownload?.downloadUrl
//         );
//         setUser(_user);
//         setOrganization(result?.user?.organisation);
//       }
//       if (result.user?.cards?.length) {
//         downloadCardImages(
//           result.user.cards,
//           result.imageDownload?.authorizationToken,
//           result.imageDownload?.downloadUrl
//         );
//       }
//       //   setLoading(false);
//     }
//   };

//   const gotoCheckout = async () => {
//     if (status === "unauthenticated") {
//       router.push("/auth/signin");
//     }
//     const result = await callAPI({
//       endpoint: `/api/purchase/initiate`,
//       method: "POST",
//       body: {
//         priceId: product.stripePriceId,
//         cardType: "digital",
//         packType: "athlete",
//         athleteId: user.id,
//       },
//     });
//     if (result?.checkoutUrl) {
//       router.push(result.checkoutUrl);
//     }
//   };

//   const fetchProducts = async () => {
//     const res = await callAPI({
//       endpoint: "/api/product/getActive?type=athlete",
//     });
//     if (res.length) {
//       setProduct(res[0]);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetchUser();
//     if (!product) {
//       fetchProducts();
//     }
//     setLoading(false);
//   }, [username]);

//   const handleProfile = () => {
//     if (session?.user) {
//       router.push(`/fanzone/tribe/profile/athlete/${user?.username}?tab=card`);
//     } else {
//       localStorage.setItem(
//         "redirectUrl",
//         `/fanzone/tribe/profile/athlete/${user?.username}?tab=card`
//       );
//       router.push(`/auth/signin`);
//     }
//   };

//   const handleFollow = () => {
//     if (session?.user) {
//       router.push(
//         `/fanzone/tribe/profile/athlete/${user?.username}?action=follow&tab=card`
//       );
//     } else {
//       localStorage.setItem(
//         "redirectUrl",
//         `/fanzone/tribe/profile/athlete/${user?.username}?action=follow&tab=card`
//       );
//       router.push(`/auth/signin`);
//     }
//   };

//   const handleShare = () => {
//     setOpenShareModel(true);
//   };

//   return (
//     <div className="w-full h-[100vh] flex flex-col justify-center items-center">
//      {!userNotFound && <Image
//         src={organization?.tribe[0]?.tribeBanner}
//         alt={user?.name}
//         width={500}
//         height={500}
//         className="relative w-full h-full object-cover brightness-50 opacity-50"
//       />}
//       {userNotFound ? (
//         <NotFound title="Athlete Not Found!" />
//       ) : (
//         <>
//           <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center backdrop-blur-2xl">
//             {!user ? (
//               <div className="relative md:h-[550px] h-[450px] md:w-[350px] w-[300px] rounded-[30px] overflow-hidden bg-secondary">
//                 <div className="relative z-0 w-full h-[200px] bg-ternary">
//                   <Skeleton className="w-full h-full" />
//                 </div>
//                 <div className="md:w-[250px] w-[200px] md:h-[250px] h-[200px] mx-auto rounded-full overflow-hidden border-[10px] border-secondary relative bg-secondary -mt-[75px] md:mb-10 mb-5">
//                   <Skeleton className="w-full h-full" />
//                 </div>
//                 <Skeleton className="w-[100px] h-[30px] rounded-md mx-auto mb-5" />
//                 <Skeleton className="w-[200px] h-[20px] rounded-md mx-auto mb-2" />
//                 <Skeleton className="w-[200px] h-[20px] rounded-md mx-auto" />
//               </div>
//             ) : (
//               <FlipCard
//                 frontComp={() =>
//                   user?.athleteCard ? (
//                     <div className="relative w-full h-full overflow-hidden  flex justify-center items-center ">
//                       <div className="rounded-xl overflow-hidden">
//                         <Image
//                           src={user?.cardDisplayImage}
//                           alt={user?.name}
//                           width={500}
//                           height={500}
//                           className="relative w-full h-full object-cover "
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-secondary">
//                       <div className="relative z-0 w-full h-[200px] bg-ternary">
//                         <Image
//                           src={user?.bannerDisplayImage}
//                           alt={user?.name}
//                           width={500}
//                           height={500}
//                           className="relative w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="md:w-[250px] w-[200px] md:h-[250px] h-[200px] mx-auto rounded-full overflow-hidden border-[10px] border-secondary relative bg-secondary -mt-[75px] md:mb-10 mb-5">
//                         <Image
//                           src={user?.profileImage}
//                           alt={user?.name}
//                           width={500}
//                           height={500}
//                           className="relative w-full h-full object-cover"
//                         />
//                       </div>
//                       <article className="md:mt-5 mt-2 text-center text-2xl">
//                         {user?.name}
//                       </article>
//                       <article className="mt-2 text-[10px] text-center max-w-42 mb-2 px-12">
//                         {user?.currentSchool}
//                       </article>
//                     </div>
//                   )
//                 }
//                 backComp={() => (
//                   <div
//                     className=" relative w-full h-full rounded-[30px] flex flex-col justify-center items-center "
//                     style={{
//                       background: `linear-gradient(to top right, ${organization?.primaryColorHex}, ${organization?.secondaryColorHex})`,
//                     }}
//                   >
//                     <ReactQRCode
//                       value={`${process.env.NEXT_PUBLIC_APP_URL}/fanzone/tribe/profile/athlete/Joe.Bruin`}
//                       bgColor="transparent"
//                       fgColor="#fff"
//                       className="w-[225px] h-[225x]"
//                     />
//                     <article className="md:mt-10 mt-5 font-monumentUltraBold text-2xl -rotate-2">
//                       {user?.username}
//                     </article>
//                   </div>
//                 )}
//                 handleFunction={copying}
//                 cardHeight={
//                   user?.athleteCard
//                     ? "md:h-[480px] h-[420px]"
//                     : "md:h-[550px] h-[450px]"
//                 }
//                 cardWidth="md:w-[350px] w-[300px]"
//               />
//             )}

//             {user ? (
//               <>
//                 <div className="flex justify-center items-center mt-10 gap-10">
//                   <div
//                     className="flex flex-col justify-center items-center gap-1 cursor-pointer"
//                     onClick={handleProfile}
//                   >
//                     <div className="w-[60px] h-[60px] rounded-full bg-secondary hover:bg-[#000] flex justify-center items-center mb-1">
//                       <FaUser />
//                     </div>
//                     <article className="text-center text-xs">Profile</article>
//                   </div>
//                   <div
//                     className="flex flex-col justify-center items-center gap-1 cursor-pointer"
//                     onClick={handleFollow}
//                   >
//                     <div className="w-[60px] h-[60px] rounded-full bg-secondary hover:bg-[#000] flex justify-center items-center mb-1">
//                       <FaUserPlus />
//                     </div>
//                     <article className="text-center text-xs">Follow</article>
//                   </div>
//                   <div
//                     className="flex flex-col justify-center items-center gap-1 cursor-pointer"
//                     onClick={handleShare}
//                   >
//                     <div className="w-[60px] h-[60px] rounded-full bg-secondary hover:bg-[#000] flex justify-center items-center mb-1">
//                       <FaShare />
//                     </div>
//                     <article className="text-center text-xs">Share</article>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex justify-center items-center mt-10 gap-10">
//                   <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
//                     <Skeleton className="w-full h-full object-cover opacity-50" />
//                   </div>
//                   <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
//                     <Skeleton className="w-full h-full object-cover opacity-50" />
//                   </div>
//                   <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
//                     <Skeleton className="w-full h-full object-cover opacity-50" />
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//           {openShareModel && (
//             <ModelVr_O
//               open={openShareModel}
//               setHandleOpen={setOpenShareModel}
//               extraClass="!z-50"
//             >
//               <SharePost pathname={`/athlete/${user?.username}/profilecard`} />
//             </ModelVr_O>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Athlete;
