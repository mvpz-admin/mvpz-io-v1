// import { NextApiRequest, NextApiResponse } from "next";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";
// import { error } from "console";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "GET") {
//       const { username, role } = req.query;
//       const action = req?.query?.action;
//       const session = await getServerSession(req, res, authOptions);

      
      
//       const result = await prisma.user.findFirst({
//         where: {
//           username: username?.toString(),
//           role : role === "athlete" ? "Athlete" : "User"
//         },
//         include: {
//           socialLinks: true,
//           cards: true,
//         },
//       });

//       if(!result){
//         return res.json({
//           success : false,
//           error : "User Not Found"
//         })
//       }

//       let isFollowing;
//       if (session?.user) {
//         isFollowing = await prisma.userFollower.findFirst({
//           where: {
//             followerId: result.id,
//             followingId: session.user.id,
//           },
//         });
//       }

//       if (!isFollowing && action == "follow") {
//         await prisma.userFollower.create({
//           data: {
//             followerId: result.id,
//             followingId: session.user.id,
//           },
//         });
//       }


//       if(role == "user"){
//         const b2res = (await getB2TokenForFileDownload()) as any;
//         res.status(200).json({
//           success : true,
//           user: {
//             ...result,
//             athleteCard : null,
//             isFollowing: isFollowing ? Boolean(isFollowing) : false,
//             organisation: null,
//           },
//           imageDownload: {
//             downloadUrl: b2res.downloadUrl,
//             authorizationToken: b2res.authorizationToken,
//           },
//         });
//       }

     
      
//       const athleteCard = await prisma.nFTEntity.findFirst({
//         where:{
//           athleteId: result?.id,
//           membershipTier : {
//               in : ["Bronze" , "BRONZE"]
//           },
//           design : "Base"
//         },
//       });

      

//       let result1 = await prisma.organisation.findFirst({
//         where: {
//           shortName: result?.currentSchool,
//         },
//         include: {
//           tribe: {
//             where: {
//               isPrimary: true,
//             },
//           },
//         },
//       });

//       const tipPriceRange = await prisma.athleteTipRage.findFirst()

//       if (result1) {
//         const b2res = (await getB2TokenForFileDownload()) as any;
//         res.status(200).json({
//           success : true,
//           user: {
//             ...result,
//             athleteCard,
//             isFollowing: isFollowing ? Boolean(isFollowing) : false,
//             organisation: result1,
//             tipPriceRange
//           },
//           imageDownload: {
//             downloadUrl: b2res.downloadUrl,
//             authorizationToken: b2res.authorizationToken,
//           },
//         });
//       } else {
//         let result2 = await prisma.organisation.findFirst({
//           where: {
//             name: result?.currentSchool,
//           },
//           include: {
//             tribe: {
//               where: {
//                 isPrimary: true,
//               },
//             },
//           },
//         });

//         const b2res = (await getB2TokenForFileDownload()) as any;

//         res.status(200).json({
//           success : true,
//           user: {
//             ...result,
//             athleteCard,
//             isFollowing: isFollowing ? Boolean(isFollowing) : false,
//             organisation: result2,
//             tipPriceRange
//           },
//           imageDownload: {
//             downloadUrl: b2res.downloadUrl,
//             authorizationToken: b2res.authorizationToken,
//           },
//         });
//       }
//     } else {
//       res.status(400).json({success : false, error: "ONLY GET ALLOWED" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({success : false, error: "Internal server error" });
//   }
// }
