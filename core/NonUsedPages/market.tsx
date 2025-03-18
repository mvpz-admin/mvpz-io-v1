import { Autocomplete, BackgroundImage, Box, Button, Center, Container, Grid, Group, Image, Loader, Stack, Tabs, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createStyles } from "@mantine/styles";
import { IconBusinessplan, IconClothesRack, IconShirtSport, IconShoppingBag, IconShoppingCart } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AthleteCardDetails from "../../components/AthleteCardDetails";
import { callAPI, downloadFile } from "../../lib/utils";

const useStyles = createStyles((theme) => ({
    swaps:{
        [theme.fn.smallerThan('sm')]:{
            maxWidth: 400
        },
        [theme.fn.largerThan('sm')]:{
            maxWidth: 600
        }
    }
}))

const Market = (props) => {
    const {data: session, status} = useSession()
    const router = useRouter();
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [imageDownload, setImageDownload] = useState(null)
    const [windowWidth, setWindowWidth] = useState(0)
    const {classes} = useStyles()
    const [product, setProduct] = useState(null)

    async function downloadImage(){
        setLoading(true)
        if(selectedCard.cardImageNFT){
            setSelectedCard({...selectedCard, 
                displayImage : await downloadFile(`${imageDownload.downloadUrl}/file/mvpz-nfts-optimized/${selectedCard.cardImageNFT}`, imageDownload.authorizationToken)})
        }
        setLoading(false)
    }

    const fetchCards = async () =>{
        setLoading(true)
        const response = await callAPI({method:'GET',endpoint: '/api/card/athletes', params: {page: 0, limit: 20}})
        setLoading(false)
        if(response?.cards?.length){
            setCards(response.cards.map(c => ({...c, value: c.athlete?.name ? c.athlete.name : c.athlete?.firstName || ""})))
            setImageDownload(response.imageDownload)
        }
    }

    const subscribeUser = async(type) => {
        setLoading(true)
        const response = await callAPI({endpoint: `/api/user/subscription?type=${type}`, method: 'POST', body: {type}})
        if(!!response.subscribed){
            notifications.show({message: 'Successfully subscribed'})
        }else if(response.message){
            notifications.show({message: response.message})
        }
        setLoading(false)
    }

    const gotoCheckout = async() => {
        setLoading(true)
        const result = await callAPI({endpoint: `/api/purchase/initiate`, method:'POST', body:{priceId: product.stripePriceId, cardType:'digital', packType:'athlete', athleteId: selectedCard.athlete.id}})
        setLoading(false)
        if(result?.checkoutUrl){
            router.push(result.checkoutUrl)
        }
    }

    const fetchProducts = async () => {
        setLoading(true)
        const res = await callAPI({endpoint: '/api/product/getActive?type=athlete'})
        setLoading(false)
        if(res.length){
            setProduct(res[0])
        }
    }

    useEffect(() => {
        if(status === "unauthenticated"){
            router.push('/')
        }
        if(!cards.length){
            fetchCards()
        }
        if(!product){
            fetchProducts()
        }
        setWindowWidth(window?.innerWidth)
    },[])

    useEffect(() => {
        if(!!selectedCard && !selectedCard.displayImage){
            downloadImage()
        }
    },[selectedCard])

    return (
        <Container w={windowWidth} style={{maxWidth: '1200px', maxHeight:'1080px'}} >
            <Tabs variant='pills' defaultValue="market">
                <Tabs.List grow>
                    <Tabs.Tab value="market" icon={<IconShirtSport size="0.8rem" />}>Market</Tabs.Tab>
                    <Tabs.Tab value="swaps" icon={<IconShoppingBag size="0.8rem" />}>Swaps</Tabs.Tab>
                    {/* <Tabs.Tab value="trade" icon={<IconBusinessplan size="0.8rem" />}>Trade</Tabs.Tab> */}
                </Tabs.List>

                <Tabs.Panel value="market" pt="xs">
                    {loading ? <Loader/> :                     
                    <Stack align={'center'}>
                        <Group mt={32}>
                            <Text>Search Athletes</Text>
                            <Autocomplete size={'lg'} placeholder="Search by name" data={cards} 
                            onItemSubmit={(item) => setSelectedCard(item)}
                                filter={(value, item) =>
                                    value ? item.value.toLowerCase().includes(value.toLowerCase().trim()) : false
                                }
                            />
                        </Group>
                        {!!selectedCard ? 
                        <Stack mt={16}>
                            <AthleteCardDetails gotoCheckout={gotoCheckout} athlete={{...selectedCard, ...selectedCard.athlete, ...product}}/>
                        </Stack> : 
                        <Center mt={32}>
                            <Image src="/images/market.png"/>
                        </Center>
                        }
                    </Stack>
                    }
                </Tabs.Panel>
                <Tabs.Panel value="swaps" pt="xs">
                    <Group mt={64} position="center">
                        <Image className={classes.swaps} src={'/images/swaps.png'}></Image>
                    </Group>
                    <Group mt={32} position="center">
                        <Button onClick={() => subscribeUser("swaps")}>Subscribe</Button>
                    </Group>
                </Tabs.Panel>
                {/* <Tabs.Panel value="trade" pt="xs">
                    <ComingSoon type={"trade"}/>
                </Tabs.Panel>                         */}
            </Tabs>
        {/* {loading?<Loader/> :
            <Grid align={"space-between"} justify={"space-between"}>
            {cards.map((card) => {
                return (
                    <Grid.Col key={card.id} sm={6} md={4} lg={3} onClick={() => router.push(`/card/${card.id}`)}>
                        <NFTCard image={card.displayImage} design={card.design} designer={card.designer} name={card.athlete?.name} username={card.athlete?.username}></NFTCard>
                    </Grid.Col>
                )
            })}
            </Grid>} */}
        </Container>
    )
}

export default Market;