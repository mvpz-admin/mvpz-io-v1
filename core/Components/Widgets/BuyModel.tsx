import React, { useState } from "react";
import {
  useBuyStore,
  useCartStore,
  useLoginProcessStore,
} from "../../../store/useGlobalStore";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Tooltip from "../../Atoms/Others/Tooltip";
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";
import { callAPI } from "../../../lib/utils";
import { useAuthStore } from "../../../store/useAuthStore";

const BuyModel = () => {
  const { setCloseModel, openModel, cart } = useBuyStore((state) => state);
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const isLoggedIn = useAuthStore((state) => state.user);
  const [initiateLoading, setInitiateLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuy = async () => {
    setError(null);
    if (isLoggedIn?.token) {
      setInitiateLoading(true);
      const response = await callAPI({
        endpoint: `/v1/purchase/${cart?.productType}/initiate`,
        method: "POST",
        body: cart,
      });

      if (!response.success) {
        setInitiateLoading(false);
        return setError(response.error);
      }

      window.location.href = response?.data?.checkoutUrl;

      setInitiateLoading(false);
    } else {
      setOpenLoginModel()
    }
  };

  return (
    <div
      className={`fixed left-0 ${
        openModel ? "bottom-0" : "-bottom-[100%]"
      } w-full h-full z-50 transition-all duration-100`}
    >
      {/* bg */}
      <div
        className="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={setCloseModel}
      >
        {/* conte */}
        <div
          className="absolute bottom-0 right-0 md:h-[400px] w-full h-auto rounded-t-3xl bg-[#111] bg-opacity-90 !backdrop-blur-xl flex  md:flex-row flex-col md:py-10 py-5 md:px-[150px] px-5 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* content */}
          <>
            <div className="flex-1 w-full h-full font-inter font-bold gap-5">
              {/* header */}
              <article className="mb-5">Checkout</article>
              <CardItem card={cart} />
              <div className="w-full h-[1px] bg-white bg-opacity-10 my-5" />
              <div className="relative   font-inter font-bold flex flex-col  gap-5">
                <div className="flex justify-between items-center font-inter  font-semibold w-full  ">
                  <article>Total Price</article>
                  <article className="text-[14px]">${cart?.price}</article>
                </div>
              </div>
            </div>
            {/* divider */}
            <div className="md:block hidden w-[1px] h-full bg-white bg-opacity-10 mx-10" />
            {/* divider */}
            <div className="flex-1 w-full h-full font-inter">
              <article className="mb-5 uppercase text-[14px] font-medium text-white text-opacity-50 ">
                Payment
              </article>
              <div className="relative w-full px-6 py-2 bg-ternary transition-all duration-300 rounded-lg font-inter flex justify-start items-center mb-5">
                <div className="flex-1 w-full flex justify-start items-center gap-2">
                  <Image
                    src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741915760/stripe_1_iryuth.png`}
                    alt="stripe"
                    width={500}
                    height={500}
                    className="relative h-[40px] w-[40px] object-contain"
                  />
                  <div>
                    <article className="text-[14px] font-semibold">
                      Pay From Stripe
                    </article>
                    <article className="text-[10px] opacity-50 font-semibold">
                      ${cart?.price}
                    </article>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border p-1">
                  <div className="w-full h-full rounded-full bg-white"></div>
                </div>
              </div>
              <article className="text-[10px] text-opacity-50 mb-5">
                All purchases are final as per our{" "}
                <a
                  href="/terms"
                  className="text-primary text-opacity-100 font-semibold cursor-pointer"
                >
                  Terms and Conditions
                </a>{" "}
                . For all enquiries please go to{" "}
                <a
                  href="/mailTo:team@mvpz.io"
                  className="text-primary text-opacity-100 font-semibold cursor-pointer"
                >
                  Customer Support
                </a>{" "}
                .
              </article>
              <button
                className="w-full py-3 rounded-xl bg-primary font-semibold "
                onClick={handleBuy}
              >
                Complete Puchase
              </button>
              {error && (
                <article className="text-[12px] text-red-500 font-inter my-2 ">
                  Base card is sold out! You need a base card to buy an
                  enhancement card. Check the marketplace to see if anyone is
                  selling one.
                </article>
              )}{" "}
            </div>
          </>
          {/* close button */}
          <div className="absolute top-5 right-10 z-0" onClick={setCloseModel}>
            <IoClose size={20} className="text-white" />
          </div>
          {/* layer */}
          {initiateLoading && (
            <div className="absolute top-0 left-0 w-full h-full z-5" />
          )}
          {/* line effect */}
          {initiateLoading && (
            <div className="absolute top-0 left-0 w-full z-10">
              <LineLoadingEffect />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CardItem = ({ card }) => {
  return (
    <div className="relative w-full   transition-all duration-300 rounded-lg font-inter">
      <div className=" relative w-full flex justify-between items-center ">
        {/* left side */}
        <div
          className={`flex justify-start items-center gap-2   flex-1 w-full `}
        >
          <div className="relative w-[55px] h-[55px] rounded-lg border border-white border-opacity-10 overflow-hidden">
            <Image
              src={card?.thumnail}
              alt="thumnail"
              width={500}
              height={500}
              className="relative w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-start font-inter">
            <article className="font-semibold text-[14px]">
              {card?.title}
            </article>
            <article className="font-meduim text-[12px] opacity-50">
              {card?.subtitle}
            </article>
          </div>
        </div>
        {/* right side */}
        <div className="flex justify-start items-center gap-2">
          <div className="flex flex-col justify-center items-end">
            {card?.isBaseReq ? (
              <Tooltip
                position="bottomLeft"
                text={`The ${card?.subtitle} base card has been automatically added to this purchase`}
              >
                <article className="text-[14px] font-medium">
                  ${card?.price}
                </article>
              </Tooltip>
            ) : (
              <article className="text-[14px] font-medium">
                ${card?.price}
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyModel;
