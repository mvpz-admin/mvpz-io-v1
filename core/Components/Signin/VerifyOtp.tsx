import { useEffect, useState } from "react";
import axios from "axios";
import OTPInput from "../../Atoms/Inputs/OTPInputs";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { Loader } from "@mantine/core";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCompleteProfileStore, useLoginProcessStore } from "../../../store/useGlobalStore";

export default function VerifyOtp({ enteredEmail, handleBack }) {
  const [email, setEmail] = useState(enteredEmail || "");
  const [otpError, setOtpError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [verifyLoading,setVerifyLoading] = useState(false)
  const { setUser } = useAuthStore.getState(); 
  const {  setCloseLoginModel } = useLoginProcessStore((state) => state);
  const {setUsername} = useCompleteProfileStore((state) => state)

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [counter]);

  const removeMsg = () => {
    setTimeout(() => {
      setOtpMessage("");
    }, 1000);
  };

  const requestOTP = async () => {
    setOtpError("")
    setOtpMessage("")
    setRequestLoading(true);
    try {
      await axios.post("/api/auth/send-otp", { email });
      setOtpMessage("OTP sent to your email!");
      setCounter(30);
      removeMsg();
    } catch (error) {
      setOtpError("Failed to send OTP.");
    }
    setRequestLoading(false);
  };

  const verifyOtp = async (otp) => {
    setOtpError("");
    setOtpMessage("");
    setVerifyLoading(true)
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      
      if (data.success) {
        setUser({
          ...data?.data?.user,
          token : data?.token,
        })
        setUsername(`@${data?.data?.user?.email?.split('@')[0]}`)
        setCloseLoginModel()
      } else {
        setOtpError(data?.error || "Invalid OTP");
      }
    } catch (error) {
      setOtpError("An error occurred. Please try again.");
    }
    setVerifyLoading(false)
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center z-50">
      <h2 className="text-3xl font-semibold mb-2">Verification</h2>
      <article className="text-[12px] text-center font-inter font-semibold text-opacity-50 text-white">
        If you have an account, we have sent a code to{" "}
        <span className="font-extrabold text-white text-opacity-75">
          {email || "x0abhie@gmail.com"}
        </span>
        . Enter it below.
      </article>

      <div className="my-5">
        <OTPInput length={4} onComplete={verifyOtp} error={otpError} />
      </div>

      {otpMessage && (
        <div className="flex justify-center items-center font-inter font-semibold text-green-300 gap-2 cursor-pointer mb-1">
          <FaCheck size={10} />
          <span className="text-[10px]">{otpMessage}</span>
        </div>
      )}

      <div className="w-full flex justify-center items-center px-10">
       {verifyLoading ?
       <div className="flex justify-center items-center font-inter font-semibold text-primary gap-2 cursor-pointer">
        <span className="text-[12px]">Verifying...</span>
       </div>
       :
       
       <div className="flex justify-center items-center font-inter font-semibold text-primary gap-2 cursor-pointer">
          {counter === 0 ? (
            <div className="flex items-center gap-2" onClick={requestOTP}>
              <IoReloadOutline size={12} className={requestLoading ? "animate-spin" : ""} />
              <span className="text-[12px]">Resend OTP</span>
            </div>
          ) : (
            <span className="text-[12px]">Resend After {counter}s</span>
          )}
        </div>}
      </div>

      <div className="absolute w-full bottom-0 left-0 pt-5 flex justify-center items-center border-t border-white border-opacity-20">
        <div
          className="flex justify-center items-center font-inter font-semibold text-primary gap-2 cursor-pointer"
          onClick={handleBack}
        >
          <FaArrowLeft size={12} />
          <span className="text-[12px]">Use Different Email</span>
        </div>
      </div>
    </div>
  );
}
