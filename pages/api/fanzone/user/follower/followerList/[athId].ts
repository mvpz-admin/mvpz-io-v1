// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma"; 
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "GET") {
//       const session = await getServerSession(req, res, authOptions);
//       if (!session) return res.status(401).json({ error: "Unauthorized" });

//       const { athId } = req.query;

//       // Fetch the list of users who are following the specified user
//       const followersList = await prisma.userFollower.findMany({
//         where: {
//           followerId: athId as string,
//         },
//         select: {
//           follower: {
//             select: {
//               id: true,
//               username: true,
//               name: true,
//               image: true,
//               role: true,
//             },
//           },
//         },
//       });

//       // Format the response to include only follower user details
//       const formattedFollowersList = followersList.map((f) => f.follower);
//       const b2res = await getB2TokenForFileDownload() as any;

//       res.status(200).json({
//         followers: formattedFollowersList,
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     } else {
//       res.status(400).json({ error: "ONLY GET ALLOWED" });
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
