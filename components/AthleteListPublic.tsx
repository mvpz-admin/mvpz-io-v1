import { Avatar, Button, Card, Container, createStyles, Divider, Grid, Group, Image, Paper, rem, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconEye, IconShoppingCartDollar } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { downloadFile } from "../lib/utils";

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

export default function AthleteListPublic({athletes, gotoCheckout, imageDownload}) {
    const {classes} = useStyles()
    const {downloadUrl: url, authorizationToken: authToken} = imageDownload
    return (
        <>
            <Container fluid className={classes.wrapper}>
                
                <SimpleGrid breakpoints={[{minWidth: 240, cols: 1},{minWidth: 'sm', cols: 2}, {minWidth: 'md', cols: 3}, {minWidth: 'lg', cols: 4}]}>
                {athletes.map(user => {
                    return (
                        <AthleteCardPublic key={user.username} userInfo= {{...user, gotoCheckout, url, authToken}}/>
                    )
                })}
                </SimpleGrid>
            </Container>
        </>
    )
}

const AthleteCardPublic = (props) => {
    console.log(props)
    const {id, username, name, currentSchool, primarySport, primaryPosition, image, authToken, url, gotoCheckout}: any = props.userInfo
    const [profileImage, setProfileImage] = useState(null)
    const router = useRouter()

    async function downloadImage(){
        if(image.includes('http')){
            setProfileImage(image)
        }else{
            setProfileImage(await downloadFile(`${url}/file/mvpz-user-private/${image}`, authToken))
        }
    }
    useEffect(() => {
        if(!!image){
            downloadImage()
        }
    },[image])

    return (
        <Card p={16} key={username} shadow={'sm'} withBorder radius={'md'} style={{cursor: 'pointer'}}>
            <Image alt="" width={232} height={240} src={profileImage}></Image>
            <Stack mt={8}>
                <Text mb={2}>{name}</Text>
                <Text size="xs" mt={2} color="dimmed">{currentSchool}</Text>
                <Group position="apart">
                    <Text size="xs" mt={2} color="dimmed">{primarySport}</Text>
                    <Text size="xs" mt={2} color="dimmed">{primaryPosition}</Text>
                </Group>
                <Group position="right">
                    <Button onClick={() => router.push(`/kstate/athletes/${username}`)}><IconEye/></Button>
                    <Button onClick={() => gotoCheckout('kstate_athlete', id)}><IconShoppingCartDollar/></Button>
                </Group>
            </Stack>
        </Card>
    )
}