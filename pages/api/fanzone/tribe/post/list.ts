// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";
// import prisma from "../../../../../lib/prisma";
// import getB2TokenForFileDownload from "../../../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     const { tribeId } = req.body;
//     const userId = session.user.id;

//     const tribeAthlete = await prisma.tribeAthlete.findFirst({
//       where : {
//         tribeId : tribeId,
//         userId : session?.user?.id
//       }
//     })

//     const blockedUsers = await prisma.blockedUser.findMany({
//       where: { blockerId : userId },
//       select: { blockedId: true },
//     });
  
//     const blockedUserIds = blockedUsers.map((entry) => entry.blockedId);

    

//     let posts = await prisma.tribePost.findMany({
//       where: {
//         tribeId,
//         userId : {
//           in: await prisma.user.findMany({
//             select: { id: true },
//           }).then((users) => users.map((user) => user.id)),
//           notIn : blockedUserIds
//         },
//         hiddenBy : {
//           none : {
//             userId
//           }
//         },
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
//                 isMvpzAccount : true,
//                 isMascot : true,
//                 role : true,
//                 isAnonymous : true
//               },
//             },
//           },
//           orderBy: {
//             id: "desc",
//           },
//         },
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             isMvpzAccount : true,
//             isMascot : true,
//             role : true,
//             isAnonymous : true
//           },
//         },
//         claps: {
//           select: {
//             id: true,
//           },
//         },
//         shares: {
//           select: {
//             id: true,
//           },
//         },
//         clovers: {
//           select: {
//             id: true,
//           },
//         },
//         bolts: {
//           select: {
//             id: true,
//           },
//         },
//       },
//       orderBy: {
//         id: "desc",
//       },
//       take: 40,
//     });

//     posts = posts?.filter((_) => !_?.postedBy?.isAnonymous)

//     const getTribeName = async (postId) => {
//       const getTribe = await prisma.tribePost.findFirst({
//         where: {
//           id: postId,
//         },
//         include: {
//           tribe: {
//             select: {
//               organisation: true,
//               tribeName: true,
//             },
//           },
//         },
//       });

//       if (getTribe) {
//         return getTribe?.tribe?.tribeName;
//       }

//       return "";
//     };

//     const getPostType = async (postId) => {
//       const getTribe = await prisma.tribePost.findFirst({
//         where: {
//           id: postId,
//         },
//         include: {
//           tribe: {
//             select: {
//               organisation: true,
//               tribeName: true,
//             },
//           },
//         },
//       });

//       if (getTribe) {
//         return `Feed ${getTribe?.tribe?.tribeName}`;
//       }

//       return "Feed";
//     };


//     const updatedPosts = await Promise.all(
//       posts.map(async (post) => ({
//         ...post,
//         tribeName: await getTribeName(post?.id),
//         postType: await getPostType(post?.id),
//       }))
//     );

//     if (session?.user?.id) {


//       // Fetch claps, clovers, and bolts made by the current user
//       const [claps, clovers, bolts] = await Promise.all([
//         prisma.tClap.findMany({
//           where: {
//             userId,
//             postId: { in: posts.map((post) => post.id) },
//           },
//         }),
//         prisma.tClover.findMany({
//           where: {
//             userId,
//             postId: { in: posts.map((post) => post.id) },
//           },
//         }),
//         prisma.tBolt.findMany({
//           where: {
//             userId,
//             postId: { in: posts.map((post) => post.id) },
//           },
//         }),
//       ]);

//       // Create Sets for quick lookup
//       const clappedPostIds = new Set(claps.map((clap) => clap.postId));
//       const cloveredPostIds = new Set(clovers.map((clover) => clover.postId));
//       const boltedPostIds = new Set(bolts.map((bolt) => bolt.postId));

//       const tipPriceRange = await prisma.postTipRage.findFirst()

//       // Map over posts and add 'hasClapped', 'hasClover', and 'hasBolt' fields
//       const postsWithInteractionStatus = updatedPosts.map((post) => ({
//         ...post,
//         hasClapped: clappedPostIds.has(post.id),
//         hasClover: cloveredPostIds.has(post.id),
//         hasBolt: boltedPostIds.has(post.id),
//         isOwner: post.postedBy.id === userId,
//         total_reactions:
//           post?.claps.length + post?.clovers.length + post?.bolts.length,
//           tipPriceRange
//       }));

//       console.log({
//         hello : "hello"
//       });
      

//       const b2res = (await getB2TokenForFileDownload()) as any;
//       return res.status(200).json({
//         posts: postsWithInteractionStatus,
//         accessToPost : tribeAthlete ? false : true, 
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     } else {
//       const postsWithTotalReactions = updatedPosts.map((post) => ({
//         ...post,
//         total_reactions:
//           post?.claps.length + post?.clovers.length + post?.bolts.length, // Total reactions for non-authenticated users
//       }));

//       const b2res = (await getB2TokenForFileDownload()) as any;
//       return res.status(200).json({
//         posts: postsWithTotalReactions,
//         accessToPost : tribeAthlete ? false : true, 
//         imageDownload: {
//           downloadUrl: b2res.downloadUrl,
//           authorizationToken: b2res.authorizationToken,
//         },
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
