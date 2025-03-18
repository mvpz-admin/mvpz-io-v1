// import { Autocomplete, Input, Loader, Skeleton } from "@mantine/core";
// import React, { useEffect, useState } from "react";
// import SearchField from "../../../core/Atoms/Others/SearchFeild";
// import { FaFilter, FaSearch, FaUser, FaUserSlash } from "react-icons/fa";
// import { IoIosMenu, IoMdClose } from "react-icons/io";
// import { callAPI, downloadFile, SportTeams } from "../../../lib/utils";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import MvpzSearch from "../../../core/Atoms/SearchAthlete/MvpzSearch";
// import { IoGrid } from "react-icons/io5";
// import { FiMenu } from "react-icons/fi";
// import { RiMenu5Fill } from "react-icons/ri";
// import { PiEmptyFill } from "react-icons/pi";

// const AthleteCard = ({ ath, downloadImages }) => {
//   const [images, setImages] = useState<any>({});
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
//     if (_user?.cardImage) {
//       downloadedImages.cardImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${_user?.cardImage}`,
//         authToken
//       );
//     }

//     setImages(downloadedImages);
//   }

//   useEffect(() => {
//     if (downloadImages) {
//       downloadUserImages(
//         ath,
//         downloadImages?.authorizationToken,
//         downloadImages?.downloadUrl
//       );
//     }
//   }, [downloadImages]);

//   return (
//     <div className="w-full h-[300px] rounded-md bg-secondary overflow-hidden">
//       <div className="w-full h-[100px] bg-ternary"></div>
//       <div className="w-full h-[200px] flex flex-col justify-start items-center -mt-10">
//         <div className="w-[150px] h-[150px] p-2 bg-secondary rounded-full overflow-hidden mb-2">
//           <div className="w-full h-full overflow-hidden bg-ternary rounded-full flex justify-center items-center">
//             {images?.profileImage ? (
//               <Image
//                 src={images?.profileImage}
//                 alt="athlete image"
//                 width={500}
//                 height={500}
//                 className="relative w-full h-full object-cover rounded-md"
//               />
//             ) : (
//               <FaUser size={22} />
//             )}
//           </div>
//         </div>
//         <article className="text-sm mb- hover:underline cursor-pointer text-center">
//           {ath?.name}
//         </article>
//         <article className="text-[10px] opacity-50">
//           {ath?.primarySport?.length > 12
//             ? ath?.primarySport?.substring(0, 12) + "..."
//             : ath?.primarySport}
//         </article>
//       </div>
//       <article className="text-[10px] text-primary mt-2 text-center hover:underline cursor-pointer">
//         Claim Profile
//       </article>
//     </div>
//   );
// };

// const AthleteRow = ({ ath, downloadImages }) => {
//   const [images, setImages] = useState<any>({});
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
//     if (_user?.cardImage) {
//       downloadedImages.cardImage = await downloadFile(
//         `${url}/file/mvpz-user-private/${_user?.cardImage}`,
//         authToken
//       );
//     }

//     setImages(downloadedImages);
//   }

//   useEffect(() => {
//     if (downloadImages) {
//       downloadUserImages(
//         ath,
//         downloadImages?.authorizationToken,
//         downloadImages?.downloadUrl
//       );
//     }
//   }, [downloadImages]);

//   return (
//     <div className="w-full grid grid-cols-[40%,20%,20%,20%] border-b border-b-ternary bg-secondary overflow-hidden p-2">
//       <div className="w-full flex justify-start items-center gap-4">
//         <div className="w-10 h-10 bg-black flex justify-center items-center">
//           {images?.profileImage ? (
//             <Image
//               src={images?.profileImage}
//               alt="athlete image"
//               width={500}
//               height={500}
//               className="relative w-full h-full object-cover rounded-md"
//             />
//           ) : (
//             <FaUser size={15} />
//           )}
//         </div>
//         <div className="w-full">
//           <article className="text-sm">{ath?.name}</article>
//           <article className="text-[10px] opacity-50 gap-2">
//             {ath?.username}
//             <span className="mx-1">.</span>
//             {ath?.hometown}
//           </article>
//         </div>
//       </div>
//       <div className="flex justify-start items-center ">
//         <article className="text-center text-[10px] opacity-50">
//           {ath?.primarySport?.length > 12
//             ? ath?.primarySport?.substring(0, 12) + "..."
//             : ath?.primarySport}
//         </article>
//       </div>
//       <div className="flex justify-start items-center ">
//         <article className="text-center text-[10px] opacity-50">
//           {ath?.primaryPosition?.length > 12
//             ? ath?.primaryPosition?.substring(0, 15) + "..."
//             : ath?.primaryPosition}
//         </article>
//       </div>
//       <div className="flex justify-center items-center">
//         <article className="text-[10px] text-primary text-center hover:underline cursor-pointer">
//           Claim{" "}
//         </article>
//       </div>
//     </div>
//   );
// };

// const EmptyResult = ({}) => {
//   return (
//     <div className="w-full h-[60vh] flex flex-col justify-center items-center">
//       <FaUserSlash className="opacity-50 mb-5" size={80} />
//       <article>No Athlete Found!</article>
//       <article></article>
//     </div>
//   );
// };

// const Page = () => {
//   const [search, setSearch] = useState("");
//   const [organization, setOrganisation] = useState(null);
//   const [orgList, setOrgList] = useState([]);
//   const [debouncedValue, setDebouncedValue] = useState("");
//   const [list, setList] = useState([]);
//   const [imageDownload, setImageDownload] = useState();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const [orgOptions, setOrgOptions] = useState();
//   const [selectedOrgOptions, setSelectedOrgOptions] = useState("");
//   const [primarySport, setPrimarySport] = useState("");
//   const [primaryPosition, setPrimaryPosition] = useState("");
//   const [searchView, setSearchView] = useState<"Grid" | "Row">("Grid");

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(search);
//     }, 500);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [search]);

//   const handleClear = () => {
//     setSearch("");
//   };

//   const handleFetchAthleteByOrg = async (
//     org,
//     searchKey = null,
//     primarySport = null,
//     primaryPosition = null
//   ) => {
//     setLoading(true);
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/search/athlete`,
//       method: "POST",
//       body: {
//         org,
//         searchKey,
//         primarySport,
//         primaryPosition,
//       },
//     });

//     if (response?.success) {
//       setList(response?.data?.list);
//       setImageDownload(response?.data?.imageDownload);
//     }

//     setLoading(false);
//   };

//   const handleFetchOrg = async () => {
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/search/org`,
//       method: "POST",
//     });

//     if (response?.success) {
//       await setOrgList(response?.data?.orgList);
//       await setOrgOptions(
//         response?.data?.orgList?.map((_) => ({
//           value: _?.name,
//           label: _?.shortname,
//         }))
//       );
//     }
//   };

//   useEffect(() => {
//     handleFetchOrg();
//   }, [router.pathname]);

//   useEffect(() => {
//     if (selectedOrgOptions) {
//       handleFetchAthleteByOrg(selectedOrgOptions);
//       setPrimarySport("");
//       setPrimaryPosition("");
//       setDebouncedValue("");
//     }
//   }, [selectedOrgOptions]);

//   useEffect(() => {
//     if (debouncedValue?.length > 0) {
//       handleFetchAthleteByOrg(selectedOrgOptions, debouncedValue);
//     } else {
//       handleFetchAthleteByOrg(selectedOrgOptions);
//     }
//   }, [debouncedValue]);

//   useEffect(() => {
//     if (primaryPosition || primarySport) {
//       handleFetchAthleteByOrg(
//         selectedOrgOptions,
//         null,
//         primarySport,
//         primaryPosition
//       );
//     }
//   }, [primaryPosition, primarySport]);

