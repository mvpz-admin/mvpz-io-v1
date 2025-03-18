// // import { User } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import { sendEmail } from "../../../lib/emailService";
// import prisma from "../../../lib/prisma";

// import { convertToBase36 } from "../../../lib/utils";
// import { authOptions } from "../auth/[...nextauth]";

// function calculateShare({
//   amount,
//   userSharePercentage,
//   mvpzSharePercentage,
//   stripeCharges,
// }) {
//   let tipAmount = amount;
//   let userShare = (tipAmount * userSharePercentage) / 100;
//   let mvpzShare = (tipAmount * mvpzSharePercentage) / 100;

//   console.log({
//     userSharePercentage,
//     mvpzSharePercentage,
//     userShare,
//     mvpzShare,
//   });

//   if (amount < 5) {
//     let userShare: any = Number(tipAmount - stripeCharges).toFixed(2);

//     console.log("<5", {
//       mvpzShare: 0,
//       userShare,
//       userRound: Math.round(userShare),
//     });

//     return {
//       mvpzShare: 0,
//       userShare: Number(tipAmount - stripeCharges).toFixed(2),
//     };
//   }

//   let rMvpzShare: any = Number(mvpzShare - stripeCharges).toFixed(2);

//   console.log("> 5", {
//     mvpzShare: rMvpzShare,
//     mvpzRound: Math.round(rMvpzShare),
//     userShare: userShare,
//   });

//   return {
//     mvpzShare: Number(mvpzShare - stripeCharges).toFixed(2),
//     userShare: userShare,
//   };
// }

// function html(params: { url: string; paymentId: string; name: string }) {
//   const { url, paymentId, name } = params;

//   return `<body style="font-family: 'Arial', sans-serif; background-color: #1a1a1a; color: #ffffff; margin: 0; padding: 0;">
//   <div style="max-width: 600px; height: 800px; margin: 40px auto; background: #000000; text-align: center; border-radius: 8px; box-shadow: 0 4px 8px rgba(255,255,255,0.1);">
//     <div style="margin-bottom: 30px;">
//       <img src="https://f005.backblazeb2.com/file/mvpz-other-assest/main-bg.png" alt="MVPz Logo" style="width: 100%; height: 200px; object-fit: cover;">
//     </div>
//     <div style="width: 100%; padding-bottom: 20px;">
//       <div style="margin-bottom: 20px; width: 500px; margin: 0px auto; text-align: center;">
  
//         <p style="color: #ffffff;">
//        Dear ${name},<br/> we sincerely apologize for the inconvenience. Your payment ID is ${paymentId}. Due to a system error, your card couldn't be revealed immediately. Rest assured, we have logged your issue, and you will receive your card within 1-2 business days. <br/> Thank you for your understanding and patience!
//         </p>
//         <a href="${url}" style="display: inline-block; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; background-color: #854df2; padding: 12px 20px; border-radius: 6px; margin-bottom: 30px; margin: 20px 0;">My Collections</a>
//       </div>
//       <p style="font-size: 16px; color: #ffffff; margin-bottom: 20px; line-height: 20px;">
//         Need assistance? Contact us at<br>
//         <a href="mailto:team@mvpz.io" style="color: #007bff; text-decoration: none;">team@mvpz.io</a>.
//       </p>
//       <hr style="border: 0; height: 1px; background-color: #e9ecef; margin: 20px auto; opacity: 0.2; width: 500px;">
//       <p style="font-size: 14px; color: #495057; width:500px; margin:0 auto">
//         <strong style"padding-bottom:20px">Why MVPz?</strong><br>
//         MVPz is a platform designed to help athletes like you monetize your fanbase, build a community, and grow your influence. We're here to empower you every step of the way.
//       </p>
// <!--       <p style="font-size: 14px; color: #6c757d; margin-top: 30px;">MVPz</p> -->
//       <img src="https://mvpz-src-public.s3.us-east-005.backblazeb2.com/images/mvpz-transparent-logo.png" alt="MVPz Logo"  style="object-fit:contain;width:50px;height:50px ;margin-top: 20px;margin-bottom:0">
//       <p style="font-size: 12px; color: #adb5bd; ">Built in the USA</p>
//       <p style="font-size: 12px; color: #adb5bd; ;">
//         If you did not request this email, please ignore it or contact our support team.
//       </p>
// <!--       <div style="margin-bottom: 20px; width: 575px; margin: 0px auto; text-align: center;">
//         <p style="margin: 0;">MVPz</p>
//         <p style="margin: 0;">Built in USA</p>
//       </div> -->
//     </div>
//   </div>
// </body>
// `;
// }

