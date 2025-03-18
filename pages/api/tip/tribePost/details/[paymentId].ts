// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../../lib/prisma";
// import { authOptions } from "../../../auth/[...nextauth]";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         if(req.method === 'GET'){
//             const {paymentId} = req.query

//             if(!paymentId){
//                 return res.status(404).json({
//                     success : false,
//                     error : "Payment Details Not Found"
//                 })
//             }

//             const paymentDetails = await prisma.tribePostTips.findFirst(({
//                 where : {
//                     id : paymentId as string,
//                     isPaymentSuccess: true,
//                 },
//                 select:{
//                     amount : true,
//                     toUser : {
//                         select : {
//                             username : true
//                         }
//                     },
//                 }
//             }))

//             if (!paymentDetails) {
//                 return res.status(404).json({
//                   success: false,
//                   data: null,
//                   error: "Payment Details Not Found",
//                 });
//               }
            
//             return res.status(200).json({
//                 success : true,
//                 data : paymentDetails,
//                 message : "Payment Details Fetch Successfully"
//             })
//         }else{
//             res.status(400).json({message: 'Method Not Allowed'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }