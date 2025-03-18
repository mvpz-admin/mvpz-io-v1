// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";
// import getB2TokenForFileDownload from "../../../lib/backBlaze";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user) {
//       return res
//         .status(403)
//         .json({ status: "fail", message: "User not authenticated" });
//     }

//     const { id: userId } = session.user;
//     // const { skip = 0, take = 10 } = req.query;

//     const blockedUsers = await prisma.blockedUser.findMany({
//       where: { blockerId: userId },
//       select: { blockedId: true },
//     });

//     const blockedUserIds = blockedUsers.map((entry) => entry.blockedId);

//     // const totalPostCount = await prisma.post.count();

//     let posts = await prisma.post.findMany({
//       where: {
//         userId: {
//           in: await prisma.user
//             .findMany({
//               select: { id: true },
//             })
//             .then((users) => users.map((user) => user.id)),
//           notIn: blockedUserIds,
//         },
//         hiddenBy: {
//           none: {
//             userId,
//           },
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
//                 role: true,
//                 isAnonymous: true,
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
//             isMascot: true,
//             isMvpzAccount: true,
//             role: true,
//             isAnonymous: true,
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
//       // skip: parseInt(skip as string, 10), // Skip offset
//       // take: parseInt(take as string, 10), // Number of items to fetch
//     });

//     posts = posts?.filter((_) => !_?.postedBy?.isAnonymous);

//     if (session?.user?.id) {
//       const userId = session.user.id;

//       const updatedPosts = await Promise.all(
//         posts.map(async (post) => ({
//           ...post,
//           tribeName: null,
//           postType: "Feed",
//         }))
//       );

//       // Fetch claps, clovers, and bolts made by the current user
//       const [claps, clovers, bolts] = await Promise.all([
//         prisma.clap.findMany({
//           where: {
//             userId,
//             postId: { in: posts.map((post) => post.id) },
//           },
//         }),
//         prisma.clover.findMany({
//           where: {
//             userId,
//             postId: { in: posts.map((post) => post.id) },
//           },
//         }),
//         prisma.bolt.findMany({
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

//       const tipPriceRange = await prisma.postTipRage.findFirst();

//       // Map over posts and add 'hasClapped', 'hasClover', and 'hasBolt' fields
//       const postsWithInteractionStatus = updatedPosts.map((post) => ({
//         ...post,
//         hasClapped: clappedPostIds.has(post.id),
//         hasClover: cloveredPostIds.has(post.id),
//         hasBolt: boltedPostIds.has(post.id),
//         isOwner: post.postedBy.id === userId,
//         tribeName: "Feed",
//         total_reactions:
//           post?.claps.length + post?.clovers.length + post?.bolts.length,
//         tipPriceRange,
//       }));


//       const b2res = (await getB2TokenForFileDownload()) as any;
//       return res
//         .status(200)
//         .json({
//           success : true,
//           data : {
//             posts: postsWithInteractionStatus,
      
//             imageDownload: {
//               downloadUrl: b2res.downloadUrl,
//               authorizationToken: b2res.authorizationToken,
//             },
//           }
//         });
//     } else {
//       const postsWithTotalReactions = posts.map((post) => ({
//         ...post,
//         total_reactions:
//           post?.claps.length + post?.clovers.length + post?.bolts.length, // Total reactions for non-authenticated users
//       }));

//       const b2res = (await getB2TokenForFileDownload()) as any;
//       return res
//         .status(200)
//         .json({
//           posts: postsWithTotalReactions,
//           imageDownload: {
//             downloadUrl: b2res.downloadUrl,
//             authorizationToken: b2res.authorizationToken,
//           },
//         });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
