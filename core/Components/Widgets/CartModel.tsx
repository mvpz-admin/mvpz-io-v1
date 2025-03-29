import React, { useState } from "react";
import {
  useCartStore,
  useLoginProcessStore,
} from "../../../store/useGlobalStore";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { FaCaretDown, FaTrash } from "react-icons/fa";
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

  // Calculate total price from cart items
    const calculateTotalPrice = (cart) => {
      return cart.reduce((total, item) => {
        if (item.productType === "card") {
          const baseCardPrice = item.card.baseCard?.price || 0;
          const enhancementsPrice = item.card.cardProductEnhancementCard.reduce(
            (sum, enhancement) => sum + Number(enhancement.price || 0),
            0
          );
          return total + baseCardPrice + enhancementsPrice;
        }
        
        if (item.productType === "apparel") {
          const apparelPrice = item.apparel?.price * item.apparel?.qty || 0;
          return total + apparelPrice;
        }
        
        return total;
      }, 0);
    };

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
            <div className="relative flex-1 w-full h-full overflow-y-auto scroller-hidden space-y-2">
              {cart?.map((item, idx) => {
                return displayItem(item);
              })}
            </div>
            {/* footer */}
            {cart?.length > 0 && (
              <div className="relative px-6 py-6 border-t border-white border-opacity-20 font-inter font-bold flex flex-col  gap-5">
                <>
                  <div className="flex justify-between items-center font-inter  font-semibold w-full  ">
                    <article>Total Price</article>
                    <article className="text-[14px]">
                      ${calculateTotalPrice(cart).toFixed(2)}
                    </article>
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
              </div>
            )}
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

function displayItem(item) {
  switch (item.productType) {
    case "card":
      return <CardItem card={{ ...item, ...item?.card }} />;
    case "apparel":
      return <ApparelItem apparel={item.apparel} />;
    default:
      return null;
  }
}

const CardItem = ({ card }) => {
  return card?.cardProductEnhancementCard?.length > 0 ? (
    <BaseEnhancementCardItem card={card} />
  ) : (
    <BaseCardItem card={card} />
  );
};

