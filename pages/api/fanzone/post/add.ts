// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session || !session.user)
//       return res
//         .status(403)
//         .json({ status: "fail", message: "user not authenticated" });
//     const { id: userId } = session?.user;
//     if (req.method === "POST") {
//       const { message, mediaList } = req.body;
//       let response = await prisma.post.create({
//         data: {
//           message,
//           media: {
//             create: mediaList,
//           },
//           comments: {
//             create: [],
//           },
//           userId:userId,
//           shares: {
//             create: [],
//           },
//           claps: {
//             create: [],
//           },
//           clovers: {
//             create: [],
//           },
//           bolts: {
//             create: [],
//           },
//         },
//         include: {
//           media: true,
//           comments: {
//             include: {
//               replies: true,
//               likes: true,
//               postedBy: {
//                 select: {
//                   id: true,
//                   username: true,
//                   image: true,
//                   role: true,
//                   isAnonymous: true,
//                 },
//               },
//             },
//             orderBy: {
//               id: "desc",
//             },
//           },
//           postedBy: {
//             select: {
//               id: true,
//               username: true,
//               image: true,
//               isMascot: true,
//               isMvpzAccount: true,
//               role: true,
//               isAnonymous: true,
//             },
//           },
//           claps: {
//             select: {
//               id: true,
//             },
//           },
//           shares: {
//             select: {
//               id: true,
//             },
//           },
//           clovers: {
//             select: {
//               id: true,
//             },
//           },
//           bolts: {
//             select: {
//               id: true,
//             },
//           },
//         },
//       });



//       const userid = session.user.id;

//       const updatedPosts = {
//         ...response,
//         tribeName: null,
//         postType: "Feed",
//       }

//       const tipPriceRange = await prisma.postTipRage.findFirst();

//       const postsWithInteractionStatus = {
//         ...updatedPosts,
//         hasClapped: false,
//         hasClover: false,
//         hasBolt: false,
//         isOwner: response.postedBy.id === userid,
//         tribeName: "Feed",
//         total_reactions:0,
//         tipPriceRange,
//       }


//       return res.status(200).json({
//         success : true,
//         data : {
//           post : postsWithInteractionStatus
//         }
//       });
//     }
//   } catch (err) {
//     console.log(err);

//     return await prisma.logError.create({
//       data: {
//         apiName: "/api/fanzone/post/add",
//         collection: "Post",
//         errorLog: `${err}`,
//         title: "Error While creating post in Public Feed ",
//       },
//     });


//     res.status(500).json({ error: "Internal server error" });
//   }
// }
