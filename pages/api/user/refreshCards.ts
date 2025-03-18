// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";
// import { fetchAddressOfAsset, fetchCardanoAssets } from "../../../lib/blockfrostService";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(!session || !session.user){
//             return {
//                 redirect: {
//                 destination: '/',
//                 permanent: false,
//                 },
//             }
//         }
//         const wallets = await prisma.wallet.findMany({
//             where:{
//                 userId: session.user.id
//             }
//         })
//         if(!wallets.length) return res.json({message: "There are no wallets connected. Please connect wallet to continue."})
//         let notOwnedCards = {}
//         for(let wallet of wallets){
//             const mvpzAssets = await fetchCardanoAssets(wallet.address)
//             const cards = await prisma.nFTMintCard.findMany({
//                 where:{
//                     address: wallet.address
//                 }
//             })
//             for(let card of cards){
//                 let match = mvpzAssets.find(name => name === card.assetName)
//                 if(!match){
//                     if(!notOwnedCards[wallet.address]) notOwnedCards[wallet.address] = []
//                     notOwnedCards[wallet.address].push(card)
//                 }else if(!card.currentOwnerId){
//                     await prisma.nFTMintCard.update({
//                         where:{
//                             id: card.id
//                         },
//                         data:{
//                             currentOwnerId: session.user.id
//                         }
//                     })
//                 }
//             }
//         }
//         for(let address in notOwnedCards){
//             const cards = notOwnedCards[address]
//             for (let card of cards){
//                 const newAddress = await fetchAddressOfAsset(card.assetName)
//                 if(!!newAddress){
//                     // make an entry in the AssetTransferLog table
//                     await prisma.assetTransferLog.create({
//                         data: {
//                             oldAddress: address,
//                             newAddress,
//                             assetName: card.assetName,
//                             nftMintCard: {
//                                 connect: {id: card.id}
//                             }
//                         }
//                     })
//                     const existingUser = await prisma.wallet.findUnique({
//                         where: {
//                             address: newAddress
//                         }
//                     })
//                     // modify the address in nftmintcard
//                     await prisma.nFTMintCard.update({
//                         where: {
//                             id: card.id
//                         },
//                         data:{
//                             address: newAddress,
//                             currentOwnerId: !!existingUser ? existingUser.userId : null
//                         }
//                     })
//                 }
//             }
//         }
//         await prisma.user.update({
//             where:{
//                 id: session.user.id
//             },
//             data:{
//                 cardsRefreshDate: new Date()
//             }
//         })
//         res.status(200).json(true)
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }