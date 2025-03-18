// import { Paper, Grid, Container, Text, useMantineTheme, Box, Stack, Group, Tabs, SimpleGrid, Image, Card, NumberInput, Button, Loader } from "@mantine/core";
// import { notifications } from "@mantine/notifications";
// import { createStyles } from "@mantine/styles";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useEffect } from "react";
// import ComingSoon from "../../components/ComingSoon";
// import { callAPI } from "../../lib/utils";

// const useStyles = createStyles(theme => ({
//     boxText:{
//         [theme.fn.smallerThan('sm')]:{
//             display: 'none'
//         },
//         [theme.fn.largerThan('sm')]:{
//             width: 800
//         }
//     },
//     textGroup:{
//         [theme.fn.smallerThan('sm')]:{
//             marginTop: 0
//         },
//         [theme.fn.largerThan('sm')]:{
//             marginTop: 48
//         }
//     },
//     grid:{
//         [theme.fn.smallerThan('sm')]:{
//             width: 200
//         },
//         [theme.fn.smallerThan('md')]:{
//             width: 400
//         },
//         [theme.fn.largerThan('md')]:{
//             width: 1200
//         }
//     },
//     tabs:{
//         [theme.fn.smallerThan('xs')]:{
//             fontSize: '10px !important'
//         },
//         [theme.fn.largerThan('sm')]:{
//             fontSize: 16
//         }
//     },
//     textStore:{
//         [theme.fn.smallerThan('sm')]:{
//             fontSize: 32
//         },
//         [theme.fn.largerThan('sm')]:{
//             fontSize: "50px !important"
//         }
//     },
//     store:{
//         [theme.fn.smallerThan('sm')]:{
//             height: 80
//         },
//         [theme.fn.largerThan('sm')]:{
//             height: 120
//         }
//     },
//     text1:{
//         [theme.fn.smallerThan('sm')]:{
//             fontSize: 24
//         },
//         [theme.fn.largerThan('sm')]:{
//             fontSize: 48
//         }
//     },
//     text2:{
//         [theme.fn.smallerThan('sm')]:{
//             fontSize: 64
//         },
//         [theme.fn.largerThan('sm')]:{
//             fontSize: 100
//         }
//     },
//     text3:{
//         [theme.fn.smallerThan('sm')]:{
//             fontSize: 20
//         },
//         [theme.fn.largerThan('sm')]:{
//             fontSize: 36
//         }
//     },
//     special:{
//         [theme.fn.smallerThan('sm')]:{
//             maxWidth: 400
//         },
//         [theme.fn.largerThan('sm')]:{
//             maxWidth: 600
//         }
//     }
// }))
// export default function Store (props){
//     const {status} = useSession()
//     const {classes} = useStyles()
//     const theme = useMantineTheme()
//     const [products, setProducts] = useState([] as any)
//     const [loading, setLoading] = useState(false)
//     // const [quantity, setQuantity] = useState(null)
//     const router = useRouter()
//     const [activeTab, setActiveTab] = useState('packs')

//     const fetchProducts = async () => {
//         setLoading(true)
//         const res = await callAPI({endpoint: '/api/product/getActive'})
//         setLoading(false)
//         if(res.length){
//             setProducts(res)
//         }
//     }

//     const gotoCheckout = async (priceId, quantity) => {
//         if(status === 'unauthenticated'){
//             localStorage.setItem('redirectUrl','/mvpz-store')
//             router.push("/api/auth/signin")
//             return
//         }
//         setLoading(true)
//         const result = await callAPI({endpoint: `/api/purchase/initiate`, method:'POST', body:{priceId, quantity}})
//         setLoading(false)
//         if(result?.checkoutUrl){
//             router.push(result.checkoutUrl)
//         }
//     }

//     const subscribeUser = async(type) => {
//         setLoading(true)
//         const response = await callAPI({endpoint: `/api/user/subscription?type=${type}`, method: 'POST', body: {type}})
//         if(!!response.subscribed){
//             notifications.show({message: 'Successfully subscribed'})
//         }else if(response.message){
//             notifications.show({message: response.message})
//         }
//         setLoading(false)
//     }

//     useEffect(()=>{
//         fetchProducts()
//     },[])

