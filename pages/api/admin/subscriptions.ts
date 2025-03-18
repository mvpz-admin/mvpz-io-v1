// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(session?.user?.role != 'Admin'){
//             return {
//                 redirect: {
//                 destination: '/',
//                 permanent: false,
//                 },
//             }
//         }
//         const subscriptions = await prisma.userSubscription.findMany({
//             include: {user: true}
//         })
//         res.status(200).json(subscriptions)
//     }catch(err){
//         res.status(500).json({error: 'Internal server error'})
//     }

// }