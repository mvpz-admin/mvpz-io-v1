// import Image from "next/image";
// import React, { useEffect, useRef, useState } from "react";
// import { FaImage } from "react-icons/fa6";
// import { FaVideo } from "react-icons/fa6";
// import { RiUpload2Fill } from "react-icons/ri";
// import ModelVr_O from "../Models/ModelVr_O";
// import { callAPI, uploadImageToBackblaze } from "../../../lib/utils";
// import { Button, Loader } from "@mantine/core";
// import { IoIosCloseCircle } from "react-icons/io";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import MenuOptions from "../Others/MenuOption";
// import { FaBold, FaListUl } from "react-icons/fa";
// import SearchOptionsMenu from "../Others/SearchOptionsMenu";
// import VideoPlayer from "../Media/VideoPlayer";
// import { formatMessageToHTML } from "../../../utils/media";
// import { notifications } from "@mantine/notifications";

// const PostModel: React.FC<{
//   feedName: string;
//   onClickPost: (data: {
//     message: string;
//     media: string[];
//     selectedTribe: any;
//   }) => void;
//   setOpenModel: (state: boolean) => void;
//   isShout: boolean;
//   postTribeList: Array<{ id: string; label: string }>;
//   activePostTribe: any;
// }> = ({
//   feedName,
//   onClickPost,
//   setOpenModel,
//   isShout,
//   postTribeList = [],
//   activePostTribe = [],
// }) => {
//   const [bodyField, setBodyField] = useState<string>("");
//   const [mediaList, setMediaList] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [options, setOptions] = useState([]);
//   const [selectedTribe, setSelectedTribe] = useState<any>(null);
//   const [openSearchMenu, setOpenSearchMenu] = useState(false);
//   const { data: session } = useSession();
//   const [postLoading, setPostLoading] = useState(false);

//   console.log({
//     postLoading,
//   });

//   useEffect(() => {
//     setOptions(postTribeList);
//     setSelectedTribe(activePostTribe);
//   }, [session]);

//   // Resize textarea dynamically
//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const handleInput = () => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   };

//   useEffect(() => handleInput(), [bodyField]);

//   // Upload handler
//   const handleUpload = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     type: "image" | "video"
//   ) => {
//     setLoading(true);
//     const file = e.target.files?.[0];
//     if (!file) {
//       setLoading(false);
//       return;
//     }
  
//     try {
//       // Size validation
//       const fileSizeInMB = file.size / (1024 * 1024);
//       if (type === "image" && fileSizeInMB > 15) {
//         notifications.show({
//           message: "Image size exceeds 15MB. Please upload a smaller image.",
//         });
//         setLoading(false);
//         return;
//       }
  
//       if (type === "video" && fileSizeInMB > 512) {
//         notifications.show({
//           message: "Video size exceeds 512MB. Please upload a smaller video.",
//         });
//         setLoading(false);
//         return;
//       }
  
//       // Duration validation for videos
//       if (type === "video") {
//         const videoElement = document.createElement("video");
//         videoElement.src = URL.createObjectURL(file);
  
//         await new Promise<void>((resolve, reject) => {
//           videoElement.onloadedmetadata = () => {
//             const durationInSeconds = videoElement.duration;
//             URL.revokeObjectURL(videoElement.src);
  
//             if (durationInSeconds < 0.5 || durationInSeconds > 140) {
//               notifications.show({
//                 message:
//                   "Video duration must be between 0.5 and 140 seconds. Please upload a valid video.",
//               });
//               setLoading(false);
//               reject();
//             } else {
//               resolve();
//             }
//           };
//           videoElement.onerror = reject;
//         });
//       }
  
//       // API call to get the upload URL
//       const response = await callAPI({
//         endpoint: "/api/image/uploadBackBlaze",
//         method: "GET",
//         params: { bucketType: "public" },
//       });
  
//       if (response.uploadUrl) {
//         const uploadUrl = response.uploadUrl;
//         const authToken = response.authorizationToken;
//         const extension = file.name.split(".").pop() || "file";
//         const baseName = file.name
//           .split(".")
//           .slice(0, -1)
//           .join("_")
//           .replace(/\s+/g, "_");
//         const fileName = `${baseName}_post${
//           type === "image" ? "Image" : "Video"
//         }.${extension}`;
//         const uploadResponse = await uploadImageToBackblaze(
//           file,
//           `posts/${type}/${fileName}`,
//           uploadUrl,
//           authToken
//         );
  
