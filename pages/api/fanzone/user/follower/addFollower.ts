// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";

// export default async function addFollowerHandler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//       const session = await getServerSession(req, res, authOptions);
//       if (!session) return res.status(401).json({ error: "Unauthorized" });
  
//       const followingId = session.user.id; // Extract current user ID from session
//       if (req.method === "POST") {
//         const { followerId } = req.body; // Only followerId is required in the body
  
//         if (!followerId) return res.status(400).json({ error: "Follower ID is required" });

//         const existingFollow = await prisma.userFollower.findFirst({
//             where: {
//               followerId,
//               followingId,
//             },
//           });
    
//           if (existingFollow) {
//             return res.status(200).json({ message: "Follower added successfully", followRelation : existingFollow });
//           }
  
//         const followRelation = await prisma.userFollower.create({
//           data: {
//             followerId,
//             followingId,
//           },
//         });


//         if(!followRelation){
//           return res.status(500).json({ error: "Something Went Wrong : Follower not addded!" });
//         }

//         await prisma.notification.create({
//           data: {
//             title: "Your Fanbase is Growing!",
//             message: "You’ve got a new follower. Keep sharing and inspiring!",
//             type: "FOLLOW",
//             userId: followingId,
//           },
//         });
  
//         res.status(200).json({ message: "Follower added successfully", followRelation });
//       } else {
//         res.status(405).json({ error: "Method not allowed" });
//       }
//     } catch (error) {
//       console.error("Error adding follower:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }