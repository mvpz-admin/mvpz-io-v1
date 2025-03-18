// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../lib/backBlaze";
// import { sendEmail } from "../../../../lib/emailService";

// const TicketTampleteHTML = ({
//   name,
//   ticketType,
//   eventName,
//   eventDate,
//   eventLocation,
//   xpEarn
// }) => {
//   return `<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f9f9f9; margin: 0; padding: 20px;">
//   <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;">
//     <h1 style="color: #4CAF50; text-align: center;">🎉 Congratulations! You've Won a Ticket! 🎟️</h1>
//     <div style="padding: 20px;">
//       <p>Hi ${name},</p>
//       <p>Great news! You’ve just won a <strong>${ticketType}</strong> for <strong>${eventName}</strong>. This is an exciting moment, and we’re thrilled to see you enjoy this reward.</p>
//       <ul>
//         <li><strong>Ticket Type</strong>: ${ticketType} (Entry Pass / Normal Ticket Match / VIP Ticket Match / Concert Ticket)</li>
//         <li><strong>Event Name</strong>: ${eventName}</li>
//         <li><strong>Event Date</strong>: ${new Date(eventDate).toDateString()}</li>
//         <li><strong>Location</strong>: ${eventLocation}</li>
//       </ul>
//       <p><strong>XP Earned</strong>: ${xpEarn} XP</p>
//       <p>Your ticket is ready, and we'll send it to you shortly. Make sure to keep an eye on your inbox for more updates.</p>
//       <p>We hope you enjoy the event!</p>
//       <a href="https://mvpz.io" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Access Your Ticket</a>
//     </div>
//     <p>Best regards, <br> Mvpz.io Team</p>
//   </div>
// </body>`
// }

// const PhysicalCardHTML = ({
// name,
// title,
// description,
// }) => {
//   return `
//   <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f9f9f9; margin: 0; padding: 20px;">
//   <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;">
//     <h1 style="color: #ff9800; text-align: center;">🏆 You've Won a Physical Collectible! 🎁</h1>
//     <div style="padding: 20px;">
//       <p>Hi ${name},</p>
//       <p>Congratulations! You’ve won a limited edition <strong>${title}</strong>. This is a rare and special item that will be shipped to you soon.</p>
//       <ul>
//         <li><strong>Collectible Name</strong>: ${title}</li>
//         <li><strong>Shipment Tracking</strong>: x83hdnkxxx</li>
//         <li><strong>Estimated Arrival</strong>: 1 June, 2025</li>
//       </ul>
//       <p>${description}</p>
//       <p>We’re thrilled for you, and we hope you enjoy your collectible!</p>
//       <a href="https://mvpz.io" style="background-color: #ff9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">Track Your Shipment</a>
//     </div>
//     <p>Best regards, <br> Mvpz.io Team </p>
//   </div>
// </body>
// `
// }

// const DigitalCardHTML = ({
//   name,
//   title,
// }) => {
//   return `<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f9f9f9; margin: 0; padding: 20px;">
//   <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;">
//     <h1 style="color: #2196F3; text-align: center;">🎉 You've Won a Digital Collectible! 🏅</h1>
//     <div style="padding: 20px;">
//       <p>Hi ${name},</p>
//       <p>Exciting news! You’ve won a special digital collectible: <strong>[Digital Card Name]</strong>. This collectible is now available in your account.</p>
//       <ul>
//         <li><strong>Collectible Name</strong> ${title} (XYZ Card / Team Card)</li>
//         <li><strong>Date Won</strong>:  1 June, 2025</li>
//       </ul>
//       <p>Claim and view your digital collectible in your account now!</p>
//       <a href="https://mvz.io" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">View Your Digital Card</a>
//     </div>
//     <p>Best regards, <br>  Mvpz.io Team</p>
//   </div>
// </body>`
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getServerSession(req, res, authOptions);

//   if (req.method !== "POST") {
//     return res.status(400).json({ error: "ONLY GET ALLOWED" });
//   }

//   try {
//     if (!session?.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { challengeId, cardList } = await req.body;

//     const tribeChallenege = await prisma.tribeChallenges.findFirst({
//       where: { id: challengeId },
//     });


//     let totalXp = 0;
    

    
    


    

