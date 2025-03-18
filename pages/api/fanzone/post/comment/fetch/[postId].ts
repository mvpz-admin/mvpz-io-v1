// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { postId } = req.query;

//   if (!postId || typeof postId !== "string") {
//     return res.status(400).json({ error: "Post ID is required and must be a string" });
//   }

//   if (req.method !== "GET") {
//     res.setHeader("Allow", ["GET"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   try {
//     // Fetch the comments with associated replies, likes, and user details
//     let comments = await prisma.comment.findMany({
//       where: {
//         postId: postId as string,
//       },
//       include: {
//         replies: true,
//         likes: true,
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             role : true,
//             isAnonymous : true
//           },
//         },
//       },
//       orderBy: {
//         id: "desc",
//       },
//     });



//     return res.status(200).json(comments);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
