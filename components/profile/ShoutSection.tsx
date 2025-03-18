import { Box, Button, Card, Group, Loader, Text, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createStyles } from "@mantine/styles";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../lib/utils";
import Feedback from "../../pages/profile/Feedback";

const useStyles = createStyles(theme => ({
    cardHighLightText: {
        background: "none",
        fontSize: "20px",
        color: "black",
        fontWeight: 600,
        alignItems: "end",
        display: "flex",
    },
    headingsSection:{
        width: '100%', 
        padding: "10px",
        borderTopLeftRadius: theme.radius.md,
        borderBottomLeftRadius: theme.radius.md,
    },
    blogCard: {
        backgroundColor: 'transparent !important',
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.md,
        border: "none",
        padding: theme.spacing.md,
        position: "relative",
        color: theme.colors.gray[0],
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },
    content: {
        fontSize: "16px",
        lineHeight: "normal",
        display: "flex",
        justifyContent: "center",  
        alignItems: "center",     
        height: "100%",            
        textAlign: "center",
        marginBottom:'20px',
        fontFamily: 'Inter'
    },
}))
export default function ShoutSection({field, value, margin, showFeedback=false, isMyProfile=false}){
    const {classes} = useStyles()
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [textValue, setTextValue] = useState('')

    const handleSave = async () => {
        setLoading(true);
        const response = await callAPI({
            method: "POST",
            body: { [field]: textValue },
            endpoint: "/api/user/updateProfile",
        });
        setLoading(false);
        setEditMode(false);
    }

    const handleTextChange = (value) => {
        if(textValue?.length > 300){
            notifications.clean()
            notifications.show({message: `Cannot exceed 300 characters`, autoClose: 1000})
            setTextValue(value.substring(0, value.length - 1))
            return
        }
        setTextValue(value)
    }

    useEffect(() => {
        setTextValue(value)
    },[value])

    return(
        <Group
            position="right"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap:0
            }}
        >
            <Group
              mt={margin || 32}
              position="apart"
              bg="#8c52ff"
              className={classes.headingsSection}
            >
              <Box className={classes.cardHighLightText}>SHOUT</Box>
              {isMyProfile && !editMode && <Button onClick={() => setEditMode(true)}>Edit</Button>}
              {isMyProfile && editMode && <Group>
                    <Button onClick={() => {setTextValue(value); setEditMode(false)}} variant={'light'}>Cancel</Button>
                    {loading ? <Loader/> : <Button onClick={() => handleSave()}>Save</Button>}
                </Group>}
            </Group>
            <Box
              sx={(theme) => ({
                borderRadius: theme.radius.md,
              })}
              style={{ width: "100%" }}
            >
                <Card className={classes.blogCard} >
                    {editMode ? <Textarea autosize value={textValue} onChange={(e) => handleTextChange(e.target.value)}/>
                    : <Text className={classes.content} size={'xs'} color={'white'}>
                    {textValue}
                    </Text>}
                </Card>
                {showFeedback && <Feedback color={"#8c52ff"} />}
            </Box>
        </Group>
    )
}