
export default function getB2TokenForFileDownload(){
    return new Promise(async(resolve,reject) => {
        try{
            var myHeaders = new Headers();
            // const authKey = Buffer.from(`'${process.env.BACKBLAZE_API_APPLICATION_ID}:${process.env.BACKBLAZE_API_APPLICATION_KEY}'`, 'base64')
            const authKey = btoa(`${process.env.BACKBLAZE_API_APPLICATION_ID}:${process.env.BACKBLAZE_API_APPLICATION_KEY}`)
            myHeaders.append("Authorization", `Basic ${authKey}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };

            const response = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account", requestOptions)
            const responseJSON = await response.json()
            resolve({authorizationToken: responseJSON.authorizationToken, downloadUrl: responseJSON.downloadUrl, apiUrl: responseJSON.apiUrl})
        }catch(err){
            reject(err)
        }
    })
}