"use client"

import React, { use, useEffect, useState } from "react";
import HeaderV1 from "../Components/Widgets/Header";


const MarketplaceLayout = ({children}) => {
  const [scrollActive,setScrollActive] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollActive(true);
      } else {
        setScrollActive(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className={`fixed top-0 left-0 w-full z-50 px-10 py-2 transition-all bg-black duration-300 ${
          scrollActive ? "bg-black bg-opacity-80" : "bg-transparent"
        }`}>
        <HeaderV1 />
      </div>
      {children}
    </div>
  );
};

export default MarketplaceLayout;
