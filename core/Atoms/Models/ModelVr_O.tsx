import React, { useEffect } from "react";
import { IoIosClose, IoIosCloseCircle } from "react-icons/io";
import { ReactElement } from "react-markdown/lib/react-markdown";

interface ModelVr_O {
  open: boolean;
  setHandleOpen: (state: boolean) => void;
  children: ReactElement;
  extraClass?: string;
  childExtraClass?: string;
}

const ModelVr_O: React.FC<ModelVr_O> = ({
  open,
  setHandleOpen,
  children,
  extraClass = "",
  childExtraClass = "",
}) => {
  useEffect(() => {
    const lockScroll = () => {
      window.document.body.style.overflow = "hidden";
      window.document.documentElement.style.overflow = "hidden"; // For Safari
    };

    const unlockScroll = () => {
      window.document.body.style.overflow = "auto";
      window.document.documentElement.style.overflow = "auto"; // For Safari
    };

    if (open) lockScroll();
    if (!open) unlockScroll();

    return () => unlockScroll();
  }, [open]);

  function closeHandleBtn() {
    window.document.body.style.overflowY = "auto";
    setHandleOpen(false);
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen  flex justify-center md:items-center items-start  py-10  bg-black bg-opacity-[0.2] backdrop-blur-md ${extraClass} overflow-y-auto`}
      style={{
        zIndex: 500,
      }}
    >
      <div
        className={`!relative  min-w-[40vw] md:max-w-[80vw] max-w-[90vw] min-h-[60vh] max-h-[90vh] z-0 flex justify-center items-center ${childExtraClass} `}
      >
        {/* close btn */}

        <div className="!relative w-full h-full z-0">
          <div className="relative w-full h-full overflow-y-scroll z-0">
            <div className="relative w-full h-full bg-secondary rounded-xl overflow-hidden z-0">
              {children}
            </div>
            
          </div>
          <div
              className="absolute -top-4 -right-4 cursor-pointer z-0 w-8 h-8 rounded-full bg-primary flex justify-center items-center"
              onClick={closeHandleBtn}
            >
              <IoIosClose className={"text-white"} size={30} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModelVr_O;
