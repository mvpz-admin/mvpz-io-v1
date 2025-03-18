// import { Container, Loader } from "@mantine/core";
// import { GetServerSidePropsContext } from "next";
// import { getSession, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import { useEffect } from "react";
// import AthleteForm from "../../../../components/AthleteForm";
// import AthleteList from "../../../../components/AthleteList";
// import Layout from "../../../Layout/Layout";
// import prisma from "../../../../lib/prisma";
// import { callAPI, downloadFile } from "../../../../lib/utils";

// const EditAthlete = (props) => {
//     const {data: session, status} = useSession()
//     const router = useRouter()
//     const {username} = router.query
//     const [loading, setLoading] = useState(false)
//     const [user, setUser] = useState(null)
    
//     async function downloadUserImages(_user, authToken, url){
//         if(_user.image){
//             if(_user.image.includes('http')){
//                 _user.profileImage = _user.image
//             }else{
//                 _user.profileImage = await downloadFile(`${url}/file/mvpz-user-private/${_user.image}`, authToken)
//             }
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
//                 const twitterUrl = _user.socialLinks?.find(s => s.socialBrand === 'twitter' || s.socialBrand === 'X')?.link || null
//                 const facebookUrl = _user.socialLinks?.find(s => s.socialBrand === 'facebook')?.link || null
//                 const instagramUrl = _user.socialLinks?.find(s => s.socialBrand === 'instagram')?.link || null
//                 const linkedinUrl = _user.socialLinks?.find(s => s.socialBrand === 'linkedin')?.link || null
//                 const tiktokUrl = _user.socialLinks?.find(s => s.socialBrand === 'tiktok')?.link || null
//                 setUser({..._user, twitterUrl, facebookUrl, instagramUrl, linkedinUrl, tiktokUrl})
//             }            
//         }
//     }

//     useEffect(() => {
//         fetchUser()
//     },[username])

    
//     useEffect(() => {
//         if(status === 'unauthenticated' || session?.user?.role !== 'Admin'){
//             router.push('/')
//         }
//     },[])

//     return (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//             {loading || !user ? <Loader/> : <AthleteForm user={user}></AthleteForm>}
//         </Container>
//     )
// }



// export default EditAthlete;