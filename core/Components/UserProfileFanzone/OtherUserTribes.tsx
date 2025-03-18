// import React, { useEffect, useState } from "react";
// import TribeHorizontalCard from "../../Atoms/TribeCard/TribeHorizontalCard";
// import { useSession } from "next-auth/react";
// import { callAPI } from "../../../lib/utils";
// import { Loader } from "@mantine/core";
// import TribeHorizontalLoadingCard from "../../Atoms/LoadingsLayout/TribeHorizontalLoadingCard";
// import { useRouter } from "next/router";

// const OtherUserTribe = ({user}) => {
//   const [tribes, setTribes] = useState<any>([]);
//   const [loading, setLoading] = useState(false);
//   const { data: session } = useSession();
//   const router = useRouter()

//   const handleGetTribeList = async () => {
//     setLoading(true);
//     let response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/tribes/${user?.id}`,
//     });

//     if (response) {
//       setTribes(response);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (session?.user) {
//       handleGetTribeList();
//     }
//   }, [session]);



   

//   return (
//     <div className="w-full space-y-14">
//       <div className="relative py-5 flex justify-between items-center">
//         <article className="text-2xl font-bold">Tribes</article>
       
//         <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
//       </div>
//       <div className="w-full space-y-10">
//         {loading
//           ? Array(5).fill(0).map((_) => {
//               return (
//                 <div
//                   className="w-full md:h-[400px] h-[500px]"
//                 >
//                   <TribeHorizontalLoadingCard />
//                 </div>
//               );
//             })
//           : 
//           tribes?.length == 0 ?
//           <div className="flex justify-center items-center w-full md:h-[400px] h-[300px] bg-secondary rounded-md">
//             <article className="md:text-2xl text-lgfont-bold opacity-50">No Tribe Joined Yet!</article>
//           </div>
//           :
//           tribes?.map((tribe) => {
//               return (
//                 <div
//                   key={tribe?.name}
//                   className="w-full "
//                 >
//                   <TribeHorizontalCard tribe={tribe}  handleLeaveTribe={() => {}}showLeave={false}/>
//                 </div>
//               );
//             })}
//       </div>
//     </div>
//   );
// };

// export default OtherUserTribe;
