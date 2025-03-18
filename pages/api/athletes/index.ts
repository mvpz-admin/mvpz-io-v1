import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        const athletes = await prisma.user.findMany({
        })
        res.status(200).json(athletes?.filter((_) => _.isMvpzAccount !== true && _.isMvpzTestingAccount !== true ))
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }

}