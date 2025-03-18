import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaCross } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const FlipCard = ({
  flip = false,
  showBackButton = true,
  onloadFlip = true,
  frontComp = () => (
    <div className="w-full h-full flex justify-center items-center">
      <article className="text-black">Card Front</article>
    </div>
  ),
  backComp = () => (
    <div className="w-full h-full flex justify-center items-center">
      <article className="text-black">Card Back</article>
    </div>
  ),
  cardHeight = "w-[400px]",
  cardWidth = "h-[600px]",
}) => {
  const [flipCard, setFlipCard] = useState(onloadFlip ?  180 : 0);
  const handleFilpRight = () => {
   
    setFlipCard(flipCard + 180);
  };

  const handleFilpLeft = () => {

    setFlipCard(flipCard - 180);
  };

  useEffect(() => {
if(onloadFlip){
  setFlipCard(0)
}
  },[flip])

  const router = useRouter()

  return (
    <>
      {/* crad box */}
      <div className="relative">
        <div
          style={{
            perspective: "500px",
          }}
        >
          {/* card */}
          <div
            className={`relative ${cardWidth} ${cardHeight} bg-secondary shadow-md rounded-[30px] `}
            style={{
              transformStyle: "preserve-3d",
              transition: ".5s ease",
              transform: `rotateY(${flipCard}deg)`,
            }}
          >
            {/* card front */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-md flex justify-center items-center"
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              {frontComp()}
            </div>
            {/* card back */}
            <div
              className="absolute  top-0 left-0 w-full h-full rounded-md flex justify-center items-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {backComp()}
            </div>
          </div>
        </div>
        <div
          className="absolute top-0 left-0 w-[50%] h-full "
          onClick={handleFilpLeft}
        ></div>
        <div
          className="absolute top-0 right-0 w-[50%] h-full "
          onClick={handleFilpRight}
        ></div>
        {/* div */}
        {showBackButton && <div className="absolute md:-top-10 -top-6 md:-right-10 -right-6 md:w-10 w-8 md:h-10 h-8 bg-primary rounded-full flex justify-center items-center" onClick={() => router.back()}>
          <IoClose />
        </div>}
      </div>
    </>
  );
};

export default FlipCard;
