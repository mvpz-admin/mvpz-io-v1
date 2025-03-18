import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const getXPFactor = (factors, type, membership) => {
    switch(type){
        case 'Athlete':
        case 'Activity':
            const match = factors.find(f => f.type === type && f.membershipTier === membership)
            return match?.factorValue || 1
        case 'Championship':
        case 'Team':
            const match2 = factors.find(f => f.type === type)
            return match2?.factorValue || 1
        default:
            return 1
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        const cards = await prisma.nFTMintCard.findMany({
            where: {
                address:  {not: null}
            },
            include: {
                currentOwner: true,
                nftEntity: true
            }
        })
        const factors = await prisma.xPFactor.findMany()
        let groupByUsers = {}
        for(let card of cards){
            if(card.address === 'addr1q8etn97d3h9ekz44znk3hlqsjfz6k95ru3uurqaphe5627txw96lus2g4fj6t697w3xtrvcetvlpmk7yz6tt0ut7s4usvh5cum'){
                if(!groupByUsers[card.currentOwnerId]){
                    groupByUsers[card.currentOwnerId] = []
                }
                groupByUsers[card.currentOwnerId].push({...card, isCustodial: true})
            }else{
                if(!groupByUsers[card.address]){
                    groupByUsers[card.address] = []
                }
                groupByUsers[card.address].push(card)
            }
        }
        let finalUsers = []
        for(let user in groupByUsers){
            const userCards = groupByUsers[user]
            let xpScore = 0
            let name = 'Anonymous'
            for(let card of userCards){
                xpScore += getXPFactor(factors, card.nftEntity.type, card.nftEntity.membershipTier)
                if(card.currentOwner){
                    name =  card.currentOwner.username ? card.currentOwner.username : 'Anonymous'
                }
            }
            finalUsers.push({
                name,
                cardCount: userCards.length,
                address: userCards[0].isCustodial ? 'Custodial Wallet' : user,
                xpScore
            })
        }
        finalUsers.sort((a,b) => {
            if(a.xpScore > b.xpScore) return -1
        })
        return res.status(200).json({users: finalUsers})
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const users = await prisma.nFTMintCard.groupBy({
//             by: 'address',
//             where: {
//                 address: {not: null}
//             },
//             _count: {
//                 address: true
//             },
//             orderBy: {
//                 _count: {
//                     address: 'desc'
//                 }
//             }
//         })
//         let finalUsers = []
//         for (let user of users){
//             if(user.address === 'addr1q8etn97d3h9ekz44znk3hlqsjfz6k95ru3uurqaphe5627txw96lus2g4fj6t697w3xtrvcetvlpmk7yz6tt0ut7s4usvh5cum'){
//                 const result:any = await prisma.nFTMintCard.findMany({
//                     where: {
//                         address: user.address
//                     },
//                     include: {
//                         currentOwner: true
//                     }
//                 })
//                 finalUsers.push({
//                     name: result.currentOwner ? result.currentOwner.firstname || result.currentOwner.name || result.currentOwner.username || result.currentOwner.email : 'Anonymous',
//                     cardCount: user._count.address,
//                     address: user.address
//                 })
//             }else{
//                 const result:any = await prisma.nFTMintCard.findFirst({
//                     where: {
//                         address: user.address
//                     },
//                     include: {
//                         currentOwner: true
//                     }
//                 })
//                 finalUsers.push({
//                     name: result.currentOwner ? result.currentOwner.firstname || result.currentOwner.name || result.currentOwner.username || result.currentOwner.email : 'Anonymous',
//                     cardCount: user._count.address,
//                     address: user.address
//                 })
//             }
//         }
//         return res.status(200).json({users: finalUsers})
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }
// }