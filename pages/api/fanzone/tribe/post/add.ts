// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user)
//       return res
//         .status(403)
//         .json({ status: "fail", message: "user not authenticated" });
//     const { id: userId } = session?.user;
//     if (req.method === "POST") {
//       const { message, mediaList, tribeId } = req.body;
//       let response = await prisma.tribePost.create({
//         data: {
//           tribeId,
//           message,
//           media: {
//             create: mediaList,
//           },
//           comments: {
//             create: [],
//           },
//           userId: userId,
//           shares: {
//             create: [],
//           },
//           claps: {
//             create: [],
//           },
//           clovers: {
//             create: [],
//           },
//           bolts: {
//             create: [],
//           },
//         },
//       });

//       return res.status(200).json(response);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
