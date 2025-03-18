// // pages/api/tribe/checkMembership.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma"; // Adjust the path to your prisma instance
// import { authOptions } from "../../../../auth/[...nextauth]";
// import { getServerSession } from "next-auth"; // Adjust if you're using a different auth method

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Ensure the request method is GET
//     if (req.method !== "GET") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     // Get the current user's session
//     const session = await getServerSession(req, res, authOptions);

//     if (!session?.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const userId = session.user.id; // Adjust based on your session structure
//     const tribeId = req.query.tribeId as string; // Get the tribeId from the query parameters

//     // Check if the user is a member of the tribe
//     const membership = await prisma.tribeMember.findFirst({
//       where: {
//         userId: userId,
//         tribeId: tribeId,
//       },
//     });

//     // Return the result
//     return res.status(200).json({ isMember: !!membership });
    
//   } catch (err) {
//     console.error("Error checking membership:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
