// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { organisations, teams } from "../../../lib/data";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(session.user?.role !== 'Admin'){
//             return res.status(200).json({message: 'NOT_ALLOWED'})
//         }
//         if(req.method === 'POST'){
//             // const orgs = organisations.map((org: any) => {
//             //     org.teams = {createMany: teams}
//             //     return org
//             // })
//             const allTeams = teams.map(team => {
//                 team.sport = team.sport.toUpperCase().replaceAll(' ','_')
//                 return team
//             })
//             for(let org of organisations as any){
//                 org.teams = {createMany: {data: allTeams}}
//                 await prisma.organisation.create({
//                     data: org
//                 })
//             }
            
//             res.status(200).json(true)
//         }else{
//             res.status(400).json({error: 'ONLY POST ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }
// }