// import type {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from "next";
// import { getProviders, signIn } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";
// import {
//   Autocomplete,
//   Button,
//   Container,
//   createStyles,
//   Divider,
//   Grid,
//   Group,
//   Image,
//   Input,
//   Loader,
//   Select,
//   SimpleGrid,
//   Stack,
//   TextInput,
//   Title,
// } from "@mantine/core";
// import { useRouter } from "next/router";
// import { IconBrandGoogle } from "@tabler/icons-react";
// import { useEffect, useState } from "react";
// import prisma from "../../lib/prisma";
// import { emailRegex } from "../../utils/regex";
// import NxtImage from "next/image";
// import { callAPI, SCHOOLS } from "../../lib/utils";
// import { notifications } from "@mantine/notifications";
// import { FaChevronLeft } from "react-icons/fa";

// const useStyles = createStyles((theme) => ({
//   container: {
//     maxWidth: "1200px",
//     alignSelf: "center",
//     textAlign: "center",
//     padding: "20px 0",
//   },
//   logo: {
//     cursor: "pointer",
//   },
//   signupImage: {
//     [theme.fn.smallerThan("xs")]: {
//       maxWidth: 600,
//     },
//     [theme.fn.largerThan("xs")]: {
//       maxWidth: 900,
//     },
//   },
// }));

// export default function SignIn({}) {
//   const [loading, setLoading] = useState(false);
//   const [responseError, setResponseError] = useState("");
//   const [responseMSG, setResponseMSG] = useState("");
//   const router = useRouter();

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     socialMediaURL: "",
//     orgName: "Abilene Christian University",
//   });

//   useEffect(() => {
//     if (router.query?.email) {
//       setData((prev) => ({
//         ...prev,
//         email: `${router.query?.email}`,
//       }));
//     }
//   }, [router]);

//   const [error, setError] = useState({
//     name: "",
//     email: "",
//     socialMediaURL: "",
//     orgName: "",
//   });

//   const handleOnChange = (e, key) => {
//     setError({
//       name: "",
//       email: "",
//       socialMediaURL: "",
//       orgName: "",
//     });
//     setData((prev) => ({ ...prev, [key]: e }));
//   };

//   const orgList = SCHOOLS?.map((org) => ({
//     label: org,
//     value: org,
//   }));

//   const handleReset = () => {
//     setError({
//       name: "",
//       email: "",
//       socialMediaURL: "",
//       orgName: "",
//     });

//     setResponseMSG("");
//     setResponseError("");
//   };

//   const handleJoin = async () => {
//     handleReset();

//     const { name, email, socialMediaURL, orgName } = data;

//     if (!name) {
//       return setError((prev) => ({
//         ...prev,
//         name: "Please, Provide Your Full Name",
//       }));
//     } else {
//       if (name.length < 3 || name.length > 20) {
//         return setError((prev) => ({
//           ...prev,
//           name: "Name Should Be Min 3 char. & Max. 20 char. long",
//         }));
//       }
//     }

//     if (!email) {
//       return setError((prev) => ({
//         ...prev,
//         email: "Please, Provide Your Email.",
//       }));
//     } else {
//       if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
//         return setError((prev) => ({ ...prev, email: "Invalid Email!" }));
//       }
//     }

//     if (!socialMediaURL) {
//       return setError((prev) => ({
//         ...prev,
//         socialMediaURL: "Please, Provide Your Social Media Url.",
//       }));
//     } else {
//       if (
//         socialMediaURL !== "N/A" &&
//         !/^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9._-]+)\/?$/.test(
//           socialMediaURL
//         )
//       ) {
//         return setError((prev) => ({
//           ...prev,
//           socialMediaURL: "Invalid Url!",
//         }));
//       }
//     }

//     if (!orgName) {
//       return setError((prev) => ({
//         ...prev,
//         orgName: "Please, Select Your Organization Name.",
//       }));
//     }

//     setLoading(true);
//     try {
//       const response = await callAPI({
//         endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/waitlist/add`,
//         method: "POST",
//         body: {
//           name,
//           email,
//           socialMediaURL,
//           orgName,
//         },
//       });

//       if (response.error) {
//         setLoading(false);

//         return setResponseError(response?.error);
//       }

//       setData({
//         name: "",
//         email: "",
//         socialMediaURL: "",
//         orgName: "Abilene Christian University",
//       });
//       setResponseMSG(response?.message);
//       notifications.show({
//         message: response?.message,
//       });
//     } catch (err) {
//       setResponseError(err);
//       notifications.show({
//         message: err,
//       });
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="relative flex justify-start items-center w-full h-[100vh]">
//       <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[60vw] md:w-[80vw] w-[99vw] h-full  md:py-[25px] py-[25px] flex flex-col justify-center items-center z-50 ">
//         <Stack className="w-full md:h-full md:bg-black rounded-md md:p-10 p-5 py-10">
//           <div className=" flex flex-col justify-center  lg:mb-10 mb-5 w-full">
//             <a href="/">
//               <NxtImage
//                 src={`/images/logo-transparent.png`}
//                 alt="poster"
//                 width={2000}
//                 height={2000}
//                 className="relative  h-[40px] object-contain md:mb-10 mb-5"
//               />
//             </a>

//             <div
//               className="md:relative fixed top-5 left-2 mb-5 text-xs flex justify-start items-center gap-2 cursor-pointer"
//               onClick={() => router.push("/")}
//             >
//               <FaChevronLeft /> Home
//             </div>

//             <article className="lg:text-2xl md:text-xl text-lg font-bold mb-2 ">
//               Join The MVPz Waitlist.
//             </article>
//             <article className="lg:text-xs text-[10px]">
//             Complete the form, and we'll review your application promptly. Once approved, you'll officially be part of MVPZ!
//             </article>
//           </div>
//           <div className="w-full">
//             <Stack className="w-full">
//               <SimpleGrid cols={2} className="w-full mb-2">
//                 <Group>
//                   <article className="lg:text-base md:text-sm text-xs">
//                     Enter Your Full Name <span className="text-red-500">*</span>
//                   </article>
//                   <TextInput
//                     value={data.name}
//                     onChange={(e) => {
//                       handleOnChange(e.currentTarget.value, "name");
//                     }}
//                     placeholder="Full Name"
//                     className="w-full"
//                     error={error.name}
//                   ></TextInput>
//                 </Group>
//                 <Group>
//                   <article className="lg:text-base md:text-sm text-xs">
//                     Enter Your Email <span className="text-red-500">*</span>
//                   </article>
//                   <TextInput
//                     value={data.email}
//                     onChange={(e) => {
//                       handleOnChange(e.currentTarget.value, "email");
//                     }}
//                     placeholder="Email"
//                     className="w-full"
//                     error={error.email}
//                   ></TextInput>
//                 </Group>
//               </SimpleGrid>

//               <SimpleGrid cols={1} className="w-full mb-2">
//                 <Group className="w-full ">
//                   <article className="lg:text-base md:text-sm text-xs">
//                     Enter Your Instagram Profile Link{" "}
//                     <span className="text-red-500">*</span>
//                   </article>

//                   <TextInput
//                     value={data.socialMediaURL}
//                     onChange={(e) => {
//                       handleOnChange(e.currentTarget.value, "socialMediaURL");
//                     }}
//                     placeholder="Enter URL https://"
//                     className="w-full "
//                     error={error.socialMediaURL}
//                   ></TextInput>
//                   <article className="text-[10px] opacity-50">
//                     Note : If you don't have instagram account type N/A.
//                   </article>
//                 </Group>
//               </SimpleGrid>

//               <SimpleGrid cols={1} className="w-full mb-5">
//                 <Group>
//                   <article className="lg:text-base md:text-sm text-xs">
//                     Select Organisation Name{" "}
//                     <span className="text-red-500">*</span>
//                   </article>
//                   <Autocomplete
//                     value={data.orgName}
//                     onChange={(e) => {
//                       handleOnChange(e, "orgName");
//                     }}
//                     data={orgList}
//                     className="w-full"
//                     error={error.orgName}
//                   />
//                 </Group>
//               </SimpleGrid>

//               <SimpleGrid cols={1} className="w-full mb-2">
//                 <Button
//                   className="h-[40px] flex justify-center items-center gap-2"
//                   onClick={handleJoin}
//                 >
//                   Join
//                   {loading && (
//                     <Loader color="white" size={20} className="ml-2" />
//                   )}
//                 </Button>
//                 {responseMSG && (
//                   <article className="text-[10px] text-white">
//                     {responseMSG}
//                   </article>
//                 )}
//                 {responseError && (
//                   <article className="text-[10px] text-red-500">
//                     {responseError}
//                   </article>
//                 )}
//               </SimpleGrid>

//               <article className=" text-primary text-sm font-nato leading-5">
//                 Already with MVPZ? <br />
//                 <a
//                   href="/auth/athleteSignin"
//                   className="text-[10px] text-white underline cursor-pointer"
//                 >
//                   Sign In
//                 </a>
//               </article>
//             </Stack>
//           </div>
//         </Stack>
//       </div>
//       <div className=" w-full h-full relative z-0 bg-secondary">
//         <NxtImage
//                           src={`https://res.cloudinary.com/dv667zlni/image/upload/v1729330301/1500x500_n07qke.jpg`}
//                           alt="poster"
//                           width={2000}
//                           height={2000}
//                           className="relative md:block hidden w-full h-full object-cover brightness-50"
//                         />
//                          <NxtImage
//                           src={`/images/home/bg.gif`}
//                           alt="poster"
//                           width={2000}
//                           height={2000}
//                           className="relative md:hidden block w-full h-full object-cover brightness-50"
//                         />
//       </div>
//     </div>
//   );
// }

import React from 'react'

const waitlist = () => {
  return (
    <div>
      
    </div>
  )
}

export default waitlist
