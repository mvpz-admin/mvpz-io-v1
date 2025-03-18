// import React, { useEffect, useState } from "react";
// import TribeHorizontalCard from "../../Atoms/TribeCard/TribeHorizontalCard";
// import { callAPI } from "../../../lib/utils";
// import TribeHorizontalLoadingCard from "../../Atoms/LoadingsLayout/TribeHorizontalLoadingCard";
// import SigninRequired from "../Errors/SigninRequired";
// import { useSession } from "next-auth/react";

// const AthleteTribes = ({ ath, isSearchAthlete = false }) => {
//   const [tribeList, setTribeList] = useState<any>([]);
//   const [loading, setLoading] = useState(false);
//   const { data: session } = useSession();

//   const handleFetchTribe = async () => {
//     setLoading(true);
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/athlete/tribes/${ath?.user?.id}`,
//     });

//     if (response) {
//       setTribeList(response?.athleteTribes);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     handleFetchTribe();
//   }, [ath]);

//   return (

//     session?.user ?
//     <div className="w-full space-y-14">
//       <div className="relative py-5 flex justify-between items-center">
//         <article className="md:text-2xl text-lgfont-bold">
//           {" "}
//           {isSearchAthlete ? "Tribes" : "My Tribes"}
//         </article>
//         <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
//       </div>
//       <div className="w-full space-y-10">
//         {loading
//           ? Array(5)
//               .fill(0)
//               .map((_) => {
//                 return (
//                   <div className="w-full  h-[500px]">
//                     <TribeHorizontalLoadingCard />
//                   </div>
//                 );
//               })
//           : tribeList?.map((tribe) => {
//               return (
//                 <div
//                   key={tribe?.name}
//                   className="w-full "
//                 >
//                   <TribeHorizontalCard tribe={tribe?.tribe} showLeave={false} handleLeaveTribe={() => {}} />
//                 </div>
//               );
//             })}
//       </div>
//     </div>
//     :
//     <SigninRequired />
//   );
// };

// export default AthleteTribes;
