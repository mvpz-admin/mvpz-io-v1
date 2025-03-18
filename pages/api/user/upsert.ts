// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";
// import { sendEmail } from "../../../lib/emailService";

// const emailForAthele = (response) => {
//   let email = `<body style="font-family: 'Arial', sans-serif; margin: 0;padding: 0 ">
//         <div style="max-width: 600px;margin: 40px auto;padding: 20px;text-align: center;border-radius: 8px;box-shadow: 0 4px 8px rgba(255,255,255,0.1);">
//          <ul>
//          <li>Id  : ${response?.id}</li>
//          <li>Name  : ${response?.name}</li>
//          <li>Email  : ${response?.email}</li>
//          <li>Username  : ${response?.username}</li>
//          <li>Current School  : ${response?.currentSchool}</li>
//          <li>Previous School  : ${response?.previousSchool}</li>
//          <li>Primary Sport  : ${response?.primarySport}</li>
//          <li>SecondarySport  : ${response?.secondarySport}</li>
//          <li>Primary Position  : ${response?.primaryPosition}</li>
//          <li>Secondary Position  : ${response?.secondaryPosition}</li>
//          <li>Home Town  : ${response?.homeTown}</li>
//          <li>Remaining Eligibility  : ${response?.remainingEligibility}</li>
//          <li>Favorite College Team : ${response?.favoriteCollegeTeam}</li>
//          <li>Cardano Wallet Available : ${response?.cardanoWalletAvailable}</li>
//          <li>Referral Type : ${response?.referralType}</li>
//          <li>Referred By Id : ${response?.referredById}</li>
//          </ul>
//         </body>`;

//   return email;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "POST") {
//       const userBody = req.body;
      

//       let organisation
//       let isAthlete

//       if(userBody?.role === "Athlete") {
//         const findAthlete = await prisma.user.findFirst({
//           where : {
//             username : userBody?.username
//           }
//         })

//         if(findAthlete){
//           isAthlete = findAthlete
//         }


//         const isOrganisation = await prisma.organisation.findUnique({
//           where: {
//             name: userBody.currentSchool,
//           },
//           include: {
//             tribe: true,
//           },
//         });

//         organisation = isOrganisation
//       }


    


//       const result = await prisma.user.upsert({
//         where: { email: userBody.email },
//         update: {
//           email: userBody.email,
//           name: userBody.name,
//           firstname: userBody.firstname,
//           lastname: userBody.lastname,
//           username: userBody.username,
//           mobile: userBody.mobile,
//           image: userBody.image,
//           bannerImage: userBody.bannerImage,
//           cardImage: userBody.cardImage,
//           aboutMe: userBody.aboutMe,
//           role: userBody.role,
//           sex: userBody.sex,
//           currentSchool: organisation?.name || null,
//           previousSchool: userBody.previousSchool,
//           conference: userBody.conference,
//           primarySport: userBody.primarySport,
//           secondarySport: userBody.secondarySport,
//           primaryPosition: userBody.primaryPosition,
//           secondaryPosition: userBody.secondaryPosition,
//           remainingEligibility: userBody.remainingEligibility || 0,
//           homeTown: userBody.homeTown,
//           cardanoWalletAvailable: userBody.cardanoWalletAvailable,
//           favoriteCollegeTeam: userBody.favoriteCollegeTeam,
//           referralType: userBody.referralType,
//           class : userBody.class,
//           socialLinks: {
//             update: userBody.socialLinks
//               .filter((social) => !!social.id)
//               .map((social) => {
//                 return {
//                   where: { id: social.id },
//                   data: { link: social.link },
//                 };
//               }),
//             create: userBody.socialLinks
//               .filter((social) => !social.id)
//               .map((social) => {
//                 return { socialBrand: social.socialBrand, link: social.link };
//               }),
//           },
//         },
//         create: {
//           email: userBody.email,
//           name: userBody.name,
//           firstname: userBody.firstname,
//           lastname: userBody.lastname,
//           username: userBody.username,
//           mobile: userBody.mobile,
//           image: userBody.image,
//           bannerImage: userBody.bannerImage,
//           cardImage: userBody.cardImage,
//           aboutMe: userBody.aboutMe,
//           role: userBody.role,
//           sex: userBody.sex,
//           currentSchool: userBody.currentSchool,
//           previousSchool: userBody.previousSchool,
//           conference: userBody.conference,
//           primarySport: userBody.primarySport,
//           secondarySport: userBody.secondarySport,
//           primaryPosition: userBody.primaryPosition,
//           secondaryPosition: userBody.secondaryPosition,
//           remainingEligibility: userBody.remainingEligibility || 0,
//           homeTown: userBody.homeTown,
//           cardanoWalletAvailable: userBody.cardanoWalletAvailable,
//           favoriteCollegeTeam: userBody.favoriteCollegeTeam,
//           class : userBody.class,
//         },
//       });

//       if (userBody.referredById) {
//         await prisma.referrals.create({
//           data: {
//             userId: result.id,
//             referredByUserId: userBody.referredById,
//           },
//         });
//       }


//       if(!isAthlete){
//         const account = await stripe.accounts.create({
//           type: "express",
//           country: "US",
//           email : result?.email,
         
//         });

//         let alreadyThere = await prisma.webStripe.findFirst({
//           where: {
//             userId : result?.id,
//           },
//         });

//         let reponse

//         if (!alreadyThere) {
//           reponse =  await prisma.webStripe.create({
//             data: {
//               customerId: account.id,
//               userId: result?.id,
//             },
//           });
//         } else {
//           reponse =  await prisma.webStripe.update({
//             where: {
//               id: alreadyThere.id,
//             },
//             data: {
//               customerId: account.id,
//               userId: result?.id,
//             },
//           });
//         }
//       }



//       if (userBody?.role === "Athlete") {
//         if (organisation?.tribe?.id) {
//           let existingAthlete = await prisma.tribeAthlete.findFirst({
//             where: {
//               userId: result?.id,
//               tribeId: organisation.tribe.id,
//             },
//           });


//           console.log({
//             existingAthlete
//           });


//           if (!existingAthlete) {
//             console.log({
//               inside : existingAthlete
//             });

    
//             let response = await prisma.tribeAthlete.create({
//               data: {
//                 userId: result?.id,
//                 tribeId: organisation.tribe.id,
//               },
//             });

//             if (response) {
//               const existingMember = await prisma.tribeMember.findFirst({
//                 where: {
//                   userId: result?.id,
//                   tribeId: organisation.tribe.id,
//                 },
//               });

//               if (!existingMember) {
//                 await prisma.tribeMember.create({
//                   data: {
//                     userId: result?.id,
//                     tribeId: organisation.tribe.id,
//                   },
//                 });
//               }
//             }
//           }
//         }

        

//         if(!isAthlete){
//           let email = await sendEmail({
//             emailAddress: process.env.EMAIL_SENDER,
//             subject: `${userBody?.name} from ${userBody?.currentSchool} has register now.`,
//             bodyHtml: emailForAthele(result),
//           });
  
//           if (email) {
//             console.log("Email sent");
//           }
//         }
//       }

//       res.status(200).json(result);
//     } else {
//       res.status(400).json({ error: "ONLY POST ALLOWED" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
