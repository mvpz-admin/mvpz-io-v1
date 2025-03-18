// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getServerSession(req, res, authOptions);

//   if (req.method !== "GET") {
//     return res.status(400).json({ error: "ONLY GET ALLOWED" });
//   }

//   try {
//     if (!session?.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const tribe = req.query.tribe;

//     const currentDate = new Date();

//     // Fetch all tribe challenges with related data
//     let tribeChallenges;

//     if (tribe) {
//       let getTribeId = await prisma.tribe.findFirst({
//         where: { tribeName: tribe as string },
//       });

//       tribeChallenges =   await prisma.tribeChallenges.findMany({
//         where: {
//           tribeId: getTribeId.id,
//         },
//         include: {
//           userChallenges: {
//             include: {
//               challengeCards: true, // Fetch challenge cards
//             },
//           },
//           tribe: {
//             include: {
//               organisation: true,
//             },
//           },
//           challengeCards: {
//             include: {
//               nftEntity: {
//                 select: {
//                   title: true,
//                   type: true,
//                   cardImageNFT: true,
//                   design: true,
//                   membershipTier: true,
//                 },
//               },
//             },
//           },
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
//     } else {
//       tribeChallenges =  await prisma.tribeChallenges.findMany({
//         include: {
//           userChallenges: {
//             include: {
//               challengeCards: true, // Fetch challenge cards
//             },
//           },
//           tribe: {
//             include: {
//               organisation: true,
//             },
//           },
//           challengeCards: {
//             include: {
//               nftEntity: {
//                 select: {
//                   title: true,
//                   type: true,
//                   cardImageNFT: true,
//                   design: true,
//                   membershipTier: true,
//                 },
//               },
//             },
//           },
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
//     }

//     // Process each challenge
//     const processedChallenges = await Promise.all(
//       tribeChallenges.map(async (challenge) => {
//         const totalChallengeCards = challenge.userChallenges.reduce(
//           (acc, userChallenge) => acc + userChallenge.challengeCards.length,
//           0
//         );

//         const isExpired =
//           challenge.endDate && new Date(challenge.endDate) < currentDate;
//         const isLimitReached = challenge.challengeLimit <= totalChallengeCards;

//         let totalXp = 0;

//         // Check if the user owns all required cards for this challenge
//         const cards = await Promise.all(
//           challenge.challengeCards.map(async (card) => {
//             const xpFactor = await prisma.xPFactor.findFirst({
//               where:
//                 card.nftEntity.type === "Athlete"
//                   ? {
//                       type: card.nftEntity.type,
//                       membershipTier: card.nftEntity.membershipTier,
//                     }
//                   : { type: card.nftEntity.type },
//             });

//             if (xpFactor) {
//               totalXp += xpFactor.factorValue;
//             }

//             const hasPurchasedCard = await prisma.nFTPurchaseCard.findFirst({
//               where: {
//                 nftEntityId: card.nftEntityId,
//                 currentOwnerId: session.user.id,
//               },
//             });

//             const hasMintedCard = await prisma.nFTMintCard.findFirst({
//               where: {
//                 nftEntityId: card.nftEntityId,
//                 currentOwnerId: session.user.id,
//               },
//             });

//             return {
//               ...card,
//               hasCard: hasPurchasedCard || hasMintedCard ? true : false,
//             };
//           })
//         );

//         // User is eligible only if they own *all* required cards
//         const isEligible = cards.every((owned) => owned.hasCard === true);

//         const isCompleted = await prisma.userChallenge.findFirst({
//           where: {
//             challengeId: challenge?.id,
//             userId: session?.user?.id,
//           },
//         });

//         return {
//           ...challenge,
//           challengeCards: cards,
//           tribeExp: isExpired || isLimitReached, // Mark as expired if necessary
//           totalUserCompletedChallenge: totalChallengeCards,
//           isEligible,
//           totalXp,
//           isCompleted:  !!isCompleted,
//         };
//       })
//     );

//     // Order challenges - expired challenges at the bottom
//     const orderedChallenges = [
//       ...processedChallenges.filter((challenge) => !challenge.tribeExp), // Active challenges first
//       ...processedChallenges.filter((challenge) => challenge.tribeExp), // Expired challenges last
//     ];

//     // Fetch Backblaze B2 image download URL
//     const b2res = (await getB2TokenForFileDownload()) as any;

//     const getNftPurchaseCard = await prisma.nFTPurchaseCard.findMany({
//       where: {
//         currentOwnerId: session?.user?.id,
//       },
//       include: {
//         nftEntity: true,
//       },
//     });

//     const getNftMintCard = await prisma.nFTPurchaseCard.findMany({
//       where: {
//         currentOwnerId: session?.user?.id,
//       },
//       include: {
//         nftEntity: true,
//       },
//     });

//     return res.status(200).json({
//       success: true,
//       data: {
//         list: orderedChallenges,
//         collections: [...getNftPurchaseCard, ...getNftMintCard],
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       },
//     });
//   } catch (err) {
//     await prisma.logError.create({
//       data: {
//         apiName: "/api/earnings",
//         collection: "(N/A)",
//         errorLog: `${err}`,
//         title: `Error While Fetching Earnings For ${session?.user?.username}`,
//       },
//     });

//     console.error(err);
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// }