// const calculateShareAmount = (amount, percentage) =>
//   parseFloat(((amount * percentage) / 100).toFixed(2));

// const handleCreatePayout = async (nftPurchaseCard,user) => {
//   try {
//     // let nftPurchaseCard = await prisma.nFTPurchaseCard.findFirst();

//     const fetchProd = await prisma.product.findFirst({
//       where: { id: nftPurchaseCard.productId },
//     });

//     const fetchNft = await prisma.nFTEntity.findFirst({
//       where: { id: nftPurchaseCard.nftEntityId },
//       include: {
//         athlete: true,
//       },
//     });


//     let cardInfo = {
//       ...nftPurchaseCard,
//       prodType: fetchProd?.type,
//       prodPackQty: fetchProd?.packQuantity || 1,
//       mintAthleteShare:
//         fetchNft.type === "Athlete" ? fetchNft.mintAthleteShare : 0,
//       mintMvpShare : fetchNft.mintMvpzShare
//     };

//     let afterQtyCal = cardInfo.prodPackQty
//       ? cardInfo.purchasePrice / cardInfo.prodPackQty
//       : cardInfo.purchasePrice;

//     // get stripe charges whatever set in mvpz db
//     let stripeCharges = await prisma.stripeCharges.findFirst();

//     let stripeChargesCal: any =
//       (afterQtyCal * stripeCharges.transactionCharge) / 100 +
//       stripeCharges.paymentSuccessCharge;

//     afterQtyCal -= stripeChargesCal;

//     const athleteShare = calculateShareAmount(
//       afterQtyCal,
//       cardInfo.mintAthleteShare
//     );

//     // finding stripe accound if of user who got tip from webstripe collection
//     const getWebstribeId =  fetchNft.athleteId ? await prisma.webStripe.findFirst({
//       where: {
//         userId: fetchNft.athleteId,
//       },
//     }) : null

//     // get account info if account id available
//     let account = getWebstribeId
//       ? await stripe.accounts.retrieve(getWebstribeId.customerId)
//       : null;

//     // get withdraw type
//     let withdrawType = await prisma.earningWithdrawAccess.findFirst();

//     console.log({
//       withdrawType,
//     });

//     console.log({
//       stripeCharges,
//     });

//     let mvpzEarn : any = calculateShareAmount(
//       afterQtyCal,
//       cardInfo.mintMvpShare
//     );

//     console.log({
//       mvpShare : cardInfo.mintMvpShare,
//       athleteShare : cardInfo.mintAthleteShare,
//       purchasePrice : cardInfo.prodPackQty
//       ? cardInfo.purchasePrice / cardInfo.prodPackQty
//       : cardInfo.purchasePrice,
//       stripeCharges : stripeChargesCal,
//       totalAmoutAFtCal : afterQtyCal,
//       athleteEarn : athleteShare,
//       mvpzEarn
//     });
    


//     let stripePayout = await prisma.stripePayout.create({
//       data: {
//         amount: athleteShare,
//         metadata: JSON.stringify({
//           collection: "Purchase",
//           payoutId: cardInfo?.id,
//         }),
//         type: "card",
//         fromUserId: null,
//         payoutUserId: fetchNft.athlete.id,
//       },
//     });

