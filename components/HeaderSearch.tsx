// import {
//   createStyles,
//   Header,
//   Group,
//   Burger,
//   rem,
//   Menu,
//   UnstyledButton,
//   Avatar,
//   Text,
//   Button,
//   SelectItemProps,
//   MantineColor,
//   Center,
//   Drawer,
//   useMantineTheme,
//   Tooltip,
//   Box,
//   ActionIcon,
//   Autocomplete,
//   Loader,
// } from "@mantine/core";
// import { useDisclosure, useMediaQuery } from "@mantine/hooks";
// import {
//   IconBrandDiscord,
//   IconLogout,
//   IconSettings,
//   IconBrandInstagram,
//   IconBrandLinkedin,
//   IconBrandMedium,
//   IconBrandX,
//   IconBrandYoutube,
//   IconChevronDown,
//   IconMail,
//   IconUser,
//   IconShoppingBag,
//   IconGift,
//   IconCards,
//   IconWallet,
// } from "@tabler/icons-react";
// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { forwardRef, use, useEffect, useState } from "react";
// import SearchFeild from "../core/Atoms/Others/SearchFeild";
// import { RiHomeSmile2Fill } from "react-icons/ri";
// import { MdSportsMotorsports } from "react-icons/md";
// import { FaBell, FaHandHoldingUsd } from "react-icons/fa";
// import { IoMdClose } from "react-icons/io";
// import NotificationsModel from "../core/Components/Notifications/NotificationsModel";
// import { callAPI } from "../lib/utils";
// import { IoChatbubble } from "react-icons/io5";
// import { FaFireFlameCurved, FaHandsClapping } from "react-icons/fa6";
// import { PiCloverFill } from "react-icons/pi";

// const useStyles = createStyles((theme) => ({
//   header: {
//     // paddingLeft: theme.spacing.md,
//     // paddingRight: theme.spacing.md
//     // backgroundColor: "black",
//   },

//   menu: {
//     [theme.fn.smallerThan("sm")]: {
//       display: "none",
//     },
//   },
//   inner: {
//     height: rem(64),
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   links: {
//     [theme.fn.smallerThan("md")]: {
//       display: "none",
//     },
//   },

//   search: {
//     [theme.fn.smallerThan("xs")]: {
//       display: "none",
//     },
//   },
//   drawer: {
//     // [theme.fn.largerThan("xs")]: {
//     //   display: "none",
//     // },
//   },

//   link: {
//     display: "block",
//     lineHeight: 1,
//     padding: `${rem(2)} ${rem(4)}`,
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
//   },
//   user: {
//     color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
//     padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
//     borderRadius: theme.radius.sm,
//     transition: "background-color 100ms ease",

//     "&:hover": {
//       backgroundColor:
//         theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
//     },

//     // [theme.fn.smallerThan('xs')]: {
//     //   display: 'none',
//     // },
//   },
//   userActive: {
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
//   },
//   linkLabel: {
//     marginRight: rem("5px"),
//   },
//   username: {
//     [theme.fn.smallerThan("sm")]: {
//       display: "none",
//     },
//   },
// }));

// export interface HeaderSearchProps {
//   links: {
//     link: string;
//     label: string;
//     links?: { link: string; label: string }[];
//   }[];
//   user: { name: string; image: string; email: string };
// }

// export function HeaderSearch({ links, user, transparent }) {
//   const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
//     useDisclosure(false);
//   const [opened, { toggle }] = useDisclosure(false);
//   const { classes } = useStyles();
//   const [userMenuOpened, setUserMenuOpened] = useState(false);
//   const router = useRouter();
//   const [openNotification, setOpenNotification] = useState(false);
//   const theme = useMantineTheme();
//   const logout = () => {
//     signOut({ redirect: false }).then(() => {
//       router.replace("/");
//     });
//   };
//   const largeScreen = useMediaQuery("(min-width: 60em)");
//   const { data: session, update } = useSession();

//   const handleOpenNotifications = async () => {
//     setOpenNotification(true);
//     await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/notifications/mark-as-read/all`,
//     });
//   };

//   interface ItemProps extends SelectItemProps {
//     color: MantineColor;
//     username: string;
//     image: string;
//     name: string;
//     primarySport: string;
//     primaryPosition: string;
//   }

//   const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
//     (
//       {
//         name,
//         username,
//         primarySport,
//         primaryPosition,
//         value,
//         image,
//         ...others
//       }: ItemProps,
//       ref
//     ) => (
//       <div ref={ref} {...others}>
//         <Group noWrap>
//           <Avatar src={image} />

//           <div>
//             <Text>{name}</Text>
//             <Text size="xs" color="dimmed">
//               {primarySport} - {primaryPosition}
//             </Text>
//           </div>
//         </Group>
//       </div>
//     )
//   );
//   return (
//     <>
//       <div    className={!transparent && "bg-black"}>
//         <div className={classes.inner}>
//           <Drawer
//             opened={drawerOpened}
//             onClose={closeDrawer}
//             size="xs"
//             padding="md"
//             title=""
//             className={classes.drawer}
//             zIndex={1000000}
//           >
//             <Image
//               style={{ cursor: "pointer" }}
//               src="/images/mvpz-logo-purple.png"
//               height={120}
//               width={120}
//               alt="logo"
//               onClick={() => {
//                 router.push("/fanzone");
//                 closeDrawer();
//               }}
//             ></Image>

//             <Group className="mb-5">
//               <SearchFeild
//                 handleAthleteSelect={(ath) =>
//                 {
//                   closeDrawer();
//                   router.push(`/fanzone/tribe/profile/athlete/${ath.username}`)
//                 }
//                 }
                
//               />
//             </Group>
//             {links.map((link) => {
//               return (
//                 <a key={link.label} href={link.link} className={classes.link}>
//                   <Text size={"xl"}>{link.label}</Text>
//                 </a>
//               );
//             })}

//             <a href={"/blog"} target="_blank" className={classes.link}>
//               <Group>
//                 <Text size={"xl"}>Blog</Text>
//               </Group>
//             </a>
//             <a
//               href={"https://mvpz.my.canva.site/faqs"}
//               target="_blank"
//               className={classes.link}
//             >
//               <Group>
//                 <Text size={"xl"}>FAQs</Text>
//               </Group>
//             </a>

//             <a
//               href="mailTo:team@mvpz.io?subject=Request for Support"
//               target="_blank"
//               className={classes.link}
//             >
//               <Group>
//                 <Text size={"xl"}>Support</Text>
//               </Group>
//             </a>

//             <Group mt={16} ml={0} spacing={8}>
//               <ActionIcon
//                 component="a"
//                 href={
//                   "https://www.instagram.com/mvpz_sport?igsh=b2N1bjBpMHQxdDdk"
//                 }
//                 target="_blank"
//                 size="md"
//                 color="gray"
//                 variant="subtle"
//               >
//                 <IconBrandInstagram size={32} />
//               </ActionIcon>
//               <ActionIcon
//                 component="a"
//                 href={"https://twitter.com/mvpz_sport"}
//                 target="_blank"
//                 size="md"
//                 color="gray"
//                 variant="subtle"
//               >
//                 <IconBrandX />
//               </ActionIcon>
//               <ActionIcon
//                 component="a"
//                 href={"https://medium.com/@_MVPz"}
//                 target="_blank"
//                 size="md"
//                 color="gray"
//                 variant="subtle"
//               >
//                 <IconBrandMedium size={32} />
//               </ActionIcon>
//               <ActionIcon
//                 component="a"
//                 href={"https://www.linkedin.com/company/89859823"}
//                 target="_blank"
//                 size="md"
//                 color="gray"
//                 variant="subtle"
//               >
//                 <IconBrandLinkedin size={32} />
//               </ActionIcon>
//               <ActionIcon
//                 component="a"
//                 href={
//                   "https://www.youtube.com/channel/UCxh_9u-MXEQfQ41_etQpQQQ"
//                 }
//                 target="_blank"
//                 size="md"
//                 color="gray"
//                 variant="subtle"
//               >
//                 <IconBrandYoutube size={32} />
//               </ActionIcon>
//               <ActionIcon
//                 component="a"
//                 href={"https://discord.com/invite/BeknQdEsbx"}
//                 target="_blank"
//                 size="md"
//                 color="gray"
//                 variant="subtle"
//               >
//                 <IconBrandDiscord size={32} />
//               </ActionIcon>
//               <ActionIcon component="a" href={"mailTo:team@mvpz.io"} size="lg">
//                 <IconMail />{" "}
//               </ActionIcon>
//             </Group>
//           </Drawer>
//           <Group className="gap-0">
//             <Burger
//               opened={opened}
//               onClick={toggleDrawer}
//               size="sm"
//               className={classes.drawer}
//             />
//             <Image
//               style={{ cursor: "pointer" }}
//               src="/images/mvpz-logo-purple.png"
//               height={144}
//               width={144}
//               className="relative md:w-[144px] w-[80px] md:h-[144px] h-[80px]"
//               alt="logo"
//               onClick={() =>
//                 session?.user ? router.push("/fanzone") : router?.push("/")
//               }
//             ></Image>
//           </Group>

//           {/* </div> */}
//           <Group>
//             <div className="lg:inline-block hidden ">
//               <SearchFeild
//                 handleAthleteSelect={(ath) =>
//                   router.push(`/fanzone/tribe/profile/athlete/${ath.username}`)
//                 }
//               />
//             </div>

//             <a
//               href="/fanzone"
//               className="md:flex hidden justify-start items-center "
//             >
//               <Image
//                 src={"/images/f1.png"}
//                 alt="image"
//                 width={500}
//                 height={500}
//                 className="h-[35px] w-[35px] object-contain "
//               />
//               <Text size={12} weight={800}>
//                 Fanzone
//               </Text>
//             </a>

//             <div className=" relative z-0 mr-1 ">
//               <div
//                 className="relative z-0 cursor-pointer "
//                 onClick={handleOpenNotifications}
//               >
//                 <FaBell
//                   size={20}
//                   className={openNotification && "text-primary"}
//                 />
//                 {session?.user?.notifications?.hasUnreadNotifications && (
//                   <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full z-0"></div>
//                 )}
         
//               </div>
             
//             </div>

//             <Text
//               w={"full"}
//               weight={500}
//               size="sm"
//               sx={{ lineHeight: 1 }}
//               mr={3}
//               className="cursor-pointer flex justify-start items-center gap-1"
//               onClick={() =>
//                 largeScreen
//                   ? router.push("/profile")
//                   : session?.user?.role === "Athlete"
//                   ? router?.push(`/fanzone/tribe/profile/athlete`)
//                   : router.push(`/fanzone/profile/user`)
//               }
//             >
//               <Avatar
//                 src={user.image}
//                 alt={user.name}
//                 radius="xl"
//                 size={30}
//                 className={"block border-2 border-white"}
//               />
//               <span className=" text-[12px]">
//                 {" "}
//                 {user.name
//                   ? user.name.split(" ")[0]
//                   : user.email?.split("@")[0]}
//               </span>
//             </Text>
//           </Group>
//         </div>
//       </div>
//       {openNotification && (
//         <NotificationsModel
//           setOpenNotification={setOpenNotification}
//           notifications={session?.user?.notifications?.list}
//           loading={!session?.user}
//           updateSession={update}
//         />
//       )}
//     </>
//   );
// }
