import { ReactNode, useEffect } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
} from "../../../utils/global/global";

interface ModalProps {
  modelTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  slideType?: "bottom-to-top" | "top-to-bottom";
  height?: "sm" | "md" | "lg";
  children: ReactNode;
}

const MobileModel: React.FC<ModalProps> = ({
  modelTitle,
  isOpen,
  onClose,
  slideType = "bottom-to-top",
  height = "lg",
  children,
}) => {
  // Manage body scroll state
  useEffect(() => {
    if (isOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }

    return () => enableBodyScroll(); // Cleanup when unmounted
  }, [isOpen]);

  // Define height classes
  const heightClasses = {
    sm: "h-[25vh]",
    md: "h-[50vh]",
    lg: "h-[95vh]",
  }[height];

  // If height is set, remove slide effect
  const getSlideClasses = () => {
    switch (slideType) {
      case "top-to-bottom":
        return "translate-y-[-100%] opacity-0 !rounded-b-3xl";
      default: // "bottom-to-top"
        return "translate-y-[100%] opacity-0 rounded-t-3xl";
    }
  };

  const getVisibleClasses = () => {
    switch (slideType) {
      case "top-to-bottom":
        return "translate-y-0 opacity-100 !rounded-b-3xl";
      default: // "bottom-to-top"
        return "translate-y-0 opacity-100 !rounded-t-3xl";
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-10 flex transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } ${
        slideType === "top-to-bottom"
          ? "items-start justify-center"
          : "items-end md:items-center justify-center"
      }`}
      onClick={onClose}
      style={{
        zIndex: 1000,
      }}
    >
      {/* Modal Content */}
      <div
        className={`bg-black backdrop-blur-xl w-full max-w-md   shadow-lg transform transition-all duration-300 overflow-hidden ${heightClasses} ${
          isOpen ? getVisibleClasses() : getSlideClasses()
        } flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center h-[50px] bg-secondary px-6">
          <article className="font-inter  font-bold">{modelTitle}</article>
          <article
            className="font-inter text-[14px] font-semibold text-white"
            onClick={onClose}
          >
            Close
          </article>
        </div>
        <div className="flex-1 w-full h-full overflow-y-auto scroller-hidden p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileModel;
