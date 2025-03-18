import { Avatar, Box, Button, Card, Container, createStyles, Divider, Grid, Group, Image, Loader, Paper, Popover, rem, ScrollArea, SimpleGrid, Spoiler, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack, IconArrowLeft, IconBrandDiscord, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandMedium, IconBrandTiktok, IconBrandTwitter, IconBrandX, IconBrandYoutube, IconMail } from "@tabler/icons-react";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
        maxWidth: 1200,
        [theme.fn.smallerThan('xs')]:{
            padding: 0,
            marginLeft: -24,
            marginRight: -24
        },
        [theme.fn.largerThan('xs')]:{
            padding: 20
        }
    },
    backButton:{
        flexDirection:'column',
        textAlign: 'start',
        cursor: 'pointer',
        padding:  `${rem(2)} ${rem(2)}`
    },
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1
    },
    avatar: {
        [theme.fn.smallerThan('xs')]:{
            height: 120,
            width: 120,
            borderRadius: 64,
            marginTop: -90,
        },
        [theme.fn.largerThan('xs')]:{
            height: 200,
            width: 200,
            borderRadius: 150,
            marginTop: -160,
        },        
        zIndex: 9,
        
        marginLeft: 16,
        marginRight: 16,
        border: `${rem(2)} solid ${theme.colors.gray[8]}`,
        
    },
    editButton: {
        border: 'transparent'
    },
    card: {
        background: theme.colors.gray[8]
    },
    bannerImage: {
        [theme.fn.smallerThan('sm')]:{
            minHeight: 120
        }
    },
    container: {
        position: 'relative',
        width: '100%'
    },
    button: {
        borderRadius: 24,
        position: 'absolute',
        top: '18%',
        left: '6%',
        border: '4px black solid'        
    },
    aboutme: {
        textWrap: 'wrap',
        fontFamily: 'MonumentExtended-Regular',
        fontSize: 14,
        color: theme.colors.gray[5]
    }
}))

export default function AthleteProfileOld({user={} as any, cards=[], gotoCheckout=null}) {
    const {classes} = useStyles()
    const router = useRouter()
    // const {data: session, status} = useSession()
    const socialLinks = user?.socialLinks || []
    const twitterLink = socialLinks.find(l => l.socialBrand === 'X' || l.socialBrand === 'twitter')?.link || null
    const instaLink = socialLinks.find(l => l.socialBrand === 'instagram')?.link || null
    const fbLink = socialLinks.find(l => l.socialBrand === 'facebook')?.link || null
    const linkedinLink = socialLinks.find(l => l.socialBrand === 'linkedin')?.link || null
    const tiktokLink = socialLinks.find(l => l.socialBrand === 'tiktok')?.link || null
    
    return ( 
        <Container fluid className={classes.wrapper}>
            <ScrollArea  h={900} type='scroll' offsetScrollbars scrollbarSize={2}>
            <Group mb={16}><IconArrowLeft onClick={() => router.back()} className={classes.backButton}/></Group>
            <Image src={user.bannerDisplayImage || "/images/Upload_Banner.png"} className={classes.bannerImage}></Image>
            
            <Group position="apart" mt={16} spacing={'lg'}>
                <Group position="left" mt={16} spacing={'lg'}>
                    <Avatar src={user.profileImage} className={classes.avatar}></Avatar>
                    <div>
                        <Text mb={2}>{user.name}</Text>
                        <Text size="xs" mt={2} color="dimmed">Athlete - {user.currentSchool}</Text>
                        <Text size="xs" mt={2} color="dimmed">{user.primarySport}</Text>
                        <Text size="xs" mt={2} color="dimmed">{user.primaryPosition}</Text>
                    </div>                        
                </Group>
                {/* <Group position="right" spacing={'lg'}>
                    <div>
                        <Text className={classes.label}>173</Text>
                        <Text size="xs" color="dimmed">
                            Cards
                        </Text>
                    </div>
                    <Divider orientation="vertical" size={'md'}/>
                    <div>
                        <Text className={classes.label}>500</Text>
                        <Text size="xs" color="dimmed">
                            Followers
                        </Text>
                    </div>
                    <Divider orientation="vertical" size={'md'}/>
                    <div>
                        <Text className={classes.label}>500</Text>
                        <Text size="xs" color="dimmed">
                            Following
                        </Text>
                    </div>
                    <Button>Follow</Button>
                </Group> */}
            </Group>
            <Grid mb={64} gutterSm={64}>
                <Grid.Col sm={5} xs={12}>
                    <Stack mb={32}>
                        {!!user.aboutMe && <>
                            <Group position="apart" mt={32}>
                                <Text size={'xl'} fw={700} color={'white'}>About {user.name.split(' ')[0]}</Text>
                            </Group>
                            <Spoiler maxHeight={300} showLabel="Show more" hideLabel="Hide">
                                <pre className={classes.aboutme}>
                                {user.aboutMe}
                                </pre>
                            </Spoiler>
                        </>}
                        {!!user.socialLinks?.length && <><Text mt={8} size={'xl'} fw={700} color={'white'}>Links</Text>
                        <Group spacing={'xl'} position='left'>
                            {!!instaLink && <a href={instaLink} target="_blank"><IconBrandInstagram /></a>}
                            {!!twitterLink && <a href={twitterLink} target="_blank"><IconBrandX/></a>}
                            {!!fbLink && <a href={fbLink} target="_blank"><IconBrandFacebook/></a>}
                            {!!linkedinLink && <a href={linkedinLink} target="_blank"><IconBrandLinkedin/></a>}
                            {!!tiktokLink && <a href={tiktokLink} target="_blank"><IconBrandTiktok/></a>}
                        </Group></>}
                        {!!user.cardDisplayImage && <>
                        <Text size={'lg'}>{user.firstname} card</Text>
                        <div className={classes.container}>
                            <Image ml={32} mt={8} src={user.cardDisplayImage} width={"90%"}></Image>
                            <Button className={classes.button}>${user.cost}</Button>
                        </div>
                        <Group position="center"><Button onClick={() => !!gotoCheckout ? gotoCheckout() : router.push('/genone')} >BUY NOW</Button></Group>
                            {/* <Card w={"81%"} style={{textAlign: 'center', marginLeft: 32, marginTop:-330, background: 'rgba(20,20,20,0.7)'}}>
                                <Title color={"white"}>$20</Title>
                                <Button>Buy now</Button>
                                <Text>Only 18 remaining!</Text>
                            </Card> */}
                        </>}
                    </Stack>
                </Grid.Col>
                <Grid.Col sm={7} xs={12}>
                    <Stack>
                        {!!cards.length && <><Group>
                            <Title order={2}>Own Collection</Title>
                            <Button variant={"outline"}>View</Button>
                        </Group>
                        <SimpleGrid cols={3}>
                            {cards.slice(0,3).map(card => {
                                return <Card p={0} key={card.id}>
                                    <Image  src={card.displayImage}></Image>
                                </Card>
                            })}
                            <Card p={0}><Image  src="/images/29.png"></Image></Card>
                            <Card p={0}><Image  src="/images/89.png"></Image></Card>
                            <Card p={0}><Image  src="/images/101.png"></Image></Card>
                        </SimpleGrid></>}
                        <Group mt={16} position='apart'>
                            <Title order={2}>MVPz Apparel</Title>
                            <Button variant={"subtle"}>Coming Soon</Button>
                        </Group>
                        <SimpleGrid cols={3}>
                            <Popover width={300} shadow="md" withArrow>
                                <Popover.Target><Card p={0}><Image  src="/images/apparal-1.png"></Image></Card></Popover.Target>
                                <Popover.Dropdown><Text size={'xs'}>MVPz first athleisure range</Text></Popover.Dropdown>
                            </Popover>
                            <Popover width={300} shadow="md" withArrow>
                                <Popover.Target><Card p={0}><Image  src="/images/team-design.png"></Image></Card></Popover.Target>
                                <Popover.Dropdown><Text size={'xs'}>Casual apparel printed with the work of sports creatives</Text></Popover.Dropdown>
                            </Popover>
                            <Popover width={300} shadow="md" withArrow>
                                <Popover.Target><Card p={0}><Image  src="/images/apparal-3.png"></Image></Card></Popover.Target>
                                <Popover.Dropdown><Text size={'xs'}>Assorted accessories to compliment your lifestyle</Text></Popover.Dropdown>
                            </Popover>
                        </SimpleGrid>
                        <Group mt={16} position='apart'>
                            <Title order={2}>Card Enhancements</Title>
                            <Button  variant={"subtle"}>Coming Soon</Button>
                        </Group>
                        <SimpleGrid cols={3}>
                            <Popover width={300} shadow="md" withArrow>
                                <Popover.Target><Card p={0}><Image  src="/images/enh-1.png"></Image></Card></Popover.Target>
                                <Popover.Dropdown><Text size={'xs'}>Enhance your card by applying a limited edition design</Text></Popover.Dropdown>
                            </Popover>
                            <Popover width={300} shadow="md" withArrow>
                                <Popover.Target><Card p={0}><Image  src="/images/enh-2.png"></Image></Card></Popover.Target>
                                <Popover.Dropdown><Text size={'xs'}>Change the team color of your card to track transfers</Text></Popover.Dropdown>
                            </Popover>
                            <Popover width={300} shadow="md" withArrow>
                                <Popover.Target><Card p={0}><Image  src="/images/enh-3.png"></Image></Card></Popover.Target>
                                <Popover.Dropdown><Text size={'xs'}>Check out enhancements from independent artist</Text></Popover.Dropdown>
                            </Popover>
                        </SimpleGrid>                        
                    </Stack>
                </Grid.Col>
            </Grid>
            {/* <Stack>
                <Group mt={16}>
                    <Title order={2}>Affiliate brands</Title>
                    <Button variant={"outline"}>View</Button>
                </Group>
                <SimpleGrid cols={3}>
                    <Card p={0}><Image  src="/images/HeyDude.svg"></Image></Card>
                    <Card p={0}><Image  src="/images/Whoop.svg"></Image></Card>                    
                    <Card p={0}><Image  src="/images/TheAthletic.svg"></Image></Card>
                </SimpleGrid>
            </Stack> */}
            <Stack mt={32} pb={32}>
                <Group mt={16}>
                    <Title order={2}>Card Packs</Title>
                </Group>
                <Card onClick={() => router.push('/mvpz-store')} style={{cursor: 'pointer'}} p={0}><Image  src="/images/sign_in.png"></Image></Card>
                <Stack mt={32} align={'center'}>
                    <Title order={2}>NCAA Athlete?</Title>
                    <Title order={3}><a href="mailTo:team@mvpz.io">Contact us</a></Title>
                </Stack>
            </Stack>
            </ScrollArea>
        </Container>
    )
}