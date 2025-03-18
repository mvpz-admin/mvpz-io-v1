import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method === 'POST'){
            const userBody = req.body
            const result = await prisma.user.update({
                where: {
                    id: userBody.id
                },
                data:{
                    onboardingNo: userBody.onboardingNo
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