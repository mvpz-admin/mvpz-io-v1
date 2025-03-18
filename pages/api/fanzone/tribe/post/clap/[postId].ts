// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../auth/[...nextauth]";

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
//         // Check if the clap already exists
//         const existingClap = await prisma.tClap.findFirst({
//           where: {
//             userId : userId as string,
//             postId : postId as string,
//           },
//         });
  
//         if (existingClap) {
//           // If clap exists, delete it
//           await prisma.tClap.delete({
//             where: {
//                 id: existingClap.id,
//             },
//           });
//           return res.status(200).json({ 
//             message: "Clap removed",
//             isClap : false
//          });
//         } else {
//           // If clap does not exist, create it
//           const newClap = await prisma.tClap.create({
//             data: {
//               userId,
//               postId : postId as string,
//             },
//           });

//           const userInfo = await prisma.tribePost.findFirst({
//             where: {
//               id: postId as string,
//             },
//             include: {
//               postedBy: true,
//             },
//           });

//           await prisma.notification.create({
//             data: {
//               title: "Bravo! 👏",
//               message: "Someone just clapped for your post. Check it out and keep shining!",
//               type: "CLAP",
//               userId: userInfo?.postedBy?.id,
//             },
//           });

//           return res.status(201).json({
//             newClap,
//             message : "Clap created",
//             isClap : true
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
