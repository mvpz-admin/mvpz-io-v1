import { Button, Container, Group, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRef } from "react";
import { callAPI } from "../../../../lib/utils";

export default function Payments(){
    const paymentIdInputRef = useRef(null)

    const processPayment = async() => {
        console.log(paymentIdInputRef.current?.value)
        // if(paymentIdInputRef.current?.value){
        //     const paymentId = paymentIdInputRef.current.value
        //     const response = await callAPI({endpoint: '/api/purchase/assignCardsAdmin', method: 'POST', body: {paymentId}})
        //     if(response.status='success'){
        //         notifications.show({message: 'Cards assigned successfully'})
        //     }
        // }
    }

    return (
        <Container style={{maxWidth: '1200px', maxHeight:'1080px'}}>
            <Stack p={'lg'}>
                <Group>
                    <TextInput placeholder="Enter payment attempt id" ref={paymentIdInputRef}/>
                    <Button onClick={processPayment}>Submit</Button>
                </Group>
            </Stack>
        </Container>
    )
}