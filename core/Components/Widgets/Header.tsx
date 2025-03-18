
"use client";
import React, { useEffect, useState } from "react";
import LoginHeader from "../../Atoms/Headers/LoginHeader";
import { useAuthStore } from "../../../store/useAuthStore";
import { useRouter } from "next/router";

const HeaderV1 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent hydration errors in SSR

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    if(router.pathname){
      let paths = router.pathname.split("/")
      if(paths.includes("fanzone")){
        setIsScrolled(true)
      }
    }
  },[router.pathname])

  // Choose header based on login status
  const HeaderComponent = LoginHeader;

  // Routers List
  let nBlurList = ["/", "/a/[username]"]


  return (
    <div
      className={`relative w-full md:px-10 px-4 py-5 transition-all duration-300 
      ${isScrolled ? "bg-black border-b border-white border-opacity-10" : 
      `${!nBlurList.includes(router.pathname) ? "backdrop-blur-md" : "backdrop-blur-none"} border-b border-white border-opacity-0`} 
     `}
    >
      <HeaderComponent />
    </div>
  );
};

export default HeaderV1;
