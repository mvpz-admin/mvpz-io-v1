import { Card, createStyles, Flex, Grid, Group, Image, Loader, Paper, SimpleGrid, Stack, Tabs, Text, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { callAPI } from "../../lib/utils";
import ProfileLayout from "../../core/Layout/ProfileLayout";
;

const useStyles = createStyles(theme => ({
    grid:{
        [theme.fn.smallerThan('sm')]:{
            width: 200
        },
        [theme.fn.smallerThan('md')]:{
            width: 400
        },
        [theme.fn.largerThan('md')]:{
            width: 1200
        }
    },
    tabs:{
        [theme.fn.smallerThan('xs')]:{
            fontSize: '10px !important'
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: 16
        }
    },
    textStore:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: 24
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: "50px !important"
        }
    },
    store:{
        [theme.fn.smallerThan('sm')]:{
            height: 80
        },
        [theme.fn.largerThan('sm')]:{
            height: 120
        }
    },
    text3:{
        [theme.fn.smallerThan('sm')]:{
            fontSize: 20
        },
        [theme.fn.largerThan('sm')]:{
            fontSize: 36
        }
    },

}))

export default function MyOrders(){
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const {classes} = useStyles()
    const theme = useMantineTheme()
    const largeScreen = useMediaQuery('(min-width: 60em)')
    const MyContainer = largeScreen ? Group : Stack
    const router = useRouter()

    const fetchOrders = async() => {
        setLoading(true)
        const result = await callAPI({endpoint: '/api/orders'})
        setLoading(false)
        if(result.length){
            setOrders(result.reverse())
        }
    }

    useEffect(() => {
        fetchOrders()
    },[])

    const OrderSection = ({ items }) => {
        const BOX = largeScreen ? Stack : Group
        return (
            <Stack spacing={largeScreen ? 64 : 0}>
                {items.map(({ title, content }) => {
                    return (
                        <BOX key={title} spacing={2} grow>
                            <Text>{title}</Text>
                            <Text size={'xs'} w={{base: 240, md: 300}}>{content}</Text>
                        </BOX>
                    )
                })}
            </Stack>
        )
    }
    const Order = ({order}: any) => {
        const {id, product, createdAt, paymentAttempt, status, variant, shippingCost} = order
        const totalPrice = parseInt(paymentAttempt?.totalPrice) + shippingCost/100
        return (
            <Paper style={{cursor: 'pointer'}} key={id} mt={32} onClick={() => router.push(`/orders/${order.orderNumber}`)}>
                <MyContainer spacing={16} align='center'>
                    <Image alt="" style={{justifyContent: 'center'}} width={200} src={variant?.image ?? product.images[0]}></Image>
                    <SimpleGrid cols={1} breakpoints={[{minWidth: 'md', cols: 3}]}>
                        <OrderSection items={[{title: 'PRODUCT', content: product?.name}, {title: 'Quantity', content: paymentAttempt?.quantity}]}/>
                        <OrderSection items={[{title: 'UNIT PRICE', content: `$${product?.cost}`}, {title: 'TOTAL', content: `$${totalPrice}`}]}/>
                        <OrderSection items={[{title: 'STATUS', content: status}, {title: 'Time', content: new Date(createdAt).toDateString()}]}/>
                    </SimpleGrid>
                </MyContainer>
            </Paper>
        )
    }
    return(
       <ProfileLayout>
         <Stack>
         <div className=" w-full">
            <article className="md:text-[50px] text-2xl mb-5 w-full uppercase font-graffiti text-center">
             <span className="text-primary">MY</span> ORDERS
            </article>
          </div>
            <Stack mt={32} spacing={0}>
                <Text size={largeScreen ? 'sm' : 10} align="center">
                    All Order history can be viewed here.
                </Text>
                <Text size={largeScreen ? 'sm' : 10} align="center">
                    Check out the terms and conditions for returns.
                </Text>
            </Stack>
            {loading ? <Group position="center"><Loader/></Group> : !orders.length ? <Title order={3} mt={16} align="center">No orders yet.</Title> : 
            <Tabs variant={'pills'} defaultValue="processing">
                <Tabs.List defaultValue={"processing"} grow>
                    <Tabs.Tab value="processing">PROCESSING</Tabs.Tab>
                    <Tabs.Tab value="past">PAST ORDERS</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="processing">
                    {orders.filter(o => ['ORDERED','SHIPPED'].includes(o.status)).map(order => {
                        return (
                            <Order order={order}/>
                        )
                    })}
                </Tabs.Panel>
                <Tabs.Panel value="past">
                    {orders.filter(o => ['DELIVERED','REFUNDED'].includes(o.status)).map(order => {
                        return (
                            <Order order={order}/>
                        )
                    })}
                </Tabs.Panel>
            </Tabs>
            }
        </Stack>
       </ProfileLayout>
    )
}