// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";
// import prisma from "../../../../../lib/prisma";
// import { authOptions } from "../../../auth/[...nextauth]";

// interface B2APIType {
//   downloadUrl: String;
//   authorizationToken: String;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "POST") {
//       const { cardId, title, description, price } = req.body;
//       const session = await getServerSession(req, res, authOptions);

//       let nFTMintCard = await prisma.nFTMintCard.findUnique({
//         where: {
//           id: cardId.toString(),
//         },
//         include: {
//           nftEntity: {
//             select: {
//               id: true,
//               title: true,
//               type: true,
//               description: true,
//               rarity: true,
//               position: true,
//               edition: true,
//               cardImageNFT: true,
//               design: true,
//               designer: true,
//               sport: true,
//               special: true,
//               school: true,
//               membershipTier: true,
//               year: true,
//               sex: true,
//               athlete: { select: { name: true, username: true } },
//               price: true,
//             },
//           },
//         },
//       });

//       let nFTPurchaseCard;

//       if (!nFTMintCard) {
//         nFTPurchaseCard = await prisma.nFTPurchaseCard.findUnique({
//           where: {
//             id: cardId.toString(),
//           },
//           include: {
//             nftEntity: {
//               select: {
//                 id: true,
//                 title: true,
//                 type: true,
//                 description: true,
//                 rarity: true,
//                 position: true,
//                 edition: true,
//                 cardImageNFT: true,
//                 design: true,
//                 designer: true,
//                 sport: true,
//                 special: true,
//                 school: true,
//                 membershipTier: true,
//                 year: true,
//                 sex: true,
//                 medal: true,
//                 athlete: { select: { name: true, username: true } },
//               },
//             },
//           },
//         });
//       }

//       if (!!nFTMintCard) {
//         let challengeCard = await prisma.userChallengeCard.findFirst({
//           where: {
//             nftMintCardId: nFTMintCard?.id,
//           },
//           include: {
//             userChallenge: {
//               include: {
//                 challenge: true,
//               },
//             },
//           },
//         });

//         let getExpDate = challengeCard.userChallenge.challenge.endDate;
//         let isExpired = new Date(getExpDate) < new Date();

//         if (!isExpired) {
//           return res
//             .status(400)
//             .json({
//               success: false,
//               error: `You've assigned this card to a challenge. It cannot be sold until the challenge expires!`,
//             });
//         }
//       }

//       if (!!nFTPurchaseCard) {
//         let challengeCard = await prisma.userChallengeCard.findFirst({
//           where: {
//             nftPurchaseCardId: nFTPurchaseCard?.id,
//           },
//           include: {
//             userChallenge: {
//               include: {
//                 challenge: true,
//               },
//             },
//           },
//         });

//         // let getExpDate = challengeCard.userChallenge.challenge.endDate;
//         // let isExpired = new Date(getExpDate) < new Date();

//         // if (!isExpired) {
//         //   return res
//         //     .status(400)
//         //     .json({
//         //       success: false,
//         //       error: `You've assigned this card to a challenge. It cannot be sold until the challenge expires!`,
//         //     });
//         // }
//       }

//       if (!!nFTPurchaseCard) {
//         let create = await prisma.marketplaceCard.create({
//           data: {
//             sellingPrice: price,
//             title,
//             description,
//             nftPurchaseCardId: nFTPurchaseCard?.id,
//             sellerId: session?.user?.id,
//           },
//         });

//         const getTradeHistory = await prisma.markeCardTradeHistory.findMany({
//           where: {
//             nftPurchaseCardId: nFTPurchaseCard?.id,
//           },
//         });

//         if (getTradeHistory?.length == 0) {
//           await prisma.markeCardTradeHistory.create({
//             data: {
//               buyerId: session?.user?.id,
//               nftPurchaseCardId: nFTPurchaseCard?.id,
//               buyAtPrice: nFTPurchaseCard.purchasePrice,
//             },
//           });
//         }

//         await prisma.notification.create({
//           data: {
//             userId: session?.user?.id,
//             type: "GENERAL",
//             title: "Your Card Is Now Live! 🎉",
//             message:
//               "Your card is officially listed on the market and ready to sell.  🚀",
//           },
//         });
//       } else {
//         let create = await prisma.marketplaceCard.create({
//           data: {
//             sellingPrice: price,
//             title,
//             description,
//             nftMintCardId: nFTMintCard.id,
//             sellerId: session?.user?.id,
//           },
//         });

//         const getTradeHistory = await prisma.markeCardTradeHistory.findMany({
//           where: {
//             nftPurchaseCardId: nFTMintCard.id,
//           },
//         });

//         if (getTradeHistory?.length == 0) {
//           await prisma.markeCardTradeHistory.create({
//             data: {
//               buyerId: session?.user?.id,
//               nftMintCardId: nFTMintCard?.id,
//               buyAtPrice: nFTMintCard.nftEntity.price,
//             },
//           });
//         }

//         await prisma.notification.create({
//           data: {
//             userId: session?.user?.id,
//             type: "GENERAL",
//             title: "Your Card Is Now Live! 🎉",
//             message:
//               "Your card is officially listed on the market and ready to sell.  🚀",
//           },
//         });
//       }

//       // get minum price
//       const getTradeStartingPrice =
//         await prisma.tradeSellingStartPrice.findFirst();
//       let amount = nFTPurchaseCard
//         ? nFTPurchaseCard.purchasePrice
//         : nFTMintCard.nftEntity.price;
//       let amountPercentage =
//         (amount * (getTradeStartingPrice.price || 20)) / 100;
//       let minimumAmt = amount + amountPercentage;

//       // check is prod live
//       const isPrdLive = await prisma.marketplaceCard.findFirst({
//         where: nFTPurchaseCard
//           ? {
//               nftPurchaseCardId: nFTPurchaseCard?.id,
//             }
//           : {
//               nftMintCardId: nFTPurchaseCard?.id,
//             },
//       });

//       const b2res = (await getB2TokenForFileDownload()) as B2APIType;
//       res.status(200).json({
//         success: true,
//         data: {
//           card: nFTPurchaseCard || nFTMintCard,
//           startSellingPrice: minimumAmt,
//           isLive: !!isPrdLive,
//           liveInfo: isPrdLive,
//           imageDownload: {
//             downloadUrl: b2res.downloadUrl,
//             authorizationToken: b2res.authorizationToken,
//           },
//         },
//       });
//     } else {
//       res.status(400).json({ error: "ONLY GET ALLOWED" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
