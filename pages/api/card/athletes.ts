
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// interface B2APIType{
//     downloadUrl: String;
//     authorizationToken: String;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(!session.user) return res.status(403)
//         if(req.method === 'GET'){
//             const cards = await prisma.nFTEntity.findMany({
//                 where:{
//                     type: 'Athlete',
//                     design: 'Base'
//                 },
//                 select: {'id': true,'title': true,'description': true,'rarity': true,'position': true, 'edition': true, 'serialNumberStart': true, 
//                 'mintQuantity': true, 'price': true, 'cardImageNFT': true, 'design': true, 'designer': true,
//                     athlete: {select: {'id':true,'name': true, 'username': true, subdomain: true, currentSchool: true, primaryPosition: true, primarySport: true, sex: true}}
//                 }
//             })
//             const b2res = await getB2TokenForFileDownload() as B2APIType
//             res.status(200).json({cards: cards.filter((c: any) => c.athlete.subdomain !== 'kstate'), imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//         }else{
//             res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }