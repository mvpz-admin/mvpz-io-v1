// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";
// import prisma from "../../../../../lib/prisma";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const calculateShareAmount = (amount, percentage) =>
//   parseFloat(((amount * percentage) / 100).toFixed(2));

// const handleCreatePayout = async (marketCard, user) => {

//   console.log({
//     marketCard,
//     user
//   });
  

//   try {
//     const nftEntity = await prisma.nFTEntity.findFirst({
//       where:{
//         id : marketCard.nftPurchaseCard.nftEntityId
//       },
//     });

//     let isReferred = await prisma.referrals.findFirst({
//       where: {
//         id: user?.id,
//       },
//     });

//     // finding stripe accound if of user who got tip from webstripe collection
//     const geSellertWebStripeId = await prisma.webStripe.findFirst({
//       where: {
//         userId: marketCard.sellerId,
//       },
//     });

//     let sellerAccount = !!geSellertWebStripeId
//       ? await stripe.accounts.retrieve(geSellertWebStripeId.customerId)
//       : null;

//     const getAthleteWebStripeId = await prisma.webStripe.findFirst({
//       where: {
//         userId: nftEntity.athleteId,
//       },
//     });

//     let athleteAccount = !!getAthleteWebStripeId
//       ? await stripe.accounts.retrieve(getAthleteWebStripeId.customerId)
//       : null;

//     const getReferredUserStripeId = !!isReferred
//       ? await prisma.webStripe.findFirst({
//           where: {
//             userId: isReferred?.referredByUserId,
//           },
//         })
//       : null;

//     let referredUserAccount = !!getReferredUserStripeId
//       ? await stripe.accounts.retrieve(getAthleteWebStripeId.customerId)
//       : null;

//     // get account info if account id available

//     // get all Shares

//     let mvpzShare = nftEntity.tradeMvpzShare;
//     let athleteShare = nftEntity.tradeAthleteShare;
//     let sellerShare = 100 - (mvpzShare + athleteShare);
//     let stripeCharges = await prisma.stripeCharges.findFirst();
//     let refferalShare = await prisma.payoutPercentage.findFirst();

//     let stripeChargesCal: any =
//       (marketCard?.sellingPrice * stripeCharges.transactionCharge) / 100 +
//       stripeCharges.paymentSuccessCharge;

//     // get stripe charges whatever set in mvpz db
//     const afterQtyCal = marketCard.sellingPrice - stripeChargesCal;

//     let athleteEarn = calculateShareAmount(afterQtyCal, athleteShare);

//     let mvpzEarn: any = calculateShareAmount(afterQtyCal, mvpzShare);

//     let sellerShareCal = calculateShareAmount(afterQtyCal, sellerShare);

//     let refferdUserShare = isReferred
//       ? calculateShareAmount(sellerShareCal, refferalShare.signup)
//       : 0;

//     let sellerEarn = sellerShareCal - refferdUserShare;

//     const [
//       athleteStripePayout,
//       sellerStripePayout,
//       referredStripePayout,
//     ] = await Promise.all([
//       prisma.stripePayout.create({
//         data: {
//           amount: athleteEarn,
//           metadata: JSON.stringify({
//             collection: "MarketCard",
//             payoutId: null,
//           }),
//           type: "card",
//           fromUserId: null,
//           payoutUserId: nftEntity.athleteId,
//         },
//       }),
     
//       prisma.stripePayout.create({
//         data: {
//           amount: sellerEarn,
//           metadata: JSON.stringify({
//             collection: "MarketCard",
//             payoutId: null,
//           }),
//           type: "card",
//           fromUserId: null,
//           payoutUserId: user?.id,
//         },
//       }),
//       isReferred &&
//         prisma.stripePayout.create({
//           data: {
//             amount: refferdUserShare,
//             metadata: JSON.stringify({
//               collection: "MarketCard",
//               payoutId: null,
//             }),
//             type: "card",
//             fromUserId: null,
//             payoutUserId: isReferred.referredByUserId,
//           },
//         }),
//     ]);

//    await prisma.mvpzEarnings.create({
//       data: {
//         earnedAmount: parseFloat(mvpzEarn),
//         stripeCharges: parseFloat(stripeChargesCal),
//         type: "card",
//         stripePayoutId: athleteStripePayout.id,
//       },
//     })

//     const getXPFactor = await prisma.xPFactor.findFirst({
//       where:
//         nftEntity.type === "Athlete"
//           ? {
//               type: nftEntity.type,
//               membershipTier: nftEntity.membershipTier,
//             }
//           : {
//               type: nftEntity.type,
//             },
//     });

//     const getUserXp = await prisma.user.findFirst({
//       where : {
//         id : user?.id
//       },
//       select : {
//         xp : true
//       }
//     })

//     await prisma.user.update({
//       where : {
//         id : user?.id,
//       },
//       data : {
//         xp : (getUserXp.xp || 0) + getXPFactor.factorValue
//       }
//     })

//     let withdrawType = await prisma.earningWithdrawAccess.findFirst();

//     // instan transfer if account os payout_enabled & withdraw type is instant
//     if (withdrawType.type == "instant") {
//       // athlete account
//       if (athleteAccount?.payouts_enabled) {
//         //transfer money
//         const payout = await stripe.transfers.create({
//           amount: athleteStripePayout.amount * 100,
//           currency: "usd",
//           destination: athleteAccount.id,
//         });

//         //transfer money
//         if (payout) {
//           await prisma.stripePayout.update({
//             where: {
//               id: athleteStripePayout.id,
//             },
//             data: {
//               isWithdraw: true,
//             },
//           });
//         }

