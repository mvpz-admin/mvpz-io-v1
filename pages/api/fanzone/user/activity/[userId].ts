// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { userId } = req.query;

//   if (!userId || typeof userId !== "string") {
//     return res.status(400).json({ error: "User ID is required and must be a string" });
//   }

//   switch (req.method) {
//     case "GET":
//       return fetchUserActivity(req, res, userId);
//     default:
//       res.setHeader("Allow", ["GET"]);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // Fetch all posts where the user has activity (comment, clap, clover, bolt)
// async function fetchUserActivity(req: NextApiRequest, res: NextApiResponse, userId: string) {
//   try {
//     // Fetch posts where the user has commented
//     const comments = await prisma.post.findMany({
//       where: {
//         comments: {
//           some: {
//             userId: userId
//           }
//         }
//       },
//       include: {
//         comments: true,
//         media : true,
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             role : true
//           }
//         }
//       }
//     });

//     // Fetch posts where the user has clapped
//     const claps = await prisma.post.findMany({
//       where: {
//         claps: {
//           some: {
//             userId: userId
//           }
//         }
//       },
//       include: {
//         claps: true,
//         comments: true,
//         media : true,
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             role : true
//           }
//         }
//       }
//     });

//     // Fetch posts where the user has sent clovers
//     const clovers = await prisma.post.findMany({
//       where: {
//         clovers: {
//           some: {
//             userId: userId
//           }
//         }
//       },
//       include: {
//         comments: true,
//         media : true,
//         clovers: true,
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             role : true
//           }
//         }
//       }
//     });

//     // Fetch posts where the user has sent bolts
//     const bolts = await prisma.post.findMany({
//       where: {
//         bolts: {
//           some: {
//             userId: userId
//           }
//         }
//       },
//       include: {
//         comments: true,
//         media : true,
//         bolts: true,
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             role : true
//           }
//         }
//       }
//     });

//     const shares = await prisma.post.findMany({
//         where: {
//           shares: {
//             some: {
//               userId: userId
//             }
//           }
//         },
//         include: {
//         comments: true,
//         media : true,
//           shares: true,
//           postedBy: {
//             select: {
//               id: true,
//               username: true,
//               image: true,
//               role : true
//             }
//           }
//         }
//       });

//     // Combine all user activities into one array with custom messages
//     const activity = [
//       ...comments.map(post => ({
//         ...post,
//         activityType: "Commented",
//         activityMessage: "commented on this post."
//       })),
//       ...claps.map(post => ({
//         ...post,
//         activityType: "Clapped",
//         activityMessage: "clapped on this post."
//       })),
//       ...clovers.map(post => ({
//         ...post,
//         activityType: "Clovers",
//         activityMessage: "sent clovers on this post"
//       })),
//       ...bolts.map(post => ({
//         ...post,
//         activityType: "Sent Bolts",
//         activityMessage: "sent bolts on this post"
//       })),
//       ...shares.map(post => ({
//         ...post,
//         activityType: "Shared",
//         activityMessage: "shared on this post"
//       })),
//     ];

//     // Remove duplicates and order by the most recent activity
//     const uniqueActivity = activity.reduce((acc, curr) => {
//       if (!acc.some(post => post.id === curr.id)) {
//         acc.push(curr);
//       }
//       return acc;
//     }, []);

//     uniqueActivity.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//     const b2res = await getB2TokenForFileDownload() as any
//     return res.status(200).json({activity : uniqueActivity, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
