// // import { NextApiRequest, NextApiResponse } from "next";
// // import getB2TokenForFileDownload from "../../../../../lib/backBlaze";
// // import prisma from "../../../../../lib/prisma"; // Assume this utility checks if a string is a valid ObjectId
// // import { isValidObjectId } from "../../../../../utils/others";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../../../auth/[...nextauth]";

// // interface B2APIType {
// //   downloadUrl: string;
// //   authorizationToken: string;
// // }


// // const getTitleDescriptions = ({ subtype }) => {
// //   switch (subtype) {
// //     case "BIG_GAME":
// //       return {
// //         title: "Big Game Performance",
// //         description: "This enhancement commemorates a standout game performance."
// //       };
// //     case "RECORD_BREAKER":
// //       return {
// //         title: "Record Breaker",
// //         description: "Marks an achievement where the athlete set a new record."
// //       };
// //     case "HOT_STREAK":
// //       return {
// //         title: "On Fire!",
// //         description: "Celebrates a series of outstanding performances."
// //       };
// //     case "SIGNATURE":
// //       return {
// //         title: "Autographed Edition",
// //         description: "Includes the athlete's signature for authenticity."
// //       };
// //     case "PERFORMANCE_DATA":
// //       return {
// //         title: "Performance Insights",
// //         description: "Adds detailed performance statistics to the card."
// //       };
// //     case "EFFECT":
// //       return {
// //         title: "Special Visual Effect",
// //         description: "Enhance the card with dynamic visual effects."
// //       };
// //     case "CAREER_MOMENT":
// //       return {
// //         title: "Career Milestone",
// //         description: "Highlights a defining moment in the athlete’s career."
// //       };
// //     case "ARTIST_COLLABORATION":
// //       return {
// //         title: "Artist Collaboration",
// //         description: "A unique redesign in collaboration with a featured artist."
// //       };
// //     case "PHOTO_UPDATE":
// //       return {
// //         title: "Updated Photo",
// //         description: "Refresh the card with the latest athlete portrait."
// //       };
// //     case "TEAM_CHANGE":
// //       return {
// //         title: "New Team",
// //         description: "Reflects a change in the athlete's team affiliation."
// //       };
// //     case "BRAND_COLLABORATION":
// //       return {
// //         title: "Brand Partnership",
// //         description: "A special edition featuring a partnered brand."
// //       };
// //     case "ARTISTS_REDESIGN":
// //       return {
// //         title: "Artistic Redesign",
// //         description: "A fresh artistic take on the card’s design."
// //       };
// //     case "EXTERNAL_BRAND_DESIGN":
// //       return {
// //         title: "Exclusive Brand Design",
// //         description: "An exclusive design created by an external brand."
// //       };
// //     case "GRADUATION_OR_RETIREMENT":
// //       return {
// //         title: "Farewell Tribute",
// //         description: "A special edition to honor the athlete's career transition."
// //       };
// //     default:
// //       return {
// //         title: "Unknown Enhancement",
// //         description: "No description available for this enhancement."
// //       };
// //   }
// // };

// // function extractPurchasedEnhancements(cards: any[]) {
// //   return cards.map((card) => {
// //     const purchasedEnhancements = [
// //       ...(card.nFTMinorEnhancement || []),
// //       ...(card.nFTMajorEnhancement || [])?.mpa,
// //     ];

// //     const purchasedEnhancementsEnh = purchasedEnhancements?.map((_) => (
// //       {
// //         ..._,
// //         ...getTitleDescriptions(_?.type?.subType)
// //       }
// //     )) 

// //     // Available Enhancements (Minor or Major with price !== null)
// //     let availablePurchaseEnhancements =
// //       card.nftEntity?.minorEnhancements
// //         ?.concat(card.nftEntity?.majorEnhancements || [])
// //         ?.filter(
// //           (enh) =>
// //             !purchasedEnhancementsEnh.includes(enh.ver) &&
// //             (!enh.expDate || new Date(enh.expDate) > new Date())
// //         ) || []

// //         availablePurchaseEnhancements = availablePurchaseEnhancements?.map((_) => (
// //           {
// //             ..._,
// //             ...getTitleDescriptions(_?.type?.subType)
// //           }
// //         )) 
// //     // Free Enhancements (Price = null and not expired)
// //     const freeEnhancements =
// //       card.nftEntity?.minorEnhancements
// //         ?.concat(card.nftEntity?.majorEnhancements || [])
// //         ?.filter(
// //           (enh) =>
// //             enh.price === null &&
// //             (!enh.expDate || new Date(enh.expDate) > new Date())
// //         ) || [];

// //     // Purchased Enhancements (All minor + major enhancements that the user owns)

// //     return {
// //       ...card,
// //       availablePurchaseEnhancements,
// //       freeEnhancements,
// //       purchasedEnhancements,
// //     };
// //   });
// // }

// // function availableEnhancements(card) {
// //   let availablePurchaseEnhancements = card?.minorEnhancements?.concat(
// //     card?.majorEnhancements || []
// //   ).filter(
// //     (enh) =>
// //       (!enh.expDate || new Date(enh.expDate) > new Date())
// //   ) || [];

// //   availablePurchaseEnhancements = availablePurchaseEnhancements?.map((_) => (
// //     {
// //       ..._,
// //       ...getTitleDescriptions(_?.type?.subType)
// //     }
// //   )) 