//   return (
//     <div className=" h-[100vh] w-full px-[100px] ">
//       {list?.length == 0 && !organization ? (
//         <div className="w-full h-screen flex flex-col justify-center items-center">
//           <article className="mb-10 text-4xl">Search Organisation</article>
//           <MvpzSearch
//             orgList={orgList}
//             onSelect={(data: any) => {
//               setOrganisation(data);
//               setSelectedOrgOptions(data?.name);
//             }}
//           />
//         </div>
//       ) : (
//         <div className="relative w-full h-full flex justify-center items-start gap-10 mt-32">
//           <div className="sticky top-0 flex-[0.25] w-full h-[90vh] bg-[#111] p-5">
//             <div className="flex justify-between items-center mb-10">
//               <div className="flex justify-start items-center gap-2">
//                 {" "}
//                 <FaFilter />
//                 <article>Filter</article>
//               </div>
//             </div>
//             <div className="w-full mb-8">
//               <article className="mb-2 text-sm">Select Organisation</article>
//               <Autocomplete
//                 data={orgOptions}
//                 value={selectedOrgOptions}
//                 onChange={(e) => setSelectedOrgOptions(e)}
//               />
//             </div>

//             <div className="w-full mb-8">
//               <article className="mb-2 text-sm">Select Sport</article>
//               <Autocomplete
//                 data={SportTeams.map((_) => _.team)?.map((_team) => ({
//                   label: _team,
//                   value: _team,
//                 }))}
//                 value={primarySport}
//                 onChange={(e) => setPrimarySport(e)}
//               />
//             </div>

//             {primarySport && (
//               <div className="w-full mb-8">
//                 <article className="mb-2 text-sm">Select Position</article>
//                 <Autocomplete
//                   data={
//                     SportTeams.filter((_) => _.team === primarySport)?.length >
//                     0
//                       ? SportTeams.filter(
//                           (_) => _.team === primarySport
//                         )[0]?.positions?.map((_pos) => ({
//                           label: _pos,
//                           value: _pos,
//                         }))
//                       : []
//                   }
//                   value={primaryPosition}
//                   onChange={(e) => setPrimaryPosition(e)}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex-[0.75] w-full h-auto">
//             <div>
//               <div className="relative border-b border-b-primary mb-10">
//                 <input
//                   className="relative z-0 w-full outline-none p-2 h-14 px-12"
//                   placeholder="Search Athlete"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <div className="absolute top-1/2 -translate-y-1/2 left-5">
//                   {search?.length > 0 && loading ? (
//                     <Loader size={18} />
//                   ) : (
//                     <FaSearch />
//                   )}
//                 </div>

//                 {search?.length > 0 && (
//                   <IoMdClose
//                     className="absolute top-1/2 -translate-y-1/2 right-5 text-primary cursor-pointer"
//                     onClick={handleClear}
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="mb-5 flex justify-between items-center">
//               <div className="relative">
//                 {" "}
//                 {debouncedValue?.length > 0 ? (
//                   <article>Search Result : "{debouncedValue}"</article>
//                 ) : (
//                   <article>Athletes List</article>
//                 )}
//               </div>
//               <div className="flex justify-center items-center gap-2">
//                 <IoGrid
//                   className={searchView == "Grid" && "text-primary"}
//                   onClick={() => setSearchView("Grid")}
//                 />
//                 <RiMenu5Fill
//                   size={20}
//                   className={searchView == "Row" && "text-primary"}
//                   onClick={() => setSearchView("Row")}
//                 />
//               </div>
//             </div>
//             {list?.length > 0 ? (
//               searchView == "Grid" ? (
//                 <div className="relative grid grid-cols-4 gap-5">
//                   {loading
//                     ? Array(8)
//                         .fill(null)
//                         .map((_) => {
//                           return <Skeleton className="w-full h-[300px]" />;
//                         })
//                     : list?.map((ath, idx) => {
//                         return (
//                           <AthleteCard
//                             key={1 + idx}
//                             ath={ath}
//                             downloadImages={imageDownload}
//                           />
//                         );
//                       })}
//                 </div>
//               ) : (
//                 <div className="relative w-full">
//                   {loading
//                     ? Array(10)
//                         .fill(null)
//                         .map((_) => {
//                           return <Skeleton className="w-full h-14 mb-1" />;
//                         })
//                     : list?.map((ath, idx) => {
//                         return (
//                           <AthleteRow
//                             key={1 + idx}
//                             ath={ath}
//                             downloadImages={imageDownload}
//                           />
//                         );
//                       })}
//                 </div>
//               )
//             ) : (
//               <EmptyResult />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

import React from 'react'

const athlete = () => {
  return (
    <div>athlete</div>
  )
}

export default athlete