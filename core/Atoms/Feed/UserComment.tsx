// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { MdMoreVert } from "react-icons/md";
// import { FaHandsClapping } from "react-icons/fa6";
// import { IoChatbubbles } from "react-icons/io5";
// import { callAPI, downloadFile } from "../../../lib/utils";
// import MenuOptions from "../Others/MenuOption";
// import { useSession } from "next-auth/react";

// interface UserCommentProps {
//   onCommentAction: (username: string) => void;
//   showReplies: boolean;
//   showController: boolean;
//   comment: any;
//   downloadImageCred: any;
//   hasCard? : boolean
// }

// const UserComment: React.FC<UserCommentProps> = ({
//   onCommentAction,
//   showController = true,
//   showReplies = true,
//   comment,
//   downloadImageCred,
//   hasCard
// }) => {
//   const UserProfileBar = () => {
//     const { data: session } = useSession();
//     const [profileImage, setProfileImage] = useState("");
//     const [loading, setLoading] = useState(false);

//     async function downloadUserImages(_user, authToken, url) {
//       let downloadedImages = {} as any;
//      if (_user?.image) {
//            if (_user?.image.includes("https")) {
//              downloadedImages.profileImage = _user?.image;
//            } else {
//              downloadedImages.profileImage = await downloadFile(
//                `${url}/file/mvpz-user-private/${_user.image}`,
//                authToken
//              );
//            }
//          }
//          if(_user?.bannerImage){
//            if (_user?.bannerImage.includes("https") ){
//              downloadedImages.bannerImage = _user?.bannerImage
//            } else {
//              downloadedImages.bannerImage = await downloadFile(
//                `${url}/file/mvpz-user-private/${_user.bannerImage}`,
//                authToken
//              );
//            }
//          }
//       setProfileImage(downloadedImages?.profileImage);
//     }

//     useEffect(() => {
//       setLoading(true);
//       downloadUserImages(
//         comment?.postedBy,
//         downloadImageCred?.authorizationToken,
//         downloadImageCred?.downloadUrl
//       );
//       setLoading(false);
//     }, [comment?.postedBy]);

//     return (
//       <div className="w-full flex justify-between items-center ">
//         {/* profile  details */}
//         <div className="flex justify-start items-center gap-2 cursor-pointer">
//           <div
//             className="w-[30px] h-[30px] p-[1px] bg-white rounded-full overflow-hidden"
//             title="User Name"
//           >
//             {loading ? null : profileImage ? (
//               <Image
//                 src={profileImage}
//                 alt="user profile"
//                 width={500}
//                 height={500}
//                 className={"relative w-full h-full rounded-full object-fill"}
//               />
//             ) : (
//               <article className="flex justify-center items-center text-[8px] bg-primary w-full h-full rounded-full">
//                 {comment?.postedBy?.username?.substring(0, 2)}
//               </article>
//             )}
//           </div>
//           <div className="flex flex-col items-start justify-center  ">
//             <article className="text-[10px] font-semibold leading-1 ">
//               {comment?.postedBy?.username}
//             </article>
//             <article className="text-[8px] font-normal text-white text-opacity-[0.5]">
//               {comment?.created_at}
//             </article>
//           </div>
//         </div>
//         {/* profile options */}
//         {!comment?.postedBy?.isAnonymous && <MenuOptions
//           position="left"
//           onSelect={() => {}}
//           options={
//             session?.user?.id
//               ? [
//                   {
//                     label: "View Profile",
//                   },
//                   {
//                     label: "Follow User",
//                   },
//                 ]
//               : [
//                   {
//                     label: "View Profile",
//                   },
//                 ]
//           }
//         >
//           <MdMoreVert size={15} />
//         </MenuOptions>}
//       </div>
//     );
//   };

//   const UserMessage = () => {
//     const [showFullMessage, setShowFullMessage] = useState(false);


//     let message = comment?.comment || comment?.reply;



//     return (
//       <div className="text-[10px]">

//         <div className="text-[10px]"  dangerouslySetInnerHTML={{
//           __html : message?.length > 200 && !showFullMessage
//           ? `${message?.substring(0, 200)}...`
//           : message
//         }}/>
//         {/* {message?.length > 200 && !showFullMessage
//           ? `${message?.substring(0, 200)}...`
//           : message}{" "} */}
//         {message?.length > 200 ? (
//           <span
//             className="text-purple-600 cursor-pointer text-[9px] select-none"
//             onClick={() => setShowFullMessage(!showFullMessage)}
//           >
//             {showFullMessage ? "Show Less" : "Show More"}
//           </span>
//         ) : (
//           ""
//         )}
//       </div>
//     );
//   };

//   const UserCommentController = () => {
//     return (
//       <div className="flex justify-start items-center ">
//         <button className="flex justify-start">
//           {comment?.likes?.length > 0 ? (
//             <span className="text-[12px]">{comment?.likes?.length}</span>
//           ) : null}
//         </button>
//         {showReplies && !comment?.postedBy?.isAnonymous ? (
//           <article
//             className="flex justify-start space-x-1 text-primary text-xs font-inter font-bold cursor-pointer"
//             onClick={() => onCommentAction(comment)}
//           >
//             Reply
//           </article>
//         ) : null}
//       </div>
//     );
//   };

//   const RepliesIndicator = () => {
//     return (
//       <button onClick={() => onCommentAction(comment)} className="font-bold">
//         <article className="underline text-primary text-[10px] !font-nato !font-extrabold ">
//           See all {comment?.replies?.length} replies
//         </article>
//       </button>
//     );
//   };

//   return (
//     <div className="w-full space-y-5 p-5 bg-ternary rounded-md">
//       <UserProfileBar />
//       <UserMessage />
//       <div className="w-full flex justify-between items-center">
//       {showController ? <UserCommentController /> : null}
//       {showReplies ? (
//         comment?.replies?.length > 0 ? (
//           <RepliesIndicator />
//         ) : null
//       ) : null}
//       </div>
//     </div>
//   );
// };

// export default UserComment;
