// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(req.method === 'POST'){
//             const {type, email} = req.body
//             if(session?.user){
//                 const existing = await prisma.userSubscription.findMany({
//                     where: {userId: session.user.id, type: type}
//                 })
//                 if(!!existing.length){
//                     return res.status(200).json({message: "Already subscribed"}) 
//                 }
//                 const data = {type: type, user: {connect: {id: session.user.id}}}
//                 await prisma.userSubscription.create({data})
//             }else if(email){
//                 const existing = await prisma.userSubscription.findMany({
//                     where: {email: email, type: type}
//                 })
//                 if(!!existing.length){
//                     return res.status(200).json({subscribed: true})
//                 }
//                 const data = {type: type, email: email}
//                 await prisma.userSubscription.create({data})
//             }else{
//                 return res.status(400).json({error: 'Missing user info'})
//             }
//             res.status(200).json({subscribed: true})
//         }else if(req.method === 'GET'){
//             const {email, type} = req.query
//             if(session.user){
//                 if(!!type){
//                     const data = await prisma.userSubscription.findFirst({
//                         where: {userId: session.user.id, type: type.toString()}
//                     })
//                     res.status(200).json(data)
//                 }else{
//                     const data = await prisma.userSubscription.findMany({
//                         where: {userId: session.user.id}
//                     })
//                     res.status(200).json(data)
//                 }
//             }else if(email){
//                 const data = await prisma.userSubscription.findFirst({
//                     where: {email: email.toString(), type: type.toString()}
//                 })
//                 res.status(200).json(data)
//             }
//         }else if(req.method === 'DELETE'){
//             const {id} = req.body
//             if(session.user){
//                 await prisma.userSubscription.delete({
//                     where: {
//                         userId: session.user.id,
//                         id
//                     }
//                 })
//             }
//             res.status(200).json({status: 'ok'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }