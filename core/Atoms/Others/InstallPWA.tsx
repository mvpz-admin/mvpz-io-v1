import React, { useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const InstallPWA: React.FC = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<Event | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the default prompt
      event.preventDefault();
      setInstallPromptEvent(event);
      setShowPrompt(true); // Show custom prompt
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      (installPromptEvent as any).prompt(); // Trigger the native prompt
      (installPromptEvent as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA installation.");
        } else {
          console.log("User dismissed the PWA installation.");
        }
        setInstallPromptEvent(null);
        setShowPrompt(false);
      });
    }
  };

  const handleCloseClick = () => {
    setShowPrompt(false); // Dismiss the custom prompt
  };

  return (
    <>
      {showPrompt && (
       <>
       {/* desktop design */}
       <div className="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-secondary shadow-lg rounded-lg px-4 py-3 md:flex items-center justify-between space-x-4 border border-ternary max-w-[500px]">
            <div
              className="text-gray-500 text-sm font-medium px-3 py-2 rounded-lg hover:text-gray-700 hover:bg-gray-100"
              onClick={handleCloseClick}
            >
              <IoClose size={22}/>
            </div>
          <p className="text-sm text-white">Install our app for a better experience!</p>
          <div className="flex space-x-2">
            <button
              className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:brightness-125"
              onClick={handleInstallClick}
            >
              Install
            </button>
            
          </div>
        </div>
       {/* mobile design */}
        <div className="md:hidden px-5 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-secondary text-white rounded-lg shadow-lg px-6 py-4 w-full max-w-sm">
            <div className="flex justify-between items-center mb-6">
             <div className="flex justify-start items-center space-x-2"><FaMobileAlt size={20} /> <p className="text-base font-semibold">Install App</p></div>
              <button
                className="text-gray-400 hover:text-gray-300"
                onClick={handleCloseClick}
              >
                <IoClose size={22} />
              </button>
            </div>
            <p className="text-xs mb-10">Install our app for a better experience!</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-primary text-white text-xs font-medium px-4 py-2 rounded-lg hover:brightness-125"
                onClick={handleInstallClick}
              >
                Install
              </button>
              <button
                className="text-gray-400 text-xs font-medium px-4 py-2 rounded-lg hover:text-gray-300 hover:bg-gray-800"
                onClick={handleCloseClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default InstallPWA;
