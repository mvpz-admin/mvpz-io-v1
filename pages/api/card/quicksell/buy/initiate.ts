// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";
// import prisma from "../../../../../lib/prisma";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "POST") {
//       const body = req.body;
//       const {
//         marketCardId,
//       } = body;
//       const session = await getServerSession(req, res, authOptions);
//       if (!session || !session.user)
//         return res.status(400).json({ error: "User not authenticated" });


//       const marketCard = await prisma.marketplaceCard.findFirst({
//         where : {
//             id : marketCardId
//         },
//         include : {
//             nftPurchaseCard : {
//                 include : {
//                     nftEntity : {
//                         include : {
                            
//                         }
//                     }
//                 }
//             }
//         }
//       })

//       if(!marketCard){
//         return res.status(404).json({ success:false, error: "MarketCard not found" });
//       }

      

//       const totalPrice = marketCard.sellingPrice;
//       const paymentAttempt = await prisma.paymentAttempt.create({
//         data: {
//           user: { connect: { id: session.user.id } },
//           quantity : 1 ,
//           totalPrice: parseFloat(totalPrice.toFixed(2)),
//           stripePriceId: null,
//           cardIssueType: "digital",
//           paymentStatus: "INITIATED",
//           marketCardId,
//           packQuantity: 1,
         
//         },
//       });
     
//       const stripeSession = await stripe.checkout.sessions.create({
//         customer_email: session.user.email,
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: "Market Card",
//                 description: `${session?.user?.name} has buy a market card`,
//               },
//               unit_amount: Math.round(marketCard.sellingPrice * 100),
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
//         success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/quicksell/buy/success?paymentId=${paymentAttempt.id}`,
//         cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/quicksell/buy/cancel?paymentId=${paymentAttempt.id}`,
//         shipping_address_collection: { allowed_countries: ["US"] },
//         allow_promotion_codes: true,
//         shipping_options: [],
//       });

//       await prisma.paymentAttempt.update({
//         where: {
//           id: paymentAttempt.id,
//         },
//         data: {
//           stripeCheckoutLink: stripeSession.url,
//           stripeCheckoutId: stripeSession.id,
//         },
//       });
//       res.status(200).json({ success : true, data : {
//         checkoutUrl: stripeSession.url 
//       }, message : "Market Card Initiated Successfully"});
//     } else {
//       res.status(400).json({ message: "only Post method allowed" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
