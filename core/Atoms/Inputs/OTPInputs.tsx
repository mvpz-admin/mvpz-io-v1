import { useState, useRef } from "react";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  error?: string;
}

export default function OTPInput({
  length = 4,
  onComplete,
  error,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next box
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger onComplete when OTP is fully entered
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pasteData)) return; // Ensure it's only numbers

    const digits = pasteData.split("").slice(0, length);
    if (digits.length === 0) return;

    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);
    onComplete(newOtp.join(""));

    // Move focus to the last entered digit
    const nextIndex = digits.length < length ? digits.length : length - 1;
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <>
      <div className="flex gap-2">
        {otp.map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-12 border border-white border-opacity-5 rounded text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      {
        error && <article className="text-[8px] text-red-500 text-center mt-2">{error}</article>
      }
    </>
  );
}
