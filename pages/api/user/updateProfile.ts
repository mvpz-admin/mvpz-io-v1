// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import prisma from "../../../lib/prisma";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//     try{
//         const session = await getServerSession(req, res, authOptions)
//         if(req.method === 'POST' && session?.user?.email){
//             const userBody = req.body
//             const result = await prisma.user.update({
//                 where: {email: session.user.email},
//                 data: {
//                     name: userBody.name,
//                     firstname: userBody.firstname,
//                     lastname: userBody.lastname,
//                     username: userBody.username,
//                     mobile: userBody.mobile,
//                     image                : userBody.image,
//                     bannerImage          : userBody.bannerImage,
//                     cardImage            : userBody.cardImage,
//                     aboutMe              : userBody.aboutMe,
//                     role                 : userBody.role,
//                     sex                  : userBody.sex,
//                     currentSchool        : userBody.currentSchool,
//                     previousSchool       : userBody.previousSchool,
//                     conference           : userBody.conference,
//                     primarySport         : userBody.primarySport,
//                     secondarySport       : userBody.secondarySport,
//                     primaryPosition      : userBody.primaryPosition,
//                     secondaryPosition    : userBody.secondaryPosition,
//                     remainingEligibility : userBody.remainingEligibility || 0,
//                     homeTown             : userBody.homeTown,
//                     cardanoWalletAvailable: userBody.cardanoWalletAvailable,
//                     favoriteCollegeTeam  : userBody.favoriteCollegeTeam,
//                     tribeValuablePlayer  : userBody.tribeValuablePlayer,
//                     tribeSport           : userBody.tribeSport,
//                     tribeTeam            : userBody.tribeTeam,
//                     takeOfWeekText       : userBody.takeOfWeekText,
//                     highlightVideoUrl    : userBody.highlightVideoUrl,
//                     inspiration          : userBody.inspiration,
//                     socialLinks: {
//                         update: userBody.socialLinks?.filter(social => !!social.id).map(social => {
//                             return {
//                                 where: {id: social.id},
//                                 data: {link: social.link}
//                             }
//                         }),
//                         create: userBody.socialLinks?.filter(social => !social.id).map(social => {
//                             return {socialBrand: social.socialBrand, link: social.link}
//                         }),
//                     }
//                 }
//             })
//             res.status(200).json(result)
//         }else{
//             res.status(400).json({error: 'ONLY POST ALLOWED'})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error: 'Internal server error'})
//     }

// }