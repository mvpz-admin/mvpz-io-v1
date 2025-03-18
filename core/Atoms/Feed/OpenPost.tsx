// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { MdMoreVert, MdOutlineOfflineBolt } from "react-icons/md";
// import { IoChatbubbles, IoChatbubblesOutline } from "react-icons/io5";
// import { FaAngleLeft, FaShare } from "react-icons/fa";
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
// import { Pagination } from "swiper/modules";
// import { callAPI, downloadFile } from "../../../lib/utils";
// import { useSession } from "next-auth/react";
// import ImagePreview from "./ImagePreview";
// import { PiCloverFill, PiCloverLight } from "react-icons/pi";
// import { MdOfflineBolt } from "react-icons/md";
// import SharePost from "./SharePost";
// // import { Tooltip } from "@mantine/core";
// import Tooltip from "../Others/Tooltip";
// import MenuOptions from "../Others/MenuOption";
// import { PiBellSimpleLight, PiUserMinusLight, PiXLight } from "react-icons/pi";
// import { useRouter } from "next/router";
// import ReactionViewer from "./ReactionViewer";
// import { PiHandsClappingLight, PiHandsClappingFill } from "react-icons/pi";
// import { HiCurrencyDollar, HiOutlineCurrencyDollar } from "react-icons/hi";
// import BuyCardModel from "./BuyCardModel";
// import { Loader } from "@mantine/core";

// // Interfaces
// interface User {
//   id: string;
//   username: string;
//   image: string;
//   role: string;
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
//   post: Post;
// }

// interface Post {
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
//   post: Post;
// }

// // Interface for Clap model
// interface Clap {
//   id: string;
//   userId: string;
//   postedBy: User;
//   postId: string;
//   post: Post;
// }

// // Interface for Clover model
// interface Clover {
//   id: string;
//   userId: string;
//   postedBy: User;
//   postId: string;
//   post: Post;
// }

// // Interface for Bolt model
// interface Bolt {
//   id: string;
//   userId: string;
//   postedBy: User;
//   postId: string;
//   post: Post;
// }

// // User Profile Component
// const UserProfileBar: React.FC<{
//   user: User;
//   dowloadImageCred: any;
//   tribeName: string;
// }> = ({ user, dowloadImageCred, tribeName }) => {
//   const [profileImage, setProfileImage] = useState();

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
//           title={user?.username}
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
//           <article className="text-xs font-semibold text leading-1 hover:underline">
//             {user?.username}
//           </article>
//           <article className="text-[10px] opacity-50 font-normal">
//             {tribeName}
//           </article>
//         </div>
//       </div>
//       {/* <div className="cursor-pointer">
//         <MdMoreVert size={18} />
//       </div> */}
//       {session?.user?.id && (
//         <MenuOptions
//           onSelect={() => {}}
//           // options={[
//           //   {
//           //     label: "Hide Post",
//           //     icon: <PiXLight />,
//           //     iconPosition: "left",
//           //   },
//           //   {
//           //     label: "Report",
//           //     icon: <PiBellSimpleLight />,
//           //     iconPosition: "left",
//           //   },
//           //   {
//           //     label: "Block User",
//           //     icon: <PiUserMinusLight />,
//           //     iconPosition: "left",
//           //   },
//           // ]}
//           options={[]}
//           position="left"
//         >
//           <MdMoreVert size={18} />
//         </MenuOptions>
//       )}
//     </div>
//   );
// };

// // Media Components
// const MediaImageCard: React.FC<{ url: string; slideMode: boolean }> = ({
//   url,
//   slideMode,
// }) => (
//   <div className="flex justify-center items-center w-full h-full">
//     <Image
//       src={url}
//       alt="Post 01"
//       width={500}
//       height={500}
//       className={`relative   ${
//         slideMode ? "object-fit w-auto h-full" : "object-fit w-full h-auto"
//       }  z-0`}
//     />
//   </div>
// );

// const MediaVideoCard: React.FC<{
//   url: string;
//   showControls: boolean;
//   slideMode: boolean;
// }> = ({ url, showControls, slideMode }) => (
//   <video
//     src={url}
//     width={500}
//     height={500}
//     controls={showControls}
//     className={`relative w-full  ${
//       slideMode ? "object-fit w-full h-full" : "object-fit h-auto"
//     }`}
//   />
// );

// // Post Controller
// interface PostControllerProps {
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

