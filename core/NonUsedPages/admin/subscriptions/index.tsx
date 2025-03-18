import { Container, Group, Loader, Paper, Tabs, Text } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../../../lib/utils";

export default function Subscriptions(){
    const [loading, setLoading] = useState(false)
    const [subscriptions, setSubscriptions] = useState([])

    const fetchSubscriptions = async () => {
        setLoading(true)
        const result = await callAPI({endpoint: '/api/admin/subscriptions'})
        if(result.length){
            setSubscriptions(result)
        }
        setLoading(false)
    }

    const filterSubscriptions = (type) => {
        const filteredSubscriptions = subscriptions.filter(s => type === 'all' ? true : s.type === type)
        return filteredSubscriptions.length ? filteredSubscriptions.map(subscription => {
            return (
            <Paper key={subscription.id} shadow='md' p='md' m={8}>
                <Group position="apart">
                    <Text tt={'capitalize'} size='sm'>{subscription.type}</Text>
                    <Text>User: {subscription.user ? subscription.user.email : subscription.email}</Text>
                </Group>
                <Text c={'dimmed'} size={'xs'} align="right">Subscribed on {new Date(subscription.createdAt).toDateString()}</Text>
            </Paper>
            )
        }) : <Text mt={16} align='center'>No subscriptions of type: {type}</Text>
    }

    useEffect(() => {
        fetchSubscriptions()
    },[])

    return (
        <Container style={{maxWidth: '1200px', maxHeight: '1080px'}}>
            {loading ? <Loader/> : 
            subscriptions?.length ? 
            <Tabs defaultValue="all">
                <Tabs.List position="left">
                    <Tabs.Tab value="all">All - {subscriptions.length}</Tabs.Tab>
                    <Tabs.Tab value="presale">Presale</Tabs.Tab>
                    <Tabs.Tab value="apparel">Apparel</Tabs.Tab>
                    <Tabs.Tab value="shop">Shop</Tabs.Tab>
                    <Tabs.Tab value="trade">Trade</Tabs.Tab>
                    <Tabs.Tab value="games">Games</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="all" mb={64}>
                {filterSubscriptions('all')}
                </Tabs.Panel>
                <Tabs.Panel value="presale" mb={64}>
                {filterSubscriptions('presale')}
                </Tabs.Panel>
                <Tabs.Panel value="apparel" mb={64}>
                {filterSubscriptions('apparel')}
                </Tabs.Panel>
                <Tabs.Panel value="shop" mb={64}>
                {filterSubscriptions('shop')}
                </Tabs.Panel>
                <Tabs.Panel value="trade" mb={64}>
                {filterSubscriptions('trade')}
                </Tabs.Panel>
                <Tabs.Panel value="games" mb={64}>
                {filterSubscriptions('games')}
                </Tabs.Panel>
            </Tabs> : 
            <Text>No subscriptions</Text>}
        </Container>
    )
}