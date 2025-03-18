// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";
// import { authOptions } from "../../auth/[...nextauth]";


// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         if(req.method === 'GET'){
//          const session = await getServerSession(req, res, authOptions);

//          const marked = await prisma.notification.updateMany({
//             where : {userId :session?.user?.id},
//             data : {
//                 isRead : true
//             }
//          })

//          if(!marked){
//             return res.status(500).json({success : false, error : "Something went wrong, notification not marked as read."})
//          }

//          return res.status(200).json({success : true, message : "Notification Marked Read successfully!"})
//         }else{
//             res.status(400).json({message: 'Method Not Allowed'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }