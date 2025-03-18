// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";
// import prisma from "../../../../../lib/prisma";
// import { authOptions } from "../../../auth/[...nextauth]";

// interface B2APIType {
//   downloadUrl: String;
//   authorizationToken: String;
// }


// const getBadgeIcon = ({
//   subType
// }) => {
//   switch(subType){
//    case "BIG_GAME" : 
//     return "/images/badges/Big_Game.png"
//    case  "RECORD_BREAKER" :
//     return "/images/badges/Record_Breaker.png"
//    case   "HOT_STREAK" :
//     return "/images/badges/Hot_Streak.png"
//    case  "TRUE_STRENGTH" :
//     return "/images/badges/True_Strength.png"
//    case  "FIRST_CHOICE" :
//     return "/images/badges/First_Choice.png"
//    case   "MILESTONE" :
//     return "/images/badges/Milestone.png"
//   }
// }

// const baseImage = "/images/badges/baseImg.png"

// function formatTitle({type}): string {
//   return type
//     .toLowerCase()
//     .replace(/_/g, ' ')
//     .replace(/\b\w/g, char => char.toUpperCase());
// }



// const getUpdatedsAvatar = ({
//   avatars,
//   majorEnhancementPurchases,
//   minorEnhancementPurchases,
// }) => {
  
  

//   // Extract enhancement IDs from purchases
//   const purchasedMajorEnhancementIds = new Set(
//     majorEnhancementPurchases?.map(
//       (purchase) => purchase.nftMajorEnhancementId
//     ) || []
//   );

//   const purchasedMinorEnhancementIds = new Set(
//     minorEnhancementPurchases?.map(
//       (purchase) => purchase.nftMinorEnhancementId
//     ) || []
//   );

//   // Filter out enhancements that are already purchased
//   return avatars
//     ?.map((avatar) => {
//       const remainingMajorEnhancements = avatar.majorEnhancements?.filter(
//         (enhancement) => !purchasedMajorEnhancementIds.has(enhancement.id)
//       )?.map((_) => ({
//         ..._,
//         type : "major",
//         enhType : formatTitle({ type: _.type.subType}),
//         catType : _.type.type,
//         catSubType: _.type.subType,
//       }))

//       const remainingMinorEnhancements = avatar.minorEnhancements?.filter(
//         (enhancement) => !purchasedMinorEnhancementIds.has(enhancement.id)
//       )?.map((_) => ({
//         ..._,
//         type : "minor",
//         enhType : formatTitle({ type: _.type.subType}),
//         catType : _.type.type,
//         catSubType: _.type.subType,
//         badgeIcon : getBadgeIcon({
//           subType: _.type.subType,
//         }),
//         baseImage
//       }))

//       // Return only avatars that still have at least one enhancement
//       if (
//         remainingMajorEnhancements.length > 0 ||
//         remainingMinorEnhancements.length > 0
//       ) {
        
//         return {
//           ...avatar,
//           thumbnail : avatar?.thumbnail || remainingMajorEnhancements[0]?.cardNFTImage,
//           shortCutName: avatar?.title?.substring(0,2),
//           enhancements: [
//             ...remainingMajorEnhancements,
//             ...remainingMinorEnhancements,
//           ],
//         };
//       }

//       return null; // Remove avatars with no enhancements left
//     })
//     ?.filter(Boolean); // Remove null values (filtered-out avatars)
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "GET") {
//       const serialNumber = req.query.id;
//       const session = await getServerSession(req, res, authOptions);

//       if (!session?.user?.id) {
//         return res
//           .status(400)
//           .json({ success: false, error: "Aunthorized User" });
//       }

//       let card;

//       let nFTMintCard = await prisma.nFTMintCard.findFirst({
//         where: {
//           cardSerialNumber: serialNumber as string,
//           currentOwnerId: session?.user?.id,
//         },
//         select: {
//           id: true,
//           cardSerialNumber: true,
//           nftEntity: {
//             select: {
//               title: true,
//               description: true,
//               cardImageNFT : true,
//               athlete: {
//                 select: {
//                   id: true,
//                   image: true,
//                   name: true,
//                   username: true,
//                 },
//               },
//               tribe: {
//                 select: {
//                   id: true,
//                   tribeBanner: true,
//                   tribeLogo: true,
//                   tribeName: true,
//                   tribeFanCreatedName: true,
//                   tribeShortName: true,
//                   athletes: true,
//                 },
//               },
//               majorEnhancements: true,
//               minorEnhancements: true,
//               avatars: {
//                 include : {
//                   majorEnhancements : {
//                     include : {
//                       type : true
//                     }
//                   },
//                   minorEnhancements : {
//                     include : {
//                       type : true
//                     }
//                   }
//                  }
//               },
//             },
//           },
//           majorEnhancementPurchases: true,
//           minorEnhancementPurchases: true,
//         },
//       });

//       if (!!nFTMintCard) {
//         card = nFTMintCard;
//       }

//       let nFTPurchaseCard = await prisma.nFTPurchaseCard.findFirst({
//         where: {
//           cardSerialNumber: serialNumber as string,
//           currentOwnerId: session?.user?.id,
//         },
//         select: {
//           id: true,
//           cardSerialNumber: true,
//           nftEntity: {
//             select: {
//               title: true,
//               description: true,
//               cardImageNFT : true,
//               athlete: {
//                 select: {
//                   id: true,
//                   image: true,
//                   name: true,
//                   username: true,
//                 },
//               },
//               tribe: {
//                 select: {
//                   id: true,
//                   tribeBanner: true,
//                   tribeLogo: true,
//                   tribeName: true,
//                   tribeFanCreatedName: true,
//                   tribeShortName: true,
//                   athletes: true,
//                 },
//               },
//               majorEnhancements: true,
//               minorEnhancements: true,
//               avatars: {
//                 include : {
//                   majorEnhancements : {
//                     include : {
//                       type : true
//                     }
//                   },
//                   minorEnhancements : {
//                     include : {
//                       type : true
//                     }
//                   }
//                  }
//               },
//             },
//           },
//           majorEnhancementPurchases: true,
//           minorEnhancementPurchases: true,
//         },
//       });

//       if (!!nFTPurchaseCard) {
//         card = nFTPurchaseCard;
//       }

//       if (!card) {
//         return res.status(400).json({
//           success: false,
//           purchasedCard: false,
//           enhacement: 0,
//           purchased: 0,
//           error: "Base Card Not Available",
//         });
//       }

//       let filterNonPurchaseEnhInAvatars = await getUpdatedsAvatar({
//         avatars: card.nftEntity.avatars,
//         majorEnhancementPurchases: card.majorEnhancementPurchases,
//         minorEnhancementPurchases: card.minorEnhancementPurchases,
//       });
    

//       if (
//         card?.nftEntity?.majorEnhancements?.length == 0 &&
//         card?.nftEntity?.minorEnhancements?.length == 0
//       ) {
//         return res.status(400).json({
//           success: false,
//           purchasedCard: true,
//           enhacement:
//             card?.nftEntity?.majorEnhancements?.length +
//             card?.nftEntity?.minorEnhancements?.length,
//           purchased: 0,
//           error: "Enhacement Not Available",
//         });
//       }


//       if (filterNonPurchaseEnhInAvatars?.length == 0) {
//         return res.status(400).json({
//           success: false,
//           purchasedCard: true,
//           enhacement:
//             card?.nftEntity?.majorEnhancements?.length +
//             card?.nftEntity?.minorEnhancements?.length,
//           purchased: filterNonPurchaseEnhInAvatars?.length,
//           error: "Enhacement All Purchased",
//         });
//       }

//       const getShortcutName = ({name}) => {
//         let nameArray =  name?.split(" ")
//         let ownerFirstName = nameArray[0]?.substring(0,1)
//         let ownerLastName = nameArray?.length > 1 ?  nameArray[nameArray.length - 1]?.substring(0,1) : ""

//         return `${ownerFirstName.toUpperCase()}${ownerLastName.toUpperCase()}`
//       }

//       let data = {
//         id: card?.id,
//         serialNumber : card?.cardSerialNumber,
//         title: card?.nftEntity?.title,
//         description: card?.nftEntity?.description,
//         cardImageNFT : card?.nftEntity?.cardImageNFT,
//         athlete: !!card?.nftEntity?.athlete
//           ? {
//               id: card?.nftEntity?.athlete?.id,
//               image: card?.nftEntity?.athlete?.image,
//               name: card?.nftEntity?.athlete?.name,
//               username: card?.nftEntity?.athlete?.username,
//               athleteShorcutName : getShortcutName({name : card?.nftEntity?.athlete?.name || card?.nftEntity?.athlete?.username})
//             }
//           : null,
//         tribe: !!card?.nftEntity?.tribe
//           ? {
//               id: card?.nftEntity?.tribe?.id,
//               image:
//                 card?.nftEntity?.tribe?.tribeBanner ||
//                 card?.nftEntity?.tribe?.tribeLogo,
//               name:
//                 card?.nftEntity?.tribe?.tribeShortName ||
//                 card?.nftEntity?.tribe?.tribeName,
//               athleteCount:
//                 card?.nftEntity?.tribe?.athletes?.length + " Athletes",
//               tribeShortcutName : getShortcutName({name : card?.nftEntity?.tribe?.tribeShortName ||
//                 card?.nftEntity?.tribe?.tribeName,})
//             }
//           : null,
//         avatars : filterNonPurchaseEnhInAvatars,
//       };

//       const b2res = (await getB2TokenForFileDownload()) as B2APIType;
//       res.status(200).json({
//         success: true,
//         data,
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     } else {
//       res.status(400).json({ error: "ONLY GET ALLOWED" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
