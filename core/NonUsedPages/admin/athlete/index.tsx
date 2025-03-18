// import { Container, Loader } from "@mantine/core";
// import { getSession, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useState } from "react";
// import AthleteList from "../../../../components/AthleteList";
// import Layout from "../../../Layout/Layout";
// import prisma from "../../../../lib/prisma";
// import { callAPI, downloadFile } from "../../../../lib/utils";

// const Athletes = (props) => {
//     const {status, data: session} = useSession()
//     const [athletes, setAthletes] = useState([])
//     const [loading, setLoading] = useState(false)
//     const router = useRouter()

//     async function downloadImages(_athletes, authToken, url){
//         for(let _user of _athletes){
//             if(_user.image){
//                 if(_user.image.includes('http')){
//                     _user.profileImage = _user.image
//                 }else{
//                     _user.profileImage = await downloadFile(`${url}/file/mvpz-user-private/${_user.image}`, authToken)
//                 }
//             }
//         }
//         return _athletes
//     }

//     const fetchAthletes = async() => {
//         setLoading(true)
//         const result = await callAPI({endpoint:'/api/admin/athletes'})
//         setLoading(false)
//         setAthletes(result.athletes)
//         // if(result.athletes){
//         //     const _athletes = await downloadImages(result.athletes, result.imageDownload?.authorizationToken, result.imageDownload?.downloadUrl)
//         //     setAthletes(_athletes)
//         // }
//     }

//     useEffect(()=>{
//         if(session?.user?.role !== 'Admin'){
//             router.push('/')
//         }
//         fetchAthletes()
//     },[session])

//     return (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//             {loading? <Loader/> : <AthleteList athletes={athletes}></AthleteList>}
//         </Container>
//     )
// }



// export default Athletes;