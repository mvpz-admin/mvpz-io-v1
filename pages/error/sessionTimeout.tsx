import { Button, Container, createStyles, Image, Text } from "@mantine/core"
import { useRouter } from "next/router"
import Layout from "../../core/Layout/Layout"

const useStyles = createStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%'
    },
    button: {
        position: 'absolute',
        top: '75%',
        left: '72%',
        transform: 'translate(-50%, -50%)',
        '-ms-transform': 'translate(-50%, -50%)'
        
    }
}))

export default function SessionTimeout(props){
    const {classes} = useStyles()
    const router = useRouter()
    return (
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
            <div className={classes.container}>
                <Image src={'/images/errorpage.png'}></Image> 
                <Button onClick={() => router.push('/profile/myCards')} className={classes.button}>Home</Button>
            </div>                        
        </Container>
    )
}