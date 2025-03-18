// import Image from "next/image";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   MdMoreVert,
//   MdOutlineDelete,
//   MdOutlineOfflineBolt,
//   MdVerifiedUser,
// } from "react-icons/md";
// import { IoChatbubbles, IoChatbubblesOutline } from "react-icons/io5";
// import {
//   FaAngleLeft,
//   FaFire,
//   FaFireAlt,
//   FaPlay,
//   FaShare,
// } from "react-icons/fa";
// import { FaHandHoldingUsd } from "react-icons/fa";
// import { FaHandsClapping } from "react-icons/fa6";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import ModelVr_O from "../Models/ModelVr_O";
// import { TbReload } from "react-icons/tb";
// import UserComment from "./UserComment";
// import AddCommentField from "./AddCommentField";
// import Replies from "./Replies";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import { Pagination, Navigation } from "swiper/modules";
// import { callAPI, downloadFile } from "../../../lib/utils";
// import { useSession } from "next-auth/react";
// import ImagePreview from "./ImagePreview";
// import { PiCloverFill, PiCloverLight } from "react-icons/pi";
// import { MdOfflineBolt } from "react-icons/md";
// import SharePost from "./SharePost";
// import Tooltip from "../Others/Tooltip";
// import MenuOptions from "../Others/MenuOption";
// import { PiBellSimpleLight, PiUserMinusLight, PiXLight } from "react-icons/pi";
// import { useRouter } from "next/router";
// import ReactionViewer from "./ReactionViewer";
// import { PiHandsClappingLight, PiHandsClappingFill } from "react-icons/pi";
// import { HiCurrencyDollar, HiOutlineCurrencyDollar } from "react-icons/hi";
// import BuyCardModel from "./BuyCardModel";
// import { AiFillDelete } from "react-icons/ai";
// import DeletePostView from "./DeletePostView";
// import HidePostView from "./HidePostView";
// import BlockedUserPostView from "./BlockedUserPostView";
// import LinkPreview, {
//   checkIsLargeImage,
//   convertTextToHTML,
//   getImageOrientation,
// } from "../../../utils/others";
// import { postedAtTime } from "../../../utils/dates";
// import { IoMdClose } from "react-icons/io";
// import {
//   Button,
//   Input,
//   Loader,
//   NumberInput,
//   Progress,
//   Slider,
// } from "@mantine/core";
// import { notifications } from "@mantine/notifications";
// import VideoPlayer from "../Media/VideoPlayer";
// import { formatMessageToHTMLForComment } from "../../../utils/media";

// // Interfaces
// interface User {
//   id: string;
//   username: string;
//   image: string;
//   role: string;
//   createdAt: Date;
// }

// interface Media {
//   id: string;
//   url: string;
//   mediaType: MediaType;
//   postId: string;
// }

// export interface Comment {
//   id: string;
//   userId: string;
//   postedBy: User;
//   comment: string;
//   replies: Reply[];
//   postId: string;
//   post: PostProp;
// }

// interface PostProp {
//   id: string;
//   message: string;
//   postedBy: User;
//   media: Media[];
//   comments: Comment[];
//   share: Share[];
//   claps: Clap[];
//   clovers: Clover[];
//   bolts: Bolt[];
//   hasClapped: boolean;
//   hasClover: boolean;
//   hasBolt: boolean;
//   total_reactions: number;
//   hasCard: boolean;
//   postType: "Public Post" | "Tribe Post" | "Shout Post";
//   tribeId: string;
//   isOwner: boolean;
//   tribeName: string;
// }

// enum MediaType {
//   image = "image",
//   video = "video",
// }

// interface Reply {
//   id: string;
//   userId: string;
//   postedBy: User;
//   reply: string;
//   commentId: string;
//   comment: Comment; // assuming you have a Comment interface
// }

// // Interface for Share model
// interface Share {
//   id: string;
//   userId: string;
//   postedBy: User;
//   postId: string;
//   post: PostProp;
// }

// // Interface for Clap model
// interface Clap {
//   id: string;
//   userId: string;
//   postedBy: User;
//   postId: string;
//   post: PostProp;
// }

// // Interface for Clover model
// interface Clover {
//   id: string;
//   userId: string;
//   postedBy: User;
//   postId: string;
//   post: PostProp;
// }

// // Interface for Bolt model
// interface Bolt {
//   id: string;
//   userId: string;
//   postedBy: User;
//   postId: string;
//   post: PostProp;
// }

// // User Profile Component
// const UserProfileBar: React.FC<{
//   user: any;
//   dowloadImageCred: any;
//   isOwner: boolean;
//   tribeName: string;
//   postType: string;
//   handleDeletePost: () => void;
//   handleHidePost: () => void;
//   handleBlockUser: () => void;
// }> = ({
//   user,
//   dowloadImageCred,
//   isOwner,
//   handleDeletePost,
//   handleHidePost,
//   handleBlockUser,
//   tribeName,
//   postType,
// }) => {
//   const [profileImage, setProfileImage] = useState();

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

//     setProfileImage(downloadedImages?.profileImage);
//   }

//   useEffect(() => {
//     downloadUserImages(
//       user,
//       dowloadImageCred?.authorizationToken,
//       dowloadImageCred?.downloadUrl
//     );
//   }, [user?.id]);

//   const router = useRouter();

//   const { data: session } = useSession();

//   const handleMenu = (selectedValue) => {
//     switch (selectedValue) {
//       case "Delete Post":
//         handleDeletePost();
//         break;
//       case "Hide Post":
//         handleHidePost();
//         break;
//       case "Block User":
//         handleBlockUser();
//         break;
//     }
//   };

//   console.log({
//     user,
//   });

//   return (
//     <div className="w-full flex justify-between items-center">
//       <div
//         className="flex justify-start items-center gap-5 cursor-pointer"
//         onClick={() =>
//           user?.role === "Athlete"
//             ? router.push(`/fanzone/tribe/profile/athlete/${user.username}`)
//             : router.push(`/fanzone/profile/user/${user?.username}`)
//         }
//       >
//         <div
//           className="w-[45px] h-[45px] p-[1px] bg-white rounded-full overflow-hidden flex justify-center items-baseline"
//           title={
//             user?.isMvpzAccount
//               ? `${user?.username} ${tribeName}`
//               : user?.username
//           }
//         >
//           {profileImage ? (
//             <Image
//               src={profileImage}
//               alt="user profile"
//               width={500}
//               height={500}
//               className={"relative w-full h-full rounded-full object-cover"}
//             />
//           ) : (
//             <article className="w-full h-full bg-primary rounded-full flex justify-center items-center text-[12px]">
//               {user?.username?.substring(0, 2)}
//             </article>
//           )}
//         </div>
//         <div className="flex flex-col items-start justify-center ">
//           <article className="text-xs font-semibold text leading-1 hover:underline flex justify-start items-center gap-1">
//             {user?.isMvpzAccount
//               ? `${user?.username} ${tribeName}`
//               : user?.username}
//             {user?.isMvpzAccount && <MdVerifiedUser />}
//           </article>
//           <article className="text-[10px] opacity-50 font-normal">
//             {postType}
//           </article>
//         </div>
//       </div>
//       <div className="flex justify-center items-center gap-2">
//         {/* <article className="text-[8px] opacity-50 font-normal">
//             {postedAtTime(user?.createdAt)}
//           </article> */}
//         {session?.user?.id && (
//           <MenuOptions
//             onSelect={handleMenu}
//             options={
//               isOwner
//                 ? [
//                     {
//                       label: "Delete Post",
//                       icon: <AiFillDelete />,
//                       iconPosition: "left",
//                     },
//                   ]
//                 : [
//                     {
//                       label: "Hide Post",
//                       icon: <PiXLight />,
//                       iconPosition: "left",
//                     },

//                     {
//                       label: "Block User",
//                       icon: <PiUserMinusLight />,
//                       iconPosition: "left",
//                     },
//                   ]
//             }
//             position="left"
//           >
//             <MdMoreVert size={18} />
//           </MenuOptions>
//         )}
//       </div>
//     </div>
//   );
// };

// // Media Components
// const MediaImageCard: React.FC<{ url: string; slideMode: boolean }> = ({
//   url,
//   slideMode,
// }) => {
//   const [imgOrientation, setImageOrientations] = useState<
//     "portrait" | "landscape" | "square" | null
//   >(null);

//   useEffect(() => {
//     async function getOrt() {
//       try {
//         const orientation = await getImageOrientation(url);

//         console.log({ orientation });

//         setImageOrientations(orientation);
//       } catch (error) {
//         console.error(error.message);
//       }
//     }

//     getOrt();
//   }, []);

//   return (
//     <div className="flex justify-center items-center w-full h-full">
//       <Image
//         src={url}
//         alt="Post 01"
//         width={500}
//         height={500}
//         className={`relative   ${
//           slideMode
//             ? imgOrientation == "landscape" || imgOrientation == "square"
//               ? "object-cover w-full h-full"
//               : "object-contain w-auto h-full"
//             : "object-fit w-full h-auto"
//         }  z-0`}
//       />
//     </div>
//   );
// };

// const MediaVideoCard: React.FC<{
//   url: string;
//   showControls: boolean;
// }> = ({ url, showControls }) => {
//   return (
//     <div className="w-full relative h-full  rounded-md bg-ternary">
//       <div className="relative w-full h-full">
//         <video src={url} className="w-full h-full object-cover " />
//         <div className="absolute top-1/2 -translate-y-1/2 left-1/2  bg-black -translate-x-1/2 w-10 h-10 rounded-full object-cover flex justify-center items-center">
//           <FaPlay />
//         </div>
//       </div>
//     </div>
//   );
// };

// const PostMedia: React.FC<{
//   media: Media[];
//   showController: boolean;
//   handleOpenPreview: any;
// }> = ({ media, showController, handleOpenPreview }) => {
//   if (media.length === 0) return null;
//   const [slideIndex, setSlideIndex] = useState(0);

//   return (
//     <div className="relative w-full md:h-[450px] h-[300px] rounded-xl overflow-hidden shadow-xl brightness-90">
//       <Swiper
//         pagination={{
//           dynamicBullets: true,
//         }}
//         navigation={{
//           nextEl: ".custom-next",
//           prevEl: ".custom-prev",
//         }}
//         modules={[Pagination, Navigation]}
//         onSlideChange={(slide) => setSlideIndex(slide.activeIndex)}
//         className="mySwiper w-full md:h-[450px] h-[300px]"
//       >
//         {media.map((assest, id) => {
//           return (
//             <>
//               <SwiperSlide
//                 key={id + assest.id}
//                 className="relative w-full  h-full flex justify-center items-center bg-secondary"
//                 onClick={() =>
//                   handleOpenPreview({
//                     mediaType: assest.mediaType,
//                     slideNo: slideIndex,
//                   })
//                 }
//               >
//                 {assest.mediaType === "image" ? (
//                   <MediaImageCard url={assest.url} slideMode={true} />
//                 ) : (
//                   <MediaVideoCard
//                     url={assest.url}
//                     showControls={showController}
//                   />
//                 )}
//                 {/* <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.58)] z-20"></div> */}
//               </SwiperSlide>
//             </>
//           );
//         })}
//       </Swiper>

//       {media.length > 1 && (
//         <div className="absolute top-2 right-2 py-1 px-2 bg-secondary rounded-full z-10">
//           <span className="font-mono text-xs">
//             {slideIndex + 1}/{media.length}
//           </span>
//         </div>
//       )}

//       {/* Custom navigation buttons */}
//     {media?.length > 1 && <>
//      <button
//         className={`custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 bg-secondary p-2 rounded-full shadow-lg z-10 transition-opacity ${
//           slideIndex === 0 ? "opacity-50 pointer-events-none" : "opacity-100"
//         }`}
//         aria-label="Previous"
//       >
//         ❮
//       </button>
//       <button
//         className={`custom-next absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary p-2 rounded-full shadow-lg z-10 transition-opacity ${
//           slideIndex === media.length - 1
//             ? "opacity-50 pointer-events-none"
//             : "opacity-100"
//         }`}
//         aria-label="Next"
//       >
//         ❯
//       </button>
//      </>}
//     </div>
//   );
// };

// // Post Message
// const PostMessage: React.FC<{ message: string; color: string }> = ({
//   message,
//   color,
// }) => {
//   const [htmlContent, setHtmlContent] = useState<string>("");
//   const [linkToPreview, setLinkPreview] = useState<string>("");

//   useEffect(() => {
//     if (message) {
//       const fetchHTML = async () => {
//         const html = await convertTextToHTML(message);
//         setHtmlContent(html.message);
//         setLinkPreview(html.link);
//       };
//       fetchHTML();
//     }
//   }, [message]);
//   return (
//     <>
//       <div
//         className="md:text-sm text-xs font-inter pb-2 md:font-bold font-medium"
//         dangerouslySetInnerHTML={{
//           __html:
//             message?.length > 400
//               ? `${message?.substring(0, 400)}...`
//               : message,
//         }}
//       />
//       <span
//         className={`md:text-sm text-xs  font-semibold cursor-pointer pt-2 postMessgae`}
//         style={{
//           color,
//         }}
//       >
//         Read More
//       </span>
//       {linkToPreview && <LinkPreview url={linkToPreview} />}
//     </>
//   );
// };

// // Post Controller
// interface PostControllerProps {
//   post: any;
//   viewMode: boolean;
//   postId: string;
//   commentCount: number;
//   shareCount: number;
//   clapCount: number;
//   cloverCount: number;
//   boltCount: number;
//   hasClapped: boolean;
//   hasClover: boolean;
//   hasBolt: boolean;
//   handleClickComment: () => void;
//   handleFetchPost: () => void;
//   openPostModel: boolean;
//   setOpenShareModel: (state: boolean) => void;
//   openShareModel: boolean;
//   isTribe: boolean;
//   tribeId: string;
//   postType: "Public Post" | "Tribe Post" | "Shout Post";
//   hasCard: boolean;
//   handleOpenBuyCard: () => void;
// }

// const PostController: React.FC<PostControllerProps> = (stats) => {
//   const { data: session } = useSession();
//   const [tipValue, setTipValue] = useState(0.5);
//   const [openTipModel, setOpenTipModel] = useState(false);
//   const [customTip, setCustomTip] = useState(false);
//   const [processLoading, setProcessLoading] = useState(false);
//   const [tipLimitExcced, setTipLimitExcced] = useState(false);
//   const [tipLimitMsg, setTipLimitMsg] = useState("");
//   const router = useRouter();

//   const handleClap = async () => {
//     let response;
//     switch (stats.postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/clap/${stats.postId}`,
//           method: "POST",
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/clap/${stats.postId}`,
//           method: "POST",
//           body: {
//             tribeId: stats?.tribeId,
//           },
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/clap/${stats.postId}`,
//           method: "POST",
//           body: {
//             tribeId: stats?.tribeId,
//           },
//         });
//         break;
//     }
//     if (response) {
//       stats.handleFetchPost();
//     }
//   };

//   const handleClover = async () => {
//     let response;
//     switch (stats.postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/clover/${stats.postId}`,
//           method: "POST",
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/clover/${stats.postId}`,
//           method: "POST",
//           body: {
//             tribeId: stats?.tribeId,
//           },
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/clover/${stats.postId}`,
//           method: "POST",
//           body: {
//             tribeId: stats?.tribeId,
//           },
//         });
//     }
//     if (response) {
//       stats.handleFetchPost();
//     }
//   };

//   const handleBolt = async () => {
//     let response;
//     switch (stats.postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/bolt/${stats.postId}`,
//           method: "POST",
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/bolt/${stats.postId}`,
//           method: "POST",
//           body: {
//             tribeId: stats?.tribeId,
//           },
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/bolt/${stats.postId}`,
//           method: "POST",
//           body: {
//             tribeId: stats?.tribeId,
//           },
//         });
//     }
//     if (response) {
//       stats.handleFetchPost();
//     }
//   };

//   const handleSharePost = () => {
//     stats?.setOpenShareModel(true);
//   };

//   const handleTip = async (amount) => {
//     if (
//       amount > stats?.post?.tipPriceRange?.maxTip ||
//       amount < stats?.post?.tipPriceRange?.minTip
//     ) {
//       return notifications.show({
//         message: `Tips must be between $${stats?.post?.tipPriceRange?.minTip} and $${stats?.post?.tipPriceRange?.maxTip}.`,
//       });
//     }

//     setProcessLoading(true);

//     let response;

//     switch (stats.postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/tip/publicPost/initiate`,
//           method: "POST",
//           body: {
//             fromUserId: session?.user?.id,
//             toUserId: stats?.post?.postedBy?.id,
//             tipAmount: amount,
//             postId: stats?.post?.id,
//           },
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/tip/tribePost/initiate`,
//           method: "POST",
//           body: {
//             fromUserId: session?.user?.id,
//             toUserId: stats?.post?.postedBy?.id,
//             tipAmount: amount,
//             postId: stats?.post?.id,
//             callbackURL: window.location.href,
//           },
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/tip/tribeShouts/initiate`,
//           method: "POST",
//           body: {
//             fromUserId: session?.user?.id,
//             toUserId: stats?.post?.postedBy?.id,
//             tipAmount: amount,
//             postId: stats?.post?.id,
//             callbackURL: window.location.href,
//           },
//         });
//         break;
//     }

//     setProcessLoading(false);

//     if (!response?.success) {
//       if (response?.limitExceed) {
//         setTipLimitMsg(response?.error);
//         setTipLimitExcced(true);
//       }
//       return;
//     }

//     router.push(response?.data?.checkoutUrl);
//   };

//   return (
//     <>
//       <div className="relative flex justify-between items-center">
//         {!session?.user?.id && !stats?.viewMode ? null : (
//           <div className="flex justify-start items-center md:gap-x-8 gap-x-6  w-full">
//             <div
//               className={`${
//                 stats?.openPostModel ? "xl:hidden flex" : "flex"
//               } justify-start items-center gap-1  cursor-pointer hover:scale-105`}
//               onClick={stats?.handleClickComment}
//             >
//               <IoChatbubbles
//                 size={stats?.openPostModel ? 20 : 25}
//                 className={`text-[#96B5F6]`}
//               />
//               <span className="text-[16px] font-bold font-nato">
//                 {stats.commentCount || 0}
//               </span>
//             </div>

//             {/* clap */}
//             <Tooltip text="Clap" position="bottomRight">
//               <div
//                 className={`flex justify-start items-center gap-1  cursor-pointer hover:scale-105`}
//                 onClick={handleClap}
//               >
//                 <div className="flex justify-start items-center space-x-1">
//                   {stats?.hasClapped ? (
//                     <FaHandsClapping
//                       size={stats?.openPostModel ? 20 : 25}
//                       className={`text-yellow-500 ${
//                         stats.openPostModel ? "hover:text-yellow-500" : null
//                       } `}
//                     />
//                   ) : (
//                     <PiHandsClappingFill
//                       size={stats?.openPostModel ? 20 : 25}
//                       className={`text-yellow-500 ${
//                         stats.openPostModel ? "hover:text-yellow-500" : null
//                       } `}
//                     />
//                   )}
//                   {!stats?.viewMode ? (
//                     <span className="text-[16px] font-bold font-nato">
//                       {stats.clapCount || 0}
//                     </span>
//                   ) : null}
//                 </div>
//               </div>
//             </Tooltip>
//             {/* clap */}
//             {/* clover */}
//             <Tooltip text="Luck">
//               <div
//                 className={`flex justify-start items-center gap-1  cursor-pointer hover:scale-105`}
//                 onClick={handleClover}
//               >
//                 <div className="flex justify-start items-center space-x-1">
//                   {stats?.hasClover ? (
//                     <PiCloverFill
//                       size={stats?.openPostModel ? 20 : 25}
//                       className={` text-green-500  ${
//                         stats.openPostModel ? "hover:text-green-500" : null
//                       }`}
//                     />
//                   ) : (
//                     <PiCloverLight
//                       size={stats?.openPostModel ? 20 : 25}
//                       className={` text-green-500  ${
//                         stats.openPostModel ? "hover:text-green-500" : null
//                       }`}
//                     />
//                   )}
//                   {!stats?.viewMode ? (
//                     <span className="text-[16px] font-bold font-nato">
//                       {stats.cloverCount || 0}
//                     </span>
//                   ) : null}
//                 </div>
//               </div>
//             </Tooltip>
//             {/* clover */}
//             {/* Bolt */}
//             <Tooltip text="Fire">
//               <div
//                 className={`flex justify-start items-center gap-1  cursor-pointer hover:scale-105`}
//                 onClick={handleBolt}
//               >
//                 <div className="flex justify-start items-center space-x-1">
//                   {stats?.hasBolt ? (
//                     <FaFire
//                       size={stats?.openPostModel ? 20 : 25}
//                       className={`text-orange-500 ${
//                         stats.openPostModel ? "hover:text-orange-500" : ""
//                       }`}
//                     />
//                   ) : (
//                     <FaFireAlt
//                       size={stats?.openPostModel ? 20 : 20}
//                       className={`text-orange-500 ${
//                         stats.openPostModel ? "hover:text-orange-500" : ""
//                       }`}
//                     />
//                   )}
//                   {!stats?.viewMode ? (
//                     <span className="text-[16px] font-bold font-nato">
//                       {stats.boltCount || 0}
//                     </span>
//                   ) : null}
//                 </div>
//               </div>
//             </Tooltip>
//             {/* Bolt */}
//             {/* tip */}

//             <div className={`relative flex justify-start items-center gap-2  `}>
//               <div
//                 className="relative flex justify-start items-center space-x-1  z-0 hover:scale-105"
//                 onClick={() => {
//                   setOpenTipModel(!openTipModel);
//                   setCustomTip(false);
//                 }}
//               >
//                 {false ? (
//                   <HiCurrencyDollar
//                     size={stats?.openPostModel ? 20 : 25}
//                     className={`${true ? "text-[#AEE269]" : null}  ${
//                       stats?.openPostModel ? " hover:text-[#AEE269]" : null
//                     }`}
//                   />
//                 ) : (
//                   <HiOutlineCurrencyDollar
//                     size={stats?.openPostModel ? 20 : 25}
//                     className={`${true ? "text-[#AEE269]" : null}  ${
//                       stats?.openPostModel ? " hover:text-[#AEE269]" : null
//                     }`}
//                   />
//                 )}
//                 {/* {!stats?.viewMode ? (
//                   <span className="text-[16px] font-bold font-nato">{0}</span>
//                 ) : null} */}
//               </div>
//               {openTipModel && (
//                 <div className="absolute bottom-[110%] md:left-1/2 md:-translate-x-1/2  md:-right-[50px] -right-[25px]  md:w-[500px] w-[300px]  p-5 bg-ternary rounded-md">
//                   {/* close  */}
//                   <div
//                     className="absolute top-5 right-5"
//                     onClick={() => setOpenTipModel(false)}
//                   >
//                     <IoMdClose size={20} />
//                   </div>
//                   <article className="mb-2">
//                     Tip {stats?.post?.postedBy?.username}
//                   </article>
//                   <article className="text-[10px] opacity-50 mb-8">
//                     Support {stats?.post?.postedBy?.username} with a small tip
//                     and message of encouragement!
//                   </article>
//                   <>
//                     {tipLimitExcced ? (
//                       <div className="w-full">
//                         <article className="text-[10px] text-red-500 mb-2">
//                           {tipLimitMsg}
//                         </article>
//                         <div
//                           className="inline-flex py-1 px-3 text-[10px] bg-red-500 text-white rounded-md cursor-pointer"
//                           onClick={() => setOpenTipModel(false)}
//                         >
//                           Close
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         {processLoading ? (
//                           <div className="w-full pb-5 flex flex-col justify-center items-start">
//                             <article className="text-[10px] mb-2">
//                               Hang tight, we're getting things ready for you!
//                             </article>
//                             <Loader variant="dots" color="white" size={20} />
//                           </div>
//                         ) : (
//                           <>
//                             {!customTip ? (
//                               <>
//                                 {/* <div className="flex flex-wrap justify-center items-center gap-2 ">
//                                   <div
//                                     className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                     onClick={() => handleTip(0.5)}
//                                   >
//                                     Tip $.50
//                                   </div>
//                                   <div
//                                     className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                     onClick={() => handleTip(1)}
//                                   >
//                                     Tip $1
//                                   </div>
//                                   <div
//                                     className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                     onClick={() => handleTip(5)}
//                                   >
//                                     Tip $5
//                                   </div>
//                                   <div
//                                     className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                     onClick={() => handleTip(10)}
//                                   >
//                                     Tip $10
//                                   </div>
//                                   <div
//                                     className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                     onClick={() => setCustomTip(true)}
//                                   >
//                                     Custom Tip
//                                   </div>
//                                 </div> */}
//                                 <div className="grid md:grid-cols-5 grid-cols-3 md:gap-y-0 gap-5">
//                                   <div
//                                     className="flex flex-col justify-center items-center gap-1"
//                                     onClick={() => handleTip(1)}
//                                   >
//                                     <Image
//                                       src={`/images/tips/tip2.png`}
//                                       alt="tip1"
//                                       width={500}
//                                       height={500}
//                                       className="relative w-8 h-8 object-cover"
//                                     />
//                                     <article className="text-xs"> $1</article>
//                                   </div>
//                                   <div
//                                     className="flex flex-col justify-center items-center gap-1"
//                                     onClick={() => handleTip(2)}
//                                   >
//                                     <Image
//                                       src={`/images/tips/tip1.png`}
//                                       alt="tip1"
//                                       width={500}
//                                       height={500}
//                                       className="relative w-8 h-8 object-cover"
//                                     />
//                                     <article className="text-xs"> $2</article>
//                                   </div>
//                                   <div
//                                     className="flex flex-col justify-center items-center gap-1"
//                                     onClick={() => handleTip(5)}
//                                   >
//                                     <Image
//                                       src={`/images/tips/tip3.png`}
//                                       alt="tip1"
//                                       width={500}
//                                       height={500}
//                                       className="relative w-8 h-8 object-cover"
//                                     />
//                                     <article className="text-xs"> $5</article>
//                                   </div>
//                                   <div
//                                     className="flex flex-col justify-center items-center gap-1"
//                                     onClick={() => handleTip(10)}
//                                   >
//                                     <Image
//                                       src={`/images/tips/tip4.png`}
//                                       alt="tip1"
//                                       width={500}
//                                       height={500}
//                                       className="relative w-8 h-8 object-cover"
//                                     />
//                                     <article className="text-xs"> $10</article>
//                                   </div>
//                                   <div
//                                     className="flex flex-col justify-center items-center gap-1"
//                                     onClick={() => setCustomTip(true)}
//                                   >
//                                     <Image
//                                       src={`/images/tips/tip5.png`}
//                                       alt="tip1"
//                                       width={500}
//                                       height={500}
//                                       className="relative w-8 h-8 object-cover"
//                                     />
//                                     <article className="text-xs text-center">
//                                       {" "}
//                                       Custom Tip
//                                     </article>
//                                   </div>
//                                 </div>
//                               </>
//                             ) : (
//                               <div className="relative w-full md:pb-18 pb-14">
//                                 <div className="relative w-full rounded-md border border-white border-opacity-40">
//                                   <input
//                                     type="number"
//                                     step={0.5}
//                                     min={stats?.post?.tipPriceRange?.minTip}
//                                     max={stats?.post?.tipPriceRange?.maxTip}
//                                     placeholder="Enter Tip Amount"
//                                     value={tipValue}
//                                     onChange={(e) =>
//                                       setTipValue(Number(e.target.value))
//                                     }
//                                     className="relative w-full p-2 rounded-md pl-7"
//                                   />
//                                   <article className="absolute top-1/2 -translate-y-1/2 left-2 text-sm">
//                                     $
//                                   </article>
//                                 </div>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}
//                   </>
//                   {/* Tip Button */}
//                   {customTip && !processLoading && (
//                     <div className="absolute bottom-5 -right-2 w-[150px]">
//                       <Button
//                         onClick={() => handleTip(tipValue)}
//                         style={{
//                           fontSize: "10px",
//                         }}
//                       >
//                         Tip ${tipValue}
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* tip */}
//           </div>
//         )}
//         <Tooltip text="Share" position="left">
//           <div className="flex justify-start items-center space-x-5 hover:scale-105">
//             <div
//               className={`flex justify-start items-center gap-2 ${
//                 stats.viewMode ? "cursor-pointer" : "cursor-default"
//               }`}
//               onClick={handleSharePost}
//             >
//               <FaShare size={18} />
//             </div>
//           </div>
//         </Tooltip>
//       </div>
//     </>
//   );
// };

// const PostReactions = ({
//   total_reaction,
//   handleOpenReactionsModel,
//   total_comments,
// }) => {
//   return (
//     <>
//       <div className="w-full h-[45px] bg-secondary absolute left-0 -top-[45px] flex justify-between items-center px-4 ">
//         <div
//           className="flex justify-start items-center gap-2"
//           onClick={handleOpenReactionsModel}
//         >
//           <div className="flex justify-start items-center gap-0">
//             <div className="w-[25px] h-[25px] bg-ternary rounded-full flex justify-center items-center">
//               <FaHandsClapping className="text-[14px] text-yellow-500" />
//             </div>

//             <div className="w-[25px] h-[25px] bg-ternary rounded-full flex justify-center items-center -ml-2">
//               <PiCloverFill className="text-[14px] text-green-500" />
//             </div>

//             <div className="w-[25px] h-[25px] bg-ternary rounded-full flex justify-center items-center -ml-2">
//               <MdOfflineBolt className="text-[14px] text-orange-500" />
//             </div>

//             <div className="w-[25px] h-[25px] bg-ternary rounded-full flex justify-center items-center -ml-2">
//               <HiCurrencyDollar className="text-[14px] text-[#AEE269]" />
//             </div>
//           </div>
//           <article className="text-[10px] hover:underline cursor-pointer">
//             {total_reaction} reactions
//           </article>
//         </div>
//         <article className="text-[9px] cursor-pointer ">
//           {total_comments} Comments
//         </article>
//       </div>
//     </>
//   );
// };

// // Main Post Component
// const Post: React.FC<{
//   post: any;
//   theme: string;
//   dowloadImageCred: any;
//   isTribe?: boolean;
//   tribeId?: string;
//   showController?: boolean;
//   disableModel?: boolean;
//   postType: "Public Post" | "Tribe Post" | "Shout Post";
// }> = ({
//   post,
//   theme,
//   dowloadImageCred,
//   isTribe = false,
//   tribeId = null,
//   showController = true,
//   disableModel = false,
//   postType,
// }) => {
//   const [showView, setShowView] = useState(true);
//   const [openPostModel, setOpenPostModel] = useState<boolean>(false);
//   const [openReactionsModel, setOpenReactionsModel] = useState<boolean>(false);
//   const [postContent, setPostContent] = useState(post);
//   const [openShareModel, setOpenShareModel] = useState(false);
//   const [openBuyCard, setOpenBuyCard] = useState(false);
//   const { data: session } = useSession();
//   const [pathname, setPathname] = useState<string>("");
//   const [updateCommentLength, setUpdateCommentLength] = useState(null);
//   const [postActionType, setPostActionType] = useState<
//     "Delete Post" | "Hide Post" | "Block User" | null
//   >(null);

//   const [imagePreview, setImagePreview] = useState(false);
//   const [imagePreviewURL, setImagePreviewURL] = useState({
//     url: "",
//     slideNo: 0,
//   });

//   function handleOpenPreview(previewURL) {
//     setImagePreview(true);
//     setImagePreviewURL(previewURL);
//   }

//   function handleClosePreview() {
//     setImagePreview(false);
//     setImagePreviewURL(null);
//   }

//   const handleClosePostView = () => {
//     setShowView(false);
//   };

//   function handleOpenBuyCard() {
//     setOpenBuyCard(true);
//   }

//   function handleOpenPostDetails() {
//     setOpenPostModel(true);
//   }

//   function handleOpenComment() {
//     switch (postType) {
//       case "Public Post":
//       case "Tribe Post":
//         setOpenPostModel(true);
//         break;
//       case "Shout Post":
//         if (postContent?.hasCard || session?.user?.role === "Athlete") {
//           setOpenPostModel(true);
//         } else {
//           return handleOpenBuyCard();
//         }
//         break;
//     }
//   }

//   function handleOpenReactionsModel() {
//     setOpenReactionsModel(true);
//   }

//   function handleOpenShareModel() {
//     setOpenShareModel(true);
//   }

//   const handleFetchPost = async () => {
//     let response: any = {};
//     switch (postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/${post?.id}`,
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/${post?.id}`,
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/${post?.id}`,
//         });
//     }

//     if (response) {
//       setPostContent(response?.post);
//     }
//   };

//   function handleSetUrl() {
//     switch (postType) {
//       case "Public Post":
//         setPathname(`/fanzone/post/public_post?postId=${postContent?.id}`);
//         break;
//       case "Tribe Post":
//         setPathname(
//           `/fanzone/post/tribe_post/?postId=${postContent?.id}&tribeId=${postContent?.tribeId}`
//         );
//         break;
//       case "Shout Post":
//         setPathname(
//           `/fanzone/post/shout_post?postId=${postContent?.id}&tribeId=${postContent?.tribeId}`
//         );
//         break;
//     }
//   }

//   useEffect(() => {
//     handleSetUrl();
//   }, [postContent]);

//   const handleDeletePost = async () => {
//     let response;
//     switch (postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/delete/${post?.id}`,
//           method: "DELETE",
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/delete/${post?.id}`,
//           method: "DELETE",
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/delete/${post?.id}`,
//           method: "DELETE",
//         });
//         break;
//     }

//     if (response) {
//       setPostActionType("Delete Post");
//       setOpenPostModel(false);
//     }
//   };

//   const handleHidePost = async () => {
//     let response;
//     switch (postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/hide/${post?.id}`,
//           method: "DELETE",
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/hide/${post?.id}`,
//           method: "DELETE",
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/hide/${post?.id}`,
//           method: "DELETE",
//         });
//         break;
//     }

//     if (response) {
//       setPostActionType("Hide Post");
//       setOpenPostModel(false);
//     }
//   };

//   const handleBlockUser = async () => {
//     let response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/block/${post?.postedBy?.id}`,
//       method: "POST",
//     });

//     if (response) {
//       setPostActionType("Block User");
//       setOpenPostModel(false);
//     }
//   };

//   const ViewPostActionView = () => {
//     switch (postActionType) {
//       case "Delete Post":
//         return <DeletePostView handleClose={handleClosePostView} />;
//       case "Hide Post":
//         return <HidePostView handleClose={handleClosePostView} />;
//       case "Block User":
//         return (
//           <BlockedUserPostView
//             username={post?.postedBy?.username}
//             handleClose={handleClosePostView}
//           />
//         );
//     }
//   };

//   return showView ? (
//     postActionType ? (
//       <ViewPostActionView />
//     ) : (
//       <>
//         <div className="w-full h-auto">
//           <div className="mb-5">
//             <UserProfileBar
//               handleDeletePost={handleDeletePost}
//               handleHidePost={handleHidePost}
//               handleBlockUser={handleBlockUser}
//               isOwner={post?.postedBy?.id === session?.user?.id}
//               dowloadImageCred={dowloadImageCred}
//               user={{ ...post?.postedBy, createdAt: post?.createdAt }}
//               tribeName={post?.tribeName}
//               postType={post?.postType}
//             />
//           </div>
//           {postContent?.media?.length > 0 && (
//             <div className="relative w-full pb-10  cursor-pointer">
//               <PostMedia
//                 media={postContent?.media}
//                 showController={openPostModel}
//                 handleOpenPreview={handleOpenPreview}
//               />
//             </div>
//           )}
//           {postContent?.message && (
//             <div
//               onClick={handleOpenPostDetails}
//               className="relative w-full pb-5 space-y-10 cursor-pointer"
//             >
//               <PostMessage message={postContent?.message} color={theme} />
//             </div>
//           )}
//           <article className="text-[8px] opacity-50 font-normal mb-5">
//             {postedAtTime(post?.createdAt)}
//           </article>
//           {showController && (
//             <div className="relative w-full ">
//               <PostController
//                 post={post}
//                 viewMode={false}
//                 hasCard={postContent?.hasCard}
//                 postId={postContent?.id}
//                 commentCount={
//                   updateCommentLength?.length || postContent?.comments?.length
//                 }
//                 shareCount={postContent?.share?.length}
//                 boltCount={postContent?.bolts?.length}
//                 clapCount={postContent?.claps?.length}
//                 cloverCount={postContent?.clovers?.length}
//                 hasClapped={postContent?.hasClapped}
//                 hasClover={postContent?.hasClover}
//                 hasBolt={postContent?.hasBolt}
//                 handleClickComment={handleOpenComment}
//                 openPostModel={openPostModel}
//                 handleFetchPost={handleFetchPost}
//                 setOpenShareModel={setOpenShareModel}
//                 openShareModel={openShareModel}
//                 isTribe={isTribe}
//                 tribeId={tribeId}
//                 postType={postType}
//                 handleOpenBuyCard={handleOpenBuyCard}
//               />
//             </div>
//           )}

//           <div className="py-8">
//             <div className="w-full h-[0.5px] bg-white opacity-[0.4]"></div>
//           </div>
//         </div>

//         {openPostModel && !disableModel && (
//           <ModelVr_O
//             open={openPostModel}
//             setHandleOpen={setOpenPostModel}
//             extraClass=""
//           >
//             <div className={` z-10`}>
//               <PostModel
//                 setUpdateCommentLength={setUpdateCommentLength}
//                 post={postContent}
//                 handleFetchPost={handleFetchPost}
//                 dowloadImageCred={dowloadImageCred}
//                 openReactions={handleOpenReactionsModel}
//                 setOpenShareModel={setOpenShareModel}
//                 openShareModel={openShareModel}
//                 isTribe={isTribe}
//                 tribeId={tribeId}
//                 postType={postType}
//                 handleOpenBuyCard={handleOpenBuyCard}
//                 sharedPathname={pathname}
//                 handleDeletePost={handleDeletePost}
//                 handleHidePost={handleHidePost}
//                 handleBlockUser={handleBlockUser}
//                 handleOpenPreview={handleOpenPreview}
//               />
//             </div>
//           </ModelVr_O>
//         )}

//         {openReactionsModel && (
//           <ModelVr_O
//             open={openReactionsModel}
//             setHandleOpen={setOpenReactionsModel}
//           >
//             <ReactionViewer postId={post?.id} postType={postType} />
//           </ModelVr_O>
//         )}

//         {openShareModel && (
//           <ModelVr_O
//             open={openShareModel}
//             setHandleOpen={setOpenShareModel}
//             extraClass="!z-50"
//           >
//             <SharePost pathname={pathname} />
//           </ModelVr_O>
//         )}

//         {openBuyCard && (
//           <ModelVr_O
//             open={openBuyCard}
//             setHandleOpen={setOpenBuyCard}
//             extraClass="!z-[1000]"
//           >
//             <BuyCardModel username={post?.postedBy?.username} />
//           </ModelVr_O>
//         )}

//         {imagePreview && (
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md "
//             style={{
//               zIndex: 1000,
//             }}
//           >
//             <ImagePreview
//               mediaCon={postContent?.media}
//               media={imagePreviewURL}
//               handleClose={handleClosePreview}
//             />
//           </div>
//         )}
//       </>
//     )
//   ) : null;
// };

// // Model for detailed post
// const PostModel: React.FC<{
//   post: PostProp;
//   handleFetchPost: () => void;
//   dowloadImageCred: any;
//   openReactions?: () => void;
//   openShareModel: boolean;
//   setOpenShareModel?: (state: boolean) => void;
//   isTribe: boolean;
//   tribeId: string;
//   postType: "Public Post" | "Tribe Post" | "Shout Post";
//   handleOpenBuyCard: () => void;
//   sharedPathname: string;
//   handleDeletePost: () => void;
//   handleHidePost: () => void;
//   handleBlockUser: () => void;
//   handleOpenPreview: any;
//   setUpdateCommentLength: any;
// }> = ({
//   post,
//   handleFetchPost,
//   dowloadImageCred,
//   openReactions,
//   setOpenShareModel,
//   openShareModel,
//   isTribe,
//   tribeId,
//   postType,
//   handleOpenBuyCard,
//   sharedPathname,
//   handleDeletePost,
//   handleHidePost,
//   handleBlockUser,
//   handleOpenPreview,
//   setUpdateCommentLength,
// }) => {
//   const [openReplies, setOpenReplies] = useState<{
//     open: boolean;
//   }>({
//     open: false,
//   });

//   const [showComment, setShowComment] = useState(false);

//   // const [imagePreview, setImagePreview] = useState(false);
//   // const [imagePreviewURL, setImagePreviewURL] = useState({
//   //   url: "",
//   //   slideNo: "",
//   // });
//   const [openRepliesComment, setOpenRepliesComment] = useState(null);
//   const { data: session } = useSession();

//   const [isClap, setIsClap] = useState<boolean>(post.hasClapped);
//   const [isClover, setIsClover] = useState<boolean>(post.hasClover);
//   const [isBolt, setIsBolt] = useState<boolean>(post.hasBolt);
//   const [total_reactions, setTotalReactions] = useState<number>(
//     post?.total_reactions
//   );

//   const [isTip, setIsTip] = useState<boolean>(false);

//   function oepnReplies(comment: string) {
//     setOpenReplies({ open: true });
//     setOpenRepliesComment(comment);
//   }

//   function closeReplies() {
//     setOpenReplies({ open: false });
//     setOpenRepliesComment(null);
//   }

//   // function handleOpenPreview(previewURL) {
//   //   setImagePreview(true);
//   //   setImagePreviewURL(previewURL);
//   // }

//   // function handleClosePreview() {
//   //   setImagePreview(false);
//   //   setImagePreviewURL(null);
//   // }

//   function handleClickComment() {
//     switch (postType) {
//       case "Public Post":
//       case "Tribe Post":
//         setShowComment(!showComment);
//         break;
//       case "Shout Post":
//         if (post?.hasCard || session?.user?.role === "Athlete") {
//           setShowComment(!showComment);
//         } else {
//           handleOpenBuyCard();
//         }
//         break;
//     }
//   }

//   useEffect(() => {
//     setIsClap(post?.hasClapped);
//     setIsClover(post?.hasClover);
//     setIsBolt(post?.hasBolt);
//     setIsTip(false);
//     setTotalReactions(post?.total_reactions);
//   }, [post]);

//   const [comments, setComments] = useState([]);
//   const [commentloading, setCommentLoading] = useState<boolean>(false);
//   const [commentUploadingLoading, setCommentUploadingLoading] =
//     useState<boolean>(false);

//   useEffect(() => {
//     if (!comments) {
//       handleFetchPost();
//     }

//     const fetchComment = async () => {
//       let comments = await fetchPostComments();
//       setComments(comments);
//       setUpdateCommentLength(comments);
//     };

//     fetchComment();
//   }, []);

//   const fetchPostComments = async () => {
//     let response;
//     switch (postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/comment/fetch/${post?.id}`,
//           method: "GET",
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/comment/fetch/${post?.id}`,
//           method: "GET",
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/comment/fetch/${post?.id}`,
//           method: "GET",
//         });
//         break;
//     }
//     if (response) {
//       return response;
//     }
//   };

//   const handleFetchComments = async () => {
//     setCommentLoading(true);
//     setComments(await fetchPostComments());
//     setCommentLoading(false);
//   };

//   const handleAddComment = async (comment: string) => {
//     setCommentUploadingLoading(true);
//     console.log({ session });

//     let commentMessage = await formatMessageToHTMLForComment(comment);

//     let response;
//     switch (postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/comment/${post?.id}`,
//           method: "POST",
//           body: {
//             comment: commentMessage,
//           },
//         });

//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/comment/${post?.id}`,
//           method: "POST",
//           body: {
//             comment: commentMessage,
//           },
//         });
//         break;
//       case "Shout Post":
//         console.log({ session });

//         if (post?.hasCard || session?.user?.role === "Athlete") {
//           response = await callAPI({
//             endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/comment/${post?.id}`,
//             method: "POST",
//             body: {
//               comment: commentMessage,
//             },
//           });
//         } else {
//           handleOpenBuyCard();
//         }
//         break;
//     }
//     if (response) {
//       setComments(await fetchPostComments());
//       setCommentUploadingLoading(false);
//       return response;
//     }
//   };

//   const LeftContent = () => {
//     const [htmlContent, setHtmlContent] = useState<string>("");
//     const [linkToPreview, setLinkPreview] = useState<string>("");

//     useEffect(() => {
//       if (post?.message) {
//         const fetchHTML = async () => {
//           const html = await convertTextToHTML(post.message);
//           setHtmlContent(html.message);
//           setLinkPreview(html.link);
//         };
//         fetchHTML();
//       }
//     }, [post?.message]);
//     return (
//       <div className={`relative w-full xl:flex-[0.6] flex-1  h-[90vh]  z-0 `}>
//         <div className="w-full h-auto py-8 px-5 sticky top-0 bg-secondary z-10">
//           <UserProfileBar
//             isOwner={post?.isOwner}
//             dowloadImageCred={dowloadImageCred}
//             user={post?.postedBy}
//             tribeName={post?.tribeName}
//             postType={post?.postType}
//             handleDeletePost={handleDeletePost}
//             handleHidePost={handleHidePost}
//             handleBlockUser={handleBlockUser}
//           />
//         </div>
//         <div className="h-[550px] w-full md:px-10 px-5  overflow-y-auto pb-20">
//           <div
//             className="text-xs font-inter pb-10 font-bold"
//             dangerouslySetInnerHTML={{
//               __html: post?.message,
//             }}
//           />
//           {linkToPreview && <LinkPreview url={linkToPreview} />}
//           <div className="w-full h-auto space-y-10 md:mb-10 mb-20">
//             {post?.media?.map((mediaCon, idx) => (
//               <div
//                 className="relative w-full rounded-xl overflow-hidden shadow-xl"
//                 key={mediaCon.id}
//                 onClick={() =>
//                   handleOpenPreview({
//                     mediaType: mediaCon.mediaType,
//                     slideNo: idx,
//                   })
//                 }
//               >
//                 {mediaCon.mediaType === "image" ? (
//                   <MediaImageCard url={mediaCon.url} slideMode={false} />
//                 ) : (
//                   <MediaVideoCard url={mediaCon.url} showControls={true} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="absolute  w-full h-[90px] py-8 px-5 bottom-0 bg-secondary z-50">
//           <div className="absolute top-0 left-0 w-full h-[1px] bg-white bg-opacity-[0.2]"></div>
//           <PostController
//             post={post}
//             viewMode={true}
//             postId={post?.id}
//             commentCount={post?.comments?.length}
//             shareCount={post?.share?.length}
//             boltCount={post?.bolts?.length}
//             clapCount={post?.claps?.length}
//             cloverCount={post?.clovers?.length}
//             hasClapped={post?.hasClapped}
//             hasClover={post?.hasClover}
//             hasBolt={post?.hasBolt}
//             handleClickComment={handleClickComment}
//             openPostModel={true}
//             handleFetchPost={handleFetchPost}
//             setOpenShareModel={setOpenShareModel}
//             openShareModel={openShareModel}
//             isTribe={isTribe}
//             tribeId={tribeId}
//             postType={postType}
//             hasCard={post?.hasCard}
//             handleOpenBuyCard={handleOpenBuyCard}
//           />
//           <PostReactions
//             total_reaction={total_reactions}
//             total_comments={comments?.length}
//             handleOpenReactionsModel={openReactions}
//           />
//         </div>
//       </div>
//     );
//   };

//   const RightContent = () => {
//     return (
//       <>
//         <div
//           className={`relative 
//           xl:flex-[0.4] flex-1
//            h-[90vh] w-full xl:block hidden  overflow-x-hidden bg-secondary`}
//         >
//           <>
//             <div className="w-full h-auto py-8 md:px-10 px-5 sticky top-0 bg-secondary z-10 flex justify-between ">
//               <article>Comments</article>
//               <button onClick={handleFetchComments}>
//                 <TbReload
//                   size={22}
//                   className={`${
//                     commentloading ? "animate-spin" : "animate-none"
//                   }`}
//                 />
//               </button>
//             </div>
//             <div className="h-full  overflow-y-scroll  w-full px-10 space-y-5 pb-10">
//               <div className="w-full h-auto space-y-10">
//                 {comments.length > 0 ? (
//                   comments.map((comment, idx) => (
//                     <UserComment
//                       key={idx}
//                       comment={comment}
//                       onCommentAction={(comment) => oepnReplies(comment)}
//                       showController={true}
//                       showReplies={true}
//                       downloadImageCred={dowloadImageCred}
//                     />
//                   ))
//                 ) : (
//                   <div className="w-full h-[400px] flex-1 flex justify-center items-center">
//                     <article className="flex justify-center items-center text-white text-opacity-[0.5] text-sm">
//                       No Comments Yet!
//                     </article>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="sticky w-full h-[90px] py-4 px-5 bottom-0 bg-secondary z-10">
//               <div className="absolute top-0 left-0 w-full h-[1px] bg-white bg-opacity-[0.2]"></div>
//               {session?.user?.id ? (
//                 <AddCommentField
//                   onComment={(comment) => handleAddComment(comment)}
//                   loading={commentUploadingLoading}
//                   hasCard={post?.hasCard}
//                   postType={postType}
//                   handleOpenBuyCard={handleOpenBuyCard}
//                 />
//               ) : (
//                 <div className="h-[50px] flex justify-start items-center">
//                   <a
//                     href="/auth/signin"
//                     className="text-purple-500 text-[10px]"
//                   >
//                     Login to comment
//                   </a>
//                 </div>
//               )}
//             </div>
//           </>
//           {/* Replies Model */}
//           {/* {openReplies.open && (
//     <div
//       className={`absolute top-0 ${
//         openReplies.open ? "right-0" : "right-[-500px]"
//       } w-full h-full transition-right duration-300 ease-in-out bg-white z-10`}
//     >
//       <Replies closeModel={closeReplies} comment={openRepliesComment} />
//     </div>)
//     } */}
//         </div>
//       </>
//     );
//   };

//   const MobileContent = ({}) => {
//     return (
//       <div
//         className={`absolute xl:hidden block w-full h-full   bg-secondary z-10`}
//       >
//         <>
//           <div className="w-full h-auto py-8 md:px-10 px-5 sticky top-0 bg-secondary z-10 flex justify-between  ">
//             <div className="flex justify-start items-start space-x-2">
//               <button onClick={handleClickComment}>
//                 <FaAngleLeft size={22} className="text-primary" />
//               </button>
//               <div className={"flex justify-start items-start space-x-1"}>
//                 <article>{post?.comments?.length}</article>
//                 <article>Comments</article>
//               </div>
//             </div>
//             <button onClick={handleFetchComments}>
//               <TbReload
//                 size={22}
//                 className={`${
//                   commentloading ? "animate-spin" : "animate-none"
//                 }`}
//               />
//             </button>
//           </div>
//           <div className="h-full    w-full px-10 space-y-5 pb-10">
//             <div className="w-full h-auto space-y-10 overflow-y-scroll">
//               {comments.length > 0 ? (
//                 comments.map((comment, idx) => (
//                   <UserComment
//                     key={idx}
//                     comment={comment}
//                     onCommentAction={(comment) => oepnReplies(comment)}
//                     showController={true}
//                     showReplies={true}
//                     downloadImageCred={dowloadImageCred}
//                   />
//                 ))
//               ) : (
//                 <div className="w-full h-[400px] flex-1 flex justify-center items-center">
//                   <article className="flex justify-center items-center text-white text-opacity-[0.5] text-sm">
//                     No Comments Yet!
//                   </article>
//                 </div>
//               )}
//             </div>
//           </div>
//           {true ? (
//             <div className="sticky left-0 w-full h-[90px] py-4 px-5 bottom-0 bg-secondary z-50">
//               <div className="absolute top-0 left-0 w-full h-[1px] bg-white bg-opacity-[0.2] z-10"></div>
//               <AddCommentField
//                 onComment={(comment) => handleAddComment(comment)}
//                 loading={commentUploadingLoading}
//                 hasCard={post?.hasCard}
//                 postType={postType}
//                 handleOpenBuyCard={handleOpenBuyCard}
//               />
//             </div>
//           ) : null}
//         </>
//         {/* Replies Model */}
//         {/* {openReplies.open && (
//     <div
//       className={`absolute top-0 ${
//         openReplies.open ? "right-0" : "right-[-500px]"
//       } w-full h-full transition-right duration-300 ease-in-out bg-white z-10`}
//     >
//       <Replies closeModel={closeReplies} comment={openRepliesComment} />
//     </div>)
//     } */}
//       </div>
//     );
//   };

//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   useEffect(() => {
//     // Only run this on the client side
//     if (typeof window !== "undefined") {
//       setIsLargeScreen(window.screen.width >= 1280);
//     }
//   }, []);

//   return (
//     <>
//       <div
//         className="relative md:w-[80vw] w-[90vw] h-full flex flex-col lg:flex-row bg-secondary justify-start items-center lg:overflow-y-hidden overflow-y-auto"
//         style={{ maxHeight: "90vh", overflow: "hidden", zIndex: 0 }}
//       >
//         <LeftContent />
//         <div className="w-[1px] h-[90vh] lg:block hidden bg-white bg-opacity-[0.2]"></div>
//         {isLargeScreen && <RightContent />}
//         {showComment && !isLargeScreen && <MobileContent />}
//         {/* Show Replies */}
//         {openReplies.open && (
//           <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 z-50">
//             <Replies
//               closeModel={closeReplies}
//               comment={openRepliesComment}
//               fetchComments={handleFetchComments}
//               hasCard={post?.hasCard}
//               postType={postType}
//               handleOpenBuyCard={handleOpenBuyCard}
//             />
//           </div>
//         )}
//       </div>
//       {/* {imagePreview && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md " style={{
//           zIndex :1000
//         }} >
//           <ImagePreview
//             mediaCon={post.media}
//             media={imagePreviewURL}
//             handleClose={handleClosePreview}
//           />
//         </div>
//       )} */}
//       {openShareModel && (
//         <ModelVr_O
//           open={openShareModel}
//           setHandleOpen={setOpenShareModel}
//           extraClass="!z-50"
//         >
//           <SharePost pathname={sharedPathname} />
//         </ModelVr_O>
//       )}
//     </>
//   );
// };

// export default Post;
