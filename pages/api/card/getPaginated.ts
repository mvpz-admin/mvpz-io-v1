
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
//             const {page, limit} = req.query
//             const cards = await prisma.nFTEntity.findMany({
//                 select: {'id': true,'title': true,'description': true,'rarity': true,'position': true, 'edition': true, 'serialNumberStart': true, 
//                 'mintQuantity': true, 'price': true, 'cardImageNFT': true, 'design': true, 'designer': true,
//                     athlete: {select: {'name': true, 'username': true}}
//                 },
//                 skip: parseInt(page.toString())*parseInt(limit.toString()),
//                 take: parseInt(limit.toString())
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