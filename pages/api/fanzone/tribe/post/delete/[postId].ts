// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../../../lib/prisma";
// import { authOptions } from "../../../../auth/[...nextauth]";
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user) {
//       return res.status(403).json({ status: "fail", message: "User not authenticated" });
//     }

//     const { id: userId } = session.user;


//     if (req.method === "DELETE") {
//       const { postId } = req.query;

//       // Fetch the post to confirm ownership
//       const post = await prisma.tribePost.findUnique({
//         where: { id: postId as string },
//       });

//       if (!post) {
//         return res.status(404).json({ status: "fail", message: "Post not found" });
//       }

//       if (post.userId !== userId) {
//         return res.status(403).json({ status: "fail", message: "Not authorized to delete this post" });
//       }

//       const anonymousUser = await prisma.user.findFirst({
//         where : {
//           isAnonymous : true
//         }
//       })

//       // Delete the post along with related media, comments, shares, claps, etc.
//       await prisma.tribePost.update({
//         where: { id: postId as string},
//         data : {
//           userId : anonymousUser?.id
//         }
//       });

//       return res.status(200).json({ status: "success", message: "Post deleted successfully" });
//     }

//     return res.status(405).json({ status: "fail", message: "Method not allowed" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
