import { Loader } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { callAPI } from "../../../lib/utils";

const Index = () => {
  const [status, setStatus] = useState<boolean | null>(null);
  const [counter, setCounter] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();

  const activateRedirecting = () => {
    if (isRedirecting) return; // Prevent multiple activations
    setIsRedirecting(true);
    setStatus(false);

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(interval);
          router.push("/profile/wallet"); // Redirect to "/"
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
  };

  const handleConnectAccount = async () => {
    try {
      const response = await callAPI({
        endpoint: `/api/stripe/stripe-validate`,
        method: "POST",
        body: {
          customerId: router.query.id,
        },
      });

      if (response?.customer) {
        setStatus(true), activateRedirecting();
      }
    } catch (error) {
      console.error("Error connecting account:", error);
    }
  };

  useEffect(() => {
    const { id } = router.query;
    const handle = () => {
      if (id) {
        return handleConnectAccount();
      }
    };
    handle();
  }, [router]);

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center md:p-10 p-5">
      <Image
        src={`/images/logo-transparent.png`}
        alt="poster"
        width={2000}
        height={2000}
        className="relative h-[40px] object-contain mb-5"
      />

      <Image
        src={`/images/wallets/verification.svg`}
        alt="poster"
        width={2000}
        height={2000}
        className="relative lg:w-[800px] w-[600px] lg:h-[400px] md:h-[300px] h-[200px] object-contain mb-10"
      />

      {status !== null ? (
        <>
          <article className="md:text-[30px] text-[16px] mb-5 text-primary text-center">
            Your Stripe Account,
            <br /> Completed Successfully!
          </article>
          <article className="md:text-[16px] text-[10px] text-center mb-5">
            You will be redirected to the wallet page in
            <br />
            {counter}
          </article>
        </>
      ) : (
        <>
          <Loader className="md:text-[50px] text-[25px]" mt={10} />
          <article className="lg:text-[40px] md:text-[30px] text-[20px] mb-5 text-center flex gap-5 mt-5">
            Connecting Your Stripe <br />
            Account ....
          </article>
        </>
      )}
      <article className="text-[10px] opacity-50">
        Don't Close The Window.
      </article>
    </div>
  );
};

export default Index;
