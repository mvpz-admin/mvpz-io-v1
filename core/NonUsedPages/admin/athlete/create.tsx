// import { Container, Loader } from "@mantine/core";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import AthleteForm from "../../../../components/AthleteForm";

// const CreateAthlete = (props) => {
//     const {data: session, status} = useSession()
//     const router = useRouter()

//     useEffect(() => {
//         if(status === 'unauthenticated' || session?.user?.role !== 'Admin'){
//             router.push('/')
//         }
//     })

//     return (
//         !session ? <Loader/> :
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//             <AthleteForm isAdmin={session?.user?.role === 'Admin'}/>
//         </Container>
//     )
// }

// export default CreateAthlete;