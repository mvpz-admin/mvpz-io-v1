// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { callAPI } from "../../../lib/utils";
// import TribeCard from "../../../core/Atoms/TribeCard/TribeCard";
// import TribeLoadingCard from "../../../core/Atoms/LoadingsLayout/TribeLoadingCard";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { Loader } from "@mantine/core";
// import useIsPWA from "../../../utils/hooks/useIsPWA";
// import { FaChevronLeft } from "react-icons/fa6";
// import debounce from "lodash.debounce";
// import { FaSearch } from "react-icons/fa";

// const TribePage = () => {
//   const [tribes, setTribes] = useState({ isMTribes: [], isNotMTribes: [] });
//   const [downloadImage, setDownloadImage] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearchResult, setIsSearchResult] = useState(false);
//   const { data: session } = useSession();
//   const router = useRouter();
//   const isPWA = useIsPWA();
//   const [matchTribes,setMatchTribes] = useState([])

//   const fetchTribes = useCallback(
//     async (query = "") => {
//       setLoading(true);
//       try {
//         const response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/all?q=${query}`,
//           method: "GET",
//         });

//         setTribes({
//           isMTribes: response?.isMemberTribe || [],
//           isNotMTribes: response?.notMemberTribe || [],
//         });
//         setMatchTribes(response?.matchedTribes || [])
//         setDownloadImage(response?.imageDownload || {});
//       } catch (error) {
//         console.error("Error fetching tribes:", error);
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   const debouncedSearch = useMemo(
//     () => debounce((query) => fetchTribes(query), 300),
//     [fetchTribes]
//   );

//   useEffect(() => {
//     if (!session?.user) {
//       router.push("/auth/signin");
//       return;
//     }
//     fetchTribes();

//     return () => {
//       debouncedSearch.cancel();
//     };
//   }, [session, fetchTribes, router, debouncedSearch]);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     debouncedSearch(query);
//   };

//   const renderTribes = (tribesList, isMember = false) => {
//     return tribesList.map((tribe) => (
//       <div key={tribe.id} className="w-full md:h-[300px] h-[250px]">
//         <TribeCard tribe={tribe} imageDownload={downloadImage} isMember={isMember} />
//       </div>
//     ));
//   };

//   return (
//     <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] pb-20">
//       {isPWA && (
//         <div
//           className="flex justify-start items-center gap-2 text-sm cursor-pointer mb-4"
//           onClick={() => router.back()}
//         >
//           <FaChevronLeft /> Back
//         </div>
//       )}

//       <div className="relative w-full md:h-[60px] h-[50px] bg-secondary rounded-[50px] border border-white border-opacity-10 mb-10">
//         <input
//           className="w-full h-full rounded-[50px] md:pl-14 pl-12"
//           placeholder="Search Tribes..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2" />
//       </div>

//       {loading ? (
//         <>
//           <article className="text-2xl mb-2">Tribes</article>
//           <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5">
//             {Array(8)
//               .fill(0)
//               .map((_, index) => (
//                 <div
//                   key={index}
//                   className="w-full md:h-[300px] h-[250px] overflow-hidden"
//                 >
//                   <TribeLoadingCard />
//                 </div>
//               ))}
//           </div>
//         </>
//       ) : (
//         <>
//           {searchQuery?.length > 0 ? (
//             <div className="w-full mb-10">
//               <article className="md:text-2xl text-xl font-bold mb-4">
//                 Search result for "{searchQuery}"
//               </article>
//               <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5">
//                 {renderTribes(matchTribes, true)}
//               </div>
//             </div>
//           ) : (
//             <>
//               {tribes.isMTribes.length > 0 && (
//                 <div className="w-full mb-20 space-y-4">
//                   <article className="md:text-2xl text-xl md:mb-0 mb-2 font-bold">
//                     My Tribes
//                   </article>
//                   <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5">
//                     {renderTribes(tribes.isMTribes, true)}
//                   </div>
//                 </div>
//               )}
//               <div className="w-full mb-10 space-y-10">
//                 <article className="md:text-2xl text-xl md:mb-0 mb-2 font-bold">
//                   Looking For New Tribes?
//                 </article>
//                 <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:grid-cols-1 md:gap-10 gap-5">
//                   {renderTribes(tribes.isNotMTribes)}
//                 </div>
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default TribePage;


import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index