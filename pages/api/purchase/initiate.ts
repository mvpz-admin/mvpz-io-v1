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
//     if (req.method === "POST") {
//       const body = req.body;
//       const {
//         productId,
//         priceId,
//         athleteId = null,
//         quantity = 1,
//         variantId,
//         size,
//         fitType = "Regular",
//         gender = "Unisex",
//         productReferralCode = null,
//       } = body;
//       const session = await getServerSession(req, res, authOptions);
//       if (!session || !session.user)
//         return res.status(400).json({ error: "User not authenticated" });
//       if (!priceId && !productId)
//         return res.status(400).json({ error: "Price is not valid" });
//       const product = productId
//         ? await prisma.product.findFirst({
//             where: {
//               id: productId,
//               isActive: true,
//             },
//           })
//         : await prisma.product.findFirst({
//             where: {
//               stripePriceId: priceId,
//               isActive: true,
//             },
//           });
//       if (!product) return res.status(400).json({ error: "Price not found" });
//       const variant = variantId
//         ? await prisma.productVariant.findUnique({
//             where: {
//               id: variantId,
//             },
//           })
//         : null;
//       if (variantId && !variant)
//         return res.status(400).json({ error: "Variant not found" });
//       let entityId = null;
//       if (["athlete", "kstate_athlete"].includes(product.type) && !!athleteId) {
//         const entity = await prisma.nFTEntity.findFirst({
//           where: {
//             athlete: { id: athleteId },
//             type: "Athlete",
//             design: "Base",
//           },
//         });
//         if (entity) {
//           entityId = entity.id;
//         }
//       }
//       const totalPrice = quantity * product.cost;
//       const paymentAttempt = await prisma.paymentAttempt.create({
//         data: {
//           user: { connect: { id: session.user.id } },
//           quantity,
//           totalPrice: parseFloat(totalPrice.toFixed(2)),
//           stripePriceId: variant?.stripePriceId || product.stripePriceId,
//           cardIssueType: product.issueType || "digital",
//           bundleType: product.type,
//           platform: "web2",
//           paymentStatus: "INITIATED",
//           entityId,
//           packQuantity: product.packQuantity,
//           collection: product.collection,
//           productId: product.id,
//         },
//       });
//       if (product.type === "apparel") {
//         await prisma.apparelOrder.create({
//           data: {
//             orderNumber: `${Math.floor(new Date().valueOf() * Math.random())}`,
//             quantity,
//             productId: product.id,
//             variantId,
//             userId: session.user.id,
//             status: "CREATED",
//             paymentAttemptId: paymentAttempt.id,
//             size,
//             fitType,
//             gender,
//             productReferralCode,
//           },
//         });
//       }

//       console.log({
//         cutomerEmail: session.user.email,
//         vStripePriceId: variant?.stripePriceId,
//         pStripePriceId: product.stripePriceId,
//         quantity,
//         payment_attempt_id : paymentAttempt.id.toString(),
//         pIssueType :  product.issueType,
//         pType : product.type,
//         pShippingCost :  product.shippingCost,
        
//       });

//       const stripeSession = await stripe.checkout.sessions.create({
//         customer_email: session.user.email,
//         line_items: [
//           {
//             price: variant?.stripePriceId || product.stripePriceId,
//             quantity,
//           },
//         ],
//         payment_intent_data: {
//           metadata: {
//             payment_attempt_id: paymentAttempt.id.toString(),
//           },
//         },
//         mode: "payment",
//         success_url: `${process.env.NEXT_PUBLIC_APP_URL}/purchase/success?paymentId=${paymentAttempt.id}`,
//         cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/purchase/cancel?paymentId=${paymentAttempt.id}`,
//         shipping_address_collection: ["digitalphysical", "physical"].includes(
//           product.issueType
//         )
//           ? { allowed_countries: ["US"] }
//           : {},
//         // discounts: process.env.STRIPE_DISCOUNT_COUPON ? [{coupon: process.env.STRIPE_DISCOUNT_COUPON}] : [],
//         allow_promotion_codes: true,
//         shipping_options: [
//           product.type === "apparel"
//             ? {
//                 shipping_rate_data: {
//                   type: "fixed_amount",
//                   fixed_amount: {
//                     amount:
//                       product.shippingCost !== null &&
//                       product.shippingCost !== undefined
//                         ? product.shippingCost
//                         : 1000,
//                     currency: "usd",
//                   },
//                   display_name: "Standard shipping",
//                   delivery_estimate: {
//                     minimum: {
//                       unit: "business_day",
//                       value: 7,
//                     },
//                     maximum: {
//                       unit: "business_day",
//                       value: 10,
//                     },
//                   },
//                 },
//               }
//             : {},
//         ],
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
//       res.status(200).json({ checkoutUrl: stripeSession.url });
//     } else {
//       res.status(400).json({ message: "only Post method allowed" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
