// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// function calculateShare({
//   amount,
//   userSharePercentage,
//   mvpzSharePercentage,
//   stripeCharges,
// }) {
//   let tipAmount = amount;
//   let userShare = (tipAmount * userSharePercentage) / 100;
//   let mvpzShare = (tipAmount * mvpzSharePercentage) / 100;

//   console.log({
//     userSharePercentage,
//     mvpzSharePercentage,
//     userShare,
//     mvpzShare,
//   });

//   if (amount < 5) {
//     let userShare: any = Number(tipAmount - stripeCharges).toFixed(2);

//     console.log("<5", {
//       mvpzShare: 0,
//       userShare,
//       userRound: Math.round(userShare),
//     });

//     return {
//       mvpzShare: 0,
//       userShare: Number(tipAmount - stripeCharges).toFixed(2),
//     };
//   }

//   let rMvpzShare: any = Number(mvpzShare - stripeCharges).toFixed(2);

//   console.log("> 5", {
//     mvpzShare: rMvpzShare,
//     mvpzRound: Math.round(rMvpzShare),
//     userShare: userShare,
//   });

//   return {
//     mvpzShare: Number(mvpzShare - stripeCharges).toFixed(2),
//     userShare: userShare,
//   };
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "GET") {
//       const { paymentId, callbackURL } = req.query;
//       try {
//         if (!paymentId) {
//           res.redirect(`${callbackURL}`);
//           return;
//         }

//         const paymentInfo = await prisma.athleteTips.update({
//           where: {
//             id: paymentId as string,
//           },
//           data: {
//             isPaymentSuccess: true,
//           },
//           include: {
//             fromUser: true,
//             toUser: true,
//             mvpzShare: true,
//             userShare: true,
//           },
//         });

//         // finding stripe accound if of user who got tip from webstripe collection
//         const getWebstribeId = await prisma.webStripe.findFirst({
//           where: {
//             userId: paymentInfo.toUserId,
//           },
//         });

//         // get account info if account id available
//         let account = getWebstribeId
//           ? await stripe.accounts.retrieve(getWebstribeId.customerId)
//           : null;

//         // get stripe charges whatever set in mvpz db
//         let stripeCharges = await prisma.stripeCharges.findFirst();

//         // get withdraw type
//         let withdrawType = await prisma.earningWithdrawAccess.findFirst();

//         // ----   get stripe info - what they charge while transaction ----
//         const stripeSession = await stripe.checkout.sessions.retrieve(
//           paymentInfo.stripeCheckoutId
//         );

//         const paymentIntentId = stripeSession.payment_intent;

//         const paymentIntent = await stripe.paymentIntents.retrieve(
//           paymentIntentId
//         );

//         const charge = await stripe.charges.retrieve(
//           paymentIntent.latest_charge
//         );

//         const balanceTransaction = await stripe.balanceTransactions.retrieve(
//           charge.balance_transaction
//         );

//         const stripeFees: any = balanceTransaction.fee / 100;
//         // ----   get stripe info - what they charge while transaction ----

//         // stripe charges calculation what we set in mvpz db
//         let stripeChargesCal =
//           (paymentInfo.amount * stripeCharges.transactionCharge) / 100 +
//           stripeCharges.paymentSuccessCharge;

//         // userShares, Mvpz shares calculations
//         let calamount: {
//           mvpzShare: any;
//           userShare: any;
//         } = calculateShare({
//           amount: paymentInfo.amount,
//           mvpzSharePercentage: paymentInfo.mvpzShare.shareAmount,
//           userSharePercentage: paymentInfo.userShare.shareAmount,
//           stripeCharges: stripeChargesCal,
//         });

//         let stripePayout = await prisma.stripePayout.create({
//           data: {
//             amount: parseFloat(calamount?.userShare),
//             metadata: JSON.stringify({
//               collection: "athleteTips",
//               payoutId: paymentInfo.id,
//             }),
//             type: "tip",
//             fromUserId: paymentInfo.fromUserId,
//             payoutUserId: paymentInfo.toUserId,
//             userPaymentId: paymentInfo.stripeCheckoutId,
//           },
//         });

//         await prisma.mvpzEarnings.create({
//           data: {
//             earnedAmount: parseFloat(calamount.mvpzShare),
//             stripeCharges: parseFloat(stripeFees),
//             type: "tip",
//             stripePayoutId: stripePayout?.id,
//           },
//         });

//         await prisma.notification.create({
//           data: {
//             type: "TIP",
//             title: "New Tip Sent!",
//             message: `You successfully sent a $${paymentInfo?.amount} tip to ${paymentInfo?.toUser?.username}.`,
//             userId: paymentInfo?.fromUserId,
//             url : `${process.env.NEXT_PUBLIC_APP_URL}/profile/earnings`
//           },
//         });

//         await prisma.notification.create({
//           data: {
//             type: "TIP",
//             title: "New Tip Received!",
//             message: `You received a $${calamount.userShare} tip from ${paymentInfo?.fromUser?.username}.`,
//             userId: paymentInfo.toUserId,
//             url : `${process.env.NEXT_PUBLIC_APP_URL}/profile/earnings`
//           },
//         });

//         // instan transfer if account os payout_enabled & withdraw type is instant
//         if (withdrawType.type == "instant") {
//           if (account?.payouts_enabled) {
//             //transfer money
//             const payout = await stripe.transfers.create({
//               amount: stripePayout.amount * 100,
//               currency: "usd",
//               destination: account.id,
//             });

//             //transfer money
//             if (payout) {
//               await prisma.stripePayout.update({
//                 where: {
//                   id: stripePayout.id,
//                 },
//                 data: {
//                   isWithdraw: true,
//                 },
//               });
//             }

//             await prisma.notification.create({
//               data: {
//                 type: "TIP",
//                 title: `$${stripePayout.amount} has claim successfully!`,
//                 message: `We have transfer $${stripePayout.amount} to your stripe account successfully!`,
//                 userId: paymentInfo?.toUserId,
//                 url : `${process.env.NEXT_PUBLIC_APP_URL}/profile/earnings`
//               },
//             });
//           } else {
//             await prisma.notification.create({
//               data: {
//                 type: "TIP",
//                 title: `Congratualtions! You Got $${stripePayout.amount} Tip`,
//                 message: `To claim your money, Click, Here to connect your stripe account.`,
//                 userId: paymentInfo?.toUserId,
//                 url : `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`
//               },
//             });
//           }
//         }


//         res.redirect(
//           `${callbackURL}?paymentType=tip&paymentStatus=success&tipFor=ath&paymentId=` +
//             paymentId
//         );
//       } catch (error) {
//         return await prisma.logError.create({
//           data: {
//             apiName: "/api/tip/tribeAthlete/success",
//             collection: "athleteTips & stripePayout",
//             errorLog: `${error}`,
//             title: "Error While creating athlete tip ",
//           },
//         });
//       }
//     } else {
//       res.status(400).json({ message: "Method Not Allowed" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