//         await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `$${athleteStripePayout.amount} has claim successfully!`,
//             message: `We have transfer $${athleteStripePayout.amount} to your stripe account successfully!`,
//             userId: nftEntity.athleteId,
//           },
//         });
//       } else {
//         await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `You Earn $${athleteStripePayout.amount} from card!`,
//             message: `To claim your money, Click, Here to connect your stripe account.`,
//             userId: nftEntity.athleteId,
//             url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//           },
//         });
//       }

//       // seller account
//       if (sellerAccount?.payouts_enabled) {
//         //transfer money
//         const payout = await stripe.transfers.create({
//           amount: sellerStripePayout.amount * 100,
//           currency: "usd",
//           destination: sellerAccount.id,
//         });

//         //transfer money
//         if (payout) {
//           await prisma.stripePayout.update({
//             where: {
//               id: sellerStripePayout.id,
//             },
//             data: {
//               isWithdraw: true,
//             },
//           });
//         }

//         await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `$${sellerStripePayout.amount} has claim successfully!`,
//             message: `We have transfer $${sellerStripePayout.amount} to your stripe account successfully!`,
//             userId: user?.id,
//           },
//         });
//       } else {
//         await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `You Earn $${sellerStripePayout.amount} from card!`,
//             message: `To claim your money, Click, Here to connect your stripe account.`,
//             userId: user?.id,
//             url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//           },
//         });
//       }
//       // refferUser
//       if(isReferred){
//         if ( sellerAccount?.payouts_enabled) {
//           //transfer money
//           const payout = await stripe.transfers.create({
//             amount: referredStripePayout.amount * 100,
//             currency: "usd",
//             destination: referredUserAccount.id,
//           });
  
//           //transfer money
//           if (payout) {
//             await prisma.stripePayout.update({
//               where: {
//                 id: referredStripePayout.id,
//               },
//               data: {
//                 isWithdraw: true,
//               },
//             });
//           }
  
//           await prisma.notification.create({
//             data: {
//               type: "GENERAL",
//               title: `$${referredStripePayout.amount} has claim successfully!`,
//               message: `We have transfer $${referredStripePayout.amount} to your stripe account successfully!`,
//               userId: isReferred.referredByUserId,
//             },
//           });
//         } else {
//           await prisma.notification.create({
//             data: {
//               type: "GENERAL",
//               title: `You Earn $${referredStripePayout.amount} from card!`,
//               message: `To claim your money, Click, Here to connect your stripe account.`,
//               userId: isReferred.referredByUserId,
//               url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//             },
//           });
//         }
//       }


//     } else {
//       await Promise.all([
//         await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `You Earn $${athleteStripePayout.amount} from card!`,
//             message: `To claim your money, Click, Here to connect your stripe account.`,
//             userId: nftEntity.athleteId,
//             url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//           },
//         }),
//         await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `You Earn $${sellerStripePayout.amount} from card!`,
//             message: `To claim your money, Click, Here to connect your stripe account.`,
//             userId: user?.id,
//             url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//           },
//         }),
//         isReferred && await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `You Earn $${referredStripePayout.amount} from card!`,
//             message: `To claim your money, Click, Here to connect your stripe account.`,
//             userId: isReferred.referredByUserId,
//             url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//           },
//         })
//       ]);
      
//     }

//     await prisma.notification.create({
//       data: {
//         type: "GENERAL",
//         title: `Your Card Has Been Sold`,
//         message: `Congratulations, you've successfully sold your card, check your balance.`,
//         userId: user?.id,
//         url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/earnings`,
//       },
//     });
    
//   } catch (error) {
//     console.log({ error });

//     return await prisma.logError.create({
//       data: {
//         apiName: "/api/purchase/assignCards",
//         collection: "stripePayout",
//         errorLog: `${error}`,
//         title: "Error While creating stripe payout in assign card",
//         developerRefDescription: "stripe pay out not created",
//       },
//     });
//   }
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "GET") {
//       const session = await getServerSession(req, res, authOptions);
//       if (!session || !session.user)
//         return res
//           .status(403)
//           .json({ status: "fail", message: "user not authenticated" });
//       const { paymentId } = req.query;

//       const paymentAttempt = await prisma.paymentAttempt.findUnique({
//         where: {
//           id: paymentId.toString(),
//           userId: session.user.id,
//         },
//       });

//       if (paymentAttempt.paymentStatus === "MINTED")
//         return res.status(200).json({ message: "payment already processed" });
//       await processOrder(res, paymentAttempt, session.user);
//     } else {
//       res.status(400).json({ message: "only Post method allowed" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// export async function processOrder(res, paymentAttempt, user) {
//   await prisma.paymentAttempt.update({
//     where: {
//       id: paymentAttempt.id,
//     },
//     data: {
//       mintedAt: new Date(),
//       paymentStatus: "MINTED",
//     },
//   });

//   const marketCard = await prisma.marketplaceCard.findFirst({
//     where: {
//       id: paymentAttempt?.marketCardId,
//     },
//     include: {
//       nftPurchaseCard: true,
//     },
//   });

 

//   const updateOwner = await prisma.nFTPurchaseCard.update({
//     where: {
//       id: marketCard.nftPurchaseCardId,
//     },
//     data: {
//       currentOwnerId: user.id,
//       purchasePrice: marketCard.sellingPrice,
//     },
//   });

//   const addTradeHistory = await prisma.markeCardTradeHistory.create({
//     data: {
//       buyAtPrice: marketCard.sellingPrice,
//       buyerId: user.id,
//       nftPurchaseCardId: marketCard.nftPurchaseCardId,
//     },
//   });

//   await handleCreatePayout(marketCard, user);

//   const deleteCard = await prisma.marketplaceCard.update({
//     where: {
//       id: marketCard.id,
//     },
//     data : {
//       isLive : false,
//       isSoldOut : false
//     }
//   });

//   return res.redirect("/profile/myCards");
// }
