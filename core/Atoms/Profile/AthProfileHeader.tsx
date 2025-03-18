// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { getIcons } from "../../../utils/getIcons";
// import { Button, Loader, NumberInput } from "@mantine/core";
// import {
//   FaEdit,
//   FaEye,
//   FaHandHoldingUsd,
//   FaShare,
//   FaUser,
//   FaUserMinus,
//   FaUserPlus,
// } from "react-icons/fa";
// import { useRouter } from "next/router";
// import ModelVr_O from "../Models/ModelVr_O";
// import SharePost from "../Feed/SharePost";
// import { callAPI } from "../../../lib/utils";
// import { log } from "node:console";
// import { TbCardsFilled } from "react-icons/tb";
// import { MdOutlineOpenInNew } from "react-icons/md";
// import MenuOptions from "../Others/MenuOption";
// import { FiMoreVertical } from "react-icons/fi";
// import { HiCurrencyDollar } from "react-icons/hi";
// import { FaHandHoldingDollar } from "react-icons/fa6";
// import { IoMdClose } from "react-icons/io";
// import { useSession } from "next-auth/react";
// import { IoIdCardSharp } from "react-icons/io5";
// import { notifications } from "@mantine/notifications";

// const AthProfileHeader = ({
//   handleOpenInfoModel,
//   ath,
//   images,
//   handleAddUnfollow = () => {},
//   handleAddFollow = () => {},
//   follwerLoading = false,
//   editable,
//   showFollow,
// }) => {
//   const router = useRouter();
//   const [selectedBanner, setSelectedBanner] = useState("");
//   const [selectedImage, setSelectedImage] = useState("");
//   const [openShareModel, setOpenShareModel] = useState(false);
//   const [openTipModel, setOpenTipModel] = useState(false);
//   const [tipValue, setTipValue] = useState(0.5);
//   const [customTip, setCustomTip] = useState(false);
//   const [processLoading, setProcessLoading] = useState(false);
//   const [tipLimitExcced, setTipLimitExcced] = useState(false);
//   const [tipLimitMsg, setTipLimitMsg] = useState("");
//   const { data: session } = useSession();

//   const handleOpenShare = () => {
//     setOpenShareModel(true);
//   };

//   const handleSelectOptions = (val) => {
//     switch (val?.id) {
//       case "profileCard":
//         router.push(
//           `/athlete/${ath?.user?.username || ath?.username}/profilecard`
//         );
//         return;
//       case "share":
//         handleOpenShare();
//         return;
//       case "follow":
//         handleAddFollow();
//         return;
//       case "unfollow":
//         handleAddFollow();
//         return;
//       case "tip":
//         setOpenTipModel(true);
//         return;
//       case "edit":
//         router.push("/profile");
//         return;
//     }
//   };

//   const handleTip = async (amount) => {

//      if (
//           amount >ath?.user?.tipPriceRange?.maxTip ||
//           amount <ath?.user?.tipPriceRange?.minTip
//         ) {
//           return notifications.show({
//             message: `Tips must be between $${ath?.user?.tipPriceRange?.minTip} and $${ath?.user?.tipPriceRange?.maxTip}.`,
//           });
//         }

//     setProcessLoading(true);

//     let response;

//     response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/tip/tribeAthlete/initiate`,
//       method: "POST",
//       body: {
//         fromUserId: session?.user?.id,
//         toUserId: ath?.user?.id,
//         tipAmount: amount,
//         callbackURL: `/fanzone/tribe/profile/athlete/${ath?.user?.username}`,
//       },
//     });

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
//       <div className="relative w-full flexflex-col justify-start items-center bg-secondary rounded-md  overflow-hidden">
//         {/*  */}
//         <div className="relative w-full md:h-[225px] h-[150px] bg-ternary">
//           {images?.bannerImage ? (
//             <Image
//               src={images?.bannerImage}
//               alt="athelet banner"
//               width={500}
//               height={500}
//               className="relative w-full h-full object-cover object-center"
//               onClick={handleOpenInfoModel}
//             />
//           ) : (
//             <Image
//               src={`/images/profilebanner.png`}
//               alt="athelet banner"
//               width={500}
//               height={500}
//               className="relative w-full h-full object-cover object-center "
//               onClick={handleOpenInfoModel}
//             />
//           )}
//         </div>
//         {/*  */}
//         <div className="relative w-full h-full flex flex-col justify-start items-start space-x-5 z-10  md:px-10 p-5">
//           <div className="md:w-[200px] w-[125px]   md:h-[200px] h-[125px] bg-secondary p-2 rounded-full md:-mt-28 -mt-20 overflow-hidden mb-5  ">
//             <div className="w-full h-full rounded-full bg-ternary flex justify-center items-center">
//               {images?.profileImage ? (
//                 <Image
//                   src={images?.profileImage}
//                   alt="user profile"
//                   title={images?.name}
//                   width={500}
//                   height={500}
//                   className="relative w-full h-full object-cover rounded-full overflow-hidden  hover:brightness-75"
//                   onClick={handleOpenInfoModel}
//                 />
//               ) : (
//                 <FaUser className="md:text-[50px] text-[25px] opacity-50" />
//               )}
//             </div>
//           </div>
//           <div className="w-full flex-1 flex flex-col justify-center items-start space-y-3  pb-10">
//             <div className="relative">
//               <div className="flex justify-start items-center space-x-4">
//                 <article className="text-white md:text-2xl text-base ">
//                   {ath?.user?.name || ath?.name}
//                 </article>
//               </div>
//               <article className="block text-[10px] mt-1">
//                 {ath?.user?.currentSchool}
//               </article>{" "}
//               <div className="flex justify-start items-center span-x-4 mt-2 ">
//                 <div className="flex justify-start items-center  text-white opacity-50 cursor-pointer ">
//                   <article className="md:block hidden  text-[10px]">
//                     {ath?.user?.aboutMe?.length > 200
//                       ? `${ath?.user?.aboutMe?.substring(0, 200)}...`
//                       : ath?.user?.aboutMe}
//                   </article>{" "}
//                   <article className="md:hidden block  text-[10px]">
//                     {ath?.user?.aboutMe?.length > 150
//                       ? `${ath?.user?.aboutMe?.substring(0, 150)}...`
//                       : ath?.user?.aboutMe}
//                   </article>{" "}
//                 </div>
//               </div>
//             </div>
//             <article
//               className="text-xs cursor-pointer text-primary mb-5"
//               onClick={handleOpenInfoModel}
//             >
//               About Info
//             </article>
//           </div>
//           <div className="absolute top-0 right-0 md:p-4 py-5 p-4  flex justify-end items-center space-x-2">
//             <div className="flex justify-center items-center gap-5 mr-2">
//               <div
//                 className=" md:text-sm text-xs  cursor-pointer flex justify-start items-center  gap-2 z-10 "
//                 onClick={() =>
//                   router.push(
//                     `/athlete/${
//                       ath?.user?.username || ath?.username
//                     }/profilecard`
//                   )
//                 }
//               >
//                 <IoIdCardSharp size={20} />
//               </div>

//               <div
//                 className="  md:text-sm text-xs  cursor-pointer flex justify-start items-center  gap-2 z-10 "
//                 onClick={() => setOpenTipModel(true)}
//               >
//                 <FaHandHoldingUsd size={20} />
//               </div>
//             </div>
//             <div className="md:block hidden">
//               {editable && (
//                 <div
//                   className="px-3 py-2 md:text-sm text-xs rounded-md bg-primary cursor-pointer flex justify-start items-center  gap-2 z-10 "
//                   onClick={() => router.push("/profile")}
//                 >
//                   <FaEdit />
//                   <article className="text-[10px]">Edit</article>
//                 </div>
//               )}
//             </div>
//             <div className="md:block hidden">
//               {showFollow && (
//                 <>
//                   {ath?.user?.isFollowing ? (
//                     <div
//                       className="px-3 py-2 md:text-sm text-xs rounded-md bg-red-700 cursor-pointer flex justify-start items-center gap-2 z-10"
//                       onClick={() => handleAddUnfollow()}
//                     >
//                       <FaUserMinus />
//                       <article className="text-[10px]">Unfollow</article>{" "}
//                       {follwerLoading && <Loader color="white" size={15} />}
//                     </div>
//                   ) : (
//                     <div
//                       className="px-3 py-2  md:text-sm text-xs rounded-md bg-primary cursor-pointer flex justify-start items-center gap-2 z-10"
//                       onClick={() => handleAddFollow()}
//                     >
//                       <FaUserPlus />
//                       <article className="text-[10px]">Follow</article>{" "}
//                       {follwerLoading && <Loader color="white" size={15} />}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>

//             <div className="md:block hidden">
//               <MenuOptions
//                 options={[
//                   {
//                     id: "share",
//                     label: "Share",
//                     icon: <FaShare />,
//                     iconPosition: "left",
//                   },
//                 ]}
//                 onSelect={(val) => handleSelectOptions(val)}
//                 position="left"
//               >
//                 <FiMoreVertical />
//               </MenuOptions>
//             </div>

