import Image from "next/image";
import React, { useState } from "react";
import { FaBagShopping, FaBucket } from "react-icons/fa6";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { useBuyStore, useCartStore } from "../../../store/useGlobalStore";
import { TiPlus } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";

const ApparelProductCardV1 = ({ product, loading }) => {
  const [isHover, setIsHover] = useState(false);
  const { checkIdInCard, addToCartApparel, removeFromCartApparel } =
    useCartStore((state) => state);
  const { addToBuy } = useBuyStore((state) => state);
  const router = useRouter();
  const [handleOpenBuy, setHandleOpenBuy] = useState(false);
  const [handleOpenCart, setHandleOpenCart] = useState(false);

  const handleAddToBuy = () => {
    setHandleOpenBuy(true);
  };

  const handleAddToCart = () => {
    setHandleOpenCart(true);
   
  };

  const handleSelectForBuy = ({ size, qty }) => {
    addToBuy({
      id: product.id,
      productType: "apparel",
      apparel: {
        size,
        qty,
        title: product?.name,
        thumbnail: product?.thumbnail,
        price: product?.price?.netPrice,
        id: product.id,
      },
    });
    setHandleOpenBuy(false);
  };

  const handleSelectForCart = ({ size, qty }) => {
    setHandleOpenCart(false);
    addToCartApparel({
      id: product.id,
      productType: "apparel",
      apparel: {
        size,
        qty,
        title: product?.name,
        thumbnail: product?.thumbnail,
        price: product?.price?.netPrice,
        id: product.id,
      },
    });
  };

  return (
    <div
      className="relative w-full space-y-3 font-inter"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => router.push(`/apparel/p/${product.id}`)}
    >
      {/* product image */}
      <div className="relative w-full h-[400px]  overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className={` h-full w-full object-cover transition-all duration-300 ${
            isHover ? "scale-125" : "scale-1"
          }`}
        />
        {/* controller */}
        {/* isArrival */}
        {product?.isNewArrival && (
          <div className="absolute top-2 left-2 py-1 px-2 bg-ternary rounded-lg text-[10px]">
            New Arrival
          </div>
        )}
        {/* add to cart */}
        {!loading && (
          <>
            {(isHover || checkIdInCard(product?.id)) && (
              <div
                className={`absolute top-2 right-2 h-10 w-10 rounded-full bg-primary flex justify-center items-center transition-all duration-300 `}
              >
                {!checkIdInCard(product?.id) ? (
                  <div
                    className="relative h-8 w-8 rounded-full bg-primary flex justify-center items-center transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart();
                    }}
                  >
                    {" "}
                    <TiPlus size={18} className="text-white" />
                  </div>
                ) : (
                  <div
                    className="relative h-8 w-8 rounded-full bg-primary flex justify-center items-center transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCartApparel(product.id);
                    }}
                  >
                    <FaCheck size={18} className="text-white" />
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Buy Button */}
        {!loading && (
          <div
            className={`absolute bottom-0 left-0 w-full h-[40px] bg-primary flex justify-start items-center transition-all duration-300 ${
              isHover ? "translate-y-0" : "translate-y-10"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToBuy();
            }}
          >
            <div className="w-full h-full flex justify-center items-center gap-2">
              <FaBagShopping size={20} />{" "}
              <article className="text-[14px] font-bold">Buy Now</article>
            </div>
          </div>
        )}

        {/* select size  & qty */}
        {handleOpenBuy && (
          <SizeANdQtyModelForBuy
            sizeAavailable={product?.sizeQuantities}
            handleSelectForBuy={handleSelectForBuy}
            handleClose={() => setHandleOpenBuy(false)}
          />
        )}

        {handleOpenCart && (
          <SizeANdQtyModelForCart
            sizeAavailable={product?.sizeQuantities}
            handleSelectForCart={handleSelectForCart}
            handleClose={() => setHandleOpenCart(false)}
          />
        )}
      </div>
      {/* info */}
      <div className="   py-2 w-full space-y-2 bg-black bg-opacity-50 backdrop-blur-xl">
        <article className="text-[12px] font-medium">{product?.name}</article>
        {/* price section */}
        <div className="relative w-full">
          {product?.price?.discount > 0 ? (
            <div className="flex justify-start items-center gap-2">
              <div className="relative flex flex-col justify-center items-start">
                <del className="text-[8px]  leading-[10px]">
                  ${product?.price?.orignalPrice}
                </del>
                <article className="text-[14px] font-bold leading-[10px]">
                  ${product?.price?.netPrice}
                </article>
              </div>
              <article className="text-[12px] font-bold text-red-500">
                {product?.price?.discount}% OFF
              </article>
            </div>
          ) : (
            <article className="text-[14px] font-bold">
              ${product?.price?.netPrice}
            </article>
          )}
        </div>
      </div>
    </div>
  );
};

