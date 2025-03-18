import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { callAPI } from "../../../lib/utils";
import { Loader } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [perkType, setPerkType] = useState("");
  const [perk, setPerk] = useState(null);
  const [currentXp, setCurrentXp] = useState(null);
  const router = useRouter();
  const handleGetPerk = async () => {
    setLoading(true);
    const res = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/challenges/user/${router.query.id}`,
      method: "GET",
    });

    if (!res?.success) {
      return;
    }

    let data = res.data;
    setCurrentXp(data.currentXp);
    setPerkType(data.perkType);
    setPerk(data?.challenge);
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.id) {
      handleGetPerk();
    }
  }, [router.query]);

  const XPPerk = () => {
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center text-white p-6 text-center bg-black">
          <h1 className="md:text-4xl text-2xl font-semibold mb-4 text-white">
            Congratulations!
          </h1>
          <p className="md:text-lg base text-gray-300">
            You completed your challenge!
          </p>
          <div className="flex items-center justify-center mt-6">
            <Image
              src="/images/notifications/xp.png"
              alt="XP Earned"
              width={120}
              height={120}
            />
          </div>
          <div className="mt-6 md:text-lg text-base text-gray-400">
            <p>
              You earned{" "}
              <span className="text-green-400 font-bold">
                {perk?.xpEarn * perk?.challenge?.perkXP}XP
              </span>
            </p>
            <p>
              Your XP Boosted by{" "}
              <span className="text-purple-400 font-bold">
                {perk?.challenge?.perkXP}x{" "}
              </span>
            </p>
            <p>
              Your XP is now{" "}
              <span className="text-blue-400 font-bold">{currentXp}XP</span>
            </p>
          </div>
          <div className="mt-8">
            <button
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 md:text-base text-xs text-black font-bold py-2 px-6 rounded-md shadow-md hover:opacity-90 transition-all"
              onClick={() => router.back()}
            >
              Go Back to Challenges
            </button>
          </div>
        </div>
      </div>
    );
  };



  const COLLECTABLEPerk = () => {
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center text-white p-6 text-center bg-black">
          <h1 className="md:text-4xl text-2xl font-semibold mb-4">
            Congratulations!
          </h1>
          <p className="md:text-lg base text-gray-300">
            You won a {perk?.challenge?.collectable[0]?.collectableType}!
          </p>
          <div className="flex items-center justify-center mt-6">
            <Image
              src="/images/challenges/20.png"
              alt="Collectable Card"
              width={120}
              height={120}
            />
          </div>
          <div className="mt-6 md:text-lg text-base text-gray-400 text-left">
            <p>
              <span className="text-yellow-400 font-bold">Title:</span> {perk?.challenge?.collectable[0]?.collectableType == "DIGITAL" ? perk?.challenge?.collectable[0]?.perkDigitalCollectables[0]?.title :  perk?.challenge?.collectable[0]?.perkPhysicalCollectables[0]?.title}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">Description:</span>{" "}
              {perk?.challenge?.collectable[0]?.collectableType == "DIGITAL" ? perk?.challenge?.collectable[0]?.perkDigitalCollectables[0]?.title :  perk?.challenge?.collectable[0]?.perkPhysicalCollectables[0]?.title}
            </p>
            <p className="mt-4">
              <span className="text-green-400 font-bold">XP Earned:</span>{" "}
              {perk?.xpEarn * perk?.challenge?.perkXP} XP
            </p>
          </div>
          <p className="mt-4 text-gray-300 md:text-base text-xs">
            We have sent your ticket pass to your email.
          </p>
        </div>
        <div className="mt-8">
        <button
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 md:text-base text-xs text-black font-bold py-2 px-6 rounded-md shadow-md hover:opacity-90 transition-all"
            onClick={() => router.back()}
          >
            Go Back to Challenges
          </button>
        </div>
      </div>
    );
  };

  const getTicketName = (ticketType) => {
    switch (ticketType) {
      case "EntryPass":
        return "Entry Pass";
      case "NMatchTicket":
        return "Normal Match Ticket";
      case "VMatchTicket":
        return "Vip Match Ticket";
      case "ConcertTicket":
        return "Concert Ticket";
    }
  };

  const TICKETPerk = () => {
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center text-white p-6 text-center bg-black">
          <h1 className="md:text-4xl text-2xl font-semibold mb-4">
            Congratulations!
          </h1>
          <p className="md:text-base text-xs   text-gray-300">
            You won a {getTicketName(perk?.challenge?.ticket[0]?.ticketType)}!
          </p>
          <div className="flex items-center justify-center mt-6">
            <Image
                src="/images/challenges/19.png"
              alt="Ticket Won"
              width={120}
              height={120}
            />
          </div>
          <div className="mt-6 md:text-lg text-xs text-gray-400 text-left">
            <p>
              <span className="text-yellow-400 font-bold">Event:</span>{" "}
              {perk?.challenge?.ticket[0]?.eventTitle}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">Stadium:</span>{" "}
              {perk?.challenge?.ticket[0]?.stadiumName}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">Location:</span>{" "}
              {perk?.challenge?.ticket[0]?.eventLocation}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">Date:</span>{" "}
              {new Date(perk?.challenge?.ticket[0]?.eventDate).toDateString()}
            </p>
            <p>
              <span className="text-yellow-400 font-bold">Ticket Expiry:</span>{" "}
              {new Date(perk?.challenge?.ticket[0]?.tickExp).toDateString()}
            </p>
            <p className="mt-4">
              <span className="text-green-400 font-bold">XP Earned:</span>{" "}
              {perk?.xpEarn * perk?.challenge?.perkXP} XP
            </p>
          </div>
          <p className="mt-4 text-gray-300 md:text-base text-xs">
            We have sent your ticket pass to your email.
          </p>
        </div>
        <div className="mt-8">
          <button
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 md:text-base text-xs text-black font-bold py-2 px-6 rounded-md shadow-md hover:opacity-90 transition-all"
            onClick={() => router.back()}
          >
            Go Back to Challenges
          </button>
        </div>
      </div>
    );
  };

  const PerkNotFound = () => {
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col w-full items-center justify-center text-white p-6 text-center bg-black">
          <h1 className="md:text-3xl text-xl font-semibold mb-4">
            No Challenge Found
          </h1>
          <p className="md:text-base text-xs  text-gray-300">
            It looks like there is no completed challenge data.
          </p>

          <div className="mt-8">
            <button
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 md:text-base text-xs text-black font-bold py-2 px-6 rounded-md shadow-md hover:opacity-90 transition-all"
              onClick={() => router.back()}
            >
              Go Back to Challenges
            </button>
          </div>
        </div>
      </div>
    );
  };

  const HandleLoadComponent = () => {
    switch (perkType) {
      case "XP":
        return <XPPerk />;
      case "COLLECTABLE":
        return <COLLECTABLEPerk />;
      case "TICKET":
        return <TICKETPerk />;
      default:
        return <PerkNotFound />;
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] pb-40 flex flex-col justify-center items-center">
      {loading ? (
        <>
          <article className="text-center">
            Processing Your Challenge Perk...
          </article>
          <Loader variant="dots" />
        </>
      ) : (
        <HandleLoadComponent />
      )}
    </div>
  );
};

export default Index;
