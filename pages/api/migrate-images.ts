// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
// import prisma from "../../lib/prisma";

// const B2_APPLICATION_KEY_ID = process.env.B2_APPLICATION_KEY_ID!;
// const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY!;
// const OLD_BUCKET = "mvpz-user-private";
// const NEW_BUCKET = "mvpz-ncaa";
// const NEW_PATH = "user-profiles/prod";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Step 1: Get Authorization Token for Backblaze API
//     const authResponse = await axios.post(
//       "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
//       {},
//       {
//         auth: {
//           username: "005c3d5d949b83d000000000a",
//           password: "K005cmll4zll0KBL/jzMaFKd/Pukov8",
//         },
//       }
//     );

//     const apiUrl = authResponse.data.apiUrl;
//     const authToken = authResponse.data.authorizationToken;
//     const downloadUrl = authResponse.data.downloadUrl;

//     // Step 2: Get users from Prisma
//     const users = await prisma.user.findMany({
//       select: { id: true, username: true, image: true, bannerImage: true },
//     });

//     for (const user of users) {
//       const { username, image, bannerImage } = user;
//       if (!username || (!image && !bannerImage)) continue;

//       // Define new paths
//       const newProfilePath = `${NEW_PATH}/${username}/profile.png`;
//       const newBannerPath = `${NEW_PATH}/${username}/banner.png`;

//       // Move profile image
//       if (image) {
//         await moveFile(apiUrl, authToken, downloadUrl, image, newProfilePath);
//         await prisma.user.update({ where: { id: user.id }, data: { profileImage: newProfilePath } });
//       }

//       // Move banner image
//       if (bannerImage) {
//         await moveFile(apiUrl, authToken, downloadUrl, bannerImage, newBannerPath);
//         await prisma.user.update({ where: { id: user.id }, data: { bannerImage: newBannerPath } });
//       }
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Migration Error:", error);
//     res.status(500).json({ error: "Migration failed" });
//   }
// }

// async function moveFile(apiUrl: string, authToken: string, downloadUrl: string, oldPath: string, newPath: string) {
//   // Step 3: Download file from Backblaze
//   const downloadLink = `${downloadUrl}/file/${OLD_BUCKET}/${oldPath}`;
//   const fileData = await axios.get(downloadLink, {
//     headers: { Authorization: authToken },
//     responseType: "arraybuffer",
//   });

//   // Step 4: Get Upload URL for new bucket
//   const uploadAuth = await axios.post(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
//     bucketId: "1ca39d754da9a4499b58031d",
//   }, { headers: { Authorization: authToken } });

//   const uploadUrl = uploadAuth.data.uploadUrl;
//   const uploadToken = uploadAuth.data.authorizationToken;

//   // Step 5: Upload file to new location
//   await axios.post(uploadUrl, fileData.data, {
//     headers: {
//       Authorization: uploadToken,
//       "X-Bz-File-Name": newPath,
//       "Content-Type": "b2/x-auto",
//       "X-Bz-Content-Sha1": "do_not_verify",
//     },
//   });

//   console.log(`Moved ${oldPath} -> ${newPath}`);
// }

// export default handler;



// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
// import prisma from "../../lib/prisma";

// const B2_APPLICATION_KEY_ID = process.env.B2_APPLICATION_KEY_ID!;
// const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY!;
// const OLD_BUCKET = "mvpz-user-private";
// const NEW_BUCKET = "mvpz-ncaa";
// const NEW_PATH = "user-profiles/prod";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Step 1: Get Authorization Token for Backblaze API
//     const authResponse = await axios.post(
//       "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
//       {},
      // {
      //   auth: {
      //     username: "005c3d5d949b83d000000000a",
      //     password: "K005cmll4zll0KBL/jzMaFKd/Pukov8",
      //   },
      // }
//     );

//     const apiUrl = authResponse.data.apiUrl;
//     const authToken = authResponse.data.authorizationToken;
//     const downloadUrl = authResponse.data.downloadUrl;

//     // Step 2: Get users from Prisma
//     const users = await prisma.user.findMany({
//       select: { id: true, username: true, image: true, bannerImage: true },
//     });

//     for (const user of users) {
//       const { username, image, bannerImage } = user;
//       if (!username || (!image && !bannerImage)) continue;

//       // Define new paths
//       const newProfilePath = `${NEW_PATH}/${username}/profile.png`;
//       const newBannerPath = `${NEW_PATH}/${username}/banner.png`;

//       // Move profile image
//       if (image) {
//         await moveFile(apiUrl, authToken, downloadUrl, image, newProfilePath, user.id, "profileImage");
//       }

//       // Move banner image
//       if (bannerImage) {
//         await moveFile(apiUrl, authToken, downloadUrl, bannerImage, newBannerPath, user.id, "bannerImage");
//       }

//       // Small delay to prevent hitting API limits
//       await new Promise((resolve) => setTimeout(resolve, 500));
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Migration Error:", error);
//     res.status(500).json({ error: "Migration failed" });
//   }
// }

// async function moveFile(
//   apiUrl: string,
//   authToken: string,
//   downloadUrl: string,
//   oldPath: string,
//   newPath: string,
//   userId: string,
//   field: "profileImage" | "bannerImage"
// ) {
//   try {
//     // Step 3: Check if the file exists before downloading
//     const downloadLink = `${downloadUrl}/file/${OLD_BUCKET}/${oldPath}`;
//     const fileResponse = await axios.get(downloadLink, {
//       headers: { Authorization: authToken },
//       responseType: "arraybuffer",
//     });

//     if (!fileResponse.data) {
//       console.warn(`File not found: ${oldPath}`);
//       return;
//     }

//     // Step 4: Get Upload URL for new bucket
//     const uploadAuth = await axios.post(
//       `${apiUrl}/b2api/v2/b2_get_upload_url`,
//       { bucketId: "1ca39d754da9a4499b58031d" },
//       { headers: { Authorization: authToken } }
//     );

//     const uploadUrl = uploadAuth.data.uploadUrl;
//     const uploadToken = uploadAuth.data.authorizationToken;

//     // Step 5: Upload file to new location
//     await axios.post(uploadUrl, fileResponse.data, {
//       headers: {
//         Authorization: uploadToken,
//         "X-Bz-File-Name": encodeURIComponent(newPath),
//         "Content-Type": "b2/x-auto",
//         "X-Bz-Content-Sha1": "do_not_verify",
//       },
//     });

//     // Step 6: Update user record in Prisma
//     await prisma.user.update({
//       where: { id: userId },
//       data: { [field]: newPath },
//     });

//     console.log(`Moved ${oldPath} -> ${newPath}`);
//   } catch (error) {
//     console.error(`Error moving file ${oldPath}:`, error.message);
//   }
// }

// export default handler;


// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
// import prisma from "../../lib/prisma";

// const B2_APPLICATION_KEY_ID = process.env.B2_APPLICATION_KEY_ID!;
// const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY!;
// const NEW_BUCKET = "mvpz-ncaa";
// const NEW_PATH = "tribes/prod";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Step 1: Get Authorization Token for Backblaze API
//     const authResponse = await axios.post(
//       "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
//       {},
      // {
      //   auth: {
      //     username: "005c3d5d949b83d000000000a",
      //     password: "K005cmll4zll0KBL/jzMaFKd/Pukov8",
      //   },
      // }
//     );

//     const apiUrl = authResponse.data.apiUrl;
//     const authToken = authResponse.data.authorizationToken;
//     const downloadUrl = authResponse.data.downloadUrl;

//     // Step 2: Get all tribes from Prisma
//     const tribes = await prisma.tribe.findMany({
//       select: {
//         id: true,
//         tribeId: true,
//         tribeMascotLogo: true,
//         tribeLogo: true,
//         tribeVerticalBanner: true,
//         tribeHorizontalBanner: true,
//       },
//     });

//     for (const tribe of tribes) {
//       const { tribeId } = tribe;
//       if (!tribeId) continue;

//       // Define new paths
//       const newPaths = {
//         tribeMascotLogo: `${NEW_PATH}/${tribeId}/tribeMascotLogo.png`,
//         tribeLogo: `${NEW_PATH}/${tribeId}/tribeLogo.png`,
//         tribeVerticalBanner: `${NEW_PATH}/${tribeId}/tribeVerticalBanner.png`,
//         tribeHorizontalBanner: `${NEW_PATH}/${tribeId}/tribeHorizontalBanner.png`,
//       };

//       // Process each image
//       for (const [field, oldUrl] of Object.entries(tribe)) {
//         if (!oldUrl || typeof oldUrl !== "string") continue;

//         // Extract bucket and old path
//         const match = oldUrl.match(/https:\/\/[^/]+\/file\/([^/]+)\/(.+)/);
//         if (!match) {
//           console.warn(`Invalid URL format for ${field}: ${oldUrl}`);
//           continue;
//         }
//         const [, oldBucket, oldPath] = match;

//         // Move file
//         await moveFile(apiUrl, authToken, downloadUrl, oldBucket, oldPath, newPaths[field as keyof typeof newPaths], tribe.id, field as keyof typeof newPaths);
        
