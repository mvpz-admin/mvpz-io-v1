import { link } from "fs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsCardList } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoCopyOutline, IoCopy } from "react-icons/io5";



const ShareModel = ({
  title ="Share Post", pathname, callback = null, closeModel = () => {}}) => {
  const [isCopy, setIsCopy] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
  const message = "MVpz New Post";
  const router = useRouter()

  const socialLinks = [
    {
      name: "Twitter",
      image: "/images/social/twitter.png",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Whatsapp",
      image: "/images/social/whatsapp.png",
      url: `https://wa.me/?text=${encodeURIComponent(
        message
      )}%20${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      image: "/images/social/facebook.png",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(message)}`,
    },
    {
      name: "Reddit",
      image: "/images/social/reddit.png",
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent("Mvpz Post")}`,
    },
  ];

  const handleShare = (url) => {
    // updateMetaTags("MVPz Post", "url");
    window.open(url, "_blank");
  }

  const handleCopy = () => {
    const textToCopy = url;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 2000);
    });
  };

  return (
   <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex justify-center items-center">
     <div className="md:w-[40vw] w-[90vw] md:h-[40vh] bg-ternary rounded-xl md:p-10 p-5 space-y-10">
      <div className="flex justify-between items-center">
      <article className="text-2xl font-bold">{title}</article>
        <IoMdClose size={25} className="text-white"  onClick={closeModel}/>
      </div>

      <div className="w-full overflow-x-auto whitespace-nowrap scroller-hidden ">
        <div className="inline-flex flex-col justify-center items-center mr-8 space-y-4 cursor-pointer">
          <div
            className={`relative md:w-[75px] md:h-[75px] w-[55px] h-[55px] object-cover rounded-full border border-white border-opacity-50 ${
              isCopy ? "bg-white" : "bg-transparent"
            } `}
            onClick={handleCopy}
          >
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              {isCopy ? (
                <IoCopy size={25} className="text-ternary" />
              ) : (
                <IoCopyOutline size={25} />
              )}
            </div>
          </div>
          <article className="text-[10px]">
            {isCopy ? "Copied" : "Copy"}
          </article>
        </div>
        {socialLinks?.map((link) => {
          return (
              <div
                key={link?.name}
                className="inline-flex flex-col justify-center items-center mr-8 space-y-4 cursor-pointer"
                onClick={() => handleShare(link?.url)}
              >
                <Image
                  src={link?.image}
                  alt={link?.name}
                  width={500}
                  height={500}
                  className="relative md:w-[75px] md:h-[75px] w-[55px] h-[55px] object-cover "
                />
                <article className="text-[10px] font-semibold">{link?.name}</article>
              </div>
          );
        })}
      </div>

      <div className="w-full">
        <input
          value={url}
          readOnly
          className="w-full p-2 rounded-md text-sm space-x-2 tracking-wide font-medium"
        />
      </div>
    </div>
   </div>
  );
};

export default ShareModel;
