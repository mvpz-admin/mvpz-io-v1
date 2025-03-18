import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        const projects = await prisma.project.findMany()
        res.status(200).json(projects)
    }catch(err){
        res.status(500).json({error: 'Internal server error'})
    }

}