//         // Small delay to prevent hitting API limits
//         await new Promise((resolve) => setTimeout(resolve, 500));
//       }
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Migration Error:", error);
//     res.status(500).json({ error: "Migration failed" });
//   }
// }

// async function moveFile(
//   apiUrl: string,
//   authToken: string,
//   downloadUrl: string,
//   oldBucket: string,
//   oldPath: string,
//   newPath: string,
//   tribeId: string,
//   field: string
// ) {
//   try {
//     // Step 3: Check if the file exists before downloading
//     const downloadLink = `${downloadUrl}/file/${oldBucket}/${oldPath}`;
//     const fileResponse = await axios.get(downloadLink, {
//       headers: { Authorization: authToken },
//       responseType: "arraybuffer",
//     });

//     if (!fileResponse.data) {
//       console.warn(`File not found: ${oldPath}`);
//       return;
//     }

//     // Step 4: Get Upload URL for new bucket
//     const uploadAuth = await axios.post(
//       `${apiUrl}/b2api/v2/b2_get_upload_url`,
//       { bucketId: "1ca39d754da9a4499b58031d" },
//       { headers: { Authorization: authToken } }
//     );

//     const uploadUrl = uploadAuth.data.uploadUrl;
//     const uploadToken = uploadAuth.data.authorizationToken;

//     // Step 5: Upload file to new location
//     await axios.post(uploadUrl, fileResponse.data, {
//       headers: {
//         Authorization: uploadToken,
//         "X-Bz-File-Name": encodeURIComponent(newPath),
//         "Content-Type": "b2/x-auto",
//         "X-Bz-Content-Sha1": "do_not_verify",
//       },
//     });

//     // Step 6: Update tribe record in Prisma
//     await prisma.tribe.update({
//       where: { id: tribeId },
//       data: { [field]: newPath },
//     });

//     console.log(`Moved ${oldPath} -> ${newPath}`);
//   } catch (error) {
//     console.error(`Error moving file ${oldPath}:`, error.message);
//   }
// }

// export default handler;


// import { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
// import prisma from "../../lib/prisma";

// const B2_APPLICATION_KEY_ID = process.env.B2_APPLICATION_KEY_ID!;
// const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY!;
// const NEW_BUCKET = "mvpz-ncaa";
// const NEW_PATH = "posts/prod";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Step 1: Get Authorization Token for Backblaze API
//     const authResponse = await axios.post(
//       "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
//       {},
//       {
//         auth: {
//           username: "005c3d5d949b83d000000000a",
//           password: "K005cmll4zll0KBL/jzMaFKd/Pukov8",
//         },
//       }
//     );

//     const apiUrl = authResponse.data.apiUrl;
//     const authToken = authResponse.data.authorizationToken;
//     const downloadUrl = authResponse.data.downloadUrl;

//     // Step 2: Get all posts with media from Prisma
//     const posts = await prisma.tribeShout.findMany({
//       select: {
//         id: true,
//         media: {
//           select: {
//             mediaType: true,
//             url: true,
//           },
//         },
//       },
//     });

//     for (const post of posts) {
//       const { media, id } = post;
//       if (!media || media.length === 0) continue;

//       for (let index = 0; index < media.length; index++) {
//         const mediaItem = media[index];
//         const { mediaType, url } = mediaItem;
//         if (!url) continue;

//         // Extract bucket & old path
//         const match = url.match(/https:\/\/[^/]+\/file\/([^/]+)\/(.+)/);
//         if (!match) {
//           console.warn(`Invalid URL format for post ${id}: ${url}`);
//           continue;
//         }
//         const [, oldBucket, oldPath] = match;

//         // Define new paths (p1, p2, p3 ...)
//         const fileIndex = `p${index + 1}`;
//         const newFilePath = `${NEW_PATH}/post_${id}/${mediaType}/${fileIndex}.png`;

//         // Move main media
//         await moveFile(apiUrl, authToken, downloadUrl, oldBucket, oldPath, newFilePath, post.id, index, "url");

        

//         // Small delay to prevent hitting API limits
//         await new Promise((resolve) => setTimeout(resolve, 500));
//       }
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Migration Error:", error);
//     res.status(500).json({ error: "Migration failed" });
//   }
// }

// async function moveFile(
//   apiUrl: string,
//   authToken: string,
//   downloadUrl: string,
//   oldBucket: string,
//   oldPath: string,
//   newPath: string,
//   postId: string,
//   mediaIndex: number,
//   field: "url" | "thumbnail"
// ) {
//   try {
//     // Step 3: Download existing file
//     const downloadLink = `${downloadUrl}/file/${oldBucket}/${oldPath}`;
//     const fileResponse = await axios.get(downloadLink, {
//       headers: { Authorization: authToken },
//       responseType: "arraybuffer",
//     });

//     if (!fileResponse.data) {
//       console.warn(`File not found: ${oldPath}`);
//       return;
//     }

//     // Step 4: Get Upload URL for new bucket
//     const uploadAuth = await axios.post(
//       `${apiUrl}/b2api/v2/b2_get_upload_url`,
//       { bucketId: "1ca39d754da9a4499b58031d" },
//       { headers: { Authorization: authToken } }
//     );

//     const uploadUrl = uploadAuth.data.uploadUrl;
//     const uploadToken = uploadAuth.data.authorizationToken;

//     // Step 5: Upload file to new location
//     await axios.post(uploadUrl, fileResponse.data, {
//       headers: {
//         Authorization: uploadToken,
//         "X-Bz-File-Name": encodeURIComponent(newPath),
//         "Content-Type": "b2/x-auto",
//         "X-Bz-Content-Sha1": "do_not_verify",
//       },
//     });


//     console.log(`Moved ${oldPath} -> ${newPath}`);
//   } catch (error) {
//     console.error(`Error moving file ${oldPath}:`, error.message);
//   }
// }

// export default handler;


import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import prisma from "../../lib/prisma";

const B2_APPLICATION_KEY_ID = process.env.B2_APPLICATION_KEY_ID!;
const B2_APPLICATION_KEY = process.env.B2_APPLICATION_KEY!;
const OLD_BUCKET = "mvpz-nfts";
const NEW_BUCKET = "mvpz-ncaa";
const NEW_PATH = "entities/prod";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Step 1: Get Authorization Token for Backblaze API
    const authResponse = await axios.post(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {},
      {
        auth: {
          username: "005c3d5d949b83d000000000a",
          password: "K005cmll4zll0KBL/jzMaFKd/Pukov8",
        },
      }
    );

    const apiUrl = authResponse.data.apiUrl;
    const authToken = authResponse.data.authorizationToken;
    const downloadUrl = authResponse.data.downloadUrl;

    // Step 2: Get users from Prisma
    const users = await prisma.nFTEntity.findMany({
      select: { cardImageNFT : true, athlete : true, membershipTier : true, design : true },
    });

    for (const user of users) {
      const { cardImageNFT, athlete } = user;
      if (!athlete.username || (!cardImageNFT)) continue;

      // Define new paths
      const newProfilePath = `${NEW_PATH}/${athlete.username}/nft_${user.membershipTier}_${user.design?.split(" ")?.join("-")}.png`;

      // Move profile image
      if (cardImageNFT) {
        await moveFile(apiUrl, authToken, downloadUrl, cardImageNFT, newProfilePath);
        await delay(500); // Add 500ms delay
      }

   
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Migration Error:", error);
    res.status(500).json({ error: "Migration failed" });
  }
}

async function moveFile(apiUrl: string, authToken: string, downloadUrl: string, oldPath: string, newPath: string) {
  try {
    const downloadLink = `${downloadUrl}/file/${OLD_BUCKET}/${oldPath}`;
    const fileData = await axios.get(downloadLink, {
      headers: { Authorization: authToken },
      responseType: "arraybuffer",
    });

    let uploadAuth;
    try {
      uploadAuth = await axios.post(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
        bucketId: "1ca39d754da9a4499b58031d",
      }, { headers: { Authorization: authToken } });
    } catch (error) {
      console.error("Upload URL error, re-authenticating...");
      const newAuthResponse = await axios.post(
        "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
        {},
        {
          auth: {
            username: process.env.B2_APPLICATION_KEY_ID!,
            password: process.env.B2_APPLICATION_KEY!,
          },
        }
      );
      authToken = newAuthResponse.data.authorizationToken;

      uploadAuth = await axios.post(`${apiUrl}/b2api/v2/b2_get_upload_url`, {
        bucketId: "1ca39d754da9a4499b58031d",
      }, { headers: { Authorization: authToken } });
    }

    const uploadUrl = uploadAuth.data.uploadUrl;
    const uploadToken = uploadAuth.data.authorizationToken;

    await axios.post(uploadUrl, fileData.data, {
      headers: {
        Authorization: uploadToken,
        "X-Bz-File-Name": newPath,
        "Content-Type": "b2/x-auto",
        "X-Bz-Content-Sha1": "do_not_verify",
      },
    });

    console.log(`Moved ${oldPath} -> ${newPath}`);
  } catch (error) {
    console.error(`Error moving file ${oldPath} -> ${newPath}`, error);
  }
}

export default handler;
