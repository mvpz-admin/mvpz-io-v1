// import { Button, Container, Group, Loader } from "@mantine/core";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useEffect } from "react";
// // import AthleteProfile from "../../components/profile/AthleteProfile";
// // import { callAPI, downloadFile } from "../../lib/utils";

// const Athlete = (props) => {
//     const router = useRouter()
//     const {data: session, status} = useSession()
//     const {username} = router.query
//     const [loading, setLoading] = useState(false)
//     const [user, setUser] = useState(null)
//     const [cards, setCards] = useState([])
//     const [product, setProduct] = useState(null)
    
//     async function downloadCardImages(_cards, authToken, url){
//         for(let card of _cards){
//             if(card.nftEntity?.cardImageNFT){
//                 card.displayImage = await downloadFile(`${url}/file/mvpz-nfts-optimized/${card.nftEntity.cardImageNFT}`, authToken)
//             }
//         }
//         setCards(_cards)
//     }

//     async function downloadUserImages(_user, authToken, url){
//         if(_user.image){
//             _user.profileImage = await downloadFile(`${url}/file/mvpz-user-private/${_user.image}`, authToken)
//         }
//         if(_user.bannerImage){
//             _user.bannerDisplayImage = await downloadFile(`${url}/file/mvpz-user-private/${_user.bannerImage}`, authToken)
//         }
//         if(_user.cardImage){
//             _user.cardDisplayImage = await downloadFile(`${url}/file/mvpz-user-private/${_user.cardImage}`, authToken)
//         }else if(_user.athleteCard?.cardImageNFT){
//             _user.cardDisplayImage = await downloadFile(`${url}/file/mvpz-nfts-optimized/${_user.athleteCard.cardImageNFT}`, authToken)
//         }
//         return _user
//     }

//     const fetchUser = async() => {
//         if(username){
//             setLoading(true)
//             const result = await callAPI({method:'GET',endpoint:`/api/user/getUser?username=${username}`})
//             setLoading(false)
//             if(result.user){
//                 const _user = await downloadUserImages(result.user, result.imageDownload?.authorizationToken, result.imageDownload?.downloadUrl)
//                 setUser(_user)
//             }            
//             if(result.user?.cards?.length){
//                 downloadCardImages(result.user.cards, result.imageDownload?.authorizationToken, result.imageDownload?.downloadUrl)
//             }
//         }
//     }

//     const gotoCheckout = async() => {
//         if(status === 'unauthenticated'){
//             router.push('/auth/signin')
//         }
//         setLoading(true)
//         const result = await callAPI({endpoint: `/api/purchase/initiate`, method:'POST', body:{priceId: product.stripePriceId, cardType:'digital', packType:'athlete', athleteId: user.id}})
//         setLoading(false)
//         if(result?.checkoutUrl){
//             router.push(result.checkoutUrl)
//         }
//     }

//     const fetchProducts = async () => {
//         setLoading(true)
//         const res = await callAPI({endpoint: '/api/product/getActive?type=athlete'})
//         setLoading(false)
//         if(res.length){
//             setProduct(res[0])
//         }
//     }

//     useEffect(() => {
//         fetchUser()
//         if(!product){
//             fetchProducts()
//         }
//     },[username])

//     return (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//             {session?.user?.role === 'Admin' && <Group position="right">
//                 <Button onClick={() => router.push(`/admin/athlete/${username}`)}>Edit Athlete</Button>
//             </Group>}
//             {loading || !user ? <Loader/> : <AthleteProfile gotoCheckout={gotoCheckout} user={{...user, cost: product.cost}} cards={cards}></AthleteProfile>}
//         </Container>
//     )
// }



// export default Athlete;