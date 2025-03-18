// import { Carousel } from "@mantine/carousel";
// import {
//   ActionIcon,
//   Avatar,
//   Box,
//   Button,
//   Card,
//   Container,
//   createStyles,
//   Divider,
//   Flex,
//   Grid,
//   Group,
//   Image,
//   Loader,
//   Paper,
//   Popover,
//   Progress,
//   rem,
//   ScrollArea,
//   SimpleGrid,
//   Spoiler,
//   Stack,
//   Text,
//   Title,
//   useMantineTheme,
// } from "@mantine/core";
// import { useClipboard, useMediaQuery } from "@mantine/hooks";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useRef, useState } from "react";
// import AboutMe from "./AboutMe";
// import { FooterSocial } from "../FooterSocial";
// import SocialLinks from "./SocialLinks";
// import ShoutSection from "./ShoutSection";
// import HighlightVideo from "./HighlightVideo";

// const useStyles = createStyles((theme) => ({
//   wrapper: {
//     position: "relative",
//     boxSizing: "border-box",
//     maxWidth: 1200,
//     [theme.fn.smallerThan("sm")]: {
//       padding: 25,
//       marginLeft: -24,
//       marginRight: -24,
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
//     [theme.fn.largerThan("xs")]: {
//       height: 250,
//       width: 250,
//       borderRadius: 150,
//       marginTop: -160,
//     },
//     zIndex: 9,
//     marginLeft: 16,
//     marginRight: 16,
//     border: `${rem(2)} solid ${theme.colors.gray[8]}`,
//   },
//   editButton: {
//     border: "transparent",
//   },
//   card: {
//     background: theme.colors.gray[8],
//   },
//   bannerImage: {
//     [theme.fn.smallerThan("sm")]: {
//       minHeight: 120,
//     },
//   },
//   container: {
//     position: "relative",
//     width: "100%",
//   },
//   button: {
//     borderRadius: 24,
//     position: "absolute",
//     top: "18%",
//     left: "6%",
//     border: "4px black solid",
//   },
//   aboutme: {
//     textWrap: "wrap",
//     fontFamily: "MonumentExtended-Regular",
//     fontSize: 14,
//     color: theme.colors.gray[5],
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
//   cardHighLightText: {
//     background: "none",
//     fontSize: "20px",
//     color: "black",
//     fontWeight: 600,
//     alignItems: "end",
//     display: "flex",
    
//   },
//   userNameContainer: {
//     [theme.fn.smallerThan("sm")]: {
//       display: "none !important",
//     },
//     width: '40%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: theme.spacing.sm,
//   },
//   userName: {
//     textAlign: 'center',
//     wordWrap: 'break-word',
//     overflowWrap: 'break-word',
//     fontSize: 40,
//   },
//   userRole: {
//     fontSize: 18,
//     color: theme.colors.mvpz[6],
//   },
//   highlightSection:{
//     padding:'10px',
//     borderTopLeftRadius: theme.radius.md,
//     borderBottomLeftRadius: theme.radius.md,
//   }
// }));

// function ProgressLayout({ largeScreen }) {
//   return (
//     <Box
//       sx={(theme) => ({
//         backgroundColor: theme.colors.dark[7],
//         padding: theme.spacing.sm,
//         display: "flex",
//         flexDirection: `${largeScreen ? "row" : "column"}`,
//         justifyContent: "space-between",
//         borderLeft: "8px solid #8c52ff",
//         borderTop: '5px solid #8c52ff',
//         width: "100%",
//       })}
//     >
//       <Box
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           width: `${largeScreen ? "50%" : "100%"}`,
//         }}
//       >
//         <Group mb="xs">
//           <Text size="md" weight={700} color="white">
//             Progress
//           </Text>
//           <Text size={9} weight={700} color="mvpz.5">
//             [CRITERIA]
//           </Text>
//         </Group>

//         <Box mb="xs">
//           <Progress
//             value={40}
//             size="lg"
//             radius="lg"
//             styles={{ bar: { backgroundColor: "mvpz" } }}
//           />
//           <Group position="apart" mt="xs">
//             <Text size={8} color="white">
//               0
//             </Text>
//             <Text size={8} color="white">
//               100
//             </Text>
//           </Group>
//           <Text size={8} color="gray.5">
//             Ambassador Points [AP]
//           </Text>
//         </Box>
//       </Box>

//       <Box
//         ml={largeScreen ? "xl" : 0}
//         style={{ width: `${largeScreen ? "50%" : "100%"}` }}
//       >
//         <Group position="apart" mt={4}>
//           <Box>
//             <Text size="xs" color="white" mb={2}>
//               Base
//             </Text>
//             <Text
//               size="md"
//               color="mvpz.5"
//               weight={700}
//               mt={"sm"}
//               align="center"
//             >
//               40%
//             </Text>
//           </Box>
//           <Box>
//             <Text size="xs" color="white" mb={2}>
//               Current
//             </Text>
//             <Text
//               size="md"
//               color="mvpz.5"
//               weight={700}
//               mt={"sm"}
//               align="center"
//             >
//               40%
//             </Text>
//           </Box>
//           <Box>
//             <Text size="xs" color="white" mb={2}>
//               Max
//             </Text>
//             <Text
//               size="md"
//               color="mvpz.5"
//               weight={700}
//               mt={"sm"}
//               align="center"
//             >
//               80%
//             </Text>
//           </Box>
//         </Group>

//         <Text size={8} color="gray.5" mt={10}>
//           Revenue share
//         </Text>
//       </Box>
//     </Box>
//   );
// }

// function StatsLayout({ largeScreen }) {
//   // const height = '6"1';
//   // const Interceptions = 4;
//   // const weight = "200lbs";
//   // const tackles = 8;
//   // const appearances = 38;
//   // const tackle_assists = 12;
//   // const results = "WWLLW";
//   // const sacks = 1;
//   return (
//     <Box
//       sx={(theme) => ({
//         padding: theme.spacing.sm,
//         borderRadius: theme.radius.md,
//       })}
//     >
//       <Text
//                 lh={0.8}
//                 size={50}
//                 color={"mvpz"}
//                 ff={"SpriteGraffiti-Regular"}
//                 style={{textAlign:'center'}}
                
//               >
//                 Coming Soon
//               </Text>
//       {/* <Grid gutter="xl">
//         <Grid.Col span={6}>
//           <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//             Height: {height}
//           </Text>
//         </Grid.Col>
//         <Grid.Col span={6}>
//           <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//             Interceptions: {Interceptions}
//           </Text>
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//             Weight: {weight}
//           </Text>
//         </Grid.Col>
//         <Grid.Col span={6}>
//           <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//             Tackles: {tackles}
//           </Text>
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//             Appearances: {appearances}
//           </Text>
//         </Grid.Col>
//         <Grid.Col span={6}>
//           <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//             Tackle Assists: {tackle_assists}
//           </Text>
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//             Last 5 Results: {results}
//           </Text>
//         </Grid.Col>
//         <Grid.Col span={6}>
//           <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//             Sacks: {sacks}
//           </Text>
//         </Grid.Col>
//       </Grid> */}
//     </Box>
//   );
// }

// function InspirationContent({text}) {
//   const textContent = text || 
//     "It takes more than hard work to build an athlete, check back later to find out what!";
//   return (
//     <Text
//       align="center"
//       size={14}
//       style={{ padding: "10px", textAlign: "center" }}
//     >
//       {textContent}
//     </Text>
//   );
// }

// const AthleteImages = ({ classes }) => {
//   const router = useRouter()
//   return (
//     <Box
//       sx={{
//         mt: 4,
//         pb: 4,
//         borderBottom: "32px solid #8c52ff",
//         backgroundColor: "#1C1C1C",
//       }}
//       className={classes.displayOnBrowser}
//     >
//       <Grid justify="center" gutter="md">
//         <Grid.Col span={12} sm={4}>
//           <Box
//             sx={{
//               textAlign: "center",
//               backgroundColor: "#333333",
//               padding: "20px",
//             }}
//             onClick={() => router.push('/apparel')}
//             style={{cursor: 'pointer'}}
//           >
//             <Image
//               src="/images/athlesiure-shirt.png"
//               alt="Marketplace"
//               width={200}
//               height={200}
//               style={{ margin: "auto" }}
//             />
//             <Box mt={2} sx={{ color: "#FFF", fontSize: "30px" }}>
//               Apparel
//             </Box>
//           </Box>
//         </Grid.Col>
//         <Grid.Col span={12} sm={4}>
//           <Popover>
//             <Popover.Target>
//               <Box
//                 sx={{
//                   textAlign: "center",
//                   backgroundColor: "#333333",
//                   padding: "20px",
//                 }}
//                 onClick={() => router.push('/')}
//                 style={{cursor: 'pointer'}}
//               >
//                 <Image
//                   src="/images/handshake.png"
//                   alt="Marketplace"
//                   width={300}
//                   height={200}
//                   style={{ margin: "auto" }}
//                 />
//                 <Box mt={2} sx={{ color: "#FFF", fontSize: "30px" }}>
//                   Marketplace
//                 </Box>
//               </Box>
//             </Popover.Target>
//             <Popover.Dropdown><Text>Coming soon</Text></Popover.Dropdown>
//           </Popover>
//         </Grid.Col>
//         <Grid.Col span={12} sm={4}>
//           <Box
//             sx={{
//               textAlign: "center",
//               backgroundColor: "#333333",
//               padding: "20px",
//             }}
//             onClick={() => router.push('/mvpz-store')}
//             style={{cursor: 'pointer'}}
//           >
//             <Image
//               src="/images/mvpz-store.png"
//               alt="Store"
//               width={200}
//               height={200}
//               style={{ margin: "auto" }}
//             />
//             <Box mt={2} sx={{ color: "#FFF", fontSize: "30px" }}>
//               Store
//             </Box>
//           </Box>
//         </Grid.Col>
//       </Grid>
//     </Box>
//   );
// };

// const Slide = ({ image, title }) => {
//   const router = useRouter()
//   return (
//     <Carousel.Slide>
//       <Group position="center" onClick={() => router.push(title === 'Apparel' ? '/apparel' : title === 'Store' ? '/mvpz-store' : '/arenaz')}>
//         <Stack>
//           <Image alt="" width={200} height={200} src={image} />
//           <Text align={'center'} size={20}>{title}</Text>
//         </Stack>
//       </Group>
//     </Carousel.Slide>
//   );
// };

// const AtheleteImagesOnCarousel = ()=>{
//   const carouselRef = useRef(null);
//   const [activeSlide, setActiveSlide] = useState(3);
//   const router = useRouter();
//   const { classes } = useStyles();

//   return(
//     <Stack align={"center"} spacing={0} className={classes.displayOnMobile}>
     
//       <Carousel
//         ref={carouselRef}
//         pb={64}
//         withControls
//         withIndicators
//         maw={window.innerWidth - 32}
//         initialSlide={activeSlide}
//         onSlideChange={(index) => setActiveSlide(index)} 
//         loop
//       >
//         <Slide
//           title={"Apparel"}
//           image={'/images/athlesiure-shirt.png'}
//         />
//         <Slide
//           title={"Marketplace"}
//           image={"/images/handshake.png"}          
//         />
//         <Slide
//           title={"Store"}
//           image="/images/mvpz-store.png"
//         />
//       </Carousel>
//     </Stack>
//   )
// }
// export default function AthleteProfile({
//   user = {} as any,
//   cards = [],
//   gotoCheckout = null,
// }): JSX.Element {
//   const { classes } = useStyles();
//   const router = useRouter();
//   const theme = useMantineTheme()
//   const {status, data: session} = useSession()
//   const clipboard = useClipboard()
//   const isMyProfile = status === 'authenticated' && session.user?.id === user.id
//   // const {data: session, status} = useSession()
//   const largeScreen = useMediaQuery("(min-width: 60em)");
  
//   return (
//     <Container fluid className={classes.wrapper}>
//       <ScrollArea h={900} type="scroll" offsetScrollbars scrollbarSize={2}>
//         <Image
//           src={user.bannerDisplayImage || "/images/Upload_banner.png"}
//           className={classes.bannerImage}
//         ></Image>