//     await prisma.mvpzEarnings.create({
//       data: {
//         earnedAmount: mvpzEarn,
//         stripeCharges: stripeChargesCal,
//         type: "card",
//         stripePayoutId: stripePayout?.id,
//       },
//     });

//     const getXPFactor = await prisma.xPFactor.findFirst({
//       where:
//         fetchNft.type === "Athlete"
//           ? {
//               type: fetchNft.type,
//               membershipTier: fetchNft.membershipTier,
//             }
//           : {
//               type: fetchNft.type,
//             },
//     });

//     const getUserXp = await prisma.user.findFirst({
//       where : {
//         id : user?.id
//       },
//       select : {
//         xp : true
//       }
//     })

//     await prisma.user.update({
//       where : {
//         id : user?.id,
//       },
//       data : {
//         xp : (getUserXp.xp || 0) + getXPFactor.factorValue
//       }
//     })

//     // instan transfer if account os payout_enabled & withdraw type is instant
//     if (withdrawType.type == "instant") {
//       if (account?.payouts_enabled) {
//         //transfer money
//         const payout = await stripe.transfers.create({
//           amount: stripePayout.amount * 100,
//           currency: "usd",
//           destination: account.id,
//         });

//         //transfer money
//         if (payout) {
//           await prisma.stripePayout.update({
//             where: {
//               id: stripePayout.id,
//             },
//             data: {
//               isWithdraw: true,
//             },
//           });
//         }

//         await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `$${stripePayout.amount} has claim successfully!`,
//             message: `We have transfer $${stripePayout.amount} to your stripe account successfully!`,
//             userId: fetchNft.athleteId,
//           },
//         });
//       } else {
//         await prisma.notification.create({
//           data: {
//             type: "GENERAL",
//             title: `You Earn $${stripePayout.amount} from card!`,
//             message: `To claim your money, Click, Here to connect your stripe account.`,
//             userId: fetchNft.athleteId,
//             url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
//           },
//         });
//       }
//     }
//   } catch (error) {
//     console.log({ error });

//     return await prisma.logError.create({
//       data: {
//         apiName: "/api/purchase/assignCards",
//         collection: "stripePayout",
//         errorLog: `${error}`,
//         title: "Error While creating stripe payout in assign card",
//         developerRefDescription: "stripe pay out not created",
//       },
//     });
//   }
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user)
//       return res
//         .status(403)
//         .json({ status: "fail", message: "user not authenticated" });
//     const { paymentId } = req.query;
//     console.log({
//       step: 0,
//       paymentId,
//     });
//     const paymentAttempt = await prisma.paymentAttempt.findUnique({
//       where: {
//         id: paymentId.toString(),
//         userId: session.user.id,
//       },
//     });
//     console.log({
//       step: 1,
//       paymentAttempt,
//     });
//     if (paymentAttempt.paymentStatus === "MINTED")
//       return res.status(200).json({ message: "payment already processed" });
//     if (!paymentAttempt)
//       return res
//         .status(404)
//         .json({ status: "fail", message: "payment not found" });
//     await processOrder(res, paymentAttempt, session.user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

// export async function processOrder(res, paymentAttempt, user) {
//   console.log({
//     step: 3,
//     paymentAttempt,
//     user,
//   });
 
//   const result: any =
//     paymentAttempt.bundleType === "apparel"
//       ? await createApparelOrder(user, paymentAttempt)
//       : await assignGenOneCards(user, paymentAttempt);

//   await prisma.paymentAttempt.update({
//     where: {
//       id: paymentAttempt.id,
//     },
//     data: {
//       mintedAt: new Date(),
//       paymentStatus: "MINTED",
//     },
//   });

//   if (result.status === "SUCCESS") {
//     if (result.assignedCards?.length == 0) {
//       await prisma.productReport.create({
//         data: {
//           paymentId: paymentAttempt?.id,
//           userId: user?.id,
//         },
//       });

//       let repo = await sendEmail({
//         emailAddress: user?.email,
//         subject: "Payment Confirmed: We’re Resolving Your Card Issue",
//         bodyHtml: html({
//           name: user?.name,
//           paymentId: paymentAttempt?.id,
//           url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/myCards`,
//         }),
//       });

