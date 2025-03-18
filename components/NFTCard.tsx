import { Button, Card, createStyles, Group, Image, Stack, Text } from "@mantine/core";

const useStyles = createStyles(theme => ({
    
}))

const NFTCard = ({image, name, design, designer, username}) => {

    return (
        <Card shadow={'sm'} withBorder radius={'md'}>
            <Card.Section>
                <Image src={image}></Image>
            </Card.Section>
            <Stack ml={16} mr={16} mt={16}>
                 <Text color="white" fw={600}>{name}</Text>
                 <Group position="apart" align={"stretch"}>
                    <Text>{design}</Text>
                    <Text>{designer}</Text>
                 </Group>
                 <Button>View</Button>
             </Stack>
        </Card>
    )
}

export default NFTCard;