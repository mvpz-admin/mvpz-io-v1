import type { NextApiResponse, NextApiRequest } from "next";
import getB2TokenForFileDownload from "../../../../../lib/backBlaze";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";

 async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const tokens = (await getB2TokenForFileDownload()) as any;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", tokens.authorizationToken);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const res = await fetch(
      `${tokens.apiUrl}/b2api/v2/b2_get_upload_url?bucketId=${process.env.BACKBLAZE_BUCKET_ID}`,
      requestOptions
    );
    const responseJSON = await res.json();
    console.log(responseJSON);
    if (responseJSON.uploadUrl) {
      response.status(200).json(responseJSON);
    } else {
      response.status(500).json("Internal server error");
    }
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: "Internal server error" });
  }
}

export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});
