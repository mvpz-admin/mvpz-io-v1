// import { Carousel } from "@mantine/carousel";
// import { ActionIcon, Autocomplete, BackgroundImage, Box, Button, Container, Grid, Group, Image, Loader, NumberInput, Paper, Select, SimpleGrid, Stack, Tabs, Text, Title, useMantineTheme } from "@mantine/core";
// import { useMediaQuery } from "@mantine/hooks";
// import { notifications } from "@mantine/notifications";
// import { createStyles } from "@mantine/styles";
// import { IconEye, IconSearch } from "@tabler/icons-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useState } from "react";
// // import ComingSoon from "../components/ComingSoon";
// import { callAPI } from "../../../lib/utils";

// const useStyles = createStyles((theme) => ({
//     tabSize: {
//         [theme.fn.smallerThan('sm')]:{
//             fontSize: 12
//         }
//     },
//     image:{
//         [theme.fn.largerThan('sm')]:{
//             maxWidth: 300
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
// }))

// const Apparel = (props) => {
//     const {classes} = useStyles()
//     const [products, setProducts] = useState([])
//     const [quantity, setQuantity] = useState(1)
//     const {status, data} = useSession()
//     const router = useRouter()
//     const [loading, setLoading] = useState(true)
//     const theme = useMantineTheme()
//     const [size, setSize] = useState(null)
//     const largeScreen = useMediaQuery('(min-width: 40em)');
//     const DIV = largeScreen ? Group : Stack
//     const width = largeScreen ? 200 : undefined
//     const [viewAll, setViewAll] = useState(false)

//     const fetchProducts = async() => {
//         setLoading(true)
//         const result = await callAPI({endpoint:'/api/product/getActive?type=apparel'})
//         setLoading(false)
//         if(result.length){
//             setProducts(result)
//         }
//     }

//     const gotoCheckout = async (priceId, quantity, variantId) => {
//         if(status === 'unauthenticated'){
//             localStorage.setItem('redirectUrl','/apparel')
//             router.push("/api/auth/signin")
//             return
//         }
//         if(!size){
//             return notifications.show({message: "Please select a size to continue"})            
//         }
//         setLoading(true)
//         const result = await callAPI({endpoint: `/api/purchase/initiate`, method:'POST', body:{priceId, quantity, variantId, size}})
//         setLoading(false)
//         if(result?.checkoutUrl){
//             router.push(result.checkoutUrl)
//         }
//     }

//     useEffect(() => {
//         setLoading(false)
//         fetchProducts()
//     },[])