//             <div className="md:hidden block">
//               <MenuOptions
//                 options={
//                   showFollow
//                     ? [
//                         !ath?.isFollowing
//                           ? {
//                               id: "follow",
//                               label: "Follow",
//                               icon: <FaUserPlus />,
//                               iconPosition: "left",
//                             }
//                           : {
//                               id: "unfollow",
//                               label: "Unfollow",
//                               icon: <FaUserMinus />,
//                               iconPosition: "left",
//                             },

//                         {
//                           id: "share",
//                           label: "Share",
//                           icon: <FaShare />,
//                           iconPosition: "left",
//                         },
//                       ]
//                     : [
//                         {
//                           id: "edit",
//                           label: "Edit",
//                           icon: <FaEdit />,
//                           iconPosition: "left",
//                         },

//                         {
//                           id: "share",
//                           label: "Share",
//                           icon: <FaShare />,
//                           iconPosition: "left",
//                         },
//                       ]
//                 }
//                 onSelect={(val) => handleSelectOptions(val)}
//                 position="left"
//               >
//                 <FiMoreVertical />
//               </MenuOptions>
//             </div>
//           </div>
//         </div>
//         {/*  */}
//         <div className="absolute top-0 right-0 p-4 flex justify-end items-center space-x-5 ">
//           {ath?.user?.socialLinks?.map((link) => {
//             return (
//               <a href={link?.link} target="_blank">
//                 {getIcons(link?.socialBrand)}
//               </a>
//             );
//           })}
//         </div>
//       </div>
//       {selectedBanner && (
//         <ModelVr_O
//           open={!!selectedBanner}
//           setHandleOpen={() => setSelectedBanner("")}
//           extraClass="!bg-transparent"
//         >
//           <div className="w-[80vw] md:p-10 p-5 flex justify-center items-center">
//             <Image
//               src={selectedBanner}
//               alt="banner"
//               width={500}
//               height={500}
//               className="relative w-full"
//             />
//           </div>
//         </ModelVr_O>
//       )}
//       {selectedImage && (
//         <ModelVr_O
//           open={!!selectedImage}
//           setHandleOpen={() => setSelectedImage("")}
//           extraClass="!bg-transparent"
//         >
//           <div className=" p-10 flex justify-center items-center">
//             <Image
//               src={selectedImage}
//               alt="banner"
//               width={500}
//               height={500}
//               className="relative w-[200px] h-"
//             />
//           </div>
//         </ModelVr_O>
//       )}

//       {openShareModel && (
//         <ModelVr_O
//           open={openShareModel}
//           setHandleOpen={setOpenShareModel}
//           extraClass="!z-50"
//         >
//           <>
//             <SharePost
//               title="Share Profile Card"
//               pathname={`/athlete/${ath?.user?.username}/profilecard?referralCode=${ath?.user?.referral?.inviteCode}`}
//               showPreview
//               privewTitle="Open"
//               previewIcon={() => <MdOutlineOpenInNew />}
//             />
//           </>
//         </ModelVr_O>
//       )}

//       {openTipModel && (
//         <ModelVr_O
//           open={openTipModel}
//           setHandleOpen={() => {
//             setOpenTipModel(false), setCustomTip(false);
//           }}
//           extraClass="!z-50"
//         >
//           <>
//             <div className="w-full  p-5 bg-ternary rounded-md">
//               {/* close  */}

