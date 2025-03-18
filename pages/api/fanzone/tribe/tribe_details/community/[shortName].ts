// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma"; // Adjust the path to your prisma instance
// import { getServerSession } from "next-auth"; // Assuming you are using next-auth for authentication
// import { authOptions } from "../../../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Ensure the request method is GET
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }
//     const session = await getServerSession(req, res, authOptions);
//     const { shortName } = req.query;

    

//     const userId = session.user.id;

//     const blockedUsers = await prisma.blockedUser.findMany({
//       where: { blockerId : userId },
//       select: { blockedId: true },
//     });
  
//     const blockedUserIds = blockedUsers.map((entry) => entry.blockedId);


//     // Fetch organisation by short name
//     const tribe = await prisma.tribe.findFirst({
//       where: {
//         tribeName: shortName as string,
//       },
//       include: {
//         organisation: {
//           include : {
//             cardColorPallet : true
//           }
//         },
//         socialLinks: true,
//         shouts : {
//           where :{
//             userId : {
//               in: await prisma.user.findMany({
//                 select: { id: true },
//               }).then((users) => users.map((user) => user.id)),
//               notIn : blockedUserIds
//             },
//           },
//           include : {
//             postedBy : {
//               select: {
//                 id: true,
//                 username: true,
//                 image: true,
//                 name : true,
//                 role : true
//               }
//             },
//            _count : {
//             select : {
//               bolts: true,
//               clovers: true,
//               claps :  true,
//               comments : true,
//               shares : true
//             }
//            }

//           },
//           orderBy : {
//             createdAt : "desc"
//           }
//         },
//         post : true,
//         athletes: true,
//       },
//     });


//     // Check if tribe exists
//     if (!tribe) {
//       return res.status(404).json({ error: "Tribe not found" });
//     }

//     const memberCount = await prisma.tribeMember.count({
//         where: {
//           tribeId: tribe.id,
//         },
//       });


//     let isMember = false;

//     // Check if user is authenticated
//     if (session) {
//       const userId = session.user.id; // Adjust based on your session structure

//       // Check if the user is a member of the tribe
//       const membership = await prisma.tribeMember.findFirst({
//         where: {
//           userId: userId,
//           tribeId: tribe.id,
//         },
//       });

//       isMember = !!membership;

//       const [claps, clovers, bolts] = await Promise.all([
//         prisma.tShtClap.findMany({
//           where: {
//             userId,
//             shoutId : { in: tribe.shouts.map((post) => post.id) },
//           },
//         }),
//         prisma.tShtClover.findMany({
//           where: {
//             userId,
//             shoutId: { in: tribe.shouts.map((post) => post.id) },
//           },
//         }),
//         prisma.tShtBolt.findMany({
//           where: {
//             userId,
//             shoutId: { in: tribe.shouts.map((post) => post.id) },
//           },
//         }),
//       ]);

//     }
    

//     // Generate download authorization token
//     const b2res = (await getB2TokenForFileDownload()) as any;

//     return res.status(200).json({
//       tribe : {...tribe,memberCount},
//       isMember,
//       imageDownload: {
//         downloadUrl: b2res.downloadUrl,
//         authorizationToken: b2res.authorizationToken,
//       },
//     });
//   } catch (err) {
//     console.error("Error fetching tribe details:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