//   return (
//     <>
//       <div className="relative flex justify-between items-center">
//         {!session?.user?.id && !stats?.viewMode ? null : (
//           <div className="flex justify-start items-center gap-x-8  w-full">
//             <div
//               className={`${
//                 stats?.openPostModel ? "md:hidden flex" : "flex"
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
//             <Tooltip text="Clap">
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
//             <Tooltip text="Good Luck">
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
//             <Tooltip text="Bolt">
//               <div
//                 className={`flex justify-start items-center gap-1  cursor-pointer hover:scale-105`}
//                 onClick={handleBolt}
//               >
//                 <div className="flex justify-start items-center space-x-1">
//                   {stats?.hasBolt ? (
//                     <MdOfflineBolt
//                       size={stats?.openPostModel ? 20 : 25}
//                       className={`text-orange-500 ${
//                         stats.openPostModel ? "hover:text-orange-500" : ""
//                       }`}
//                     />
//                   ) : (
//                     <MdOutlineOfflineBolt
//                       size={stats?.openPostModel ? 20 : 25}
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
//             <Tooltip text="Tip To Athlete (Coming Soon)">
//               <div
//                 className={`flex justify-start items-center gap-2  cursor-not-allowed hover:scale-105`}
//               >
//                 <div className="flex justify-start items-center space-x-1 opacity-20">
//                   {false ? (
//                     <HiCurrencyDollar
//                       size={stats?.openPostModel ? 20 : 25}
//                       className={`${true ? "text-[#AEE269]" : null}  ${
//                         stats?.openPostModel ? " hover:text-[#AEE269]" : null
//                       }`}
//                     />
//                   ) : (
//                     <HiOutlineCurrencyDollar
//                       size={stats?.openPostModel ? 20 : 25}
//                       className={`${true ? "text-[#AEE269]" : null}  ${
//                         stats?.openPostModel ? " hover:text-[#AEE269]" : null
//                       }`}
//                     />
//                   )}
//                   {!stats?.viewMode ? (
//                     <span className="text-[16px] font-bold font-nato">
//                       {0}
//                     </span>
//                   ) : null}
//                 </div>
//               </div>
//             </Tooltip>
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
// const OpenPost: React.FC<{
//   post: string;
//   isTribe?: boolean;
//   tribeId?: string;
//   showController?: boolean;
//   disableModel?: boolean;
//   postType: "Public Post" | "Tribe Post" | "Shout Post";
// }> = ({ post, isTribe = false, tribeId = null, postType }) => {
//   const [openReactionsModel, setOpenReactionsModel] = useState<boolean>(false);
//   const [postContent, setPostContent] = useState<Post>();
//   const [openShareModel, setOpenShareModel] = useState(false);
//   const [openBuyCard, setOpenBuyCard] = useState(false);
//   const [dowloadImageCred, setDowloadImageCred] = useState();
//   const [loading, setLoading] = useState(false);
//   const [pathname, setPathname] = useState<string>("");
//   function handleOpenBuyCard() {
//     setOpenBuyCard(true);
//   }

//   function handleOpenReactionsModel() {
//     setOpenReactionsModel(true);
//   }

//   function handleSetUrl() {
//     switch (postType) {
//       case "Public Post":
//         setPathname(`/fanzone/post/public_post?postId=${postContent?.id}`);
//         break;
//       case "Tribe Post":
//         setPathname(`/fanzone/post/tribe_post/?postId=${postContent?.id}`);
//       case "Shout Post":
//         setPathname(`/fanzone/post/shout_post?postId=${postContent?.id}`);
//     }
//   }

//   useEffect(() => {
//     handleSetUrl();
//   }, [postContent]);

//   const handleFetchPost = async () => {
//     let response: any = {};
//     setLoading(true);
//     switch (postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/${post}`,
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/${post}`,
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/${post}`,
//         });
//     }

//     if (response) {
//       setPostContent(response?.post);
//       setDowloadImageCred(response?.imageDownload);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     handleFetchPost();
//   }, [post]);

//   return loading ? (
//     <div
//       className={` md:w-[60vw] w-[90vw]  md:h-[70vh] h-[80vh] flex justify-center items-center z-10`}
//     >
//       <Loader />
//     </div>
//   ) : (
//     <>
//       <div className={` md:w-[60vw] w-[90vw]  md:h-[70vh] h-[80vh] z-10`}>
//         <PostModel
//           post={postContent}
//           handleFetchPost={handleFetchPost}
//           dowloadImageCred={dowloadImageCred}
//           openReactions={handleOpenReactionsModel}
//           setOpenShareModel={setOpenShareModel}
//           openShareModel={openShareModel}
//           isTribe={isTribe}
//           tribeId={tribeId}
//           postType={postType}
//           handleOpenBuyCard={handleOpenBuyCard}
//           sharedPathname={pathname}
//         />
//       </div>

//       {openReactionsModel && (
//         <ModelVr_O
//           open={openReactionsModel}
//           setHandleOpen={setOpenReactionsModel}
//         >
//           <ReactionViewer postId={post} postType={postType} />
//         </ModelVr_O>
//       )}

//       {openShareModel && (
//         <ModelVr_O
//           open={openShareModel}
//           setHandleOpen={setOpenShareModel}
//           extraClass="!z-50"
//         >
//           <SharePost pathname={pathname} />
//         </ModelVr_O>
//       )}

//       {openBuyCard && (
//         <ModelVr_O
//           open={openBuyCard}
//           setHandleOpen={setOpenBuyCard}
//           extraClass="!z-[1000]"
//         >
//           <BuyCardModel username={postContent?.postedBy?.username} />
//         </ModelVr_O>
//       )}
//     </>
//   );
// };

// // Model for detailed post
// const PostModel: React.FC<{
//   post: Post;
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
// }) => {
//   const [openReplies, setOpenReplies] = useState<{
//     open: boolean;
//   }>({
//     open: false,
//   });

