// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2023-10-16",
// });

// function calculatePercentage(amount, percentage) {
//   return (amount * percentage) / 100;
// }

// const calculateShareAmount = (amount, percentage) =>
//   parseFloat(((amount * percentage) / 100).toFixed(2));

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getServerSession(req, res, authOptions);
//   if (req.method !== "GET" && !session?.user?.email) {
//     return res.status(400).json({ error: "ONLY GET ALLOWED" });
//   }

//   try {
//     let cardEarnings = null;

//     if (session?.user?.role == "Athlete") {
//       let purchaseCard = [];
//       let mintCard = [];
//       let data = [];
//       let athleteId = session?.user?.id;
//       let totalPMCard = await prisma.nFTEntity.findMany({
//         where: {
//           athleteId: athleteId as string,
//         },
//         include: {
//           puchaseCards: true,
//           mintCards: true,
//         },
//       });

//       let totalcard = totalPMCard
//         ?.map((_) => ({
//           ppLength: _.puchaseCards.length,
//           mpLenght: _.mintCards.length,
//           total: _.puchaseCards.length + _.mintCards.length,
//         }))
//         .reduce((acc: number, currentItem) => acc + currentItem.total, 0);

//       // Fetch NFT Entities with related data
//       const nFTEntity = await prisma.nFTEntity.findMany({
//         where: {
//           athleteId: athleteId as string,
//         },
//         include: {
//           puchaseCards: {
//             where: {
//               status: { equals: "ASSIGNED" },
//             },
//           },
//           mintCards: {
//             where: { address: { not: null } },
//           },
//           athlete: true,
//         },
//       });

//       // Process purchase cards
//       purchaseCard = await Promise.all(
//         nFTEntity.flatMap((nft) =>
//           nft.puchaseCards.map(async (card) => {
//             const product = await prisma.product.findFirst({
//               where: { id: card.productId },
//             });

//             return {
//               ...card,
//               prodType: product?.type,
//               prodPackQty: product?.packQuantity || 1,
//               mintAthleteShare:
//                 nft.type === "Athlete" ? nft.mintAthleteShare : 0,
//             };
//           })
//         )
//       );

//       // Process mint cards
//       mintCard = nFTEntity.flatMap((nft) =>
//         nft.mintCards.map((card) => ({
//           ...card,
//           mintAthleteShare: nft.type === "Athlete" ? nft.mintAthleteShare : 0,
//         }))
//       );

//       // Create data arrays for purchase and mint cards
//       const dat1 = await Promise.all(
//         purchaseCard.map(async (card) => {
//           const afterQtyCal = card.prodPackQty
//             ? card.purchasePrice / card.prodPackQty
//             : card.purchasePrice;
//           const athleteShare = calculateShareAmount(
//             afterQtyCal,
//             card.mintAthleteShare
//           );
//           const mvpzShare = calculateShareAmount(
//             afterQtyCal,
//             100 - card.mintAthleteShare
//           );

//           const athleteInfo = await prisma.nFTEntity.findFirst({
//             where: {
//               id: card.nftEntityId,
//             },
//             include: {
//               athlete: true,
//             },
//           });

//           const userInfo = await prisma.user.findFirst({
//             where: {
//               id: card.currentOwnerId,
//             },
//           });

//           return {
//             collectionFrom: "Purchase",
//             purchaseCardId: card.id,
//             productId: card.productId,
//             nftEntityId: card.nftEntityId,
//             nftType: athleteInfo?.type,
//             athleteId:
//               athleteInfo?.type == "Athlete" ? athleteInfo?.athlete?.id : null,
//             athleteName:
//               athleteInfo?.type == "Athlete"
//                 ? athleteInfo?.athlete?.name
//                 : null,
//             cardEarnings: afterQtyCal,
//             buyerId: userInfo?.id,
//             buyerName: userInfo?.name,
//             productPrice: card.purchasePrice,
//             athleteShareAmt: athleteShare,
//             mvpzShareAmt: mvpzShare,
//             packType: card.prodType,
//             packQty: card.prodPackQty,
//             athMintShare: card.mintAthleteShare,
//             mintPaymentAddress: "N/A",
//             paymentMethods: "N/A",
//             multiplier: 1,
//             currency: "N/A",
//           };
//         })
//       );

//       const dat2 = await Promise.all(
//         mintCard.map(async (card) => {
//           const metaData = JSON.parse(card.saturnResponse);
//           const multiplier = metaData?.paymentMethod === "ADA" ? 0.7 : 1;
//           const currency = metaData?.paymentMethod === "ADA" ? "ADA" : "DOLLAR";

//           const afterPayCal =
//             metaData?.paymentMethod === "credit-card"
//               ? card.mintPrice
//               : card.mintPrice * multiplier;

