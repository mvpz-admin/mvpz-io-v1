// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "DELETE") {
//       const session = await getServerSession(req, res, authOptions);

//       if (!session || !session.user?.id) {
//         return res.status(401).json({ success: false, error: "Unauthorized" });
//       }

//       const userId = session.user.id;

//       // Delete tribe membership
//       await prisma.tribeMember.deleteMany({
//         where: { userId },
//       });

//       // Find the anonymous user
//       const getAnonymousUser = await prisma.user.findFirst({
//         where: { isAnonymous: true },
//       });

//       if (!getAnonymousUser) {
//         return res.status(404).json({
//           success: false,
//           error: "Anonymous user not found.",
//         });
//       }

//       const anonymousUserId = getAnonymousUser.id;

//       // Perform updates explicitly for each model
//       await Promise.all([
//         prisma.post.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.comment.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.clap.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.bolt.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.clover.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.reply.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.like.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tribePost.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tComment.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tClap.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tBolt.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tClover.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tReply.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tLike.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tribeShout.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tShtComment.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tShtClap.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tShtBolt.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tShtClover.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tShtReply.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//         prisma.tShtLike.updateMany({
//           where: { userId },
//           data: { userId: anonymousUserId },
//         }),
//       ]);

//       // Delete the user

//       if(session?.user?.role == "athlete"){
//         await prisma.user.update({
//           where : {
//             id : session?.user?.id
//           },
//           data : {
//             email : `mvpz.team+${session?.user?.username}gmail.com`,
//             image : null,
//             aboutMe : "",
//             bannerImage : "",
//             emailVerified : null,
//             homeTown : null,
//             webStripeId : null,
//             firstname  : null,
//             isDeleted : true,
//             lastname : null,
//             instagramVerified : false,
//             socialLinks : {},
            
//           }
//         })
//       }
//       else{
//         await prisma.user.delete({
//           where: { id: userId },
//         });
//       }

      

//       // Clear the session cookie
//       res.setHeader("Set-Cookie", [
//         "next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
//         "next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly",
//       ]);

//       // Redirect to home page
//       res.writeHead(302, { Location: "/" });
//       res.end();
//     } else {
//       res.status(405).json({ success: false, error: "Method Not Allowed" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       error: "An error occurred while processing the request.",
//     });
//   }
// }
