// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { MdEdit } from "react-icons/md";
// import { callAPI, downloadFile } from "../../../lib/utils";
// import { Loader } from "@mantine/core";
// import ModelVr_O from "../../Atoms/Models/ModelVr_O";
// import CardEditor from "../Cards/CardEditior";
// import { useSession } from "next-auth/react";
// import Tooltip from "../../Atoms/Others/Tooltip";
// const AtheletCreateCard = ({ ath, viewMode }) => {
//   console.log({ ath });

//   const [cardInfo, setCardInfo] = useState<any>();
//   const [cardImage, setCardImage] = useState("");
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploadPhoto, setUploadPhoto] = useState(false);
//   const { data: session } = useSession();
//   const [requestCardDetails, setRequestCardDetails] = useState(null);
//   const [requestLoading, setRequestLoading] = useState(false);

//   async function downloadUserImages(_user, authToken, url) {
//     let downloadedImages = {} as any;
//     if (_user?.cardImageNFT) {
//       downloadedImages.cardImage = await downloadFile(
//         `${url}/file/mvpz-nfts/${_user?.cardImageNFT}`,
//         authToken
//       );
//     }
//     return downloadedImages?.cardImage;
//   }

//   const fetchCard = async () => {
//     setLoading(true);
//     let response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/athlete/card/${
//         ath?.id || ath?.user?.id
//       }`,
//     });

//     if (response) {
//       setCardInfo(response?.card);
//       setCardImage(
//         await downloadUserImages(
//           response?.card,
//           response?.imageDownload?.authorizationToken,
//           response?.imageDownload?.downloadUrl
//         )
//       );
//       fetchProducts();
//     }
//     setLoading(false);
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
//     fetchCard();
//   }, [ath]);

//   const handleOpenEditior = () => {
//     if (!requestLoading) {
//       setUploadPhoto(true);
//     }
//   };

//   const HandleClose = () => {
//     setUploadPhoto(false);
//   };

//   function getCurrentYearArray() {
//     const currentYear = new Date().getFullYear().toString();
//     return currentYear;
//   }

//   function getRemainingTime(targetDate: Date | string): string {
//     // Ensure targetDate is a Date instance
//     if (typeof targetDate === "string") {
//       targetDate = new Date(targetDate);
//     }

//     const now = new Date();

//     // Add 24 hours to the targetDate in milliseconds
//     const targetDatePlus24Hr = new Date(
//       targetDate.getTime() + 24 * 60 * 60 * 1000
//     );

//     // Calculate the difference in milliseconds
//     const remainingTimeMs = targetDatePlus24Hr.getTime() - now.getTime();

//     // Helper function to convert milliseconds to hours, minutes, and seconds
//     function msToTime(ms: number): string {
//       if (ms <= 0) return "00:00:00"; // Only returns "00:00:00" if time is negative
//       const hours = Math.floor(ms / (1000 * 60 * 60))
//         .toString()
//         .padStart(2, "0");
//       const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
//         .toString()
//         .padStart(2, "0");
//       // const seconds = Math.floor((ms % (1000 * 60)) / 1000).toString().padStart(2, '0');
//       return `${hours} hr : ${minutes} min`;
//     }

//     // Return remaining time in HH:MM:SS format
//     return msToTime(remainingTimeMs);
//   }

