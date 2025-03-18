import { NFTEntity, NFTMintCard } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method === 'GET'){
            const allEntities:NFTEntity[] = await prisma.nFTEntity.findMany({
                select: {'id': true,'title': true,'serialNumberStart': true, 'mintQuantity': true, 'design': true, 'designer': true, 'type': true, 'onboardingNo': true,
                }  
                
            }) as NFTEntity[]
            let finalMintCards = []
            let _mintCards:NFTMintCard[] = await prisma.nFTMintCard.findMany({
                select:{id: true, 'serialNumber': true, "nftEntityId": true}
            }) as NFTMintCard[]
            for (const entity of allEntities){
                
                let mintCards = _mintCards.filter(m => m.nftEntityId === entity.id)
                let type = 'A'
                if(entity.type === 'Activity'){
                    type='ACT'
                }else if(entity.type === 'Team'){
                    type = 'T'
                }else if(entity.type === 'Championship'){
                    type = 'C'
                }
                mintCards.sort((a,b) => {
                    if(+a.serialNumber < +b.serialNumber){
                        return -1
                    }else if(+a.serialNumber > +b.serialNumber){
                        return 1
                    }else{
                        return 0
                    }
                })
                let serialNumberStart = entity.serialNumberStart
                for (const mintCard of mintCards){
                    let serialNumber = serialNumberStart < 10 ? `00${serialNumberStart}` : serialNumberStart < 100 ? `0${serialNumberStart}` : serialNumberStart
                    mintCard.cardSerialNumber = `G123${type}${entity.onboardingNo}-${serialNumber}`
                    serialNumberStart++
                    finalMintCards.push({...mintCard, title: entity.title, mintQuantity: entity.mintQuantity, design: entity.design, onboardingNo: entity.onboardingNo, id: entity.id, serialNumberStart: entity.serialNumberStart, type: entity.type})
                    await prisma.nFTMintCard.update({
                        where: {
                            id: mintCard.id
                        },
                        data: {
                            cardSerialNumber: mintCard.cardSerialNumber
                        }
                    })
                }
            }
            res.status(200).json(finalMintCards)
        }else{
            res.status(400).json({error: 'ONLY POST ALLOWED'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }

}