"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight, FaShoppingCart } from "react-icons/fa";
function getRandomNumber() {
  return Math.floor(Math.random() * 500);
}

let athletes = [
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739097867/Screenshot_2025-02-09_at_4.14.10_PM_legiqp.png",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1740169470/6cc543c7501f95370c6dc5bbbe963ba2_zoeuxr.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029418/virat2_sybb2q.jpg",
    name: "Virat kohli",
    follower: "269M Follower",
    userName: "@virat.kohli",
  },
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029423/saurabh2_vamzo5.jpg",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1739253981/saurabh-netravalkar-18083887-3x4_c30f3g.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029422/saurabh1_gsiuhs.jpg",
    name: "Saurabh Netravalkar",
    follower: "279k Follower",
    userName: "@saurabh_netra",
  },
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1740170631/e6a148c467d450c6c8d1ffca1cad14b7_nw1pvm.jpg",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1740170594/c6638c68d71f3ff8b24c8466d905be73_p0dxwt.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029425/pat-2_ztrd9w.jpg",
    name: "Pat Cummins",
    follower: "2.7M Follower",
    userName: "@patcummins30",
  },
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1740170884/300977739_465842005420340_1774352181842140132_n_gxvjtd.jpg",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1740170807/Snapinst.app_469389110_902832755318768_273982680358117391_n_1080_nxyfoe.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029426/travis2_qhahtz.jpg",
    name: "Travis Head",
    follower: "738k Follower",
    userName: "@travishead34",
  },
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1740171767/274862050_977672032953859_1507928203217342135_n_kc57sz.jpg",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1740171721/Snapinst.app_452231544_18346903018136789_5150852819962310517_n_1080_vk0cu6.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029427/maxwell1_tbhxvp.jpg",
    name: "Glen Maxwell",
    follower: "3.8M Follower",
    userName: "@gmaxi_32",
  },
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1740171891/313195720_164807286159690_787137119694809169_n_cgu9su.jpg",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1740171851/Snapinst.app_472946464_18481627114038973_2649952449051746334_n_1080_yiw4r4.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029421/fa_du1_gwe7jd.jpg",
    name: "Faf du Plessis",
    follower: "5M Follower",
    userName: "@fafdup",
  },
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1740172018/306389835_774321380448510_8427499106345754732_n_dvmv85.jpg",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1740171995/Snapinst.app_476730404_18449335078078709_1861772442706738766_n_1080_pekdwt.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029426/rashid2_qavxdr.jpg",
    name: "Rashid Khan",
    follower: "10.7M Follower",
    userName: "@rashid.khan19",
  },
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1740172114/425346093_370218679063039_4624103979891645943_n_unyoxv.jpg",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1740172111/Snapinst.app_386607701_341431691703075_3928211899128511026_n_1080_fdun8o.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029416/rachin2_tds6su.jpg",
    name: "Rachin Ravindra",
    follower: "728k Follower",
    userName: "@rachinravindra",
  },
  {
    profileImage:
      "https://res.cloudinary.com/dv667zlni/image/upload/v1740172293/273701557_1116370359126632_139685184121398064_n_kony1z.jpg",
    verticalImage:
      // "https://res.cloudinary.com/dv667zlni/image/upload/v1740172298/Snapinst.app_117304241_324450735588270_7171690364770925328_n_1080_hkruor.jpg",
      "https://res.cloudinary.com/dv667zlni/image/upload/v1739029418/laim1_km1qqq.jpg",
    name: "Liam Plunkett",
    follower: "91.9k Follower",
    userName: "@pudsy190",
  },
];

const TribesPlayerCards = () => {
  const swiperRef = useRef(null);

  const Card = ({ ath }) => {
    const [isHover, setIsHover] = useState(false);

    return (
      <div
        className="relative w-[280px] h-full rounded-lg bg-secondary overflow-hidden transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* images */}
        <div className="absolute top-0 left-0 w-full h-full rounded-lg">
          <Image
            src={ath?.verticalImage}
            alt="bg"
            width={500}
            height={500}
            className={`relative w-full h-full object-cover brightness-90 object-top transition-all duration-300 ${
              isHover ? "scale-105" : "scale-100"
            }`}
          />
        </div>
        {/* layer */}
        <div className="absolute top-0 left-0 w-full h-full  bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent p-2 flex flex-col justify-end items-start">
          {/* content */}
          <div className="flex justify-start items-center gap-2">
            <div className="relative w-[55px] h-[55px] border-2 border-white border-opacity-30 rounded-full p-[2px]">
              <div className="relative w-full h-full bg-secondary rounded-full">
                <Image
                  src={ath?.profileImage}
                  alt="bg"
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-start ">
              <span className="text-[10px] font-inter">{ath?.userName}</span>
              <div className="flex  justify-start items-center">
                <article className="text-sm font-inter font-semibold">
                  {ath?.name}
                </article>
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              </div>
            </div>
          </div>
          {/* cart */}
          <div className="absolute top-4 left-4 flex justify-start items-center gap-2">
            <FaShoppingCart size={20}/>
            <span className="font-inter text-xs font-bold">${getRandomNumber()}.00</span>
          </div>
        </div>
      </div>
    );
  };

  const slideLeft = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const slideRight = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="relative w-full h-[325px]  flex justify-center items-center gap-2">
      <div
        className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 flex justify-center items-center cursor-pointer transition-all duration-300"
        onClick={slideLeft}
      >
        <FaAngleLeft size={18} className="text-white" />
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={3.8}
        spaceBetween={30}
        className="mySwiper h-[325px]"
        loop={true}
      >
        {athletes?.map((ath, idx) => {
          return (
            <SwiperSlide className="relative h-[325px]">
              <Card ath={ath} key={idx} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="px-2 h-full rounded-lg bg-white bg-opacity-0 hover:bg-opacity-10 flex justify-center items-center cursor-pointer transition-all duration-300"
        onClick={slideRight}
      >
        <FaAngleRight size={18} className="text-white" />
      </div>
    </div>
  );
};

export default TribesPlayerCards;
