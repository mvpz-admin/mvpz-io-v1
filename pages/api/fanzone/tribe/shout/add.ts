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

//     // Check if the session exists and if the user is authenticated
//     if (!session || !session.user) {
//       return res
//         .status(403)
//         .json({ status: "fail", message: "User not authenticated" });
//     }

//     const { id: userId, role } = session.user; // Destructure userId and role from session.user

//     // Only allow users with the role "Athlete" to post a shout
//     if (role !== "Athlete") {
//       return res
//         .status(403)
//         .json({
//           status: "fail",
//           message: "Unauthorized: Only athletes can post a shout",
//         });
//     }

//     if (req.method === "POST") {
//       const { message,mediaList, tribeId } = req.body;

//       console.log({
//         mediaList
//       });
      

//       // Create a new shout in the database
//       const response = await prisma.tribeShout.create({
//         data: {
//           media: {
//             create: mediaList,
//           },
//           message,
//           comments: {
//             create: [],
//           },
//           tribeId: tribeId,
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

//       // Respond with the newly created shout
//       return res.status(200).json(response);
//     } else {
//       // Handle other request methods (e.g., GET, PUT, DELETE) if necessary
//       return res
//         .setHeader("Allow", ["POST"])
//         .status(405)
//         .end(`Method ${req.method} Not Allowed`);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
