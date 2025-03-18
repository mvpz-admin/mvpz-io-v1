// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2023-10-16",
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method not allowed. Use GET." });
//   }

//   const session = await getServerSession(req, res, authOptions);
//   if (!session || !session.user?.id) {
//     return res.status(401).json({ error: "Unauthorized access" });
//   }

//   try {
//     let account = await stripe.accounts.retrieve(
//       session?.user?.webStripe?.customerId
//     );

   

//     if (!account || !account.payouts_enabled) {
//       return res.status(200).json({
//         success: false,
//         error: `Account Not Found`,
//         account: null,
//       });
//     }

//     const getWithdrawLimit = await prisma.stripeWithdrawPayoutLimit.findFirst();
//     console.log({
//       getWithdrawLimit,
//     });

//     const getUserPayoutToWithdraw = await prisma.stripePayout.findMany({
//       where: {
//         payoutUserId: session?.user?.id,
//         isWithdraw: false,
//       },
//     });

//     console.log({
//       getUserPayoutToWithdraw,
//     });

//     // first check eligible to withdraw
//     let totalPayounAmount = getUserPayoutToWithdraw.reduce(
//       (total, r) => total + r.amount,
//       0
//     );

//     console.log({
//       totalPayounAmount,
//     });

//     if (totalPayounAmount < getWithdrawLimit.minWithdraw) {
//       return res.status(200).json({
//         success: false,
//         error: `Total Withdraw Amount Should Be Minimum $${getWithdrawLimit.minWithdraw}`,
//         account,
//         amount: totalPayounAmount,
//       });
//     }

//     // chat get those getUserPayoutToWithdraw data if  all getUserPayoutToWithdraw amount  < 100

//     const withdrawPayout = [];
//     let amount = 0;

//     for (let i = 0; i < getUserPayoutToWithdraw.length; i++) {
//       if (amount + getUserPayoutToWithdraw[i].amount > 100) {
//         break;
//       }
//       withdrawPayout.push(getUserPayoutToWithdraw[i]);
//       amount += getUserPayoutToWithdraw[i].amount;
//     }

//     console.log({
//       withdrawPayout,
//       amount,
//     });

//     const getTotalAmountToWithdraw = withdrawPayout.reduce(
//       (total, r) => total + r.amount,
//       0
//     );

//     console.log({
//       getTotalAmountToWithdraw,
//     });

//     const payout = await stripe.transfers.create({
//       amount: getTotalAmountToWithdraw * 100,
//       currency: "usd",
//       destination: account.id,
//     });

//     console.log({
//       payout,
//     });

//     if (!payout) {
//       await prisma.logError.create({
//         data: {
//           apiName: "/api/payout/withdraw",
//           collection: "stripePayout",
//           errorLog: `${payout}`,
//           title: "Error While User withdraw",
//         },
//       });
//       return res
//         .status(500)
//         .json({
//           success: false,
//           error:
//             "Something Went Wrong : Withdraw process cancel. Please try again something...",
//         });
//     }

//     await Promise.all(
//       withdrawPayout.map(async (stripePayout) => {
//         await prisma.stripePayout.update({
//           where: {
//             id: stripePayout?.id,
//           },
//           data: {
//             isWithdraw: true,
//             payoutId: payout.id,
//           },
//         });
//       })
//     );

//     await prisma.notification.create({
//       data: {
//         title: `Money Withdraw Successfull!`,
//         message:
//           `You've successfully withdrawn $${Number(getTotalAmountToWithdraw).toFixed(2)} from your earnings. Thank you for your contributions!`,
//         type: "GENERAL",
//         userId: session?.user?.id,
//       },
//     });

//     res.status(200).json({
//       success : true,
//       redirectURI : `${process.env.NEXT_PUBLIC_APP_URL}/profile/earnings?notificationType=withdraw&payoutId=${payout?.id}`,
//       message  : "Withdraw Successfully Added!"
//     })
    
//   } catch (error) {
//     await prisma.logError.create({
//       data: {
//         apiName: "/api/payout/withdraw",
//         collection: "stripePayout",
//         errorLog: `${error}`,
//         title: "Error While User withdraw",
//       },
//     });
//     console.error("Error fetching link preview:", error);
//     res.status(500).json({ error: "Failed to fetch link preview." });
//   }
// }
