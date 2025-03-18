// import {
//   Avatar,
//   Button,
//   Card,
//   createStyles,
//   Divider,
//   Flex,
//   Group,
//   SimpleGrid,
//   Space,
//   Stack,
//   Table,
//   Tabs,
//   Text,
//   Title,
// } from "@mantine/core";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import FlipCard from "../core/Atoms/Card/FlipCard";
// import ReactQRCode from "react-qr-code";
// import { useEffect, useState } from "react";
// import { callAPI } from "../lib/utils";
// import { useSession } from "next-auth/react";
// import { useMediaQuery } from "@mantine/hooks";
// import { getMedalHexCode } from "../utils/others";
// import { FiTrendingUp } from "react-icons/fi";

// const useStyles = createStyles((theme) => ({
//   cardDivider: {
//     borderRight: "0.0625rem solid #373A40",
//   },
//   dividerColor: {
//     color: theme.primaryColor[0],
//     width: "300px",
//     marginLeft: -16,
//   },
//   textcolor: {
//     color: "white",
//   },
//   cardDirection: {
//     [theme.fn.smallerThan("md")]: {
//       flexDirection: "column-reverse",
//     },
//   },
// }));

// const NFTCardDetails = ({ card }) => {
//   const { data: session } = useSession();
//   const { classes } = useStyles();
//   const {
//     displayImage,
//     title,
//     price,
//     nftEntity,
//     position,
//     sport,
//     type,
//     school,
//     special,
//     design,
//     designer,
//     year,
//     mintDatetime,
//     purchaseDatetime,
//     collection,
//     sex,
//     membershipTier,
//     cardSerialNumber,
//     medal,
//     athlete,
//     referral,
//   } = card;
//   const router = useRouter();
//   const [referralData, setReferralData] = useState({} as any);
//   const largeScreen = useMediaQuery("(min-width: 60em)");
//   const fetchInviteCode = async () => {
//     const response = await callAPI({ endpoint: "/api/user/getReferralInvite" });
//     if (response) {
//       setReferralData(response);
//     }
//   };

//   useEffect(() => {
//     fetchInviteCode();
//   }, []);

//   const getPath = () => {
//     return `/fanzone/profile/user/${session?.user?.username}${
//       referral?.inviteCode ? `?referralCode=${referral?.inviteCode}` : ""
//     }`;
//   };

//   const handleSell = (cardId) => {
//     const query = { ...router.query, ["qs"]: router.query.id };
//     router.push(
//       { pathname: router.pathname, query },
//       undefined,
//       { shallow: true } // Prevents full page reload
//     );
//   };

//   return (
//     <Stack mt={60} className="w-full mb-10">
//       <div
//         className={`${
//           largeScreen ? "pb-0" : "pb-52"
//         } flex md:flex-row flex-col-reverse justify-between items-center gap-10 `}
//       >
//         <div className="md:flex-[0.5] flex-1 w-full  space-y-5">
//           {/* <Title order={4}>Rare</Title>
//                     <Link href={`/athlete/${athlete?.username}`}>{title}</Link>
//                     <Title order={2} fw={200}>OVR </Title> */}
//           <Card>
//             <Group position="center" grow>
//               <Stack pr={16} spacing={16} className={classes.cardDivider}>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>{type}</Text>
//                   <Text
//                     color={"white"}
//                     size={"md"}
//                     style={{
//                       cursor: type === "Athlete" ? "pointer" : "default",
//                       textDecoration:
//                         type === "Athlete" ? "underline" : "default",
//                     }}
//                     onClick={() =>
//                       type === "Athlete"
//                         ? router.push(
//                             `/fanzone/tribe/profile/athlete/${nftEntity?.athlete?.username}`
//                           )
//                         : null
//                     }
//                   >
//                     {title}
//                   </Text>
//                 </Stack>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Position</Text>
//                   <Text color={"white"} size={"md"}>
//                     {position || "NA"}
//                   </Text>
//                 </Stack>
//               </Stack>
//               <Stack spacing={16}>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Sport</Text>
//                   <Text color={"white"} size={"md"}>
//                     {sport || "NA"}
//                   </Text>
//                 </Stack>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>School</Text>
//                   <Text color={"white"} size={"md"}>
//                     {school || "NA"}
//                   </Text>
//                 </Stack>
//               </Stack>
//             </Group>
//           </Card>
//           <Card>
//             <Group position="center" grow>
//               <Stack spacing={16} className={classes.cardDivider}>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Special</Text>
//                   <Text color={"white"} size={"md"}>
//                     {special}
//                   </Text>
//                 </Stack>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Year</Text>
//                   <Text color={"white"} size={"md"}>
//                     {year || 2024}
//                   </Text>
//                 </Stack>
//               </Stack>
//               <Stack spacing={16}>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Collection</Text>
//                   <Text color={"white"} size={"md"}>
//                     {collection || "MVPz Gen 1"}
//                   </Text>
//                 </Stack>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Membership Tier</Text>
//                   <Text color={"white"} size={"md"}>
//                     {membershipTier || medal}
//                   </Text>
//                 </Stack>
//               </Stack>
//             </Group>
//           </Card>
//           <Card>
//             <Group position="center" grow>
//               <Stack spacing={16} className={classes.cardDivider}>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Design</Text>
//                   <Text color={"white"} size={"md"}>
//                     {design}
//                   </Text>
//                 </Stack>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Designer</Text>
//                   <Text color={"white"} size={"md"}>
//                     {designer}
//                   </Text>
//                 </Stack>
//               </Stack>
//               <Stack spacing={16}>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>
//                     {["Athlete", "Championship"].includes(type)
//                       ? "Sex"
//                       : "Medal"}
//                   </Text>
//                   <Text color={"white"} size={"md"}>
//                     {["Athlete", "Championship"].includes(type)
//                       ? sex
//                       : type === "Activity"
//                       ? medal
//                       : "NA"}
//                   </Text>
//                 </Stack>
//                 <Stack spacing={0}>
//                   <Text size={"sm"}>Serial Number</Text>
//                   <Text color={"white"} size={"md"}>
//                     {cardSerialNumber}
//                   </Text>
//                 </Stack>
//               </Stack>
//             </Group>
//           </Card>
//           {!!purchaseDatetime && (
//             <Card>
//               <Flex direction={"row"} justify={"space-between"}>
//                 <Flex direction={"column"}>
//                   {/* <Avatar src={null} alt='Vamsi Nagavarapu' radius={'xs'}></Avatar> */}
//                   <Text mt={8}>
//                     {mintDatetime ? "Minted On" : "Purchased On"}
//                   </Text>
//                   <Text size={"xs"} color={"white"} mt={8}>
//                     {new Date(mintDatetime || purchaseDatetime).toDateString()}
//                   </Text>
//                 </Flex>

