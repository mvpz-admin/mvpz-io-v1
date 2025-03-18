import { Button, CopyButton, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { IconBrandFacebook, IconBrandPinterest, IconBrandX, IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { callAPI } from "../lib/utils";

const ProductShare = (props:any) => {
    const {productId, productName, size='sm', status = 'unauthenticated'} = props
    const [loading, setLoading] = useState(false)
    const [referralCode, setReferralCode] = useState('')
    const smallSize = size === 'xs'
    const productUrl = referralCode ? `${process.env.NEXT_PUBLIC_APP_URL}/apparel/${productId}?productReferralCode=${referralCode}` : 
        `${process.env.NEXT_PUBLIC_APP_URL}/apparel/${productId}`
    
    const shareUrl = async () => {
        setLoading(true)
        const response = await callAPI({endpoint: '/api/user/getReferralInvite', method: 'POST', body: {productId}})
        setLoading(false)
        setReferralCode(response.inviteCode)
    }

    const ShareButton = ({url, leftIcon, children}) => {
        return (
            <Button 
                component="a"
                href={url}                
                target='_blank'
                leftIcon={leftIcon}
                style={{fontSize: smallSize ? 10 : 14, paddingLeft: smallSize ? 4 : undefined, paddingRight: smallSize ? 4 : undefined}} 
                size={size} variant={'light'}>
                {children}
            </Button>
        )
    }

    const buttons = () => {
        return (
            <Group position="apart" mt={16}>
                <ShareButton url={`https://www.facebook.com/sharer.php?u=${productUrl}`} leftIcon={<IconBrandFacebook/>}>Share</ShareButton>
                <ShareButton url={`https://twitter.com/share?text=${encodeURIComponent(productName)}&url=${productUrl}`} leftIcon={<IconBrandX/>}>Tweet</ShareButton>
                <ShareButton url={`https://pinterest.com/pin/create/button/?url=${productUrl}`} leftIcon={<IconBrandPinterest/>}>Pin it</ShareButton>
                <CopyButton value={productUrl}>
                    {({ copied, copy }) => (
                        <Button leftIcon={<IconCopy/>} size={size} variant={'light'} onClick={copy} style={{fontSize: smallSize ? 10 : 14, paddingLeft: smallSize ? 4 : undefined, paddingRight: smallSize ? 4 : undefined}}>
                        {copied ? 'Copied' : 'Copy'}
                        </Button>
                    )}
                </CopyButton>
            </Group>
        )
    }

    return(
        status === 'unauthenticated' ? buttons() :
        <Stack mt={16}>
            <Group position="center">
                {!!referralCode ? <Title order={6}>Share & Earn</Title> : 
                <Button onClick={shareUrl} size={'sm'} variant={'light'}>{loading ? <Loader size={'xs'}/> : "Share & Earn"}</Button>}
            </Group>
            <Text align="center" size={'xs'}>Generate and share referral links to earn revenue</Text>
            {!!referralCode && buttons()}
        </Stack>
    )
}
export default ProductShare