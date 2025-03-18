import React, { useState, useEffect } from "react";
import ClaimCards from "../../../../core/Components/Reveal/ClaimCards";
import { useRouter } from "next/router";
import { callAPI } from "../../../../lib/utils";

const SuccessPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { paymentId, prodType } = router.query;
  
  const [paymentSuccessful, setPaymentSuccessful] = useState(null);
  const [cards, setCards] = useState();

  const processPayment = async () => {
  setIsLoading(true);
    const response = await callAPI({
      endpoint: `/v1/purchase/${prodType}/processPayment?paymentId=${paymentId}`,
      method : "POST"
    });
    setPaymentSuccessful(response.success);
    setCards(response?.data?.cards);
    setIsLoading(false);
  };

  useEffect(() => {
    if (paymentId) {
      processPayment();
    }
  }, [paymentId]);

  return (
    <div className="min-h-screen backdrop-brightness-50" id="reavelpage">
      {isLoading ? <PaymentProcessing /> : <ClaimCards cards={cards} />}
    </div>
  );
};

const PaymentProcessing = () => (
  <div className="min-h-screen flex flex-col items-center justify-center  text-white font-inter">
    <div className="w-24 h-24 mb-8">
      <svg
        className="animate-spin w-full h-full text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <h2 className="text-2xl font-bold mb-4 text-primary">Processing Payment</h2>
    <p className="text-gray-400 text-center max-w-md">
      Please wait while we process your payment and prepare your cards...
    </p>
    <div className="mt-8 space-y-2">
      <div className="flex items-center space-x-3">
        <div
          className="w-3 h-3 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-primary rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);

export default SuccessPage;
