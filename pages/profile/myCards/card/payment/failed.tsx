import { Button } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const router = useRouter();
  return router?.query?.serialNumber ? (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src={`/images/other/cancel.png`}
        alt="process"
        width={500}
        height={500}
        className="relative w-[100px] h-[100px] object-cover mb-5"
      />
      <h1 className="text-2xl font-semibold">Payment Failed!</h1>
      <p className=" text-gray-600 mb-5">Your enhancements were not applied.</p>
      <Button
        variant="gradient"
        onClick={() =>
          router.push(
            `/profile/myCards/card/enhance/${router.query.serialNumber}`
          )
        }
      >
        Go Back
      </Button>
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