//     const ProductCard = ({title, desc, cost, priceId, minCount, image, packQuantity}) => {
//         const [quantity, setQuantity] = useState(minCount)
//         return (
//             <Card bg={'dark'}>
//                 <Stack align={'center'} spacing={'xs'}>
//                     <Image alt="" width={240} src={image}></Image>
//                     <Text ff="MonumentExtended-Regular" color={'white'} size={16} fw={600}>{title}</Text>
//                     <Text align="center" ff="MonumentExtended-Regular" color={'white'} size='xs'>{desc}</Text>
//                     {!!cost ? <>
//                     <Stack align={'center'} spacing={0}>
//                         <Text ff="MonumentExtended-Regular" color='white' size={'lg'} fw={600}>${cost}</Text>
//                         <Text ff="MonumentExtended-Regular" size={10} fw={600}>*${(cost/packQuantity).toFixed(2)} per card</Text>
//                     </Stack>
//                     <Group mt={16}>
//                         <Button ff="MonumentExtended-Regular" disabled={quantity <= 0} onClick={() => gotoCheckout(priceId, quantity)} py={4} fw={900} style={{color:'black',letterSpacing: '.2rem', fontSize: 10}}>PURCHASE</Button>
//                         <NumberInput style={{fontFamily: 'MonumentExtended-Regular', color: 'white !important'}} min={1} w={60} value={quantity} onChange={(e) => setQuantity(+e)}></NumberInput>
//                     </Group>
//                     <Text ff="MonumentExtended-Regular" color='white' size={'sm'} fw={600}>Total: ${quantity * cost}</Text>
//                     <Text mt={8} mb={-8} ff="MonumentExtended-Regular" c='dimmed' size={'xs'}>Limited availability</Text>
//                     </>
//                     : <Group mt={16}>
//                         <Button ff="MonumentExtended-Regular" onClick={() => subscribeUser('custom-cards')} py={4} fw={900} style={{color:'black',letterSpacing: '.2rem', fontSize: 10}}>JOIN WAITLIST</Button>
//                     </Group>}
//                 </Stack>
//             </Card>
//         )
//     }
//     return loading ? <Loader/> : (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} >
//             <Grid className={classes.grid} align={"center"}>
//                 <Grid.Col span={5} sm={7}>
//                     <Paper style={{alignContent: 'center'}} className={classes.store} bg={theme.colors.mvpz[9]}>
//                         <Text className={classes.textStore} ff="MonumentExtended-Ultrabold" style={{letterSpacing: '.4rem'}} fw={400} color={'black'} align="right">STORE</Text>
//                     </Paper>
//                 </Grid.Col>
//                 <Grid.Col span={7} sm={5}>
//                     <Group position={'left'}>
//                         <Text className={classes.text1} fw={600} color={theme.colors.mvpz[9]} align="left" ff='SpriteGraffiti-Regular' style={{transform:'rotate(-10deg)'}}>
//                             <span  className={classes.text2} style={{fontFamily: "SpriteGraffiti-Regular", marginLeft: 4, color: theme.colors.mvpz[9], fontWeight: 700, letterSpacing: '.3rem'}}>1</span>
//                         st 
//                         </Text>
//                         <span  className={classes.text3} style={{fontFamily: "MonumentExtended-Regular", marginLeft: 4, color: 'white', fontWeight: 700, letterSpacing: '.3rem'}}>EDITION</span>
//                     </Group>
//                 </Grid.Col>
//             </Grid>
            
//             <Group className={classes.textGroup} position={'center'}>
//                 <Box className={classes.boxText}>
//                     <Text ff="MonumentExtended-Regular" align="center">It's more than just a sports card </Text>
//                     <Text ff="MonumentExtended-Regular" align="center">It's your access pass to a growing NCAA sports network </Text>
//                     <Text ff="MonumentExtended-Regular" align="center">Connecting athletes with their fans </Text>
//                 </Box>
//             </Group>
//             <Tabs value={activeTab} onTabChange={setActiveTab} mt={48} mb={64} variant={'pills'} defaultValue='packs'>
//                 <Tabs.List grow>
//                     <Tabs.Tab className={classes.tabs} ff="MonumentExtended-Regular" value="packs">Packs</Tabs.Tab>
//                     <Tabs.Tab className={classes.tabs} ff="MonumentExtended-Regular" value="single">Single</Tabs.Tab>
//                     <Tabs.Tab className={classes.tabs} ff="MonumentExtended-Regular" value="custom">Custom</Tabs.Tab>
//                     <Tabs.Tab className={classes.tabs} ff="MonumentExtended-Regular" value="special">Special</Tabs.Tab>
//                 </Tabs.List>
//                 <Tabs.Panel value="packs">
//                     <SimpleGrid mt={32} breakpoints={[{minWidth: 240, cols: 1},{minWidth: 'sm', cols: 2}, {minWidth: 'lg', cols: 3}]}>
//                         {products.filter(p => p.type==='packs').map(product => {
//                             return <ProductCard title={product.name} desc={product.description} cost={product.cost} priceId={product.stripePriceId} minCount={product.minCount} image={product.images[0]} packQuantity= {product.packQuantity}/>
//                         })}
//                     </SimpleGrid>
//                 </Tabs.Panel>
//                 <Tabs.Panel value="single" style={{justifyContent: 'center'}}>
//                     {products.filter(p => p.type==='single').map(product => {
//                         return <Group mt={32} position="center">
//                             <ProductCard title={product.name} desc={product.description} cost={product.cost} priceId={product.stripePriceId} minCount={product.minCount} image={product.images[0]} packQuantity= {product.packQuantity}/>
//                         </Group>
//                     })}
//                 </Tabs.Panel>
//                 <Tabs.Panel value="custom">
//                     <Group mt={32} position="center">
//                         <ProductCard title={"Coming soon"} desc={'Select what type of card you receive. Only available with subscription'} cost={0} priceId={""} minCount={0} image={'/images/custom.png'} packQuantity= {1}/>
//                     </Group>
//                 </Tabs.Panel>
//                 <Tabs.Panel value="special">
//                     <Group>
//                         <Stack mt={64} spacing="md">
//                             <Group>
//                                 <Image className={classes.special} src="/images/special.png"></Image>
//                             </Group>
//                             <Group>
//                                 <Image className={classes.special} src="/images/special.png"></Image>
//                             </Group>
//                         </Stack>
//                         {/* <Button ff="MonumentExtended-Regular" onClick={() => subscribeUser('special-cards')}>Subscribe</Button> */}
//                     </Group>
//                 </Tabs.Panel>
//             </Tabs>
//             <Text size={'xs'} ff="MonumentExtended-Regular" c='dimmed' align="center">Pack contents and price are subject to change based upon demand and activity</Text>
//             <Text size={'xs'} ff="MonumentExtended-Regular" c='dimmed' align="center">For more information go to <a href="https://mvpz.my.canva.site/faqs" target="_blank">FAQs</a></Text>
//         </Container>
//     )
// }
