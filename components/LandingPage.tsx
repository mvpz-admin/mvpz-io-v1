// import { Avatar, Button, Card, Container, createStyles, Divider, Grid, Group, Image, Loader, Paper, rem, SimpleGrid, Stack, Text, Title } from "@mantine/core";
// import { IconArrowBack, IconArrowLeft, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandTwitter } from "@tabler/icons-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { downloadFile } from "../lib/utils";

// const useStyles = createStyles((theme) => ({
//     wrapper: {
//         position: 'relative',
//         boxSizing: 'border-box',
//         paddingLeft: 0,
//         paddingRight: 0
//     },
//     backButton:{
//         flexDirection:'column',
//         textAlign: 'start',
//         cursor: 'pointer',
//         padding:  `${rem(2)} ${rem(2)}`
//     },
//     label: {
//         fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//         fontWeight: 700,
//         lineHeight: 1
//     },
//     avatar: {
//         zIndex: 9,
//         marginTop: -144,
//         marginLeft: 16,
//         marginRight: 16,
//         border: `${rem(2)} solid ${theme.colors.gray[8]}`,
//         borderRadius: 48
//     },
//     editButton: {
//         border: 'transparent'
//     },
//     card: {
//         background: theme.colors.gray[8]
//     }
// }))

// export default function LandingPage(props) {
//     const {classes} = useStyles()
//     const {data: session, status} = useSession()
//     const router = useRouter()
//     const isAthlete = session?.user?.role === 'Athlete'
//     const [cards, setCards] = useState([])

//     const getSocialLinks = () => {
//         if(session?.user?.socialLinks?.length){
//             const twitterLink = session.user.socialLinks.find(l => l.socialBrand === 'X')?.link || null
//             const instaLink = session.user.socialLinks.find(l => l.socialBrand === 'Instagram')?.link || null
//             return (
//                 <Group spacing={'xl'} position='left' mt={16}>                                    
//                     {!!instaLink && <a href={instaLink} target="_blank"><IconBrandInstagram/></a>}
//                     {!!twitterLink && <a href={twitterLink} target="_blank"><IconBrandTwitter/></a>}
//                     {/* <IconBrandFacebook/>
//                     <IconBrandLinkedin/>
//                     <IconBrandTiktok/> */}
//                 </Group>
//             )
//         }else {
//             return <Text>None</Text>
//         }
//     }
//     async function downloadImages(_cards, authToken, url){
//         for(let card of _cards){
//             if(card.nftEntity?.cardImageNFT){
//                 card.displayImage = await downloadFile(`${url}/file/mvpz-nfts-optimized/${card.nftEntity.cardImageNFT}`, authToken)
//             }
//         }
//         setCards(_cards)
//     }

//     const gotoMint = async() => {
//         // const session = await fetch('/api/user/mintSession', {method: 'GET', headers: {'Content-Type':'application/json'}})
//         // const sessionJSON = await session.json()
//         // window.location.assign(`https://mint.mvpz.io/buy?t=${sessionJSON}`)
//         router.push('/mvpz-store')
//     }

//     useEffect(() => {
//         if(!session?.user?.username){
//             router.push('/auth/newUser')
//         }
//         fetch('/api/card/myCards')
//         .then(response => response.json())
//         .then(async result => {
//             if(result.cards?.length){
//                 downloadImages(result.cards, result.imageDownload?.authorizationToken, result.imageDownload?.downloadUrl)            
//             }
//         }).catch(err => console.log(err))
//     },[])

//     return ( !session ? <Loader/> :
//         <>
//             <Container fluid className={classes.wrapper}>
//                 <Group mb={16}><IconArrowLeft className={classes.backButton}/></Group>
//                 <Image src={session?.user?.bannerImage ? session.user.bannerImage : '/images/Upload_banner.png'} height={360}></Image>
//                 <Group position="apart" mt={16} spacing={'lg'}>
//                     <Group position="left" mt={16} spacing={'lg'}>
//                         <Avatar size={'xl'} radius='xl' src={session.user.image} className={classes.avatar}></Avatar>
//                         <div>
//                             <Text mb={2}>{session.user.name}</Text>
//                             <Text size="xs" mt={2} color="dimmed">{!!isAthlete ? `Athlete ${session.user.primaryPosition} ${session.user.primarySport}` : `Sports Fan ${session.user.primarySport}`}</Text>
//                             <Text size="xs" mt={2} color="dimmed">{!!isAthlete ? (session.user.currentSchool || '') : (session.user.favoriteCollegeTeam || '')}</Text>
//                             {/* <Text size="xs" mt={2} color="dimmed">Senior</Text> */}
//                         </div>                        
//                     </Group>
//                     <Group position="right" spacing={'lg'}>
//                         <div>
//                             <Text className={classes.label}>{cards?.length || 0}</Text>
//                             <Text size="xs" color="dimmed" mt={4}>
//                                 Cards
//                             </Text>
//                         </div>
//                         <Divider orientation="vertical" size={'md'}/>
//                         {/* <div>
//                             <Text className={classes.label}>500</Text>
//                             <Text size="xs" color="dimmed">
//                                 Followers
//                             </Text>
//                         </div>
//                         <Divider orientation="vertical" size={'md'}/>
//                         <div>
//                             <Text className={classes.label}>500</Text>
//                             <Text size="xs" color="dimmed">
//                                 Following
//                             </Text>
//                         </div> */}
//                         <Button onClick={() => router.push("/profile")}>Edit profile</Button>
//                     </Group>
//                 </Group>
//                 <Grid mb={64}>
//                     <Grid.Col span={5}>
//                         <Stack mb={32}>
//                             <Group position="apart" mt={32}>
//                                 <Text size={'xl'} fw={700} color={'white'}>About {session.user.name.split(' ')[0]}</Text>
//                                 <Button variant={"outline"} className={classes.editButton}>Edit</Button>
//                             </Group>
//                             <Text mt={8}>
//                             {session.user.aboutMe || 'None'}
//                             </Text>
//                             {session.user.socialLinks?.length && <>
//                                 <Text mt={32} size={'xl'} fw={700} color={'white'}>Links</Text>
//                                 {getSocialLinks()}                               
//                             </>}
//                             {/* <Image ml={32} mt={32} src="/images/FounderCardEvan.png" width={"90%"}></Image>  */}
                             
