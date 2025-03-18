// // pages/api/tribe/athlete/create.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma"; // Adjust the path to your Prisma instance
// import { getServerSession } from "next-auth"; // Assuming you're using next-auth for authentication
// import { authOptions } from "../../../auth/[...nextauth]";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Ensure the request method is POST
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     const session = await getServerSession(req, res, authOptions);

//     // Check if the user is authenticated
//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { tribeId, userId } = req.body;

//     // Validate required fields
//     if (!tribeId || !userId) {
//       return res.status(400).json({ error: "Tribe ID and User ID are required" });
//     }

//     // Verify that the tribe and user exist
//     const tribeExists = await prisma.tribe.findUnique({
//       where: { id: tribeId },
//     });

//     const userExists = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!tribeExists) {
//       return res.status(404).json({ error: "Tribe not found" });
//     }

//     if (!userExists) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Create the TribeAthlete entry
//     const newTribeAthlete = await prisma.tribeAthlete.create({
//       data: {
//         tribeId,
//         userId,
//       },
//       include: {
//         tribe: true,
//         athlete: true,
//       },
//     });

//     // Return the created TribeAthlete entry
//     return res.status(201).json({ message: "Tribe athlete created successfully", newTribeAthlete });
//   } catch (err) {
//     console.error("Error creating tribe athlete:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
