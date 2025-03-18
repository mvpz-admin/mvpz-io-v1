import { Autocomplete, Button, FileInput, Group, Image, Loader, NumberInput, Select, SimpleGrid, Stack, Stepper, Textarea, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { DateTimePicker } from "@mantine/dates";
import { useRouter } from "next/router";

export default function CardForm(props){
    const router = useRouter()
    const [card, setCard] = useState(props.card ? props.card : {
        title: '', 
        description: '', 
        rarity: '', 
        position: '', 
        edition: '', 
        serialNumberStart: '', 
        mintCount: 0, 
        price: 0, 
        athlete: null, 
        projectId: null, 
        type: 'Athlete'
    })
    const [athletes, setAthletes] = useState([])
    const [projects, setProjects] = useState([])
    const [displayImage, setDisplayImage] = useState(null)
    const [nftImage, setNftImage] = useState(null)
    // const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const submitCard = async() => {
        let cardBody = card
        if(!!displayImage){
            const displayBlob = await upload(displayImage.name, displayImage, {
                access: 'public',
                handleUploadUrl: '/api/image/upload',
            });
            cardBody.cardImageDisplay = displayBlob.url
        }
        if(!!nftImage){
            const nftBlob = await upload(nftImage.name, nftImage, {
                access: 'public',
                handleUploadUrl: '/api/image/upload',
            });
            cardBody.cardImageNFT = nftBlob.url
        }
        if(!cardBody.projectId && cardBody.project){
            cardBody.projectId = cardBody.project.id
        }
        const options ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardBody),
        }
        fetch('/api/card/update', options)
        .then(res => res.json()
        .then(resJSON => {
            console.log('SUCCESS')
            router.push('/admin/cards')
        })).catch(err => console.log(err))
    }

    useEffect(()=>{
        fetch('/api/user/athletes')
        .then(response => response.json()
        .then(res => {
            setAthletes(res)
        }))
        fetch('/api/project/list')
        .then(response => response.json()
        .then(res => {
            setProjects([...res, {name: 'Create New', id: 'NEW'}])
        }))
    },[])

    return (
        <Stack w={720} mb={64}>
            <Group position="apart">
                <Title mb={32}>{props.card ? "Edit Card" : "Create New Card"}</Title>
                <Button mb={64} mt={32} onClick={submitCard}>Submit</Button>
            </Group>
            <Select
                label="Select Project"
                placeholder="Pick one"
                value={card.project?.id}
                data={projects.map(p => {
                    return {label: p.name, value: p.id}
                })}
                onChange={e => {
                        setCard({...card, projectId: e})
                    }
                }
            />
            <Select
                label="Select Type"
                placeholder="Pick one"
                value={card.type}
                data={[{label: "Athlete", value: "Athlete"},{label: "Champions", value: "Champions"},{label: "Activity", value: "Activity"},{label: "Team", value: "Team"}]}
                onChange={e => {
                        setCard({...card, type: e})
                    }
                }
            />
            <Select
                label="Select Athlete"
                placeholder="Pick one"
                value={card.athlete?.id}
                data={athletes.map(a => {
                    return {label: a.name, value: a.id}
                })}
                onChange={e => {
                        setCard({...card, athleteId: e})
                    }
                }
            />

            <FileInput label="Upload Display Card Image (Slabbed)"
            //  placeholder="Select file"
              onChange={setDisplayImage}/>
            {!!displayImage ? <Image src={URL.createObjectURL(displayImage)} width={200}></Image> : !!card.cardImageDisplay ? <Image src={card.cardImageDisplay} width={200}></Image> : null}
            <FileInput label="Upload NFT Card Image" 
            // placeholder="Select file" 
            onChange={setNftImage}/>
            {!!nftImage ? <Image src={URL.createObjectURL(nftImage)} width={200}></Image> : !!card.cardImageNFT ? <Image src={card.cardImageNFT} width={200}></Image> : null}
            <TextInput label={"Title"} value={card.title} onChange={e => setCard({...card, title: e.currentTarget.value})}/>
            <Textarea label={"Description"} value={card.description} onChange={e => setCard({...card, description: e.currentTarget.value})}/>
            <TextInput label={"Rarity"} value={card.rarity} onChange={e => setCard({...card, rarity: e.currentTarget.value})}/>
            <TextInput label={"Sport"} value={card.sport} onChange={e => setCard({...card, sport: e.currentTarget.value})}/>
            <TextInput label={"Position"} value={card.position} onChange={e => setCard({...card, position: e.currentTarget.value})}/>
            <TextInput label={"Special"} value={card.special} onChange={e => setCard({...card, special: e.currentTarget.value})}/>
            <TextInput label={"School"} value={card.school} onChange={e => setCard({...card, school: e.currentTarget.value})}/>
            <TextInput label={"Design"} value={card.design} onChange={e => setCard({...card, design: e.currentTarget.value})}/>
            <TextInput label={"Designer"} value={card.designer} onChange={e => setCard({...card, designer: e.currentTarget.value})}/>
            <TextInput label={"Edition"} value={card.edition} onChange={e => setCard({...card, edition: e.currentTarget.value})}/>
            <TextInput label={"Serial No"} value={card.serialNumberStart} onChange={e => setCard({...card, serialNumberStart: e.currentTarget.value})}/>
            <TextInput label={"Medal"} value={card.medal} onChange={e => setCard({...card, medal: e.currentTarget.value})}/>
            <TextInput label={"Year"} value={card.year} onChange={e => setCard({...card, year: e.currentTarget.value})}/>
            <NumberInput label={"Mint quantity"} value={card.mintQuantity || 0} onChange={e => setCard({...card, mintQuantity: +e})}/>
            {/* <DateTimePicker label="Mint date and time" onChange={e => setCard({...card, mintDatetime: e})}/> */}
            <NumberInput label={"Max quantity"} value={card.maxQuantity || 0} onChange={e => setCard({...card, maxQuantity: +e})}/>
            <NumberInput label={"Pack quantity"} value={card.packQuantity || 0} onChange={e => setCard({...card, packQuantity: +e})}/>
            <NumberInput label={"Separately sold quantity"} value={card.separatelySoldQuantity || 0} onChange={e => setCard({...card, separatelySoldQuantity: +e})}/>
            <NumberInput label={"Enhancement quantity"} value={card.enhancementQuantity || 0} onChange={e => setCard({...card, enhancementQuantity: +e})}/>
            <NumberInput label={"Price"} value={card.price || 0} onChange={e => setCard({...card, price: +e})}/>
            <NumberInput label={"mintAthleteShare"} value={card.mintAthleteShare || 0} precision={2} step={0.05} onChange={e => setCard({...card, mintAthleteShare: +e})}/>
            <NumberInput label={"tradeAthleteShare"} value={card.tradeAthleteShare || 0} precision={2} step={0.05} onChange={e => setCard({...card, tradeAthleteShare: +e})}/>
            <NumberInput label={"mintArtistShare"} value={card.mintArtistShare || 0} precision={2} step={0.05} onChange={e => setCard({...card, mintArtistShare: +e})}/>
            <NumberInput label={"tradeArtistShare"} value={card.tradeArtistShare || 0} precision={2} step={0.05} onChange={e => setCard({...card, tradeArtistShare: +e})}/>
            <NumberInput label={"referrerShare"} value={card.referrerShare || 0} precision={2} step={0.05} onChange={e => setCard({...card, referrerShare: +e})}/>
            <NumberInput label={"affiliateShare"} value={card.affiliateShare || 0} precision={2} step={0.05} onChange={e => setCard({...card, affiliateShare: +e})}/>
            
            <Button mb={64} mt={32} onClick={submitCard}>Submit</Button>
        </Stack>
    )
}