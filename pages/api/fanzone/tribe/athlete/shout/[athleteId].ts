// // pages/api/user/getShouts.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../auth/[...nextauth]";
// import prisma from "../../../../../../lib/prisma";
// import getB2TokenForFileDownload from "../../../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Allow only GET requests
//     if (req.method !== "GET") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     // Get the session and validate the user
//     const { athleteId } = req.query;
//     if (!athleteId) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const userId = athleteId as string;

//     // Fetch all shouts by the session user with associated tribe name
//     const userShouts = await prisma.tribeShout.findMany({
//       where: { userId },
//       orderBy: { createdAt: "desc" },
//       include: {
//         media: true,
//         comments: {
//           include: {
//             replies: true,
//             likes: true,
//             postedBy: {
//               select: {
//                 id: true,
//                 username: true,
//                 image: true,
//                 isMvpzAccount: true,
//                 isMascot: true,
//                 role : true
//               },
//             },
//           },
//           orderBy: {
//             id: "desc",
//           },
//         },
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             role : true
//           },
//         },
//         claps: {
//           select: {
//             id: true,
//           },
//         },
//         shares: {
//           select: {
//             id: true,
//           },
//         },
//         clovers: {
//           select: {
//             id: true,
//           },
//         },
//         bolts: {
//           select: {
//             id: true,
//           },
//         },
//       },
//     });

//     const memberTribes = await prisma.tribeMember.findMany({
//       where: { userId },
//       select: {
//         tribeId: true,
//         tribe: {
//           include: {
//             organisation: {
//               select: {
//                 fullName: true,
//                 shortName: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     const handleCheck = async (tribeId) => {
//       const getOrgaId = await prisma.tribe.findFirst({
//         where: {
//           id: tribeId,
//         },
//         select: {
//           organisationId: true,
//         },
//       });

//       const athletes = await prisma.tribe.findFirst({
//         where: {
//           id: tribeId,
//         },
//         select: {
//           athletes: true,
//         },
//       });

//       for (const athlete of athletes.athletes) {
//         const nftCard = await prisma.nFTEntity.findFirst({
//           where: {
//             currentOwnerId: athlete.userId,
//             organisationId: getOrgaId.organisationId,
//           },
//         });

//         if (nftCard) {
//           const hasCard = await prisma.nFTPurchaseCard.findFirst({
//             where: {
//               nftEntityId: nftCard?.id,
//             },
//           });

//           if (hasCard) {
//             return true;
//           }
//         }
//       }

//       const nftCard = await prisma.nFTEntity.findFirst({
//         where: {
//           organisationId: getOrgaId.organisationId,
//         },
//       });

//       if (nftCard) {
//         const hasCard = await prisma.nFTPurchaseCard.findFirst({
//           where: {
//             nftEntityId: nftCard?.id,
//           },
//         });

//         return !!hasCard;
//       } else {
//         return false;
//       }
//     };

//     const getTribeName = async (postId) => {
//       const getTribe = await prisma.tribeShout.findFirst({
//         where: {
//           id: postId,
//         },
//         include: {
//           tribe: {
//             select: {
//               organisation: true,
//               tribeName: true,
//             },
//           },
//         },
//       });

//       if (getTribe) {
//         return getTribe?.tribe?.tribeName;
//       }

//       return "";
//     };

//     const getPostType = async (postId) => {
//       const getTribe = await prisma.tribeShout.findFirst({
//         where: {
//           id: postId,
//         },
//         include: {
//           tribe: {
//             select: {
//               organisation: true,
//             },
//           },
//         },
//       });

//       if (getTribe) {
//         return `Feed ${getTribe.tribe.organisation.shortName}`;
//       }

//       return "Feed";
//     };

//     const updatedPosts = await Promise.all(
//       userShouts.map(async (shout) => ({
//         ...shout,
//         hasCard: await handleCheck(shout?.tribeId),
//         tribeName: await getTribeName(shout?.id),
//         postType: await getPostType(shout?.id),
//       }))
//     );

//     if (!userId) {
//       // Fetch claps, clovers, and bolts made by the current user
//       const [claps, clovers, bolts] = await Promise.all([
//         prisma.tShtClap.findMany({
//           where: {
//             userId,
//             shoutId: { in: updatedPosts.map((post) => post.id) },
//           },
//         }),
//         prisma.tShtClover.findMany({
//           where: {
//             userId,
//             shoutId: { in: updatedPosts.map((post) => post.id) },
//           },
//         }),
//         prisma.tShtBolt.findMany({
//           where: {
//             userId,
//             shoutId: { in: updatedPosts.map((post) => post.id) },
//           },
//         }),
//       ]);

//       // Create Sets for quick lookup
//       const clappedPostIds = new Set(claps.map((clap) => clap.shoutId));
//       const cloveredPostIds = new Set(clovers.map((clover) => clover.shoutId));
//       const boltedPostIds = new Set(bolts.map((bolt) => bolt.shoutId));

//       // Map over posts and add 'hasClapped', 'hasClover', and 'hasBolt' fields
//       const postsWithInteractionStatus = updatedPosts.map((post) => ({
//         ...post,
//         hasClapped: clappedPostIds.has(post.id),
//         hasClover: cloveredPostIds.has(post.id),
//         hasBolt: boltedPostIds.has(post.id),
//         isOwner: post.postedBy.id === userId,
//         total_reactions:
//           post?.claps.length + post?.clovers.length + post?.bolts.length,
//       }));

//       const b2res = (await getB2TokenForFileDownload()) as any;
//       return res.status(200).json({
//         posts: postsWithInteractionStatus,
//         tribeList: memberTribes,
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     } else {
//       const postsWithTotalReactions = updatedPosts.map((post) => ({
//         ...post,
//         tribeList: memberTribes,
//         total_reactions:
//           post?.claps.length + post?.clovers.length + post?.bolts.length, // Total reactions for non-authenticated users
//       }));

//       const b2res = (await getB2TokenForFileDownload()) as any;
//       return res.status(200).json({
//         posts: postsWithTotalReactions,
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching user shouts:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
