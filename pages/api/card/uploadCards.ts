
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

function getCardDesignForFileName(design){
    switch(design){
        case '1 of 1':
            return '1of1';
        case 'Base':
            return 'base';
        case 'Enhance 1':
            return 'enh1';
        case 'Enhance 2':
            return 'enh2';
    }
}
const cards = []
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method === 'POST'){
            const entities = await prisma.nFTEntity.findMany({
                where: {
                    projectId: "65fc83b8fa035dc95cf4be12"
                }
            })
            let purchaseCards = []
            let serialNo = 0
            for(let entity of entities){
                let serialNumberStart = entity.serialNumberStart
                let count = entity.packQuantity
                // let count = 50
                while(count-- > 0){
                    let serialNumber = serialNumberStart < 10 ? `00${serialNumberStart}` : serialNumberStart < 100 ? `0${serialNumberStart}` : serialNumberStart
                    serialNumberStart++
                    purchaseCards.push({
                        serialNumber: ++serialNo,
                        cardSerialNumber: `G124A${entity.onboardingNo}-${serialNumber}`,
                        nftEntityId: entity.id
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