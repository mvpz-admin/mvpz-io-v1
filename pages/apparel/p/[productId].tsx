import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import Footer from "../../../core/Components/Widgets/Footer";
import { callAPI } from "../../../lib/utils";
import { useRouter } from "next/router";
import { useBuyStore, useCartStore } from "../../../store/useGlobalStore";
import { FaArrowLeft } from "react-icons/fa";
let product = {
  id: "67dc0eb2e3349a9f6791b6bd",
  name: "Illuso Soft Special Double-Sided Basic Plain Hoodie",
  description:
    "Shipping will begin within the specified period; the arrival date may differ by order, as additional delivery time from logistic companies will be required after dispatch. The shipping start date may change depending on products and logistics situations. We will keep you updated on any changes.",
  thumbnail:
    "https://d1flfk77wl2xk4.cloudfront.net/Assets/12/381/XXL_p0197538112.jpg",
  tags: ["ATHLETE_MERCHANDISE", "BEST_SELLER", "NEW_ARRIVAL"],
  price: {
    netPrice: "58.50",
    orignalPrice: "65.00",
    discount: 10,
  },
  discountPercent: 10,
  sizeQuantities: [
    {
      size: "M",
      quantity: 10,
    },
    {
      size: "L",
      quantity: 10,
    },
    {
      size: "XL",
      quantity: 10,
    },
  ],
  images: [
    "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463255/084135178165359.64e389de863de_ml3pyg.jpg",
    "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463211/bda245178165359.64e389df699ec_qnpftt.jpg",
    "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463129/d66aa6178165359.64e389df66987_rb97xo.gif",
  ],
  productInfo: [
    {
      key: "Brand",
      value: "Alpha Industries",
    },
    {
      key: "Product Material",
      value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
    },
    {
      key: "Size Guide",
      value:
        "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
    },
    {
      key: "Contents",
      value: "1EA",
    },
    {
      key: "Manufacturer",
      value: "ALPHA INDUSTRIES INC.",
    },
    {
      key: "Country of Manufacture",
      value: "China",
    },
    {
      key: "Manufacturing Date",
      value: "2024.09",
    },
    {
      key: "Care Instructions",
      value:
        "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
    },
    {
      key: "Quality Assurance",
      value:
        "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
    },
    {
      key: "Customer Support",
      value: "Weverse Shop Customer Center: 1544-0790",
    },
    {
      key: "Business Information",
      value:
        "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
    },
  ],
  tribeId: null,
  athleteId: "67a5c0380d9c26cff12b2056",
  tribe: null,
  athlete: {
    id: "67a5c0380d9c26cff12b2056",
    name: "Virat Kohli",
    username: "@virat.kohli",
    profileImage:
      "https://f005.backblazeb2.com/file/mvpz-crickit/user-profiles/prod/@virat.kohli/profile.png",
  },
  isNewArrival: true,
};

