// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { MdMoreVert } from "react-icons/md";
// import { IoChatbubbles } from "react-icons/io5";
// import { FaShare } from "react-icons/fa";
// import { AiFillDollarCircle } from "react-icons/ai";
// import { PiClover } from "react-icons/pi";
// import { MdOutlineOfflineBolt } from "react-icons/md";
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
// import { FaImage } from "react-icons/fa6";
// import { MdOfflineBolt } from "react-icons/md";
// import { useRouter } from "next/router";

// // Interfaces
// interface User {
//   id: string;
//   username: string;
//   image: string;
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
//   clap: Clap[];
//   clover: Clover[];
//   bolt: Bolt[];
//   hasClapped: boolean;
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
// const UserProfileBar: React.FC<User> = (user) => {
//   return (
//     <div className="w-full flex justify-between items-center">
//       <div className="flex justify-start items-center gap-5 cursor-pointer">
//         <div
//           className="w-[45px] h-[45px] p-[1px] bg-white rounded-full overflow-hidden"
//           title={user.username}
//         >
//           {user?.image ? (
//             <Image
//               src={user?.image}
//               alt="user profile"
//               width={500}
//               height={500}
//               className={"relative w-full h-full rounded-full object-cover"}
//             />
//           ) : null}
//         </div>
//         <div className="flex flex-col items-start justify-center ">
//           <article className="text-xs font-semibold text leading-1">
//             {user.username}
//           </article>
//           <article className="text-[10px] opacity-50 font-normal">
//             Feed @UFC
//           </article>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Media Components
// const MediaImageCard: React.FC<{ url: string; slideMode: boolean }> = ({
//   url,
//   slideMode,
// }) => (
//   <Image
//     src={url}
//     alt="Post 01"
//     width={500}
//     height={500}
//     className={`relative w-full  ${
//       slideMode ? "object-cover h-full" : "object-fit h-auto"
//     }  z-0`}
//   />
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
//       slideMode ? "object-cover h-full" : "object-fit h-auto"
//     }`}
//   />
// );

// const PostMedia: React.FC<{ media: Media[] }> = ({ media }) => {
//   return (
//     <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl brightness-90">
//       {media[0].mediaType === "image" ? (
//         <MediaImageCard url={media[0].url} slideMode={true} />
//       ) : (
//         <MediaVideoCard
//           url={media[0].url}
//           showControls={false}
//           slideMode={true}
//         />
//       )}
//     </div>
//   );
// };

// const PostEmptyTamplate = () => {
//   return (
//     <div className="relative w-full h-full rounded-xl bg-ternary overflow-hidden shadow-xl brightness-90 flex justify-center items-center">
//       <FaImage size={50} className="relative text-black " />
//     </div>
//   );
// };

// // Post Message
// const PostMessage: React.FC<{ message: string }> = ({ message }) => (
//   <article className="text-sm font-medium">
//     {message?.length > 200 ? (
//       <span>
//         {message?.substring(0, 200)}... <br />
//       </span>
//     ) : (
//       message
//     )}
//   </article>
// );

// const getIconByType = (type) => {
//   switch (type) {
//     case "Commented":
//       return <IoChatbubbles className="text-green-300" />;
//     case "Clapped":
//       return <FaHandsClapping className="text-yellow-500" />;
//     case "Sent Clovers":
//       return <PiClover className="text-green-500" />;
//     case "Sent Bolts":
//       return <MdOfflineBolt className="text-orange-500" />;
//     case "Shared":
//       return <FaShare className="text-primary" />;
//   }
// };

// // Main Post Component
// const ActivityPost = ({ post, dowloadImageCred }) => {
//   const [profileImage, setProfileImage] = useState("");

//   const [loading, setLoading] = useState(false);

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
//     setLoading(true);
//     downloadUserImages(
//       post?.postedBy,
//       dowloadImageCred?.authorizationToken,
//       dowloadImageCred?.downloadUrl
//     );
//     setLoading(false);
//   }, [post?.postedBy]);

//   const router = useRouter()

//   function handleOpenPostDetails() {
//     router.push(`/fanzone/post/${post?.id}`)
//   }
//   return (
//     <>
//       <div className="w-full h-auto" onClick={handleOpenPostDetails}>
//         <div className="flex justify-start items-center space-x-2 mb-5">
//           {getIconByType(post?.activityType)}
//           <article className=" text-xs">
//             You Have {post?.activityMessage}
//           </article>
//         </div>

//         <div className="w-full space-y-4  flex flex-col justify-start items-center bg-secondary rounded-md p-4">
//           <UserProfileBar
//             image={profileImage}
//             username={post?.postedBy.username}
//             id={post?.postedBy.id}
//           />
//           <div className="w-full h-[0.5px] bg-white bg-opacity-50"></div>
//           <div className="flex  w-full justify-center items-center gap-5">
//             <div className="flex-[0.2] w-full h-[75px]  ">
//               {post?.media?.length > 0 ? (
//                 <PostMedia media={post?.media} />
//               ) : (
//                 <PostEmptyTamplate />
//               )}
//             </div>

//             <div className="flex-[0.8] w-full space-y-2  flex flex-col items-start justify-center  ">
//               <PostMessage message={post?.message} />
//               <article className="text-xs opacity-50">2h ago</article>
//             </div>
//           </div>
//         </div>

//         <div className="py-8">
//           <div className="w-full h-[0.5px] bg-white opacity-[0.4]"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ActivityPost;
