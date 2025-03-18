// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../../../../../lib/prisma";
// import getB2TokenForFileDownload from "../../../../../../../../lib/backBlaze";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { commentId } = req.query;

//   if (!commentId || typeof commentId !== "string") {
//     return res.status(400).json({ error: "Comment ID is required and must be a string" });
//   }

//   switch (req.method) {
//     case "GET":
//       return fetchReplies(req, res, commentId);
//     default:
//       res.setHeader("Allow", ["GET"]);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// // Fetch all replies for a given comment
// async function fetchReplies(req: NextApiRequest, res: NextApiResponse, commentId: string) {
//   try {
//     let replies = await prisma.tReply.findMany({
//       where: {
//         commentId: commentId,
//       },
//       include: {
//         postedBy: {
//           select: {
//             id: true,
//             username: true,
//             image: true,
//             role : true,
//             isAnonymous : true
//           },
//         },
//       },
//       orderBy: {
//         id: 'desc',
//       },
//     });



//     const b2res = await getB2TokenForFileDownload() as any
//       return res.status(200).json({replies, imageDownload: {downloadUrl: b2res.downloadUrl, authorizationToken: b2res.authorizationToken}})
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }
