// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(session?.user?.role != 'Admin'){
//             return {
//                 redirect: {
//                 destination: '/',
//                 permanent: false,
//                 },
//             }
//         }
//         if(req.method === 'POST'){
//             const {name, type, startDate, endDate, minCount, maxCount, bonusPointsOperator, bonusPointsValue, imageSrc, cards} = req.body
//             console.log(req.body)
//             const result = await prisma.collectionChallenge.create({
//                 include: {
//                     challengeCards: true
//                 },
//                 data: {
//                     name,
//                     type,
//                     startDate,
//                     endDate,
//                     minCount,
//                     maxCount: maxCount || minCount,
//                     bonusPointsOperator,
//                     bonusPointsValue,
//                     imageSrc,
//                     challengeCards : {
//                         create: cards
//                     }
//                 }
//             })
//             res.json({status: 'success'})
//         }else if(req.method === 'GET'){
//             const result = await prisma.collectionChallenge.findMany({
//                 where:{
//                     isActive: true
//                 }
//             })
//             res.json({challenges: result})
//         }
//     }catch(err){
//         console.log('Error',err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }