// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../../lib/prisma";
// import { authOptions } from "../../../auth/[...nextauth]";

// const hidePost = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { postId } = req.query;

//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user) {
//       return res.status(403).json({ status: "fail", message: "User not authenticated" });
//     }

//     const { id: userId } = session.user;


//     // Check if the post is already hidden by the user
//     const existingHiddenPost = await prisma.hiddenPost.findFirst({
//       where: {
//         userId,
//         postId: postId as string,
//       },
//     });

//     if (existingHiddenPost) {
//       return res.status(400).json({ message: 'Post is already hidden' });
//     }

//     // Hide the post by adding a record to HiddenPost
//     await prisma.hiddenPost.create({
//       data: {
//         userId: userId,
//         postId: postId as string,
   
//       },
//     });

//     res.status(200).json({ message: 'Post hidden successfully' });
//   } catch (error) {
//     console.log({error});
    
//     res.status(500).json({ error: 'Failed to hide post' });
//   }
// };

// export default hidePost;
