// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../../lib/prisma";
// import { authOptions } from "../../../auth/[...nextauth]";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(400).json({ error: "Only POST method allowed" });
//     }

//     const { selectedEnhancements, serialNumber } = req.body;

//     if (!selectedEnhancements || !serialNumber) {
//       return res.status(400).json({ error: "Invalid request data" });
//     }

//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     const isDecimal = (number: number) => number % 1 !== 0;

//     // Check if the card is a purchased or minted card
//     const findPurchasedCard = await prisma.nFTPurchaseCard.findFirst({
//       where: { cardSerialNumber: serialNumber },
//       include: { nftEntity: true },
//     });

//     const findMintedCard = await prisma.nFTMintCard.findFirst({
//       where: { cardSerialNumber: serialNumber },
//       include: { nftEntity: true },
//     });

//     let purchaseType = findPurchasedCard
//       ? "purchased"
//       : findMintedCard
//       ? "minted"
//       : null;

//     if (!purchaseType) {
//       return res.status(404).json({ error: "Card not found" });
//     }

//     const totalPrice = selectedEnhancements.reduce(
//       (sum, enh) => sum + (enh.price || 0),
//       0
//     );

//     let meta = selectedEnhancements?.map((_) => ({
//       id : _.id,
//     }))


//     const stripeSession = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: selectedEnhancements.map((enh) => ({
//         price_data: {
//           currency: "usd",
//           product_data: { name: enh.title },
//           unit_amount: enh.price * 100,
//         },
//         quantity: 1,
//       })),
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/myCards/card/payment/success?stripeSessionId={CHECKOUT_SESSION_ID}&serialNumber=${serialNumber}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/myCards/card/payment/success?stripeSessionId={CHECKOUT_SESSION_ID}&serialNumber=${serialNumber}`,
//       metadata: {
//         userId: session.user.id,
//         serialNumber,
//         selectedEnhancements: JSON.stringify(meta),
//       },
//     });

//     await prisma.paymentAttempt.create({
//       data: {
//         userId: session.user.id,
//         serialNumber,
//         totalPrice,
//         paymentStatus: "INITIATED",
//         stripeSessionId: stripeSession.id,
//         quantity : selectedEnhancements?.length
//       },
//     });

//     if(!!stripeSession){
//       return res.json({success : true, url: stripeSession.url });
//     }

//     return res.status(400).json({ selectedEnhancements, serialNumber });
//   } catch (err) {
//     console.error("Error processing enhancement:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
