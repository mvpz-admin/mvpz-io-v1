import { Box, Group, Popover, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles } from "@mantine/styles";
import { IconCoin, IconMessageCircle, IconThumbDown, IconThumbUp, IconTransformFilled } from "@tabler/icons-react";

const useStyles = createStyles(theme => ({
    iconGroup: {
        marginTop: theme.spacing.md,
    }
}))
export default function Feedback({color}){
    const IconColor = color ?? "white";
    const {classes} = useStyles()
    const largeScreen = useMediaQuery("(min-width: 60em)");

    return(
        <Group
        className={classes.iconGroup}
        position="center"
        spacing={largeScreen ? 96 : 'xl'}
        mt={40}
        >
            <Popover>
                <Popover.Target>
                <IconThumbUp style={{ cursor: "pointer" }} color={IconColor} />
                </Popover.Target>
                <Popover.Dropdown>
                <Text>Coming soon!</Text>
                </Popover.Dropdown>
            </Popover>
            <Popover>
                <Popover.Target>
                <IconThumbDown style={{ cursor: "pointer" }} color={IconColor} />
                </Popover.Target>
                <Popover.Dropdown>
                <Text>Coming soon!</Text>
                </Popover.Dropdown>
            </Popover>
            <Popover>
                <Popover.Target>
                <IconMessageCircle
                    style={{ cursor: "pointer" }}
                    color={IconColor}
                />
                </Popover.Target>
                <Popover.Dropdown>
                <Text>Coming soon!</Text>
                </Popover.Dropdown>
            </Popover>
            <Popover>
                <Popover.Target>
                <IconTransformFilled
                    style={{ cursor: "pointer", color: IconColor }}
                    color={IconColor}
                />
                </Popover.Target>
                <Popover.Dropdown>
                <Text>Coming soon!</Text>
                </Popover.Dropdown>
            </Popover>
            <Popover>
                <Popover.Target>
                <IconCoin style={{ cursor: "pointer" }} color={IconColor} />
                </Popover.Target>
                <Popover.Dropdown>
                <Text>Coming soon!</Text>
                </Popover.Dropdown>
            </Popover>
        </Group>
    )
}