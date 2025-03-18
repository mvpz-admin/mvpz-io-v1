// // import { NextApiRequest, NextApiResponse } from "next";
// // import prisma from "../../../../lib/prisma";
// // import getB2TokenForFileDownload from "../../../../lib/backBlaze";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../../auth/[...nextauth]";

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   try {
// //     if (req.method === "GET") {
// //       // Get session for the current user
// //       const session = await getServerSession(req, res, authOptions);
// //       const userId = session?.user?.id;
// //       const query = req?.query?.q

// //       // Fetch tribes with associated organisation
// //       const tribes = await prisma.tribe.findMany({
// //         include: {
// //           organisation: true, // Include associated organisation
// //           members: {
// //             // Include tribe members to check membership
// //             where: { userId },
// //             select: { userId: true },
// //           },
// //         },
// //         orderBy: {
// //           createdAt: "desc",
// //         },
// //         take : 100
// //       });

// //       // Separate tribes into `isMemberTribe` and `notMemberTribe`
// //       const isMemberTribe = [];
// //       const notMemberTribe = [];

// //       tribes.forEach((tribe) => {
// //         const enrichedTribe = {
// //           ...tribe,
// //           isMember: tribe.members.length > 0, // Check if user is a member of the tribe
// //         };

// //         if (enrichedTribe.isMember) {
// //           isMemberTribe.push(enrichedTribe);
// //         } else {
// //           notMemberTribe.push(enrichedTribe);
// //         }
// //       });

// //       // Fetch Backblaze token for image downloads
// //       const b2res = (await getB2TokenForFileDownload()) as any;

// //       // Return separated tribes and Backblaze image download details
// //       return res.status(200).json({
// //         isMemberTribe,
// //         notMemberTribe,
// //         imageDownload: {
// //           downloadUrl: b2res.downloadUrl,
// //           authorizationToken: b2res.authorizationToken,
// //         },
// //       });
// //     } else {
// //       return res.status(405).json({ error: "Method not allowed" });
// //     }
// //   } catch (err) {
// //     console.error("Error fetching tribes:", err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // }



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
//     if (req.method === "GET") {
//       // Get session for the current user
//       const session = await getServerSession(req, res, authOptions);
//       const userId = session?.user?.id;
//       const query = req?.query?.q as string | undefined;

//       // Fetch tribes with associated organisation
//       const tribes = await prisma.tribe.findMany({
//         include: {
//           organisation: true, // Include associated organisation
//           members: {
//             // Include tribe members to check membership
//             where: { userId },
//             select: { userId: true },
//           },
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//         take: 100,
//       });

//       const isMemberTribe = [];
//       const notMemberTribe = [];
//       const matchedTribes = [];

//       if (query) {
//         // Create regex from the query
//         const regex = new RegExp(query, "i");

//         tribes.forEach((tribe) => {
//           const matchProbability = (() => {
//             if (regex.test(tribe.tribeName)) return 100;

//             const orgFields = [
//               tribe.organisation.name,
//               tribe.organisation.league,
//               tribe.organisation.division,
//               tribe.organisation.shortName,
//             ];

//             if (orgFields.some((field) => regex.test(field))) return 80;

//             return 0;
//           })();

//           const enrichedTribe = {
//             ...tribe,
//             isMember: tribe.members.length > 0,
//             matchProbability,
//           };

//           if (matchProbability > 0) {
//             matchedTribes.push(enrichedTribe);
//           } else if (enrichedTribe.isMember) {
//             isMemberTribe.push(enrichedTribe);
//           } else {
//             notMemberTribe.push(enrichedTribe);
//           }
//         });

//         // Sort matched tribes by match probability descending
//         matchedTribes.sort((a, b) => b.matchProbability - a.matchProbability);
//       } else {
//         tribes.forEach((tribe) => {
//           const enrichedTribe = {
//             ...tribe,
//             isMember: tribe.members.length > 0,
//           };

//           if (enrichedTribe.isMember) {
//             isMemberTribe.push(enrichedTribe);
//           } else {
//             notMemberTribe.push(enrichedTribe);
//           }
//         });
//       }

//       // Fetch Backblaze token for image downloads
//       const b2res = (await getB2TokenForFileDownload()) as any;

//       // Return separated tribes, matched tribes, and Backblaze image download details
//       return res.status(200).json({
//         matchedTribes,
//         isMemberTribe,
//         notMemberTribe,
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
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