//       console.log({
//         repo,
//       });

//       return res.status(200).json({
//         status: "success",
//         ...(paymentAttempt.bundleType === "apparel" && { order: result.order }),
//         ...(paymentAttempt.bundleType !== "apparel" && {
//           cards: [],
//         }),
//         bundleType: paymentAttempt.bundleType,
//         packQuantity: paymentAttempt.packQuantity,
//         imageDownload: {},
//       });
//     }

//     const b2res = (await getB2TokenForFileDownload()) as any;
//     return res.status(200).json({
//       status: "success",
//       ...(paymentAttempt.bundleType === "apparel" && { order: result.order }),
//       ...(paymentAttempt.bundleType !== "apparel" && {
//         cards: result.assignedCards,
//       }),
//       bundleType: paymentAttempt.bundleType,
//       packQuantity: paymentAttempt.packQuantity,
//       imageDownload: {
//         downloadUrl: b2res.downloadUrl,
//         authorizationToken: b2res.authorizationToken,
//       },
//     });
//   } else {
//     return res.status(200).json({ status: "failed", message: result.error });
//   }
// }

// function assignKstateCards(user, paymentAttempt) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (
//         paymentAttempt.bundleType === "kstate_athlete" &&
//         !!paymentAttempt.entityId
//       ) {
//         const entity = await prisma.nFTEntity.findUnique({
//           where: {
//             id: paymentAttempt.entityId,
//           },
//         });
//         if (!entity) return { error: "entity not found" };
//         const purchaseCard = await prisma.nFTPurchaseCard.findFirst({
//           where: {
//             nftEntityId: entity.id,
//             status: "UNASSIGNED",
//           },
//         });
//         if (!purchaseCard) return { error: "purchase card not available" };
//         let pp = await prisma.nFTPurchaseCard.update({
//           where: {
//             id: purchaseCard.id,
//           },
//           data: {
//             purchaseDatetime: new Date(),
//             purchasePrice: paymentAttempt.totalPrice,
//             cardIssueType: paymentAttempt.cardIssueType,
//             bundleType: paymentAttempt.bundleType,
//             currentOwner: {
//               connect: { id: user.id },
//             },
//             status: "ASSIGNED",
//           },
//         });

//         resolve({
//           status: "SUCCESS",
//           assignedCards: [{ ...purchaseCard, nftEntity: entity }],
//         });
//       } else if (paymentAttempt.bundleType === "kstate_collection") {
//         const entities = await prisma.nFTEntity.findMany({
//           where: {
//             projectId: "65fc83b8fa035dc95cf4be12",
//             design: "Base",
//           },
//         });
//         let assignedCards = [];
//         for (let entity of entities) {
//           const purchaseCard = await prisma.nFTPurchaseCard.findFirst({
//             where: {
//               nftEntityId: entity.id,
//               status: "UNASSIGNED",
//             },
//           });
//           if (!purchaseCard) continue;
//           let updatedPurcahseCard = await prisma.nFTPurchaseCard.update({
//             where: {
//               id: purchaseCard.id,
//             },
//             data: {
//               purchaseDatetime: new Date(),
//               purchasePrice: paymentAttempt.totalPrice,
//               cardIssueType: paymentAttempt.cardIssueType,
//               bundleType: paymentAttempt.bundleType,
//               currentOwner: {
//                 connect: { id: user.id },
//               },
//               status: "ASSIGNED",
//             },
//           });
//           await handleCreatePayout(updatedPurcahseCard,user);
//           assignedCards.push({ ...purchaseCard, nftEntity: entity });
//         }
//         resolve({ status: "SUCCESS", assignedCards });
//       } else if (paymentAttempt.bundleType === "kstate_packs") {
//         const entities = await prisma.nFTEntity.findMany({
//           where: {
//             projectId: "65fc83b8fa035dc95cf4be12",
//             design: "Base",
//           },
//         });
//         let assignedCards = [];
//         for (let entity of randomKstate(
//           paymentAttempt.packQuantity,
//           entities
//         )) {
//           const purchaseCard = await prisma.nFTPurchaseCard.findFirst({
//             where: {
//               nftEntityId: entity.id,
//               status: "UNASSIGNED",
//             },
//           });
//           if (!purchaseCard) continue;
//           assignedCards.push({ ...purchaseCard, nftEntity: entity });
//           let updatedPurcahseCard = await prisma.nFTPurchaseCard.update({
//             where: {
//               id: purchaseCard.id,
//             },
//             data: {
//               purchaseDatetime: new Date(),
//               purchasePrice: paymentAttempt.totalPrice,
//               cardIssueType: paymentAttempt.cardIssueType,
//               bundleType: paymentAttempt.bundleType,
//               currentOwner: {
//                 connect: { id: user.id },
//               },
//               status: "ASSIGNED",
//             },
//           });
//           await handleCreatePayout(updatedPurcahseCard,user);
//         }
//         resolve({ status: "SUCCESS", assignedCards });
//       }
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

