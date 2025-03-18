import { Button, Group, Modal, NumberInput, Select, Stack, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import CardList from "../../../../components/CardList";
import { callAPI } from "../../../../lib/utils";

export default function CreateChallenge(){

    const [challenge, setChallenge] = useState({})
    const [loading, setLoading] = useState(false)
    const [cards, setCards] = useState([])
    const [entities, setEntities] = useState([])
    const [openedModal, {open: openModal, close: closeModal}] = useDisclosure()
    const [entityType, setEntityType] = useState('Athlete')
    const [cardIndex, setCardIndex] = useState(null) 
    const [imageDownload, setImageDownload] = useState({} as any)
    const router = useRouter()

    const setupCards = (count) => {
        setChallenge({...challenge, minCount: count})
        let _cards = []
        while(count-- > 0){
            _cards.push({
                type: '',
                xpValue: '',
                nftEntityIds: []
            })
        }
        setCards(_cards)
    }

    const setCardData = (field, value, index) => {
        setCards(cards.map((card, idx) => {
            if(index === idx){
                card[field] = value
            }
            return card
        }))
    }

    const getEntities = async() => {
        const res = await callAPI({endpoint: '/api/card/getAllAdmin'})
        if(res.cards){
            setEntities(res.cards)
            setImageDownload(res.imageDownload)
        }
    }

    const saveChallenge = async() => {
        const body = {...challenge, cards}
        const res = await callAPI({endpoint: '/api/admin/collectionChallenge', method: 'POST', body })
        if(res.status === 'success'){
            notifications.show({message: 'Created challenge successfully!'})
        }
        router.push('/admin/challenges')
    }

    useEffect(() => {
        if(cardIndex?.index >= 0){
            openModal()
        }
    },[cardIndex])

    useEffect(() => {
        getEntities()
    },[])

    return (
        <Stack>
            <Title>Create new challenge</Title>
            <Stack>
                <TextInput label="Name" onChange={(e) => setChallenge({...challenge, name: e.target.value})}></TextInput>
                <Select label="Type" onChange={(e) => setChallenge({...challenge, type: e})}
                data={[
                    {label: 'Athlete', value: 'Athlete'},
                    {label: 'Activity', value: 'Activity'},
                    {label: 'Team', value: 'Team'},
                    {label: 'Championship', value: 'Championship'}                    
                ]}></Select>
                <NumberInput label="Card count" onChange={(e) => setupCards(e)}></NumberInput>
                <DateInput label="Start date" onChange={(e) => setChallenge({...challenge, startDate: e})}></DateInput>
                <Group>
                    <Select label="Bonus points operator" onChange={(e) => setChallenge({...challenge, bonusPointsOperator: e})}
                    data={[
                        {label: 'Fixed', value: 'Fixed'},
                        {label: 'Multiply', value: 'Multiply'}                 
                    ]}></Select>
                    <NumberInput label="Operator value" onChange={(e) => setChallenge({...challenge, bonusPointsValue: e})}></NumberInput>
                </Group>
                
                {!!cards.length && cards.map((card, index) => {
                    return(
                    <Stack mt={8} key={index}>
                        <Title order={4}>Card {index+1}</Title>
                        <Group>
                            <Select label="Type" onChange={(e) => setCardData('type', e, index)}
                            data={[
                                {label: 'Athlete', value: 'Athlete'},
                                {label: 'Activity', value: 'Activity'},
                                {label: 'Team', value: 'Team'},
                                {label: 'Championship', value: 'Championship'}                    
                            ]}></Select>
                            <NumberInput label="XP Value" onChange={(e) => setCardData('xpValue', e, index)}></NumberInput>
                        </Group>
                        {!!card.type && <Button onClick={() => {
                            setCardIndex({type: card.type, index})
                        }}>Select Entities</Button>}
                    </Stack>)
                })}
                <Button mt={16} onClick={saveChallenge}>Save</Button>
            </Stack>
            <Modal opened={openedModal} onClose={closeModal} fullScreen title={'Select Entities'}>
                {!!cardIndex && <CardList imageDownload={imageDownload} cards={entities.filter(c => c.type === cardIndex.type)} selectedEntities={cards[cardIndex.index].nftEntityIds}
                setSelectedEntities={(ids) => {
                    setCards(cards.map((card, idx) => {
                        if(idx === cardIndex.index){
                            card.nftEntityIds = ids
                        }
                        return card
                    }))
                }}/>}
            </Modal>
        </Stack>
    )
}