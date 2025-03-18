import React, { useState } from "react";
import {
  useCartStore,
  useLoginProcessStore,
} from "../../../store/useGlobalStore";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Tooltip from "../../Atoms/Others/Tooltip";
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";
import { callAPI } from "../../../lib/utils";
import { useAuthStore } from "../../../store/useAuthStore";

const CartModel = () => {
  const { setCloseModel, openModel, cart, totalProd, clearCart } = useCartStore(
    (state) => state
  );
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const isLoggedIn = useAuthStore((state) => state.user);
  const [initiateLoading, setInitiateLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuy = async () => {
    setError(null);
    if (isLoggedIn?.token) {
      setInitiateLoading(true);
      const response = await callAPI({
        endpoint: `/v1/purchase/cart/initiate`,
        method: "POST",
        body: { cart },
      });

      if (!response.success) {
        setInitiateLoading(false);
        return setError(response.error);
      }

      clearCart();
      window.location.href = response?.data?.checkoutUrl;

      setInitiateLoading(false);
    } else {
      setOpenLoginModel();
    }
  };
  return (
    <div
      className={`fixed top-0 ${
        openModel ? "right-0" : "-right-[100%]"
      } w-full h-full z-50 transition-all duration-100`}
    >
      {/* bg */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={setCloseModel}
      >
        {/* conte */}
        <div
          className="absolute top-0 right-0 md:w-[400px] w-full h-screen rounded-3xl bg-[#111] bg-opacity-90 !backdrop-blur-xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="relative px-6 py-6 border-b border-white border-opacity-20 font-inter font-bold flex justify-between items-center ">
            <article className="text-xl"> Your Cart</article>
            <IoClose size={30} onClick={setCloseModel} />
          </div>
          {/* content */}
          <div className="w-full flex-1 h-full flex flex-col  overflow-y-auto">
            <div className="flex justify-between items-center font-inter text-[14px] font-semibold  px-6 py-6  ">
              <article>{totalProd} items</article>
              <article
                className="cursor-pointer hover:underline"
                onClick={clearCart}
              >
                Clear All
              </article>
            </div>
            <div className="relative flex-1 w-full h-full overflow-y-auto scroller-hidden">
              {cart?.map((card, idx) => {
                return <CardItem card={card} key={idx} />;
              })}
            </div>
            {/* footer */}
            {cart?.length > 0 && <div className="relative px-6 py-6 border-t border-white border-opacity-20 font-inter font-bold flex flex-col  gap-5">
              <>
                <div className="flex justify-between items-center font-inter  font-semibold w-full  ">
                  <article>Total Price</article>
                  <article className="text-[14px]">${cart.reduce((total, item) => total + item.price, 0)}</article>
                </div>
                <button
                  className="w-full py-3 rounded-xl bg-primary "
                  onClick={handleBuy}
                >
                  Complete Puchase
                </button>
              </>

              {/*  */}
              {initiateLoading && (
                <div className="absolute top-0 left-0 w-full">
                  <LineLoadingEffect />
                </div>
              )}
            </div>}
          </div>
        </div>
        {/* layer */}
        {initiateLoading && (
          <div className="absolute top-0 left-0 w-full h-full z-10" />
        )}
      </div>
    </div>
  );
};

const CardItem = ({ card }) => {
  const [isHover, setIsHover] = useState(false);
  const { removeFromCart } = useCartStore((state) => state);
  return (
    <div
      className="relative w-full px-6 py-2 hover:bg-ternary transition-all duration-300 rounded-lg font-inter"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
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

          {isHover && (
            <FaTrash
              size={18}
              onClick={() => removeFromCart(card?.id)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModel;
