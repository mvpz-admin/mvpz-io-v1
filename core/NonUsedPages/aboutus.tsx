import { useSession } from "next-auth/react"
import React from "react"
import Layout from "../Layout/Layout"
import { Box, Container, createStyles, Group, List, Stack, Text, Title } from "@mantine/core"
import Image from "next/image"

const useStyles = createStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontSize: '52px'
    },
    name:{
        fontSize: '36px'
    }
}))
const Aboutus: React.FC = () => {
    const {classes} = useStyles()
    
    return (
        <Container style={{maxWidth: '1200px'}} mb={64}>
            <Title order={1} className={classes.title}>Team</Title>
            <Group position="center">
                <Image alt="" width={1200} height={1800} src={'/images/aboutus.png'}></Image>
            </Group>
            {/* <Stack mt={64} spacing={64}>
                <MemberCard
                    nameTitle={'Head Coach - Calum Russell'}
                    description={'Calum brings the vision. His professional back ground in the sports industry combined with an early fascination with blockchain technology lead to the creation of the concept. He assumes the role of CEO. '}
                    image={'/images/team1.png'}
                ></MemberCard>
                <MemberCard
                    nameTitle={'Offensive Coordinator - Vamsi Nagavarapu'}
                    description={'Vamsi brings the technical mind. His track record as a technical leader and experienced start-up founder makes him the ideal person to deliver. A natural entrepreneur with a passion for sports, he is the teams CTO. '}
                    image={'/images/team2.png'}
                ></MemberCard>
                <MemberCard
                    nameTitle={'Head shout - Evan Rodenberg'}
                    description={'Evan brings the strategic wisdom. After a successful career in business development he moved into the Web3 start-up space to work on innovative projects with a good cause. He is Head of Athletic Relations.'}
                    image={'/images/team3.png'}
                ></MemberCard>                        
            </Stack>*/}
            <Title align="center">Advisory Board</Title>
            <Stack align={'center'}>
                <Text mt={32}>Our advisors bring expertise in the following sectors.</Text>
                <List mt={16}>
                    <List.Item>NIL + Gaming Law</List.Item>
                    <List.Item>Blockchain Development</List.Item>
                    <List.Item>NCAA Football</List.Item>
                    <List.Item>Sports Data Science</List.Item>
                    <List.Item>Sports Cards</List.Item>
                </List>
            </Stack> 
        </Container>
  )
}

const MemberCard = ({nameTitle, description, image}) => {
    const {classes} = useStyles()
    return (
    <Group align={'start'}>
        <Image alt="" src={image} width={196} height={196}></Image>
        <Stack justify='flex-start'>
            <Text className={classes.name}>{nameTitle}</Text>
            <Text fz="xl" w={800}>
            {description}
            </Text>
        </Stack>
    </Group>
    )
}

export default Aboutus
