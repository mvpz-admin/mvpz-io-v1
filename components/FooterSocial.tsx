import { Container, Group, ActionIcon, rem, Text, Footer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles } from '@mantine/styles';
import { IconBrandDiscord, IconBrandInstagram, IconBrandLinkedin, IconBrandMedium, IconBrandX, IconBrandYoutube, IconMail } from "@tabler/icons-react";
const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 64,
        backgroundColor: 'black !important',
        [theme.fn.largerThan('md')]: {
            minWidth: 1100 ,
        },
        marginBottom: '8px !important'
    },
    inner:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column'
        }        
    }
}))

export function FooterSocial() {
    const {classes} = useStyles()
    const largeScreen = useMediaQuery("(min-width: 60em)")
    return (
        <Footer height={45} className={classes.footer}>
            <Container mt={16} className={classes.inner}>
                {/* <Group spacing={'xl'} position="apart" mt={32} mb={32}> */}
                    <Text c="dimmed" size={largeScreen ? 'sm' : 'xs'}>
                    © 2025 Arenaz LLC. All rights reserved.
                    </Text> 
                    <Group position="right">
                        <ActionIcon component='a' href={'https://www.instagram.com/mvpz_sport?igsh=b2N1bjBpMHQxdDdk'} target='_blank' size={largeScreen ? 'lg' : 'sm'} color="gray" variant="subtle"><IconBrandInstagram size={32}/></ActionIcon>
                        <ActionIcon component='a' href={'https://twitter.com/mvpz_sport'} target='_blank' size={largeScreen ? 'lg' : 'sm'} color="gray" variant="subtle"><IconBrandX/></ActionIcon>
                        <ActionIcon component='a' href={'https://medium.com/@_MVPz'} target='_blank' size={largeScreen ? 'lg' : 'sm'} color="gray" variant="subtle"><IconBrandMedium size={32}/></ActionIcon>
                        <ActionIcon component='a' href={'https://www.linkedin.com/company/89859823'} target='_blank' size={largeScreen ? 'lg' : 'sm'} color="gray" variant="subtle"><IconBrandLinkedin size={32}/></ActionIcon>
                        <ActionIcon component='a' href={'https://www.youtube.com/channel/UCxh_9u-MXEQfQ41_etQpQQQ'} target='_blank' size={largeScreen ? 'lg' : 'sm'} color="gray" variant="subtle"><IconBrandYoutube size={32}/></ActionIcon>
                        <ActionIcon component='a' href={'https://discord.com/invite/BeknQdEsbx'} target='_blank' size={largeScreen ? 'lg' : 'sm'} color="gray" variant="subtle"><IconBrandDiscord size={32}/></ActionIcon>
                        <ActionIcon component='a' href={'mailTo:team@mvpz.io'}><IconMail size={32}/> </ActionIcon>
                    </Group>
                {/* </Group> */}
            </Container>
        </Footer>
    );
}