//         <Group position="apart" mt={largeScreen ? 16 : 2} spacing={"lg"}>
//           <Group
//             position="center"
//             mt={largeScreen ? 16 : 2}
//             spacing={"lg"}
//             style={{ width: largeScreen ? "40%" : "70%" }}
//           >
//             <Box className={classes.displayOnMobile}>
//               <Text size={9} mt={2} color="dimmed">
//                 {user.primarySport}
//               </Text>
//               <Text size={9} mt={2} color="dimmed">
//                 {user.primaryPosition}
//               </Text>
//             </Box>
//             <Avatar src={user.profileImage || user.profileDisplayImage} className={classes.avatar}></Avatar>
//           </Group>
//           {isMyProfile && <Group
//             position="right"
//             spacing={"lg"}
//             className={classes.displayOnBrowser}
//             style={{
//               width: "56%",
//               display: "flex",
//               justifyContent: "flex-start",
//             }}
//           >
//             <Stack style={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "flex-start",
//             }}>
//               <Group position="right">
//                 <Button variant={'subtle'} onClick={() => router.push('/profile')}>
//                   Edit Profile
//                 </Button>
//                 <Button variant={'light'} onClick={() => clipboard.copy(`https://www.mvpz.io/athlete/${user.username}`)}>
//                   {clipboard.copied ? 'Copied Link' : 'Share Profile'}
//                 </Button>
//               </Group>
//               <ProgressLayout largeScreen={largeScreen} />
//             </Stack>
//           </Group>}
//         </Group>
//         <Group
//           position="center"
//           spacing={"lg"}
//           mt={10}
//           className={classes.displayOnMobile}
//           style={{ display: "flex", flexDirection: "column", gap: 0 }}
//         >
//           <Text mb={2}>{user.name}</Text>
//           <Text size={8} color="mvpz">
//             Athlete
//           </Text>
//         </Group>
//         {/* {isMyProfile && <Group position="right">
//           <Button size={'xs'} variant={'light'} onClick={() => clipboard.copy(`https://www.mvpz.io/athlete/${user.username}`)}>{clipboard.copied ? 'Copied Link' : 'Share Profile'}</Button>
//         </Group>} */}
//         {isMyProfile && <Group
//           position="center"
//           spacing={"lg"}
//           mt={20}
//           className={classes.displayOnMobile}
//         >
//           <Group position="right">
//             <Button variant={'subtle'} onClick={() => router.push('/profile')}>
//               Edit Profile
//             </Button>
//             <Button variant={'light'} onClick={() => clipboard.copy(`https://www.mvpz.io/athlete/${user.username}`)}>
//               {clipboard.copied ? 'Copied Link' : 'Share Profile'}
//             </Button>
//           </Group>
//           <ProgressLayout largeScreen={largeScreen} />
//         </Group>}
//         <Group
//           position="apart"
//           style={{ width: "100%" }}
//           className={classes.displayOnBrowser}
//         >
//           <Group position="left" className={classes.userNameContainer}>
//           <Text className={classes.userName}>{user.name}</Text>
//           <Text className={classes.userRole}>Athlete</Text>
//         </Group>
//           <Group
//             position="right"
//             style={{
//               width: "56%",
//               display: "flex",
//               justifyContent: "flex-start",
//             }}
//           >
//             <Group
//               mt={25}
//               position="apart"
//               bg="mvpz"
//               style={{
//                 padding: "10px",
//                 width: "100%",
//                 borderTopLeftRadius: theme.radius.md,
//                 borderBottomLeftRadius: theme.radius.md,
//               }}
//             >
//               <Box className={classes.cardHighLightText}>BASIC INFO</Box>
//             </Group>
//             <Box
//               sx={(theme) => ({
//                 padding: theme.spacing.sm,
//                 borderRadius: theme.radius.md,
//               })}
//               style={{ width: "100%" }}
//             >
//               <Grid gutter="xl">
//                 <Grid.Col span={6}>
//                   <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//                     School: {user.currentSchool}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={6}>
//                   <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//                     Sport: {user.primarySport}
//                   </Text>
//                 </Grid.Col>
//               </Grid>
//               <Grid gutter="xl">
//                 <Grid.Col span={6}>
//                   <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//                     Position: {user.primaryPosition}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={6}>
//                   <Text color="white" size={largeScreen ? 12 : 9} weight={600}>
//                     Year: Junior
//                   </Text>
//                 </Grid.Col>
//               </Grid>
//             </Box>
//           </Group>
//         </Group>
//         {/* GettingOverflowIssue Here */}
//         <Grid mb={64} gutterSm={64}>
//           <Grid.Col sm={5} xs={12}>
//             <Stack mb={largeScreen ? 32 : 10}>
//               <SocialLinks isMyProfile={isMyProfile} socialLinks={user.socialLinks}/>
//               {!!user && <AboutMe aboutme={user.aboutMe} isMyProfile={isMyProfile} name={user.name?.split(" ")[0]}/>}
//               <>
//                 <Text size={"lg"}>{user.firstname} card</Text>
//                 <div className={classes.container}>
//                   <Image
//                     ml={32}
//                     mt={8}
//                     src={user.cardDisplayImage || '/images/card-backside.png'}
//                     width={user.cardDisplayImage ? "90%" : "80%"}
//                   ></Image>
//                   {!!user.cardDisplayImage && user.cost > 0 && <Button className={classes.button}>${user.cost}</Button>}
//                 </div>
//                 {!!user.cardDisplayImage && user.cost > 0 && <Group position="center">
//                   <Button
//                     onClick={() =>
//                       !!gotoCheckout ? gotoCheckout() : router.push("/genone")
//                     }
//                   >
//                     BUY NOW
//                   </Button>
//                 </Group>}
//               </>
//             </Stack>
//           </Grid.Col>
//           <Grid.Col
//             sm={7}
//             xs={12}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "flex-end",
//               height: "100%",
//             }}
//           >
//             <Stack>
//               <Group
//                 mt={16}
//                 position="apart"
//                 bg="mvpz"
//                 style={{ padding: "10px" }}
//                 className={classes.displayOnMobile}
//               >
//                 <Box className={classes.cardHighLightText}>BASIC INFO</Box>
//               </Group>
//               <Box className={classes.displayOnMobile}>
//                 <Box
//                   sx={(theme) => ({
//                     padding: theme.spacing.sm,
//                     borderRadius: theme.radius.md,
//                   })}
//                   style={{ width: "100%" }}
//                 >
//                   <Grid gutter="xl">
//                     <Grid.Col span={6}>
//                       <Text
//                         color="white"
//                         size={largeScreen ? 12 : 9}
//                         weight={600}
//                       >
//                         School: {user.currentSchool}
//                       </Text>
//                     </Grid.Col>
//                     <Grid.Col span={6}>
//                       <Text
//                         color="white"
//                         size={largeScreen ? 12 : 9}
//                         weight={600}
//                       >
//                         Sport: {user.primarySport}
//                       </Text>
//                     </Grid.Col>
//                   </Grid>
//                   <Grid gutter="xl">
//                     <Grid.Col span={6}>
//                       <Text
//                         color="white"
//                         size={largeScreen ? 12 : 9}
//                         weight={600}
//                       >
//                         Position: {user.primaryPosition}
//                       </Text>
//                     </Grid.Col>
//                     <Grid.Col span={6}>
//                       <Text
//                         color="white"
//                         size={largeScreen ? 12 : 9}
//                         weight={600}
//                       >
//                         Year: Junior
//                       </Text>
//                     </Grid.Col>
//                   </Grid>
//                 </Box>
//               </Box>
//               <Group
//                 mt={16}
//                 position="apart"
//                 bg="mvpz"
//                 className={classes.highlightSection}
//               >
//                 <Box className={classes.cardHighLightText}>STATS</Box>
//               </Group>
//               <Box>
//                 <StatsLayout largeScreen={largeScreen} />
//               </Box>
//               <ShoutSection isMyProfile={isMyProfile} field={'inspiration'} 
//                 value={user.inspiration || "It takes more than hard work to build an athlete, check back later to find out what!"} 
//                 margin={32} showFeedback={false}/>
//               <HighlightVideo highlightVideoUrl={user.highlightVideoUrl} isMyProfile={isMyProfile}/>
//             </Stack>
//           </Grid.Col>
//         </Grid>

//         <Stack mt={largeScreen ? 80 : 120} pb={32}>
//           <AthleteImages classes={classes}/>
//           <AtheleteImagesOnCarousel />
//           <Stack mt={largeScreen ? 32 : 20} align={"center"}>
//             <Text size={largeScreen ? 26 : 20}>NCAA Athlete?</Text>
//             <Text size={largeScreen ? 24 : 18}>
//               Register <a href="mailTo:team@mvpz.io">Here</a> Today
//             </Text>
//           </Stack>
//         </Stack>
//         <FooterSocial/>
//       </ScrollArea>
//     </Container>
//   );
// }
