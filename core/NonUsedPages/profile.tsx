// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   createStyles,
//   Grid,
//   Group,
//   Image,
//   Loader,
//   Modal,
//   rem,
//   ScrollArea,
//   SimpleGrid,
//   Stack,
//   Text,
//   Title,
//   useMantineTheme,
// } from "@mantine/core";
// import { useDisclosure, useMediaQuery } from "@mantine/hooks";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import AthleteProfile from "../../components/profile/AthleteProfile";
// import { FooterSocial } from "../../components/FooterSocial";
// import { callAPI, downloadFile, downloadUserImages } from "../../lib/utils";
// import AboutMe from "../../components/profile/AboutMe";
// import SocialLinks from "../../components/profile/SocialLinks";
// import ShoutSection from "../../components/profile/ShoutSection";
// import HighlightVideo from "../../components/profile/HighlightVideo";

// const useStyles = createStyles((theme) => ({
//   wrapper: {
//     position: "relative",
//     boxSizing: "border-box",
//     maxWidth: 1200,
//     [theme.fn.smallerThan("xs")]: {
//       padding: 0,
//       marginLeft: 8,
//       marginRight: 8,
//     },
//     [theme.fn.largerThan("xs")]: {
//       padding: 20,
//     },
//   },
//   backButton: {
//     flexDirection: "column",
//     textAlign: "start",
//     cursor: "pointer",
//     padding: `${rem(2)} ${rem(2)}`,
//   },
//   label: {
//     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//     fontWeight: 700,
//     lineHeight: 1,
//   },
//   avatar: {
//     [theme.fn.smallerThan("xs")]: {
//       height: 120,
//       width: 120,
//       borderRadius: 64,
//       marginTop: -90,
//       marginLeft: "auto !important",
//       marginRight: "auto !important",
//     },
//     zIndex: 9,
//     marginTop: "-130px",
//     marginLeft: 16,
//     marginRight: 16,
//     border: `${rem(2)} solid ${theme.colors.gray[8]}`,
//     borderRadius: "9rem",
//     height: "200px",
//     width: "200px",
//   },
//   card: {
//     background: theme.colors.gray[8],
//   },
//   editProfile: {
//     [theme.fn.smallerThan("sm")]: {
//       display: "none",
//     },
//   },
//   horizontalScroll: {
//     [theme.fn.largerThan("xs")]: {
//       display: "none",
//     },
//   },
//   noHorizontalScroll: {
//     [theme.fn.smallerThan("xs")]: {
//       display: "none",
//     },
//   },
//   bannerImage: {
//     [theme.fn.smallerThan("sm")]: {
//       minHeight: 120,
//     },
//     height: "100%",
//   },
//   tribeImage: {
//     border: `5px solid ${theme.colors.mvpz[9]}`,
//   },
//   comment: {
//     height: "200px",
//     background: "rgb(26, 25, 25)",
//     border: "transparent",
//     padding: "15px",
//     overflow: "hidden",
//     textAlign: "justify",
//     width: "94%",
//     marginLeft: "auto",
//     marginRight: 0,
//   },
//   displayOnMobile: {
//     [theme.fn.largerThan("sm")]: {
//       display: "none !important",
//     },
//   },
//   displayOnBrowser: {
//     [theme.fn.smallerThan("sm")]: {
//       display: "none !important",
//     },
//   },
//   userProfile: {
//     [theme.fn.smallerThan("sm")]: {
//       display: "flex !important",
//       flexDirection: "column",
//       padding: "5px",
//       margin: "auto",
//       justifyContent: "center",
//     },
//   },
//   blue: {
//     color: '#8c52ff',
//   },
//   tribeGroup: {
//     height: "80px",
//     bottom: "-42px",
//     position: "absolute",
//     width: "calc(100% + 30px)",
//     background: `#8c52ff`,
//     zIndex: 1,
//     alignItems: "end",
//     justifyContent: "space-between",
//     marginLeft: "-20px",
//     [theme.fn.smallerThan("sm")]: {
//       width: "calc(100% + 20px)",
//       height: "80px !important",
//     },
//   },
//   tribeText: {
//     color: "black",
//     fontWeight: 700,
//     zIndex: 3,
//     padding: "4px 20px",
//     textTransform: "uppercase",
//     [theme.fn.smallerThan("sm")]: {
//       fontSize: "18px !important",
//     },
//   },
//   viewAllText: {
//     color: "black",
//     zIndex: 3,
//     fontWeight: 600,
//     padding: "8px 12px",
//     cursor: "pointer",
//     [theme.fn.smallerThan("sm")]: {
//       fontSize: "12px !important",
//     },
//   },  
// }));

