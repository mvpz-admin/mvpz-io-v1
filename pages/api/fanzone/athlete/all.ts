import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import getB2TokenForFileDownload from "../../../../lib/backBlaze";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        const athletes = await prisma.user.findMany({
            where: {
                role: 'Athlete',
                OR: [
                    { currentSchool: "UCLA" },
                    { currentSchool: "University of California Los Angeles" },
                  ],
            }
        })

    const b2res = await getB2TokenForFileDownload() as any
    return res.status(200).json({athletes, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
    }catch(err){
        res.status(500).json({error: 'Internal server error'})
    }

}