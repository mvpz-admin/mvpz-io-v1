// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "POST") {
//       const body = req.body;
//       const { fromUserId, toUserId, tipAmount, postId, callbackURL } = body;

//       const session = await getServerSession(req, res, authOptions);
//       if (!session || !session.user)
//         return res.status(400).json({ error: "User not authenticated" });



//       // Check for TipLimit for the user
//       const tipLimit = await prisma.tipLimit.findFirst({
//         where: {
//           forContent: "PublicPost", // e.g., PublicPost, TribePost
//         },
//       });

//       if (tipLimit && tipLimit.timeFrame !== "UNLIMITED") {
//         // Check the tip count based on the time frame
//         const currentDate = new Date();
//         let timeConstraint: any = {};

//         if (tipLimit.timeFrame === "DAILY") {
//           const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
//           const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
//           timeConstraint = { gte: startOfDay, lte: endOfDay };
//         }

//         const tipCount = await prisma.tribePostTips.count({
//           where: {
//             fromUserId,
//             postId,
//             createdAt: tipLimit.timeFrame === "ALL_TIME" ? undefined : timeConstraint,
//           },
//         });

//         if (tipCount >= tipLimit.tipLimitCount) {
//          return res.status(200).json({success : false, limitExceed : true , data : { checkoutUrl: null }, error  : `You cannot tip the same post more than ${tipLimit.tipLimitCount} times within the ${tipLimit.timeFrame.toLowerCase()} timeframe.` });
//         }
//       }


//       const getUserShare = await prisma.userTipShare.findFirst();
//       const getMvpzShare = await prisma.mvpzTipShare.findFirst();

//       console.log({
//         getMvpzShare,
//         getUserShare,
//       });

//       const paymentAttempt = await prisma.tribePostTips.create({
//         data: {
//           amount: tipAmount,
//           fromUserId,
//           mvpzShareId: getMvpzShare.id,
//           postId,
//           toUserId,
//           userShareId: getUserShare.id,
//         },
//       });

//       const stripeSession = await stripe.checkout.sessions.create({
//         customer_email: session.user.email,
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: "Tip",
//                 description: `Tip for post ID: ${postId}`,
//               },
//               unit_amount: Math.round(tipAmount * 100),
//             },
//             quantity: 1,
//           },
//         ],
//         payment_intent_data: {
//           metadata: {
//             payment_attempt_id: paymentAttempt.id.toString(),
//           },
//         },
//         mode: "payment",
//         success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/tip/tribePost/success?paymentId=${paymentAttempt.id}&callbackURL=${callbackURL}`,
//         cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/tip/tribePost/failure?paymentId=${paymentAttempt.id}&callbackURL=${callbackURL}`,
//         shipping_address_collection: { allowed_countries: ["US"] },
//         allow_promotion_codes: true,
//         shipping_options: [],
//       });

//       await prisma.tribePostTips.update({
//         where: {
//           id: paymentAttempt.id,
//         },
//         data: {
//           stripeCheckoutLink: stripeSession.url,
//           stripeCheckoutId: stripeSession.id,
//         },
//       });
//       res.status(200).json({success : true , data : { checkoutUrl: stripeSession.url }, message  : "Stripe Checkout Created Successfull!" });
//     } else {
//       res.status(400).json({ message: "only Post method allowed" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