//         if (uploadResponse) {
//           setMediaList((prev) => [
//             ...prev,
//             `https://${process.env.NEXT_PUBLIC_BACKBLAZE_PUBLIC_DOMAIN}/file/mvpz-src-public/posts/${type}/${fileName}`,
//           ]);
//         }
//       }
//     } catch (error) {
//       console.error("Upload failed", error);
//       notifications.show({
//         message: "An error occurred during upload. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Format message into HTML


//   // Post handler
//   const handlePost = async () => {
//     setPostLoading(true);
//     if (!bodyField && mediaList.length === 0) return;

//     const formattedMessage = formatMessageToHTML(bodyField);
//     const data = { message: formattedMessage, media: mediaList, selectedTribe };

//     let bodyMediaList = mediaList.map((asset) => ({
//       url: asset,
//       mediaType:
//         asset.split("/")[asset.split("/").length - 1].split(".")[1] == "mp4"
//           ? "video"
//           : "image",
//     }));

//     let postResponse;

//     if (selectedTribe?.id == "public-feed") {
//       let response = await callAPI({
//         endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/post/add`,
//         method: "POST",
//         body: {
//           message: data.message,
//           mediaList: bodyMediaList,
//           userId: session?.user?.id,
//         },
//       });
//       postResponse = response;
//     } else {
//       if (session?.user?.role == "User") {
//         const response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/add`,
//           method: "POST",
//           body: {
//             message: data.message,
//             mediaList: data.media,
//             userId: session?.user?.id,
//           },
//         });
//         postResponse = response;
//       } else {
//         const response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/shout/add`,
//           method: "POST",
//           body: {
//             message: data.message,
//             mediaList: data.media,
//             userId: session?.user?.id,
//           },
//         });

//         postResponse = response;
//       }
//     }
//     setPostLoading(false);
//     setOpenModel(false);
//     return onClickPost(postResponse);
//   };

//   // Remove media
//   const handleRemoveMedia = (url: string) => {
//     setMediaList((prev) => prev.filter((media) => media !== url));
//   };

//   return (
//     <div className="min-h-[425px] max-h-[600px] w-auto  flex flex-col items-center">
//       {/* Header */}
//       <div className="sticky top-0 w-full py-4 bg-secondary z-10  flex flex-col justify-center  items-center">
//         <h2 className="font-bold">{`Write a ${isShout ? "Shout" : "Post"}`}</h2>
//         <p className="text-sm text-primary">{selectedTribe?.label}</p>
//       </div>

//       {/* Body */}
//       <div className="w-full min-h-[400px] overflow-y-auto p-4">
//         {/* Text Area */}
//         <textarea
//           ref={textareaRef}
//           className="w-full resize-none border-0 bg-transparent focus:outline-none placeholder-gray-400 font-inter leading-5 font-semibold text-sm"
//           placeholder="Write your message here..."
//           value={bodyField}
//           onChange={(e) => setBodyField(e.target.value)}
//           onInput={handleInput}
//         />
//         {/* Media Preview */}
//         <div className="mt-4">
//           {mediaList.map((media, idx) =>
//             media.endsWith(".mp4") ? (
//               <div key={idx} className="relative w-full mb-4">
//                 <VideoPlayer url={media} />
//                 <IoIosCloseCircle
//                   className="absolute top-2 right-2 text-primary cursor-pointer"
//                   size={30}
//                   onClick={() => handleRemoveMedia(media)}
//                 />
//               </div>
//             ) : (
//               <div key={idx} className="relative w-full mb-4">
//                 <Image
//                   src={media}
//                   alt={`Uploaded media ${idx}`}
//                   width={500}
//                   height={500}
//                   className="rounded-md object-cover"
//                 />
//                 <IoIosCloseCircle
//                   className="absolute top-2 right-2 text-primary cursor-pointer"
//                   size={30}
//                   onClick={() => handleRemoveMedia(media)}
//                 />
//               </div>
//             )
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="w-full flex items-center justify-between p-4 bg-secondary border-t">
//         <div className="flex space-x-4">
//           <label className="cursor-pointer">
//             <FaImage size={20} title="Upload Image" />
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => handleUpload(e, "image")}
//             />
//           </label>
//           <label className="cursor-pointer">
//             <FaVideo size={22} title="Upload Video" />
//             <input
//               type="file"
//               accept="video/mp4"
//               className="hidden"
//               onChange={(e) => handleUpload(e, "video")}
//             />
//           </label>
//         </div>

//         <div className="flex justify-end items-center gap-2">
//           {options.length > 0 && (
//             <div
//               className="relative md:px-5 p-3 py-2 w-[175px] bg-ternary rounded-lg text-sm flex items-center space-x-2 hover:brightness-105 cursor-pointer"
//               onClick={() => setOpenSearchMenu(true)}
//             >
//               <RiUpload2Fill size={16} />
//               <span className="text-[10px] font-bold flex">
//                 {selectedTribe?.label}
//               </span>
//             </div>
//           )}
//           <Button
//             disabled={!bodyField && mediaList.length === 0}
//             onClick={!postLoading && handlePost}
//             className="bg-primary hover:bg-primary-dark text-xs"
//           >
//             {postLoading ? (
//               <Loader variant="dots" size={20} color="white" />
//             ) : (
//               "Post"
//             )}
//           </Button>
//         </div>
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <Loader />
//         </div>
//       )}

//       {openSearchMenu ? (
//         <SearchOptionsMenu
//           setClose={setOpenSearchMenu}
//           selectedOpt={selectedTribe}
//           setSelectedOpt={setSelectedTribe}
//           list={postTribeList}
//         />
//       ) : null}
//     </div>
//   );
// };

// const PostMessageField: React.FC<{
//   onClickPost: ({ message, media, selectedTribe }) => void;
//   theme: string;
//   shout?: boolean;
//   feedName?: string;
//   postTribeList?: Array<{ id: string; label: string }>;
//   activePostTribe: any;
// }> = ({
//   onClickPost,
//   theme,
//   shout = false,
//   feedName = " Public Feed ",
//   postTribeList = [],
//   activePostTribe = [],
// }) => {
//   const [openModel, setOpenModel] = useState<boolean>(false);
//   const { data: session } = useSession();
//   const router = useRouter();

//   function handelModel() {
//     if (session?.user.id) {
//       setOpenModel(true);
//     } else {
//       router.push("/api/auth/signin");
//     }
//   }

//   return (
//     <>
//       <div
//         className="relative w-full h-[80px] border-b-[0.1px] border-[#f5f5f54a] py-4 flex justify-between items-center gap-5  cursor-pointer select-none "
//         onClick={handelModel}
//       >
//         <div className="h-full  flex justify-start items-center gap-5">
//           <div className="relative h-full w-[50px] ">
//             <Image
//               src={"/images/user.png"}
//               alt="user avatar"
//               width={500}
//               height={500}
//               className="relative w-full h-full object-cover"
//             />
//           </div>
//           <article className="flex-1 md:text-md text-sm select-none">
//             {shout ? "Post Your Shout...." : "Whats Happening...."}
//           </article>
//         </div>

//         <div className="h-full  flex justify-start items-center gap-5 px-4">
//           <FaImage size={20} color={theme} />
//           <FaVideo size={20} color={theme} />
//         </div>
//       </div>

//       {openModel ? (
//         <ModelVr_O
//           open={openModel}
//           setHandleOpen={setOpenModel}
//           childExtraClass={`md:w-[60vw] w-[90vw]`}
//         >
//           <PostModel
//             feedName={feedName}
//             setOpenModel={setOpenModel}
//             onClickPost={onClickPost}
//             isShout={shout}
//             postTribeList={postTribeList}
//             activePostTribe={activePostTribe}
//           />
//         </ModelVr_O>
//       ) : null}
//     </>
//   );
// };

// export default PostMessageField;

// // const PostModelContentHeader: React.FC<{
// //   feedName: string;
// //   isShout: boolean;
// // }> = ({ feedName, isShout }) => {
// //   return (
// //     <div className="sticky top-0 w-full h-full py-10 flex  flex-col justify-center items-center bg-secondary z-10">
// //       <article className="font-bold">
// //         Write a {isShout ? "Shout" : "Post"}
// //       </article>
// //       <article className="text-xs text-primary">{feedName}</article>
// //     </div>
// //   );
// // };

// // const PostModelContentBody: React.FC<{
// //   bodyFeild: string;
// //   setBodyFeild: React.Dispatch<React.SetStateAction<string>>;
// // }> = ({ bodyFeild, setBodyFeild }) => {

// //   const textareaRef = useRef<HTMLTextAreaElement>(null);

// //   const handleInput = () => {
// //     if (textareaRef.current) {
// //       textareaRef.current.style.height = "auto";
// //       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
// //     }
// //   };

// //   useEffect(() => {
// //     handleInput();
// //   }, []);

// //   return (
// //     <div className="w-full h-auto outline-none border-0 p-5">
// //       <textarea
// //         ref={textareaRef}
// //         placeholder="Write here..."
// //         className="w-full h-full resize-none border-0 bg-transparent outline-none focus:outline-none placeholder:font-semibold font-semibold"
// //         style={{
// //           outline: "none",
// //           border: "none",
// //           overflow: "hidden",
// //           WebkitAppearance: "none",
// //           MozAppearance: "none",
// //         }}
// //         onChange={(e) => setBodyFeild(e.target.value)}
// //         value={bodyFeild}
// //         onInput={handleInput}
// //       ></textarea>

// //       <div className="w-full h-auto p-5"></div>
// //     </div>
// //   );
// // };

// // const PostModelContentMedia: React.FC<{
// //   mediaList: string[];
// //   setMediaList: (state: string[]) => void;
// // }> = ({ mediaList, setMediaList }) => {
// //   const handleRemoveMedia = (url: string) => {
// //     setMediaList(mediaList.filter((media) => media !== url));
// //   };

// //   const MediaImageCard: React.FC<{ url: string }> = ({ url }) => {
// //     return (
// //       <div className="relative w-full h-auto p-5 ">
// //         <div className="relative">
// //           <Image
// //             src={url}
// //             alt={url}
// //             width={500}
// //             height={500}
// //             className="relative w-full min-w-full max-w-[600px] h-auto object-cover rounded-md  overflow-hidden "
// //           />
// //           <div className="absolute top-5 right-5">
// //             <IoIosCloseCircle
// //               className="text-primary cursor-pointer"
// //               size={30}
// //               onClick={() => handleRemoveMedia(url)}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const MediaVideoCard: React.FC<{ url: string }> = ({ url }) => {
// //     return (
// //       <div className="relative w-[600px] h-[500px] p-5 ">
// //         <video
// //           src={url}
// //           controls
// //           className="relative w-full h-auto object-cover rounded-md  overflow-hidden "
// //         ></video>

// //         <div className="absolute top-14 right-14 bg-white rounded-full">
// //           <IoIosCloseCircle
// //             className="text-primary cursor-pointer"
// //             size={30}
// //             onClick={() => handleRemoveMedia(url)}
// //           />
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="w-full">
// //       {mediaList.map((media, idx) => {
// //         if (
// //           media.split("/")[media.split("/").length - 1].split(".")[1] == "mp4"
// //         ) {
// //           return <MediaVideoCard key={idx + media.split(".")[0]} url={media} />;
// //         } else {
// //           return <MediaImageCard key={idx + media.split(".")[0]} url={media} />;
// //         }
// //       })}
// //     </div>
// //   );
// // };

// // interface PostModelContentProps {
// //   feedName: string;
// //   onClickPost: ({ message, media }) => void;
// //   setOpenModel: (state: boolean) => void;
// //   isShout: boolean;
// //   postTribeList: Array<{ id: string; label: string }>;
// // }

// // const PostModelContent: React.FC<PostModelContentProps> = ({
// //   feedName,
// //   onClickPost,
// //   setOpenModel,
// //   isShout,
// //   postTribeList,
// // }) => {
// //   const [bodyFeild, setBodyFeild] = useState("");
// //   const [loading, setLoading] = useState<Boolean>(false);
// //   const [mediaList, setMediaList] = useState([]);
// //   const [selectedTribe, setSelectedTribe] = useState<any>(
// //     postTribeList[0] || null
// //   );

// //   //   setLoading(true);
// //   //   const file = e.target.files && e.target.files[0];

// //   //   const backblazeImage = await callAPI({
// //   //     endpoint: "/api/image/uploadBackBlaze",
// //   //     method: "GET",
// //   //     params: { bucketType: "public" },
// //   //   });

// //   //   if (backblazeImage.uploadUrl) {
// //   //     const uploadUrl = backblazeImage.uploadUrl;
// //   //     const authToken = backblazeImage.authorizationToken;

// //   //     if (file.name) {
// //   //       const extn = file.name.split(".");
// //   //       const imageName = `${extn[0]}_postImage.${extn[1] || "png"}`;
// //   //       const response = await uploadImageToBackblaze(
// //   //         file,
// //   //         `posts/image/${imageName}`,
// //   //         uploadUrl,
// //   //         authToken
// //   //       );

// //   //       if (response) {
// //   //         setMediaList((prev) => [
// //   //           ...prev,
// //   //           `https://${process.env.NEXT_PUBLIC_BACKBLAZE_PUBLIC_DOMAIN}/file/mvpz-src-public/posts/image/${imageName}`,
// //   //         ]);
// //   //         setLoading(false);
// //   //       }
// //   //     }
// //   //   }
// //   // };

// //   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setLoading(true);
// //     const file = e.target.files && e.target.files[0];

// //     const backblazeImage = await callAPI({
// //       endpoint: "/api/image/uploadBackBlaze",
// //       method: "GET",
// //       params: { bucketType: "public" },
// //     });

// //     if (backblazeImage.uploadUrl) {
// //       const uploadUrl = backblazeImage.uploadUrl;
// //       const authToken = backblazeImage.authorizationToken;

// //       if (file.name) {
// //         const extn = file.name.split(".");
// //         const baseName = extn[0].replace(/\s+/g, "_");
// //         const imageName = `${baseName}_postImage.${
// //           extn[extn?.length - 1] || "png"
// //         }`;
// //         const response = await uploadImageToBackblaze(
// //           file,
// //           `posts/image/${imageName}`,
// //           uploadUrl,
// //           authToken
// //         );

// //         if (response) {
// //           setMediaList((prev) => [
// //             ...prev,
// //             `https://${process.env.NEXT_PUBLIC_BACKBLAZE_PUBLIC_DOMAIN}/file/mvpz-src-public/posts/image/${imageName}`,
// //           ]);
// //           setLoading(false);
// //         }
// //       }
// //     }
// //   };

// //   const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setLoading(true);
// //     const file = e.target.files && e.target.files[0];

// //     const backblazeImage = await callAPI({
// //       endpoint: "/api/image/uploadBackBlaze",
// //       method: "GET",
// //       params: { bucketType: "public" },
// //     });

// //     if (backblazeImage.uploadUrl) {
// //       const uploadUrl = backblazeImage.uploadUrl;
// //       const authToken = backblazeImage.authorizationToken;

// //       if (file.name) {
// //         const extn = file.name.split(".").pop(); // Get the last part as the file extension
// //         const baseName = file.name
// //           .split(".")
// //           .slice(0, -1)
// //           .join(".")
// //           .replace(/\s+/g, "_");
// //         const videoName = encodeURIComponent(
// //           `${baseName}_postVideo.${extn || "mp4"}`
// //         );

// //         const response = await uploadImageToBackblaze(
// //           file,
// //           `posts/video/${videoName}`,
// //           uploadUrl,
// //           authToken
// //         );

// //         if (response) {
// //           setMediaList((prev) => [
// //             ...prev,
// //             `https://${process.env.NEXT_PUBLIC_BACKBLAZE_PUBLIC_DOMAIN}/file/mvpz-src-public/posts/video/${videoName}`,
// //           ]);
// //           setLoading(false);
// //         }
// //       }
// //     }
// //   };

// //   const onHandlePost = () => {
// //     if (bodyFeild || mediaList?.length > 0) {
// //       let data = {
// //         message: bodyFeild,
// //         media: mediaList,
// //         selectedTribe,
// //       };

// //       onClickPost(data);
// //       setOpenModel(false);
// //     }
// //   };

// //   const PostModelContentFooter: React.FC<{
// //     handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
// //     handleVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
// //   }> = ({ handleImageUpload, handleVideoUpload }) => {
// //     return (
// //       <div className="relative md:w-[60vw] w-[90vw] bg-secondary ">
// //         <div className="w-full h-[0.5px] bg-white bg-opacity-[0.5]"></div>
// //         <div className="flex justify-between item-center p-5">
// //           <div className="flex justify-start items-center space-x-5 ">
// //             <div className="relative overflow-hidden">
// //               <FaImage
// //                 size={20}
// //                 title="Upload Image"
// //                 className="cursor-pointer relative z-0"
// //               />
// //               <input
// //                 type="file"
// //                 accept="image/gif, image/jpeg, image/jpg, image/png"
// //                 onChange={handleImageUpload}
// //                 className="absolute z-5 top-0 left-0 w-full h-full opacity-0 cursor-pointer"
// //               />
// //             </div>
// //             <div className="relative overflow-hidden">
// //               <FaVideo
// //                 size={22}
// //                 title="Upload Video"
// //                 className="cursor-pointer relative z-0"
// //               />
// //               <input
// //                 type="file"
// //                 accept="video/mp4"
// //                 onChange={handleVideoUpload}
// //                 className="absolute z-5 top-0 left-0 w-full h-full opacity-0 cursor-pointer"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex justify-start items-center md:space-x-5 space-x-3">
// //             {postTribeList.length > 0 && (
// //               <MenuOptions
// //                 options={postTribeList}
// //                 onSelect={(option) => setSelectedTribe(option)}
// //                 position="top"
// //               >
// //                 <div className="md:px-5 p-3 md:h-[40px] h-[30px] bg-ternary rounded-lg text-sm flex items-center space-x-4 hover:brightness-105 cursor-pointer">
// //                   <RiUpload2Fill size={18} />
// //                   <span className="text-xs font-bold flex">
// //                     {selectedTribe?.label}
// //                   </span>
// //                 </div>
// //               </MenuOptions>
// //             )}

