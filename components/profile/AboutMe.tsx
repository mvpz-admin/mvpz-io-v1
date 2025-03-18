import { Button, Group, Loader, Spoiler, Text, Textarea, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createStyles } from "@mantine/styles";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../lib/utils";

const useStyles = createStyles(theme => ({
    aboutme: {
        textWrap: 'wrap',
        fontFamily: "Inter",
        fontSize: 14,
        color: theme.colors.gray[5],
        textAlign: "justify"
    }
}))

export default function AboutMe ({aboutme, name, isMyProfile=false}){
    const [aboutMe, setAboutMe] = useState("They're either mysterious or lazy... in the meantime, make sure your bio is up to date!")
    const [loading, setLoading] = useState(false)
    const [editMe, setEditMe] = useState(false);
    const theme = useMantineTheme()
    const {classes} = useStyles()
    const saveAboutMe = async (aboutMe: string) => {
        setLoading(true);
        const response = await callAPI({
        method: "POST",
        body: { aboutMe },
        endpoint: "/api/user/updateProfile",
        });
        setLoading(false);
        setEditMe(false);
    };

    const handleTextChange = (value) => {
        notifications.clean()
        if(aboutMe?.length > 300){
            notifications.show({message: 'Aboutme cannot exceed 300 characters', autoClose: 1000})
            setAboutMe(value.substring(0, value.length - 1))
            return
        }
        setAboutMe(value)
    }

    useEffect(()=>{
        setAboutMe(aboutme)
    },[aboutme])
    return (
        <>
            <Group position="apart" mt={32}>
                <Text size={"xl"} fw={700} color={"white"}>
                    About {name}
                </Text>
                {!editMe && isMyProfile && <Button variant={"subtle"} onClick={() => setEditMe(true)}>Edit</Button>}
                {!!editMe && <Group>
                    <Button variant={"subtle"} onClick={() => setEditMe(false)}>Cancel</Button>
                    {loading ? <Loader/> : <Button variant={"subtle"} onClick={() => saveAboutMe(aboutMe)}>Save</Button>}
                </Group>}
            </Group>
            {!!editMe ? 
            <Textarea autosize value={aboutMe} onChange={(e) => handleTextChange(e.target.value)}/>  : 
            <Spoiler
                maxHeight={300}
                showLabel="Show more"
                hideLabel="Hide"
            >
                <pre className={classes.aboutme}>{aboutMe}</pre>
            </Spoiler>}
        </>
    )
}