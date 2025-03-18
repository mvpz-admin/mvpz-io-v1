import { Paper, Grid, Container, Text, useMantineTheme, Box, Stack, Group, Tabs, SimpleGrid, Image, Card, NumberInput, Button, Loader } from "@mantine/core";
import { createStyles } from "@mantine/styles";

const useStyles = createStyles(theme => ({
    boxText:{
        [theme.fn.smallerThan('sm')]:{
            display: 'none'
        },
        [theme.fn.largerThan('sm')]:{
            width: 800
        }
    },
    image:{
        [theme.fn.smallerThan('sm')]:{
            maxWidth: 240
        },
        [theme.fn.largerThan('sm')]:{
            maxWidth: 400
        }
    },
    grid:{
        [theme.fn.smallerThan('sm')]:{
            width: 200
        },
        [theme.fn.smallerThan('md')]:{
            width: 400
        },
        [theme.fn.largerThan('md')]:{
            width: 1200
        }
    },
    tabs:{
        [theme.fn.smallerThan('xs')]:{
            fontSize: '10px !important'
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: 16
        }
    },
    textStore:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: 32
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: "50px !important"
        }
    },
    store:{
        [theme.fn.smallerThan('sm')]:{
            hieght: 60
        },
        [theme.fn.largerThan('sm')]:{
            height: 120
        }
    },
    text1:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: 24
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: 48
        }
    },
    text2:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: 32
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: 72
        }
    },
    text3:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: 20
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: 36
        }
    },
    
}))
export default function Store (props){
    const {classes} = useStyles()
    const theme = useMantineTheme()
    return (
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} >
            <Grid className={classes.grid} align={"center"}>
                <Grid.Col span={5} sm={7}>
                    <Paper style={{alignContent: 'center'}} className={classes.store} bg={theme.colors.mvpz[9]}>
                        <Text className={classes.textStore} ff="MonumentExtended-Ultrabold" style={{letterSpacing: '.4rem'}} fw={400} color={'black'} align="right">STORE</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={7} sm={5}>
                    <Group position={'left'}>
                        <Text className={classes.text1} fw={600} color={theme.colors.mvpz[9]} align="left" ff='SpriteGraffiti-Regular' style={{transform:'rotate(-10deg)'}}>
                            <span  className={classes.text2} style={{fontFamily: "SpriteGraffiti-Regular", marginLeft: 4, color: theme.colors.mvpz[9], fontWeight: 700, letterSpacing: '.3rem'}}>1</span>
                        st 
                        </Text>
                        <span  className={classes.text3} style={{fontFamily: "MonumentExtended-Regular", marginLeft: 4, color: 'white', fontWeight: 700, letterSpacing: '.3rem'}}>EDITION</span>
                    </Group>
                </Grid.Col>
            </Grid>
            
            <Group position={'center'} mt={32} spacing={128}>
                <Image className={classes.image} src='/images/mvpz-store.png'></Image>
                <Text size={'lg'} ff={"MonumentExtended-Regular"}>OPENING JUNE 3RD 2024</Text>
            </Group>
        </Container>
    )
}