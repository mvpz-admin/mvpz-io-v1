// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { cardId } = req.body;
//     if (!cardId) return res.status(400).json({ error: "Missing card ID" });

//     const existingWishlist = await prisma.wishlistedMarketPlaceCard.findFirst({
//       where: {
//         userId: session.user.id,
//         marketplaceCardId : cardId,
//       },
//     });

//     if (existingWishlist) {
//       // Remove from wishlist
//       await prisma.wishlistedMarketPlaceCard.delete({ where: { id: existingWishlist.id } });
//       return res.status(200).json({success: true, message: "Card removed from wishlist", isWishlist : false });
//     } else {
//       // Add to wishlist
//       await prisma.wishlistedMarketPlaceCard.create({
//         data: {
//           userId: session.user.id,
//           marketplaceCardId : cardId,
//         },
//       });
//       return res.status(201).json({success: true, message: "Card added to wishlist", isWishlist : true });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
