import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        const users = await prisma.referralUsers.findMany()
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }
}