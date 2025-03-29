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
import { FaCaretDown, FaTrash } from "react-icons/fa";

const BuyModel = () => {
  const { setCloseModel, openModel, cart } = useBuyStore((state) => state);
  const { setOpenLoginModel } = useLoginProcessStore((state) => state);
  const isLoggedIn = useAuthStore((state) => state.user);
  const [initiateLoading, setInitiateLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotalPrice = (cart) => {
    if (!cart) return 0;
    
    // For apparel products
    if (cart.productType === "apparel") {
      return cart?.apparel?.price * cart?.apparel?.qty || 0;
    }
    
    // For card products
    const baseCardPrice = cart.card?.baseCard?.price || 0;
    const enhancementsPrice =
      cart.card?.cardProductEnhancementCard?.reduce(
        (sum, enhancement) => sum + Number(enhancement.price || 0),
        0
      ) || 0;
    return baseCardPrice + enhancementsPrice;
  };

  const handleBuy = async () => {
    setError(null);
    if (isLoggedIn?.token) {
      setInitiateLoading(true);
      const response = await callAPI({
        endpoint: `/v1/purchase/cart/initiate`,
        method: "POST",
        body: { cart: [cart] },
      });

      if (!response.success) {
        setInitiateLoading(false);
        return setError(response.error);
      }

      window.location.href = response?.data?.checkoutUrl;

      setInitiateLoading(false);
    } else {
      setOpenLoginModel();
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
              <BuyItem item={cart} />
              <div className="w-full h-[1px] bg-white bg-opacity-10 my-5" />
              <div className="relative   font-inter font-bold flex flex-col  gap-5">
                <div className="flex justify-between items-center font-inter  font-semibold w-full  ">
                  <article>Total Price</article>
                  <article className="text-[14px]">
                    ${calculateTotalPrice(cart).toFixed(2)}
                  </article>
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
                      ${calculateTotalPrice(cart).toFixed(2)}
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

const BuyItem = ({ item }) => {
  switch (item?.productType) {
    case "card":
      return <CardItem card={item.card} />;
    case "apparel":
      return <ApparelItem apparel={item.apparel} />;
    default:
      return null;
  }
};

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
      className="relative w-full py-2  transition-all duration-300 rounded-lg font-inter"
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
          <div className="flex flex-1 flex-col justify-center items-start font-inter pr-5">
            <article className="font-semibold text-[14px]">
              {apparel?.title}
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

export default BuyModel;
