// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const {subdomain} = req.query
//         if(!subdomain) return res.status(200).json({athletes: []})
//         const athletes = await prisma.user.findMany({
//             where: {role: 'Athlete', subdomain: subdomain.toString()},
//             select: {'name': true,'image': true,'currentSchool': true,'primarySport': true,'primaryPosition': true, 'username': true}
//         })
//         const b2res = await getB2TokenForFileDownload() as any
//         res.status(200).json({athletes, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken} })
//     }catch(err){
//         res.status(500).json({error: 'Internal server error'})
//     }

// }