// export default function Profile() {
//   const { data: session, status } = useSession();
//   const router = useRouter()
//   const [user, setUser] = useState({} as any)
//   const [loading, setLoading] = useState(false)

//   const fetchUser = async () => {
//     setLoading(true);
//     const result = await callAPI({ endpoint: "/api/user/getProfile" });
//     setLoading(false);
//     if (result.user) {
//       if (result.imageDownload) {
//         const images = await downloadUserImages(
//           result.user,
//           result.imageDownload?.authorizationToken,
//           result.imageDownload?.downloadUrl
//         );
//         if(images){
//           result.user.profileDisplayImage = images.profileImage
//           result.user.bannerDisplayImage = images.bannerImage
//           result.user.cardDisplayImage = images.cardImage
//         }
//       }
//       setUser(result.user);
//     }
//   };

//   useEffect(() => {
//     if (session && !session.user?.username) {
//       router.push("/auth/newUser");
//     }
//     if (session?.user && !user?.id && session.user.role === 'Athlete') {
//       fetchUser();
//     }
//   }, [session]);

//   return(
//     !session || !!loading ? <Loader size={'md'}/> : session.user?.role === 'Athlete' ? <AthleteProfile user={user}/> : <MyProfile/>
//   )
// }

// export function MyProfile() {
//   const { classes } = useStyles();
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const isAthlete = session?.user?.role === "Athlete";
//   const [cards, setCards] = useState([]);
//   const { update } = useSession();
//   const [images, setImages] = useState({} as any);
//   const [tribeOpened, { close: closeTribeModal, open: openTribeModal }] =
//     useDisclosure();
//   const [user, setUser] = useState({} as any);
//   const [loading, setLoading] = useState(false);
//   const [tribeAthlete, setTribeAthlete] = useState(null);
//   const [tribeTeam, setTribeTeam] = useState(null);
//   const [tribeSport, setTribeSport] = useState(null);
//   const largeScreen = useMediaQuery("(min-width: 60em)");
//   const theme = useMantineTheme();
//   const GroupOrStack = largeScreen ? Stack : Group
//   const isMyProfile = status === 'authenticated' && session.user?.id === user?.id

//   const saveTribe = async () => {
//     setLoading(true);
//     const response = await callAPI({
//       method: "POST",
//       body: {
//         tribeValuablePlayer: user.tribeValuablePlayer,
//         tribeSport: user.tribeSport,
//         tribeTeam: user.tribeTeam,
//       },
//       endpoint: "/api/user/updateProfile",
//     });
//     setLoading(false);
//     closeTribeModal();
//     fetchUser();
//   };

  

//   async function downloadImages(_cards, authToken, url) {
//     let finalCards = [];
//     for (let card of _cards) {
//       const match = finalCards.find(
//         (c) => c.nftEntity.id === card.nftEntity.id
//       );
//       if (!!match) {
//         continue;
//       }
//       if (card.nftEntity?.cardImageNFT) {
//         card.displayImage = await downloadFile(
//           `${url}/file/mvpz-nfts-optimized/${card.nftEntity.cardImageNFT}`,
//           authToken
//         );
//       }
//       finalCards.push(card);
//     }
//     setCards(finalCards);
//   }

  

//   const gotoMint = async () => {
//     // const session = await fetch('/api/user/mintSession', {method: 'GET', headers: {'Content-Type':'application/json'}})
//     // const sessionJSON = await session.json()
//     // window.location.assign(`https://mint.mvpz.io/buy?t=${sessionJSON}`)
//     router.push("/mvpz-store");
//   };

//   const fetchCards = async () => {
//     const result = await callAPI({
//       endpoint: "/api/card/myCards",
//       method: "GET",
//     });
//     if (result.cards?.length) {
//       downloadImages(
//         result.cards,
//         result.imageDownload?.authorizationToken,
//         result.imageDownload?.downloadUrl
//       );
//     }
//   };

//   const renderCards = (type: string) => {
//     return (
//       !!cards.filter((c) => c.nftEntity?.type === type)?.length && (
//         <Stack mt={16}>
//           <Text size={"lg"} align="center" transform="capitalize">
//             {type} Cards
//           </Text>
//           <ScrollArea
//             w={window.innerWidth - 16}
//             className={classes.horizontalScroll}
//           >
//             <Box w={window.innerWidth * 2.5}>
//               <SimpleGrid cols={5} ml={32}>
//                 {cards
//                   .filter((c) => c.nftEntity.type === type)
//                   .map((card) => {
//                     return (
//                       <Image
//                         key={card.id}
//                         style={{ cursor: "pointer" }}
//                         onClick={() => router.push(`/card/${card.id}`)}
//                         width={200}
//                         src={card.displayImage}
//                       ></Image>
//                     );
//                   })}
//               </SimpleGrid>
//             </Box>
//           </ScrollArea>
//           <SimpleGrid cols={5} ml={32} className={classes.noHorizontalScroll}>
//             {cards
//               .filter((c) => c.nftEntity.type === type)
//               .map((card) => {
//                 return (
//                   <Image
//                     key={card.id}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => router.push(`/card/${card.id}`)}
//                     width={200}
//                     src={card.displayImage}
//                   ></Image>
//                 );
//               })}
//           </SimpleGrid>
//         </Stack>
//       )
//     );
//   };

//   const fetchUser = async () => {
//     setLoading(true);
//     const result = await callAPI({ endpoint: "/api/user/getProfile" });
//     setLoading(false);
//     if (result.user) {
//       setUser(result.user);
//       if (result.imageDownload) {
//         setImages(await downloadUserImages(
//           result.user,
//           result.imageDownload?.authorizationToken,
//           result.imageDownload?.downloadUrl
//         ));
//       }
//     }
//   };


//   useEffect(() => {
//     if (user?.id && cards?.length) {
//       if (user.tribeValuablePlayer) {
//         const match = cards.find(
//           (card) => card.nftEntity.id === user.tribeValuablePlayer
//         );
//         if (match) {
//           setTribeAthlete(match);
//         }
//       }
//       if (user.tribeSport) {
//         const match = cards.find(
//           (card) => card.nftEntity.id === user.tribeSport
//         );
//         if (match) {
//           setTribeSport(match);
//         }
//       }
//       if (user.tribeTeam) {
//         const match = cards.find(
//           (card) => card.nftEntity.id === user.tribeTeam
//         );
//         if (match) {
//           setTribeTeam(match);
//         }
//       }
//     }
//   }, [user, cards]);

//   useEffect(() => {
//     if (session && !session.user?.username) {
//       router.push("/auth/newUser");
//     }
//     if (session?.user && !user?.id) {
//       fetchUser();
//       fetchCards();
//     }
//   }, [session]);

//   return !session || loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Container fluid className={classes.wrapper}>
//         <Image
//           src={
//             images.bannerImage
//               ? images.bannerImage
//               : "/images/defaultUserHeader.png"
//           }
//           className={classes.bannerImage}
//         ></Image>
//         <Stack className={classes.displayOnMobile} mt={8} align={'end'}><Button onClick={() => router.push('/profile')} variant={'light'} size={'xs'}>Edit Profile</Button></Stack>
//         <Group spacing="md" style={{ width: "100%", gap: "2rem" }} position='apart'>
//           <Group
//             position="center"
//             spacing="lg"
//             style={{ width: largeScreen ? "45%" : "100%", display:'flex',
//               flexDirection:'column' }}
//           >
//             <Avatar src={images.profileImage} className={classes.avatar} />
//             <div className={classes.userProfile}>
//               <Text
//                 size="1.5rem"
//                 mb={2}
//                 style={{
//                   wordWrap: "break-word",
//                   whiteSpace: "normal",
//                   textAlign: "center",
                 
//                 }}
//               >
//                 {user.name}
//               </Text>
//               <Text
//                 size="md"
//                 mt={2}
//                 color={'#8c52ff'}
//                 align="center"
//               >
//                 Fan
//               </Text>
//               <Text size="xs" mt={2} color="dimmed" align="center">
//                 {user?.primarySport && `${user.primarySport}`}
//               </Text>
//             </div>
//           </Group>
//           <Group style={{width: largeScreen ? undefined : '100%', justifyContent: largeScreen ? 'flex-end' : 'center'}}>
//             <GroupOrStack mt={8} align={'end'} position='center'>
//               <Button className={classes.displayOnBrowser} onClick={() => router.push('/profile')} variant={'light'} size={'xs'}>Edit Profile</Button>
//               <Button onClick={() => router.push('/profile/wallet')} variant="outline" size={'xs'}>My Wallet</Button>
//               <Button onClick={() => router.push('/profile/referrals')} variant="outline" size={'xs'}>Refer & Earn</Button>
//             </GroupOrStack>
//           </Group>
//           {/* <Group
//             position="right"
//             spacing="lg"
//             style={{ width: largeScreen ? "52%" : "100%" }}
//           >
//             <Flex
//               direction="row"
//               justify={largeScreen ? "end" : "space-evenly"}
//               style={{ width: "100%", gap: largeScreen ? "2rem" : 0 }}
//             >
//               <Box
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => router.push('/profile/wallet')}
//               >
//                 <IconWallet size={30} className={classes.blue} />
//                 <Text size="md" className={classes.blue}>
//                   My Wallet
//                 </Text>
//               </Box>
//               <Box
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => router.push('/profile/referrals')}
//               >
//                 <IconFileDollar size={30} className={classes.blue} />
//                 <Text size="md" className={classes.blue}>
//                   Refer & Earn
//                 </Text>
              
//               </Box>
              
//             </Flex>
//           </Group> */}
//         </Group>
//         <Grid mb={64} gutterSm={64}>
//           <Grid.Col sm={5} xs={12}>
//             <Stack mb={32} spacing={largeScreen ? 10 : 0}>
//               {!!user && <SocialLinks isMyProfile={isMyProfile} key={'social'} socialLinks={user.socialLinks}/>}
//               {!!user && <AboutMe aboutme={user.aboutMe} isMyProfile={isMyProfile} name={user.name?.split(" ")[0]}/>}
//             </Stack>
//           </Grid.Col>
//           <Grid.Col sm={7} xs={12}>
//             <Modal size={'xl'} centered opened={tribeOpened} onClose={closeTribeModal} title="My Tribe" overlayProps={{opacity: 0.55,blur: 3,}}>
//               <Stack ml={32}>
//                   <Title order={3}>Select Most Valuable Player</Title>
//                   <SimpleGrid cols={3} spacing={'xl'}>
//                   {cards.filter(c => c.nftEntity.type === 'Athlete').map(card => {
//                       return (
//                       <Image key={card.id} className={ user.tribeValuablePlayer === card.nftEntity.id ? classes.tribeImage : null} 
//                               src={card.displayImage}
//                           onClick={(e) => setUser({...user, tribeValuablePlayer: card.nftEntity.id})}></Image>
//                       )
//                   })}
//                   </SimpleGrid>

//                   <Title order={3}>Select Team</Title>
//                   <SimpleGrid cols={3} spacing={'xl'}>
//                   {cards.filter(c => c.nftEntity.type === 'Team').map(card => {
//                       return (
//                       <Image key={card.id} className={ user.tribeTeam === card.nftEntity.id ? classes.tribeImage : null} 
//                           src={card.displayImage}
//                           onClick={(e) => setUser({...user, tribeTeam: card.nftEntity.id})}>                                            
//                       </Image>
//                   )})}
//                   </SimpleGrid>

//                   <Title order={3}>Select Sport</Title>
//                   <SimpleGrid cols={3}>
//                   {cards.filter(c => c.nftEntity.type === 'Activity').map(card => {
//                       return (
//                       <Image key={card.id} className={ user.tribeSport === card.nftEntity.id ? classes.tribeImage : null} 
//                           src={card.displayImage}
//                           onClick={(e) => setUser({...user, tribeSport: card.nftEntity.id})}>                                            
//                       </Image>
//                       )
//                   })}
//                   </SimpleGrid>
                  
//                   <Group position="right">
//                       <Button variant={'outline'} onClick={closeTribeModal}>Cancel</Button>
//                       <Button onClick={saveTribe}>Save</Button>
//                   </Group>
//               </Stack>
//             </Modal>
//             <Box mt={32} style={{ position: "relative" }}>
//               <SimpleGrid
//                 cols={3}
//                 style={{ zIndex: 2, position: "relative" }}
//                 spacing={largeScreen ? 10 : 2}
//               >
//                 <Stack>
//                   <Image
//                     style={{cursor: 'pointer'}}
//                     onClick={openTribeModal}
//                     src={
//                       tribeSport
//                         ? tribeSport.displayImage
//                         : "/images/tribe_placeholder.png"
//                     }
//                   />
//                 </Stack>
//                 <Stack>
//                   <Image
//                     style={{cursor: 'pointer'}}
//                     onClick={openTribeModal}
//                     src={
//                       tribeTeam
//                         ? tribeTeam.displayImage
//                         : "/images/tribe_placeholder.png"
//                     }
//                   />
//                 </Stack>
//                 <Stack>
//                   <Image
//                     style={{cursor: 'pointer'}}
//                     onClick={openTribeModal}
//                     src={
//                       tribeAthlete
//                         ? tribeAthlete.displayImage
//                         : "/images/tribe_placeholder.png"
//                     }
//                   />
//                 </Stack>
//               </SimpleGrid>

//               <Group position="left" className={classes.tribeGroup}>
//                 <Text size={20} className={classes.tribeText}>
//                   My Tribe
//                 </Text>
//                 <Text onClick={() => router.push('/profile/myCards')} size={14} className={classes.viewAllText}>
//                   View all
//                 </Text>
//               </Group>
//             </Box>
//           </Grid.Col>
//         </Grid>
        
//         <ShoutSection field={'takeOfWeekText'} value={user.takeOfWeekText || 'CONTROVERSIAL OPINION FORMING'} margin={70} showFeedback={true} isMyProfile={isMyProfile}/>
     
//         <HighlightVideo highlightVideoUrl={user.highlightVideoUrl} showFeedback={true} width={'85%'} isMyProfile={isMyProfile}/>
//         {/* <Box mt={30}>
//           <BlogCard />
//         </Box> */}
//            {/* <Group
//             position="right"
//             mt={30}
//             style={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "flex-end",
//               gap:0
//             }}

//           >
//             <Group
//               // mt={70}
//               position="apart"
//               bg="#8c52ff"
//               className={classes.headingsSection}
//             >
//               <Box className={classes.cardHighLightText}>MY BLOG</Box>
//             </Group>
//             <Box
//               sx={(theme) => ({
//                 borderRadius: theme.radius.md,
//               })}
//               style={{ width: "100%" }}
//             >
//               <BlogCard text={user.myBlogText || "STILL TRYING TO MAKE SENSE OF IT ALL"}/>
//             </Box>
//           </Group> */}
        
//         <Box mt={20}>
//           <Stack mt={32} align={"center"}>
//             <Title order={2}>NCAA Athlete?</Title>
//             <Title order={3}>
//               Register <a href="mailTo:team@mvpz.io">Here</a> Today
//             </Title>
//           </Stack>
//         </Box>
//         <FooterSocial/>        
//         {/* {renderCards("Athlete")}
//         {renderCards("Team")}
//         {renderCards("Championship")}
//         {renderCards("Activity")} */}
//       </Container>
//     </>
//   );
// }