// function assignGenOneCards(user, paymentAttempt) {
//   console.log({
//     step: 4,
//     paymentAttempt,
//     user,
//   });

//   return new Promise(async (resolve, reject) => {
//     try {
//       const product = await prisma.product.findUnique({
//         where: {
//           id: paymentAttempt.productId,
//         },
//       });

//       console.log({
//         step: 5,
//         product,
//       });

//       const entities = await prisma.nFTEntity.findMany({
//         where: {
//           projectId: {
//             not: "65fc83b8fa035dc95cf4be12",
//           },
//         },
//       });

//       console.log({
//         step: 6,
//         entities,
//       });

//       if (
//         paymentAttempt.bundleType === "single" ||
//         paymentAttempt.bundleType === "athlete"
//       ) {
//         // Logic to assign one random card
//         const ent = paymentAttempt.entityId
//           ? await prisma.nFTEntity.findUnique({
//               where: {
//                 id: paymentAttempt.entityId,
//               },
//             })
//           : null;

//         console.log({
//           step: 7,
//           ent,
//         });

//         let singleCards = [];
//         for (let i = 0; i < paymentAttempt.quantity; i++) {
//           const entity = randomSingleCard(
//             1,
//             entities,
//             paymentAttempt.bundleType,
//             ent?.athleteId
//           );

//           if (!entity) continue;
//           console.log({
//             step: 8,
//             entity,
//           });

//           const purchaseCard = await prisma.nFTPurchaseCard.findFirst({
//             where: {
//               nftEntityId: entity.id,
//               status: "UNASSIGNED",
//             },
//           });

//           if (!purchaseCard) continue;
//           singleCards.push({ ...purchaseCard, nftEntity: entity });
//           let updatedPurcahseCard = await prisma.nFTPurchaseCard.update({
//             where: {
//               id: purchaseCard.id,
//             },
//             data: {
//               purchaseDatetime: new Date(),
//               purchasePrice: paymentAttempt.totalPrice,
//               cardIssueType: paymentAttempt.cardIssueType,
//               bundleType: paymentAttempt.bundleType,
//               currentOwner: {
//                 connect: { id: user.id },
//               },
//               status: "ASSIGNED",
//               productId: paymentAttempt.productId,
//             },
//           });

//           await handleCreatePayout(updatedPurcahseCard,user);

//           console.log({
//             step: 10,
//             updatedPurcahseCard,
//           });
//         }

