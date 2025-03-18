// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions);

//   if (req.method !== "GET") {
//     return res.status(400).json({ error: "ONLY GET ALLOWED" });
//   }

//   try {
//     if (!session?.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }


//     let challengeId = req.query.id

//    const response = await prisma.userChallenge.findFirst({
//     where : {
//         id : challengeId as string
//     },
//     include : {
//         challenge : {
//             include : {
//                 collectable : {
//                     include : {
//                         perkDigitalCollectables : true,
//                         perkPhysicalCollectables : true
//                     }
//                 },
//                 ticket : true
//             }
//         },
//         challengeCards : true,
//     }
//    })

//    let perkType = response?.challenge?.perkType  || "XP"

//    if(!response){
//     return res.status(404).json({
//         success : false,
//         error : "Challenge Not Found"
//     })
//    }

//    let user = await prisma.user.findFirst({where : {id : session?.user?.id}})

//     return res.status(200).json({
//       success: true,
//       data: {
//         challenge : response,
//         perkType,
//         currentXp : user.xp
//       },
//     });
//   } catch (err) {
//     await prisma.logError.create({
//       data: {
//         apiName: "/api/earnings",
//         collection: "(N/A)",
//         errorLog: `${err}`,
//         title: `Error While Fetching Earnings For ${session?.user?.username}`,
//       },
//     });

//     console.error(err);
//     return res.status(500).json({success: false, error: "Internal server error" });
//   }
// }
