import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Cancel(){
    const router = useRouter()
    const {paymentId} = router.query

    useEffect(() => {
        if(paymentId){
            setTimeout(() => router.push('/mvpz-store'), 5000)
        }
    },[paymentId])

    return(
        <div className="relative min-h-screen px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] ">
        <article className="text-center">Payment cancelled!</article>
        </div>
    )
}