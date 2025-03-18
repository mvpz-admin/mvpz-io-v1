import { Container, Grid, Image, Loader, Tabs } from "@mantine/core";
import ComingSoon from "../../components/ComingSoon";

const Games = (props) => {
    return (
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} >
            <ComingSoon type={"games"}/>
        </Container>
    )
}

export default Games;