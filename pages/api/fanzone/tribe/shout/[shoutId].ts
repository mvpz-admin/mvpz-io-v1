// import { NextApiRequest, NextApiResponse } from "next";
// import { authOptions } from "../../../auth/[...nextauth]";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../../lib/prisma";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { shoutId } = req.query;

//   if (!shoutId || typeof shoutId !== "string") {
//     return res
//       .status(400)
//       .json({ error: "Post ID is required and must be a string" });
//   }

//   try {
//     const session = await getServerSession(req, res, authOptions);

//     const shout = await prisma.tribeShout.findUnique({
//       where: { 
//         id: shoutId as string,
//         userId : {
//           in: await prisma.user.findMany({
//             select: { id: true },
//           }).then((users) => users.map((user) => user.id)),
//         },
//        },
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
//                 isMvpzAccount : true,
//                 isMascot : true,
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

//     if (!shout) {
//       return res.status(404).json({ error: "Post not found" });
//     }

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

//     const updatedPosts = {
//       ...shout,
//       hasCard: await handleCheck(shout.tribeId),
//       tribeName: await getTribeName(shout?.id),
//         postType: await getPostType(shout?.id),
//     };

//     if (session?.user?.id) {
//       const userId = session.user.id;

//       // Fetch claps, clovers, and bolts made by the current user for this post
//       const [clap, clover, bolt] = await Promise.all([
//         prisma.tShtClap.findFirst({
//           where: { userId, shoutId: shoutId },
//         }),
//         prisma.tShtClover.findFirst({
//           where: { userId, shoutId: shoutId },
//         }),
//         prisma.tShtBolt.findFirst({
//           where: { userId, shoutId: shoutId },
//         }),
//       ]);

//       const totalClaps = shout.claps.length;
//       const totalClovers = shout.clovers.length;
//       const totalBolts = shout.bolts.length;

//       const totalReactions = totalClaps + totalClovers + totalBolts;

//       const tipPriceRange = await prisma.postTipRage.findFirst()

//       // Add 'hasClapped', 'hasClover', and 'hasBolt' fields to the post
//       const postWithInteractionStatus = {
//         ...updatedPosts,
//         hasClapped: !!clap, // true if the user has clapped the post
//         hasClover: !!clover, // true if the user has added a clover
//         hasBolt: !!bolt, // true if the user has sent a bolt
//         isOwner: shout.postedBy.id === userId,
//         total_reactions: totalReactions,
//         tipPriceRange
//       };

//       const b2res = (await getB2TokenForFileDownload()) as any;
//       return res
//         .status(200)
//         .json({
//           post: postWithInteractionStatus,
//           imageDownload: {
//             downloadUrl: b2res.downloadUrl,
//             authorizationToken: b2res.authorizationToken,
//           },
//         });
//     } else {
//       const totalClaps = shout.claps.length;
//       const totalClovers = shout.clovers.length;
//       const totalBolts = shout.bolts.length;

//       const totalReactions = totalClaps + totalClovers + totalBolts;

//       const b2res = (await getB2TokenForFileDownload()) as any;
//       return res.status(200).json({
//         post: {
//           ...updatedPosts,
//           total_reactions: totalReactions,
//         },
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
