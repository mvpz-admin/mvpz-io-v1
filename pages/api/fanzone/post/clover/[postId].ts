// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user)
//       return res
//         .status(403)
//         .json({ status: "fail", message: "user not authenticated" });

//     const { id: userId } = session?.user;
//     const { postId } = req.query;

//     if(postId){
//     try {
//         // Check if the Clover already exists
//         const existingClover = await prisma.clover.findFirst({
//           where: {
//             userId : userId as string,
//             postId : postId as string,
//           },
//         });
  
//         if (existingClover) {
//           // If Clover exists, delete it
//           await prisma.clover.delete({
//             where: {
//                 id: existingClover.id,
//             },
//           });
//           return res.status(200).json({ 
//             message: "Clover removed",
//             isClover : false
//          });
//         } else {
//           // If Clover does not exist, create it
//           const newClover = await prisma.clover.create({
//             data: {
//               userId,
//               postId : postId as string,
//             },
//           });

//           const userInfo = await prisma.post.findFirst({
//             where: {
//               id: postId as string,
//             },
//             include: {
//               postedBy: true,
//             },
//           });

//           await prisma.notification.create({
//             data: {
//               title: "Wishing You Luck! 🍀",
//               message: "Someone just sent a luck reaction to your post. Fortune is on your side!",
//               type: "LUCK",
//               userId: userInfo?.postedBy?.id,
//             },
//           });

//           return res.status(201).json({
//             newClover,
//             message : "Clover created",
//             isClover : true
//         });
//         }
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal server error" });
//       }
//     }
//   } else {
//     // Handle any other HTTP method
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
