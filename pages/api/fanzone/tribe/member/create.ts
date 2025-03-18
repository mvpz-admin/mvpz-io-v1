// // pages/api/tribe/createMember.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma"; // Adjust the path to your prisma instance
// import { authOptions } from "../../../auth/[...nextauth]";
// import { getServerSession } from "next-auth";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Check if the request is POST
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     // Get user session and check if authenticated
//     const session = await getServerSession(req, res, authOptions);
//     if (!session?.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Extract tribeId from the request body
//     const { tribeId } = req.body;

//     console.log({
//       tribeId
//     });
    

//     if (!tribeId) {
//       return res.status(400).json({ error: "Tribe ID is required" });
//     }

//     const userId = session.user.id;

//     // Check if the user is already a member of the tribe
//     const existingMember = await prisma.tribeMember.findFirst({
//         where: {
//           userId: userId,
//           tribeId: tribeId,
//         },
//       });

//     if (existingMember) {
//       return res.status(400).json({ error: "User is already a member of the tribe" });
//     }

//     // Create a new tribe member
//     const newMember = await prisma.tribeMember.create({
//       data: {
//         userId,
//         tribeId,
//       },
//     });

//     return res.status(201).json(newMember);
//   } catch (error) {
//     console.error("Error creating tribe member:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
