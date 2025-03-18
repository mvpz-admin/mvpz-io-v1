import { Box, Button, Group, HoverCard, Loader, Stack, Table, Text, Title, Tooltip, useMantineTheme } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { createStyles } from "@mantine/styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../lib/utils";

const useStyles = createStyles((theme) => ({
    tableRow: {
        [theme.fn.largerThan('xs')]:{
            width: 300
        },
        [theme.fn.smallerThan('xs')]:{
            width: 100
        }
    },
    table: {
        [theme.fn.largerThan('xs')]:{
            width: 'full'
        },
        [theme.fn.smallerThan('xs')]:{
            width: 300
        }
    },
    headRow: {
        textAlign: "center",
        border: 'black 6px solid !important', 
        color: '#854df2 !important',
        fontSize: '28px !important',
        fontFamily: 'SpriteGraffiti-Regular'
    },
    bodyRow: {
        border: 'black 6px solid !important', 
        fontSize: '16px',
        fontFamily: 'MonumentExtended-Regular',
        textAlign: 'center'
    }
}))

export default function LeaderBoard(){
    const {status} = useSession()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const {classes} = useStyles()
    const theme = useMantineTheme()
    const clipboard = useClipboard({timeout: 2000})
    const router = useRouter()

    const fetchUsersLeaderBoard = async () =>{
        setLoading(true)
        const result = await callAPI({endpoint: '/api/card/leaderboard'})
        if(result.users){
            setUsers(result.users)
        }
        setLoading(false)
    }

    const claimWallet = async () => {
        if(status === 'authenticated'){
            router.push('profile/wallet')
        }else{
            localStorage.setItem('redirectUrl','/profile/wallet')
            router.push("/api/auth/signin")
        }
    }

    useEffect(() => {
        fetchUsersLeaderBoard()
    },[])

    return (
       <div className="min-h-screen py-20 px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px]">
        {
             loading ? <div className="flex justify-center items-center"><Loader/> </div>: 
             <Stack mb={32} spacing={0} className={classes.table}>
                 <h1 style={{ marginTop: 0, marginBottom: 0,  textAlign: 'center', fontFamily: 'MonumentExtended-Ultrabold', fontSize: '3em', fill: 'none'}}>LEADERBOARD</h1>
                 <Title style={{fontFamily: 'MonumentExtended-Regular', fontSize: 28}} order={3} align="center">HALL <span style={{color:'#854df2', fontSize:40, fontFamily:'SpriteGraffiti-Regular'}}>OF</span> FAME</Title>
                 {/* <Group mb={8} position="right"><Tooltip label="MVPz AI coming Soon"><Button>Ask MVPz</Button></Tooltip></Group> */}
                 <Group mb={8} position="right"><Button onClick={claimWallet}>Claim Wallet</Button></Group>
                 <Table striped highlightOnHover >
                     <thead>
                         <tr style={{border: 'black 4px solid', backgroundColor: theme.colors.gray[9]}}>
                             <th className={classes.headRow}>RANK</th>
                             <th className={classes.headRow}>NAME</th>
                             <th className={classes.headRow}>XP</th>
                             <th className={classes.headRow}>CARDS</th>
                             <th className={classes.headRow}>WALLET</th>
                         </tr>
                     </thead>
                     <tbody>
                         {users.map((user, index) => {
                             return (
                             <tr style={{border: 'black 4px solid', backgroundColor: theme.colors.gray[9]}} key={user.address}>
                                 <td className={classes.bodyRow}>{index+1}</td>
                                 <td className={classes.bodyRow}><Text style={{fontFamily: 'MonumentExtended-Regular'}} tt={"uppercase"}>{user.name}</Text></td>
                                 <td className={classes.bodyRow}>{user.xpScore}</td>
                                 <td className={classes.bodyRow}>{user.cardCount}</td>
                                 <td className={classes.bodyRow}>
                                     <Box className={classes.tableRow}>
                                         <HoverCard width={310} shadow={'md'}>
                                             <HoverCard.Target>
                                                 <Text style={{fontFamily: 'MonumentExtended-Regular'}} truncate>{user.address}</Text>
                                             </HoverCard.Target>
                                             <HoverCard.Dropdown>
                                                 <Group position="right">
                                                     <Button size={'xs'} onClick={() => clipboard.copy(user.address)}>{clipboard.copied?'Copied':'Copy'}</Button>
                                                 </Group>
                                                 <Text mt={8} style={{wordBreak: 'break-all'}} size={'sm'}>{user.address}</Text>
                                             </HoverCard.Dropdown>
                                         </HoverCard>
                                     </Box>
                                 </td>
                             </tr>
                             )
                         })}
                     </tbody>
                 </Table>
             </Stack>
        }
       </div>
    )
}