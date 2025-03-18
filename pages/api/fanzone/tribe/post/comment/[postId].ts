// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { postId } = req.query;
//   const session = await getServerSession(req, res, authOptions);
//   if (!postId || typeof postId !== "string") {
//     return res.status(400).json({ error: "Post ID is required and must be a string" });
//   }

//   switch (req.method) {
//     case "POST":
//       return handleAddComment(req, res, postId, session);
//     case "DELETE":
//       return handleDeleteComment(req, res, postId,session);
//     default:
//       res.setHeader("Allow", ["POST", "DELETE"]);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // Function to add a comment
// async function handleAddComment(req: NextApiRequest, res: NextApiResponse, postId: string, session:any) {
//   const {comment } = req.body;
//   const {id: userId} = session?.user
  
//   if (!session || !userId)
//     return res
//       .status(403)
//       .json({ status: "fail", message: "user not authenticated" });

//   if (!comment) {
//     return res.status(400).json({ error: "User ID and comment are required" });
//   }

//   try {
//     const newComment = await prisma.tComment.create({
//       data: {
//         userId,
//         postId,
//         comment,
//       },
//     });

//     const userInfo = await prisma.tribePost.findFirst({
//       where: {
//         id: postId,
//       },
//       include: {
//         postedBy: true,
//       },
//     });

//     await prisma.notification.create({
//       data: {
//         title: "You’ve Got a New Comment!",
//         message: "Your post just got a comment. Tap to read and reply",
//         type: "COMMENT",
//         userId: userInfo?.postedBy?.id,
//       },
//     });

//     return res.status(201).json(newComment);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// // Function to delete a comment
// async function handleDeleteComment(req: NextApiRequest, res: NextApiResponse, postId: string, session:any) {
//   const {commentId } = req.body;
//   const {id: userId} = session?.user
  
//   if (!session || !userId)
//     return res
//       .status(403)
//       .json({ status: "fail", message: "user not authenticated" });

//   if (!commentId) {
//     return res.status(400).json({ error: "User ID and comment ID are required" });
//   }

//   try {
//     // Find the comment
//     const existingComment = await prisma.tComment.findUnique({
//       where: {
//         id: commentId,
//       },
//     });

//     // Check if the comment exists and was made by the user
//     if (!existingComment || existingComment.userId !== userId || existingComment.postId !== postId) {
//       return res.status(404).json({ error: "Comment not found or unauthorized" });
//     }

//     // Delete the comment
//     await prisma.comment.delete({
//       where: {
//         id: commentId,
//       },
//     });

//     return res.status(200).json({ message: "Comment deleted" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
