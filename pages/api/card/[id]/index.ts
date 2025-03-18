// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import getB2TokenForFileDownload from "../../../../lib/backBlaze";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";

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


// const calStats = ({ nft }) => {

// let tribe = nft?.nftEntity?.athlete?.athleteTribes?.filter((_) => _?.tribe?.isPrimary)[0]




//   return nft?.nftEntity?.type == "Athlete" ? {
//     athleteName : nft?.nftEntity?.athlete?.name,
//     tribe : tribe?.tribe?.tribeName,
//     sport: nft?.nftEntity?.athlete?.primarySport,
//     position : nft?.nftEntity?.athlete?.primaryPosition,
//     special : nft?.nftEntity?.special,
//     collection : "Mvpz Gen 1",
//     year : nft?.nftEntity?.year,
//     membershipTier : nft?.nftEntity?.membershipTier,
//     design : nft?.nftEntity?.design,
//     designer : nft?.nftEntity?.designer,
//     purchaseOn : nft?.nftEntity?.createdAt,
//     serialNumber : nft?.cardSerialNumber
//   } : {
//     special : nft?.nftEntity?.special,
//     collection : "Mvpz Gen 1",
//     year : nft?.nftEntity?.year,
//     membershipTier : nft?.nftEntity?.membershipTier,
//     design : nft?.nftEntity?.design,
//     designer : nft?.nftEntity?.designer,
//     purchaseOn : nft?.nftEntity?.createdAt,
//     serialNumber : nft?.cardSerialNumber
//   };
// };

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
//       console.log({
//         avatar,
//         totalEnh : avatar.majorEnhancements?.length + avatar.minorEnhancements?.length,
//         majorEnhancements : avatar.majorEnhancements,
//         minorEnhancements : avatar.minorEnhancements
//       });
      
//       const remainingMajorEnhancements = avatar.majorEnhancements?.filter(
//         (enhancement) => purchasedMajorEnhancementIds.has(enhancement.id)
//       )?.map((_) => ({
//         ..._,
//         type : "major",
//         enhType : formatTitle({ type: _.type.subType}),
//         catType : _.type.type,
//         catSubType: _.type.subType,
//       }))

//       const remainingMinorEnhancements = avatar.minorEnhancements?.filter(
//         (enhancement) => purchasedMinorEnhancementIds.has(enhancement.id)
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
//           totalEnh : avatar.majorEnhancements?.length + avatar.minorEnhancements?.length
//         };
//       }

//       return null; // Remove avatars with no enhancements left
//     })
//     ?.filter(Boolean); // Remove null values (filtered-out avatars)
// };

// const isMoreToEnhance = ({
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
//  let enh = avatars
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
//     ?.filter(Boolean);

// return enh?.length > 0
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
//               cardImageNFT: true,
//               special: true,
//               year: true,
//               membershipTier: true,
//               design: true,
//               designer: true,
//               createdAt: true,
//               type : true,
//               athlete: {
//                 select: {
//                   id: true,
//                   image: true,
//                   name: true,
//                   username: true,
//                   primarySport: true,
//                   primaryPosition: true,
//                   athleteTribes: {
//                     select: {
//                       tribe: {
//                         select: {
//                           tribeName: true,
//                           tribeShortName: true,
//                           isPrimary : true
//                         },
//                       },
//                     },
//                   },
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
//                 include: {
//                   majorEnhancements: {
//                     include: {
//                       type: true,
//                     },
//                   },
//                   minorEnhancements: {
//                     include: {
//                       type: true,
//                     },
//                   },
//                 },
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
//               cardImageNFT: true,
//               special: true,
//               year: true,
//               membershipTier: true,
//               design: true,
//               designer: true,
//               createdAt: true,
//               type : true,
//               athlete: {
//                 select: {
//                   id: true,
//                   image: true,
//                   name: true,
//                   username: true,
//                   primarySport: true,
//                   primaryPosition: true,
//                   athleteTribes: {
//                     select: {
//                       tribe: {
//                         select: {
//                           tribeName: true,
//                           tribeShortName: true,
//                           isPrimary : true
//                         },
//                       },
//                     },
//                   },
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
//                 include: {
//                   majorEnhancements: {
//                     include: {
//                       type: true,
//                     },
//                   },
//                   minorEnhancements: {
//                     include: {
//                       type: true,
//                     },
//                   },
//                 },
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

//       let filterPurchasedEnhInAvatars = await getUpdatedsAvatar({
//         avatars: card.nftEntity.avatars,
//         majorEnhancementPurchases: card.majorEnhancementPurchases,
//         minorEnhancementPurchases: card.minorEnhancementPurchases,
//       });


//       let enhanceAvailable = await isMoreToEnhance({
//         avatars: card.nftEntity.avatars,
//         majorEnhancementPurchases: card.majorEnhancementPurchases,
//         minorEnhancementPurchases: card.minorEnhancementPurchases,
//       });

//       // let findSimilarNftProduct1 = await prisma.nFTMintCard?.findMany({
//       //   where : {
//       //     nftEntityId : card?.nftEntity?.id,
//       //     currentOwnerId : session?.user?.id,
//       //   }
//       // })

//       // let findSimilarNftProduct2 = await prisma.nFTPurchaseCard?.findMany({
//       //   where : {
//       //     nftEntityId : card?.nftEntity?.id,
//       //     currentOwnerId : session?.user?.id,
//       //   }
//       // })

      



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
//         stats : calStats({nft : card}),
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
//         avatars : filterPurchasedEnhInAvatars,
//         enhanceAvailable,
//         similarProduct : []
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
