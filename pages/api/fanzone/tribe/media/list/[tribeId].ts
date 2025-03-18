// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma"; // Adjust the path to your prisma instance
// import { getServerSession } from "next-auth"; // Assuming you are using next-auth for authentication
// import { authOptions } from "../../../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // Ensure the request method is GET
//     if (req.method !== "GET") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     const { tribeId } = req.query;

    
//     // Get tribe details with nested includes for athlete information
//     const tribe = await prisma.tribe.findUnique({
//       where: {
//         id: tribeId as string
//       },
//       include: {
      
//         media: {
//           orderBy: {
//             uploadedOn: 'desc',
//           },
//           take : 10
//         },
       
//       },
//     });

//     // Check if tribe exists
//     if (!tribe) {
//       return res.status(404).json({ error: "Tribe not found" });
//     }

//     // Get the current user's session
   

//     // Generate download authorization token
//     const b2res = (await getB2TokenForFileDownload()) as any;

//     return res.status(200).json({
//       tribe,
//       imageDownload: {
//         downloadUrl: b2res.downloadUrl,
//         authorizationToken: b2res.authorizationToken,
//       },
//     });
//   } catch (err) {
//     console.error("Error fetching tribe details:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
