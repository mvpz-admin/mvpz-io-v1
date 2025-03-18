// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";
// import Stripe from "stripe";
// import { title } from "process";

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

//   const payoutId = req.query.payoutId as string;

//   try {
//     const getAllPayout = await prisma.stripePayout.findMany({
//       where: {
//         payoutId,
//       },
//     });

//     let getTotalMoneyWithdraw = getAllPayout.reduce(
//       (total, r) => total + r.amount,
//       0
//     );

//     return res.status(200).json({
//       success: true,
//       data: {
//         title: `🎉 ${getTotalMoneyWithdraw} Money Withdrawal Successful!`,
//         type: "withdraw",
//       },
//     });
//   } catch (error) {
//     await prisma.logError.create({
//       data: {
//         apiName: `/api/payout/details/${payoutId}`,
//         collection: "stripePayout",
//         errorLog: `${error}`,
//         title: "Error While User withdraw",
//       },
//     });
//     console.error("Error fetching link preview:", error);
//     res.status(500).json({ error: "Failed to fetch link preview." });
//   }
// }
