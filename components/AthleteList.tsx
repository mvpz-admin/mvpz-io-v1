import { Avatar, Button, Card, Container, createStyles, Divider, Grid, Group, Image, Paper, rem, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconArrowBack, IconArrowLeft, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandTwitter, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
        paddingLeft: 0,
        paddingRight: 0
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
        height: 120,
        width: 120,
        zIndex: 9,
        marginTop: -144,
        marginLeft: 16,
        marginRight: 16,
        border: `${rem(2)} solid ${theme.colors.gray[8]}`,
        borderRadius: 64
    },
    editButton: {
        border: 'transparent'
    },
    card: {
        background: theme.colors.gray[8]
    }
}))

export default function AthleteList({athletes}) {
    const {classes} = useStyles()
    const router = useRouter()
    
    return (
        <>
            <Container fluid className={classes.wrapper}>
                <Group mb={16} position={'apart'}>
                    <IconArrowLeft onClick={() => router.back()} className={classes.backButton}/>
                    <Button onClick={() => router.push('/admin/athlete/create')}>Add Athlete</Button>
                </Group>
                <SimpleGrid cols={4}>
                {athletes.map(user => {
                    return (
                        <Card p={16} onClick={() => router.push(`/athlete/${user.username}`)} key={user.username} shadow={'sm'} withBorder radius={'md'} style={{cursor: 'pointer'}}>
                            {/* <Image alt="" width={232} height={240} src={user.profileImage}></Image> */}
                            <Stack mt={8}>
                                <Text mb={2}>{user.name}</Text>
                                <Text size="xs" mt={2} color="dimmed">Athlete - {user.currentSchool}</Text>
                                <Text size="xs" mt={2} color="dimmed">{user.primarySport}</Text>
                                <Text size="xs" mt={2} color="dimmed">{user.primaryPosition}</Text>
                                <Text size="xs">Profile Image: {!!user.image ? 'Yes' : 'No'}</Text>
                                <Text size="xs">Banner Image: {!!user.bannerImage ? 'Yes' : 'No'}</Text>
                            </Stack>
                        </Card>
                    )
                })}
                </SimpleGrid>
            </Container>
        </>
    )
}