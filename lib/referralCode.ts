import prisma from "./prisma";

export async function getReferralCode(){
    let timer = 5000
    setInterval(() => timer -= 100, 100)
    while(timer > 0){
        const code = getRandomCode(6)
        const existsCode = await prisma.user.findFirst({
            where: {
                referralCode: code
            }
        })
        if(!existsCode){
            return code
        }
    }
}

export async function getProductReferralCode(){
    let timer = 5000
    setInterval(() => timer -= 100, 100)
    while(timer > 0){
        const code = getRandomCode(6)
        const existsCode = await prisma.referralInvite.findFirst({
            where: {
                inviteCode: code
            }
        })
        if(!existsCode){
            return code
        }
    }
}

function getRandomCode(length){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = ''
    while(code.length < length){
        code += characters[Math.floor(Math.random() * 36)]
    }
    return code
}