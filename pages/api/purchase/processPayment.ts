// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user)
//       return res
//         .status(403)
//         .json({ status: "fail", message: "user not authenticated" });
//     const { paymentId } = req.query;

//     const paymentAttempt = await prisma.paymentAttempt.findFirst({
//       where: {
//         id: paymentId.toString(),
//         userId: session.user.id,
//       },
//     });
//     if (!paymentAttempt)
//       return res
//         .status(404)
//         .json({ status: "fail", message: "payment not found" });
//     if (["SUCCESS", "MINTED"].includes(paymentAttempt.paymentStatus))
//       return res.status(200).json({ message: "payment already processed" });

//     // GET Stripe checkout session
//     const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(
//       paymentAttempt.stripeCheckoutId
//     );
//     let paymentMethodId = null;
//     if (stripeCheckoutSession.payment_intent) {
//       const stripePaymentIntent = await stripe.paymentIntents.retrieve(
//         stripeCheckoutSession.payment_intent
//       );
//       const stripePaymentMethod = await stripe.paymentMethods.retrieve(
//         stripePaymentIntent.payment_method
//       );
//       console.log(stripePaymentMethod);
//       if (stripePaymentMethod) {
//         const paymentMethod = await prisma.paymentMethod.create({
//           data: {
//             type: stripePaymentMethod.type,
//             brand: stripePaymentMethod.card?.brand,
//             country: stripePaymentMethod.card?.country,
//             expMonth: stripePaymentMethod.card?.exp_month,
//             expYear: stripePaymentMethod.card?.exp_year,
//             last4: stripePaymentMethod.card?.last4,
//             userId: session.user.id,
//           },
//         });
//         paymentMethodId = paymentMethod.id;
//       }
//     }

//     const paymenStatus = await prisma.paymentAttempt.update({
//       where: {
//         id: paymentAttempt.id,
//       },
//       data: {
//         verifiedAt: new Date(),
//         paymentStatus: "SUCCESS",
//         paymentMethodId,
//       },
//     });
//     // save shipping address
//     if (stripeCheckoutSession && stripeCheckoutSession.shipping_details) {
//       const address = await prisma.userAddress.create({
//         data: {
//           type: "Shipping",
//           name: stripeCheckoutSession.shipping_details.name,
//           city: stripeCheckoutSession.shipping_details.address?.city,
//           country: stripeCheckoutSession.shipping_details.address?.country,
//           line1: stripeCheckoutSession.shipping_details.address?.line1,
//           line2: stripeCheckoutSession.shipping_details.address?.line2,
//           postalCode:
//             stripeCheckoutSession.shipping_details.address?.postal_code,
//           state: stripeCheckoutSession.shipping_details.address?.state,
//           userId: session.user.id,
//         },
//       });

//       const order = await prisma.apparelOrder.findFirst({
//         where: {
//           paymentAttemptId: paymentAttempt.id,
//           userId: session.user.id,
//         },
//       });
//       if (order) {
//         await prisma.apparelOrder.update({
//           where: {
//             id: order.id,
//           },
//           data: {
//             addressId: address.id,
//             shippingCost:
//               stripeCheckoutSession.shipping_cost?.amount_total || 1000,
//           },
//         });
//       }

//       // process payouts
//       const payPercentage = await prisma.payoutPercentage.findFirst();
//       let totalPercentage = payPercentage
//         ? payPercentage.signup + payPercentage.productReferral
//         : 0;
//       // process product referral payout first
//       if (order.productReferralCode) {
//         const invite = await prisma.referralInvite.findFirst({
//           where: {
//             inviteCode: order.productReferralCode,
//           },
//         });

//         if (invite && invite.referredByUserId !== session.user.referrerId) {
//           const inviteUser = await prisma.user.findUnique({
//             where: {
//               id: invite.referredByUserId,
//             },
//           });
//           const productReferralPercentage = inviteUser.productReferralPercentage
//             ? inviteUser.productReferralPercentage
//             : payPercentage?.productReferral;
//           totalPercentage -= productReferralPercentage;
//           // await prisma.payout.create({
//           //     data:{
//           //         orderId: order.id,
//           //         orderAmount: paymentAttempt.totalPrice,
//           //         userId: invite.referredByUserId,
//           //         payoutAmount: parseFloat((paymentAttempt.totalPrice * productReferralPercentage/100).toFixed(2)),
//           //         payoutPercentage: productReferralPercentage,
//           //         payoutPercentageType: 'productReferral',
//           //         type: 'Apparel'
//           //     }
//           // })

//           let userEarnAmount = parseFloat(
//             (
//               (paymentAttempt.totalPrice * productReferralPercentage) /
//               100
//             ).toFixed(2)
//           );

//           let stripePayout = await prisma.stripePayout.create({
//             data: {
//               amount: userEarnAmount,
//               metadata: JSON.stringify({
//                 collection: "referralInvite",
//                 payoutId: order.id,
//                 referralType: "productReferral",
//               }),
//               type: "referral",
//               payoutUserId: invite.referredByUserId,
//             },
//           });

//           const getWebstribeId = await prisma.webStripe.findFirst({
//             where: {
//               userId: invite.referredByUserId,
//             },
//           });

//           let account = getWebstribeId
//             ? await stripe.accounts.retrieve(getWebstribeId.customerId)
//             : null;

//           let withdrawType = await prisma.earningWithdrawAccess.findFirst();

//           if (withdrawType.type == "instant") {
//             if (account?.payouts_enabled) {
//               //transfer money
//               const payout = await stripe.transfers.create({
//                 amount: stripePayout.amount * 100,
//                 currency: "usd",
//                 destination: account.id,
//               });

//               //transfer money
//               if (payout) {
//                 await prisma.stripePayout.update({
//                   where: {
//                     id: stripePayout.id,
//                   },
//                   data: {
//                     isWithdraw: true,
//                   },
//                 });
//               }

//               await prisma.notification.create({
//                 data: {
//                   type: "GENERAL",
//                   title: `$${stripePayout.amount} has claim successfully!`,
//                   message: `We have transfer $${stripePayout.amount} to your stripe account successfully!`,
//                   userId: invite.referredByUserId,
//                 },
//               });
//             } else {
//               await prisma.notification.create({
//                 data: {
//                   type: "GENERAL",
//                   title: `You Earn $${stripePayout.amount} from referral!`,
//                   message: `To claim your money, Click, Here to connect your stripe account.`,
//                   userId: invite.referredByUserId,
//                   url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//                 },
//               });
//             }
//           }
//         }
//       }
//       // process signup payout
//       if (session.user.referrerId && payPercentage?.signup) {
//         // await prisma.payout.create({
//         //     data:{
//         //         orderId: order.id,
//         //         orderAmount: paymentAttempt.totalPrice,
//         //         userId: session.user.referrerId,
//         //         payoutAmount: parseFloat((paymentAttempt.totalPrice * totalPercentage/100).toFixed(2)),
//         //         payoutPercentage: totalPercentage,
//         //         payoutPercentageType: 'signup',
//         //         type: 'Apparel'
//         //     }
//         // })

//         let stripePayout = await prisma.stripePayout.create({
//           data: {
//             amount: parseFloat(
//               ((paymentAttempt.totalPrice * totalPercentage) / 100).toFixed(2)
//             ),
//             metadata: JSON.stringify({
//               collection: "referralInvite",
//               payoutId: order.id,
//               referralType: "signup",
//             }),
//             type: "referral",
//             payoutUserId: session.user.referrerId,
//           },
//         });

//         const getWebstribeId = await prisma.webStripe.findFirst({
//           where: {
//             userId: session.user.referrerId,
//           },
//         });

//         let account = getWebstribeId
//           ? await stripe.accounts.retrieve(getWebstribeId.customerId)
//           : null;

//         let withdrawType = await prisma.earningWithdrawAccess.findFirst();

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
//                 type: "GENERAL",
//                 title: `$${stripePayout.amount} has claim successfully!`,
//                 message: `We have transfer $${stripePayout.amount} to your stripe account successfully!`,
//                 userId: session.user.referrerId,
//               },
//             });
//           } else {
//             await prisma.notification.create({
//               data: {
//                 type: "GENERAL",
//                 title: `You Earn $${stripePayout.amount} from referral!`,
//                 message: `To claim your money, Click, Here to connect your stripe account.`,
//                 userId: session.user.referrerId,
//                 url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//               },
//             });
//           }
//         }
//       }

      
//       return res.status(200).json({ status: "success" });
//     }

//     return res.status(200).json({ status: "success" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
