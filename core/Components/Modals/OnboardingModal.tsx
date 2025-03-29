import React, { useState } from "react";
import { Modal } from "@mantine/core";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface OnboardingModalProps {
  opened: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ opened, onClose }: OnboardingModalProps) => {
  const [showSteps, setShowSteps] = useState(false);
  const [step, setStep] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const totalSteps = 4;

  const FloatingCard = ({
    className,
    imageUrl,
    delay = 0,
    animate = true,
  }: {
    className: string;
    imageUrl: string;
    delay?: number;
    animate?: boolean;
  }) => (
    <motion.div
      className={`absolute rounded-xl overflow-hidden shadow-2xl ${className}`}
      animate={
        animate
          ? {
              y: [0, -10, 0],
              x: [0, 25, 0],
              rotate: [0, 5, 0],
            }
          : {}
      }
      transition={{
        duration: 10,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src={imageUrl}
        alt="NFT Card"
        width={100}
        height={100}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );

  const StepIndicator = ({ setStep }: { setStep: (step: number) => void }) => (
    <div className="flex gap-2 ">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={` rounded-full transition-all duration-300 md:h-[10px] h-[8px] cursor-pointer ${
            i <= step - 1 ? "w-[10px]" : "md:w-[80px] w-[50px]"
          } ${i <= step ? "bg-white" : "bg-[#2C2D30]"}`}
          onClick={() => step !== 1 && i <= step - 1 && setStep(i)}
        />
      ))}
    </div>
  );

  const BackgroundGlow = ({
    showForegroundLayer = true,
  }: {
    showForegroundLayer?: boolean;
  }) => {
    return (
      <div className="relative w-full h-screen ">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 overflow-hidden brightness-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-500/10 rounded-full filter blur-[100px] transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Floating Cards - Background Layer (Most Blurred) */}
        {!showForegroundLayer && (
          <>
            <FloatingCard
              className=" w-32 h-32 top-[5%] left-[40%] filter blur-[40px] opacity-15"
              imageUrl="https://res.cloudinary.com/dg0ahswkh/image/upload/v1743017259/dollar-dollar-gradient_hwwsge.png"
              animate={false}
            />
            <FloatingCard
              className="w-36 h-36 bottom-[8%] right-[35%] filter blur-[35px] opacity-15"
              imageUrl="https://res.cloudinary.com/dg0ahswkh/image/upload/v1743017814/thumb-up-dynamic-gradient_1_bjrk4c.png"
              animate={false}
            />

            <FloatingCard
              className="w-36 h-36 top-[40%] right-[5%] filter blur-[35px] opacity-15"
              imageUrl="https://res.cloudinary.com/dg0ahswkh/image/upload/v1743017814/thumb-up-dynamic-gradient_1_bjrk4c.png"
              animate={false}
            />

            <FloatingCard
              className="w-36 h-36 bottom-[20%] left-[10%] filter blur-[35px] opacity-15"
              imageUrl="https://res.cloudinary.com/dg0ahswkh/image/upload/v1743017259/dollar-dollar-gradient_hwwsge.png"
              animate={false}
            />
          </>
        )}

        {/* Floating Cards - Foreground Layer (Sharp) */}
        <>
          <FloatingCard
            className={`md:block hidden w-24 h-24 top-[10%] right-[30%] filter ${
              showForegroundLayer
                ? "blur-[0px] opacity-100"
                : "blur-[50px] opacity-45"
            }`}
            imageUrl="https://res.cloudinary.com/dg0ahswkh/image/upload/v1743017814/thumb-up-dynamic-gradient_1_bjrk4c.png"
            delay={1.5}
          />
          <FloatingCard
            className={`md:block hidden w-28 h-28 bottom-[12%] left-[30%] filter ${
              showForegroundLayer
                ? "blur-[0px] opacity-100"
                : "blur-[50px] opacity-45"
            }`}
            imageUrl="https://res.cloudinary.com/dg0ahswkh/image/upload/v1743017263/video-camera-dynamic-gradient_jggu7a.png"
            delay={2.5}
          />
          <FloatingCard
            className={`md:block hidden w-20 h-20 top-[80%] right-[15%] filter ${
              showForegroundLayer
                ? "blur-[0px] opacity-100"
                : "blur-[50px] opacity-45"
            }`}
            imageUrl="https://res.cloudinary.com/dg0ahswkh/image/upload/v1743017261/trophy-dynamic-gradient_1_rcakm3.png"
            delay={1}
          />
          <FloatingCard
            className={`md:block hidden w-20 h-20 top-[20%] left-[15%] filter ${
              showForegroundLayer
                ? "blur-[0px] opacity-100"
                : "blur-[50px] opacity-45"
            }`}
            imageUrl="https://res.cloudinary.com/dg0ahswkh/image/upload/v1743017259/dollar-dollar-gradient_hwwsge.png"
            delay={2}
          />
        </>
        {/* Additional Ambient Light Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  };

  const WelcomeScreen = () => (
    <div className="relative w-full h-screen px-5">
      {/* Content */}
      <div className="relative text-center z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/images/logos/logo-transparent.png"
            alt="MVPz Sports Logo"
            width={150}
            height={40}
            className="relative z-10"
          />
        </div>
        <h2 className="md:text-3xl text-xl font-bold text-white mb-4">
          Welcome to MVPz Sports
        </h2>
        <p className="md:text-base  text-sm text-gray-400 md:mb-12 mb-6 max-w-xl mx-auto">
          Your new home for NFTs and tokens. Join the community and start
          collecting today.
        </p>
        <motion.button
          onClick={() => setShowSteps(true)}
          className="px-5 py-3 bg-secondary text-white text-xs font-semibold rounded-xl hover:bg-ternary transition-all duration-300 shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Additional Ambient Light Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );

  const Step1 = () => (
    <div className="text-center py-[40px]">
      <div className="w-16 h-16 bg-[#D946EF] rounded-full mx-auto mb-6 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h2 className="md:text-4xl text-xl font-bold text-white mb-4">Find Your Tribe</h2>
      <p className="md:text-sm text-[10px] text-gray-300 mb-2 md:max-w-[60%] mx-auto">
        A unique social platform that brings you closer to your favorite
        athletes. Connect with other fans who share your passion for sports.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
        consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Architecto omnis quis, amet totam dignissimos reiciendis eveniet saepe
        ab earum a odio qui fugit quisquam optio eius aliquid iusto, quae in!
      </p>
    </div>
  );

  const Step2 = () => (
    <div className="text-center py-[40px]">
      <div className="w-16 h-16 bg-[#F97316] rounded-full mx-auto mb-6 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </div>

      <h2 className="md:text-4xl text-xl font-bold text-white mb-4">
        Collect Sports Cards
      </h2>
      <p className="md:text-sm text-[10px] text-gray-300 mb-2 md:max-w-[60%] mx-auto">
        Collect digital sports cards of your favorite athletes. Each card is
        essential to your tribe and gives you access to exclusive content. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    </div>
  );

  const Step3 = () => (
    <div className="text-center py-[40px]">
      <div className="w-16 h-16 bg-[#EC4899] rounded-full mx-auto mb-6 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h2 className="md:text-4xl text-xl font-bold text-white mb-4">
        Support Your Heroes
      </h2>
      <p className="md:text-sm text-[10px] text-gray-300 mb-2 md:max-w-[60%] mx-auto">
        Directly support athletes through tips and engagement. Get recognized by
        your favorite sports stars and build a connection. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    </div>
  );

  const Step4 = () => (
    <div className="text-center py-[60px] md:max-w-[60%] mx-auto">
      <h2 className="md:text-4xl text-xl font-bold text-white md:mb-20 mb-10 ">
        Introducing Rewards
      </h2>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 text-left">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex-shrink-0">
            <svg
              className="w-12 h-12 text-[#FFD700]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="md:text-base text-[12px] text-white font-semibold mb-1">STAY ACTIVE</h3>
            <p className="text-gray-400 md:text-sm text-[10px]">
              EARN XP FOR ENGAGING IN CORE ACTIONS ON THE PLATFORM.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex-shrink-0">
            <svg
              className="w-12 h-12 text-[#FF69B4]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="md:text-base text-[12px] text-white font-semibold mb-1">STAY LOYAL</h3>
            <p className="text-gray-400 md:text-sm text-[10px]">
              MAKE MVPz YOUR PLATFORM OF CHOICE TO MAXIMIZE YOUR REWARDS.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex-shrink-0">
            <svg
              className="w-12 h-12 text-[#4169E1]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="md:text-base text-[12px] text-white font-semibold mb-1">STAY OG</h3>
            <p className="text-gray-400 md:text-sm text-[10px]">
              YOUR MVP HISTORY MATTERS. RETRO DETAILS COMING SOON.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex-shrink-0">
            <svg
              className="w-12 h-12 text-[#9400D3]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h3 className="md:text-base text-[12px] text-white font-semibold mb-1">
              STAY TUNED FOR SURPRISES
            </h3>
            <p className="text-gray-400 md:text-sm text-[10px]">
              ENGAGE WITH MVP FOR A CHANCE TO EARN SHIPMENTS OF XP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const LoadingScreen = () => (
    <div className="text-center w-full px-5">
      <div className="relative w-[500px] mx-auto mb-12">
        {/* Glowing effect under the bar */}
        <div className="absolute inset-0 bg-primary/20 filter blur-xl -z-10" />
      </div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative mt-20"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Preparing Your Experience
        </h2>
        {/* Main loading bar container */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden my-10">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 10, ease: "linear" }}
          />
        </div>

        {/* Loading percentage */}
   
        <motion.div
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-gray-400 text-lg">Initializing game elements...</p>
        </motion.div>
      </motion.div>

      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full filter blur-[100px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );

  const handleNext = () => {
    if (step === totalSteps) {
      setShowLoading(true);
      setTimeout(() => {
        // onClose();
      }, 10000);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      fullScreen
      withCloseButton={false}
      transitionProps={{ transition: "fade", duration: 200 }}
      classNames={{
        body: "p-0",
        inner: "p-0",
        content: "bg-[#0A0B0E]",
      }}
    >
      {/* header */}
      <div className="absolute top-0 left-0 flex justify-between items-center w-full h-[60px] px-5 z-50">
        <div className=" md:block hidden">
          <Image
            src="/images/logos/logo-transparent.png"
            alt="MVPz Sports Logo"
            width={80}
            height={20}
            className="relative z-10 "
          />
        </div>
        {showSteps && !showLoading && step < 4 && (
          <StepIndicator setStep={setStep} />
        )}
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-ternary transition-all duration-300"
        >
          <IoClose size={20} color="white" />
        </button>
      </div>
      <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center font-inter">
        <div className="absolute inset-0">
          <BackgroundGlow showForegroundLayer={!showSteps} />
        </div>
        {/* Main Content */}
        <div className="relative z-10 w-full h-screen">
          {!showSteps && !showLoading && <WelcomeScreen />}

          {showSteps && !showLoading && (
            <div className="relative z-10 w-full  h-screen flex flex-col items-center justify-center px-5">
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}

              <div className="flex gap-4 justify-center">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="md:px-6 px-5 md:py-2 py-2 bg-[#1A1B1E] text-white rounded-lg hover:bg-[#2C2D30] transition-all duration-300"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="md:px-6 px-5 md:py-2 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-all duration-300"
                >
                  {step === totalSteps ? "Game On" : "Next"}
                </button>
              </div>
            </div>
          )}
          <div className="relative z-10 w-full  h-screen flex flex-col items-center justify-center">
            <div className="relative w-full px-5">
              {showLoading && <LoadingScreen />}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OnboardingModal;
