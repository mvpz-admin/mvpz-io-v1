import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    let enh = await prisma.nFTMajorEnhancement.findMany({
      include: {
        nftEntity: true,
        avatar: true,
      },
    });

    await Promise.all(
      enh.map(async (c) => {
        // Create 50 purchases for each enhancement
        const purchases = Array(50).fill(null).map(() => ({
          purchaseId: null,
          mintId: null,
          nftMajorEnhancementId: c.id,
          avatarId: c.avatar.id,
          status: "UNASSIGNED",
          isMinted: false,
        }));

        await prisma.nFTMajorEnhancementPurchase.createMany({
          data: purchases,
        });
      })
    );

    return res.status(200).json({
      message: "Successfully processed purchases",
      data: true,
    });
  } catch (error) {
    console.error("Error creating XP system items:", error);
    return res.status(500).json({
      error: "Failed to create XP system items",
      details:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}

// // import { NextApiRequest, NextApiResponse } from "next";
// // import prisma from "../../lib/prisma";

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   try {
// //     if (req.method !== "POST") {
// //       return res.status(405).json({ error: "Method not allowed" });
// //     }

// //     let entity = await prisma.nFTEntity.findMany({
// //       include: {
// //         athlete: true,
// //       },
// //     });

// //     await Promise.all(
// //       entity.map(async (entity) => {
// //         let enh = await prisma.nFTMajorEnhancement.findFirst({
// //           where: {
// //             nftEntityId: entity.id,
// //           },
// //         });

// //         let getAvatar = await prisma.avatars.findFirst({
// //           where : {
// //             nftEntityId : entity.id
// //           }
// //         })

// //         if (!enh) {
// //           let createEnhType = await prisma.majorEnhancementType.create({
// //             data : {
// //               type : "ATHLETE_PERSONALIZATIONS",
// //               subType : "TEAM_ADD"

// //             }
// //           })

// //           try {
// //               await prisma.nFTMajorEnhancement.create({
// //               data: {
// //                title : enh.title,
// //                duration : "PERMANENT",
// //                ver : 1,
// //                avatarsId : getAvatar.id,
// //                cardNFTImage : entity.cardImageNFT,
// //                isBaseCard : true,
// //                typeId : createEnhType.id,
// //                 nftEntityId : entity.id,
// //                 price : 20,

// //               },
// //             });
// //           } catch (error) {
// //             console.error(`Failed to create avatar for entity ${entity.id}:`, error);
// //           }
// //         }
// //       })
// //     );

// //     return res.status(200).json({
// //       message: "Successfully processed purchases",
// //       data: true,
// //     });
// //   } catch (error) {
// //     console.error("Error creating XP system items:", error);
// //     return res.status(500).json({
// //       error: "Failed to create XP system items",
// //       details:
// //         error instanceof Error ? error.message : "Unknown error occurred",
// //     });
// //   }
// // }
