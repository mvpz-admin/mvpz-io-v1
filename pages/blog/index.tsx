import { Container, Grid, Group, Image, Paper, Popover, Stack, Text, useMantineTheme } from "@mantine/core";
import { createStyles } from "@mantine/styles";

const useStyles = createStyles(theme => ({
    grid:{
        [theme.fn.smallerThan('md')]:{
            width: 400
        },
        [theme.fn.largerThan('md')]:{
            width: 1200
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
            height: 80
        },
        [theme.fn.largerThan('sm')]:{
            height: 120
        }
    },
    textGroup:{
        [theme.fn.smallerThan('sm')]:{
            marginTop: 16,
            fontSize: 16
        },
        [theme.fn.largerThan('sm')]:{
            marginTop: 48,
            fontSize: 32
        }
    },
    text:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: '10px !important'
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: '18px !important'
        }
    },
}))

export default function Blogs(){
    const theme = useMantineTheme()
    const {classes} = useStyles()

    return (
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} >
            <Grid className={classes.grid} align={"center"}>
                <Grid.Col span={7}>
                    <Paper style={{alignContent: 'center'}} className={classes.store} bg={theme.colors.mvpz[9]}>
                        <Text className={classes.textStore} ff="MonumentExtended-Ultrabold" style={{letterSpacing: '.4rem'}} fw={400} color={'black'} align="right">BLOG</Text>
                    </Paper>
                </Grid.Col>
            </Grid>
            <Stack className={classes.textGroup}>
                <Text className={classes.text} align="center">For those who want a more in-depth dive</Text>
                <Text className={classes.text} align="center">Insights and reflections from athletes to founders</Text>
            </Stack>
            <Stack my={32} spacing={32}>
                <a href="https://mvpz.my.canva.site/blog-edriss" target="_blank"><Image src="/images/blog1.png"></Image></a>
                <a href="https://mvpz.my.canva.site/mvpz-blog-calum" target="_blank"><Image src="/images/blog2.png"></Image></a>
            </Stack>
        </Container>
    )
}