// //   return availablePurchaseEnhancements;
// // }

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   try {
// //     if (req.method === "GET") {
// //       const { id } = req.query;

// //       const session = await getServerSession(req, res, authOptions);

// //       let card = await prisma.nFTEntity.findFirst({
// //         where: {
// //           athleteId: id as string,
// //           membershipTier: {
// //             in: ["Bronze", "BRONZE"],
// //           },
// //           design: "Base",
// //         },
// //         include: {
// //           majorEnhancements: {
// //             include: {
// //               type: true,
// //             }
// //           },
// //           minorEnhancements: {
// //             include: {
// //               type: true,
// //             }
// //           },
// //         },
// //       });

// //       if (!card) {
// //         res.status(200).json({
// //           card: null,
// //           imageDownload: null,
// //         });
// //       }

// //       let availableEnhancementsForbaseCard = await availableEnhancements(card);

// //       let designerName = card?.designer;

// //       if (card?.designer && isValidObjectId(card.designer)) {
// //         const findDesigner = await prisma.user.findFirst({
// //           where: { id: card.designer },
// //         });
// //         designerName = findDesigner?.name || card.designer;
// //       }

// //       const b2res = (await getB2TokenForFileDownload()) as B2APIType;

// //       let list1 = await prisma.nFTPurchaseCard.findMany({
// //         where: {
// //           nftEntityId: card?.id,
// //           currentOwnerId: session?.user?.id,
// //         },
// //         include: {
// //           nFTMajorEnhancement: {
// //             include: {
// //               type: true,
// //             },
// //           },
// //           nFTMinorEnhancement: {
// //             include: {
// //               type: true,
// //             },
// //           },
// //           nftEntity: {
// //             include: {
// //               majorEnhancements: {
// //                 include: {
// //                   type: true,
// //                 },
// //               },
// //               minorEnhancements: {
// //                 include: {
// //                   type: true,
// //                 },
// //               },
// //             },
// //           },
// //         },
// //         orderBy: {
// //           createdAt: "desc",
// //         },
// //       });

// //       let list2 = await prisma.nFTMintCard.findMany({
// //         where: {
// //           nftEntityId: card?.id,
// //           currentOwnerId: session?.user?.id,
// //         },
// //         include: {
// //           nFTMajorEnhancement: {
// //             include: {
// //               type: true,
// //             },
// //           },
// //           nFTMinorEnhancement: {
// //             include: {
// //               type: true,
// //             },
// //           },
// //           nftEntity: {
// //             include: {
// //               majorEnhancements: {
// //                 include: {
// //                   type: true,
// //                 },
// //               },
// //               minorEnhancements: {
// //                 include: {
// //                   type: true,
// //                 },
// //               },
// //             },
// //           },
// //         },
// //         orderBy: {
// //           createdAt: "desc",
// //         },
// //       });

// //       let list = [...list1, ...list2];
// //       let enhancement = await extractPurchasedEnhancements(list);

// //       res.status(200).json({
// //         card: {
// //           ...card,
// //           availableEnhancements : availableEnhancementsForbaseCard,
// //           purchasedCard: enhancement,
// //           designer: designerName,
// //           isAlreadyPurchased: list?.length > 0,
// //         },
// //         imageDownload: {
// //           downloadUrl: b2res.downloadUrl,
// //           authorizationToken: b2res.authorizationToken,
// //         },
// //       });
// //     } else {
// //       res.status(400).json({ error: "ONLY GET ALLOWED" });
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // }


// import { NextApiRequest, NextApiResponse } from "next";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";
// import prisma from "../../../../../lib/prisma";
// import { isValidObjectId } from "../../../../../utils/others";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";

// interface B2APIType {
//   downloadUrl: string;
//   authorizationToken: string;
// }

// const getTitleDescriptions = ({ subtype }) => {
//   console.log({subtype});
  
//   const titles = {
//     BIG_GAME: { title: "Big Game Performance", description: "This enhancement commemorates a standout game performance." },
//     RECORD_BREAKER: { title: "Record Breaker", description: "Marks an achievement where the athlete set a new record." },
//     HOT_STREAK: { title: "On Fire!", description: "Celebrates a series of outstanding performances." },
//     TRUE_STRENGTH: { title: "True Strength", description: "Recognizes an athlete's resilience and perseverance." },
//     FIRST_CHOICE: { title: "First Choice", description: "Highlights an athlete’s selection as a top pick or leader." },
//     MILESTONE: { title: "Major Milestone", description: "Celebrates a significant achievement in the athlete’s journey." },
//     SIGNATURE: { title: "Autographed Edition", description: "Includes the athlete's signature for authenticity." },
//     PERFORMANCE_DATA: { title: "Performance Insights", description: "Adds detailed performance statistics to the card." },
//     EFFECT: { title: "Special Visual Effect", description: "Enhance the card with dynamic visual effects." },
//     CAREER_MOMENT: { title: "Career Milestone", description: "Highlights a defining moment in the athlete’s career." },
//     ARTIST_COLLABORATION: { title: "Artist Collaboration", description: "A unique redesign in collaboration with a featured artist." },
//     PHOTO_UPDATE: { title: "Updated Photo", description: "Refresh the card with the latest athlete portrait." },
//     TEAM_CHANGE: { title: "New Team", description: "Reflects a change in the athlete's team affiliation." },
//     BRAND_COLLABORATION: { title: "Brand Partnership", description: "A special edition featuring a partnered brand." },
//     ARTISTS_REDESIGN: { title: "Artistic Redesign", description: "A fresh artistic take on the card’s design." },
//     EXTERNAL_BRAND_DESIGN: { title: "Exclusive Brand Design", description: "An exclusive design created by an external brand." },
//     REDESIGN_MILESTONE: { title: "Redesign Milestone", description: "Marks a significant redesign or update in the athlete's card series." },
//     GRADUATION_OR_RETIREMENT: { title: "Farewell Tribute", description: "A special edition to honor the athlete's career transition." },
//   };
  
//   return titles[subtype] || { title: "Unknown Enhancement", description: "No description available for this enhancement." };
// };

// function extractPurchasedEnhancements(cards) {
//   return cards.map((card) => {
//     const purchasedEnhancements = [
//       ...(card.minorEnhancementPurchases?.map((_) => _.nftMinorEnhancement ) || []),
//       ...(card.majorEnhancementPurchases?.map((_) => _.nftMajorEnhancement) || []),
//     ].map((enh) => ({
//       ...enh,
//       ...getTitleDescriptions({subtype : enh?.type?.subType}),
//     }));

//     const availablePurchaseEnhancements = (card.nftEntity?.minorEnhancements || [])
//       .concat(card.nftEntity?.majorEnhancements || [])
//       .filter((enh) => !purchasedEnhancements.some((pe) => pe.id === enh.id))
//       .filter((enh) => !enh.expDate || new Date(enh.expDate) > new Date())
//       .map((enh) => ({
//         ...enh,
//         ...getTitleDescriptions({subtype : enh?.type?.subType}),
//       }));

//     return {
//       ...card,
//       availablePurchaseEnhancements,
//       purchasedEnhancements,
//     };
//   });
// }

// async function availableEnhancements(card) {
//   return (card?.minorEnhancements || [])
//     .concat(card?.majorEnhancements || [])
//     .filter((enh) => !enh.expDate || new Date(enh.expDate) > new Date())
//     .map((enh) => ({
//       ...enh,
//       ...getTitleDescriptions({subtype : enh?.type?.subType}),
//     }));
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method !== "GET") {
//       return res.status(400).json({ error: "ONLY GET ALLOWED" });
//     }

//     const { id } = req.query;
//     const session = await getServerSession(req, res, authOptions);

//     if (!session?.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     console.log({id});
    

//     const card = await prisma.nFTEntity.findFirst({
//       where: {
//         athleteId: id as string,
//         membershipTier: { in: ["Bronze", "BRONZE"] },
//         design: "Base",
//       },
//       include: {
//         majorEnhancements: { include: { type: true } },
//         minorEnhancements: { include: { type: true } },
//       },
//     });

//     if (!card) {
//       return res.status(200).json({ card: null, imageDownload: null });
//     }

//     let availableEnhancementsForBaseCard = await availableEnhancements(card);
//     let designerName = card.designer;

//     if (card.designer && isValidObjectId(card.designer)) {
//       const findDesigner = await prisma.user.findFirst({ where: { id: card.designer } });
//       designerName = findDesigner?.name || card.designer;
//     }

//     const b2res = (await getB2TokenForFileDownload()) as B2APIType;

//     const purchasedCards = await prisma.nFTPurchaseCard.findMany({
//       where: { nftEntityId: card.id, currentOwnerId: session.user.id },
//       include: {
//        majorEnhancementPurchases : {
//         include : {
//           nftMajorEnhancement : {
//             include : {
//               type : true
//             }
//           }
//         }
//        },
//        minorEnhancementPurchases : {
//         include : {
//           nftMinorEnhancement : {
//             include : {
//               type : true
//             }
//           }
//         }
//        },
//         nftEntity: {
//           include: {
//             majorEnhancements: { include: { type: true } },
//             minorEnhancements: { include: { type: true } },
//           },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     const mintedCards = await prisma.nFTMintCard.findMany({
//       where: { nftEntityId: card.id, currentOwnerId: session.user.id },
//       include: {
//         majorEnhancementPurchases : {
//           include : {
//             nftMajorEnhancement : {
//               include : {
//                 type : true
//               }
//             }
//           }
//          },
//          minorEnhancementPurchases : {
//           include : {
//             nftMinorEnhancement : {
//               include : {
//                 type : true
//               }
//             }
//           }
//          },
//         nftEntity: {
//           include: {
//             majorEnhancements: { include: { type: true } },
//             minorEnhancements: { include: { type: true } },
//           },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     const allPurchasedCards = [...purchasedCards, ...mintedCards];
//     const purchasedEnhancements = extractPurchasedEnhancements(allPurchasedCards);

//     return res.status(200).json({
//       card: {
//         ...card,
//         availableEnhancements: availableEnhancementsForBaseCard,
//         purchasedCard: purchasedEnhancements,
//         designer: designerName,
//         isAlreadyPurchased: allPurchasedCards.length > 0,
//       },
//       imageDownload: {
//         downloadUrl: b2res.downloadUrl,
//         authorizationToken: b2res.authorizationToken,
//       },
//     });
//   } catch (err) {
//     console.error("Error in enhancement API:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
