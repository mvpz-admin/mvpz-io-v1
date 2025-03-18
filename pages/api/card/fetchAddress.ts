// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { fetchAddressOfAsset } from "../../../lib/blockfrostService";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(!session || !session.user || session.user.role !== 'Admin') return res.json(null)

//         const result = await fetchAddressOfAsset(req.query.name.toString())
//         res.json(result)
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }
// }