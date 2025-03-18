// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { userId } = req.query;

//   if (!userId || typeof userId !== "string") {
//     return res.status(400).json({ error: "User ID is required and must be a string" });
//   }

//   switch (req.method) {
//     case "GET":
//       return fetchUserMedia(req, res, userId);
//     default:
//       res.setHeader("Allow", ["GET"]);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // Fetch all media posted by the user
// async function fetchUserMedia(req: NextApiRequest, res: NextApiResponse, userId: string) {
//   try {
//     // Fetch posts by the user that contain media
//     const userMediaPosts = await prisma.post.findMany({
//       where: {
//         postedBy: {
//           id: userId,
          
//         },
//         media: {
//           some: {}
//         }
//       },
//       select: {
//         id: true,
//         media: true,
//         postedBy: {
//           select: {
//             username: true,
//             image: true, 
//             role : true
//           }
//         }
//       },
//       orderBy: {
//         id: "desc"
//       }
//     });

//     return res.status(200).json(userMediaPosts);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
