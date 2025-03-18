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
//         if(req.method === 'GET'){
//             const {userId} = req.query
            
//             const myCards = await prisma.nFTMintCard.findMany({
//                 where:{
//                     currentOwnerId: userId as string
//                 },
//                 include: {
//                     nftEntity: {
//                         select: {
//                             'id': true,'title': true,'description': true,'rarity': true,'position': true, 'edition': true, 'serialNumberStart': true, 
//                             'mintQuantity': true, 'price': true, 'cardImageNFT': true, 'design': true, 'designer': true, 'type': true,
//                             athlete: {select: {'name': true}}
//                         }
//                     }
//                 }
//             })
//             const purchaseCards = await prisma.nFTPurchaseCard.findMany({
//                 where:{
//                     currentOwnerId: userId as string
//                 },
//                 include: {
//                     nftEntity: {
//                         select: {
//                             'id': true,'title': true,'description': true,'rarity': true,'position': true, 'edition': true, 'serialNumberStart': true, 
//                             'mintQuantity': true, 'price': true, 'cardImageNFT': true, 'design': true, 'designer': true, 'type': true,
//                             athlete: {select: {'name': true}}
//                         }
//                     }
//                 }
//             })

//             const user = await prisma.user.findUnique({
//                 where: {id: userId.toString()},
//                 select: {
//                     name: true, email: true
//                 }
//             })
//             const b2res = await getB2TokenForFileDownload() as B2APIType
//             console.log({
//                 user,
//                 cards: [...myCards, ...purchaseCards]
//             });
            
//             res.status(200).json({user, cards:  [...myCards, ...purchaseCards], imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//         }else{
//             res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }


