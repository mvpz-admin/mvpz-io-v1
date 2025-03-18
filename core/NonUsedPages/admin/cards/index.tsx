// import { Button, Container, createStyles, Group, Loader, rem, Select, Tabs } from "@mantine/core";
// import { IconArrowLeft } from "@tabler/icons-react";
// import { getSession, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import CardList from "../../../../components/CardList";
// import Layout from "../../../Layout/Layout";
// import prisma from "../../../../lib/prisma";
// import { callAPI, downloadFile } from "../../../../lib/utils";

// const useStyles = createStyles((theme) => ({
//     wrapper: {
//         position: 'relative',
//         boxSizing: 'border-box',
//         paddingLeft: 0,
//         paddingRight: 0
//     },
//     backButton:{
//         flexDirection:'column',
//         textAlign: 'start',
//         cursor: 'pointer',
//         padding:  `${rem(2)} ${rem(2)}`
//     },
//     label: {
//         fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//         fontWeight: 700,
//         lineHeight: 1
//     },
//     avatar: {
//         height: 120,
//         width: 120,
//         zIndex: 9,
//         marginTop: -144,
//         marginLeft: 16,
//         marginRight: 16,
//         border: `${rem(2)} solid ${theme.colors.gray[8]}`,
//         borderRadius: 64
//     },
//     editButton: {
//         border: 'transparent',
//     },
//     card: {
//         background: theme.colors.gray[8]
//     }
// }))

// const Cards = (props) => {
//     const {classes} = useStyles()
//     const [cards, setCards] = useState([])
//     const router = useRouter()
//     const {data: session, status} = useSession()
//     const [loading, setLoading] = useState(false)
//     const [activeTab, setActiveTab] = useState('Athlete')
//     const [project, setProject] = useState('first')
//     const [imageDownload, setImageDownload] = useState({} as any)

//     const uploadCards = () => {
//         const options = {
//             method: 'POST'
//         }
//         fetch('/api/card/addPurchaseCardsFromMint', options)
//         .then(res => res.json().then(resJSON => console.log(resJSON)))
//         .catch(err => console.log(err))
//     }

//     const uploadProducts = () => {
//         callAPI({endpoint: '/api/product/pushData', method:"POST"})
//     }

//     const verifyCards = () => {
//         const options = {
//             method: 'POST'
//         }
//         fetch('/api/cron/verifyWallets', options)
//         .then(res => res.json().then(resJSON => console.log(resJSON)))
//         .catch(err => console.log(err))
//     }

//     async function fetchCards(){
//         setLoading(true)
//         const result = await callAPI({endpoint: `/api/card/getAllAdmin?project=${project}&type=${activeTab}`, method: 'GET'})
//         setLoading(false)
//         setCards(result?.cards || [])
//         setImageDownload(result.imageDownload)
//     }

//     useEffect(()=>{
//         fetchCards()
//     },[activeTab, project])

//     useEffect(() => {
//         if(session?.user?.role !== 'Admin'){
//             router.push('/')
//         }
//         fetchCards()
//     },[])

//     return (
//         <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
//             {loading ? <Loader/> : 
//             <Container fluid className={classes.wrapper}>
//             <Group mb={16} position={'apart'}>
//                 <IconArrowLeft onClick={() => router.back()} className={classes.backButton}/>
//                 {/* <Button onClick={() => router.push('/admin/card/create')}>Add Card</Button> */}
//                 {/* <Button onClick={uploadCards}>Upload Cards</Button> */}
//                 {/* <Button onClick={uploadProducts}>Upload Products</Button> */}
                
//                 <Group>
//                     <Button onClick={verifyCards}>Verify Cards</Button>
//                     <Select value={project} onChange={setProject} data={[{label: 'First', value: 'first'},{label: 'Second', value: 'second'}]} defaultValue="first"/>
//                 </Group>
//             </Group>
//             <Tabs p={16} value={activeTab} onTabChange={setActiveTab}>
//                 <Tabs.List grow>
//                     <Tabs.Tab value="Athlete">Athletes</Tabs.Tab>
//                     <Tabs.Tab value="Activity">Activity</Tabs.Tab>
//                     <Tabs.Tab value="Team">Team</Tabs.Tab>
//                     <Tabs.Tab value="Championship">Championship</Tabs.Tab>
//                 </Tabs.List>
//                 <Tabs.Panel value="Athlete" pt={'sm'}>
//                     {activeTab === 'Athlete' && <CardList cards={cards.filter(c => c.type === 'Athlete')} imageDownload={imageDownload}></CardList>}
//                 </Tabs.Panel>
//                 <Tabs.Panel value="Activity" pt={'sm'}>
//                     {activeTab === 'Activity' && <CardList cards={cards.filter(c => c.type === 'Activity')} imageDownload={imageDownload}></CardList> }
//                 </Tabs.Panel>
//                 <Tabs.Panel value="Team" pt={'sm'}>
//                     {activeTab === 'Team' && <CardList cards={cards.filter(c => c.type === 'Team')} imageDownload={imageDownload}></CardList> }
//                 </Tabs.Panel>
//                 <Tabs.Panel value="Championship" pt={'sm'}>
//                     {activeTab === 'Championship' && <CardList cards={cards.filter(c => c.type === 'Championship')} imageDownload={imageDownload}></CardList> }
//                 </Tabs.Panel>
//             </Tabs>            
//         </Container>}
//         </Container>
//     )
// }



// export default Cards;