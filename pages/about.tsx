import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import Footers from "../core/Components/Widgets/Copyright";

const Index = () => {
  const router = useRouter();
  let html = `
     <body class="policy-container">
    <p class="c3">
      <span class="c5"
        >MVPz is a U.S.-based company set on making the sports sector more equitable for athletes by empowering them to autonomously monetize their name, image, and likeness (NIL) through social interactions with their fanbase. 


</span
      >
    </p>
     <p class="c3">
      <span class="c5"
        >By providing athletes with a platform that facilitates fan-athlete interactions with novel forms of monetization, MVPz allows them to benefit financially from their personal brand without relying solely on sponsorship deals.
 


</span
      >
    </p>
        </p>
     <p class="c3">
      <span class="c5"
        >Our mission is to create a widely accessible, athlete-driven social hub that rewards engagement, strengthens athlete-fan relationships, and provides athletes with additional support, resources, and opportunities.
 


</span
      >
    </p>
   
  </body>`;
  return (
    <div className="relative w-full h-full">
      {/* header */}
      <div className="relative w-full h-[350px]">
        <Image
          src={`/images/home/main-bg.png`}
          alt="poster"
          width={2000}
          height={2000}
          className="relative w-full h-full object-cover "
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent md:p-10 p-5 flex flex-col ">
          <div className="flex justify-between items-center">
            <div
              className="flex justify-start items-center font-inter font-semibold text-white gap-2 cursor-pointer"
              onClick={() => router.back()}
            >
              <FaChevronLeft size={14} />
              <span className="text-[14px]">Back</span>
            </div>
           
          </div>
          <div className="w-full flex-1" />
          <div className="relative w-full space-y-4 ">
            <article className="font-monumentUltraBold text-4xl">
              About
            </article>
            <span className="text-[12px] font-inter font-extrabold opacity-50">
             Who we are and what we do!
            </span>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="w-full md:p-10 p-5 policy-container min-h-[500px]">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>


      <div className="md:px-10 px-5 py-5 border-t border-white border-opacity-10">
        <Footers />
      </div>
    </div>
  );
};

export default Index;
