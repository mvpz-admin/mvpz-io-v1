import { Container, Grid, Group, Image, Loader, Tabs, Text, Title } from "@mantine/core";

const Games = (props) => {
    return (
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} >
            <Title align="center" mt={64}>Contact Us</Title>
            <Group mt={32}>
                <a href="mailTo:team@mvpz.io?subject=Request for Support"><Image alt="" width={200} src={'/images/Customer_support.png'}></Image></a>
                <a href="mailTo:team@mvpz.io?subject=General Inquiry"><Image alt="" width={200} src={'/images/General_Inquires.png'}></Image></a>
            </Group>
        </Container>
    )
}

export default Games;