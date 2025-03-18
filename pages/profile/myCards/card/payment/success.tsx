import { Button, Loader } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { callAPI } from "../../../../../lib/utils";

const Index = () => {
  const router = useRouter();

  const handleProcess = async () => {
    let response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/card/enhance/proccess`,
      method: "POST",
      body: {
        stripeSessionId: router.query.stripeSessionId,
      },
    });

    if (response?.success) {
      router.push(`/profile/myCards/card/${response?.data?.serialNumber}`);
    }
  };

  useEffect(() => {
    if (router.query.stripeSessionId) {
      handleProcess();
    }
  }, [router.query.stripeSessionId]);

  return router?.query?.serialNumber ? (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src={`/images/other/accept.png`}
        alt="process"
        width={500}
        height={500}
        className="relative w-[100px] h-[100px] object-cover mb-5"
      />
      <div className="flex flex-col items-center justify-center  text-center">
        <h1 className="text-2xl font-semibold">Payment Successful!</h1>
        <p className="text-lg mt-2">Your card is getting enhanced...</p>
        <Loader variant="bars" className=" mt-4 w-8 h-8 text-green-500" />
        <p className="mt-4 text-gray-600">
          Please wait while we apply your enhancements. This may take a few
          moments.
        </p>
        <p className="mt-2 opacity-50">
          Serial Number: {router?.query?.serialNumber}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src={`/images/other/cancel.png`}
        alt="process"
        width={500}
        height={500}
        className="relative w-[100px] h-[100px] object-cover mb-5"
      />
      <h1 className="text-2xl font-semibold">Payment Failed!</h1>
      <p className=" text-gray-600 mb-5">Serial Number Not Found!</p>
      <Button variant="gradient" onClick={() => router.push("/")}>
        Go Back
      </Button>
    </div>
  );
};

export default Index;
