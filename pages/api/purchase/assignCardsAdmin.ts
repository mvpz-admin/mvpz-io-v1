// import { NextApiRequest, NextApiResponse } from "next"
// import { getServerSession } from "next-auth"
// import prisma from "../../../lib/prisma"
// import { authOptions } from "../auth/[...nextauth]"
// import { processOrder } from "./assignCards"

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(!session || !session.user) return res.status(403).json({status: 'fail', message: 'user not authenticated'})
//         if(req.method === 'POST'){
//             const {paymentId} = req.body
//             const paymentAttempt:any = await prisma.paymentAttempt.findUnique({
//                 where: {
//                     id: paymentId.toString()
//                 },
//                 include: {
//                     user: true
//                 }
//             })
//             if(paymentAttempt?.user){
//                 await processOrder(res, paymentAttempt, paymentAttempt.user)
//             }else{
//                 res.status(400).json({error: !paymentAttempt ? 'Payment attempt not found' : 'User not found with given payment attempt'})
//             }
//         }else{
//             res.status(404)
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }
// }
