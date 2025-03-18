import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method === 'POST'){
            const cardBody = req.body
            const result = await prisma.nFTEntity.update({
                where:{
                    id: cardBody.id
                },
                data: {
                    title                  :  cardBody.title,
                    description            :  cardBody.description,
                    type                   :  cardBody.type,
                    sport                  :  cardBody.sport,
                    rarity                 :  cardBody.rarity,
                    position               :  cardBody.position,
                    sex                    :  cardBody.sex,
                    special                :  cardBody.special,
                    school                 :  cardBody.school,
                    design                 :  cardBody.design,
                    designer               :  cardBody.designer,
                    edition                :  cardBody.edition,
                    serialNumberStart           :  cardBody.serialNumberStart,
                    medal                  :  cardBody.medal,
                    year                   :  cardBody.year,
                    mintQuantity           :  cardBody.mintQuantity,
                    mintDatetime           :  cardBody.mintDatetime,
                    maxQuantity            :  cardBody.maxQuantity,
                    packQuantity           :  cardBody.packQuantity,
                    separatelySoldQuantity :  cardBody.separatelySoldQuantity,
                    enhancementQuantity    :  cardBody.enhancementQuantity,
                    price                  :  cardBody.price,
                    mintAthleteShare       :  cardBody.mintAthleteShare,
                    tradeAthleteShare      :  cardBody.tradeAthleteShare,
                    mintArtistShare        :  cardBody.mintArtistShare,
                    tradeArtistShare       :  cardBody.tradeArtistShare,
                    referrerShare          :  cardBody.referrerShare,
                    affiliateShare         :  cardBody.affiliateShare,
                    cardImageDisplay       :  cardBody.cardImageDisplay,
                    cardImageNFT           :  cardBody.cardImageNFT,
                    membershipTier         :  cardBody.membershipTier,
                    createdAt              : cardBody.createdAt ? cardBody.createdAt : new Date(),
                    updatedAt              : cardBody.updatedAt ? cardBody.updatedAt : new Date(),
                    currentOwner         :  {
                        connect: {id: cardBody.currentOwner.id}
                    },
                    athlete: {
                        connect: {id: cardBody.athleteId ? cardBody.athleteId : cardBody.athlete? cardBody.athlete.id : null},
                    },
                    project: {
                        connect: {id: cardBody.projectId}
                    }
                }
            })
            res.status(200).json(result)
        }else{
            res.status(400).json({error: 'ONLY POST ALLOWED'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }

}