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

//     const existingLike = await prisma.marketplaceCardLikes.findFirst({
//       where: {
//         userId: session.user.id,
//         marketplaceCardId : cardId,
//       },
//     });

//     if (existingLike) {
//       // Unlike the card
//       await prisma.marketplaceCardLikes.delete({ where: { id: existingLike.id } });
//       return res.status(200).json({success : true, message: "Card unliked", isLike : false });
//     } else {
//       // Like the card
//       await prisma.marketplaceCardLikes.create({
//         data: {
//           userId: session.user.id,
//           marketplaceCardId : cardId,
//         },
//       });
//       return res.status(201).json({success:true, message: "Card liked", isLike : true });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
