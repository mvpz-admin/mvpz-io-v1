// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../../../lib/backBlaze";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { postId } = req.query;

//     if (!postId || typeof postId !== "string") {
//       return res.status(400).json({ error: "Post ID is required" });
//     }

//     const session = await getServerSession(req, res, authOptions);
//     const userId = session?.user?.id || null;

//     // Fetch all reactions for the post
//     const [claps, clovers, bolts] = await Promise.all([
//       prisma.tClap.findMany({
//         where: { 
//           postId,
//           userId : {
//             in: await prisma.user.findMany({
//               select: { id: true },
//             }).then((users) => users.map((user) => user.id)),
//           },
//          },
//         include: { postedBy: { select: { id: true, username: true, image: true,role : true , isAnonymous : true} } },
//       }),
//       prisma.tClover.findMany({
//         where: { 
//           postId,
//           userId : {
//             in: await prisma.user.findMany({
//               select: { id: true },
//             }).then((users) => users.map((user) => user.id)),
//           },
//          },
//         include: { postedBy: { select: { id: true, username: true, image: true,role : true , isAnonymous : true} } },
//       }),
//       prisma.tBolt.findMany({
//         where: { 
//           postId,
//           userId : {
//             in: await prisma.user.findMany({
//               select: { id: true },
//             }).then((users) => users.map((user) => user.id)),
//           },
//          },
//         include: { postedBy: { select: { id: true, username: true, image: true,role : true , isAnonymous : true} } },
//       }),
//     ]);

//     // Helper function to move the current user's reaction to the top and set `isPinned: true`
//     const pinUserReaction = (reactions: any[], userId: string | null) => {
//       if (!userId) return reactions;

//       const userReactionIndex = reactions.findIndex((reaction) => reaction.postedBy.id === userId);
//       if (userReactionIndex !== -1) {
//         const userReaction = reactions.splice(userReactionIndex, 1)[0];
//         userReaction.isPinned = true;
//         reactions.unshift(userReaction);
//       }
//       return reactions;
//     };

//     // Pin the user's reactions if they exist
//     const clapsWithPinned = pinUserReaction(claps, userId);
//     const cloversWithPinned = pinUserReaction(clovers, userId);
//     const boltsWithPinned = pinUserReaction(bolts, userId);

//     const b2res = await getB2TokenForFileDownload() as any
//     return res.status(200).json({reactions : {
//         claps: clapsWithPinned,
//         clovers: cloversWithPinned,
//         bolts: boltsWithPinned,
//       }, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})


//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