//               <article className="mb-2">
//                 Tip {ath?.user?.postedBy?.username}
//               </article>
//               <article className="text-[10px] opacity-50 mb-8">
//                 Support {ath?.user?.postedBy?.username} with a small tip and
//                 message of encouragement!
//               </article>
//               <>
//                 {tipLimitExcced ? (
//                   <div className="w-full">
//                     <article className="text-[10px] text-red-500 mb-2">
//                       {tipLimitMsg}
//                     </article>
//                     <div
//                       className="inline-flex py-1 px-3 text-[10px] bg-red-500 text-white rounded-md cursor-pointer"
//                       onClick={() => setOpenTipModel(false)}
//                     >
//                       Close
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     {processLoading ? (
//                       <div className="w-full pb-5 flex flex-col justify-center items-start">
//                         <article className="text-[10px] mb-2">
//                           Hang tight, we're getting things ready for you!
//                         </article>
//                         <Loader variant="dots" color="white" size={20} />
//                       </div>
//                     ) : (
//                       <>
//                         {!customTip ? (
//                           <>
//                             {/* <div className="flex flex-wrap justify-center items-center gap-2 ">
//                                              <div
//                                                className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                                onClick={() => handleTip(0.5)}
//                                              >
//                                                Tip $.50
//                                              </div>
//                                              <div
//                                                className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                                onClick={() => handleTip(1)}
//                                              >
//                                                Tip $1
//                                              </div>
//                                              <div
//                                                className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                                onClick={() => handleTip(5)}
//                                              >
//                                                Tip $5
//                                              </div>
//                                              <div
//                                                className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                                onClick={() => handleTip(10)}
//                                              >
//                                                Tip $10
//                                              </div>
//                                              <div
//                                                className="py-2 px-3 bg-primary rounded-md cursor-pointer  hover:brightness-110 text-[10px]"
//                                                onClick={() => setCustomTip(true)}
//                                              >
//                                                Custom Tip
//                                              </div>
//                                            </div> */}
//                             <div className="grid grid-cols-5">
//                               <div
//                                 className="flex flex-col justify-center items-center gap-1"
//                                 onClick={() => handleTip(0.5)}
//                               >
//                                 <Image
//                                   src={`/images/tips/tip1.png`}
//                                   alt="tip1"
//                                   width={500}
//                                   height={500}
//                                   className="relative w-8 h-8 object-cover"
//                                 />
//                                 <article className="text-xs"> $.50</article>
//                               </div>
//                               <div
//                                 className="flex flex-col justify-center items-center gap-1"
//                                 onClick={() => handleTip(1)}
//                               >
//                                 <Image
//                                   src={`/images/tips/tip2.png`}
//                                   alt="tip1"
//                                   width={500}
//                                   height={500}
//                                   className="relative w-8 h-8 object-cover"
//                                 />
//                                 <article className="text-xs"> $1</article>
//                               </div>
//                               <div
//                                 className="flex flex-col justify-center items-center gap-1"
//                                 onClick={() => handleTip(5)}
//                               >
//                                 <Image
//                                   src={`/images/tips/tip3.png`}
//                                   alt="tip1"
//                                   width={500}
//                                   height={500}
//                                   className="relative w-8 h-8 object-cover"
//                                 />
//                                 <article className="text-xs"> $5</article>
//                               </div>
//                               <div
//                                 className="flex flex-col justify-center items-center gap-1"
//                                 onClick={() => handleTip(10)}
//                               >
//                                 <Image
//                                   src={`/images/tips/tip4.png`}
//                                   alt="tip1"
//                                   width={500}
//                                   height={500}
//                                   className="relative w-8 h-8 object-cover"
//                                 />
//                                 <article className="text-xs"> $10</article>
//                               </div>
//                               <div
//                                 className="flex flex-col justify-center items-center gap-1"
//                                 onClick={() => setCustomTip(true)}
//                               >
//                                 <Image
//                                   src={`/images/tips/tip5.png`}
//                                   alt="tip1"
//                                   width={500}
//                                   height={500}
//                                   className="relative w-8 h-8 object-cover"
//                                 />
//                                 <article className="text-xs text-center">
//                                   {" "}
//                                   Custom Tip
//                                 </article>
//                               </div>
//                             </div>
//                           </>
//                         ) : (
//                           <div className="relative w-full md:pb-18 pb-14">
//                             <div className="relative w-full rounded-md border border-white border-opacity-40">
//                               <input
//                                 type="number"
//                                 step={0.5}
//                                 min={ath?.user?.tipPriceRange?.minTip}
//                                 max={ath?.user?.tipPriceRange?.maxTip}
//                                 placeholder="Enter Tip Amount"
//                                 value={tipValue}
//                                 onChange={(e) =>
//                                   setTipValue(
//                                     Number(e.target.value)
//                                   )
//                                 }
//                                 className="relative w-full p-2 rounded-md pl-7"
//                               />
//                               <article className="absolute top-1/2 -translate-y-1/2 left-2 text-sm">
//                                 $
//                               </article>
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </>
//                 )}
//               </>
//               {/* Tip Button */}
//               {customTip && !processLoading && (
//                 <div className="absolute bottom-5 -right-2 w-[150px]">
//                   <Button
//                     onClick={() => handleTip(tipValue)}
//                     style={{
//                       fontSize: "10px",
//                     }}
//                   >
//                     Tip ${tipValue}
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </>
//         </ModelVr_O>
//       )}
//     </>
//   );
// };

// export default AthProfileHeader;
