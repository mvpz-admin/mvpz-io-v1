
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(req.method === 'GET' && session.user?.id){            
//             const {orderNumber} = req.query
//             const order = await prisma.apparelOrder.findUnique({
//                 where:{
//                     orderNumber: orderNumber.toString(),
//                     userId: session.user?.id
//                 },
//                 include:{
//                     product: true,
//                     variant: true,
//                     paymentAttempt: {include: {paymentMethod: true}},
//                     address: true
//                 }
//             })
//             res.status(200).json(order)
//         }else{
//             res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }