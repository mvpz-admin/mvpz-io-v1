// import { Avatar, Box, Button, Card, Container, createStyles, Divider, Grid, Group, Image, Loader, Modal, Paper, Radio, rem, ScrollArea, SimpleGrid, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { IconArrowBack, IconArrowLeft, IconAt, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandTwitter, IconBrandX } from "@tabler/icons-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { callAPI, downloadFile } from "../../lib/utils";

// const useStyles = createStyles((theme) => ({
//     wrapper: {
//         position: 'relative',
//         boxSizing: 'border-box',
//         maxWidth: 1200,
//         [theme.fn.smallerThan('xs')]:{
//             padding: 0,
//             marginLeft: 8,
//             marginRight: 8
//         },
//         [theme.fn.largerThan('xs')]:{
//             padding: 20
//         }
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
//     },
//     card: {
//         background: theme.colors.gray[8]
//     },
//     editProfile: {
//         [theme.fn.smallerThan('sm')]: {
//             display: 'none'
//         }
//     },
//     horizontalScroll: {
//         [theme.fn.largerThan('xs')]: {
//             display: 'none'
//         }
//     },
//     noHorizontalScroll: {
//         [theme.fn.smallerThan('xs')]: {
//             display: 'none'
//         }
//     },
//     bannerImage: {
//         [theme.fn.smallerThan('sm')]:{
//             minHeight: 120
//         }
//     },
//     tribeImage: {
//         border: `5px solid ${theme.colors.mvpz[9]}`
//     }
// }))


// export default function MyProfileOld (){

//     const {classes} = useStyles()
//     const {data: session, status} = useSession()
//     const router = useRouter()
//     const isAthlete = session?.user?.role === 'Athlete'
//     const [cards, setCards] = useState([])
//     const [editMe, setEditMe] = useState(false)
//     const [aboutMe, setAboutMe] = useState('')
//     const {update} = useSession()
//     const [images, setImages] = useState({} as any)
//     const [tribeOpened, {close: closeTribeModal, open: openTribeModal}] = useDisclosure()
//     const [socialOpened, {close: closeSocialModal, open: openSocialModal}] = useDisclosure()
//     const [user, setUser] = useState({} as any)
//     const [loading, setLoading] = useState(false)
//     const [tribeAthlete, setTribeAthlete] = useState(null)
//     const [tribeTeam, setTribeTeam] = useState(null)
//     const [tribeSport, setTribeSport] = useState(null)

//     const saveSocial = async() => {
//         if(!user.socialLinks?.length){
//             user.socialLinks = []
//         }
//         if(user.facebookUrl){
//             const fbLink = user.socialLinks?.find(l => l.socialBrand === 'facebook')
//             !!fbLink ? fbLink.link = user.facebookUrl : user.socialLinks.push({socialBrand: 'facebook', link: user.facebookUrl})
//         }
//         if(user.twitterUrl){
//             const twitterLink = user.socialLinks?.find(l => l.socialBrand === 'X' || l.socialBrand === 'twitter')
//             !!twitterLink ? twitterLink.link = user.twitterUrl : user.socialLinks.push({socialBrand: 'twitter', link: user.twitterUrl})
//         }
//         if(user.instagramUrl){
//             const instaLink = user.socialLinks?.find(l => l.socialBrand === 'instagram')
//             !!instaLink ? instaLink.link = user.instagramUrl : user.socialLinks.push({socialBrand: 'instagram', link: user.instagramUrl})
//         }
//         if(user.linkedinUrl){
//             const linkedinLink = user.socialLinks?.find(l => l.socialBrand === 'linkedin')
//             !!linkedinLink ? linkedinLink.link = user.linkedinUrl : user.socialLinks.push({socialBrand: 'linkedin', link: user.linkedinUrl})
//         }
//         if(user.tiktokUrl){
//             const tiktokLink = user.socialLinks?.find(l => l.socialBrand === 'tiktok')
//             !!tiktokLink ? tiktokLink.link = user.tiktokUrl : user.socialLinks.push({socialBrand: 'tiktok', link: user.tiktokUrl})
//         }
//         if(user.socialLinks.length){
//             setLoading(true)
//             const response = await callAPI({method: 'POST', body: {socialLinks: user.socialLinks}, endpoint: '/api/user/updateProfile'})
//             setLoading(false)
//         }
//         closeSocialModal()
//     }

//     const getSocialLinks = (isEdit=false) => {
//         if(user && (user.socialLinks?.length || !!isEdit)){
//             return (
//                 isEdit ? <Stack>
//                     <SimpleGrid cols={2} breakpoints={[{maxWidth: 'xs', cols: 1}]}>
//                         <TextInput value={user.facebookUrl} icon={<IconAt size={18}/>} label="Facebook handle" onChange={e => setUser({...user, facebookUrl: e.currentTarget.value})}/>
//                         <TextInput value={user.twitterUrl} icon={<IconAt size={18}/>} label="Twitter handle" onChange={e => setUser({...user, twitterUrl: e.currentTarget.value})}/>
//                     </SimpleGrid>
//                     <SimpleGrid cols={2} breakpoints={[{maxWidth: 'xs', cols: 1}]}>
//                         <TextInput value={user.instagramUrl} icon={<IconAt size={18}/>} label="Instagram handle" onChange={e => setUser({...user, instagramUrl: e.currentTarget.value})}/>
//                         <TextInput value={user.linkedinUrl} icon={<IconAt size={18}/>} label="Linkedin handle" onChange={e => setUser({...user, linkedinUrl: e.currentTarget.value})}/>
//                     </SimpleGrid>
//                     <SimpleGrid cols={2} breakpoints={[{maxWidth: 'xs', cols: 1}]}>
//                         <TextInput value={user.tiktokUrl} icon={<IconAt size={18}/>} label="Tiktok handle" onChange={e => setUser({...user, tiktokUrl: e.currentTarget.value})}/>
//                     </SimpleGrid>
//                     <Group position="right">
//                         <Button variant={'outline'} onClick={closeSocialModal}>Cancel</Button>
//                         <Button onClick={saveSocial}>Save</Button>
//                     </Group>
//                 </Stack>
//                 :<Group spacing={'xl'} position='left' mt={32}>                                    
//                     {!!user.instagramUrl && <a href={user.instagramUrl} target="_blank"><IconBrandInstagram size={36}/></a>}
//                     {!!user.twitterUrl && <a href={user.twitterUrl} target="_blank"><IconBrandX size={36}/></a>}
//                     {!!user.facebookUrl && <a href={user.facebookUrl} target="_blank"><IconBrandFacebook size={36}/></a>}
//                     {!!user.linkedinUrl && <a href={user.linkedinUrl} target="_blank"><IconBrandLinkedin size={36}/></a>}
//                     {!!user.tiktokUrl && <a href={user.tiktokUrl} target="_blank"><IconBrandTiktok size={36}/></a>}
//                 </Group>
//             )
//         }else {
//             return <Text>None</Text>
//         }
//     }
    
//     const saveAboutMe = async (aboutMe: string) => {
//         setLoading(true)
//         const response = await callAPI({method: 'POST', body: {aboutMe}, endpoint: '/api/user/updateProfile'})
//         setLoading(false)
//         setEditMe(false)
//         fetchUser()
//     }

//     const saveTribe = async () => {
//         setLoading(true)
//         const response = await callAPI({method: 'POST', body: {tribeValuablePlayer: user.tribeValuablePlayer, tribeSport: user.tribeSport, tribeTeam: user.tribeTeam}, endpoint: '/api/user/updateProfile'})
//         setLoading(false)
//         closeTribeModal()
//         fetchUser()
//     }

//     async function downloadImages(_cards, authToken, url){
//         let finalCards = []
//         for(let card of _cards){
//             const match = finalCards.find(c => c.nftEntity.id === card.nftEntity.id)
//             if(!!match){
//                 continue
//             }
//             if(card.nftEntity?.cardImageNFT){
//                 card.displayImage = await downloadFile(`${url}/file/mvpz-nfts-optimized/${card.nftEntity.cardImageNFT}`, authToken)
//             }
//             finalCards.push(card)
//         }
//         setCards(finalCards)
//     }

//     async function downloadUserImages(_user, authToken, url){
//         let downloadedImages = {} as any
//         if(_user.image){
//             if(_user.image.includes('http')){
//                 downloadedImages.profileImage = _user.image
//             }else{
//                 downloadedImages.profileImage = await downloadFile(`${url}/file/mvpz-user-private/${_user.image}`, authToken)
//             }
//         }
//         if(_user.bannerImage){
//             downloadedImages.bannerImage = await downloadFile(`${url}/file/mvpz-user-private/${_user.bannerImage}`, authToken)
//         }
//         if(_user.cardImage){
//             downloadedImages.cardImage = await downloadFile(`${url}/file/mvpz-user-private/${_user.cardImage}`, authToken)
//         }
//         setImages(downloadedImages)
//     }

//     const gotoMint = async() => {
//         // const session = await fetch('/api/user/mintSession', {method: 'GET', headers: {'Content-Type':'application/json'}})
//         // const sessionJSON = await session.json()
//         // window.location.assign(`https://mint.mvpz.io/buy?t=${sessionJSON}`)
//         router.push('/mvpz-store')
//     }

//     const fetchCards = async () => {
//         const result = await callAPI({endpoint: '/api/card/myCards', method: 'GET'})
//         if(result.cards?.length){
//             downloadImages(result.cards, result.imageDownload?.authorizationToken, result.imageDownload?.downloadUrl)            
//         }
//     }

//     const renderCards = (type: string) => {
//         return (
//             !!cards.filter(c => c.nftEntity?.type === type)?.length && 
//             <Stack mt={16}>
//                 <Text size={'lg'} align="center" transform="capitalize">{type} Cards</Text>
//                 <ScrollArea w={window.innerWidth-16} className={classes.horizontalScroll}>
//                     <Box w={window.innerWidth*2.5}>
//                     <SimpleGrid cols={5} ml={32}>                    
//                         {cards.filter(c => c.nftEntity.type === type).map(card => {
//                             return <Image key={card.id} style={{cursor: 'pointer'}} onClick={() => router.push(`/card/${card.id}`)} width={200} src={card.displayImage}></Image>
//                         })}                        
//                     </SimpleGrid>
//                     </Box>
//                 </ScrollArea>
//                 <SimpleGrid cols={5}  ml={32} className={classes.noHorizontalScroll}>                    
//                     {cards.filter(c => c.nftEntity.type === type).map(card => {
//                         return <Image key={card.id} style={{cursor: 'pointer'}} onClick={() => router.push(`/card/${card.id}`)} width={200} src={card.displayImage}></Image>
//                     })}                        
//                 </SimpleGrid>
//             </Stack>
//         )
//     }

//     const fetchUser = async () => {
//         setLoading(true)
//         const result = await callAPI({endpoint: '/api/user/getProfile'}) 
//         setLoading(false)     
//         if(result.user){
//             result.user.twitterUrl = result.user.socialLinks?.find(l => l.socialBrand === 'X' || l.socialBrand === 'twitter')?.link || null
//             result.user.instagramUrl = result.user.socialLinks?.find(l => l.socialBrand === 'instagram')?.link || null
//             result.user.facebookUrl = result.user.socialLinks?.find(l => l.socialBrand === 'facebook')?.link || null
//             result.user.linkedinUrl = result.user.socialLinks?.find(l => l.socialBrand === 'linkedin')?.link || null
//             result.user.tiktokUrl = result.user.socialLinks?.find(l => l.socialBrand === 'tiktok')?.link || null
//             setUser(result.user)
//             setAboutMe(result.user.aboutMe)
//             if(result.imageDownload){
//                 await downloadUserImages(result.user, result.imageDownload?.authorizationToken, result.imageDownload?.downloadUrl)
//             }
//         }        
//     }

//     useEffect(() => {
//         if(user?.id && cards?.length){
//             if(user.tribeValuablePlayer){
//                 const match = cards.find(card => card.nftEntity.id === user.tribeValuablePlayer)
//                 if(match){
//                     setTribeAthlete(match)
//                 }
//             }
//             if(user.tribeSport){
//                 const match = cards.find(card => card.nftEntity.id === user.tribeSport)
//                 if(match){
//                     setTribeSport(match)
//                 }
//             }
//             if(user.tribeTeam){
//                 const match = cards.find(card => card.nftEntity.id === user.tribeTeam)
//                 if(match){
//                     setTribeTeam(match)
//                 }
//             }
//         }
//     },[user, cards])

//     useEffect(() => {
//         if(session && !session.user?.username){
//             router.push('/auth/newUser')
//         }
//         if(session?.user && !user?.id){
//             fetchUser()
//             fetchCards()
//         }
//     },[session])

//     return ( !session || loading ? <Loader/> :
//         <>
//             <Container fluid className={classes.wrapper}>
//                 <Group mb={16} position="apart">
//                     <IconArrowLeft onClick={() => router.back()} className={classes.backButton}/>
//                     <Button variant={'outline'} onClick={() => router.push('/profile/wallet')}>Manage Wallets</Button>
//                 </Group>
//                 <Image src={images.bannerImage ? images.bannerImage : '/images/Upload_banner.png'} className={classes.bannerImage}></Image>
//                 <Group position="apart" mt={16} spacing={'lg'}>
//                     <Group position="left" mt={16} spacing={'lg'}>
//                         <Avatar size={144} radius={72} src={images.profileImage} className={classes.avatar}></Avatar>
//                         <div>
//                             <Title mb={2}>{user.name}</Title>
//                             <Text size="xs" mt={2} color="dimmed">{!!isAthlete ? `Athlete ${user.primaryPosition} ${user.primarySport}` : `Sports Fan ${user.primarySport}`}</Text>
//                             <Text size="xs" mt={2} color="dimmed">{!!isAthlete ? (user.currentSchool || '') : (user.favoriteCollegeTeam || '')}</Text>
//                         </div>                        
//                     </Group>
//                     <Group position="right" spacing={'lg'} >
//                         <Button onClick={() => router.push("/profile")}>Edit profile</Button>
//                     </Group>
//                 </Group>
//                 <Grid mb={64}  gutterSm={64}>
//                     <Grid.Col sm={5} xs={12}>
//                         <Stack mb={32}>
//                             {!!user.socialLinks?.length && <Group position="apart">
//                                 {getSocialLinks()}
//                                 <Button variant={'subtle'}  onClick={openSocialModal}>Edit</Button>
//                             </Group>}
//                             <Modal size={'lg'} centered opened={socialOpened} onClose={closeSocialModal} title="Social Links" overlayProps={{opacity: 0.55,blur: 3,}}>
//                                 <Stack>
//                                     {getSocialLinks(true)}
//                                 </Stack>
//                             </Modal>
//                             <Group position="apart" mt={32}>
//                                 <Text size={'xl'} fw={700} color={'white'}>About {user.name?.split(' ')[0]}</Text>
//                                 {!editMe && <Button variant={"subtle"} onClick={() => setEditMe(true)}>Edit</Button>}
//                                 {!!editMe && <Group>
//                                     <Button variant={"subtle"} onClick={() => setEditMe(false)}>Cancel</Button>
//                                     <Button variant={"subtle"} onClick={() => saveAboutMe(aboutMe)}>Save</Button>
//                                 </Group>}
//                             </Group>
//                             {!!editMe ? <Textarea autosize value={aboutMe} onChange={(e) => setAboutMe(e.currentTarget.value)}>
//                             </Textarea> 
//                             : <Text mt={8}>
//                             {user.aboutMe || 'None'}
//                             </Text>}                            
//                         </Stack>
//                     </Grid.Col>
//                     <Grid.Col sm={7} xs={12}>
//                         <Modal size={'xl'} centered opened={tribeOpened} onClose={closeTribeModal} title="My Tribe" overlayProps={{opacity: 0.55,blur: 3,}}>
//                             <Stack ml={32}>
//                                 <Title order={3}>Select Most Valuable Player</Title>
//                                 <SimpleGrid cols={3} spacing={'xl'}>
//                                 {cards.filter(c => c.nftEntity.type === 'Athlete').map(card => {
//                                     return (
//                                     <Image key={card.id} className={ user.tribeValuablePlayer === card.nftEntity.id ? classes.tribeImage : null} 
//                                             src={card.displayImage}
//                                         onClick={(e) => setUser({...user, tribeValuablePlayer: card.nftEntity.id})}></Image>
//                                     )
//                                 })}
//                                 </SimpleGrid>

//                                 <Title order={3}>Select Team</Title>
//                                 <SimpleGrid cols={3} spacing={'xl'}>
//                                 {cards.filter(c => c.nftEntity.type === 'Team').map(card => {
//                                     return (
//                                     <Image key={card.id} className={ user.tribeTeam === card.nftEntity.id ? classes.tribeImage : null} 
//                                         src={card.displayImage}
//                                         onClick={(e) => setUser({...user, tribeTeam: card.nftEntity.id})}>                                            
//                                     </Image>
//                                 )})}
//                                 </SimpleGrid>

//                                 <Title order={3}>Select Sport</Title>
//                                 <SimpleGrid cols={3}>
//                                 {cards.filter(c => c.nftEntity.type === 'Activity').map(card => {
//                                     return (
//                                     <Image key={card.id} className={ user.tribeSport === card.nftEntity.id ? classes.tribeImage : null} 
//                                         src={card.displayImage}
//                                         onClick={(e) => setUser({...user, tribeSport: card.nftEntity.id})}>                                            
//                                     </Image>
//                                     )
//                                 })}
//                                 </SimpleGrid>
                                
//                                 <Group position="right">
//                                     <Button variant={'outline'} onClick={closeTribeModal}>Cancel</Button>
//                                     <Button onClick={saveTribe}>Save</Button>
//                                 </Group>
//                             </Stack>
//                         </Modal>
//                         <Stack mt={32}>
//                             <Group position="apart">
//                                 <Title order={2}>My Tribe</Title>
//                                 <Button  className={classes.editProfile} variant={'subtle'} onClick={openTribeModal}>Edit</Button>
//                             </Group>
//                             <SimpleGrid cols={3} >
//                                 <Stack>
//                                     <Image onClick={openTribeModal} src={tribeSport ? tribeSport.displayImage : '/images/select_tribe.png'}></Image>
//                                     <Text align="center">My Sport</Text>
//                                 </Stack>
//                                 <Stack>
//                                     <Image onClick={openTribeModal} src={tribeTeam ? tribeTeam.displayImage : '/images/select_tribe.png'}></Image>
//                                     <Text align="center">My Team</Text>
//                                 </Stack>
//                                 <Stack>
//                                     <Image onClick={openTribeModal} src={tribeAthlete ? tribeAthlete.displayImage : '/images/select_tribe.png'}></Image>
//                                     <Text align="center">Most Valuable Player</Text>
//                                 </Stack>
//                             </SimpleGrid>
//                         </Stack>
//                     </Grid.Col>
//                 </Grid>
//                 <Title>My Collection</Title>
//                 {!cards.length && 
//                 <>
//                     <Image  src="/images/buynow_2.png"></Image>
//                     <Group position="center">
//                         <Button onClick={() => gotoMint()}>Buy Cards</Button>
//                     </Group>
//                 </>}
//                 {renderCards('Athlete')}
//                 {renderCards('Team')}
//                 {renderCards('Championship')}
//                 {renderCards('Activity')}
//             </Container>
//         </>
//     )
// }