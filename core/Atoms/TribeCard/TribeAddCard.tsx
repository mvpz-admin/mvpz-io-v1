import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";



const CardInfo = () => {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      {/* <article className="text-[60px] text-ternary leading-[60px]">+</article> */}
      <article className="text-xl font-bold text-ternary text-center">Explore <br/>  Tribe</article>
    </div>
  );
};

const TribeAddCard = () => {
  const router = useRouter()
  return (
    <div className="relative w-[200px] h-[250px] bg-secondary rounded-xl  cursor-pointer " onClick={() => router.push("/fanzone/tribe/search")}>
      <CardInfo />
    </div>
  );
};

export default TribeAddCard;
