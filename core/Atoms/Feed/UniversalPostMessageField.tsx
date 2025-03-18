// import Image from "next/image";
// import React, { useEffect, useRef, useState } from "react";
// import { FaImage } from "react-icons/fa6";
// import { FaVideo } from "react-icons/fa6";
// import { RiUpload2Fill } from "react-icons/ri";
// import ModelVr_O from "../Models/ModelVr_O";
// import { callAPI, uploadImageToBackblaze } from "../../../lib/utils";
// import { Loader } from "@mantine/core";
// import { IoIosCloseCircle } from "react-icons/io";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import MenuOptions from "../Others/MenuOption";
// import SearchOptionsMenu from "../Others/SearchOptionsMenu";
// import { formatMessageToHTML } from "../../../utils/media";
// import VideoPlayer from "../Media/VideoPlayer";
// import { notifications } from "@mantine/notifications";

// const PostModelContentHeader: React.FC<{
//   feedName: string;
//   isShout: boolean;
//   bodyFeild: any;
//   mediaList: any;
//   onHandlePost: any;
//   postLoading : boolean
//   setOpenModel : any
// }> = ({ feedName, isShout, bodyFeild, mediaList, onHandlePost, postLoading,setOpenModel }) => {
//   return (
//     <div className="sticky top-0 w-full  py-5 flex  justify-between items-center bg-[#1f1f1f] z-10 px-4">
//       <div onClick={() => setOpenModel(false)}>
//         <article className="text-[10px] cursor-pointer">Cancel</article>
//       </div>
//       <div className="flex flex-col justify-center items-center ">
//         <article className="font-bold text-[12px]">
//           Write a {isShout ? "Shout" : "Post"}
//         </article>
//         <article className="text-[8px] text-primary">{feedName}</article>
//       </div>
//       <div
//         className={`md:px-5 p-3 md:h-[40px] h-[30px] flex justify-center items-center ${
//           bodyFeild || mediaList?.length > 0
//             ? "bg-primary cursor-pointer"
//             : "bg-white bg-opacity-40 cursor-not-allowed"
//         } rounded-lg md:text-sm text-[10px]  hover:brightness-105`}
//         onClick={onHandlePost}
//       >
//         {postLoading ? <Loader variant="dots" size={12} color="white"/> : "Post"}
//       </div>
//     </div>
//   );
// };

// const PostModelContentBody: React.FC<{
//   bodyFeild: string;
//   setBodyFeild: React.Dispatch<React.SetStateAction<string>>;
// }> = ({ bodyFeild, setBodyFeild }) => {
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const handleInput = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   };

//   useEffect(() => {
//     handleInput();
//   }, []);

//   return (
//     <div className="w-full h-auto outline-none border-0 p-5">
//       <textarea
//         ref={textareaRef}
//         placeholder="Write here..."
//         className="w-full h-full resize-none border-0 bg-transparent outline-none focus:outline-none placeholder:font-semibold font-semibold"
//         style={{
//           outline: "none",
//           border: "none",
//           overflow: "hidden",
//           WebkitAppearance: "none",
//           MozAppearance: "none",
//         }}
//         onChange={(e) => setBodyFeild(e.target.value)}
//         value={bodyFeild}
//         onInput={handleInput}
//       ></textarea>

//       <div className="w-full h-auto p-5"></div>
//     </div>
//   );
// };

// const PostModelContentMedia: React.FC<{
//   mediaList: string[];
//   setMediaList: (state: string[]) => void;
// }> = ({ mediaList, setMediaList }) => {
//   const handleRemoveMedia = (url: string) => {
//     setMediaList(mediaList.filter((media) => media !== url));
//   };



//   return (
//     <div className="mt-4">
//     {mediaList.map((media, idx) =>
//       media.endsWith(".mp4") ? (
//         <div key={idx} className="relative w-full mb-4">
//           <VideoPlayer url={media} />
//           <IoIosCloseCircle
//             className="absolute top-2 right-2 text-primary cursor-pointer"
//             size={30}
//             onClick={() => handleRemoveMedia(media)}
//           />
//         </div>
//       ) : (
//         <div key={idx} className="relative w-full mb-4">
//           <Image
//             src={media}
//             alt={`Uploaded media ${idx}`}
//             width={500}
//             height={500}
//             className="rounded-md object-cover"
//           />
//           <IoIosCloseCircle
//             className="absolute top-2 right-2 text-primary cursor-pointer"
//             size={30}
//             onClick={() => handleRemoveMedia(media)}
//           />
//         </div>
//       )
//     )}
//   </div>
//   );
// };

// interface PostModelContentProps {
//   setOpenModel: (state: boolean) => void;
//   isShout: boolean;
//   postTribeList: Array<{ id: string; label: string }>;
//   session: any;
//   activePostTribe: any;
// }

// const PostModelContent: React.FC<PostModelContentProps> = ({