//                             {/* <Paper mt={16} p={"xl"} shadow="lg" className={classes.card} radius='lg'>
//                                 <Title order={2}>Sales Summary</Title>
//                                 <Grid mt={16}>
//                                     <Grid.Col span={8}>Cards sold singularly</Grid.Col>
//                                     <Grid.Col span={2}>30</Grid.Col>
//                                     <Grid.Col span={2}>$200</Grid.Col>
//                                 </Grid>
//                                 <Grid mt={16}>
//                                     <Grid.Col span={8}>Cards sold via pack</Grid.Col>
//                                     <Grid.Col span={2}>30</Grid.Col>
//                                     <Grid.Col span={2}>$200</Grid.Col>
//                                 </Grid>
//                                 <Grid mt={16}>
//                                     <Grid.Col span={8}>Cards remaining</Grid.Col>
//                                     <Grid.Col span={2}>30</Grid.Col>
//                                 </Grid>
//                                 <Grid mt={16}>
//                                     <Grid.Col span={8}>Secondary trading</Grid.Col>
//                                     <Grid.Col span={2}>30</Grid.Col>
//                                     <Grid.Col span={2}>$200</Grid.Col>
//                                 </Grid>
//                                 <Grid mt={16}>
//                                     <Grid.Col span={8}>Affiliate bonus + tips</Grid.Col>
//                                     <Grid.Col span={2}>30</Grid.Col>
//                                     <Grid.Col span={2}>$200</Grid.Col>
//                                 </Grid>
//                                 <Grid mt={16}>
//                                     <Grid.Col span={8}>Total</Grid.Col>
//                                     <Grid.Col span={2}>30</Grid.Col>
//                                     <Grid.Col span={2}>$200</Grid.Col>
//                                 </Grid>                                
//                             </Paper>} */}
//                             {/* <div style={{textAlign: 'center', marginTop: 16}}><Button w={'50%'}>Marketing Support</Button></div> */}
//                         </Stack>
//                     </Grid.Col>
//                     <Grid.Col span={7}>
//                         <Stack ml={64} mt={32}>
//                             <Title ml={32} order={2}>Cards</Title>
//                             {!!cards?.length ? <SimpleGrid cols={3} ml={32}>
//                                 {cards.slice(0,3).map(card => {
//                                     return <Card p={0}><Image  src={card.displayImage}></Image></Card>
//                                 })}
//                             </SimpleGrid> : <><Image  src="/images/no_cards.png"></Image><Group position="center"><Button onClick={() => gotoMint()}>Buy Cards</Button></Group></>}
//                             {/* <Title ml={32} mt={16} order={2}>Enhancements</Title>
//                             <SimpleGrid cols={3} ml={32}>
//                                 <Card p={0}><Image  src="/images/4.png"></Image></Card>
//                                 <Card p={0}><Image  src="/images/5.png"></Image></Card>
//                                 <Card p={0}><Image  src="/images/6.png"></Image></Card>
//                             </SimpleGrid>
//                             <Title ml={32} mt={16} order={2}>Affiliate brands</Title>
//                             <SimpleGrid cols={3} ml={32}>
//                                 <Card p={0}><Image  src="/images/7.png"></Image></Card>
//                                 <Card p={0}><Image  src="/images/8.png"></Image></Card>
//                                 <Card p={0}><Image  src="/images/9.png"></Image></Card>
//                             </SimpleGrid>
//                             <Title ml={32} mt={16} order={2}>Athletes merch</Title>
//                             <SimpleGrid cols={3} ml={32}>
//                                 <Card p={0}><Image  src="/images/10.png"></Image></Card>
//                                 <Card p={0}><Image  src="/images/11.png"></Image></Card>
//                             </SimpleGrid> */}
//                         </Stack>
//                     </Grid.Col>
//                 </Grid>
//             </Container>
//         </>
//     )
// }