//           const athleteShare = card.mintAthleteShare
//             ? calculateShareAmount(afterPayCal, card.mintAthleteShare)
//             : 0;
//           const mvpzShare = card.mintAthleteShare
//             ? calculateShareAmount(afterPayCal, 100 - card.mintAthleteShare)
//             : afterPayCal;

//           const athleteInfo = await prisma.nFTEntity.findFirst({
//             where: {
//               id: card.nftEntityId,
//             },
//             include: {
//               athlete: true,
//             },
//           });

//           let userInfo;

//           if (card.currentOwnerId) {
//             userInfo = await prisma.user.findFirst({
//               where: {
//                 id: card.currentOwnerId,
//               },
//             });
//           }

//           return {
//             collectionFrom: "Mint",
//             mintCardId: card.id,
//             productId: card.productId,
//             nftEntityId: card.nftEntityId,
//             nftType: athleteInfo?.type,
//             athleteId:
//               athleteInfo?.type === "Athlete" ? athleteInfo?.athlete?.id : null,
//             athleteName:
//               athleteInfo?.type === "Athlete"
//                 ? athleteInfo?.athlete?.name
//                 : null,
//             buyerId: userInfo?.id,
//             buyerName: userInfo?.name || "N/A",
//             cardEarnings: afterPayCal,
//             multiplier,
//             currency,
//             paymentMethods: metaData?.paymentMethod || "N/A",
//             mintPaymentAddress: card?.address,
//             athleteShareAmt: athleteShare,
//             mvpzShareAmt: mvpzShare,
//             athMintShare: card.mintAthleteShare,
//             productPrice: card.mintPrice,
//             packType: "N/A",
//             packQty: card.prodPackQty,
//           };
//         })
//       );

//       data = [...dat1, ...dat2];

//       const earnedMoney = () => {
//         let amount = data
//           ?.map((_) => _.athleteShareAmt)
//           ?.reduce(
//             (accumulator, currentValue) => accumulator + currentValue,
//             0
//           );
//         return parseFloat(amount).toFixed(2);
//       };

//       console.log({
//         totalcard,
//       });

//       cardEarnings = {
//         cardSold: data.length,
//         cardLeft: totalcard - data.length,
//         earnedMoney: earnedMoney(),
//       };
//     }

//     let tipEarnings = null;

//     const [publicPostTip, tribePostTip, tribeShoutsTip, athleteTips] =
//       await Promise.all([
//         await prisma.publicPostTips.findMany({
//           where: {
//             toUserId: session?.user?.id,
//             isPaymentSuccess: true,
//             isPaymentWithdrawn: false,
//           },
//           include: {
//             mvpzShare: true,
//             userShare: true,
//           },
//         }),
//         await prisma.tribePostTips.findMany({
//           where: {
//             toUserId: session?.user?.id,
//             isPaymentSuccess: true,
//             isPaymentWithdrawn: false,
//           },
//           include: {
//             mvpzShare: true,
//             userShare: true,
//           },
//         }),
//         await prisma.tribeShoutsTips.findMany({
//           where: {
//             toUserId: session?.user?.id,
//             isPaymentSuccess: true,
//             isPaymentWithdrawn: false,
//           },
//           include: {
//             mvpzShare: true,
//             userShare: true,
//           },
//         }),
//         await prisma.athleteTips.findMany({
//           where: {
//             toUserId: session?.user?.id,
//             isPaymentSuccess: true,
//             isPaymentWithdrawn: false,
//           },
//           include: {
//             mvpzShare: true,
//             userShare: true,
//           },
//         }),
//       ]);

//     let updatedPPTip = publicPostTip?.map((_) => ({
//       ..._,
//       amount: calculatePercentage(_.amount, _.userShare.shareAmount),
//     }));

//     let updatedTPTip = tribePostTip?.map((_) => ({
//       ..._,
//       amount: calculatePercentage(_.amount, _.userShare.shareAmount),
//     }));

//     let updatedTSTip = tribeShoutsTip?.map((_) => ({
//       ..._,
//       amount: calculatePercentage(_.amount, _.userShare.shareAmount),
//     }));

//     let updatedATHTip = athleteTips?.map((_) => ({
//       ..._,
//       amount: calculatePercentage(_.amount, _.userShare.shareAmount),
//     }));

//     const allTips: any = [
//       ...updatedPPTip,
//       ...updatedTPTip,
//       ...updatedTSTip,
//       ...updatedATHTip,
//     ];

