// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";

// export default async function removeFollowerHandler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session) return res.status(401).json({ error: "Unauthorized" });

//     const followingId = session.user.id;
//     if (req.method === "DELETE") {
//       const { followerId } = req.body;

//       if (!followerId) return res.status(400).json({ error: "Follower ID is required" });

//       // Check if follow relationship exists
//       const existingFollow = await prisma.userFollower.findFirst({
//         where: {
//           followerId,
//           followingId,
//         },
//       });

//       if (!existingFollow) {
//         return res.status(200).json({ message: "Follower removed successfully" });
//       }

//       // Delete the follow relationship
//       let response =  await prisma.userFollower.delete({
//         where: {
//           id: existingFollow.id,
//         },
//       });

//       if (!response) {
//         return res.status(400).json({ error: "Something Went Wrong : Follower Not Removed" });
//       }

//       res.status(200).json({ message: "Follower removed successfully" });
//     } else {
//       res.status(405).json({ error: "Method not allowed" });
//     }
//   } catch (error) {
//     console.error("Error removing follower:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
