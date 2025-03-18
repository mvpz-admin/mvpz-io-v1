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
//     if (req.method === "GET") {
//       const { paymentId,callbackURL } = req.query;

//       if (!paymentId) {
//         res.redirect("/fanzone");
//         return;
//       }

//       const paymentInfo = await prisma.tribePostTips.update({
//         where: {
//           id: paymentId as string,
//         },
//         data: {
//           isPaymentSuccess: false,
//         },
//         include: {
//           fromUser: true,
//           toUser: true,
//         },
//       });

//       prisma.notification.create({
//         data: {
//           type: "TIP",
//           title: " Tip Not Sent!",
//           message: `Your $${paymentInfo?.amount} tip got failed. Please try again.`,
//           userId: paymentInfo?.fromUserId, 
//         },
//       }),
//         res.redirect(
//           `${callbackURL}?paymentType=tip&paymentStatus=failed&tipFor=tp&paymentId=` +
//             paymentId
//         );
//     } else {
//       res.status(400).json({ message: "Method Not Allowed" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
