// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../../lib/backBlaze";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";

// interface B2APIType {
//   downloadUrl: string;
//   authorizationToken: string;
// }

// function extractEnhancements({ cards }) {
//   return cards.map((card) => {
//     const allEnhancements = (
//       card?.nftPurchaseCard?.nftEntity?.minorEnhancements || []
//     )?.concat(card?.nftPurchaseCard?.nftEntity?.majorEnhancements || []);

//     let owner = card?.seller;
//     let nameArray = owner?.name?.split(" ");
//     let ownerFirstName = nameArray[0]?.substring(0, 1);
//     let ownerLastName =
//       nameArray?.length > 1
//         ? nameArray[nameArray.length - 1]?.substring(0, 1)
//         : "";

//     let ownerDetails = {
//       id: owner?.id,
//       name: owner?.name,
//       username: owner?.username,
//       profileImage: owner?.image,
//       shortuctName: `${ownerFirstName.toUpperCase()}${ownerLastName.toUpperCase()}`,
//     };

//     return {
//       id: card?.id,
//       title: card.title,
//       type: card?.nftPurchaseCard?.nftEntity.type,
//       serialNumber: card?.cardSerialNumber,
//       price: card?.sellingPrice,
//       baseImageNft: card?.nftPurchaseCard?.nftEntity.cardImageNFT,
//       sellerInfo: ownerDetails,
//       totalEnhancements: allEnhancements?.length,
//       isWishlisted : !!card?.wishlist?.length ,
//       isLiked : !!card?.likes?.length,
//     };
//   });
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "GET") {
//       const session = await getServerSession(req, res, authOptions);
//       if (!session) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }

//       const pageType =
//         String(req.query.pageType)?.replace(/%20/g, " ") || "All";
//       const page = parseInt(req.query.page as string) || 1;
//       const limit = parseInt(req.query.limit as string) || 10;
//       const skip = (page - 1) * limit;

//       console.log({
//         pageType,
//       });

//       let whereCondition: any = {
//         isLive: true,
//         isSoldOut: false,
//       };
//       let orderByCondition = {};

//       if (pageType === "Most Selling") {
//         orderByCondition = { tradeHistory: { _count: "desc" } };
//       } else if (pageType === "Popular Cards") {
//         orderByCondition = { likes: { _count: "desc" } };
//       } else if (pageType === "Most Enhanced") {
//         whereCondition = {
//           ...whereCondition,
//           OR: [
//             { "nftPurchaseCard.nftEntity.minorEnhancements": { some: {} } },
//             { "nftPurchaseCard.nftEntity.majorEnhancements": { some: {} } },
//           ],
//         };
//       } else if (pageType === "My Favorite") {
//         whereCondition.likes = {
//           some: {
//             userId: session?.user?.id, // Filter for cards liked by the logged-in user
//           },
//         };
//         delete whereCondition.isSoldOut; // Allow sold-out cards
//       } else if (pageType === "My Wishlist") {
//         whereCondition.wishlist = {
//           some: {
//             userId: session?.user?.id, // Filter for cards in the user's wishlist
//           },
//         };
//         delete whereCondition.isSoldOut; // Allow sold-out cards
//       }

//       let mintCardsResponse = await prisma.marketplaceCard.findMany({
//         where: whereCondition,
//         select: {
//           id: true,
//           title: true,
//           sellingPrice: true,
//           seller: {
//             select: {
//               id: true,
//               username: true,
//               name: true,
//               image: true,
//             },
//           },
//           nftPurchaseCard: {
//             select: {
//               id: true,
//               cardSerialNumber: true,
//               nftEntity: {
//                 select: {
//                   athlete: true,
//                   cardImageNFT: true,
//                   type: true,
//                   majorEnhancements: true,
//                   minorEnhancements: true,
//                 },
//               },
//               majorEnhancementPurchases: true,
//               minorEnhancementPurchases: true,
//             },
//           },
//           likes : {
//             where : {
//               userId : session?.user?.id,
//             }
//           },
//           wishlist : {
//             where : {
//               userId : session?.user?.id,
//             }
//           }
//         },
//         skip,
//         take: limit,
//       });

//       let updatedCard = extractEnhancements({
//         cards: mintCardsResponse
//       });

//       const totalMarketCards = await prisma.marketplaceCard.count({
//         where: {
//           isLive: true,
//           isSoldOut: false,
//         },
//       });

//       const totalWishList = await prisma.wishlistedMarketPlaceCard.count({
//         where: {
//           userId: session?.user?.id,
//         },
//       });

//       const totalLiked = await prisma.marketplaceCardLikes.count({
//         where: {
//           userId: session?.user?.id,
//         },
//       });

//       const totalPages = Math.ceil(totalMarketCards / limit);

//       const b2res = (await getB2TokenForFileDownload()) as B2APIType;

//       res.status(200).json({
//         cards: updatedCard,
//         totalWishList,
//         totalLiked,
//         pagination: {
//           currentPage: page,
//           totalPages,
//           totalItems: totalMarketCards,
//           hasMore: page < totalPages,
//         },
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     } else {
//       res.status(400).json({ error: "ONLY GET ALLOWED" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