//   setOpenModel,
//   isShout,
//   postTribeList,
//   session,
//   activePostTribe,
// }) => {
//   const [bodyFeild, setBodyFeild] = useState("");
//   const [loading, setLoading] = useState<Boolean>(false);
//   const [mediaList, setMediaList] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [selectedTribe, setSelectedTribe] = useState<any>(null);
//   const [openSearchMenu, setOpenSearchMenu] = useState(false);
//   const router = useRouter();
//   const [postLoading, setPostLoading] = useState(false);

//   useEffect(() => {
//     setOptions(postTribeList);
//     setSelectedTribe(activePostTribe);
//   }, [session]);

//   //   setLoading(true);
//   //   const file = e.target.files && e.target.files[0];

//   //   const backblazeImage = await callAPI({
//   //     endpoint: "/api/image/uploadBackBlaze",
//   //     method: "GET",
//   //     params: { bucketType: "public" },
//   //   });

//   //   if (backblazeImage.uploadUrl) {
//   //     const uploadUrl = backblazeImage.uploadUrl;
//   //     const authToken = backblazeImage.authorizationToken;

//   //     if (file.name) {
//   //       const extn = file.name.split(".");
//   //       const imageName = `${extn[0]}_postImage.${extn[1] || "png"}`;
//   //       const response = await uploadImageToBackblaze(
//   //         file,
//   //         `posts/image/${imageName}`,
//   //         uploadUrl,
//   //         authToken
//   //       );

//   //       if (response) {
//   //         setMediaList((prev) => [
//   //           ...prev,
//   //           `https://${process.env.NEXT_PUBLIC_BACKBLAZE_PUBLIC_DOMAIN}/file/mvpz-src-public/posts/image/${imageName}`,
//   //         ]);
//   //         setLoading(false);
//   //       }
//   //     }
//   //   }
//   // };



//     const handleUpload = async (
//       e: React.ChangeEvent<HTMLInputElement>,
//       type: "image" | "video"
//     ) => {
//       setLoading(true);
//       const file = e.target.files?.[0];
//       if (!file) {
//         setLoading(false);
//         return;
//       }
    
//       try {
//         // Size validation
//         const fileSizeInMB = file.size / (1024 * 1024);
//         if (type === "image" && fileSizeInMB > 15) {
//           notifications.show({
//             message: "Image size exceeds 15MB. Please upload a smaller image.",
//           });
//           setLoading(false);
//           return;
//         }
    
//         if (type === "video" && fileSizeInMB > 512) {
//           notifications.show({
//             message: "Video size exceeds 512MB. Please upload a smaller video.",
//           });
//           setLoading(false);
//           return;
//         }
    
//         // Duration validation for videos
//         if (type === "video") {
//           const videoElement = document.createElement("video");
//           videoElement.src = URL.createObjectURL(file);
    
//           await new Promise<void>((resolve, reject) => {
//             videoElement.onloadedmetadata = () => {
//               const durationInSeconds = videoElement.duration;
//               URL.revokeObjectURL(videoElement.src);
    
//               if (durationInSeconds < 0.5 || durationInSeconds > 140) {
//                 notifications.show({
//                   message:
//                     "Video duration must be between 0.5 and 140 seconds. Please upload a valid video.",
//                 });
//                 setLoading(false);
//                 reject();
//               } else {
//                 resolve();
//               }
//             };
//             videoElement.onerror = reject;
//           });
//         }
    
//         // API call to get the upload URL
//         const response = await callAPI({
//           endpoint: "/api/image/uploadBackBlaze",
//           method: "GET",
//           params: { bucketType: "public" },
//         });
    
//         if (response.uploadUrl) {
//           const uploadUrl = response.uploadUrl;
//           const authToken = response.authorizationToken;
//           const extension = file.name.split(".").pop() || "file";
//           const baseName = file.name
//             .split(".")
//             .slice(0, -1)
//             .join("_")
//             .replace(/\s+/g, "_");
//           const fileName = `${baseName}_post${
//             type === "image" ? "Image" : "Video"
//           }.${extension}`;
//           const uploadResponse = await uploadImageToBackblaze(
//             file,
//             `posts/${type}/${fileName}`,
//             uploadUrl,
//             authToken
//           );
    
//           if (uploadResponse) {
//             setMediaList((prev) => [
//               ...prev,
//               `https://${process.env.NEXT_PUBLIC_BACKBLAZE_PUBLIC_DOMAIN}/file/mvpz-src-public/posts/${type}/${fileName}`,
//             ]);
//           }
//         }
//       } catch (error) {
//         console.error("Upload failed", error);
//         notifications.show({
//           message: "An error occurred during upload. Please try again.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//   const onHandlePost = async () => {
//     if (bodyFeild || mediaList?.length > 0) {
//       let data = {
//         message: bodyFeild,
//         media: mediaList,
//         selectedTribe,
//       };

//       setPostLoading(true);
//       let bodyMediaList = mediaList.map((asset) => ({
//         url: asset,
//         mediaType:
//           asset.split("/")[asset.split("/").length - 1].split(".")[1] == "mp4"
//             ? "video"
//             : "image",
//       }));

