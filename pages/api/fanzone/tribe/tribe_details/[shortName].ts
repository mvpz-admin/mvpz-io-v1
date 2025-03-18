// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma"; // Adjust the path to your prisma instance
// import { getServerSession } from "next-auth"; // Assuming you are using next-auth for authentication
// import { authOptions } from "../../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     // Ensure the request method is GET
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     const { shortName } = req.query;
//     const request = req.body.request

//     let tribeShortName = (shortName as string)?.split("%20").join(" ")
  

//     console.log({
//       tribeShortName
//     });
    

//     // Fetch organisation by short name
//     let tribe = await prisma.tribe.findFirst({
//       where: {
//         tribeName: tribeShortName,
//       },
//       include: {
//         organisation: {
//           include : {
//             cardColorPallet : true
//           }
//         },
//         socialLinks: true,
//         athletes: true,
//         media: {
//           orderBy: {
//             uploadedOn: 'desc',
//           },
//           take : 10
//         },
//         live: {
//           orderBy: {
//             uploadedOn: 'desc',
//           },
//           take : 10
//         },
//         upcomingEvents: {
//           orderBy: {
//             uploadedOn: 'desc',
//           },
//           take : 10
//         },
//       },
//     });


//     console.log({
//       tribe
//     });
    
  


//     // Check if organisation exists
//     if (!tribe) {
//       return res.status(404).json({ error: "Tribe not found" });
//     }
    



//     // Check if tribe exists
//     if (!tribe) {
//       return res.status(404).json({ error: "Tribe not found" });
//     }

//     console.log({request});
    

//     if(request == "follow" && session?.user){
//       const userId = session.user.id;
//       const existingMember = await prisma.tribeMember.findFirst({
//         where: {
//           userId: userId,
//           tribeId: tribe.id,
//         },
//       });

//       if(!existingMember){
//         const newMember = await prisma.tribeMember.create({
//           data: {
//             userId,
//             tribeId: tribe.id,
//           },
//         });
//       }

//     }


    

//     const athleteUserIds = tribe.athletes.map((athlete) => athlete.userId);

//     const athleteUsers = await prisma.user.findMany({
//       where: {
//         id: { 
//           in: athleteUserIds,
//          },
//       },
//     });
    
//     let isMember = false;

//     // Check if user is authenticated
//     if (session) {
//       const userId = session.user.id; // Adjust based on your session structure

//       // Check if the user is a member of the tribe
//       const membership = await prisma.tribeMember.findFirst({
//         where: {
//           userId: userId,
//           tribeId: tribe.id,
//         },
//       });

//       isMember = !!membership;
//     }

//     // Generate download authorization token
//     const b2res = (await getB2TokenForFileDownload()) as any;

//     return res.status(200).json({
//       tribe,
//       athleteUsers : athleteUsers?.filter((_) => !_.isMvpzAccount  && !_.isMvpzTestingAccount ) ,
//       isMember,
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