const SizeANdQtyModelForBuy = ({
  sizeAavailable,
  handleClose,
  handleSelectForBuy,
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  const handleQty = ({ eventType }: { eventType: "Inc" | "Dec" }) => {
    if (eventType == "Inc") {
      setSelectedQty(selectedQty >= 12 ? selectedQty : selectedQty + 1);
    }

    if (eventType == "Dec") {
      setSelectedQty(selectedQty == 1 ? 1 : selectedQty - 1);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-xl "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
        <div className="relative w-full px-2 space-y-2 flex flex-col justify-center items-center">
          <article className="text-[14px] font-bold mb-2">Select Size</article>
          <div className="w-full flex flex-wrap justify-center items-center gap-2">
            {sizeAavailable?.map((size) => (
              <div
                className={`w-10 h-10 bg-white bg-opacity-10 border  border-white  border-opacity-20 cursor-pointer flex justify-center items-center rounded-lg ${
                  selectedSize == size?.size
                    ? "bg-white bg-opacity-50 "
                    : "bg-white bg-opacity-20"
                }`}
                onClick={() => setSelectedSize(size?.size)}
              >
                <article className="text-[14px] font-bold">
                  {size?.size}
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-full px-2 space-y-2 flex flex-col justify-center items-center">
          <article className="text-[14px] font-bold mb-2">Select Qty</article>
          <div className="inline-flex justify-start items-center gap h-8 rounded-md border border-white border-opacity-20 bg-white bg-opacity-10">
            <div
              className="w-8   flex justify-center items-center cursor-pointer "
              onClick={() => handleQty({ eventType: "Dec" })}
            >
              -
            </div>
            <div className="w-16   flex justify-center items-center cursor-pointer border-x border-white border-opacity-20 text-[14px]">
              {selectedQty}
            </div>
            <div
              className="w-8  flex justify-center items-center cursor-pointer "
              onClick={() => handleQty({ eventType: "Inc" })}
            >
              +
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[40px] bg-primary flex justify-center items-center">
          <div
            className={`flex-[0.5] w-full h-full flex justify-center items-center ${
              !selectedSize
                ? "bg-black bg-opacity-50 cursor-not-allowed"
                : "bg-transparent cursor-pointer"
            }`}
            onClick={() =>
              selectedSize &&
              handleSelectForBuy({ size: selectedSize, qty: selectedQty })
            }
          >
            <article className="text-[14px] font-bold">Buy Now</article>
          </div>
          <div className="h-full w-[1px] bg-white bg-opacity-20" />
          <div
            className="flex-[0.5]  w-full h-full flex justify-center items-center cursor-pointer"
            onClick={handleClose}
          >
            <article className="text-[14px] font-bold">Cancel</article>
          </div>
        </div>
      </div>
    </div>
  );
};

const SizeANdQtyModelForCart = ({
  sizeAavailable,
  handleClose,
  handleSelectForCart,
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  const handleQty = ({ eventType }: { eventType: "Inc" | "Dec" }) => {
    if (eventType == "Inc") {
      setSelectedQty(selectedQty >= 12 ? selectedQty : selectedQty + 1);
    }

    if (eventType == "Dec") {
      setSelectedQty(selectedQty == 1 ? 1 : selectedQty - 1);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-xl "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
        <div className="relative w-full px-2 space-y-2 flex flex-col justify-center items-center">
          <article className="text-[14px] font-bold mb-2">Select Size</article>
          <div className="w-full flex flex-wrap justify-center items-center gap-2">
            {sizeAavailable?.map((size) => (
              <div
                className={`w-10 h-10 bg-white bg-opacity-10 border  border-white  border-opacity-20 cursor-pointer flex justify-center items-center rounded-lg ${
                  selectedSize == size?.size
                    ? "bg-white bg-opacity-50 "
                    : "bg-white bg-opacity-20"
                }`}
                onClick={() => setSelectedSize(size?.size)}
              >
                <article className="text-[14px] font-bold">
                  {size?.size}
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-full px-2 space-y-2 flex flex-col justify-center items-center">
          <article className="text-[14px] font-bold mb-2">Select Qty</article>
          <div className="inline-flex justify-start items-center gap h-8 rounded-md border border-white border-opacity-20 bg-white bg-opacity-10">
            <div
              className="w-8   flex justify-center items-center cursor-pointer "
              onClick={() => handleQty({ eventType: "Dec" })}
            >
              -
            </div>
            <div className="w-16   flex justify-center items-center cursor-pointer border-x border-white border-opacity-20 text-[14px]">
              {selectedQty}
            </div>
            <div
              className="w-8  flex justify-center items-center cursor-pointer "
              onClick={() => handleQty({ eventType: "Inc" })}
            >
              +
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[40px] bg-primary flex justify-center items-center">
          <div
            className={`flex-[0.5] w-full h-full flex justify-center items-center ${
              !selectedSize
                ? "bg-black bg-opacity-50 cursor-not-allowed"
                : "bg-transparent cursor-pointer"
            }`}
            onClick={() =>
              selectedSize &&
              handleSelectForCart({ size: selectedSize, qty: selectedQty })
            }
          >
            <article className="text-[14px] font-bold">Add To Cart</article>
          </div>
          <div className="h-full w-[1px] bg-white bg-opacity-20" />
          <div
            className="flex-[0.5]  w-full h-full flex justify-center items-center cursor-pointer"
            onClick={handleClose}
          >
            <article className="text-[14px] font-bold">Cancel</article>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApparelProductCardV1;
