// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";


// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         if(req.method === 'GET'){
//          const session = await getServerSession(req, res, authOptions);

//          const clear = await prisma.notification.deleteMany({
//             where : {userId :session?.user?.id}
//          })

//          if(!clear){
//             return res.status(500).json({success : false, error : "Something went wrong, please try again."})
//          }

//          return res.status(200).json({success : true, message : "Notification Cleared successfully!"})
//         }else{
//             res.status(400).json({message: 'Method Not Allowed'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }