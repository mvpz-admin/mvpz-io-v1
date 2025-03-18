// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../../lib/prisma";
// import { authOptions } from "../../../auth/[...nextauth]";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const calculateShareAmount = (amount, percentage) =>
//     parseFloat(((amount * percentage) / 100).toFixed(2));

// const getBadgeIcon = ({
//     subType
//   }) => {
//     switch(subType){
//      case "BIG_GAME" : 
//       return "/images/badges/Big_Game.png"
//      case  "RECORD_BREAKER" :
//       return "/images/badges/Record_Breaker.png"
//      case   "HOT_STREAK" :
//       return "/images/badges/Hot_Streak.png"
//      case  "TRUE_STRENGTH" :
//       return "/images/badges/True_Strength.png"
//      case  "FIRST_CHOICE" :
//       return "/images/badges/First_Choice.png"
//      case   "MILESTONE" :
//       return "/images/badges/Milestone.png"
//     }
//   }
  
//   const baseImage = "/images/badges/baseImg.png"
  
//   function formatTitle({type}): string {
//     return type
//       .toLowerCase()
//       .replace(/_/g, ' ')
//       .replace(/\b\w/g, char => char.toUpperCase());
//   }
  
  
  

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (req.method !== "POST") {
//       return res.status(400).json({ error: "Only POST method allowed" });
//     }

//     const { stripeSessionId } = req.body;

//     if (!stripeSessionId) {
//       return res.status(400).json({ error: "Missing stripeSessionId" });
//     }

//     // Fetch session details from Stripe
//     const stripeSession = await stripe.checkout.sessions.retrieve(
//       stripeSessionId
//     );
//     if (!stripeSession) {
//       return res.status(404).json({ error: "Stripe session not found" });
//     }

//     // Extract metadata
//     const metadata = stripeSession.metadata;
//     if (!metadata || !metadata.selectedEnhancements || !metadata.serialNumber) {
//       return res
//         .status(400)
//         .json({ error: "Missing metadata from Stripe session" });
//     }

//     const enhancementIds = JSON.parse(metadata.selectedEnhancements)?.map((_) => _.id);
    
//     // Fetch enhancements by IDs from database
//     const majorEnhancements = await prisma.nFTMajorEnhancement.findMany({
//         where: { id: { in: enhancementIds } },
//         include : {
//             type : true
//         }
//       }).then((eh) => eh?.map((_) => ({
//         ..._,
//         type : "major",
//         enhType : formatTitle({ type: _.type.subType}),
//         catType : _.type.type,
//         catSubType: _.type.subType,
//       })))
      
//       const minorEnhancements = await prisma.nFTMinorEnhancement.findMany({
//         where: { id: { in: enhancementIds } },
//         include : {
//             type : true
//         }
//       }).then((eh) => eh?.map((_) => ({
//         ..._,
//         type : "minor",
//         enhType : formatTitle({ type: _.type.subType}),
//         catType : _.type.type,
//         catSubType: _.type.subType,
//         badgeIcon : getBadgeIcon({
//           subType: _.type.subType,
//         }),
//         baseImage
//       })))
      
//       const selectedEnhancements = [...majorEnhancements, ...minorEnhancements];
      

//     const serialNumber = metadata.serialNumber;
//     const userId = metadata.userId;

//     // Find the payment attempt
//     const payment = await prisma.paymentAttempt.findFirst({
//       where: { stripeSessionId },
//     });
//     if (!payment) {
//       return res.status(404).json({ error: "Payment record not found" });
//     }

//     // Update payment status to "SUCCESS"
//     await prisma.paymentAttempt.update({
//       where: { id: payment.id },
//       data: { paymentStatus: "SUCCESS" },
//     });

//     // Identify if the card is purchased or minted
//     const purchasedCard = await prisma.nFTPurchaseCard.findFirst({
//       where: { cardSerialNumber: serialNumber },
//     });
//     const mintedCard = await prisma.nFTMintCard.findFirst({
//       where: { cardSerialNumber: serialNumber },
//     });

//     const purchaseId = purchasedCard ? purchasedCard.id : null;
//     const mintId = mintedCard ? mintedCard.id : null;

//     if (!purchaseId && !mintId) {
//       return res.status(404).json({ error: "Card not found" });
//     }

//     // Store the purchased enhancements
//     for (const enh of selectedEnhancements) {
//       if (enh.type === "minor") {
//         await prisma.nFTMinorEnhancementPurchase.create({
//           data: {
//             purchaseId,
//             mintId,
//             nftMinorEnhancementId: enh.id, 
//           },
//         });
//       } else if (enh.type === "major") {
//         await prisma.nFTMajorEnhancementPurchase.create({
//           data: {
//             purchaseId,
//             mintId,
//             nftMajorEnhancementId: enh.id, 
//           },
//         });
//       }
//     }

//     let payableEnhancements = selectedEnhancements?.filter((enh: any) => enh.price !== null) || [];

//     await Promise.all(
//         payableEnhancements.map(async (enh: any) => {
//           console.log({ enh });
      
//           const getNft = await prisma.nFTEntity.findFirst({
//             where: { id: enh.nftEntityId },
//             include: { athlete: true },
//           });
      
//           if (!getNft) return;
      
//           let prodPrice = enh.price;
//           let athleteSharePer = getNft.mintAthleteShare;
//           let mvpzSharePer = getNft.mintAthleteShare;
      
//           let stripeCharges = await prisma.stripeCharges.findFirst();
      
//           let stripeChargesCal =
//             (enh.price * stripeCharges.transactionCharge) / 100 +
//             stripeCharges.paymentSuccessCharge;
      
//           prodPrice -= stripeChargesCal;
      
//           const athleteShare = calculateShareAmount(prodPrice, athleteSharePer);
      
//           const getWebstribeId = await prisma.webStripe.findFirst({
//             where: { userId: getNft.athleteId },
//           });
      
//           let account = getWebstribeId
//             ? await stripe.accounts.retrieve(getWebstribeId.customerId)
//             : null;
      
//           let withdrawType = await prisma.earningWithdrawAccess.findFirst();
      
//           let mvpzEarn = calculateShareAmount(prodPrice, mvpzSharePer);
      
//           let stripePayout = await prisma.stripePayout.create({
//             data: {
//               amount: athleteShare,
//               metadata: JSON.stringify({
//                 collection: "Enhancement",
//                 payoutId: getNft?.id,
//               }),
//               type: "card",
//               fromUserId: null,
//               payoutUserId: getNft.athlete.id,
//             },
//           });
      
//           await prisma.mvpzEarnings.create({
//             data: {
//               earnedAmount: mvpzEarn,
//               stripeCharges: stripeChargesCal,
//               type: "card",
//               stripePayoutId: stripePayout?.id,
//             },
//           });
      
//           if (withdrawType?.type === "instant") {
//             if (account?.payouts_enabled) {
//               const payout = await stripe.transfers.create({
//                 amount: stripePayout.amount * 100,
//                 currency: "usd",
//                 destination: account.id,
//               });
      
//               if (payout) {
//                 await prisma.stripePayout.update({
//                   where: { id: stripePayout.id },
//                   data: { isWithdraw: true },
//                 });
//               }
      
//               await prisma.notification.create({
//                 data: {
//                   type: "GENERAL",
//                   title: `$${stripePayout.amount} has been claimed successfully!`,
//                   message: `We have transferred $${stripePayout.amount} to your Stripe account successfully!`,
//                   userId: getNft.athleteId,
//                 },
//               });
//             }
//           }
//         })
//       );

//     await prisma.notification.create({
//       data: {
//         title: "Enhancement done successfully!",
//         message: "All enhancements applied! Your card is now updated. 🚀",
//         type: "GENERAL",
//         userId: session?.user?.id,
//       },
//     });

//     return res.json({
//       success: true,
//       message: "Enhancements successfully added",
//       data : {
//         serialNumber,
//         selectedEnhancements
//       }
//     });
//   } catch (err) {
//     console.error("Payment success error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
