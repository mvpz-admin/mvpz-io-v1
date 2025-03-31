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

    let pc = await prisma.nFTPurchaseCard.findMany({
      where : {
        status : "ASSIGNED"
      },
      include : {
        currentOwner : true,
        nftEntity : true
      }
    });

    await Promise.all(
      pc.map(async (c) => {
        let getUser = await prisma.user.findFirst({
          where : {
            id : c.currentOwner.id
          }
        })

        let type = c.nftEntity.type?.charAt(0).toUpperCase() + c.nftEntity.type?.slice(1).toLowerCase()


       let getXpFactor = await prisma.xPFactor.findFirst({
           where : type == "Championship" || type == "Team" ? {
            type
           } : {
            type,
            membershipTier: c.nftEntity.membershipTier
           }
       })

       await prisma.user.update({
        where : {
          id : getUser.id
        },
        data : {
          xp : getUser.xp + getXpFactor.factorValue
        }
      })
    }));

    return res.status(200).json({
      message: "Successfully processed purchases",
      data: true,
    });
  } catch (error) {
    console.error("Error creating XP system items:", error);
    return res.status(500).json({
      error: "Failed to create XP system items",
      details: error instanceof Error ? error.message : "Unknown error occurred",
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
