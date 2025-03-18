import { useSession } from "next-auth/react"
import React from "react"
import Layout from "../core/Layout/Layout"
import { ActionIcon, Box, Button, Container, createStyles, Divider, Group, List, Loader, Modal, Stack, Text, TextInput, Title } from "@mantine/core"
import Image from "next/image"
import { IconBrandDiscord, IconBrandInstagram, IconBrandLinkedin, IconBrandMedium, IconBrandTwitter, IconBrandX, IconBrandYoutube, IconMail } from "@tabler/icons-react"
import { useMantineTheme } from "@mantine/styles"
import { useRouter } from "next/router"
import PreSale from "../components/PreSale"

const useStyles = createStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontSize: '52px'
    },
    name:{
        fontSize: '36px'
    },
    text: {
        [theme.fn.smallerThan('sm')]: {
            fontSize: 14,
        },
        [theme.fn.largerThan('sm')]: {
            fontSize: 22,
            textAlign: 'center'
        },
    }
}))
const GenerationOne: React.FC = () => {
    const {classes} = useStyles()
    const theme = useMantineTheme()
    const router = useRouter()
    const {data: session, status} = useSession()
    
    const gotoMint = async() => {
        if(status === 'authenticated'){
            // const mintSession = await fetch('/api/user/mintSession', {method: 'GET', headers: {'Content-Type':'application/json'}})
            // const sessionJSON = await mintSession.json()
            // window.location.assign(`https://mint.mvpz.io/buy?t=${sessionJSON}`)
            router.push('/mvpz-store')
        }else{
            router.push('/auth/signin')
        }
    }

    return (
        <Container style={{maxWidth: '1200px'}} mb={64}>
            <Group position="right" mr={8}>
                {/* <PreSale status={status}/> */}
                <Button onClick={gotoMint}>BUY NOW</Button>
            </Group>
            <Group position="center">
                <Image alt="" height={300} width={900} src={'/images/GEN1_edited.png'}></Image> 
            </Group>
            <Stack spacing={32} mt={16} mb={64}>
                <Stack align={'center'} spacing={0}>
                    <Text className={classes.text}>
                        GEN1 cards are open to all NCAA sports.
                    </Text>
                    <Text className={classes.text}>
                        Giving you a ticket to an expansive sports ecosystem.
                    </Text>
                </Stack>
                <Stack align={'center'} spacing={0}>
                    <Text className={classes.text}>
                        Utilize your card in our up coming strategy game, on our social network, as a loyalty card, or as a collectible.
                    </Text>
                </Stack>
                <Stack align={'center'} spacing={0}>
                    <Text className={classes.text}>
                        Check out the 4 different card types below! 
                    </Text>
                </Stack>
            </Stack>
            <Group position="center">
                <Image alt="" style={{cursor: 'pointer'}} width={1200} height={600} src='/images/athlete.png'></Image>
            </Group>
            <Group position="center">
                <Image alt="" style={{cursor: 'pointer'}} width={1200} height={600} src='/images/1of1.png'></Image>
            </Group>
            <Group position="center">
                <Image alt="" style={{cursor: 'pointer'}} width={1200} height={600} src='/images/team.png'></Image>
            </Group>
            <Group position="center">
                <Image alt="" style={{cursor: 'pointer'}} width={1200} height={600} src='/images/championship.png'></Image>
            </Group>
            <Group position="center">
                <Image alt="" style={{cursor: 'pointer'}} width={1200} height={600} src='/images/activity.png'></Image>
            </Group>
            {/* <Stack mt={64}>
                <Group>
                    <Image alt="" width={300} src='images/17.png'></Image>
                    <Image alt="" width={192} src='images/89.png'></Image>
                    <Image alt="" width={192} src='images/62.png'></Image>
                    <Stack ml={16} mt={8} spacing={2}>
                        <Title>ATHLETE CARDS</Title>
                        <Text mt={16}>Feature the athletes</Text>
                        <Text>Duplicates can evolve independent of others</Text>
                        <Text>Buy and apply redesigns from artists</Text>
                        <Text>Turn it into a physical card!</Text>
                    </Stack>
                </Group>
            </Stack>
            <Stack mt={64}>
                <Group>
                    <Stack ml={16} mt={8} spacing={2} mr={64} align='center'>
                        <Text mt={16}>Watch out for this Golden Design!</Text>
                        <Title color={'gold'}>You will have pulled a 1 <i>of</i> 1</Title>
                    </Stack>
                    <Image alt="" width={300} src='images/101.png'></Image>
                    
                </Group>
            </Stack>
            <Stack mt={64}>
                <Group>
                    <Image alt="" width={192} src='images/LSU.png'></Image>
                    <Image alt="" width={300} src='images/Arkansas.png'></Image>
                    <Image alt="" width={192} src='images/CU.png'></Image>
                    <Stack ml={16} mt={8} spacing={2}>
                        <Title>TEAM CARDS</Title>
                        <Text mt={16}>Features team mascots</Text>
                        <Text>Displays allegiance on profile</Text>
                        <Text>Required to complete collections and gain XP</Text>
                        <Text>Only 100 cards per team</Text>
                    </Stack>
                </Group>
            </Stack>
            <Stack mt={64}>
                <Group>
                    <Stack mr={16} mt={8} spacing={2} align='end'>
                        <Title>CHAMPIONSHIP CARDS</Title>
                        <Text mt={16}>Celebrates winning national championship</Text>
                        <Text>Only 50 cards per championship</Text>
                        <Text>Required for completing collections</Text>
                        <Text>Gives XP in the GEN1 game</Text>
                    </Stack>
                    <Image alt="" width={300} src='images/12.png'></Image>
                    <Image alt="" width={192} src='images/30.png'></Image>
                    <Image alt="" width={192} src='images/26.png'></Image>
                    
                </Group>
            </Stack>
            <Stack mt={64}>
                <Group>
                    <Image alt="" width={300} src='images/151.png'></Image>
                    <Image alt="" width={192} src='images/152.png'></Image>
                    <Image alt="" width={192} src='images/153.png'></Image>
                    <Stack ml={16} mt={8} spacing={2}>
                        <Title>ACTIVITY CARDS</Title>
                        <Text mt={16}>3 rarities: Gold Silver Bronze</Text>
                        <Text>Redeemable for other cards and perks</Text>
                        <Text>Gives XP in the GEN1 game</Text>
                        <Text>Required for collections and content access</Text>
                    </Stack>
                </Group>
            </Stack> */}
            <Group mt={8} mb={8} position="right">
                <ActionIcon component='a' href={'https://www.instagram.com/mvpz_sport?igsh=b2N1bjBpMHQxdDdk'} target='_blank' size="lg" color="gray" variant="subtle"><IconBrandInstagram size={32}/></ActionIcon>
                <ActionIcon component='a' href={'https://twitter.com/mvpz_sport'} target='_blank' size="lg" color="gray" variant="subtle"><IconBrandX/></ActionIcon>
                <ActionIcon component='a' href={'https://medium.com/@_MVPz'} target='_blank' size="lg" color="gray" variant="subtle"><IconBrandMedium size={32}/></ActionIcon>
                <ActionIcon component='a' href={'https://www.linkedin.com/company/89859823'} target='_blank' size="lg" color="gray" variant="subtle"><IconBrandLinkedin size={32}/></ActionIcon>
                <ActionIcon component='a' href={'https://www.youtube.com/channel/UCxh_9u-MXEQfQ41_etQpQQQ'} target='_blank' size="lg" color="gray" variant="subtle"><IconBrandYoutube size={32}/></ActionIcon>
                <ActionIcon component='a' href={'https://discord.com/invite/BeknQdEsbx'} target='_blank' size="lg" color="gray" variant="subtle"><IconBrandDiscord size={32}/></ActionIcon>
                <ActionIcon component='a' href={'mailTo:team@mvpz.io'}><IconMail size={32}/> </ActionIcon>
            </Group>
            <Divider/>
        </Container>
  )
}


export default GenerationOne
