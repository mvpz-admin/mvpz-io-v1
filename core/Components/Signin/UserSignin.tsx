import React from "react";
import NxtImage from "next/image";
import { useState } from "react";
import TextFeild from "../../Atoms/Inputs/TextFeild";
import { Divider } from "@mantine/core";
import VerifyOtp from "./VerifyOtp";
import { useGoogleLogin } from '@react-oauth/google';
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";
import { useAuthStore } from "../../../store/useAuthStore";
import { useLoginProcessStore } from "../../../store/useGlobalStore";

const UserSignin = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [googleAuthLoading,setGoogleAuthLoading] = useState(false)
    const { setUser } = useAuthStore.getState(); 
    const {  setCloseLoginModel } = useLoginProcessStore((state) => state);

  const sendOtp = async () => {
    setLoading(true);
    setEmailError("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("otp");
      } else {
        setEmailError(data.error || "Failed to send OTP");
      }
    } catch (error) {
      setEmailError("Something went wrong");
    }
    setLoading(false);
  };

  const handleOnChange = (e) => {
    setEmailError("");
    setEmail(e.currentTarget.value);
  };

  const handleGoogleVerify = async (tokenResponse) => {
    setGoogleAuthLoading(true)
    const response = await fetch(`/api/auth/verify-google?googletoken=${tokenResponse?.access_token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }); 

    const data = await response.json();
    

    if (data.success) {
      setUser({
        ...data?.data?.user,
        token : data?.token,
      })
      setCloseLoginModel()
    }
    

    setGoogleAuthLoading(false)
  }


  const login = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleVerify(tokenResponse),
      flow: 'implicit',  // Ensure this is correct
  });



  return step === "email" ? (
    <>
      <div className="relative w-full h-full flex justify-center items-center flex-col z-0  " >
        <div className="w-full mb-10">
          <a href="/">
            <NxtImage
              src={`/images/logos/mvpzV1.png`}
              alt="poster"
              width={2000}
              height={2000}
              className="relative w-[100px] object-cover mb-5"
            />
          </a>
          <article className="text-5xl font-bold mb-2">Game On.</article>
          <article className="text-sm font-monumentRegular opacity-75">
            Sign in to the Action.
          </article>
        </div>
        <div className="w-full flex flex-col justify-center items-start ">
          <>
            <TextFeild
              placeholder={"Enter your email?"}
              type="email"
              onChange={(e) => handleOnChange(e)}
              value={email}
              error={emailError}
              containerStyle="mb-5"
              clickSubmit={sendOtp}
              loading={loading}
            />

            <article className="font-inter font-semibold text-[10px] mb-5">
              By signing up, you agree to the{" "}
              <a href="/terms" className="text-primary">Terms of Service</a> and{" "}
              <a href="/policy" className="text-primary">Privacy Policy</a>, including{" "}
              <a href="/cookies" className="text-primary">Cookie Use</a>.
            </article>
          </>
          <div className="relative w-full">
            <Divider label="or" labelPosition="center" className="my-5" />
            <div
              className="w-full px-3  py-2 bg-white rounded-full flex justify-start items-center gap-2"
              onClick={() => login()}
            >
              <NxtImage
                src={`/images/social/google.png`}
                alt="poster"
                width={500}
                height={500}
                className="relative w-6 h-6 object-contain"
              />
              <article className="text-black  text-sm font-inter font-semibold cursor-pointer">
                Countine With Google
              </article>
            </div>
          </div>
        </div>
        
      </div>
      <div className="absolute top-0 left-0 w-full z-5">
      {googleAuthLoading && <LineLoadingEffect />}
      </div>
     {googleAuthLoading && <div className="absolute top-0 left-0 w-full h-full z-10"/>}
    </>
  ) : (
    <VerifyOtp enteredEmail={email} handleBack={() => setStep("email")} />
  );
};

export default UserSignin;
