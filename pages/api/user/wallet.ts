// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(!session?.user?.email){
//             return res.status(401).json('User not authenticated.')
//         }
//         const body = req.body            
//         if(req.method === 'POST'){
//             const exists = await prisma.wallet.findUnique({
//                 where: {
//                     address: body.address
//                 }
//             })
//             if(!!exists){
//                 return res.status(400).json({error: exists.userId === session.user.id ? 'Wallet address already exists.' : 'There has been an error in saving wallet. Please contact helpdesk.'})
//             }
//             const existingWallets = await prisma.wallet.findMany({
//                 where: {
//                     userId: session.user.id
//                 }
//             })
//             const result = await prisma.wallet.create({
//                 data: {
//                     type: body.type,
//                     address: body.address,
//                     name: `Wallet ${existingWallets.length + 1}`,
//                     user: {
//                         connect: {id: session.user.id}
//                     }
//                 }
//             })
//             res.status(200).json({status: 'success'})
//         }else if(req.method === 'GET'){
//             const result = await prisma.wallet.findMany({
//                 where: {
//                     userId: session.user.id
//                 }
//             })
//             const custodialCards = await prisma.nFTMintCard.findMany({
//                 where:{
//                     currentOwnerId: session.user.id,
//                     address: 'addr1q8etn97d3h9ekz44znk3hlqsjfz6k95ru3uurqaphe5627txw96lus2g4fj6t697w3xtrvcetvlpmk7yz6tt0ut7s4usvh5cum'
//                 }
//             })
//             res.json({wallets: result, hasCustodialWallet: !!custodialCards.length})
//         }else if(req.method === 'DELETE'){
//             const exists = await prisma.wallet.findFirst({
//                 where: {
//                     address: body.address,
//                     userId: session.user.id
//                 }
//             })
//             if(!exists){
//                 return res.status(404).json({error: 'Wallet address not found.'})
//             }
//             const result = await prisma.wallet.delete({
//                 where: {
//                     address: body.address
//                 }
//             })
//             res.status(200).json({status: 'success'})
//         }else if(req.method === 'PATCH'){
//             const {name, id} = req.body
//             await prisma.wallet.update({
//                 where: {
//                     id,
//                     userId: session.user.id
//                 },
//                 data:{
//                     name
//                 }
//             })
//             res.status(200).json({status: 'success'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }