import { Loader } from "@mantine/core";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const TextFeild = ({
  inputStyle = null,
  containerStyle = null,
  error = null,
  loading = false,
  clickSubmit = () => {},
  ...props
}) => {
  const handleSubmit = () => {
    if (props?.value.length > 0) {
      clickSubmit();
    }
  };
  return (
    <div className={`relative w-full space-y-3 ${containerStyle}`}>
      <div className="relative w-full ">
        <input
          {...props}
          className={`relative w-full h-full  rounded-md border bg-red border-white border-opacity-10 p-4 outline-none z-0 ${inputStyle}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit()
            }
          }}
        />
        {props?.icon && <div className={`absolute left-2 top-1/2 -translate-y-1/2  px-2  font-inter font-bold`} >{props?.icon}</div>}
       {props.type == "email" && <div
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8  rounded-full flex justify-center items-center cursor-pointer overflow-hidden ${
            props?.value?.length > 0
              ? "bg-primary opacity-1 cursor-pointer"
              : "bg-ternary opacity-50 cursor-default"
          }`}
          onClick={handleSubmit}
        >
          {loading ? (
            <Loader color="white" variant="dots" size={18} />
          ) : (
            <FaArrowRight color="white" />
          )}
        </div>}
      </div>
      {error && <article className="text-[8px] text-red-500">{error}</article>}
    </div>
  );
};

export default TextFeild;
