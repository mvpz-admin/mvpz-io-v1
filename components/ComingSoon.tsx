import { Button, Container, createStyles, Group, Image, Loader, Paper, Stack, Text } from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"

const useStyles = createStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%'
    },
    button: {
        [theme.fn.smallerThan('sm')]: {
            position: 'fixed',
            marginTop: 32,
            marginLeft: 90
        },
        [theme.fn.largerThan('sm')]: {
            position: 'absolute',
            top: '55%',
            left: '65%',
        }
        // transform: 'translate(-50%, -50%)',
        // '-ms-transform': 'translate(-50%, -50%)'
        
    },
    newsletter: {
[theme.fn.largerThan('sm')]: {
            position: 'absolute',
            top: '45%',
            left: '55%',
        }
        // transform: 'translate(-50%, -50%)',
        // '-ms-transform': 'translate(-50%, -50%)'
        
    }
}))

export default function ComingSoon({type}){
    const {classes} = useStyles()
    const router = useRouter()
    const [subscribed, setSubscribed] = useState(false)
    const [loading, setLoading] = useState(false)

    const subscribeUser = async() => {
        setLoading(true)
        const options ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({type: 'newsletter'})
        }
        const response = await fetch(`/api/user/subscription?type=newsletter`, options)
        const result = await response.json()
        if(!!result.subscribed){
            setSubscribed(true)
        }
        setLoading(false)
    }

    const checkSubscription = async() => {
        setLoading(true)
        const response = await fetch(`/api/user/subscription?type=newsletter`)
        setLoading(false)
        if(response){
            const result = await response.json()
            if(result?.id){
                setSubscribed(true)
            }
        }
    }

    useEffect(() => {
        checkSubscription()
    },[])

    return ( loading ? <Loader/> :
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
            <div className={classes.container}>
                <Image mt={90} src={'/images/coming_soon_2.png'}></Image> 
                {/* <Button onClick={subscribeUser} disabled={!!subscribed} className={classes.button}>{subscribed ? 'Subscribed' : 'Subscribe'}</Button> */}
                <Group position="center" className={classes.newsletter}>
                    <Paper p={16} radius={20} bg="#252525">
                    <Stack spacing={4}>
                        <Text color={'white'} fw={'bold'} align="center" size={18}>{!!subscribed ? "You are already subscribed to our newsletter" : "SIGN UP TO OUR NEWSLETTER"}</Text>
                        {!subscribed && <Text color={'white'} fw={500} align="center" size={12}>TO KEEP UPTODATE WITH THE LATEST DEVELOPMENTS</Text>}
                        {!subscribed && <Stack mt={8} align={'center'}>
                            <Button size={'xs'} color={'white'} w={200} onClick={subscribeUser}>SUBSCRIBE</Button>
                        </Stack>}
                    </Stack>
                    </Paper>
                </Group>
            </div>                        
        </Container>
    )
}