//   async function fetchRequestCard() {
//     setRequestLoading(true);
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/athlete/request_details`,
//       method: "GET",
//     });

//     if (response) {
//       setRequestCardDetails(response);
//     }
//     setRequestLoading(false);
//   }

//   useEffect(() => {
//     fetchRequestCard();
//   }, []);

//   return (
//     <>
//       <div className="w-full space-y-14">
//         <div className="relative py-5 flex justify-between items-center">
//           <article className="text-2xl font-bold">Card</article>
//           <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
//         </div>
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <Loader />
//           </div>
//         ) : (
//           <div className="w-full md:h-[650px] rounded-md bg-secondary p-5 flex  md:flex-row flex-col-reverse justify-start items-center gap-5">
//             <div className="relative flex flex-col md:w-[60%] w-full  ">
//               <div className="relative w-full bg-ternary h-[520px] rounded-md z-0">
//                 <Image
//                   src={cardImage || "/images/card-backside.png"}
//                   alt="card123"
//                   width={500}
//                   height={500}
//                   className="relative w-full h-full object-cover overflow-hidden rounded-md z-0"
//                 />
//               </div>
//               <div className="flex flex-col justify-start items-center my-5">
//                 {requestCardDetails?.crad ? (
//                   <div
//                     className="px-5 py-2  w-[250px] h-[40px] flex justify-center items-center bg-primary rounded-md cursor-pointer"
//                     onClick={handleOpenEditior}
//                   >
//                     {requestLoading ? (
//                       <Loader color="white" size={15} />
//                     ) : requestCardDetails?.card?.cardApproval !==
//                         "AthleteUploadedReject" &&
//                       requestCardDetails?.card?.cardApproval !==
//                         "NotRequested" ? (
//                       "Card in Progress"
//                     ) : requestCardDetails?.card?.cardApproval !==
//                       "AthleteUploadedReject" ? (
//                       "Create Card"
//                     ) : (
//                       "Recreate Card"
//                     )}
//                   </div>
//                 ) : (
//                   <div
//                     className="px-5 py-2  w-[250px] h-[40px] flex justify-center items-center bg-primary rounded-md cursor-pointer"
//                     onClick={handleOpenEditior}
//                   >
//                     Create Card
//                   </div>
//                 )}
//               </div>
//               {/* <div className="absolute top-5 right-5">
//                 <MdEdit
//                   size={30}
//                   className="cursor-pointer"
//                   onClick={HandleOpen}
//                 />
//               </div> */}
//             </div>
//             <div className="w-[0.5px] h-full bg-white opacity-20"></div>
//             <div className=" flex md:w-[40%] w-full h-full flex-col justify-start items-start space-y-10 overflow-y-auto ">
//               <div className="w-full space-y-10">
//                 <div className="w-full space-y-4">
//                   <div className="flex flex-col justify-start items-start">
//                     <article className="tesm">Sport</article>
//                     <article className="text-[10px] opacity-50">
//                       {cardInfo?.sport || session?.user?.primarySport}
//                     </article>
//                   </div>
//                   <div className="flex flex-col justify-start items-start">
//                     <article className="tesm">Position</article>
//                     <article className="text-[10px] opacity-50">
//                       {cardInfo?.position || session?.user?.primaryPosition}
//                     </article>
//                   </div>
//                   <div className="flex flex-col justify-start items-start">
//                     <article className="tesm">School</article>
//                     <article className="text-[10px] opacity-50">
//                       {cardInfo?.school || session?.user?.currentSchool}
//                     </article>
//                   </div>
//                 </div>
//                 <div className="w-full h-[1px] bg-white opacity-50 mt-10"></div>
//               </div>
//               <div className=" w-full space-y-10">
//                 <div className="w-full space-y-4">
//                   <div className="flex flex-col justify-start items-start">
//                     <article className="tesm">Special</article>
//                     <article className="text-[10px] opacity-50">
//                       {cardInfo?.special || "First Edition"}
//                     </article>
//                   </div>
//                   <div className="flex flex-col justify-start items-start">
//                     <article className="tesm">Collection</article>
//                     <article className="text-[10px] opacity-50">
//                       {cardInfo?.edition || "MVPz - Gen1"}
//                     </article>
//                   </div>
//                   <div className="flex flex-col justify-start items-start">
//                     <article className="tesm">Year</article>
//                     <article className="text-[10px] opacity-50">
//                       {cardInfo?.year || getCurrentYearArray()}
//                     </article>
//                   </div>
//                 </div>
//                 <div className="w-full h-[1px] bg-white opacity-50"></div>
//               </div>

//               <div className=" w-full space-y-10">
//                 <div className="w-full space-y-4">
//                   <div className="flex flex-col justify-start items-start">
//                     <article className="tesm">Design</article>
//                     <article className="text-[10px] opacity-50">
//                       {cardInfo?.design || "Base"}
//                     </article>
//                   </div>
//                   <div className="flex flex-col justify-start items-start">
//                     <article className="tesm">Designer</article>
//                     <article className="text-[10px] opacity-50">
//                       {cardInfo?.designer || "Joe Johnson"}
//                     </article>
//                   </div>
//                 </div>
//               </div>
//               {/* <div className=" w-full space-y-10">
//             <div className="w-full space-y-4">
//               <div className="flex flex-col justify-start items-start">
//                 <article className="tesm">Purchased On</article>
//                 <article className="text-[10px] opacity-50">Sun Oct 20 2024</article>
//               </div>
//               </div>
//           </div> */}
//             </div>
//           </div>
//         )}
//       </div>
//       {uploadPhoto && (
//         <ModelVr_O
//           open={uploadPhoto}
//           setHandleOpen={setUploadPhoto}
//           childExtraClass="!w-[90vw] !max-w-[90vw] "
//         >
//           <div className="w-[90vw] h-[90vh] overflow-y-auto  flex justify-center items-center  ">
//             <CardEditor
//               ath={ath}
//               handleClose={() => setUploadPhoto(false)}
//               requestCardDetails={requestCardDetails}
//               setRequestCardDetails={setRequestCardDetails}
//             />
//           </div>
//         </ModelVr_O>
//       )}
//     </>
//   );
// };

// export default AtheletCreateCard;
