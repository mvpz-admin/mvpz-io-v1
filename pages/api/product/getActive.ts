// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         if(req.method === 'GET'){
//             const {type, domain} = req.query
//             const whereObj:any = {isActive: true}
//             if(!!type){
//                 whereObj.type = type
//             }else if(domain){
//                 whereObj.type = {contains: domain}
//             }
            
//             const products = await prisma.product.findMany({
//                 where: whereObj,
//                 include:{
//                     design: true,
//                     specification: true,
//                     additional: true,
//                     variants: true
//                 },
//                 orderBy: {
//                     updatedAt: 'asc'
//                 }
//             })
//             res.status(200).json(products)
//         }else{
//             res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
//     }catch(err){
//         res.status(500).json({error: 'Internal server error'})
//     }

// }