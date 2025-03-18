// // pages/api/user/block/[id].ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";
// import prisma from "../../../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user) {
//       return res.status(403).json({ error: "User not authenticated" });
//     }

//     const userId = session.user.id;
//     const { blockedUserId   } = req.query;

    

//     if (typeof blockedUserId !== "string") {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }

//     // Create a record in a `BlockedUser` table to store the block relationship
//     await prisma.blockedUser.create({
//       data: {
//         blockerId : userId,
//         blockedId : blockedUserId  as string,
//       },
//     });

//     return res.status(200).json({ message: "User blocked successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
