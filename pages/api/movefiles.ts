import axios from 'axios';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
        const nftEnhancements = await prisma.nFTMajorEnhancement.findMany({
           
            include : {
                nftEntity : true
            }
        });
   
        await Promise.all(nftEnhancements.map(async (nft) => {
            await prisma.nFTMajorEnhancement.update({
                where : {
                    id : nft.id
                },
                data : {
                    cardNFTImage : nft.nftEntity.cardImageNFT
                }
            });
        }));
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}