//         resolve({ status: "SUCCESS", assignedCards: singleCards });
//       } else if (paymentAttempt.bundleType === "packs") {
//         let assignedCards = [];
//         for (let i = 0; i < paymentAttempt.quantity; i++) {
//           for (let entity of randomCards(
//             paymentAttempt.packQuantity,
//             entities,
//             product?.minAthletes
//           )) {
//             const purchaseCard = await prisma.nFTPurchaseCard.findFirst({
//               where: {
//                 nftEntityId: entity.id,
//                 status: "UNASSIGNED",
//               },
//             });
//             if (!purchaseCard) continue;
//             assignedCards.push({ ...purchaseCard, nftEntity: entity });
//             let updatedPurcahseCard = await prisma.nFTPurchaseCard.update({
//               where: {
//                 id: purchaseCard.id,
//               },
//               data: {
//                 purchaseDatetime: new Date(),
//                 purchasePrice: paymentAttempt.totalPrice,
//                 cardIssueType: paymentAttempt.cardIssueType,
//                 bundleType: paymentAttempt.bundleType,
//                 currentOwner: {
//                   connect: { id: user.id },
//                 },
//                 status: "ASSIGNED",
//                 productId: paymentAttempt.productId,
//               },
//             });

//             await handleCreatePayout(updatedPurcahseCard,user);
//           }
//         }
//         resolve({ status: "SUCCESS", assignedCards });
//       } else {
//         resolve({ status: "FAILED", error: "Bundle type is not valid" });
//       }
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

// function getRandomArbitrary(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min;
// }

// function randomKstate(count, entities) {
//   let result = [];
//   while (result.length < count) {
//     const index = getRandomArbitrary(0, entities.length);
//     result = [...result, ...entities.splice(index, 1)];
//   }
//   return result;
// }

// function randomSingleCard(count, entities, type = null, athleteId = null) {
//   console.log("radomAthlCard",{
//     type ,
//     athleteId,
//     round1 : type === "athlete",
//     round2 : !!athleteId,
//     round3 : entities.filter(
//       (e) =>
//         e.type === "Athlete" &&
//     e.athleteId === athleteId &&
//     e.membershipTier?.toLowerCase() === "bronze"
//     )
//   });
  
//   const filteredEntities =
//     type === "athlete"
//       ? athleteId
//         ? entities.filter(
//             (e) =>
//               e.type === "Athlete" &&
//               e.athleteId === athleteId &&
//               e.membershipTier?.toLowerCase() === "bronze" &&
//               e.design?.toLowerCase() === "base"
//           )
//         : entities.filter((e) => e.type === "Athlete")
//       : entities;

//   console.log({
//     filteredEntities,
//   });

//   const index = getRandomArbitrary(0, filteredEntities.length);
//   return filteredEntities[index];
// }

// function randomCards(count, entities, minAthletes) {
//   let result = [];
//   const athleteEntities = entities.filter((e) => e.type === "Athlete");
//   const nonAthleteEntities = entities.filter((e) => e.type !== "Athlete");
//   while (result.length < minAthletes) {
//     const index = getRandomArbitrary(0, athleteEntities.length);
//     result = [...result, ...athleteEntities.splice(index, 1)];
//   }
//   while (result.length < count) {
//     const index = getRandomArbitrary(0, nonAthleteEntities.length);
//     result = [...result, ...nonAthleteEntities.splice(index, 1)];
//   }
//   return result;
// }

