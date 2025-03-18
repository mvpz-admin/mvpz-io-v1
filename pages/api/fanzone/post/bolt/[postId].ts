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
//         // Check if the Bolt already exists
//         const existingBolt = await prisma.bolt.findFirst({
//           where: {
//             userId : userId as string,
//             postId : postId as string,
//           },
//         });
  
//         if (existingBolt) {
//           // If Bolt exists, delete it
//           await prisma.bolt.delete({
//             where: {
//                 id: existingBolt.id,
//             },
//           });
//           return res.status(200).json({ 
//             message: "Bolt removed",
//             isBolt : false
//          });
//         } else {
//           // If Bolt does not exist, create it
//           const newBolt = await prisma.bolt.create({
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
//               title: "🔥 Your Content is On Fire!",
//               message: "Someone reacted with fire to your post. Keep sharing the heat!",
//               type: "FIRE",
//               userId: userInfo?.postedBy?.id,
//             },
//           });

//           return res.status(201).json({
//             newBolt,
//             message : "Bolt created",
//             isBolt : true
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
