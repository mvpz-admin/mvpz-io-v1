import { Accordion, ActionIcon, Button, Chip, Container, Divider, Group, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { createStyles } from "@mantine/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../lib/utils";
import ProductShare from "../../components/ProductShare";
;

const useStyles = createStyles((theme) => ({
    group:{
        [theme.fn.smallerThan('sm')]:{
            flexDirection: 'column',
            justifyContent: 'center !important',
            marginTop: '0px !important'
        }
    },
    sectionWidth: {
        [theme.fn.smallerThan('sm')]:{
            maxWidth: 400
        },
        
    },
    font:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: '12px !important',
            maxWidth: '2 rem'
        },
        fontSize: '12px !important'
    },
    image:{
        [theme.fn.largerThan('sm')]:{
            maxWidth: 400
        },
        [theme.fn.smallerThan('sm')]:{
            maxWidth: 240
        }
    },
    name: {
        [theme.fn.smallerThan('sm')]:{
            fontSize: '20px !important'
        }
    },
    cost:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: '16px !important'
        }
    }
}))
export default function Product(){
    const router = useRouter()
    const {id, productReferralCode} = router.query
    let referralCode = productReferralCode
    const [product, setProduct] = useState({} as any)
    const [loading, setLoading] = useState(false)
    const {status} = useSession()
    const {classes} = useStyles()
    const [variantId, setVariantId] = useState(null)
    const [size, setSize] = useState(null)
    const largeScreen = useMediaQuery("(min-width: 40em)");
    const theme = useMantineTheme()
    let sizes = []
    let variantImage = ''
    if(product && product.variants?.length){
        variantImage = variantId ? product.variants.find(v => v.id === variantId).image : product.images[0]
        sizes = variantId ? product.variants.find(v => v.id === variantId).sizes : product.variants[0].sizes
    }
    const fetchProduct = async () => {
        const result = await callAPI({endpoint: `/api/product/${id}`})
        if(result){
            setProduct(result)
        }
    }

    const gotoCheckout = async () => {
        if(!referralCode){
            referralCode = localStorage.getItem('productReferralCode')
        }
        localStorage.setItem('productReferralCode','')
        if(status === 'unauthenticated'){
            localStorage.setItem('redirectUrl',`/apparel/${id}${referralCode ? '?productReferralCode='+referralCode : ''}`)
            router.push("/api/auth/signin")
            return
        }
        if(!size) return notifications.show({message: 'Please select a size to continue'})
        if(!variantId) return notifications.show({message: 'Please select a color to continue'})
        setLoading(true)
        const result = await callAPI({endpoint: `/api/purchase/initiate`, method:'POST', body:{productId: product.id, quantity: 1, variantId, size, productReferralCode: referralCode}})        
        setLoading(false)
        if(result?.checkoutUrl){
            router.push(result.checkoutUrl)
        }
    }

    useEffect(() => {
        if(!!id){
            fetchProduct()
        }
        if(productReferralCode){
            localStorage.setItem('productReferralCode', productReferralCode.toString())
        }
    },[id])

    return(
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} >
            <Group mb={64} mt={64} align='flex-start'  spacing={32} className={classes.group}>
                <Stack align={"center"} justify='center'>
                    {!!variantImage && <Group position="center"><Image className={classes.image} src={variantImage}></Image></Group>}
                </Stack>
                <Stack>
                    <Text className={classes.name} size={36}>{product.name}</Text>
                    <Group>
                        {!!product.costBeforeDiscount && <Text style={{textDecorationLine: 'line-through', textDecorationColor: theme.colors.mvpz[8]}} size={largeScreen ? 36 : 20}>${product.costBeforeDiscount}</Text>}
                        <Text color={theme.colors.mvpz[8]} ff={"SpriteGraffiti-Regular"} size={largeScreen ? 54 : 36}>${product.cost}</Text>
                    </Group>
                    <Divider w={600} className={classes.sectionWidth}/>
                    <Text size={'xs'}>COLORS</Text>
                    <Chip.Group value={variantId} onChange={setVariantId}>
                        <Group>
                        {product.variants?.length && product.variants.map(v => {
                            return (<Chip variant={'filled'} className={classes.font} key={v.id} radius={'sm'} value={v.id}>
                                {v.variantName}
                            </Chip>)
                        })}
                        </Group>
                    </Chip.Group>
                    {/* <Chip.Group value={variantId} onChange={setVariantId}>
                        <Group>
                        {product.variants?.length && product.variants.map(v => {
                            return (<Chip className={classes.font} key={v.id} radius={'sm'} value={v.id}>
                                {v.variantName}
                            </Chip>)
                        })}
                        </Group>
                    </Chip.Group> */}
                    <Text size={'xs'}>SIZES</Text>
                    <Chip.Group value={size} onChange={setSize}>
                        <Group w={600} className={classes.sectionWidth}>
                        {sizes?.map(sz => {
                            return (<Chip className={classes.font} key={sz} radius={'sm'} value={sz}>
                                <Text className={classes.font}>{sz}</Text>
                            </Chip>)
                        })}
                        </Group>
                    </Chip.Group>
                    {!!product.specification && <Text className={classes.cost} mt={8} size={24}>{product.specification.material}</Text>}
                    <Group grow mt={16}>
                        <Button onClick={() => gotoCheckout()} py={4} fw={600}>PURCHASE</Button>
                    </Group>
                    <Accordion>
                        <Accordion.Item value="design">
                            <Accordion.Control>Features</Accordion.Control>
                            <Accordion.Panel><Text w={largeScreen ? 500 : 300} className={classes.font}>{product.features}</Text></Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion>
                        <Accordion.Item value="design">
                            <Accordion.Control>Design</Accordion.Control>
                            <Accordion.Panel><Text w={largeScreen ? 500 : 300} className={classes.font}>{product.inspiration}</Text></Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    {!!product.additional && <Accordion>
                        <Accordion.Item value="design">
                            <Accordion.Control>Shipping & Returns</Accordion.Control>
                            <Accordion.Panel>
                                <Text w={largeScreen ? 500 : 300} className={classes.font}>{product.additional.shipping}</Text>
                                <Divider my={10}/>
                                <Text mt={8} w={largeScreen ? 500 : 300} className={classes.font}>{product.additional.returns}</Text>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>}
                    <ProductShare productId={product.id} productName={product.name} status={status}/>
                </Stack>                                            
            </Group>
        </Container>
    )
}