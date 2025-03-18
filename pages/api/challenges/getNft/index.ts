// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../lib/backBlaze";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions);

//   if (req.method !== "GET") {
//     return res.status(400).json({ error: "ONLY GET ALLOWED" });
//   }

//   try {
//     if (!session?.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const id = req.query.id
   

//     const getNftPurchaseCard = await prisma.nFTPurchaseCard.findFirst({
//       where :{
//        currentOwnerId : session?.user?.id,
//        nftEntityId : id as string
//       },
//       include : {
//         nftEntity : {
//           select : {
//             title : true,
//             type : true,
//             membershipTier : true
//           }
//         }
//       }
//     })

//     const getNftMintCard = await prisma.nFTPurchaseCard.findFirst({
//       where :{
//         currentOwnerId : session?.user?.id,
//         nftEntityId : id as string
//       },
//       include : {
//         nftEntity : {
//           select : {
//             title : true,
//             type : true,
//             membershipTier : true
//           }
//         }
//       }
//     })

//     let card = getNftPurchaseCard || getNftMintCard

//     const xpFactor = await prisma.xPFactor.findFirst({
//       where:
//         card.nftEntity.type === "Athlete"
//           ? { type: card.nftEntity.type, membershipTier: card.nftEntity.membershipTier }
//           : { type: card.nftEntity.type },
//     });


//     return res.status(200).json({
//       success: true,
//       data: {
//         nft: getNftPurchaseCard || getNftMintCard,
//         xpEarn : xpFactor
//       },
//     });
//   } catch (err) {
//     await prisma.logError.create({
//       data: {
//         apiName: "/api/earnings",
//         collection: "(N/A)",
//         errorLog: `${err}`,
//         title: `Error While Fetching Earnings For ${session?.user?.username}`,
//       },
//     });

//     console.error(err);
//     return res.status(500).json({success: false, error: "Internal server error" });
//   }
// }
