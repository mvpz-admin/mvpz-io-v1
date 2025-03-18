// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import getB2TokenForFileDownload from "../../../../lib/backBlaze";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { username } = req.query;

//   const session = await getServerSession(req, res, authOptions);
//   if (!username || typeof username !== "string") {
//     return res
//       .status(400)
//       .json({ error: "Username is required and must be a string" });
//   }

//   try {
//     const user = await prisma.user.findFirst({
//       where: { username },
//       include: {
//         socialLinks: true,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     let isFollowing;
//     if (session?.user) {
//       isFollowing = await prisma.userFollower.findFirst({
//         where: {
//           followerId: user.id,
//           followingId: session.user.id,
//         },
//       });
//     }

//     let cards: any = await prisma.nFTEntity.findMany({
//       where: {
//         athleteId: user?.id,
//         membershipTier: "Bronze",
//       },
//     });

//     const b2res = (await getB2TokenForFileDownload()) as any;
//     return res
//       .status(200)
//       .json({
//         user: { ...user, isFollowing : !!isFollowing, hasCard: cards?.length > 0 },
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
