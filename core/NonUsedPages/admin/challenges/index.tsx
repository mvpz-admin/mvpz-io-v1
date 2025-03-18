import { Button, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../../../lib/utils";

export default function Challenges () {
    const [challenges, setChallenges] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const fetchChallenges = async() => {
        setLoading(true)
        const res = await callAPI({method: 'GET', endpoint: '/api/admin/collectionChallenge'})
        setChallenges(res.challenges)
        setLoading(false)
    }

    useEffect(() => {
        fetchChallenges()
    },[])

    return (
        <Stack>
            <Group position="apart">
                <Title>Challenges</Title>
                <Button onClick={() => router.push('challenges/create')}>Create New</Button>
            </Group>
            {!!loading ? <Loader/> : 
            !!challenges?.length ? challenges.map(challenge => {
                return (
                <Paper p={8} radius={'sm'} shadow={'sm'} m={16}>
                    <Text>{challenge.name}</Text>
                    <Group>
                        <Text>{challenge.type}</Text>
                        <Text>{challenge.minCount} cards</Text>
                    </Group>
                </Paper>
            )}) : <Text>No Challenges</Text>
            }
        </Stack>
    )
}