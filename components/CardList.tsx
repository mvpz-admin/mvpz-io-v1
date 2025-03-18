import { Avatar, Button, Card, Container, createStyles, Divider, Grid, Group, Image, Paper, rem, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { downloadFile } from "../lib/utils";

export default function CardList({cards, imageDownload, selectedEntities, setSelectedEntities}: any) {
    const router = useRouter()
    const theme = useMantineTheme()

    return (
        <>  
            <SimpleGrid cols={4}>
            {cards.length ? cards.map(card => {
                const isSelected = selectedEntities?.find(e => e === card.id)
                return (
                    <SingleCard key={card.id} isSelected={isSelected} _card={card} imageDownload={imageDownload} selectedEntities={selectedEntities} setSelectedEntities={setSelectedEntities}/>
                )
            }) : <Text>No cards</Text>}
            </SimpleGrid>
        </>
    )
}

function SingleCard({_card, imageDownload, isSelected, selectedEntities, setSelectedEntities}){
    const router = useRouter()
    const theme = useMantineTheme()
    const [card, setCard] = useState({_card} as any)
    const getImage = async()=>{
        if(imageDownload && imageDownload.downloadUrl && !card.displayImage){
            _card.displayImage = await downloadFile(`${imageDownload.downloadUrl}/file/mvpz-nfts-optimized/${_card.cardImageNFT}`, imageDownload.authorizationToken)
        }
        setCard(_card)
    }
    useEffect(()=>{
        getImage()
    },[_card, imageDownload])

    return (
        <Card p={16}  shadow={'sm'} withBorder radius={'md'} 
            style={{cursor: 'pointer', borderColor: isSelected ? theme.colors.mvpz[8] : 'transparent'}}
            onClick={() => {
                if(setSelectedEntities){
                    const matchIndex = selectedEntities.findIndex(e => e === card.id)
                    if(matchIndex >=0){
                        setSelectedEntities(selectedEntities.filter((e, idx) => idx != matchIndex))
                    }else{
                        setSelectedEntities([...selectedEntities, card.id])
                    }
                }else{
                    router.push(`/card/${card.id}`)
                }
            }}>
            {!!card.displayImage && <Image alt="" width={170} height={252} src={card.displayImage}></Image>}
            <Stack mt={8}>
                <Text mb={2}>{card.title}</Text>
                <Text size="xs" mt={2} color="dimmed">Athlete - {card.athlete?.name}</Text>
                <Group position="apart">
                    <Text size="xs" mt={2} color="dimmed">{card.design}</Text>
                    <Text size="xs" mt={2} color="dimmed">{card.designer}</Text>
                </Group>
                <Text size="xs" mt={2} color="dimmed">{card.position}</Text>
                <Text size="xs" mt={2} color="dimmed">{card.edition}</Text>
                <Text size="xs" mt={2} color="dimmed">{card.serialNumberStart}</Text>
                <Text size="xs" mt={2} color="dimmed">{card.mintCount}</Text>
            </Stack>
        </Card>
    )
}