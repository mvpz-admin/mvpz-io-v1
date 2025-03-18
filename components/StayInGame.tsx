import { Box, Group, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube, IconMail } from "@tabler/icons-react"

export const StayInGame = () => {
    const largeScreen = useMediaQuery("(min-width: 60em)");

    return (
        <Group position="apart">
          <Box
            style={{ display: "flex", flexDirection: "column" }}
            // className={classes.displayOnBrowser}
          >
            <Text size={12}>Property of Arenaz LLC</Text>
            <Text size={12}>Operating as MVPz</Text>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Text size={largeScreen ? 20 : 10}>Stay In the Game</Text>
            <Group
              spacing={largeScreen ? "xl" : 32}
              position="left"
              style={{ marginTop: "10px" }}
            >
              {/* add proper routes here */}
              <a href={'https://www.instagram.com/mvpz_sport?igsh=b2N1bjBpMHQxdDdk'} target="_blank">
                <IconBrandInstagram />
              </a>
              <a href={'https://www.youtube.com/channel/UCxh_9u-MXEQfQ41_etQpQQQ'} target="_blank">
                <IconBrandYoutube />
              </a>
              <a href={'mailTo:team@mvpz.io'} target="_blank">
                <IconMail />
              </a>
              <a href={'https://www.linkedin.com/company/89859823'} target="_blank">
                <IconBrandLinkedin />
              </a>
            </Group>
          </Box>
          {/* <Box
            style={{ display: "flex", flexDirection: "column", margin: "auto" }}
            mb={20}
            // className={classes.displayOnMobile}
          >
            <Text size={8}>Property of Arenaz LLC</Text>
            <Text size={8} align="center">
              Operating as MVPz
            </Text>
          </Box> */}
        </Group>
    )
}