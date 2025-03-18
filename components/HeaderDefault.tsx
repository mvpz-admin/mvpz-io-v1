// import {
//   createStyles,
//   Menu,
//   Center,
//   Header,
//   Container,
//   Group,
//   Button,
//   Burger,
//   rem,
//   Drawer,
//   Stack,
//   Text,
//   Tooltip,
// } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import {
//   IconBrandDiscord,
//   IconBrandInstagram,
//   IconBrandLinkedin,
//   IconBrandMedium,
//   IconBrandX,
//   IconBrandYoutube,
//   IconChevronDown,
//   IconLogin,
//   IconLogin2,
//   IconMail,
// } from "@tabler/icons-react";
// import Image from "next/image";
// import { Image as MImage } from "@mantine/core";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

// const HEADER_HEIGHT = rem(64);

// const useStyles = createStyles((theme) => ({
//   inner: {
//     height: 64,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   mobileRoutes: {
//     [theme.fn.largerThan("sm")]: {
//       display: "none",
//     },
//   },
//   signinIcon: {
//     [theme.fn.largerThan("xs")]: {
//       display: "none",
//     },
//     padding: 4,
//   },
//   signinButton: {
//     [theme.fn.smallerThan("xs")]: {
//       display: "none",
//     },
//   },
//   burger: {},

//   link: {
//     display: "block",
//     lineHeight: 1,
//     padding: `${rem(8)} ${rem(12)}`,
//     borderRadius: theme.radius.sm,
//     textDecoration: "none",
//     color: theme.colorScheme === "dark" ? "white" : theme.colors.gray[7],
//     fontSize: theme.fontSizes.sm,
//     fontWeight: 500,

//     "&:hover": {
//       backgroundColor:
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[6]
//           : theme.colors.gray[0],
//     },
//     [theme.fn.smallerThan("sm")]: {
//       display: "none",
//     },
//   },

//   linkLabel: {
//     marginRight: rem(5),
//   },
//   drawerLink: {
//     fontWeight: 700,
//     fontSize: theme.fontSizes.xl,
//     textDecoration: "none",
//     color: "white",
//     border: "none",
//     alignSelf: "start",
//   },
//   logo: {
//     cursor: "pointer",
//     [theme.fn.smallerThan("xs")]: {
//       maxWidth: 120,
//     },
//     [theme.fn.largerThan("xs")]: {
//       maxWidth: 160,
//     },
//   },
// }));

// interface HeaderDefaultProps {
//   links?: {
//     link: string;
//     label: string;
//     links?: { link: string; label: string }[];
//   }[];
// }

// export function HeaderDefault({ links, transparent }) {
//   const { classes } = useStyles();
//   const [opened, { toggle, open, close }] = useDisclosure(false);
//   const router = useRouter();
//   const isSigninPage = router?.pathname === "/auth/signin" || false;
//   const [showFanzone, setShowFanZone] = useState<boolean>(false);
//   const {data : session} = useSession()

//   useEffect(() => {
//     if (router.pathname.split("/")[1] === "fanzone") {
//       setShowFanZone(true);
//     } else {
//       setShowFanZone(false);
//     }
//   }, [router.pathname]);

//   const items =
//     links?.length &&
//     links.map((link) => {
//       const menuItems = link.links?.map((item) => (
//         <Menu.Item key={item.link}>{item.label}</Menu.Item>
//       ));

//       if (menuItems) {
//         return (
//           <Menu
//             key={link.label}
//             trigger="hover"
//             transitionProps={{ exitDuration: 0 }}
//             withinPortal
//           >
//             <Menu.Target>
//               <a
//                 href={link.link}
//                 className={classes.link}
//                 onClick={(event) => event.preventDefault()}
//               >
//                 <Center>
//                   <span className={classes.linkLabel}>{link.label}</span>
//                   <IconChevronDown size={rem(12)} stroke={1.5} />
//                 </Center>
//               </a>
//             </Menu.Target>
//             <Menu.Dropdown>{menuItems}</Menu.Dropdown>
//           </Menu>
//         );
//       }

//       return (
//         <a key={link.label} href={link.link} className={classes.link}>
//           {link.label}
//         </a>
//       );
//     });

//   const itemsMobile =
//     links?.length &&
//     links.map((link) => {
//       return (
//         <a key={link.label} href={link.link}>
//           <Button
//             variant={"outline"}
//             onClick={() => {
//               close();
//             }}
//             className={classes.drawerLink}
//           >
//             {link.label}
//           </Button>
//         </a>
//       );
//     });

//   return (
//     <div
//       className={!transparent  && `bg-black`}
//     >
//       <Container className={classes.inner} fluid>
//         <Group>
//           <MImage
//             className={classes.logo}
//             src={"/images/mvpz-logo-purple.png"}
//             alt="logo"
//             onClick={() => {
//               router.push("/");
//             }}
//           ></MImage>
//         </Group>
//         {/* {items?.length && 
//           <Group align={'center'} position='apart' className={classes.links}> */}
//         {/* <Group className='lg:flex md:hidden'>
//             {items}
//             </Group> */}
//         {/* </Group>} */}
//         <Group>
//           <Button
//             onClick={() => router.push("/auth/athleteSignin")}
//             className={`${classes.signinButton} border-2 border-primary bg-transparent text-white font-extrabold uppercase`}
//           >
//            Athlete
//           </Button>
//           <Button
//             onClick={() => router.push("/auth/signin")}
//             className={`${classes.signinButton} uppercase`}
//           >
//             Sports Fan
//           </Button>
         
//           {/* <Tooltip label="Kansas State">
//               <Button onClick={() => router.push('/kstate')} variant={'subtle'}><Image alt="" width={30} height={20} src="/images/kstatelogo1.png"></Image></Button>
//             </Tooltip> */}
//           <Tooltip label="Leaderboard">
//             <Button
//               onClick={() => router.push("/leaderboard")}
//               variant={"subtle"}
//             >
//               <Image
//                 alt=""
//                 width={24}
//                 height={24}
//                 src="/images/trophy.png"
//               ></Image>
//             </Button>
//           </Tooltip>
//           <Burger
//             opened={opened}
//             onClick={toggle}
//             className={classes.burger}
//             size="md"
//           />
//         </Group>
//         <Drawer
//           opened={opened}
//           onClose={close}
//           overlayProps={{ opacity: 0.5, blur: 4 }}
//           position={"right"}
//           zIndex={10000}
//         >
//           <Stack mt={32}>
//             {/* <Button variant={'outline'} onClick={() => {router.push("/api/auth/signin"); close()}} className={classes.drawerLink}>Sign in</Button> */}
//             <Button
//               variant={"outline"}
//               onClick={() => {
//                 router.push("/auth/signin");
//                 close();
//               }}
//               className={classes.drawerLink}
//             >
//               Sports Fan
//             </Button>
//              <Button
//               variant={"outline"}
//               onClick={() => {
//                 router.push("/auth/athleteSignin");
//                 close();
//               }}
//               className={classes.drawerLink}
//             >
//               Athlete
//             </Button>
             
//            {session?.user && <>
//            <Button
//               variant={"outline"}
//               onClick={() => {
//                 router.push("/arenaz");
//                 close();
//               }}
//               className={classes.drawerLink}
//             >
//               Arenaz
//             </Button>
//             <Button
//               variant={"outline"}
//               onClick={() => {
//                 router.push("/fanzone");
//                 close();
//               }}
//               className={classes.drawerLink}
//             >
//               Fanzone
//             </Button>
//            </>}
//             {/* <Stack className={classes.mobileRoutes} spacing={8}>{itemsMobile}</Stack> */}
//             {/* <Button variant={'outline'} onClick={() => {router.push("/aboutus"); close()}} className={classes.drawerLink}>About us</Button> */}
//             <Button
//               variant={"outline"}
//               onClick={() => {
//                 close();
//                 router.push("/blog");
//               }}
//               className={classes.drawerLink}
//             >
//               Blog
//             </Button>
//             <a href="mailTo:team@mvpz.io?subject=Request for Support">
//               <Button
//                 variant={"outline"}
//                 onClick={() => {
//                   close();
//                 }}
//                 className={classes.drawerLink}
//               >
//                 Support
//               </Button>
//             </a>
//             {/* <Text ml={16} className={classes.drawerLink}>Connect</Text> */}
//             <Group ml={16}>
//               <a
//                 href={
//                   "https://www.instagram.com/mvpz_sport?igsh=b2N1bjBpMHQxdDdk"
//                 }
//                 target="_blank"
//               >
//                 <IconBrandInstagram />
//               </a>
//               <a href={"https://twitter.com/mvpz_sport"} target="_blank">
//                 <IconBrandX />
//               </a>
//               <a href={"https://medium.com/@_MVPz"} target="_blank">
//                 <IconBrandMedium />
//               </a>
//               <a
//                 href={"https://www.linkedin.com/company/89859823"}
//                 target="_blank"
//               >
//                 <IconBrandLinkedin />
//               </a>
//               <a
//                 href={
//                   "https://www.youtube.com/channel/UCxh_9u-MXEQfQ41_etQpQQQ"
//                 }
//                 target="_blank"
//               >
//                 <IconBrandYoutube />
//               </a>
//               <a href={"https://discord.gg/HmMxByvEbC"} target="_blank">
//                 <IconBrandDiscord />
//               </a>
//               <a href={"mailTo:team@mvpz.io"}>
//                 <IconMail />{" "}
//               </a>
//             </Group>
//           </Stack>
//         </Drawer>
//       </Container>
//     </div>
//   );
// }
