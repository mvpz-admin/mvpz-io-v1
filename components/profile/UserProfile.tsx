// import { Avatar, Button, Card, Container, createStyles, Divider, Grid, Group, Image, Paper, rem, SimpleGrid, Stack, Text, Title } from "@mantine/core";
// import { IconArrowBack, IconArrowLeft, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandTwitter } from "@tabler/icons-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

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

// export default function UserProfile(props) {
//     const {classes} = useStyles()
//     const {data: session, status} = useSession()
//     const router = useRouter()

//     return (
//         <>
//             <Container fluid className={classes.wrapper}>
//                 <Group mb={16}><IconArrowLeft onClick={() => router.back()} className={classes.backButton}/></Group>
//                 <Image src="/images/test4.jpg" height={360}></Image>
//                 <Group position="apart" mt={16} spacing={'lg'}>
//                     <Group position="left" mt={32} spacing={'md'}>
//                         <Avatar size={'xl'} radius='xl' src={session?.user?.image} className={classes.avatar}></Avatar>
//                         <div style={{marginTop: -8}}>
//                             <Text mb={2}>Joe Bloggs</Text>
//                             <Text size="xs" mt={2} color="dimmed">Fan</Text>
//                         </div>                        
//                     </Group>
//                     <Group position="right" spacing={'lg'}>                       
//                         <Button>Message</Button>
//                     </Group>
//                 </Group>
//                 <Card w={320} mt={16} radius="lg">
//                     <Text align="center" size={'sm'} fw={400} color={'white'}>Socials</Text>
//                     <Group spacing={'xl'} position='center' mt={16}>
//                         <IconBrandInstagram/>
//                         <IconBrandTwitter/>
//                         <IconBrandFacebook/>
//                         <IconBrandLinkedin/>
//                         <IconBrandTiktok/>
//                     </Group>
//                 </Card>
//                 <SimpleGrid cols={3} mt={32}>
//                     <Stack>
//                         <Text align="center">Joe's Team</Text>
//                         <Image src="/images/1.png"></Image>
//                     </Stack>
//                     <Stack>
//                         <Text align="center">Joe's 1st Sport</Text>
//                         <Image src="/images/1.png"></Image>
//                     </Stack>
//                     <Stack>
//                         <Text align="center">Most Valuable Player</Text>
//                         <Image src="/images/1.png"></Image>
//                     </Stack>
//                 </SimpleGrid>
//                 <Group mt={32}>
//                     <Text size={"xl"} fw={700}>Joe's Collection</Text>
//                     <Button>View</Button>
//                 </Group>
//                 <SimpleGrid mt={32} cols={9}>

//                     <Image alt="" width={300} src="/images/1.png"></Image>
//                     <Image alt="" width={300} style={{marginLeft: -16}} src="/images/1.png"></Image>
//                     <Image alt="" width={300} style={{marginLeft: -32}} src="/images/1.png"></Image>
//                     <Image alt="" width={300} style={{marginLeft: -64, zIndex: 7}} src="/images/1.png"></Image>
//                     <Image alt="" width={300} style={{marginLeft: -72, zIndex: 8}} src="/images/1.png"></Image>
//                     <Image alt="" width={300} style={{marginLeft: -100, zIndex: 7}} src="/images/1.png"></Image>
//                     <Image alt="" width={300} style={{marginLeft: -100, zIndex: 6}} src="/images/1.png"></Image>
//                     <Image alt="" width={300} style={{marginLeft: -100, zIndex: 5}} src="/images/1.png"></Image>
//                     <Image alt="" width={300} style={{marginLeft: -100, zIndex: 4}} src="/images/1.png"></Image>
//                 </SimpleGrid>
//             </Container>
//         </>
//     )
// }