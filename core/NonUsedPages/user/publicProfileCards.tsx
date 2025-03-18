// import { Container, Image, Loader, SimpleGrid, Stack, Title } from "@mantine/core";
// import { getSession, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import CardList from "../../components/CardList";
// import Layout from "../../components/Layout";
// import { downloadFile } from "../../lib/utils";


// const PublicProfileCards = (props) => {
//     const [cards, setCards] = useState([])
//     const [loading, setLoading] = useState(false)
//     const router = useRouter()
//     const [name, setName] = useState('')
//     const {userId} = router.query
//     async function downloadImages(_cards, authToken, url){
//         for(let card of _cards){
//             if(card.nftEntity?.cardImageNFT){
//                 card.displayImage = await downloadFile(`${url}/file/mvpz-nfts-optimized/${card.nftEntity.cardImageNFT}`, authToken)
//             }
//         }
//         setCards(_cards)
//     }

//     useEffect(() => {
//         fetch(`/api/user/publicProfileCards?userId=${userId}`)
//         .then(response => response.json())
//         .then(async result => {
//             if(result.cards?.length){
//                 downloadImages(result.cards, result.imageDownload?.authorizationToken, result.imageDownload?.downloadUrl)            
//             }
//             if(result.user){
//                 setName(result.user.name)
//             }
//         }).catch(err => console.log(err))
//     },[userId])

//     return (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//           {!!loading && <Loader/>}
//             {!loading && !!cards.length && 
//             <Stack ml={64} mt={16}>
//                 <Title align="center">{name} Cards</Title>
//                 <SimpleGrid mt={32} cols={5}>
//                     {cards.map(card => {
//                         return <Image key={card.id} style={{cursor: 'pointer'}} onClick={() => router.push(`/card/${card.id}`)} src={card.displayImage}></Image>
//                     })}
//                 </SimpleGrid>
//             </Stack>}
//             {!loading && !cards.length && <Stack>
//                 <Image  src="/images/no_cards.png"></Image>                
//             </Stack>}
//         </Container>
//     )
// }



// export default PublicProfileCards;