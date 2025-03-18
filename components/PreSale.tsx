import { Button, Group, Loader, Modal, Stack, Text, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useState } from "react"
import { callAPI } from "../lib/utils";

export default function PreSale(props) {
    const {status} = props
    const {children} = props
    const [loading, setLoading] = useState(false)
    const [applyNow, { open: openApplyNow, close: closeApplyNow }] = useDisclosure(false);
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const subscribeUser = async() => {
        setLoading(true)
        const result = await callAPI({endpoint: `/api/user/subscription`, method: 'POST', body: JSON.stringify({type: "presale", email})})
        if(!!result.subscribed){
            setSubscribed(true)
        }
        setLoading(false)
    }

    const checkSubscription = async() => {
        setLoading(true)
        const result = await callAPI({endpoint:`/api/user/subscription?type=presale`})
        setLoading(false)
        if(result?.id){
            setSubscribed(true)
        }
    }

    useEffect(() => {
        if(status === 'authenticated'){
            checkSubscription()
        }
    },[])

    return (
        <>
            <Modal size={'lg'} centered opened={applyNow} onClose={closeApplyNow} title="Pre-Sale" overlayProps={{opacity: 0.55,blur: 3,}}>
                {!subscribed ? 
                <Stack>
                    {status !== 'authenticated' ?  <TextInput value={email} placeholder="Your email address" label="Enter your email to secure your place in the presale." onChange={(e) => setEmail(e.currentTarget.value)}></TextInput> :
                    <Text>Subscribe to secure your place in the presale.</Text>}
                    <Text>Presale commences 11th of March 2024 - Limited Spots Available!</Text>
                    <Group position="right">
                    <Button variant={'outline'} onClick={closeApplyNow}>Cancel</Button>
                    {loading ? <Loader/> : <Button onClick={subscribeUser}>{'Subscribe'}</Button>}
                    </Group>
                </Stack> : 
                <Stack>
                    <Text>You have been added to the presale shortlist, check your emails to see if you have been successful!</Text>
                </Stack>}
            </Modal>
            {!children ? <Button onClick={openApplyNow}>Pre Sale</Button> : 
            <div onClick={openApplyNow}>{children}</div> }
        </>
    )
}