//       let bodyMessaage = formatMessageToHTML(bodyFeild)

//       if (selectedTribe?.id == "public-feed") {
//         let response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/add`,
//           method: "POST",
//           body: {
//             message: bodyMessaage,
//             mediaList: bodyMediaList,
//             userId: session?.user?.id,
//           },
//         });

//         if (response) {
//           setPostLoading(false);
//           router.reload();
//           return;
//         }
//       } else {
//         if (session?.user?.role == "User") {
//           const response = await callAPI({
//             endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/add`,
//             method: "POST",
//             body: {
//               message: bodyMessaage,
//               mediaList: bodyMediaList,
//               tribeId: selectedTribe?.tribeId,
//             },
//           });

//           if (response) {
//             setPostLoading(false);
//             router.reload();
//             return;
//           }
//         } else {
//           const response = await callAPI({
//             endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/add`,
//             method: "POST",
//             body: {
//               message: bodyMessaage,
//               mediaList: bodyMediaList,
//               tribeId: selectedTribe?.tribeId,
//             },
//           });

//           if (response) {
//             setPostLoading(false);
//             router.reload();
//             return;
//           }
//         }
//       }


//       setOpenModel(false);
//     }
//   };

//   const PostModelContentFooter: React.FC<{
//     handleUpload : any;
//     session: any;
//   }> = ({handleUpload, session }) => {
//     return (
//       <div className="relative w-full bg-secondary ">
//         <div className="w-full h-[0.5px] bg-white bg-opacity-[0.5]"></div>
//         <div className="flex justify-between item-center p-5">
//           <div className="flex justify-start items-center space-x-5 ">
//             <div className="relative overflow-hidden">
//               <FaImage
//                 size={20}
//                 title="Upload Image"
//                 className="cursor-pointer relative z-0"
//               />
//               <input
//                 type="file"
//                 accept="image/gif, image/jpeg, image/jpg, image/png"
//                 onChange={(e) => handleUpload(e, "image")}
//                 className="absolute z-5 top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//               />
//             </div>
//             <div className="relative overflow-hidden">
//               <FaVideo
//                 size={22}
//                 title="Upload Video"
//                 className="cursor-pointer relative z-0"
//               />
//               <input
//                 type="file"
//                 accept="video/mp4"
//                 onChange={(e) => handleUpload(e, "video")}
//                 className="absolute z-5 top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//               />
//             </div>
//           </div>

//           <div className="flex justify-start items-center md:space-x-5 space-x-3">
//             {options.length > 0 && (
//               <div
//                 className="md:px-5 p-3 py-2 w-[150px] bg-ternary rounded-lg text-sm flex items-center space-x-2 hover:brightness-105 cursor-pointer"
//                 onClick={() => setOpenSearchMenu(true)}
//               >
//                 <RiUpload2Fill size={16} />
//                 <span className="text-[10px] font-bold flex">
//                   {selectedTribe?.label}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="w-full h-full  flex flex-col items-center bg-secondary ">
//         <PostModelContentHeader
//           feedName={selectedTribe?.label}
//           isShout={isShout}
//           bodyFeild={bodyFeild}
//           mediaList={mediaList}
//           onHandlePost={onHandlePost}
//           postLoading={postLoading}
//           setOpenModel={setOpenModel}
//         />
//         {/* Header */}
//         <div className=" w-full flex-1 h-auto overflow-y-auto ">
//           <PostModelContentBody
//             bodyFeild={bodyFeild}
//             setBodyFeild={setBodyFeild}
//           />
//           <PostModelContentMedia
//             mediaList={mediaList}
//             setMediaList={setMediaList}
//           />
//         </div>
//         <PostModelContentFooter
//          handleUpload={handleUpload}
//           session={session}
//         />
//       </div>
//       {loading ? (
//         <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[100vw] h-[100vh] z-50 flex justify-center items-center backdrop-blur-sm">
//           <Loader />
//         </div>
//       ) : null}
//       {openSearchMenu ? (
//         <SearchOptionsMenu
//           setClose={setOpenSearchMenu}
//           selectedOpt={selectedTribe}
//           setSelectedOpt={setSelectedTribe}
//           list={postTribeList}
//         />
//       ) : null}
//     </>
//   );
// };

// const UniversalPostMessageField: React.FC<{


//   shout?: boolean;
//   postTribeList?: Array<{ id: string; label: string }>;
//   openModel: any;
//   setOpenModel: any;
//   activePostTribe: any;
// }> = ({


//   shout = false,
//   postTribeList = [],
//   openModel,
//   setOpenModel,
//   activePostTribe,
// }) => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   return (
//     <>
//       {openModel ? (
//         <div className="fixed top-0 left-0 z-[250] w-full h-full flex justify-center items-center  backdrop-blur-md ">
//           <PostModelContent

//             setOpenModel={setOpenModel}

//             isShout={shout}
//             postTribeList={postTribeList}
//             activePostTribe={activePostTribe}
//             session={session}
//           />
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default UniversalPostMessageField;
