import { BlockFrostAPI } from "@blockfrost/blockfrost-js"

export async function fetchCardanoAssets(address: any){
    try{
        const api = new BlockFrostAPI({
            projectId: "mainnetkXlws11PyQksPz7OzVmkiZQ4V9yu77bU"
        })
        const assets = await api.addresses(address)
        let mvpzAssets = []
        for(let asset of assets.amount){
            if(!asset.unit.includes('0699969e2e7fb9c3aa6d6222580cdbbe5086b079d94366101b27cb58')) continue
            const assetName = asset.unit.replace('0699969e2e7fb9c3aa6d6222580cdbbe5086b079d94366101b27cb58000de140','')
            mvpzAssets.push(hex2a(assetName))
        }
        return  mvpzAssets
    }catch(err){
        throw new Error(err)
    }
}

export async function fetchAddressOfAsset(assetName: string){
    try{
        const api = new BlockFrostAPI({
            projectId: "mainnetkXlws11PyQksPz7OzVmkiZQ4V9yu77bU"
        })
        const assetHex = a2hex(assetName)
        const assetId = `0699969e2e7fb9c3aa6d6222580cdbbe5086b079d94366101b27cb58000de140${assetHex}`
        const assetDetails = await api.assetsAddresses(assetId, {order: 'desc'})
        return assetDetails?.length ? assetDetails[0].address : null
    }catch(err){
        throw new Error(err)
    }
}
function a2hex(name: string){
    let result = "";
    for (let i=0; i<name.length; i++) {
        const hex = name.charCodeAt(i).toString(16);
        result += hex;
    }

    return result
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}