// import React, { useEffect, useState } from "react";

// import Image from "next/image";
// import { PiCards, PiTShirtFill } from "react-icons/pi";
// import { TbCardsFilled } from "react-icons/tb";
// import { FaTshirt } from "react-icons/fa";
// import { HiCurrencyDollar } from "react-icons/hi";
// import { IoArrowBackOutline, IoPeople } from "react-icons/io5";
// import { callAPI } from "../../lib/utils";
// import CardEarningsBlock from "../../core/Components/Earnings/CardEarningsBlock";
// import ApparelEarningsBlock from "../../core/Components/Earnings/ApparelEarningsBlock";
// import TipEarningsBlock from "../../core/Components/Earnings/TipEarningsBlock";
// import ReferralsEarningsBlock from "../../core/Components/Earnings/ReferralsEarningsBlock";
// import { useSession } from "next-auth/react";
// import { Loader, Progress } from "@mantine/core";
// import HPEarningsBlock from "../../core/Components/Earnings/HPEarningsBlock";
// import { notifications } from "@mantine/notifications";
// import Tooltip from "../../core/Atoms/Others/Tooltip";
// import ProfileLayout from "../../core/Layout/ProfileLayout";

// const Index = () => {
//   const { data: session } = useSession();
//   const [showDetails, setShowDetails] = useState(false);
//   const [withdrawLoading, setWithdrawLoading] = useState(false);
//   const [details, setDetails] = useState<any>({});
//   const [loading, setLoading] = useState(false);

//   const handleFetchEarnings = async () => {
//     setLoading(true);
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/earnings`,
//     });

//     if (response?.success) {
//       setDetails(response?.data);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     handleFetchEarnings();
//   }, []);

//   console.log({
//     details,
//   });

//   const handleWithdraw = async () => {
//     if (!details?.isEligible && !details?.severStatus) {
//       return;
//     }

//     setWithdrawLoading(true);
//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/payout/withdraw`,
//       // endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/payout/add`,
//     });

//     if (!response.success) {
//       return notifications.show({ message: response?.error });
//     }

//     window.location.href = response.redirectURI;

//     setWithdrawLoading(false);
//   };

//   return (
//     <ProfileLayout>
//       <div className="mb-10 flex justify-between items-center">
//         <article className="md:text-[50px] text-2xl  md:text-left   uppercase font-graffiti">
//           <span className="text-primary">My</span> Earnings
//         </article>
//       </div>

//       {!showDetails && (
//         <div className="grid md:grid-cols-[38%,38%,20%] grid-cols-1 gap-10 mb-20">
//           <div className="relative w-full h-[300px] p-5 rounded-md border border-primary shadow shadow-primary flex flex-col justify-between items-start ">
//             <div className="flex justify-between items-start gap-10 w-full">
//               <div className="w-full">
//                 <article className="text-2xl mb-1 uppercase ">Payout</article>
//               </div>
//               {/* {!loading && Number(details?.payout) != 0  && */}
//               {true  &&
//                 // (details?.severStatus && details?.isEligible ? (
//                 (true ? (
//                   <div
//                     className={`px-3 py-2 rounded-md inline-flex bg-primary text-xs gap-1 ${
//                       details?.isEligible
//                         ? "opacity-100 cursor-pointer"
//                         : "opacity-30 cursor-not-allowed"
//                     }`}
//                     onClick={handleWithdraw}
//                   >
//                     <article className="text-xs">Claim</article>{" "}
//                     {withdrawLoading && (
//                       <Loader variant="oval" color="white" size={16} />
//                     )}
//                   </div>
//                 ) : (
//                   <Tooltip text="Server is down. Please try again later!" position="bottom">
//                     <div
//                       className={`px-3 py-2 rounded-md inline-flex bg-primary text-xs gap-1 opacity-30 cursor-not-allowed`}
//                     >
//                       <article className="text-xs">Claim</article>{" "}
//                       {withdrawLoading && (
//                         <Loader variant="oval" color="white" size={16} />
//                       )}
//                     </div>
//                   </Tooltip>
//                 ))}
//             </div>
//             <div className="  w-full">
//               <article className="text-[50px] text-white">
//                 {loading ? "--" : `$${details?.payout}`}
//               </article>
//             </div>
//           </div>
//           <div className="relative w-full h-[300px] p-5 rounded-md border border-primary shadow shadow-primary flex flex-col justify-between items-start">
//             <div className="flex justify-between items-start gap-10 w-full">
//               <div className="w-full">
//                 <article className="text-2xl mb-1 uppercase ">Earnings</article>
//               </div>
//               <div
//                 className="px-3 py-2 rounded-md inline-flex bg-primary text-xs cursor-pointer"
//                 onClick={() => setShowDetails(!showDetails)}
//               >
//                 Details
//               </div>
//             </div>

//             <div className="w-full ">
//               <div className="w-full">
//                 <article className="font-extrabold">Total Earn</article>
//                 <article className="text-[40px]">
//                   {loading ? "--" : `$${details?.totatAmmount}`}
//                 </article>
//               </div>
//               <div className="w-full h-[1px] bg-white mb-4 opacity-35"></div>
//               <div className="w-full flex justify-center items-center gap-5">
//                 <div className="flex-[0.5]">
//                   <article className="text-[16px] text-white">
//                     {loading ? "--" : `$${details?.payout}`}
//                   </article>
//                   <article className="text-[10px] opacity-50">
//                     Balance Amount
//                   </article>
//                 </div>
//                 <div className="w-[1px] h-[50px] bg-white my-4 opacity-35"></div>
//                 <div className="flex-[0.5]">
//                   <article className="text-[16px] text-white">
//                     {loading ? "--" : `$${details?.totatAmmount}`}
//                   </article>
//                   <article className="text-[11px] opacity-50">
//                     Lifetime Earnings
//                   </article>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* details */}
//       {showDetails && (
//         <div className="w-full">
//           <div
//             className="flex justify-start items-center gap-2 mb-5 mt-20 cursor-pointer"
//             onClick={() => setShowDetails(false)}
//           >
//             <IoArrowBackOutline size={30} className="text-primary" />{" "}
//             <article>Back</article>
//           </div>
//           <article className="text-[30px] mb-10">Earning Details</article>
//           <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mb-20">
//             {session?.user?.role === "Athlete" && (
//               <CardEarningsBlock
//                 loading={loading}
//                 earnings={details?.cardEarnings}
//               />
//             )}
//             <ReferralsEarningsBlock
//               loading={loading}
//               earnings={details?.referralsEarnings}
//             />
//             <TipEarningsBlock
//               loading={loading}
//               earnings={details?.tipEarnings}
//             />
//             <ApparelEarningsBlock />
//             {session?.user?.adminRole === "Coach" && <HPEarningsBlock />}
//           </div>
//         </div>
//       )}
//     </ProfileLayout>
//   );
// };

// export default Index;

import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index