const BaseCardItem = ({ card }) => {
  const [isHover, setIsHover] = useState(false);
  const { removeFromCartCard } = useCartStore((state) => state);

  return (
    <div
      className="relative w-full px-6 py-2 hover:bg-ternary transition-all duration-300 rounded-lg font-inter"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative w-full flex justify-between items-center">
        {/* left side */}
        <div className="flex justify-start items-center gap-2 flex-1 w-full">
          <div className="relative w-[55px] h-[55px] rounded-lg border border-white border-opacity-10 overflow-hidden">
            <Image
              src={card?.baseCard?.thumnail || card?.baseCard?.image}
              alt="thumbnail"
              width={500}
              height={500}
              className="relative w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center items-start font-inter">
            <article className="font-semibold text-[14px]">
              {card?.baseCard?.title}
            </article>
            <article className="font-medium text-[12px] opacity-50">
              Base Card
            </article>
          </div>
        </div>
        {/* right side */}
        <div className="flex justify-start items-center gap-2">
          <div className="flex flex-col justify-center items-end">
            <article className="text-[14px] font-medium">
              ${Number(card?.baseCard?.price || 0).toFixed(2)}
            </article>
          </div>

          {isHover && (
            <FaTrash
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                removeFromCartCard(card.id, card.baseCard.id, "Base Card");
              }}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const BaseEnhancementCardItem = ({ card }) => {
  const [isHover, setIsHover] = useState(false);
  const { removeFromCartCard } = useCartStore((state) => state);
  const [collapse, setCollapse] = useState(true);

  const EnhancementCardItem = ({ card, isLast }) => {
    const [isEnhHover, setIsEnhHover] = useState(false);
    return (
      <div className="relative  w-full ">
        <Tooltip
          position="bottomRight"
          text="This Enhnacement will be top enhancment card"
          showTooltip={isLast}
        >
          <div
            className="bg-ternary w-full"
            onMouseEnter={() => setIsEnhHover(true)}
            onMouseLeave={() => setIsEnhHover(false)}
          >
            <div className="relative w-full py-2  transition-all duration-300 rounded-lg font-inter">
              <div className="relative w-full flex justify-between items-center">
                <div className="flex justify-start items-center gap-2 flex-1 w-full">
                  <div className="relative w-[55px] h-[55px] rounded-lg border border-white border-opacity-10 overflow-hidden">
                    <Image
                      src={card?.image}
                      alt="thumbnail"
                      width={500}
                      height={500}
                      className="relative w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center items-start font-inter">
                    <article className="font-semibold text-[14px]">
                      {card?.title}
                    </article>
                    <article className="font-medium text-[12px] opacity-50">
                      Base Card
                    </article>
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="flex flex-col justify-center items-end">
                    <article className="text-[14px] font-medium">
                      ${Number(card?.price || 0).toFixed(2)}
                    </article>
                  </div>
                  {isEnhHover && (
                    <IoClose
                      size={18}
                      onClick={() =>
                        removeFromCartCard(
                          card?.avatarBaseCard?.id,
                          card.id,
                          "Enhancement"
                        )
                      }
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Tooltip>
      </div>
    );
  };

  return (
    <div className="bg-ternary space-y-4">
      <div className="relative w-full px-6 py-2  transition-all duration-300 rounded-lg font-inter space-y-4">
        <div
          className="relative w-full flex justify-between items-center"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* left side */}
          <div className="flex justify-start items-center gap-2 flex-1 w-full">
            <div className="relative w-[55px] h-[55px] rounded-lg border border-white border-opacity-10 overflow-hidden">
              <Image
                src={card?.baseCard?.thumnail || card?.baseCard?.image}
                alt="thumbnail"
                width={500}
                height={500}
                className="relative w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center items-start font-inter">
              <article className="font-semibold text-[14px]">
                {card?.baseCard?.title}
              </article>
              <article className="font-medium text-[12px] opacity-50">
                {card?.baseCard?.serialNumber
                  ? card?.baseCard?.serialNumber
                  : "Base Card"}
              </article>
            </div>
          </div>
          {/* right side */}
          <div className="flex justify-start items-center gap-2">
            <div className="flex flex-col justify-center items-end">
              <article className="text-[14px] font-medium">
                ${Number(card?.baseCard?.price || 0).toFixed(2)}
              </article>
            </div>

            {isHover && (
              <FaTrash
                size={18}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCartCard(card.id, card.baseCard.id, "Base Card");
                }}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        {/* enhancement cards */}
        <div className="pl-5  border-t border-white border-opacity-10 py-5">
          <div className="flex justify-between items-center font-inter text-[10px] font-semibold   m ">
            <article>
              {card?.cardProductEnhancementCard?.length} Enhancemnet
            </article>
            <div
              className="flex justify-between items-center gap-1"
              onClick={() => setCollapse(!collapse)}
            >
              <article className="cursor-pointer ">
                {collapse ? "Hide Items" : "View All"}
              </article>
              <FaCaretDown
                size={16}
                className={`${
                  collapse ? "rotate-180" : ""
                } transition-all duration-300`}
              />
            </div>
          </div>
          {collapse && (
            <div className="relative w-full">
              {card?.cardProductEnhancementCard?.map((enhancement, idx) => (
                <EnhancementCardItem
                  key={idx}
                  card={enhancement}
                  isLast={idx === card?.cardProductEnhancementCard?.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ApparelItem = ({ apparel }) => {
  const [isHover, setIsHover] = useState(false);
  const { removeFromCartApparel } = useCartStore((state) => state);
  return (
    <div
      className="relative w-full px-6 py-2 hover:bg-ternary transition-all duration-300 rounded-lg font-inter"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative w-full flex justify-between items-center">
        {/* left side */}
        <div className="flex justify-start items-center gap-2 flex-1 w-full">
          <div className="relative w-[55px] h-[55px] rounded-lg border border-white border-opacity-10 overflow-hidden">
            <Image
              src={apparel?.thumbnail}
              alt="thumbnail"
              width={500}
              height={500}
              className="relative w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center items-start font-inter">
            <article className="font-semibold text-[14px]">
              {apparel?.title?.substring(0, 40)}...
            </article>
            <div className="flex justify-start items-center">
              <article className="font-medium text-[12px] opacity-50">
                Size : {apparel?.size}
              </article>
              <div className="w-1 h-1 rounded-full bg-white bg-opacity-50 mx-2"></div>
              <article className="font-medium text-[12px] opacity-50">
                Qauntity : {apparel?.qty}
              </article>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex justify-start items-center gap-2">
          <div className="flex flex-col justify-center items-end">
            <article className="text-[14px] font-medium">
              ${Number(apparel?.price || 0).toFixed(2)}
            </article>
          </div>

          {isHover && (
            <FaTrash
              size={18}
              onClick={(e) => {
                e.stopPropagation();
                removeFromCartApparel(apparel.id);
              }}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CartModel;
