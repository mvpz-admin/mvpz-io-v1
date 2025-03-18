// // pages/api/tribe/listUserTribes.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma"; // Adjust the path to your prisma instance
// import { authOptions } from "../../../auth/[...nextauth]";
// import { getServerSession } from "next-auth";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Check if the request is GET
//     if (req.method !== "GET") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     // Get user session and check if authenticated
//     const session = await getServerSession(req, res, authOptions);
//     if (!session?.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });

       
//     }

//     const {userId} = req.query;

//     // Find all tribes the user is a member of
//     const userTribes = await prisma.tribeMember.findMany({
//       where: {
//         userId : userId as string,
//       },
//       include: {
//         tribe: {
//           select : {
//             id : true,
//             organisation : true,
//             about : true,
//             tribeBanner : true,
//             tribeHorizontalBanner : true,
//             tribeVerticalBanner : true,
//             tribeLogo : true,
//            _count : {
//             select : {
//               athletes : true,
//               members : true,
//             }
//            }
//           }
//         },
//          // Include the related tribe details
//       },
//     });

//     // Format response with just the tribe details
//     const tribes = userTribes?.map((member) => member.tribe);

//     return res.status(200).json(tribes);
//   } catch (error) {
//     console.error("Error fetching user tribes:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
