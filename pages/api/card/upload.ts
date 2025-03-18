
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
            for(let cardBody of cards){
                let cardImageNFT = `Gen1/24/special/school/kansas_state/wbasketball/${cardBody.type.toLowerCase()}/`
                let serialNumberStart = cardBody.serialNumberStart < 10 ? `00${cardBody.serialNumberStart}` : cardBody.serialNumberStart < 100 ? `0${cardBody.serialNumberStart}` : cardBody.serialNumberStart
                if(cardBody.type === 'Athlete'){
                    const names = cardBody.title.split(' ')
                    const firname = names[0].toLowerCase().slice(0,3)
                    const lastname = names[1].toLowerCase().slice(0,3)
                    const designer = cardBody.designer.split(' ')
                    const design = getCardDesignForFileName(cardBody.design)
                    cardImageNFT += `${firname}_${lastname}_${cardBody.onboardingNo}/${designer[0].toLowerCase()}/${design}_${serialNumberStart}.png`
                }else if(cardBody.type === 'Championship'){
                    serialNumberStart = cardBody.serialNumberStart < 10 ? `0${cardBody.serialNumberStart}` : cardBody.serialNumberStart
                    cardImageNFT += `22_23_national_champions/${cardBody.designer.toLowerCase()}/${cardBody.sex.toLowerCase()}_${cardBody.sport.toLowerCase()}_${serialNumberStart}.png`
                }else if(cardBody.type === 'Activity'){
                    cardImageNFT += `${cardBody.sport.toLowerCase().replaceAll(' ','_')}/${cardBody.designer.toLowerCase()}/${cardBody.medal.toLowerCase()}_${cardBody.design.toLowerCase().slice(0,3)}.png`
                }else if(cardBody.type === 'Team'){
                    serialNumberStart = cardBody.serialNumberStart < 10 ? `0${cardBody.serialNumberStart}` : cardBody.serialNumberStart
                    const title = cardBody.title.toLowerCase().replaceAll(' ','')
                    cardImageNFT += `23_24_season/${cardBody.designer.toLowerCase()}/${title}_${serialNumberStart}.png`
                }
                const data = {
                    title                  :  cardBody.title,
                    type                   :  cardBody.type,
                    sport                  :  cardBody.sport,
                    position               :  cardBody.position,
                    sex                    :  cardBody.sex,
                    special                :  cardBody.special,
                    school                 :  cardBody.school,
                    design                 :  cardBody.design,
                    designer               :  cardBody.designer,
                    medal                  :  cardBody.medal,
                    year                   :  cardBody.year.toString(),
                    mintQuantity           :  cardBody.mintQuantity,
                    maxQuantity            :  cardBody.maxQuantity,
                    packQuantity           :  cardBody.packQuantity,
                    separatelySoldQuantity :  cardBody.separatelySoldQuantity,
                    enhancementQuantity    :  cardBody.enhancementQuantity,
                    mintAthleteShare       :  cardBody.mintAthleteShare,
                    tradeAthleteShare      :  cardBody.tradeAthleteShare,
                    cardImageNFT           :  cardImageNFT,
                    serialNumberStart      :  cardBody.serialNumberStart,
                    onboardingNo           :  cardBody.onboardingNo,
                    randomFactor           :  cardBody.randomFactor,
                    createdAt              :  new Date(),
                    updatedAt              :  new Date(),
                    currentOwner         :  {
                        connect: {id: cardBody.currentOwnerId}
                    },
                    project: {
                        connect: {id: cardBody.projectId}
                    }
                }
                if(cardBody.type === 'Athlete'){
                    data['athlete'] = {
                        connect: {id: cardBody.athleteId},
                    }
                }
                
                const result = await prisma.nFTEntity.create({data})
            }
            res.status(200).json('SUCCESS')
        }else{
            res.status(400).json({error: 'ONLY POST ALLOWED'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }

}