// //             <div
// //               className={`md:px-5 p-3 md:h-[40px] h-[30px] flex justify-center items-center ${
// //                 bodyFeild || mediaList?.length > 0
// //                   ? "bg-primary cursor-pointer"
// //                   : "bg-white bg-opacity-40 cursor-not-allowed"
// //               } rounded-lg md:text-sm text-[10px]  hover:brightness-105`}
// //               onClick={onHandlePost}
// //             >
// //               Post
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <div className=" min-h-[425px] max-h-[600px] w-full  flex flex-col items-center  ">
// //         <PostModelContentHeader feedName={feedName} isShout={isShout} />
// //         {/* Header */}
// //         <div className=" w-full min-h-[400px] h-auto overflow-y-auto ">
// //           <PostModelContentBody
// //             bodyFeild={bodyFeild}
// //             setBodyFeild={setBodyFeild}
// //           />
// //           <PostModelContentMedia
// //             mediaList={mediaList}
// //             setMediaList={setMediaList}
// //           />
// //         </div>
// //         <PostModelContentFooter
// //           handleImageUpload={handleImageUpload}
// //           handleVideoUpload={handleVideoUpload}
// //         />
// //       </div>
// //       {loading ? (
// //         <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[100vw] h-[100vh] z-50 flex justify-center items-center backdrop-blur-sm">
// //           <Loader />
// //         </div>
// //       ) : null}
// //     </>
// //   );
// // };

// // const PostUpload = () => {
// //   const [content, setContent] = useState("");

// //   const handleContentChange = (e) => {
// //     setContent(e.target.value);
// //   };

// //   const formatContent = (text) => {
// //     const linkRegex =
// //       /(https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w._~:/?#[\]@!$&'()*+,;=-]*)/g;
// //     const boldRegex = /\*\*(.*?)\*\*/g;
// //     const italicRegex = /\*(.*?)\*/g;

// //     const parts = text
// //       .split(
// //         /(\n|https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w._~:/?#[\]@!$&'()*+,;=-]*)/g
// //       )
// //       .filter(Boolean);

// //     return parts.map((part, index) => {
// //       if (linkRegex.test(part)) {
// //         return (
// //           <a
// //             key={index}
// //             href={part}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="text-blue-500 underline"
// //           >
// //             {part}
// //           </a>
// //         );
// //       } else if (boldRegex.test(part)) {
// //         return (
// //           <strong key={index} className="font-bold">
// //             {part.replace(/\*\*/g, "")}
// //           </strong>
// //         );
// //       } else if (italicRegex.test(part)) {
// //         return (
// //           <em key={index} className="italic">
// //             {part.replace(/\*/g, "")}
// //           </em>
// //         );
// //       } else {
// //         return part.split(/\n/).map((line, i) => (
// //           <React.Fragment key={`${index}-${i}`}>
// //             {line}
// //             <br />
// //           </React.Fragment>
// //         ));
// //       }
// //     });
// //   };

// //   return (
// //     <div className="w-full max-w-2xl mx-auto p-4">
// //       <div className="mb-4 border rounded-md p-2 bg-gray-100">
// //         <div
// //           contentEditable
// //           suppressContentEditableWarning
// //           onInput={(e) => setContent(e.currentTarget.textContent || "")}
// //           className="min-h-32 w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-pre-wrap"
// //         >
// //           {formatContent(content)}
// //         </div>
// //       </div>
// //       <div className="mt-4 text-right">
// //         <button
// //           onClick={() => console.log("Submitted Post:", content)}
// //           className="px-4 py-2 bg-blue-500 text-white rounded-md"
// //         >
// //           Post
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };
