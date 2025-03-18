import React from "react";

const FanzoneFooter = () => {
  return (
    <div className="w-full px-2 space-y-8">
      <div className="flex flex-wrap gap-4 justify-center ">
        <a href="/" className="text-[9px] opacity-75 font-medium">@MVPz</a>
        <a href="/join/fan" className="text-[9px] opacity-75 font-medium">Sports Fan</a>
        <a href="/join/athlete" className="text-[9px] opacity-75 font-medium">Athlete</a>
        <a href="/apparel" className="text-[9px] opacity-75 font-medium">Apparel</a>
        <a href="/arenaz" className="text-[9px] opacity-75 font-medium">Arenaz</a>
        <a href="/fanzone" className="text-[9px] opacity-75 font-medium">Fanzone</a>
        <a href="/mvpz-store" className="text-[9px] opacity-75 font-medium">Store</a>
        <a href="/myCards" className="text-[9px] opacity-75 font-medium">Collection</a>
        <a href="https://mvpz.my.canva.site/faqs" className="text-[9px] opacity-75 font-medium">Faqs</a>
        <a href="/contactus" className="text-[9px] opacity-75 font-medium">Contact Us</a>
      </div>
      <span className="text-[8px] opacity-75 font-medium text-center block">
        @MVPz Website | Copyright 2025
      </span>
    </div>
  );
};

export default FanzoneFooter;
