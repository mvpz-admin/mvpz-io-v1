// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { userId } = req.query;

//   if (!userId || typeof userId !== "string") {
//     return res
//       .status(400)
//       .json({ error: "User ID is required and must be a string" });
//   }

//   switch (req.method) {
//     case "GET":
//       return fetchUserPosts(req, res, userId);
//     default:
//       res.setHeader("Allow", ["GET"]);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // Fetch all posts for a given user
// async function fetchUserPosts(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   userId: string
// ) {
//   try {
//     const posts = await prisma.post.findMany({
//       where: {
//         userId: userId,
//       },
//       include: {
//         media: true, // Include media associated with the post
//         comments: {
//           include: {
//             postedBy: {
//               select: {
//                 id: true,
//                 username: true,
//                 image: true,
//                 isMvpzAccount: true,
//                 isMascot: true,
//                 role : true
//               },
//             },
//           },
//           orderBy: {
//             id: "desc",
//           },
//         },
//         claps: {
//           select: {
//             id: true,
//           },
//         },
//         clovers: {
//           select: {
//             id: true,
//           },
//         },
//         bolts: {
//           select: {
//             id: true,
//           },
//         },
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             role : true
//           },
//         },
//       },
//       orderBy: {
//         id: "desc", // Order by the most recent posts
//       },
//     });

//     const getTribeName = async (postId) => {
//       const getTribe = await prisma.tribePost.findFirst({
//         where: {
//           id: postId,
//         },
//         include: {
//           tribe: {
//             select: {
//               organisation: true,
//               tribeName: true,
//             },
//           },
//         },
//       });

//       if (getTribe) {
//         return getTribe?.tribe?.tribeName;
//       }

//       return "";
//     };

//     const getPostType = async (postId) => {
//       const getTribe = await prisma.tribePost.findFirst({
//         where: {
//           id: postId,
//         },
//         include: {
//           tribe: {
//             select: {
//               organisation: true,
//             },
//           },
//         },
//       });

//       if (getTribe) {
//         return `Feed ${getTribe.tribe.organisation.shortName}`;
//       }

//       return "Feed";
//     };

//     const updatedPosts = await Promise.all(
//       posts.map(async (post) => ({
//         ...post,
//         tribeName: await getTribeName(post?.id),
//         postType: await getPostType(post?.id),
//       }))
//     );

//     const b2res = (await getB2TokenForFileDownload()) as any;
//     return res
//       .status(200)
//       .json({
//         posts: updatedPosts,
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
