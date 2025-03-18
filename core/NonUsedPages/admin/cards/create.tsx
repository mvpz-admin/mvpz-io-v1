// import { Container } from "@mantine/core";
// import { GetServerSidePropsContext } from "next";
// import { getSession, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import AthleteList from "../../../../components/AthleteList";
// import CardForm from "../../../../components/CardForm";
// import Layout from "../../../Layout/Layout";
// import ProfileForm from "../../../../components/ProfileForm";
// import prisma from "../../../../lib/prisma";

// const CreateCard = (props) => {
//     const {data: session, status} = useSession()
//     const router = useRouter()
    
//     useEffect(() => {        
//         if(status === 'unauthenticated' || session?.user?.role !== 'Admin'){
//             router.push('/')
//         }
//     },[])
    
//     return (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//             <CardForm/>
//         </Container>
//     )
// }



// export default CreateCard;