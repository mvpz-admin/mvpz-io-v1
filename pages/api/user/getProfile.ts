// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(req.method === 'GET' && session?.user?.email){
//             const result = await prisma.user.findUnique({
//                 where: {
//                     email: session.user.email
//                 },
//                 include: {
//                     socialLinks: true,
//                     _count : {
//                         select : {
//                             tribeMembers : true,
//                             following : true,
//                             followers : true,
//                         }
//                     }
//                 }
//             })
//             const b2res = await getB2TokenForFileDownload() as any
//             if(result?.currentSchool){
//               let result1 = await prisma.organisation.findFirst({
//                 where : {
//                   shortName : result?.currentSchool
//                 }
//               })

//               if (result1){
                
//                 res.status(200).json({user: {...result,organisation : result1}, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//               }else{
//                 let result2 = await prisma.organisation.findFirst({
//                     where : {
//                       name : result?.currentSchool
//                     }
//                 })
//                 res.status(200).json({user: {...result,organisation : result2}, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//               }
//             }
//             res.status(200).json({user: result, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
            
//         }else{
//             res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }