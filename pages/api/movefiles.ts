// import axios from "axios";
// import prisma from "../../lib/prisma";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const nftEntities = await prisma.nFTEntity.findMany({
//       where: {
//         type: "Team",
//       },
//       include: {
//         majorEnhancements: true,
//       },
//     });

//     await Promise.all(
//       nftEntities.map(async (nft) => {
//         if (nft.majorEnhancements.length == 0) {

//             console.log("finding for", nft.title);

//           let getTribe = await prisma.tribe.findFirst({
//             where : {
//                 tribeName : nft.title
//             }
//           })

//           if(getTribe) {
//             console.log( "Tribe Found", nft.id, nft.title, getTribe.id);

//             let createAvatar = await prisma.avatars.create({
//                 data : {
//                     title : getTribe.tribeName,
//                     description : getTribe.about,
//                     nftEntityId : nft.id,
//                     tribeId : getTribe.id,
//                 }
//             })

//             if(createAvatar) {
//                 console.log("Avatar Created", nft.id);
//             }else {
//                 console.log("Avatar Not Created", nft.id);
//             }

//             let nftMajorEnhancementType = await prisma.majorEnhancementType.create({
//                 data : {
//                    subType : "TEAM_ADD",
//                    type : "ATHLETE_PERSONALIZATIONS"

//                 }
//             })

//                 let nftMajorEnhancement = await prisma.nFTMajorEnhancement.create({
//                     data : {
//                     nftEntityId : nft.id,
//                     typeId   : nftMajorEnhancementType.id,
//                     duration : "PERMANENT",
//                     title : nft.title,
//                     ver :1,
//                     avatarsId : createAvatar.id,
//                     isBaseCard : true,
//                     cardNFTImage : nft.cardImageNFT,
//                     price : 20,

//                 }
//             })

//             if(nftMajorEnhancement) {
//                 console.log("NFT Major Enhancement Created", nft.id,  nftMajorEnhancement.id);
//             }else {
//                 console.log("NFT Major Enhancement Not Created", nft.id, );
//             }

//           }else {
//             console.log( "Tribe Not Found", nft.id, nft.title);
//           }

//         }
//       })
//     );
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// }

// import axios from "axios";
// import prisma from "../../lib/prisma";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const nftEntities = await prisma.nFTPurchaseCard.findMany({
//       where: {
//         status: "ASSIGNED",
//       },
//       include: {
//         majorEnhancementPurchases: true,
//         nftEntity: true,
//       },
//     });

//     await Promise.all(
//       nftEntities.map(async (nft) => {
//         if (nft.majorEnhancementPurchases.length == 0) {
//           let getMajorEnh = await prisma.nFTMajorEnhancement.findFirst({
//             where: {
//               nftEntityId: nft.nftEntityId,
//             },
//           });

//           if (getMajorEnh) {
//             console.log("Major Enhancement Found");
//           } else {
//             console.log("Major Enhancement Not Found");
//             return;
//           }

//           let getAvatar = await prisma.avatars.findFirst({
//             where: {
//               nftEntityId: nft.nftEntityId,
//             },
//           });

//           if (getAvatar) {
//             console.log("Avatar Found");
//           } else {
//             console.log("Avatar Not Found");
//             return;
//           }

//           let res = await prisma.nFTMajorEnhancementPurchase.create({
//             data: {
//               nftMajorEnhancementId: getMajorEnh.id,
//               purchaseId: nft.id,
//               avatarId: getAvatar.id,
//             },
//           });

//           if (res) {
//             console.log("Major Enhancement Purchase Created");
//           } else {
//             console.log("Major Enhancement Purchase Not Created");
//           }
//         }
//       })
//     );
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// }

// import axios from "axios";
// import prisma from "../../lib/prisma";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const nftEntities = await prisma.nFTMajorEnhancement.findMany({

//       include: {
//      nftEntity : true
//       },
//     });

//     await Promise.all(
//       nftEntities.map(async (nft) => {
//         await prisma.nFTMajorEnhancement.update({
//           where: {
//             id: nft.id,
//           },
//           data: {
//            cardNFTImage : nft.nftEntity.cardImageNFT
//           },
//         });
//       })
//     );
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// }

import axios from "axios";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    let pc = await prisma.nFTPurchaseCard.findMany({
      where: {
        status: "ASSIGNED"
      },
      include: {
        currentOwner: true,
        nftEntity: true
      }
    });

    // Process updates sequentially to avoid transaction conflicts
    for (const c of pc) {
      try {
        if (!c.currentOwner?.id || !c.nftEntity?.type) {
          console.log(`Skipping record due to missing data: ${c.id}`);
          continue;
        }

        let getUser = await prisma.user.findFirst({
          where: {
            id: c.currentOwner.id
          }
        });

        if (!getUser) {
          console.log(`User not found for ID: ${c.currentOwner.id}`);
          continue;
        }

        let type = c.nftEntity.type.charAt(0).toUpperCase() + c.nftEntity.type.slice(1).toLowerCase();

        let getXpFactor = await prisma.xPFactor.findFirst({
          where: type === "Championship" || type === "Team" 
            ? { type }
            : {
                type,
                membershipTier: c.nftEntity.membershipTier
              }
        });

        if (!getXpFactor) {
          console.log(`XP Factor not found for type: ${type}`);
          continue;
        }

        // Use a transaction to ensure atomic updates
        await prisma.$transaction(async (tx) => {
          await tx.user.update({
            where: {
              id: getUser.id
            },
            data: {
              xp: getUser.xp + getXpFactor.factorValue
            }
          });
        });

        console.log(`Successfully updated XP for user ${getUser.id}`);
      } catch (error) {
        console.error(`Error processing record ${c.id}:`, error);
        // Continue with next record even if one fails
        continue;
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
