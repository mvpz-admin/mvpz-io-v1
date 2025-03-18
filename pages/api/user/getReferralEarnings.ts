// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(!session?.user){
//             return res.status(403).json({error: 'User not authenticated'})
//         }
//         if(!session.user.referralCode){
//             return res.status(200).json({})
//         }
//         // const allReferrals = await prisma.payout.findMany({
//         //     where:{
//         //         userId: session.user.id,
//         //         type: 'Apparel'
//         //     }
//         // })
//         // const signupReferrals = allReferrals.filter(r => r.payoutPercentageType === 'signup')
//         // const productReferrals = allReferrals.filter(r => r.payoutPercentageType === 'productReferral')
//         // const referredUsersCount = await prisma.user.count({
//         //     where:{
//         //         referrerId: session.user.id,
//         //         deactivated: false
//         //     }
//         // })
//         // res.status(200).json({
//         //     signupReferralsCount: signupReferrals.length,
//         //     signupReferralsAmount: signupReferrals.reduce((total, r) => total + r.payoutAmount, 0),
//         //     productReferralsCount: productReferrals.length,
//         //     productReferralsAmount: productReferrals.reduce((total, r) => total + r.payoutAmount, 0),
//         //     signupsCount: referredUsersCount
//         // })

//         const allReferrals = await prisma.stripePayout.findMany({
//             where:{
//                 payoutUserId: session.user.id,
//                 type: 'referral'
//             }
//         })
//         const signupReferrals = allReferrals.filter(r => {
//             let getmetaData = JSON.parse(r.metadata)
//             return getmetaData?.referralType === 'signup'
//         })

//         const productReferrals = allReferrals.filter(r => {
//             let getmetaData = JSON.parse(r.metadata)
//            return getmetaData?.referralType === 'productReferral'
//         })


//         const referredUsersCount = await prisma.user.count({
//             where:{
//                 referrerId: session.user.id,
//                 deactivated: false
//             }
//         })


//         res.status(200).json({
//             signupReferralsCount: signupReferrals.length,
//             signupReferralsAmount: signupReferrals.reduce((total, r) => total + r.amount, 0),
//             productReferralsCount: productReferrals.length,
//             productReferralsAmount: productReferrals.reduce((total, r) => total + r.amount, 0),
//             signupsCount: referredUsersCount
//         })

//     }catch(err){
//         res.status(500).json({error: 'Internal server error'})
//     }
// }