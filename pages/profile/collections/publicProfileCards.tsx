import { Container, Image, Loader, SimpleGrid, Stack, Title } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { callAPI, downloadFile } from "../../../lib/utils";



const PublicProfileCards = (props) => {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [name, setName] = useState('')

    async function downloadImages(_cards, authToken, url){
        for(let card of _cards){
            if(card.nftEntity?.cardImageNFT){
                card.displayImage = await downloadFile(`${url}/file/mvpz-nfts-optimized/${card.nftEntity.cardImageNFT}`, authToken)
            }
        }
        setCards(_cards)
    }

    const handleFetchCard = async () => {
        setLoading(true)
        let response = await callAPI({endpoint : `/api/user/publicProfileCards?userId=${router?.query?.userId}`}
            
        )

        if(response.cards?.length){
           await  downloadImages(response.cards, response.imageDownload?.authorizationToken, response.imageDownload?.downloadUrl)            
        }
        if(response.user){
            setName(response.user.name)
        }
        setLoading(false)
    }

    useEffect(() => {
       if(router?.query?.userId){

        handleFetchCard()
       }
    },[router.query])

    return (
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} my={200}>
          {loading && <Loader/>}
            {!loading && !!cards.length && 
            <Stack ml={64} mt={16}>
                <Title align="center">{name} Cards</Title>
                <SimpleGrid mt={32} cols={5}>
                    {cards.map(card => {
                        return <Image key={card.id} style={{cursor: 'pointer'}} onClick={() => router.push(`/card/${card.id}`)} src={card.displayImage}></Image>
                    })}
                </SimpleGrid>
            </Stack>}
            {!loading && !cards.length && <Stack>
                <Image  src="/images/no_cards.png"></Image>                
            </Stack>}
        </Container>
    )
}



export default PublicProfileCards;