//     const response = await prisma.userChallenge.create({
//       data: {
//         challengeId,
//         challengeCompleted: true,
//         xpEarn: totalXp * tribeChallenege.perkXP,
//         userId: session?.user?.id,
//       },
//       include: {
//         challenge : {
//           include : {
//             collectable : {
//             include : {
//               perkDigitalCollectables : true,
//               perkPhysicalCollectables : true
//           }
//            },
//            ticket : true
//           }
//         }
//       },
//     });

//     const userCards = await Promise.all(
//       cardList.map(async (card) => {
//         totalXp += card?.selectedCard?.xp;
    
//         console.log({ card });
    
//         const getNftPurchaseCard = await prisma.nFTPurchaseCard.findFirst({
//           where: {
//             id: card?.selectedCard?.id,
//           },
//         });
    
//         console.log({
//           cardId: card?.selectedCard?.id,
//           getNftPurchaseCard,
//         });
    
//         const getNftMintCard = await prisma.nFTMintCard.findFirst({
//           where: {
//             id: card?.selectedCard?.id,
//           },
//         });
    
//         console.log({
//           cardId: card?.selectedCard?.id,
//           getNftMintCard,
//         });
    

//         if(!!getNftPurchaseCard){
//           await prisma.userChallengeCard.create({
//             data : {
//               nftPurchaseCardId : getNftPurchaseCard.id,
//               userChallengeId : response.id
//             }
//           })
//         }

//         if(!!getNftMintCard){
//           await prisma.userChallengeCard.create({
//             data : {
//               nftPurchaseCardId : getNftMintCard.id,
//               userChallengeId : response.id
//             }
//           })
//         }
        
//       })
//     );


//     const getTicketName = (ticketType) => {
//       switch (ticketType) {
//         case "EntryPass":
//           return "Entry Pass";
//         case "NMatchTicket":
//           return "Normal Match Ticket";
//         case "VMatchTicket":
//           return "Vip Match Ticket";
//         case "ConcertTicket":
//           return "Concert Ticket";
//       }
//     };


//     console.log("pp",response.challenge.perkType);
    
//     if(response.challenge.perkType == "COLLECTABLE"){
//       if(response.challenge.collectable[0].collectableType == "DIGITAL"){
//         let ep =  await sendEmail({
//           emailAddress: session?.user?.email,
//           subject: `🔥 You Just Won a ${response.challenge.collectable[0].perkDigitalCollectables[0].title}! Check It Out!`,
//           bodyHtml: DigitalCardHTML({
//             name : session?.user?.name,
//             title : response.challenge.collectable[0].perkDigitalCollectables[0].title
//           }),
//         });
//         console.log({ep});
//       }else{
//       let ep =   await sendEmail({
//           emailAddress: session?.user?.email,
//           subject: `🏆 Congratulations! Your ${response.challenge.collectable[0].perkPhysicalCollectables[0].title} is on the Way!`,
//           bodyHtml: PhysicalCardHTML({
//             name : session?.user?.name,
//             title : response.challenge.collectable[0].perkPhysicalCollectables[0].title,
//             description : response.challenge.collectable[0].perkPhysicalCollectables[0].description
//           }),
//         });

//         console.log({ep});
        
//       }
//     }else{
//       let ep = await sendEmail({
//         emailAddress:session?.user?.email,
//         subject: `🎉 You Won a ${getTicketName(response.challenge.ticket[0].ticketType)} to ${response.challenge.ticket[0].eventTitle}! Claim It Now!`,
//         bodyHtml: TicketTampleteHTML({
//           name : session?.user?.name,
//           ticketType :  getTicketName(response.challenge.ticket[0].ticketType),
//           eventDate :response.challenge.ticket[0].eventDate,
//           eventLocation : response.challenge.ticket[0].eventLocation,
//           eventName : response.challenge.ticket[0].eventTitle,
//           xpEarn : totalXp * tribeChallenege.perkXP
//         }),
//       });

//       console.log({ep});
      
//     }


//     let user = await prisma.user.findFirst({
//       where: { id: session?.user?.id },
//     });

//     await prisma.user?.update({
//       where: {
//         id: session?.user?.id,
//       },
//       data: {
//         xp: user?.xp + totalXp * tribeChallenege.perkXP,
//       },
//     });

//     return res.status(200).json({
//       success: true,
//       data: {
//         redirectURI: `/mvpz-challenges/perk/${response?.id}`,
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
//     return res
//       .status(500)
//       .json({ success: false, error: "Internal server error" });
//   }
// }
