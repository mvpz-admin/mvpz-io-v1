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

// export async function getServerSideProps(context: GetServerSidePropsContext){
//     const session = await getSession(context)
//     if(session.user.role != 'Admin'){
//         return {
//             redirect: {
//               destination: '/',
//               permanent: false,
//             },
//           }
//     }
//     const card = await prisma.nFTEntity.findUnique({
//         where: {id: `${context.params.id}`},
//         select:{ 
//             id: true,
//             title                  :  true,
//             description            :  true,
//             type                   :  true,
//             sport                  :  true,
//             rarity                 :  true,
//             position               :  true,
//             sex                    :  true,
//             special                :  true,
//             school                 :  true,
//             design                 :  true,
//             designer               :  true,
//             edition                :  true,
//             serialNumberStart           :  true,
//             medal                  :  true,
//             year                   :  true,
//             mintQuantity           :  true,
//             mintDatetime           :  true,
//             maxQuantity            :  true,
//             packQuantity           :  true,
//             separatelySoldQuantity :  true,
//             enhancementQuantity    :  true,
//             price                  :  true,
//             mintAthleteShare       :  true,
//             tradeAthleteShare      :  true,
//             mintArtistShare        :  true,
//             tradeArtistShare       :  true,
//             referrerShare          :  true,
//             affiliateShare         :  true,
//             cardImageDisplay       :  true,
//             cardImageNFT           :  true,
//             membershipTier         :  true,
//             athlete: {select: {id: true}},
//             project: {select: {id: true}},
//             currentOwner: {select: {id: true}}
//         }
//     })
//     return {
//         props: {card}
//     }
// }


// const EditCard = (props) => {
//     const {data: session, status} = useSession()
//     const router = useRouter()
    
//     useEffect(() => {        
//         if(status === 'unauthenticated' || session?.user?.role !== 'Admin'){
//             router.push('/')
//         }
//     },[])
    
//     return (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//             <CardForm card={props.card}/>
//         </Container>
//     )
// }



// export default EditCard;