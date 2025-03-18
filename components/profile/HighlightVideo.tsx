import { Box, Button, Card, Group, Loader, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { createStyles } from "@mantine/styles";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../lib/utils";
import Feedback from "../../pages/profile/Feedback";

const useStyles = createStyles(theme => ({
    videoCard: {
        marginTop: theme.spacing.lg,
        backgroundColor: 'black !important',
        border: 'none',
        padding: '0 !important',
        marginLeft: 'auto',
        borderRadius:0
    },
    videoContainer: {
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', 
        borderLeft: `35px solid #8c52ff`,
        borderTop: `35px solid #8c52ff`,
        borderTopLeftRadius: theme.radius.md,
        borderBottomLeftRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
    },
    highlightText: {
      position: 'absolute',
      top: '-34px',
      left: '-28px',
      fontWeight: 'bold',
      fontSize: '20px',
      textAlign: 'left',
      width: 'calc(100% - 50px)',
      zIndex: 10, 
      background: 'transparent', 
      paddingTop: '5px', 
    },
    videoIframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      objectFit: 'cover',
    },
    
}))
export default function HighlightVideo({highlightVideoUrl, showFeedback=false, width='100%', isMyProfile=false}){

    const { classes } = useStyles();
    const largeScreen = useMediaQuery("(min-width: 60em)");
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')
    const [youtubeUrl, setYoutubeUrl] = useState('')
    
    const handleYoutubeSave = async () => {
        if(!youtubeUrl.includes('https://www.youtube.com')){
            notifications.show({message: 'Only valid youtube urls are supported.'})
            return
        }
        const url = youtubeUrl.replace('https://www.youtube.com/watch?v=','https://www.youtube.com/embed/')
        setLoading(true);
        const response = await callAPI({
            method: "POST",
            body: { highlightVideoUrl: url },
            endpoint: "/api/user/updateProfile",
        });
        setVideoUrl(url)
        setLoading(false);
        setEditMode(false);
    }

    useEffect(() => {
        setVideoUrl(highlightVideoUrl)
    },[highlightVideoUrl])

    const VideoPlayer = ({url=null}) => {
        
        return (
        <Box>
            <Card w={largeScreen ? width : '100%'} className={classes.videoCard}>
                <div className={classes.videoContainer}>
                    <Text color='black' className={classes.highlightText}>HIGHLIGHTS</Text>
                    <Group mt={-36} position="right">
                    {isMyProfile && !editMode && <Button onClick={() => setEditMode(true)}>Edit</Button>}
                    </Group>
                    <iframe
                        className={classes.videoIframe}
                        src={ url || "https://www.youtube.com/embed/DPDUDPCttfc"}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </Card>
            <Modal opened={editMode} onClose={() => setEditMode(false)}>
                <Modal.Header>
                    <Text>Set Youtube URL</Text>
                </Modal.Header>
                <Modal.Body>
                    <Stack>
                        <TextInput placeholder="Enter youtube url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)}/>
                        <Group position="right">
                            <Button variant="subtle" size={'xs'} onClick={()=>setEditMode(false)}>Cancel</Button>
                            {loading ? <Loader/> : <Button size='xs' onClick={handleYoutubeSave}>Save</Button>}
                        </Group>
                    </Stack>
                </Modal.Body>                
            </Modal>
        </Box>
        );
    };

    return(
        <Stack mt={32} style={{ backgroundColor: "none !important" ,width:'100%'}}>
            <VideoPlayer url={videoUrl}/>
            {showFeedback && <Feedback color="#8c52ff" />}
        </Stack>
    )
}