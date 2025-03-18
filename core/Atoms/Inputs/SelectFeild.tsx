


import React, { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

const SelectField = ({
  options = [
    {
      label: "Option1",
      id: "OPTION1",
    },
    {
      label: "Option2",
      id: "OPTION2",
    },
  ],
  onChange = (value : any) => {},
}) => {
  const [selectedOption, setSelectedOption] = useState<any>();
  const [openOption, setOpenOption] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setOpenOption(false);
      }
    };

    if (openOption) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openOption]);

  return (
    <div ref={dropdownRef} className="relative w-full h-full select-none">
      <div
        className="relative flex justify-between items-center bg-white h-full bg-opacity-5 p-1 rounded-lg border border-white border-opacity-5 px-3 cursor-pointer "
        onClick={() => setOpenOption(!openOption)}
      >
        <article className="font-inter text-[14px] font-bold">
          {selectedOption?.label}
        </article>
        <FaAngleDown
          className={`transition-all duration-300 ${openOption ? "-rotate-180" : "rotate-0"}`}
        />
      </div>
      {/* options */}
      {openOption && (
        <div className="absolute bottom-[110%] w-full rounded-lg bg-secondary border border-white border-opacity-10 transition-all duration-300 p-2">
          {options.map((option, idx) => (
            <div
              className="w-full px-4 py-2 bg-white bg-opacity-0 transition-all duration-300 hover:bg-opacity-5 flex justify-start items-center rounded-lg cursor-pointer"
              key={idx}
              onClick={() => {
                setSelectedOption(option);
                setOpenOption(false);
                onChange(option); // Call onChange when selecting an option
              }}
            >
              <article className="font-inter text-[14px] font-bold">
                {option.label}
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;
