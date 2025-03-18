// import { NextApiRequest, NextApiResponse } from "next"
// import { getServerSession } from "next-auth"
// import prisma from "../../../lib/prisma"
// import { authOptions } from "../auth/[...nextauth]"

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(!session || !session.user) return res.status(403).json({status: 'fail', message: 'user not authenticated'})
//         if(req.method === 'GET'){
//             const orders = await prisma.apparelOrder.findMany({
//                 where: {
//                     userId: session.user.id,
//                     status: {not: 'CREATED'}
//                 },
//                 include:{
//                     product: true,
//                     paymentAttempt: true,
//                     variant: true
//                 }
//             })
//             return res.status(200).json(orders)        
//         }else{
//             return res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
        
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }
// }