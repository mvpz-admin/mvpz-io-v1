// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import getB2TokenForFileDownload from "../../../../lib/backBlaze";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "POST") {
//       // Get session for the current user
//       const session = await getServerSession(req, res, authOptions);
//       const userId = session?.user?.id;

//       const { activeTribePage } = req.body;

//       // Fetch tribes with associated organisation
//       const tribes = session?.user?.role == "User" ?  
//       await prisma.tribeMember.findMany({
//         where : {
//             userId : session?.user?.id
//         },
//         include : {
//             tribe : {
//                 include : {
//                     organisation : true
//                 }
//             }
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       }) 
//       : 
//       await prisma.tribeAthlete.findMany({
//         where : {
//             userId : session?.user?.id
//         },
//         include : {
//             tribe : {
//                 include : {
//                     organisation : true
//                 }
//             }
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       }) 

//     //   // Separate tribes into `isMemberTribe` and `notMemberTribe`
//     //   const isMemberTribe = [];

//     //   tribes.forEach((tribe) => {
//     //     const enrichedTribe = {
//     //       ...tribe,
//     //       isMember: tribe.members?.length > 0, // Check if user is a member of the tribe
//     //     };
//     //     if (enrichedTribe.isMember) {
//     //       isMemberTribe.push(enrichedTribe);
//     //     }
//     //   });

//       // Sort tribes: place the active tribe at the top
//       const sortedTribes = tribes.sort((a, b) => {
//         if (a?.tribe?.organisation.shortName === activeTribePage) {
//           return -1; // Place active tribe at the top
//         }
//         if (b?.tribe?.organisation.shortName === activeTribePage) {
//           return 1; // Ensure it's moved to the top
//         }
//         return 0; // Leave other tribes in original order
//       });

//       const tribesOptions =
//         sortedTribes?.map((_) => ({
//           label: _?.tribe?.organisation?.shortName,
//           id: _?.tribe?.organisation?.shortName,
//           tribeId : _?.tribe?.id
//         })) || [];

//       const PublicOptions = session?.user?.role == "User" && {
//         label: "Public Feed",
//         id: "public-feed",
//       };

//       return res.status(200).json({
//         success: true,
//         data: {
//           tribes: PublicOptions?  [ PublicOptions, ...tribesOptions] : tribesOptions,
//           activeTribe: activeTribePage ? tribesOptions[0] : session?.user?.role == "User" ? PublicOptions : tribesOptions[0],
//         },
//       });
//     } else {
//       return res.status(405).json({ error: "Method not allowed" });
//     }
//   } catch (err) {
//     console.error("Error fetching tribes:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