//     return ( loading ? <Loader/> :
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} >
//             <Stack>
//                 <Grid className={classes.grid} align={"center"}>
//                     <Grid.Col span={5} sm={7}>
//                         <Paper style={{alignContent: 'center'}} className={classes.store} bg={theme.colors.mvpz[9]}>
//                             <Text className={classes.textStore} ff="MonumentExtended-Ultrabold" style={{letterSpacing: '.4rem'}} fw={400} color={'black'} align="right">APPAREL</Text>
//                         </Paper>
//                     </Grid.Col>
//                     <Grid.Col span={7} sm={5}>
//                         <Group position={'left'}>
//                             <Text className={classes.text1} fw={600} color={theme.colors.mvpz[9]} align="left" ff='SpriteGraffiti-Regular' style={{transform:'rotate(-10deg)'}}>
//                                 <span  className={classes.text2} style={{fontFamily: "SpriteGraffiti-Regular", marginLeft: 4, color: theme.colors.mvpz[9], fontWeight: 700, letterSpacing: '.3rem'}}>1</span>
//                             st 
//                             </Text>
//                             <span  className={classes.text3} style={{fontFamily: "MonumentExtended-Regular", marginLeft: 4, color: 'white', fontWeight: 700, letterSpacing: '.3rem'}}>EDITION</span>
//                         </Group>
//                     </Grid.Col>
//                 </Grid>
//                 <Stack spacing={0} mb={4}>
//                     <Text align="center">Clothing to fit your lifestyle</Text>
//                     <Text align="center">Sports fans and athletes</Text>
//                 </Stack>
//                 <Tabs variant={'pills'} defaultValue="athleisure">
//                     <Tabs.List grow>
//                         <Tabs.Tab className={classes.tabSize} value="athleisure">ATHLEISURE</Tabs.Tab>
//                         <Tabs.Tab className={classes.tabSize} value="design">DESIGN</Tabs.Tab>
//                         <Tabs.Tab className={classes.tabSize} value="accessories">ACCESSORIES</Tabs.Tab>
//                     </Tabs.List>
//                     <Tabs.Panel value="athleisure">
//                         <Stack p={32}>
//                             {largeScreen && <><Text size={'sm'} align="center">Supporters</Text>
//                             <Stack spacing={2} mb={4}>
//                                 <Text size={'xs'} align="center">Represent your team with pride and look good doing so.</Text>
//                                 <Text size={'xs'} align="center">Team designs feature unique conceptual artwork printed on high quality garments.</Text>
//                                 <Text size={'xs'} align="center">Each item is a limited edition - team designs change every year.</Text>
//                                 <Text size={'xs'} align="center">Available now.</Text>
//                             </Stack></>}
//                             <Group position="right">
//                                 <Paper px={16} style={{alignContent: 'center'}} className={classes.store} bg={theme.colors.mvpz[9]}>
//                                     {largeScreen && <Title c={'white'}>FIND YOUR TRIBE</Title>}
//                                     <Autocomplete
//                                         w={'full'}
//                                         placeholder="Search teams"
//                                         data={products.map(p => p.name)}
//                                         icon={<IconSearch size="1rem" stroke={1.5} />}
//                                         filter={(value, item) =>
//                                             item.value.toLowerCase().includes(value.toLowerCase().trim()) 
//                                         }
//                                         onItemSubmit={(item) => {
//                                             router.push(`/athlete/${item.username}`)
//                                         }}
//                                     />
//                                 </Paper>
//                             </Group>
//                             {!viewAll ? <Carousel px={50} maw={900} mx="auto" height={largeScreen ? 450 : 350} loop>
//                             {products.map(product => {
//                                 return (
//                                     <Carousel.Slide key={product.id}>
//                                         <DIV spacing={64}>
//                                             <Stack align={"center"}>
//                                                 <Image onClick={() => router.push(`/apparel/${product.id}`)} className={classes.image} src={product.images[0]}></Image>
//                                                 <Text size={32}>${product.cost}</Text>
//                                             </Stack>
//                                             {largeScreen && <Stack>
//                                                 <Text size={24}>{product.shortName}</Text>
//                                                 <Text size={18}>{product.subCategory.toUpperCase()}</Text>
//                                                 {!!product.specification && <Text size={18}>{product.specification.material}</Text>}
//                                                 <Group spacing={64} align={'center'}>
//                                                     <Select w={100} label="SIZE" value={size} onChange={setSize} data={
//                                                         product.specification?.sizes?.map(size => {
//                                                             return {label: size, value: size}
//                                                         })
//                                                     }/>
//                                                     <Text lh={0.8} size={36} color={theme.colors.mvpz[8]} ff={"SpriteGraffiti-Regular"} w={240}>{product.design.availability?.toUpperCase()}</Text>
//                                                 </Group>
//                                                 <Group mt={4}>
//                                                     <Button onClick={() => router.push(`/apparel/${product.id}`)} variant={'light'}><IconEye/></Button>
//                                                     <Button ff="MonumentExtended-Regular" disabled={quantity <= 0} onClick={() => gotoCheckout(product.stripePriceId, quantity, product.variants[0].id)} py={4} fw={900} style={{color:'black',letterSpacing: '.2rem', fontSize: 10}}>PURCHASE</Button>
//                                                     <NumberInput style={{fontFamily: 'MonumentExtended-Regular', color: 'white !important'}} min={1} w={60} value={quantity} onChange={(e) => setQuantity(+e)}></NumberInput>
//                                                 </Group>
//                                             </Stack>}                                         
//                                         </DIV>
//                                     </Carousel.Slide>
//                                 )
//                             })}
//                             </Carousel> : 
//                             <SimpleGrid cols={largeScreen ? 4 : 1}>
//                                 {products.map(product => {
//                                 return (
//                                     <Stack spacing={2} key={product.id} align={"center"}>
//                                         <Image onClick={() => router.push(`/apparel/${product.id}`)} className={classes.image} src={product.images[0]}></Image>
//                                         <Text size={32}>${product.cost}</Text>
//                                         <Text size={'sm'}>{product.name}</Text>
//                                     </Stack>
//                                 )})}
//                             </SimpleGrid>}
//                             {!viewAll && <Group position="center"><Button onClick={() => setViewAll(true)}>View All</Button></Group>}
//                         </Stack>
//                     </Tabs.Panel>
//                 </Tabs>
//             </Stack>
//         </Container>
//     )
// }

// export default Apparel;