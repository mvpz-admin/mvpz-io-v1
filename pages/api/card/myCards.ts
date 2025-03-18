
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// interface B2APIType {
//   downloadUrl: string;
//   authorizationToken: string;
// }

// function extractEnhancements(cards: any[]) {
//   return cards.map((card) => {
    
//     const latestPurchasedEnhancements =  card.majorEnhancementPurchases?.nftMajorEnhancement?.sort(
//       (a, b) => b.ver - a.ver
//     )[0] || null

//     const allEnhancements =
//       (card.nftEntity?.minorEnhancements || [])
//         ?.concat(card.nftEntity?.majorEnhancements || [])

//     const purchasedEnhancements = [
//       ...(card.majorEnhancementPurchases || []),
//       ...(card.minorEnhancementPurchases || []),
//     ];

//     let majorEnhancementImage = !!latestPurchasedEnhancements ? ["PHOTO_UPDATE","TEAM_CHANGE"].includes(latestPurchasedEnhancements?.type?.subType) && latestPurchasedEnhancements?.cardNFTImage : null


//     let owner = card?.nftEntity?.athlete  || {
//       id : "Mvpz-Store",
//       name : "Mvpz",
//       username : "@mvpz",
//       image : "https://f005.backblazeb2.com/file/mvpz-other-assest/logo-transparent.png",
//       shortuctName : "MVPz",
//     }
//     let nameArray =  owner?.name?.split(" ")
//     let ownerFirstName = nameArray[0]?.substring(0,1)
//     let ownerLastName = nameArray?.length > 1 ?  nameArray[nameArray.length - 1]?.substring(0,1) : ""


//     let ownerDetails = {
//       id : owner?.id,
//       name : owner?.name,
//       username : owner?.username,
//       profileImage : owner?.image,
//       shortuctName :  `${ownerFirstName.toUpperCase()}${ownerLastName.toUpperCase()}`
//     }


//     return {
//       id : card?.id,
//       title : card?.nftEntity.title,
//       type : card?.nftEntity.type,
//       serialNumber : card?.cardSerialNumber,
//       price : card?.nftEntity.price || 20,
//       baseImageNft : card?.nftEntity.cardImageNFT,
//       owner : ownerDetails,
//       enhancementImageNft : majorEnhancementImage,
//       totalEnhancements : allEnhancements?.length ,
//       purchasedEnhancements : purchasedEnhancements?.length,
//       availEnhancement : allEnhancements?.length - purchasedEnhancements.length,
//       avatars :  card?.nftEntity?.avatars
//     }
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

//       const pageType = req.query.pageType || "All";
//       const page = parseInt(req.query.page as string) || 1;
//       const limit = parseInt(req.query.limit as string) || 10;
//       const skip = (page - 1) * limit;

//       let mintCardsResponse = await prisma.nFTMintCard.findMany({
//         where:
//           pageType == "All"
//             ? { currentOwnerId: session.user.id }
//             : {
//                 currentOwnerId: session.user.id,
//                 nftEntity: {
//                   type: {
//                     equals: pageType as string,
//                   },
//                 },
//               },
//         select: {
//           id : true,
//           cardSerialNumber : true,
//           majorEnhancementPurchases: {
//             include: {
//               nftMajorEnhancement: {
//                 include: {
//                   type: true,
//                 },
//               },
//             },
//           },
//           minorEnhancementPurchases: {
//             include: {
//               nftMinorEnhancement: {
//                 include: {
//                   type: true,
//                 },
//               },
//             },
//           },
//           nftEntity: {
//             select: {
//               id: true,
//               title: true,
//               serialNumberStart: true,
//               price: true,
//               cardImageNFT: true,
//               type: true,
//               athlete: { select: {id:true, name : true, image : true, username : true} },
//               minorEnhancements: true,
//               majorEnhancements: true,
//               avatars : {
//                 select : {
//                   thumbnail : true,
//                   title : true
//                 }
//               }
//             },
//           },
//         },
//         skip,
//         take: limit,
//       });

//      let mintCards = extractEnhancements(mintCardsResponse);

//       let purchaseCardsResponse = await prisma.nFTPurchaseCard.findMany({
//         where:
//         pageType == "All"
//           ? { currentOwnerId: session.user.id }
//           : {
//               currentOwnerId: session.user.id,
//               nftEntity: {
//                 type: {
//                   equals: pageType as string,
//                 },
//               },
//             },
//         select: {
//           id : true,
//           cardSerialNumber : true,
//           majorEnhancementPurchases: {
//             include: {
//               nftMajorEnhancement: {
//                 include: {
//                   type: true,
//                 },
//               },
//             },
//           },
//           minorEnhancementPurchases: {
//             include: {
//               nftMinorEnhancement: {
//                 include: {
//                   type: true,
//                 },
//               },

//             },
//           },
//           nftEntity: {
//             select: {
//               id: true,
//               title: true,
//               serialNumberStart: true,
//               price: true,
//               cardImageNFT: true,
//               type: true,
//               athlete: { select: {id:true, name : true, image : true, username : true} },
//               minorEnhancements: true,
//               majorEnhancements: true,
//               avatars : {
//                 select : {
//                   thumbnail : true,
//                   title : true
//                 }
//               }
//             },
//           },
//         },
//         skip,
//         take: limit,
//       });

//       let purchaseCards =  extractEnhancements(purchaseCardsResponse);

//       const totalMintCards = await prisma.nFTMintCard.count({
//         where: { currentOwnerId: session.user.id },
//       });
//       const totalPurchaseCards = await prisma.nFTPurchaseCard.count({
//         where: { currentOwnerId: session.user.id },
//       });
//       const totalCards = totalMintCards + totalPurchaseCards;
//       const totalPages = Math.ceil(totalCards / limit);

//       const b2res = (await getB2TokenForFileDownload()) as B2APIType;

//       res.status(200).json({
//         lastRefreshedDate: session.user.cardsRefreshDate,
//         cards: [...mintCards, ...purchaseCards],
//         pagination: {
//           currentPage: page,
//           totalPages,
//           totalItems: totalCards,
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
