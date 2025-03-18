import { useState, useEffect } from "react";

const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA = () => {
      // Check if the app is in standalone mode
      const isStandalone = (window.navigator as any).standalone || window.matchMedia("(display-mode: standalone)").matches;
      
      // Check if the app is in fullscreen mode (adding prefixes for cross-browser support)
      const isFullscreen = document.fullscreenElement || 
                           document.webkitFullscreenElement || 
                           document.mozFullScreenElement || 
                           document.msFullscreenElement;

      // If either standalone or fullscreen, treat it as PWA
      const isPwaInFullscreen = isStandalone || isFullscreen;

      console.log("isStandalone:", isStandalone);
      console.log("isFullscreen:", isFullscreen);
      console.log("isPWA:", isPwaInFullscreen);

      setIsPWA(isPwaInFullscreen);
    };

    checkPWA(); // Initial check
    window.addEventListener("resize", checkPWA); // Optional recheck on resize
    document.addEventListener("fullscreenchange", checkPWA); // Fullscreen mode change event
    document.addEventListener("webkitfullscreenchange", checkPWA); // Safari
    document.addEventListener("mozfullscreenchange", checkPWA); // Firefox

    return () => {
      window.removeEventListener("resize", checkPWA);
      document.removeEventListener("fullscreenchange", checkPWA);
      document.removeEventListener("webkitfullscreenchange", checkPWA);
      document.removeEventListener("mozfullscreenchange", checkPWA);
    };
  }, []);

  return isPWA;
};

export default useIsPWA;
