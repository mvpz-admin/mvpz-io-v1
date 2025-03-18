
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method === 'POST'){
            const mintCards = await prisma.nFTMintCard.findMany()
            let purchaseCards = []
            for(let card of mintCards){
                if(!card.address){
                    purchaseCards.push({
                        assetName: card.assetName,
                        serialNumber: parseInt(card.serialNumber),
                        cardSerialNumber: card.cardSerialNumber,
                        nftEntityId: card.nftEntityId
                    })
                }
            }
            const result = await prisma.nFTPurchaseCard.createMany({
                data: purchaseCards
            })
            res.status(200).json('SUCCESS')
        }else{
            res.status(400).json({error: 'ONLY POST ALLOWED'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }

}