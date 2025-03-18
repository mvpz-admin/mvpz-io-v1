// import { NextApiRequest, NextApiResponse } from "next";
// import getB2TokenForFileDownload from "../../../../lib/backBlaze";
// import prisma from "../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method === 'GET') {
//       const session = await getServerSession(req, res, authOptions);
//       const b2res = await getB2TokenForFileDownload() as any
    

//       const { username } = req.query;
//       const action = req?.query?.action;


//       const result = await prisma.user.findFirst({
//         where: {
//           username: username?.toString(),
//           role : "User"
//         },
//         include: {
//           socialLinks: true,
//           _count : {
//               select : {
//                   tribeMembers : true,
//                   following : true,
//                   followers : true,
//               }
//           }
//       }
//       });

//       if (!result) {
//         return res.status(404).json({success : false ,  error: 'User not found' });
//       }

//       if(!session?.user){
//       return  res.status(200).json({
//           success : true ,
//           user: {...result, isFollowing: false,},
//           imageDownload: {
//             downloadUrl: b2res.downloadUrl,
//             authorizationToken: b2res.authorizationToken,
//           },
//         });
//       }


      
//       // Check if the session user is following the queried user
//       let isFollowing 
      
//       isFollowing  = await prisma.userFollower.findFirst({
//         where: {
//           followerId: result.id ,
//           followingId: session.user.id,
//         },
//       });

//       console.log({
//         isFoolow1 : isFollowing,
//         rr : result.id,
//         ss : session.user.id,
//         action,
//       });
      

//       if (!isFollowing && action == "follow") {
//         console.log({
//           action,
//           isFoolow2 : isFollowing,
//           rr : result.id,
//           ss : session.user.id,
//         });
        
//         isFollowing =  await prisma.userFollower.create({
//           data: {
//             followerId: result.id,
//             followingId: session.user.id,
//           },
//         });
//       }

      

      

      

//      ;

//       res.status(200).json({
//         success : true ,
//         user: {...result, isFollowing: Boolean(isFollowing),},
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     } else {
//       res.status(400).json({ success : false , error: 'ONLY GET ALLOWED' });
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ success : false , error: 'Internal server error' });
//   }
// }
