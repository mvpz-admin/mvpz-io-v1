// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         if (req.method !== 'GET') {
//             return res.status(405).json({ error: "Method not allowed. Only GET is permitted." });
//         }

//         const { userId } = req.query;
//         if (!userId || typeof userId !== 'string') {
//             return res.status(400).json({ error: "Invalid or missing user ID." });
//         }

//         // First, fetch the athlete tribes
//         const athleteTribes = await prisma.tribeAthlete.findMany({
//             where: {
//                 userId: userId,
//             },
//             include : {
//                 tribe : {
//                     select : {
//                         tribeName : true,
//                         about : true,
//                         organisation : true,
//                         tribeBanner : true,
//                         tribeHorizontalBanner : true,
//                         tribeVerticalBanner : true,
//                         tribeLogo : true,
//                         _count : {
//                             select : {
//                                 members : true,
//                                 athletes : true
//                             }
//                         } 
//                     }
//                 },
                
//             }
            
//         });
//         return res.status(200).json({ athleteTribes });
//     } catch (err) {
//         console.error("Error fetching athlete tribes:", err);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// }
