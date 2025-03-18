import { Accordion, ActionIcon, Button, Chip, Container, CopyButton, Divider, Group, Image, Loader, NumberInput, Select, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { createStyles } from "@mantine/styles";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import ProductShare from "../../components/ProductShare";
import { callAPI } from "../../lib/utils";
import ProfileLayout from "../../core/Layout/ProfileLayout";
;

const useStyles = createStyles((theme) => ({
    group:{
        [theme.fn.smallerThan('sm')]:{
            flexDirection: 'column',
            justifyContent: 'center !important',
            marginTop: '0px !important'
        }
    },
    sectionWidth: {
        [theme.fn.smallerThan('sm')]:{
            maxWidth: 400
        },
        
    },
    font:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: '12px !important',
            maxWidth: '2 rem'
        }
    },
    image:{
        [theme.fn.largerThan('sm')]:{
            maxWidth: 400
        },
        [theme.fn.smallerThan('sm')]:{
            maxWidth: 240
        }
    },
    name: {
        [theme.fn.smallerThan('sm')]:{
            fontSize: '20px !important'
        }
    },
    cost:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: '16px !important'
        }
    }
}))

export default function OrderDetails(){
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const {orderNumber} = router.query
    const [order, setOrder] = useState({} as any)
    const [toggleSerialNumber, setToggleSerialNumber] = useState(true)
    const {status} = useSession()
    const {classes} = useStyles()
    let base10SerialNumber = ''
    let address = ''
    if(order.address){
        address = `${order.address.line1}, ${order.address.line2 || ''}, ${order.address.city}, ${order.address.state || ''}, ${order.address.postalCode}`
        address = address.replaceAll(', ,',',')
    }
    let payment = ''
    if(order.paymentAttempt?.paymentMethod){
        payment = order.paymentAttempt.paymentMethod.type === 'card' ? `${order.paymentAttempt.paymentMethod.brand} ending with ${order.paymentAttempt.paymentMethod.last4}` : order.paymentAttempt.paymentMethod.type
    }
    if(order?.serialNumber){
        const base10 = parseInt(order.serialNumber.substring(order.serialNumber.length - 3), 36);
        base10SerialNumber = order.serialNumber.substring(0, order.serialNumber.length - 3) + base10.toString().padStart(3, '0')
    }
    const fetchOrderDetails = async() => {
        const result = await callAPI({endpoint: `/api/orders/${orderNumber}`})
        if(result){
            setOrder(result)
        }
    }

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/')
        }
        fetchOrderDetails()
    },[orderNumber])

    return(
       <ProfileLayout>
        {
             loading ? <Loader/> :
             <Container style={{maxWidth: '1200px', maxHeight:'1080px'}} >
                 <Group mt={64} align='flex-start'  spacing={32} className={classes.group}>
                     <Stack align={"center"} justify='center'>
                         {!!order.product?.images?.length && <Group position="center"><Image className={classes.image} src={order.product.images[0]}></Image></Group>}
                     </Stack>
                     <Stack mb={64}>
                         <Text className={classes.name} size={36}>{order.product?.name}</Text>
                         <Group>
                             <Text size={'xs'} c='dimmed'>STATUS</Text>
                             <Text className={classes.cost} tt="capitalize" size={24}>{order.status?.toLowerCase()}</Text>
                         </Group>
                         <Group>
                             <Text size={'xs'} c='dimmed'>ETA DELIVERY</Text>
                             <Text className={classes.cost} tt="capitalize" size={24}>{new Date().toDateString()}</Text>
                         </Group>
                         <Divider w={600} className={classes.sectionWidth}/>
                         <Group>
                             <Text size={'xs'} c='dimmed'>COLOR</Text>
                             <Text>{order.variant?.variantName}</Text>
                         </Group>
                         <Group>
                             <Text size={'xs'} c='dimmed'>SIZE</Text>
                             <Text>{order.size}</Text>
                         </Group>
                         <Group>
                             <Text size={'xs'} c='dimmed'>UNIT PRICE</Text>
                             <Text>${order.product?.cost}</Text>
                         </Group>
                         <Group>
                             <Text size={'xs'} c='dimmed'>QUANTITY</Text>
                             <Text>{order.quantity}</Text>
                         </Group>
                         <Group>
                             <Text size={'xs'} c='dimmed'>SHIPPING COST</Text>
                             <Text>${order.shippingCost/100}</Text>
                         </Group>
                         <Group>
                             <Text size={'xs'} c='dimmed'>TOTAL PRICE</Text>
                             <Text>${((order.shippingCost/100) + (order.product?.cost * order.quantity)).toFixed(2)}</Text>
                         </Group>
                         <Group>
                             <Text size={'xs'} c='dimmed'>{toggleSerialNumber ? 'SERIAL NUMBER' : 'ACTUAL SERIAL NUMBER'}</Text>
                             <Text>{toggleSerialNumber ? order.serialNumber : base10SerialNumber}{toggleSerialNumber && <sub style={{fontSize: 8}}>36</sub>}</Text>
                             <Button variant={"light"} onClick={() => setToggleSerialNumber(!toggleSerialNumber)}>{toggleSerialNumber ? <IconEyeClosed/> : <IconEye/>}</Button>
                         </Group>
                         <Divider w={600} className={classes.sectionWidth}/>
                         <Text size={'xs'} c='dimmed'>DELIVERY ADDRESS</Text>
                         <Text>{address}</Text>
                         <Text size={'xs'} c='dimmed'>PAYMENT INFO</Text>
                         <Text>{payment}</Text>
                         {/* <Accordion>
                             <Accordion.Item value="design">
                                 <Accordion.Control>Features</Accordion.Control>
                                 <Accordion.Panel><Text w={500} className={classes.font}>{product.features}</Text></Accordion.Panel>
                             </Accordion.Item>
                         </Accordion>
                         <Accordion>
                             <Accordion.Item value="design">
                                 <Accordion.Control>Design</Accordion.Control>
                                 <Accordion.Panel><Text w={500} className={classes.font}>{product.inspiration}</Text></Accordion.Panel>
                             </Accordion.Item>
                         </Accordion> */}
                         <ProductShare productId={order.product?.id} productName={order.product?.name} status={status}/>
                     </Stack>                                            
                 </Group>
             </Container>
        }
       </ProfileLayout>
    )
}