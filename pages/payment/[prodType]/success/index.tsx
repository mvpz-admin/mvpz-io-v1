import React, { useState, useEffect } from "react";
import ClaimCards from "../../../../core/Components/Reveal/ClaimCards";
import { useRouter } from "next/router";
import { callAPI } from "../../../../lib/utils";
import Image from "next/image";

const SuccessPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { paymentId, prodType } = router.query;

  const [paymentSuccessfull, setPaymentSuccessfull] = useState(true);
  const [cards, setCards] = useState([]);
  const [apparelOrders, setApparelOrders] = useState([]);

  const processPayment = async () => {
    if (!paymentId || !prodType) return;

    setIsLoading(true);
    try {
      const response = await callAPI({
        endpoint: `/v1/purchase/${prodType}/processPayment?paymentId=${paymentId}`,
        method: "POST",
      });

    //   let response = {
    //     "success": true,
    //     "data": [
    //         {
    //             "paymentStatus": 600,
    //             "productType": "card",
    //             "data": {
    //                 "cards": [
    //                     {
    //                         "baseCard": {
    //                             "title": "Glen Maxwell",
    //                             "description": "Increased hitting power, better bowling variations, and fielding reflexes, making him game-changing.",
    //                             "cardImageNFT": "https://f005.backblazeb2.com/file/mvpz-crickit/entities/prod/@gmaxi_32/maxwell_base.png",
    //                             "purchaseCardId": "67a61ce93018313382a903a5"
    //                         },
    //                         "enhancementCards": [
    //                             {
    //                                 "title": "Max Redesign",
    //                                 "description": "A bold evolution of style and performance—redefining the essence of Maxwell’s dynamic persona with a",
    //                                 "cardNFTImage": "https://f005.backblazeb2.com/file/mvpz-crickit/entities/prod/@gmaxi_32/Base_ATHLETE_PERSONALIZATIONS_newImage_v5.png",
    //                                 "purchaseId": "67e11f6fa512d591840e517b"
    //                             },
    //                             {
    //                                 "title": "Max x Oliva",
    //                                 "description": "An electrifying artist collaboration capturing Glenn Maxwell’s fearless energy and dynamic style thr",
    //                                 "cardNFTImage": "https://f005.backblazeb2.com/file/mvpz-crickit/entities/prod/@gmaxi_32/Base_ATHLETE_PERSONALIZATIONS_newImage_v4.png",
    //                                 "purchaseId": "67e11f6fa512d591840e5155"
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "baseCard": {
    //                             "title": "Glen Maxwell",
    //                             "description": "Increased hitting power, better bowling variations, and fielding reflexes, making him game-changing.",
    //                             "cardImageNFT": "https://f005.backblazeb2.com/file/mvpz-crickit/entities/prod/@gmaxi_32/maxwell_base.png",
    //                             "purchaseCardId": "67a61ce93018313382a903b2"
    //                         },
    //                         "enhancementCards": [
    //                             {
    //                                 "title": "Maxwell X Kookaburra",
    //                                 "description": " A powerhouse collaboration, blending Maxwell’s explosive style with Kookaburra’s craftsmanship to r",
    //                                 "cardNFTImage": "https://f005.backblazeb2.com/file/mvpz-crickit/entities/prod/@gmaxi_32/Base_ATHLETE_PERSONALIZATIONS_newImage_v2.png",
    //                                 "purchaseId": "67e11f6ca512d591840e50fb"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             "message": "Card Assigned Successfully"
    //         },
    //         {
    //             "paymentStatus": 200,
    //             "productType": "apparel",
    //             "data": {
    //                 "orders": [
    //                     {
    //                         "id": "67e6c5d4559158cbfc7c19da",
    //                         "orderNumber": "67e6c5ae559158cbfc7c19d0",
    //                         "quantity": 1,
    //                         "size": "L",
    //                         "productId": "67e6c5af559158cbfc7c19d3",
    //                         "userId": "67a588004286518cfdc84101",
    //                         "status": "ORDERED",
    //                         "shippingCost": 0,
    //                         "productReferralCode": null,
    //                         "paymentAttemptId": "67e6c5ae559158cbfc7c19d0",
    //                         "addressId": "67e6c5cf559158cbfc7c19d9",
    //                         "createdAt": "2025-03-28T15:52:52.458Z",
    //                         "updatedAt": "2025-03-28T15:52:52.458Z",
    //                         "name": "Illuso Soft Special Double-Sided Basic Plain Hoodie",
    //                         "thumbnail": "https://image.hm.com/assets/hm/81/96/8196aed8ea85f8627dd3a6fac088a99c40a3a462.jpg?imwidth=1260"
    //                     },
    //                     {
    //                         "id": "67e6c5d4559158cbfc7c19da",
    //                         "orderNumber": "67e6c5ae559158cbfc7c19d0",
    //                         "quantity": 1,
    //                         "size": "L",
    //                         "productId": "67e6c5af559158cbfc7c19d3",
    //                         "userId": "67a588004286518cfdc84101",
    //                         "status": "ORDERED",
    //                         "shippingCost": 0,
    //                         "productReferralCode": null,
    //                         "paymentAttemptId": "67e6c5ae559158cbfc7c19d0",
    //                         "addressId": "67e6c5cf559158cbfc7c19d9",
    //                         "createdAt": "2025-03-28T15:52:52.458Z",
    //                         "updatedAt": "2025-03-28T15:52:52.458Z",
    //                         "name": "Illuso Soft Special Double-Sided Basic Plain Hoodie",
    //                         "thumbnail": "https://image.hm.com/assets/hm/94/23/9423109463d56dc226832f3b4ed820121e190929.jpg?imwidth=1260"
    //                     },
    //                     {
    //                         "id": "67e6c5d4559158cbfc7c19da",
    //                         "orderNumber": "67e6c5ae559158cbfc7c19d0",
    //                         "quantity": 1,
    //                         "size": "L",
    //                         "productId": "67e6c5af559158cbfc7c19d3",
    //                         "userId": "67a588004286518cfdc84101",
    //                         "status": "ORDERED",
    //                         "shippingCost": 0,
    //                         "productReferralCode": null,
    //                         "paymentAttemptId": "67e6c5ae559158cbfc7c19d0",
    //                         "addressId": "67e6c5cf559158cbfc7c19d9",
    //                         "createdAt": "2025-03-28T15:52:52.458Z",
    //                         "updatedAt": "2025-03-28T15:52:52.458Z",
    //                         "name": "CSK Dhoni Special Edition Sleeveless Training Vest",
    //                         "thumbnail": "https://image.hm.com/assets/hm/c1/2d/c12dbe5a42f3683734900502e07343b8cc59d95a.jpg?imwidth=1260"
    //                     },
    //                     {
    //                         "id": "67e6c5d4559158cbfc7c19da",
    //                         "orderNumber": "67e6c5ae559158cbfc7c19d0",
    //                         "quantity": 1,
    //                         "size": "L",
    //                         "productId": "67e6c5af559158cbfc7c19d3",
    //                         "userId": "67a588004286518cfdc84101",
    //                         "status": "ORDERED",
    //                         "shippingCost": 0,
    //                         "productReferralCode": null,
    //                         "paymentAttemptId": "67e6c5ae559158cbfc7c19d0",
    //                         "addressId": "67e6c5cf559158cbfc7c19d9",
    //                         "createdAt": "2025-03-28T15:52:52.458Z",
    //                         "updatedAt": "2025-03-28T15:52:52.458Z",
    //                         "name": "RCB Official Team Jersey 2024 - Premium Edition",
    //                         "thumbnail": "https://image.hm.com/assets/hm/c0/cd/c0cd0eaab5b57d6fcf1627ebe4a6980b24910f33.jpg?imwidth=1260"
    //                     }
    //                 ]
    //             },
    //             "message": "Apparel order processed successfully!"
    //         }
    //     ]
    // }


  

      if (response?.success) {
        setPaymentSuccessfull(true);
        const newCards = [];
        const newOrders = [];

        response?.data?.forEach((item) => {
          if (item.productType === "card") {
            newCards.push(...item.data.cards);
          }
          if (item.productType === "apparel") {
            newOrders.push(...item.data.orders);
          }
        });

        setCards(newCards);
        setApparelOrders(newOrders);
      } else {
        setPaymentSuccessfull(false);
      }
    } catch (error) {
      console.error("Payment processing failed:", error);
      setPaymentSuccessfull(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (paymentId && prodType) {
      processPayment();
    }
  }, [paymentId, prodType]);

  return (
    <div className="h-screen backdrop-brightness-50 overflow-y-auto" id="revealpage">
      <Image src="https://res.cloudinary.com/dv667zlni/image/upload/v1741624076/Screenshot_2025-03-10_at_9.55.56_PM_uzqyhl.png" alt="bg" fill className="object-cover" />
      <div className="absolute top-0 left-0 w-full h-full">
        {isLoading ? (
          <PaymentProcessing />
        ) : paymentSuccessfull ? (
          <PaymentSuccessfull cards={cards} apparelOrders={apparelOrders} />
        ) : (
          <PaymentFailed />
        )}
      </div>
    </div>
  );
};

const PaymentProcessing = () => (
  <div
    className="h-screen flex flex-col items-center justify-center text-white font-inter overflow-y-auto"
    id="revealpage"
  >
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
  </div>
);

const PaymentSuccessfull = ({ cards, apparelOrders }) => {
  const router = useRouter();
  const [openCardModel, setCardModel] = useState(false);
  return (
    <>
      <div
        className="relative h-screen overflow-y-auto flex flex-col items-center justify-start text-white font-inter bg-black/40 py-8 md:py-20 px-4"
        id="revealpage"
      >
        <div className="w-16 h-16 mb-4 animate-fade-in">
          <Image
            src="/images/other/checked.png"
            alt="success"
            width={64}
            height={64}
            className="opacity-90"
          />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white/90 tracking-tight animate-fade-in text-center">
          Payment Successful
        </h2>
        <p className="text-gray-400 text-center max-w-md mb-8 text-sm md:text-base animate-fade-in">
          Thank you for your purchase
        </p>

        <div className="flex flex-col gap-6 md:gap-8 w-full max-w-4xl">
          {cards.length > 0 && (
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 md:p-6 animate-slide-up">
              <h3 className="text-lg md:text-xl text-white/90 mb-4 md:mb-6 font-bold">Your Cards</h3>
              <div  className="group flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-4 md:p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <div className="relative w-full md:w-[140px] h-[140px] rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={cards[0].baseCard.cardImageNFT}
                        alt={cards[0].baseCard.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div>
                        <h4 className="text-base font-semibold text-white/90">
                          {cards[0].baseCard.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {cards[0].baseCard.description}
                        </p>
                      </div>
                      <span className="text-primary/90 text-[10px] font-medium">Ready to Mint</span>
                    </div>
                    <button 
                      onClick={() => setCardModel(true)}
                      className="w-full md:w-auto px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm backdrop-blur-sm flex-shrink-0 font-bold"
                    >
                      Mint Card
                    </button>
                  </div>
            </div>
          )}
          
          {apparelOrders.length > 0 && (
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 md:p-6 animate-slide-up">
              <h3 className="text-lg md:text-xl font-bold text-white/90 mb-4 md:mb-6">Your Orders</h3>
              <div className="flex flex-col gap-4">
              <div  className="group flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-4 md:p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <div className="relative w-full md:w-[140px] h-[140px] rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={apparelOrders[0].thumbnail}
                        alt={apparelOrders[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <div>
                        <h4 className="text-base font-semibold text-white/90">
                          {apparelOrders[0].title}
                        </h4>
                      </div>
                      <div className="flex flex-col gap-2 text-[12px]">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Order Number</span>
                          <span className="text-white/90 font-medium">{apparelOrders[0].orderNumber}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Size</span>
                          <span className="text-white/90 font-medium">{apparelOrders[0].size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Status</span>
                          <span className="text-primary/90 font-medium">{apparelOrders[0].status}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push("/profile/orders")}
                      className="w-full md:w-auto px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-bold backdrop-blur-sm flex-shrink-0"
                    >
                      View Details
                    </button>
                  </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 md:mt-12 animate-fade-in w-full md:w-auto">
          <button
            onClick={() => router.push('/')}
            className="w-full md:w-auto px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
          >
            Go to Home
          </button>
          {apparelOrders.length > 0 && (
            <button
              onClick={() => router.push('/profile/orders')}
              className="w-full md:w-auto px-8 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
            >
              View All Orders
            </button>
          )}
        </div>
      </div>

      {openCardModel && (
        <div className="fixed top-0 left-0 w-full h-screen z-50">
          <ClaimCards
            cardData={cards}
            handleCloseModel={() => setCardModel(false)}
          />
        </div>
      )}
    </>
  );
};

const PaymentFailed = () => {
  const router = useRouter();
  return (
  <div
    className="h-screen overflow-y-auto flex flex-col items-center justify-center text-white font-inter"
    id="revealpage"
  >
    <div className="w-24 h-24 mb-8">
      <Image
        src="/images/other/cancel.png"
        alt="failed"
        width={100}
        height={100}
      />
    </div>
    <h2 className="text-2xl font-bold mb-4 text-red-500">Payment Failed</h2>
    <p className="text-gray-400 text-center max-w-md">
      Unfortunately, your payment could not be processed. Please try again later
      or contact support.
    </p>
    <button
          onClick={() => router.push('/')}
          className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-primary/20 flex items-center gap-2"
        >
         
          Go to Home
        </button>
  </div>
)};



export default SuccessPage;