// async function createApparelOrder(user: any, paymentAttempt) {
//   try {
//     // fetch the order
//     const order: any = await prisma.apparelOrder.findFirst({
//       where: {
//         paymentAttemptId: paymentAttempt.id,
//         status: "CREATED",
//       },
//       include: {
//         product: true,
//         variant: true,
//       },
//     });
//     if (!order) throw new Error("Could not find order with given payment id");
//     // Generate serial number for order
//     let serialNumber = order.product.productCode + order.variant.variantCode;
//     if (order.variantId && order.variant) {
//       const variantSize = await prisma.productVariantSize.findFirst({
//         where: {
//           variantId: order.variantId,
//           size: order.size,
//         },
//       });
//       if (variantSize) {
//         const base36String = convertToBase36(variantSize.currentIndex);
//         // serialNumber += variantSize.sizeCode + base36String
//         await prisma.productVariantSize.update({
//           where: {
//             id: variantSize.id,
//           },
//           data: {
//             availabilityCount: variantSize.availabilityCount - 1,
//             currentIndex: variantSize.currentIndex + 1,
//           },
//         });
//       }
//     }
//     await prisma.apparelOrder.update({
//       where: {
//         id: order.id,
//       },
//       data: {
//         status: "ORDERED",
//         serialNumber: "",
//       },
//     });
//     // Check for referrals
//     if (order.productReferralCode) {
//       const invite = await prisma.referralInvite.findFirst({
//         where: {
//           inviteCode: order.productReferralCode,
//         },
//       });
//       if (invite) {
//         await prisma.referrals.create({
//           data: {
//             userId: user.id,
//             referredByUserId: invite.referredByUserId,
//             referralInviteId: invite.id,
//           },
//         });
//       }
//     }
//     // Send an email to the user
//     const body = `<body style="font-family: 'Arial', sans-serif; background-color: #000000;color: #ffffff;margin: 0;padding: 0 ">
//         <div style="max-width: 600px;margin: 40px auto;background: #1a1a1a;padding: 20px;text-align: center;border-radius: 8px;box-shadow: 0 4px 8px rgba(255,255,255,0.1);">
//             <div style="margin-bottom: 30px;">
//                 <img src="https://mvpz-src-public.s3.us-east-005.backblazeb2.com/images/mvpz-transparent-logo.png" alt="MVPz Logo" width="150" height="150">
//             </div>
//             <div style="color: #ffffff; margin-bottom: 20px;text-align: left;">
//                 <p>Dear ${user.firstname || user.name},</p>
//                 <p>
//                     Thank you for shopping with MVPz! We're thrilled to have you as a part of the MVPz community. 
//                     Your order for ${
//                       order.product.name
//                     } has been successfully placed, and we're working on getting it ready for you.
//                 </p>
//                 <p>*Order Details:*</p>
//                 <ul>
//                     <li>*Order Number:* ${order.orderNumber}</li>
//                     <li>*Product:* ${order.product.name}</li>
//                     <li>*Color:* ${order.variant.variantName}</li>
//                     <li>*Size:* ${order.size}</li>
//                     <li>*Serial Number:* ${serialNumber}</li>
//                     <li>*Unit Cost:* $${order.product.cost}</li>
//                     <li>*Quantity:* ${order.quantity}</li>
//                     <li>*Product Cost:* $${paymentAttempt.totalPrice}</li>
//                     <li>*Shipping Cost:* $${order.shippingCost / 100}</li>
//                     <li>*Total Cost:* $${
//                       paymentAttempt.totalPrice + order.shippingCost / 100
//                     }</li>
//                 </ul>
//                 <p>
//                     Please check the Order History to check when your order has shipped. In the meantime, if you have any questions, 
//                     please feel free to reach out to our customer support team 
//                     at <a href="mailTo:team@mvpz.io">team@mvpz.io</a> or visit our <a href="https://mvpz.my.canva.site/faqs" target="_blank">FAQ</a> page.
//                 </p>
//                 <p>
//                     Thank you for being an MVPz fan. We hope you enjoy your ${
//                       order.product.name
//                     }!
//                 </p>
//                 <p>
//                     Best regards,
//                 </p>
//                 <p>
//                     The MVPz Team
//                 </p>
//             </div>
//             <div>
//                 <p style="margin: 0;">MVPz</p>
//                 <p style="margin: 0;">Built in USA</p>
//             </div>
//         </div>
//     </body>`;
//     const subject = `${
//       process.env.ENVIRONMENT === "dev" ? "DEV: " : ""
//     }New MVPz Apparel Order Confirmation!`;
//     sendEmail({ emailAddress: user.email, subject, bodyHtml: body });
//     sendEmail({
//       emailAddress: "mvpz.vendor@gmail.com",
//       subject,
//       bodyHtml: body,
//     });
//     sendEmail({ emailAddress: "team@mvpz.io", subject, bodyHtml: body });
//     return { status: "SUCCESS", order };
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create order");
//   }
// }
