// MenuOptions.tsx
import React, { useState, ReactNode, useRef } from "react";

interface Option {
  id? : string
  label: string; // Can be a string or ReactNode (for icons or custom components)
  icon?: ReactNode; // Optional icon for each option
  iconPosition?: "left" | "right"; // Icon position: left or right (default: left)
}

interface MenuOptionsProps {
  children: ReactNode;
  options: Option[]; // Array of option strings
  position?: "top" | "bottom" | "left" | "right" | "top-center"; // Dropdown position
  onSelect: (option: Option | string)  => void; // Callback when option is selected
}

const MenuOptions: React.FC<MenuOptionsProps> = ({
  children,
  options,
  position = "bottom",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleOptionClick = (option: Option) => {
    onSelect(option.id ? option : option.label)
    closeDropdown();
  };


  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      closeDropdown();
    }
  };

  // Determine dropdown position styles
  const getDropdownPosition = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1 ml-2";
      case "top-center":
        return " left-1/2 -translate-x-1/2 bottom-[110%]  ";
      default:
        return "top-full left-1/2 transform -translate-x-1 mt-2";
    }
  };

  return (
    <div className="relative inline-block cursor-pointer" ref={dropdownRef} onBlur={handleBlur} tabIndex={0}>
      {/* Button to toggle dropdown */}
      <div onClick={toggleDropdown}>{children}</div>

      {isOpen && (
        <div
          className={`absolute md:min-w-[200px] min-w-[150px] ${getDropdownPosition()} bg-ternary border-[0.5] border-gray-300 shadow-lg rounded-lg z-10`}
        >
          <ul className="py-1">
            {options.map((option, index) => (
              <div className="space-y-1">
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2 hover:bg-white hover:bg-opacity-5 cursor-pointer text-[10px] flex items-center space-x-2"
                >
                  {option.iconPosition === "left" && option.icon && (
                    <span className="mr-2  md:!text-[14px] !text-[10px]">{option.icon}</span>
                  )}
                  {option?.label}
                  {option.iconPosition === "right" && option.icon && (
                    <span className="ml-2 md:!text-[14px] !text-[10px]">{option.icon}</span>
                  )}
                </li>
                {options?.length-1 !== index && <div className="w-full h-[0.5px] bg-white bg-opacity-10"></div>}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuOptions;
