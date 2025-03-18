// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../lib/prisma";
// import { getReferralCode, getProductReferralCode } from "../../../lib/referralCode";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         const {productId, socialMedia} = req.body
//         if(!session?.user){
//             return res.status(403).json({error: 'User not authenticated'})
//         }
//         if(!productId){
//             // Get user referral code if exists, otherwise create one and save it in user table and return it
//             if(session.user.referralCode){
//                 return res.status(200).json({inviteCode: session.user.referralCode})
//             }
//             const referralCode = await getReferralCode()
//             await prisma.user.update({
//                 where: {
//                     id: session.user.id
//                 },
//                 data:{
//                     referralCode
//                 }
//             })
//             return res.status(200).json({inviteCode: referralCode})
//         }
//         const productReferralCode = await getProductReferralCode()
//         const today = new Date()
//         // set expiry to 15 days
//         const expiry = today.setDate(today.getDate() + 15)
//         await prisma.referralInvite.create({
//             data:{
//                 referredByUserId: session.user.id,
//                 inviteCode: productReferralCode,
//                 productId,
//                 expiryDate: new Date(expiry),
//                 socialMedia
//             }
//         })
//         res.status(200).json({inviteCode: productReferralCode})
//     }catch(err){
//         res.status(500).json({error: 'Internal server error'})
//     }
// }


