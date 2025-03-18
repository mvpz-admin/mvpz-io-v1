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

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "PUT") {
//     //   const { cardId, title, description, price } = req.body 
//       const session = await getServerSession(req, res, authOptions);
//       const {id : marketCardId} = req.query


//       let findInMarket = await prisma.marketplaceCard.findFirst({
//         where : {
//             id : marketCardId as string
//         },
//         include : {
//             nftPurchaseCard : true
//         }
//       })

//       if(!findInMarket){
//         return res.status(404).json({
//             success : false,
//             error : "Card Not Found In Marketplace!"
//         })
//       }

//       let nFTPurchaseCard  = await prisma.nFTPurchaseCard.findUnique({
//           where: {
//             id: findInMarket.nftPurchaseCard.id,
//           },
//           include: {
//             nftEntity: {
//               select: {
//                 id: true,
//                 title: true,
//                 type: true,
//                 description: true,
//                 rarity: true,
//                 position: true,
//                 edition: true,
//                 cardImageNFT: true,
//                 design: true,
//                 designer: true,
//                 sport: true,
//                 special: true,
//                 school: true,
//                 membershipTier: true,
//                 year: true,
//                 sex: true,
//                 medal: true,
//                 athlete: { select: { name: true, username: true } },
//               },
//             },
//           },
//         });
      


//     //  add to market


//     if(!!nFTPurchaseCard){
//         let deleteFromMarket = await prisma.marketplaceCard.delete({
//             where : {
//                id :  findInMarket.id
//             }
//         })

//         await prisma.notification.create({
//           data : {
//             userId : session?.user?.id,
//             type : "GENERAL",
//             title : "Your card is now unlisted! ",
//             message : "Your item has been successfully unlisted from the market"
//           }
//         })
//     }
//     // else{
//     //     let create = await prisma.marketplaceCard.create({
//     //         data : {
//     //             sellingPrice : price,
//     //             title,
//     //             description,
//     //             nftMintCardId : nFTMintCard.id,
//     //             sellerId : session?.user?.id,
//     //         }
//     //     })


//     //     const getTradeHistory = await prisma.markeCardTradeHistory.findMany({
//     //         where : {
//     //             nftPurchaseCardId : nFTMintCard.id
//     //         }
//     //     })


//     //     if(getTradeHistory?.length == 0){
//     //         await prisma.markeCardTradeHistory.create({
//     //             data : {
//     //                 buyerId : session?.user?.id,
//     //                 nftMintCardId : nFTMintCard?.id,
//     //                 buyAtPrice : nFTMintCard.nftEntity.price,

//     //             }
//     //         })
//     //     }

//     //     await prisma.notification.create({
//     //       data : {
//     //         userId : session?.user?.id,
//     //         type : "GENERAL",
//     //         title : "Your Card Is Now Live! 🎉",
//     //         message : "Your card is officially listed on the market and ready to sell.  🚀"
//     //       }
//     //     })

//     // }


//       // get minum price
      
      
//       const getTradeStartingPrice =
//         await prisma.tradeSellingStartPrice.findFirst();
//       let amount = nFTPurchaseCard.purchasePrice
//       let amountPercentage =
//         (amount * (getTradeStartingPrice.price || 20)) / 100;
//       let minimumAmt = amount + amountPercentage;

//       // check is prod live
//       const isPrdLive = await prisma.marketplaceCard.findFirst({
//         where: nFTPurchaseCard
//           ? {
//               nftPurchaseCardId: nFTPurchaseCard?.id,
//             }
//           : {
//               nftMintCardId: nFTPurchaseCard?.id,
//             },
//       });



//       const b2res = (await getB2TokenForFileDownload()) as B2APIType;
//       res.status(200).json({
//         success: true,
//         data: {
//           card: nFTPurchaseCard,
//           startSellingPrice: minimumAmt,
//           isLive : !!isPrdLive,
//           liveInfo: isPrdLive,
//           imageDownload: {
//             downloadUrl: b2res.downloadUrl,
//             authorizationToken: b2res.authorizationToken,
//           },
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
