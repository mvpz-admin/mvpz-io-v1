// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";


// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(req.method === 'GET'){
//             const {username} = req.query
//             const result = await prisma.user.findFirst({
//                 where: {
//                     username: username.toString(),
//                     email: {not: session?.user?.email}
//                 }
//             })
//             res.status(200).json(!!result)
//         }else{
//             res.status(400).json({error: 'ONLY GET ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }