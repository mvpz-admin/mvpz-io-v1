// import { randomUUID } from "crypto";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";


// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(req.method === 'GET'){
//             const result = await prisma.user.findUnique({
//                 where: {
//                     email: session?.user?.email
//                 }
//             })
//             // remove previous sessions
//             const prevSessions = await prisma.sessionMint.findMany({
//                 where: {
//                     userId: result.id,
//                     isDeleted: false
//                 }
//             })
//             for(let session of prevSessions){
//                 await prisma.sessionMint.update({
//                     where: {
//                         id: session.id
//                     },
//                     data: {
//                         isDeleted: true
//                     }
//                 })
//             }
            
//             const token = randomUUID()
//             const date = new Date()
//             date.setSeconds(date.getSeconds()+300)
//             const mintSession = await prisma.sessionMint.create({
//                 data: {
//                     token,
//                     expires: date,
//                     user: {
//                         connect: {id: result.id}
//                     }
//                 }
//             })
//             res.status(200).json(mintSession.token)
//         }else{
//             res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }