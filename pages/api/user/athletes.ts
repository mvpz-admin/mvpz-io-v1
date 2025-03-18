import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const athletes = await prisma.user.findMany({
            where: {
                role: 'Athlete',
            }
        });
        
        res.status(200).json(athletes?.filter((_) => _.isMvpzAccount !== true && _.isMvpzTestingAccount !== true ));
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
