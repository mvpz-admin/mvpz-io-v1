
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// interface B2APIType{
//     downloadUrl: String;
//     authorizationToken: String;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         if(req.method === 'GET'){
//             const {project, type} = req.query
//             const session = await getServerSession(req, res, authOptions)
//             if(session?.user?.role != 'Admin'){
//                 return {
//                     redirect: {
//                     destination: '/',
//                     permanent: false,
//                     },
//                 }
//             }
//             const whereObj: any = {
//                 projectId: project === 'second' ? "65fc83b8fa035dc95cf4be12" : "656627ce2f4610f4918de9e7"
//             }
//             if(type){
//                 whereObj.type = type
//             }
//             const cards = await prisma.nFTEntity.findMany({
//                 where: whereObj,
//                 select: {'id': true,'title': true,'description': true,'rarity': true,'position': true, 'edition': true, 'serialNumberStart': true, 
//                 'mintQuantity': true, 'price': true, 'cardImageNFT': true, 'design': true, 'designer': true, type: true,
//                     athlete: {select: {'name': true}}
//                 },
//             })
//             const b2res = await getB2TokenForFileDownload() as B2APIType
//             res.status(200).json({cards, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//         }else{
//             res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }