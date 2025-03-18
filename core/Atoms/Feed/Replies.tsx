// import React, { useEffect, useState } from "react";
// import AddCommentField from "./AddCommentField";
// import { FaAngleLeft } from "react-icons/fa6";
// import { TbReload } from "react-icons/tb";
// import UserComment from "./UserComment";
// import { MdReply } from "react-icons/md";
// import { useSession } from "next-auth/react";
// import { callAPI, downloadFile } from "../../../lib/utils";
// import { Loader } from "@mantine/core";
// import { formatMessageToHTMLForComment } from "../../../utils/media";

// interface RepliesProps {
//   closeModel: () => void;
//   comment: any;
//   fetchComments: () => void;
//   hasCard: boolean;
//   postType: "Public Post" | "Tribe Post" | "Shout Post";
//   handleOpenBuyCard: () => void;
// }

// const Replies: React.FC<RepliesProps> = ({
//   closeModel,
//   comment,
//   fetchComments,
//   hasCard,
//   postType,
//   handleOpenBuyCard,
// }) => {
//   const { data: session } = useSession();

//   const [replies, setReplies] = useState([]);
//   const [downloadImageCred, setSownloadImageCred] = useState<any>();
//   const [replieloading, setReplieLoading] = useState<boolean>(false);
//   const [replieUploadingLoading, setReplieUploadingLoading] =
//     useState<boolean>(false);

//   const fetchCommentsReplies = async () => {
//     let response;

//     switch (postType) {
//       case "Public Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/comment/reply/fetch/${comment?.id}`,
//           method: "GET",
//         });
//         break;
//       case "Tribe Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/comment/reply/fetch/${comment?.id}`,
//           method: "GET",
//         });
//         break;
//       case "Shout Post":
//         response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/comment/reply/fetch/${comment?.id}`,
//           method: "GET",
//         });
//         break;
//     }

//     if (response) {
//       return response;
//     }
//   };

//   const handleAddComment = async (reply: string) => {
//     let ressponse;


//      let replyMessage = await formatMessageToHTMLForComment(reply)

//     switch (postType) {
//       case "Public Post":
//         ressponse = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/comment/reply/${comment?.id}`,
//           method: "POST",
//           body: {
//             reply : replyMessage,
//           },
//         });
//         break;
//       case "Tribe Post":
//         ressponse = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/comment/reply/${comment?.id}`,
//           method: "POST",
//           body: {
//             reply : replyMessage,
//           },
//         });
//         break;
//       case "Shout Post":
//         if(hasCard || session?.user?.role === "Athlete"){
//           ressponse = await callAPI({
//             endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/comment/reply/${comment?.id}`,
//             method: "POST",
//             body: {
//               reply : replyMessage,
//             },
//           });
//           break;
//         }else{
//           handleOpenBuyCard()
//         }
//     }

//     if (ressponse) {
//       let replies = await fetchCommentsReplies();
//       setReplies(replies?.replies);
//       setSownloadImageCred(replies?.imageDownload);
//       setReplieUploadingLoading(false);
//       fetchComments();
//     }
//   };

//   const handleOnloadFetchReplies = async () => {
//     setReplieLoading(true);
//     let replies = await fetchCommentsReplies();
//     setReplies(replies?.replies);
//     setSownloadImageCred(replies?.imageDownload);
//     setReplieLoading(false);
//   };

//   useEffect(() => {
//     if (comment?.id) {
//       handleOnloadFetchReplies();
//     }
//   }, []);

//   return (
//     <div className="w-full h-full overflow-y-auto bg-secondary">
//       <div className="w-full h-auto py-8  md:px-10 px-5 sticky top-0 bg-secondary z-10 flex justify-between items-center ">
//         <div className="flex justify-start items-center space-x-2">
//           <button onClick={closeModel}>
//             <FaAngleLeft size={22} className="text-primary" />
//           </button>
//           <article className="text-sm">
//             {replies?.length > 0 ? replies?.length : null} Reply
//           </article>
//         </div>
//         <button onClick={handleOnloadFetchReplies}>
//           <TbReload
//             size={22}
//             className={`${replieloading ? "animate-spin" : "animate-none"}`}
//           />
//         </button>
//       </div>
//       <div className="min-h-[600px] w-full px-10 space-y-5 pb-10">
//         <div className="w-full h-auto space-y-10">
//           <UserComment
//             showController={true}
//             onCommentAction={() => {}}
//             showReplies={false}
//             comment={comment}
//             downloadImageCred={downloadImageCred}
//           />
//           <hr className="opacity-50" />
//           <div className="pl-5 space-y-10">
//             <article className="text-primary">
//               {replies?.length || 0} Replies
//             </article>

//             {replieloading ? (
//               <Loader />
//             ) : (
//               replies?.map((reply) => {
//                 return (
//                   <UserComment
//                     key={reply?.id}
//                     showController={true}
//                     comment={reply}
//                     onCommentAction={() => {}}
//                     showReplies={false}
//                     downloadImageCred={downloadImageCred}
//                   />
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="w-full min-h-[90px]   py-4 px-5 sticky bottom-0 bg-secondary z-10  ">
//         <div className="absolute top-0 left-0 w-full h-[1px] bg-white bg-opacity-[0.2]"></div>
//         {!comment?.postedBy?.isAnonymous && <>
//         {session?.user?.id ? (
//           <AddCommentField
//             onComment={(reply) => handleAddComment(reply)}
//             loading={replieUploadingLoading}
//             hasCard={hasCard}
//             postType={postType}
//             handleOpenBuyCard={handleOpenBuyCard}
//           />
//         ) : (
//           <div className="h-[50px] flex justify-start items-center">
//             <a href="/auth/signin" className="text-purple-500 text-[10px]">
//               Login to Reply
//             </a>
//           </div>
//         )}
//         </>}
//       </div>
//     </div>
//   );
// };

// export default Replies;
