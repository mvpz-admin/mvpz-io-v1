// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { fetchCardanoAssets } from "../../../lib/blockfrostService";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         // if(!session || !session.user || session.user.role !== 'Admin') return res.json(null)

//         const result = await fetchCardanoAssets(req.query.address.toString())
//         const card: any = await prisma.nFTMintCard.findFirst({
//             where: {
//                 address: req.query.address.toString()
//             },
//             include: {
//                 currentOwner: true
//             }
//         })
//         res.json({user: card.currentOwner?.username || 'None', cards: result })
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }
// }