const Index = () => {
  const [pageData, setPageData] = useState<any>([]);
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [pageError, setPageError] = useState(false); // TODO : Later change
  const [selectedQty, setSelctedQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();

  const { checkIdInCard, addToCartApparel, removeFromCartApparel } =
  useCartStore((state) => state);
  const { addToBuy } = useBuyStore((state) => state);

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: `/v1/apparel/p/${router.query.productId}`,
      });

      setPageData(response?.data);
      setSelectedImage(response?.data?.thumbnail);
      setSelectedSize(response?.data?.sizeQuantities[0]?.size);
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false);
  };

  useEffect(() => {
    if (router.query.productId) {
      handleFetchPageData();
    }
  }, [router.query.productId]);


  

  const handleQty = ({ eventType }: { eventType: "Inc" | "Dec" }) => {
    if (eventType == "Inc") {
      setSelctedQty(selectedQty >= 12 ? selectedQty : selectedQty + 1);
    }

    if (eventType == "Dec") {
      setSelctedQty(selectedQty == 1 ? 1 : selectedQty - 1);
    }
  };

  const handleAddToCart = () => {
    if(checkIdInCard(pageData?.id)){
      removeFromCartApparel(pageData?.id);
    }else{
      addToCartApparel({
        id: pageData?.id,
        productType: "apparel",
        apparel: {
          size: selectedSize,
          qty: selectedQty,
          title: pageData?.name,
          thumbnail: pageData?.thumbnail,
          price: pageData?.price?.netPrice,
          id: pageData?.id,
        },
      });
    }
  };

 const handleBuyNow = () => {
  addToBuy({
    id: product.id,
    productType: "apparel",
    apparel: {
      size: selectedSize,
      qty: selectedQty,
      title: pageData?.name,
      thumbnail: pageData?.thumbnail,
      price: pageData?.price?.netPrice,
      id: pageData.id,
    },
  });
 }


  return (
    !pageDataLoading &&
    <div className="relative w-full h-screen bg-secondary overflow-y-auto md:pt-[128px] pt-[20px] font-inter space-y-20">
      <div className="relative w-full space-y-10 md:px-[100px] px-5">
        {/* go back button */}
      <div className="flex justify-start items-center ">
        <div className="flex justify-center items-center cursor-pointer gap-2" onClick={() => router.back()}>
          <FaArrowLeft size={20} />
          <article className="text-[16px] font-bold">Back</article>
        </div>
      </div>
      {/* top section */}
      <div className="relative w-full md:h-[600px]  grid md:grid-cols-[45%,55%] grid-cols-1 gap-10">
        {/* left side */}
        <div className="w-full md:h-full h-[400px] flex justify-center items-start gap-5 overflow-y-auto scroller-hidden">
          <div className="flex-[0.2] w-full gap-2 space-y-2">
            {
              pageData?.images?.map((img, idx) => {
                return (
                  <div className="w-full h-[200px] rounded-lg overflow-hidden" key={idx} onClick={() => setSelectedImage(img)}>
                    <Image src={img} alt={"title"} width={300} height={300} className={`rounded-lg h-full w-full object-cover transition-all duration-300 `} />
                  </div>
                )
              })
            }
          </div>
          <div className="flex-[0.8] w-full h-full rounded-xl overflow-hidden sticky top-0">
          <Image
            src={selectedImage}
            alt={"title"}
            width={300}
            height={300}
            className={`rounded-lg h-full w-full object-cover transition-all duration-300 `}
          />
          </div>
        </div>
        <div className="w-full h-full rounded-xl overflow-hidden  md:pr-40">
          {/* name */}
          <article className="text-lg font-semibold mb-2">
            {pageData?.name}
          </article>
          {/* tags */}
          <div className="flex justify-start items-center gap-1 flex-wrap">
            {pageData?.tags?.map((tag) => (
              <TagBlock tag={tag} />
            ))}
          </div>
          {/* price */}
          <div className="relative w-full my-5">
            {pageData?.price?.discount > 0 ? (
              <div className="relative space-y-1">
                <div className="relative flex  justify-start items-center gap-1">
                  <article className="text-[12px] font-bold text-red-500">
                    {pageData?.price?.discount}% OFF
                  </article>
                  <del className="text-[12px]  leading-[20px]">
                    ${pageData?.price?.orignalPrice}
                  </del>
                </div>
                <article className="text-[24px] font-bold leading-[20px]">
                  ${pageData?.price?.netPrice}
                </article>
              </div>
            ) : (
              <article className="text-[18px] font-bold">
                ${pageData?.price?.netPrice}
              </article>
            )}
          </div>
          {/* size */}
          <div className="flex justify-start items-center gap-2 flex-wrap">
            {pageData?.sizeQuantities?.map((sizeQ) => (
              <SizeBlock sizeQ={sizeQ} setSelectedSize={setSelectedSize} selectedSize={selectedSize}/>
            ))}
          </div>
          {/* Qty */}
          <div className="w-full p-3 border border-white border-opacity-20 rounded-lg my-5">
            <article className="text-[16px] font-semibold mb-5">
              Quantity
            </article>
            <div className="flex justify-between items-center">
              {/* counter */}
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
              {/* Total Price */}
              <div className="text-[14px] font-bold">
                ${(Number(pageData?.price?.netPrice) * selectedQty).toFixed(2)}
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="flex justify-between items-center">
            {/* left side */}
            <div className="relative">
              <article className="font-medium text-[14px]">
                {selectedQty} selected
              </article>
              <article className="text-[14px] text-white text-opacity-50">
                You can purchase up to 12.
              </article>
            </div>
            {/* Right Side */}
            <article className="text-[18px] font-bold">
              ${(Number(pageData?.price?.netPrice) * selectedQty).toFixed(2)}
            </article>
          </div>
          {/* Actions */}
          <div className=" justify-center items-center grid grid-cols-2 gap-5 my-5">
            <div className=" h-10 w-full rounded-lg bg-primary border-2 border-primary  flex justify-center items-center gap-2" onClick={handleBuyNow}>
              <FaBagShopping size={20} />{" "}
              <article className="text-[16px] font-bold">Buy Now</article>
            </div>
            <div className=" h-10 w-full rounded-lg border-2 border-primary flex justify-center items-center" onClick={handleAddToCart}>
              <article className="text-[16px] font-bold text-primary">
                {checkIdInCard(pageData?.id) ? "Remove From Cart" : "Add To Cart"}
              </article>
            </div>
          </div>
          {/* decription */}
          <div className="relative w-full space-y-4">
            {/* header */}
            <div className="pb-2 border-b border-white border-opacity-20">
              <article className="text-[14px] font-bold">Description</article>
            </div>
            {/* descriptions */}
            <div className="text-[12px]">{pageData?.description}</div>
          </div>
        </div>
      </div>
      </div>
      {/* bottom section */}
      <div className="relative w-full space-y-10">
    
        {/* Sections */}
        <div className="relative w-full md:px-[100px] px-5">

       
        <div className="relative w-full h-[1px] bg-white bg-opacity-20 my-5"/>
        <ProducrInformations productInfo={pageData?.productInfo}/>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const TagBlock = ({ tag }) => {
  return (
    <div className=" py-1 px-2 bg-ternary rounded-lg text-[10px] ">{tag}</div>
  );
};

const SizeBlock = ({ sizeQ, setSelectedSize, selectedSize }) => {
  return (
    <div className={`w-10 h-10 rounded-lg border border-white border-opacity-20 flex justify-center items-center cursor-pointer bg-white bg-opacity-10 ${selectedSize == sizeQ.size ? " bg-opacity-40" : ""}`} onClick={() => setSelectedSize(sizeQ.size)}>
      {sizeQ.size}
    </div>
  );
};

const ProducrInformations = ({ productInfo }) => {
    const [showMore, setShowMore] = useState(false);
    return (
      <div
        className={`relative w-full ${
          showMore ? "h-auto" : "h-[600px]"
        }  overflow-hidden space-y-2`}
        id="information"
      >
        <article className="text-[14px] font-bold">Information</article>
        <div className="relative w-full">
        {productInfo?.map((info, idx) => {
          return (
            <div className="w-full  grid md:grid-cols-[10%,90%] grid-cols-[25%,75%] text-[12px] border-t border-white border-opacity-10">
                {/* div */}
                <div className="relative w-full bg-black p-2">
                    {
                        info?.key
                    }
                </div>
                <div className="relative w-full  p-2">
                    {
                        info?.value
                    }
                </div>
            </div>
          );
        })}
        </div>
        {/* absolute */}
        <div className={showMore ? "relative w-full h-auto my-2" : "absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-black to-transparent flex justify-center items-end p-5"}>
          <div className="w-full py-5 flex justify-center items-center font-bold border border-white border-opacity-20 cursor-pointer rounded-lg" onClick={() => setShowMore(!showMore)}>{showMore ? "Show Less" : "Show More"}</div>
        </div>
      </div>
    );
  };

export default Index;
