import { useEffect, useState } from "react";

export const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(false);
  
    useEffect(() => {
      const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
      checkScreenSize(); // Run once initially
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
  
    return isDesktop;
  };