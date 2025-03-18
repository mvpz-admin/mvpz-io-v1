// import React, { useState } from "react";
// import { Group, Loader, Title, useMantineTheme } from "@mantine/core";
// import { FaPlus, FaStripe } from "react-icons/fa";
// import { SiKonami } from "react-icons/si";
// import WebThree from "../../core/Components/Wallets/WebThree";
// import { IconArrowLeft } from "@tabler/icons-react";
// import { useSession } from "next-auth/react";
// import ProfileLayout from "../../core/Layout/ProfileLayout";

// const Index = () => {
//   const [selectState, setSelectState] = useState<"Web2" | "Web3" | null>(null);

//   const [stripeLoading, setStripeLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const { data: session } = useSession();

//   console.log({
//     session,
//   });

//   const theme = useMantineTheme();

//   const handleConnect = async (userId, email) => {
//     setStripeLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch("/api/stripe/stripe-create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({  email, userId }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage("Stripe account connected successfully!");
//         return data.onboardingUrl;
//       } else {
//         const error = await response.json();
//         setMessage(`Error: ${error.error}`);
//       }
//     } catch (err) {
//       setMessage("An unexpected error occurred.");
//     } finally {
//       setStripeLoading(false);
//     }
//   };

//   const handleOpenSettings = async (customerId) => {
//     setStripeLoading(true);

//     try {
//       const response = await fetch("/api/stripe/stripe-connect", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ customerId }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         window.location.href = data.url; // Redirect to the Stripe Customer Portal
//       } else {
//         const error = await response.json();
//         setMessage(`Error: ${error.error}`);
//       }
//     } catch (err) {
//       setMessage("An unexpected error occurred.");
//     } finally {
//       setStripeLoading(false);
//     }
//   };

//   const handleConnectStripe = async () => {
//     if (session?.user) {
//       const {  email, id } = session?.user;
//       let url = await handleConnect(id, email);

//       if (url) {
//         window.location.href = url; // Redirect to onboarding
//       } 

//     }
//   };

//   return (
//     <ProfileLayout>
//       {!selectState && (
//         <div className="relative w-full mb-10">
//           <div className="mb-10 w-full">
//             <article className="md:text-[50px] text-2xl mb-5  text-center  uppercase font-graffiti">
//             MY WALLET
//             </article>
//           </div>
//           <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-10">
//             <div className="relative w-full p-10 border border-white border-opacity-50 rounded-md md:h-[350px] h-[300px] hover:bg-white hover:bg-opacity-5 cursor-pointer">
//               <FaStripe size={40} />
//               <article className="md:text-4xl text-3xl text-primary mb-2">
//                 Connect <br />
//                 Stripe
//               </article>
//               <article className="md:text-xs text-[10px] text-white text-opacity-50">
//               Connect your Stripe account for secure payments and easy transaction management.
//               </article>

//               { session?.user?.webStripe?.stripeLinked ? (
//                 <div className="flex justify-start items-center gap-2 md:mt-14 mt-8" onClick={() => handleOpenSettings(session?.user?.webStripe?.customerId)}>
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <article className="underline">Connected</article>
//                 </div>
//               ) : (
//                 <div
//                   className="px-4 py-2 bg-primary rounded-md   md:mt-14 mt-8 inline-flex justify-start items-center gap-2"
//                   onClick={handleConnectStripe}
//                 >
//                   Setup {stripeLoading && <Loader size={20} color="white" />}
//                 </div>
//               )}
//             </div>
//             <div
//               className="relative w-full p-10 border border-white border-opacity-50 rounded-md h-[350px] hover:bg-white hover:bg-opacity-5 cursor-pointer"
//               onClick={() => setSelectState("Web3")}
//             >
//               <SiKonami size={40} />
//               <article className="md:text-4xl text-3xl text-primary mb-2">
//                 Connect <br />
//                 Web3
//               </article>
//               <article className="md:text-xs text-[10px] text-white text-opacity-50">
//               Connect your Web3 wallet for seamless blockchain access.
//               </article>

//               <div className=" md:mt-10 mt-5">
//                 <FaPlus className={`md:text-[60px] text-[40px]`}/>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {selectState && (
//         <>
//           <Group
//             className="flex justify-start items-center cursor-pointer"
//             onClick={() => setSelectState(null)}
//             mb={40}
//           >
//             <IconArrowLeft />
//             <article>Back</article>
//           </Group>
//           {selectState === "Web3" && <WebThree />}
//         </>
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