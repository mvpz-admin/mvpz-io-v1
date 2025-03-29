// Tooltip.tsx
import React, { useState, ReactNode } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right" | "topRight" | "topLeft" | "bottomRight" | "bottomLeft";  // Updated position prop
  showTooltip?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = "top" ,  showTooltip : viewTooltip = true}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  // Determine tooltip position styles
  const getTooltipPosition = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      case "topRight":
        return "bottom-full -left-2  mb-2";
      case "topLeft":
        return "bottom-full -right-2 mb-2";
      case "bottomRight":
        return "top-full -left-2  mt-2";
      case "bottomLeft":
        return "top-full right-[50%] mt-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";  // Fallback to top
    }
  };

  // Determine tooltip arrow position styles
  const getArrowPosition = () => {
    switch (position) {
      case "top":
        return "tooltip-arrow w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800 absolute top-full left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "tooltip-arrow w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800 absolute bottom-full left-1/2 transform -translate-x-1/2";
      case "left":
        return "tooltip-arrow w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-gray-800 absolute left-full top-1/2 transform -translate-y-1/2";
      case "right":
        return "tooltip-arrow w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-800 absolute right-full top-1/2 transform -translate-y-1/2";
      case "topRight":
        return "tooltip-arrow w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800 absolute top-full left-2";
      case "topLeft":
        return "ooltip-arrow w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800 absolute top-full right-2";
      case "bottomRight":
        return "tooltip-arrow w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800 absolute bottom-full left-2";
      case "bottomLeft":
        return "tooltip-arrow w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-800 absolute bottom-full right-2";
      default:
        return "tooltip-arrow w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800 absolute top-full left-1/2 transform -translate-x-1/2";
    }
  };

  return (
    <div className="relative inline-block w-full">
      <div
        className="flex items-center w-full"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>

      {viewTooltip && isVisible && (
        <div className={`absolute ${getTooltipPosition()} w-max px-3 py-2 text-sm bg-gray-800 text-white rounded-md shadow-lg z-10 max-w-[300px]`}>
          {text}
          <div className={getArrowPosition()} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
