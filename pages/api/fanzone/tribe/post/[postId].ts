// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { postId } = req.query;

//   if (!postId || typeof postId !== "string") {
//     return res.status(400).json({ error: "Post ID is required and must be a string" });
//   }

//   try {
//     const session = await getServerSession(req, res, authOptions);

//     const post = await prisma.tribePost.findUnique({
//       where: { 
//         id: postId as string,
//         postedBy: { isNot: null },
//       },
//       include: {
//         media: true,
//         comments: {
//           include: {
//             replies: true,
//             likes: true,
//             postedBy: {
//               select: {
//                 id: true,
//                 username: true,
//                 image: true, 
//                 role : true,
//                 isAnonymous : true
//               }
//             }
//           },
//           orderBy: {
//             id: "desc"
//           }
//         },
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             isMvpzAccount : true,
//             isMascot : true,
//             role : true,
//             isAnonymous : true,
//           }
//         },
//         claps: {
//           select: {
//             id: true
//           }
//         },
//         shares: {
//           select: {
//             id: true
//           }
//         },
//         clovers: {
//           select: {
//             id: true
//           }
//         },
//         bolts: {
//           select: {
//             id: true
//           }
//         }
//       }
//     });

//     console.log({
//       post
//     });
    

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     if(post?.postedBy?.isAnonymous){
//       return res.status(200).json({
//         success: true,
//         postDeleted : true,
//       })
//     }

//     const getTribeName = async (postId) => {
//       const getTribe = await prisma.tribePost.findFirst({
//         where: {
//           id: postId,
//         },
//         include: {
//           tribe: {
//             select: {
//               organisation: true,
//             },
//           },
//         },
//       });

//       if (getTribe) {
//         return `Feed ${getTribe.tribe.organisation.shortName}`;
//       }

//       return "Feed";
//     };

//     if (session?.user?.id) {
//       const userId = session.user.id;

//       // Fetch claps, clovers, and bolts made by the current user for this post
//       const [clap, clover, bolt] = await Promise.all([
//         prisma.tClap.findFirst({
//           where: { userId, postId }
//         }),
//         prisma.tClover.findFirst({
//           where: { userId, postId }
//         }),
//         prisma.tBolt.findFirst({
//           where: { userId, postId }
//         })
//       ]);

//       const totalClaps = post.claps.length;
//       const totalClovers = post.clovers.length;
//       const totalBolts = post.bolts.length;

//       const totalReactions = totalClaps + totalClovers + totalBolts;
      
//       const tipPriceRange = await prisma.postTipRage.findFirst()

//       // Add 'hasClapped', 'hasClover', and 'hasBolt' fields to the post
//       const postWithInteractionStatus = {
//         ...post,
//         hasClapped: !!clap, // true if the user has clapped the post
//         hasClover: !!clover, // true if the user has added a clover
//         hasBolt: !!bolt, // true if the user has sent a bolt
//         isOwner: post.postedBy.id === userId,
//         tribeName : await getTribeName(post?.id),
//         total_reactions : totalReactions,
//         tipPriceRange
//       };

//       const b2res = await getB2TokenForFileDownload() as any
//       return res.status(200).json({post : postWithInteractionStatus, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//     }
//     else{
  
//       const totalClaps = post.claps.length;
//       const totalClovers = post.clovers.length;
//       const totalBolts = post.bolts.length;

//       const totalReactions = totalClaps + totalClovers + totalBolts;

//       const b2res = await getB2TokenForFileDownload() as any
//       return res.status(200).json({post : {
//         ...post, 
//         total_reactions : totalReactions,
//         tribeName : await getTribeName(post?.id),
//       } , imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//     }
     
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }
