import { Avatar, Button, Card, createStyles, Divider, Flex, Group, Image, Space, Stack, Table, Tabs, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles(theme => ({
    cardDivider: {
        borderRight: '0.0625rem solid #373A40'
    },
    dividerColor: {
        color: theme.primaryColor[0],
        width: '300px',
        marginLeft: -16
    },
    textcolor: {
        color: 'white'
    },
    cardDirection: {
        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column-reverse',
        },
    }
}))

const AthleteCardDetails = ({athlete, gotoCheckout}) => {
    const {classes} = useStyles()
    const {displayImage, title, username, primaryPosition, primarySport, currentSchool, special, design, designer, year, collection, sex, cost} = athlete
    const router = useRouter()
    
    return (
        <Stack mt={24}>

            <Group spacing={64} align={'start'} className={classes.cardDirection}>
                <Stack >
                    <Group position="center">
                        <Text color={"white"} size={"md"} style={{cursor: 'pointer', textDecoration: 'underline'}}
                                            onClick={() => router.push(`/athlete/${username}`)}>{title}</Text>
                    </Group>
                    <Card>
                        <Group position="center" grow>
                            <Stack spacing={0} className={classes.cardDivider}>
                                <Text size={"sm"}>Sport</Text>
                                <Text color={"white"} size={"md"}>{primarySport || 'NA'}</Text>
                            </Stack>
                            <Stack spacing={0}>
                                <Text size={"sm"}>Position</Text>
                                <Text color={"white"} size={"md"}>{primaryPosition || 'NA'}</Text>
                            </Stack>
                        </Group>    
                        <Stack mt={16} spacing={0}>
                            <Text size={"sm"}>School</Text>
                            <Text color={"white"} size={"md"}>{currentSchool || 'NA'}</Text>
                        </Stack>                    
                    </Card>
                    <Card>
                        <Group position="center" grow>
                            <Stack spacing={16} className={classes.cardDivider}>
                                <Stack spacing={0}>
                                    <Text size={"sm"}>Collection</Text>
                                    <Text color={"white"} size={"md"}>{collection || 'MVPz Gen 1'}</Text>
                                </Stack>
                            </Stack>
                            <Stack spacing={16}>
                                <Stack spacing={0}>
                                    <Text size={"sm"}>Year</Text>
                                    <Text color={"white"} size={"md"}>{year || 2024}</Text>
                                </Stack>
                            </Stack>
                        </Group>
                        
                    </Card>
                    <Card>
                        <Group position="center" grow>
                            <Stack spacing={16} className={classes.cardDivider}>
                                <Stack spacing={0}>
                                    <Text size={"sm"}>Design</Text>
                                    <Text color={"white"} size={"md"}>{design}</Text>
                                </Stack>
                                <Stack spacing={0}>
                                    <Text size={"sm"}>Designer</Text>
                                    <Text color={"white"} size={"md"}>{designer}</Text>
                                </Stack>
                            </Stack>
                            <Stack spacing={16}>
                                <Stack spacing={0}>
                                    <Text size={"sm"}>{'Sex'}</Text>
                                    <Text color={"white"} size={"md"}>{sex}</Text>
                                </Stack>
                                <Stack spacing={0}>
                                    <Text size={"sm"}>Price</Text>
                                    <Text color={"white"} size={"md"}>${cost}</Text>
                                </Stack>
                            </Stack>
                        </Group>
                    </Card>
                    <Group position="center">
                        <Button onClick={() => router.push(`/athlete/${username}`)}>Profile</Button>
                        <Button onClick={gotoCheckout}>PURCHASE</Button>
                    </Group>
                </Stack>
                <Stack align={"center"} justify="start">
                    <Image height={500} src={displayImage} fit="contain"></Image>
                    <Group position="center"></Group>
                </Stack>
            </Group>
        </Stack>
    )
}

export default AthleteCardDetails;