//                 {/* <Button onClick={() => router.push("/user/1")}>View Profile</Button> */}
//               </Flex>
//             </Card>
//           )}
//         </div>

//         <div className="md:flex-[0.5] flex-1 w-full h-full flex flex-col gap-10 justify-center items-center">
//           <FlipCard
//             flip={false}
//             showBackButton={false}
//             frontComp={() => (
//               <div className="relative w-full h-full overflow-hidden  flex justify-center items-center ">
//                 <div
//                   className={`rounded-[30px]  overflow-hidden ${
//                     type !== "Athlete" && `border-[8px] border-[#222]`
//                   }`}
//                 >
//                   <Image
//                     src={displayImage}
//                     alt={title}
//                     width={500}
//                     height={500}
//                     className="relative w-full h-full object-cover rounded-[30px] "
//                   />
//                 </div>
//               </div>
//             )}
//             backComp={() => (
//               <div
//                 className=" relative w-full h-full rounded-[30px] flex flex-col justify-center items-center "
//                 style={{
//                   background: `linear-gradient(to top right, #8A2387, #E94057, #F27121)`,
//                 }}
//               >
//                 <ReactQRCode
//                   value={getPath()}
//                   bgColor="transparent"
//                   fgColor="#fff"
//                   className="w-[225px] h-[225x]"
//                 />
//                 <article className="md:mt-10 mt-5 font-monumentUltraBold text-2xl -rotate-2">
//                   {athlete?.username
//                     ? `@${athlete?.username}`
//                     : ` #${title?.split(" ")?.join("_")}`}
//                 </article>
//                 <article className="mt-2  absolute top-4 text-xs text-center">
//                   {cardSerialNumber}
//                 </article>
//                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
//                   <Image
//                     src={"/images/mvpz-logo-purple.png"}
//                     alt="mvpz"
//                     width={500}
//                     height={500}
//                     className="relative w-[80px] object-contain"
//                   />
//                 </div>
//               </div>
//             )}
//             cardHeight={"md:h-[480px] h-[420px]"}
//             cardWidth="md:w-[350px] w-[300px]"
//           />
//           <div className="md:w-[400px] w-full">
//             <div className="space-y-4">
//               <div className="relative w-full space-y-1">
//                 <div className="flex justify-between items-center gap-2">
//                   <article className="text-sm font-monumentUltraBold">
//                     {card?.nftEntity?.title}
//                   </article>{" "}
//                   <article className="text-[12px] ">
//                     ${card?.purchasePrice}
//                   </article>
//                 </div>
//                 <article
//                   className="text-[10px] "
//                   style={{
//                     color: getMedalHexCode(card?.nftEntity?.design),
//                   }}
//                 >
//                   {card?.nftEntity?.design}
//                 </article>
//               </div>
//               <div
//                 className={`grid ${
//                   type === "Athlete" ? "md:grid-cols-2" : "md:grid-cols-1"
//                 } grid-cols-1 gap-5`}
//               >
//                 {type === "Athlete" && (
//                   <div
//                     className="w-full flex justify-center items-center rounded-md gap-2  py-2 bg-primary cursor-pointer"
//                     onClick={() =>
//                       type === "Athlete"
//                         ? router.push(
//                             `/fanzone/tribe/profile/athlete/${nftEntity?.athlete?.username}`
//                           )
//                         : null
//                     }
//                   >
//                     <article className="text-xs">View Athlete</article>
//                   </div>
//                 )}
//                 <div
//                   className="w-full flex justify-center items-center rounded-md gap-2 py-2 bg-ternary cursor-pointer"
//                   onClick={() => handleSell(card?.id)}
//                 >
//                   <FiTrendingUp />{" "}
//                   <article className="text-xs">List In Market</article>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Stack>
//   );
// };

// export default NFTCardDetails;
