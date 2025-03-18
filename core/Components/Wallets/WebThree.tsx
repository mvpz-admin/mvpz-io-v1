import { Button, Group, HoverCard, Image, Loader, Modal, Popover, SimpleGrid, Stack, Table, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { IconEdit, IconHelpCircle, IconTrashFilled } from "@tabler/icons-react";
import { e } from "@vercel/blob/dist/put-96a1f07e";
import { useState } from "react";
import { useEffect } from "react";
import { callAPI } from "../../../lib/utils";
import { CardanoWalletType, connectCardanoWallet, getWalletAPI } from "../../../lib/walletService";
import {notifications} from "@mantine/notifications"
import { useDisclosure } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

export default function WebThree(){
    const [loading, setLoading] = useState(false)
    const [wallets, setWallets] = useState([])
    const [windowAvailable, setWindowAvailable] = useState(false)
    const [availableWallets, setAvailableWallets] = useState([])
    const [openedDeleteModal, {open: openDeleteModal, close: closeDeleteModal}] = useDisclosure()
    const [openedEditModal, {open: openEditModal, close: closeEditModal}] = useDisclosure()
    const [selectedWallet, setSelectedWallet] = useState(null)
    const [custodialWallet, setCustodialWallet] = useState(false)
    const theme = useMantineTheme()

    const connectWallet = async(walletType) => {
        try{
            setLoading(true)
            const wallet = await connectCardanoWallet(walletType)
            setLoading(false)
            if(wallet.error){
                notifications.show({title:'Error', message: wallet.error})
            }else if(wallet.walletAddress){
                const response = await callAPI({method: 'POST', endpoint: '/api/user/wallet', body: {type: walletType, address: wallet.walletAddress}})
                setLoading(false)
                if(response.status === 'success'){
                    notifications.show({title:'Success', message: 'Successfully saved wallet address.'})
                    getWallets()
                }else if(response.error){
                    notifications.show({title:'Error', message: response.error})
                }
            }
        }catch(err){
            console.log(err)
            notifications.show({title:'Error', message: 'Something went wrong. Please try again.'})
        }
    }

    const getWallets = async() => {
        setLoading(true)
        const response = await callAPI({method:'GET', endpoint: '/api/user/wallet'})
        setWallets(response.wallets || [])
        setCustodialWallet(response.hasCustodialWallet)
        setLoading(false)
    }

    const deleteWallet = async() => {
        if(!selectedWallet){
            return
        }
        setLoading(true)
        const response = await callAPI({method: 'DELETE', endpoint: '/api/user/wallet', body: {address: selectedWallet.address}})
        setLoading(false)
        setSelectedWallet(null)
        closeDeleteModal()
        if(response.status === 'success'){
            notifications.show({title:'Success', message: 'Successfully deleted wallet address'})
        }
        getWallets()
    }

    const updateWallet = async() => {
        setLoading(true)
        const response = await callAPI({method: 'PATCH', endpoint: '/api/user/wallet', body: {name: selectedWallet.name, id: selectedWallet.id}})
        setLoading(false)
        if(response.status === 'success'){
            notifications.show({title:'Success', message: 'Successfully updated wallet'})
        }
        setSelectedWallet(null)
        closeEditModal()
        getWallets()
    }

    useEffect(() => {
        getWallets()
        setWindowAvailable(true)
        setAvailableWallets(Object.values(CardanoWalletType).filter(walletType => !!getWalletAPI(window.cardano, walletType)))
    },[])

    return (
        <Stack mb={32}>
        <Title order={4} className="md:block hidden">Cardano Wallets</Title>
        <article className="text-2xl mb-5 md:hidden block text-center text-primary uppercase">Cardano Wallets</article>
        {loading ? <Loader/> :
        <>
            {!!wallets?.length || !!custodialWallet ? 
            <>
                <Text size={'sm'}>Linked Cardano Wallets</Text>
                <Table striped highlightOnHover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Wallet</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map(wallet => {
                            return (
                            <tr key={wallet.id}>
                                <td><IconEdit style={{marginTop: 4}} width={20} onClick={() => {openEditModal(); setSelectedWallet(wallet)}}/></td>
                                <td>{wallet.name}</td>
                                <td>{wallet.type}</td>
                                <td>{wallet.address}</td>
                                <td><IconTrashFilled width={20} style={{marginTop: 4}} onClick={() => {openDeleteModal(); setSelectedWallet(wallet)}}/></td>
                            </tr>
                            )
                        })}
                        {!!custodialWallet && 
                        <tr>
                            <td></td>
                            <td>CW</td>
                            <td>Saturn</td>
                            <td>Custodial Wallet</td>
                            <td></td>
                        </tr>}
                    </tbody>
                </Table>
            </> : <Text size={'sm'}>There are no wallets connected to your account.</Text>}
            {!!custodialWallet && 
            <Stack spacing={2} mt={8}>
                <Title order={4}>Custodial Wallet</Title>
                <Group>
                    <Text size={'sm'}>Saturn custodial wallets supported on MVPz backend.</Text>
                    <Popover width={400} shadow="md" withArrow>
                        <Popover.Target><IconHelpCircle color={theme.colors.mvpz[8]} width={16} style={{marginTop: -10, marginLeft: -10}}/></Popover.Target>
                        <Popover.Dropdown>
                            <Text size="xs">Self Custodial Wallets Are Not Applicable To Every User!</Text>
                            <Text mt={8} size="xs">Not sure what all these wallets are?</Text>
                            <Text size="xs">Don’t worry, it’s not applicable to everyone.</Text>
                            <Text mt={8} size="xs">If you pay by credit card and are keeping you cards on the MVPz platform, then no need to be concerned, your cards are safe with us.</Text>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
            </Stack>}
            <Title mt={32} order={4}>Add wallets to your account</Title>
            <Text size={'sm'}>Link Cardano wallets to your account by selecting from the available wallets below.</Text>
            {!!windowAvailable ? availableWallets.length ? 
            <SimpleGrid cols={5}>
                {availableWallets.map(walletType => {
                return (
                <Button key={walletType} onClick={() => connectWallet(walletType)} rightIcon={<Image alt="" width={20} src={`/images/wallets/${walletType.toLowerCase()}.png`}></Image>}>
                    {walletType.toUpperCase()}
                </Button>
                )})}
            </SimpleGrid> : 
            <Text size={'sm'}>No wallets are available to use. If you are on mobile, native apps on iOS and Android cannot add Cardano wallets. So please use the web app or a native app (eg. Vespr) in dApp mode.</Text>
            : null}
        </>}
        <Modal opened={openedDeleteModal} onClose={closeDeleteModal} title="Disconnect wallet">
            <Text size={'sm'}>Would you like to disconnect wallet?</Text>
            <Group mt={16} position='right'>
                <Button variant={'outline'} onClick={closeDeleteModal}>Cancel</Button>
                <Button onClick={deleteWallet}>Yes</Button>
            </Group>
        </Modal>
        <Modal opened={openedEditModal} onClose={closeEditModal} title="Edit wallet name">
            <TextInput label="Wallet name" value={selectedWallet?.name} onChange={(e) => setSelectedWallet({...selectedWallet, name: e.target.value})}></TextInput>
            <Group mt={16} position='right'>
                <Button variant={'outline'} onClick={closeEditModal}>Cancel</Button>
                <Button onClick={updateWallet}>Save</Button>
            </Group>
        </Modal>
    </Stack>
    )
}