//   const [showComment, setShowComment] = useState(false);

//   const [imagePreview, setImagePreview] = useState(false);
//   const [imagePreviewURL, setImagePreviewURL] = useState({
//     url: "",
//     mediaType: "",
//   });
//   const [openRepliesComment, setOpenRepliesComment] = useState(null);
//   const { data: session } = useSession();

//   const [isClap, setIsClap] = useState<boolean>(post?.hasClapped);
//   const [isClover, setIsClover] = useState<boolean>(post?.hasClover);
//   const [isBolt, setIsBolt] = useState<boolean>(post?.hasBolt);
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

//   function handleOpenPreview(previewURL) {
//     setImagePreview(true);
//     setImagePreviewURL(previewURL);
//   }

//   function handleClosePreview() {
//     setImagePreview(false);
//     setImagePreviewURL(null);
//   }

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

//   const [comments, setComments] = useState(post?.comments);
//   const [commentloading, setCommentLoading] = useState<boolean>(false);
//   const [commentUploadingLoading, setCommentUploadingLoading] =
//     useState<boolean>(false);

//   useEffect(() => {
//     if (!comments) {
//       handleFetchPost();
//     }
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
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/shout/post/comment/fetch/${post?.id}`,
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

//     let response;
//     switch (postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/comment/${post?.id}`,
//           method: "POST",
//           body: {
//             comment,
//           },
//         });

//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/comment/${post?.id}`,
//           method: "POST",
//           body: {
//             comment,
//           },
//         });
//         break;
//       case "Shout Post":
//         if (post?.hasCard || session?.user?.role === "Athlete") {
//           response = await callAPI({
//             endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/comment/${post?.id}`,
//             method: "POST",
//             body: {
//               comment,
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

//   const LeftContent = () => (
//     <div
//       className={`relative xl:w-[54%] w-full  h-full  z-0`}
//     >
//       <div className="w-full h-auto py-8 px-5 sticky top-0 bg-secondary z-10">
//         <UserProfileBar
//           dowloadImageCred={dowloadImageCred}
//           user={post?.postedBy}
//           tribeName={post?.tribeName}
//         />
//       </div>
//       <div className="h-[550px] w-full md:px-10 px-5 space-y-5 pb-40 overflow-y-auto">
//         <span className="text-xs">{post?.message}</span>
//         <div className="w-full h-auto space-y-10">
//           {post?.media?.map((mediaCon) => (
//             <div
//               className="relative w-full md:h-[450px] h-[200px] rounded-xl overflow-hidden shadow-xl"
//               key={mediaCon.id}
//               onClick={() =>
//                 handleOpenPreview({
//                   url: mediaCon.url,
//                   mediaType: mediaCon.mediaType,
//                 })
//               }
//             >
//               {mediaCon.mediaType === "image" ? (
//                 <MediaImageCard url={mediaCon.url} slideMode={false} />
//               ) : (
//                 <MediaVideoCard
//                   url={mediaCon.url}
//                   showControls={true}
//                   slideMode={false}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="absolute  w-full h-[90px] py-8 px-5 bottom-0 bg-secondary z-50">
//         <div className="absolute top-0 left-0 w-full h-[1px] bg-white bg-opacity-[0.2]"></div>
//         <PostController
//           viewMode={true}
//           postId={post?.id}
//           commentCount={post?.comments?.length}
//           shareCount={post?.share?.length}
//           boltCount={post?.bolts?.length}
//           clapCount={post?.claps?.length}
//           cloverCount={post?.clovers?.length}
//           hasClapped={post?.hasClapped}
//           hasClover={post?.hasClover}
//           hasBolt={post?.hasBolt}
//           handleClickComment={handleClickComment}
//           openPostModel={true}
//           handleFetchPost={handleFetchPost}
//           setOpenShareModel={setOpenShareModel}
//           openShareModel={openShareModel}
//           isTribe={isTribe}
//           tribeId={tribeId}
//           postType={postType}
//           hasCard={post?.hasCard}
//           handleOpenBuyCard={handleOpenBuyCard}
//         />
//         <PostReactions
//           total_reaction={total_reactions}
//           total_comments={comments?.length}
//           handleOpenReactionsModel={openReactions}
//         />
//       </div>
//     </div>
//   );

//   const RightContent = () => {
//     return (
//       <>
//         <div
//           className={`relative xl:w-[48%] w-full  h-full xl:block hidden  overflow-x-hidden bg-secondary`}
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
//                 {comments?.length > 0 ? (
//                   comments?.map((comment, idx) => (
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
//               {comments?.length > 0 ? (
//                 comments?.map((comment, idx) => (
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
//         className="relative w-full h-full flex flex-col lg:flex-row bg-secondary justify-start items-center z-0 "
//         style={{ maxHeight: "90vh", overflow: "hidden" }}
//       >
//         <LeftContent />
//         <div className="w-[1px] lg:h-full lg:block hidden bg-white bg-opacity-[0.2]"></div>
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
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-50">
//           <ImagePreview
//             mediaCon={[]}
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

// export default OpenPost;
