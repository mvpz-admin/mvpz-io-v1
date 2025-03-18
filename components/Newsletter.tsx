import { Avatar, Button, Card, Container, createStyles, Divider, Grid, Group, Image, Loader, Paper, rem, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../lib/utils";

const useStyles = createStyles((theme) => ({
    signupText1: {
        [theme.fn.smallerThan('sm')]:{
            fontSize: 16
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: 24
        }
    },
    signupText2: {
        [theme.fn.smallerThan('sm')]:{
            fontSize: 12
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: 18
        }
    }
}))

export default function Newsletter() {
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [newsletter, setNewsletter] = useState(false)
    const {classes} = useStyles()

    const saveSubscription = async () => {
        setLoading(true)
        const result = await callAPI({endpoint: `/api/user/subscription`, method: 'POST', body: {type: "newsletter"}})
        setLoading(false)
        if(!!result.subscribed){
            notifications.show({ message: "You are now subscribed to the MVPz newsletter."})
        }
        fetchSubscriptions()
    }

    const fetchSubscriptions = async() => {
        setLoading(true)
        const response = await callAPI({endpoint: '/api/user/subscription'})
        setLoading(false)
        if(response.length){
            setSubscriptions(response)
            const match = response.find(s => s.type === 'newsletter')
            if(!match){
                setNewsletter(true)
            }else{
                setNewsletter(false)
            }
        }else{
            setSubscriptions([])
        }
    }

    const unsubscribe = async (id) => {
        setLoading(true)
        const response = await callAPI({endpoint: '/api/user/subscription', method: 'DELETE', body: {id}})
        setLoading(false)
        if(response?.status === 'ok'){
            notifications.show({message: 'Unsubscribed successfully'})
        }
        fetchSubscriptions()
    }

    useEffect(() => {
        fetchSubscriptions()
    },[])

    return (
        <>  {loading ? <Loader/> :
            <Stack>
                <Group position="center">
                    <Paper p={16} radius={20} bg="#252525">
                    <Stack spacing={4}>
                        <Text className={classes.signupText1} color={'white'} fw={'bold'} align="center">{!!subscriptions.length ? "SUBSCRIBED TO NEWSLETTER" : "SIGN UP TO OUR NEWSLETTER"}</Text>
                        {!subscriptions.length && <Text className={classes.signupText2} color={'white'} fw={500} align="center">TO KEEP UPTODATE WITH THE LATEST DEVELOPMENTS</Text>}
                        <Stack mt={8} align={'center'}>
                            <Button color={'white'} w={200} onClick={() => !!subscriptions.length ? unsubscribe(subscriptions[0].id) : saveSubscription()}>{!!subscriptions.length ? "UNSUBSCRIBE" : "SUBSCRIBE"}</Button>
                        </Stack>
                    </Stack>
                    </Paper>
                </Group>
                {/* <Title>My Subscriptions</Title>
            {subscriptions.length ? subscriptions.map(subscription => {
                return (
                    <Card p={16} key={subscription.id} shadow={'sm'} withBorder radius={'md'} style={{cursor: 'pointer'}}>
                        <Group position="apart">
                            <Text mb={2} tt='capitalize'>Subscribed to {subscription.type} on {new Date(subscription.createdAt).toDateString()}</Text>
                            <Button onClick={() => unsubscribe(subscription.id)}>Unsubscribe</Button>
                        </Group>
                    </Card>
                )
            }) : <Text>No Subscriptions!</Text>} */}
            </Stack>}
        </>
    )
}