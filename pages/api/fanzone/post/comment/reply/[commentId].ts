// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { commentId } = req.query;
//   const session = await getServerSession(req, res, authOptions);

  

//   if (!commentId || typeof commentId !== "string") {
//     return res.status(400).json({ error: "Comment ID is required and must be a string" });
//   }

//   switch (req.method) {
//     case "POST":
//       return handleAddReply(req, res, commentId,session);
//     case "DELETE":
//       return handleDeleteReply(req, res, commentId,session);
//     default:
//       res.setHeader("Allow", ["POST", "DELETE"]);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // Add a reply to a comment
// async function handleAddReply(req: NextApiRequest, res: NextApiResponse, commentId: string, session : any) {
//   const {  reply } = req.body;

//   const {id: userId} = session?.user
  
//   if (!session || !userId)
//     return res
//       .status(403)
//       .json({ status: "fail", message: "user not authenticated" });

//   if ( !reply) {
//     return res.status(400).json({ error: "User ID and reply content are required" });
//   }

//   try {
//     const newReply = await prisma.reply.create({
//       data: {
//         userId,
//         commentId,
//         reply,
//       },
//     });

//     return res.status(201).json(newReply);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// // Delete a reply
// async function handleDeleteReply(req: NextApiRequest, res: NextApiResponse, commentId: string, session : any) {
//   const { replyId } = req.body;

//   const {id: userId} = session?.user
  
//   if (!session || !userId)
//     return res
//       .status(403)
//       .json({ status: "fail", message: "user not authenticated" });

//   if ( !replyId) {
//     return res.status(400).json({ error: "User ID and reply content are required" });
//   }

//   try {
//     const existingReply = await prisma.reply.findUnique({
//       where: { id: replyId },
//     });

//     if (!existingReply || existingReply.userId !== userId || existingReply.commentId !== commentId) {
//       return res.status(404).json({ error: "Reply not found or unauthorized" });
//     }

//     await prisma.reply.delete({
//       where: { id: replyId },
//     });

//     return res.status(200).json({ message: "Reply deleted" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