//     tipEarnings = {
//       totalEarn: parseFloat(
//         allTips.reduce(
//           (acc: number, currentItem) => acc + (currentItem.amount || 0),
//           0
//         )
//       ).toFixed(2),
//       lastTip:
//         allTips?.length > 0
//           ? parseFloat(
//               allTips.sort(
//                 (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
//               )[0]
//             ).toFixed(2)
//           : 0.0,
//       highestTip:
//         allTips?.length > 0
//           ? parseFloat(allTips.sort((a, b) => b.amount - a.amount)[0]).toFixed(
//               2
//             )
//           : 0.0,
//     };

//     let apprealEarnings = 0;

//     let referralsEarnings;

//     // const allReferrals = await prisma.payout.findMany({
//     //   where: {
//     //     userId: session.user.id,
//     //     type: "Apparel",
//     //   },
//     // });

//     // const signupReferrals = allReferrals.filter(
//     //   (r) => r.payoutPercentageType === "signup"
//     // );

//     // const productReferrals = allReferrals.filter(
//     //   (r) => r.payoutPercentageType === "productReferral"
//     // );

//     // const referredUsersCount = await prisma.user.count({
//     //   where: {
//     //     referrerId: session.user.id,
//     //     deactivated: false,
//     //   },
//     // });

//     // referralsEarnings = {
//     //   signupReferralsCount: signupReferrals.length,
//     //   signupReferralsAmount: signupReferrals.reduce(
//     //     (total, r) => total + r.payoutAmount,
//     //     0
//     //   ),
//     //   productReferralsCount: productReferrals.length,
//     //   productReferralsAmount: productReferrals.reduce(
//     //     (total, r) => total + r.payoutAmount,
//     //     0
//     //   ),
//     //   signupsCount: referredUsersCount,
//     // };

//     const allReferrals: any = await prisma.stripePayout.findMany({
//       where: {
//         payoutUserId: session.user.id,
//         type: "referral",
//       },
//     });

//     const signupReferrals: any = allReferrals.filter((r) => {
//       let getmetaData = JSON.parse(r.metadata);
//       return getmetaData?.referralType === "signup";
//     });

//     const productReferrals: any = allReferrals.filter((r) => {
//       let getmetaData = JSON.parse(r.metadata);
//       return getmetaData?.referralType === "productReferral";
//     });

//     const referredUsersCount = await prisma.user.count({
//       where: {
//         referrerId: session.user.id,
//         deactivated: false,
//       },
//     });

//     referralsEarnings = {
//       signupReferralsCount: signupReferrals.length,
//       signupReferralsAmount: parseFloat(
//         signupReferrals.reduce((total, r) => total + r.amount, 0)
//       ).toFixed(2),
//       productReferralsCount: productReferrals.length,
//       productReferralsAmount: parseFloat(
//         productReferrals.reduce((total, r) => total + r.amount, 0)
//       ).toFixed(2),
//       signupsCount: referredUsersCount,
//     };

//     const totatAmmount: any =
//       (cardEarnings ? Number(cardEarnings?.earnedMoney) : 0) +
//       Number(tipEarnings.totalEarn) +
//       Number(apprealEarnings) +
//       (referralsEarnings
//         ? Number(referralsEarnings?.signupReferralsAmount) +
//           Number(referralsEarnings?.productReferralsAmount)
//         : 0);

//     let isEligible = false;
//     let accountId = session?.user?.webStripe?.customerId;
//     let withdrawType = await prisma.earningWithdrawAccess.findFirst();

//     if (accountId) {
//       let account = await stripe.accounts.retrieve(accountId);

//       if (account || account.payouts_enabled) {
//         const getWithdrawLimit =
//           await prisma.stripeWithdrawPayoutLimit.findFirst();
//         const getUserPayoutToWithdraw = await prisma.stripePayout.findMany({
//           where: {
//             payoutUserId: session?.user?.id,
//             isWithdraw: false,
//           },
//         });

//         if (withdrawType.type === "instant") {
//           isEligible = true;
//         } else {
//           let totalPayounAmount = getUserPayoutToWithdraw.reduce(
//             (total, r) => total + r.amount,
//             0
//           );

//           if (totalPayounAmount >= getWithdrawLimit.minWithdraw) {
//             isEligible = true;
//           }
//         }
//       }
//     }

//     const payoutAmountReaming: any = await prisma.stripePayout.findMany({
//       where: {
//         isWithdraw: false,
//         payoutUserId: session?.user?.id,
//       },
//     });

//     const severStatus = await prisma.enableWithdraw.findFirst();

//     console.log({
//       severStatus,
//       isEligible
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         totatAmmount: parseFloat(totatAmmount).toFixed(2),
//         payout: parseFloat(
//           payoutAmountReaming?.reduce((total, r) => total + r.amount, 0)
//         ).toFixed(2),
//         cardEarnings,
//         tipEarnings,
//         apprealEarnings,
//         referralsEarnings,
//         isEligible,
//         severStatus: severStatus ? severStatus.isEnable : false,
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
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
