import axios from 'axios';
import fs from 'fs';
import path from 'path';
import os from 'os';

const B2_KEY_ID = process.env.BACKBLAZE_API_APPLICATION_ID;
const B2_APPLICATION_KEY = process.env.BACKBLAZE_API_APPLICATION_KEY;
const BUCKET_ID = 'bcb36dc51d5934898bc8031d'; // mvpz-slab-nfts bucket ID
const B2_API_URL = 'https://api.backblazeb2.com/b2api/v2';

async function getAuthToken() {
    const auth = Buffer.from(`${B2_KEY_ID}:${B2_APPLICATION_KEY}`).toString('base64');
    const response = await axios.get(`${B2_API_URL}/b2_authorize_account`, {
        headers: { Authorization: `Basic ${auth}` }
    });
    return response.data;
}

async function listFilesInFolder(folderPath: string, authData: any) {
    const { authorizationToken, apiUrl } = authData;
    
    const fileListResponse = await axios.post(`${apiUrl}/b2_list_file_names`, {
        bucketId: BUCKET_ID,
        prefix: folderPath,
        delimiter: '/'
    }, {
        headers: { Authorization: authorizationToken }
    });
    
    return fileListResponse.data.files;
}

async function downloadFile(url: string, localPath: string) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });

    const writer = fs.createWriteStream(localPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function main() {
    try {
        const folderPath = 'Gen1/23/team/23_24_season/calum/';
        const documentsPath = path.join(os.homedir(), 'Documents', 'mvpz-downloads');
        
        // Create the download directory if it doesn't exist
        if (!fs.existsSync(documentsPath)) {
            fs.mkdirSync(documentsPath, { recursive: true });
        }

        console.log('Getting authentication token...');
        const authData = await getAuthToken();
        
        console.log('Listing files in folder...');
        const files = await listFilesInFolder(folderPath, authData);
        
        console.log(`Found ${files.length} files. Starting download...`);
        
        for (const file of files) {
            const fileName = file.fileName;
            const localPath = path.join(documentsPath, path.basename(fileName));
            
            console.log(`Downloading: ${fileName}`);
            
            try {
                const downloadUrl = `${authData.downloadUrl}/file/${BUCKET_ID}/${fileName}`;
                await downloadFile(downloadUrl, localPath);
                console.log(`Successfully downloaded: ${fileName}`);
            } catch (error) {
                console.error(`Failed to download ${fileName}:`, error.message);
            }
        }
        
        console.log('Download completed!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main(); 