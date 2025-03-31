import React from "react";

const FeaturesLayout = ({ title, description, children }) => {
  return (
    <div className="min-h-screen  font-inter text-white pt-[128px] bg">
      <div className="relative w-full md:px-10 px-5 border-b border-white border-opacity-10">
        {/* Top Navigation */}
        <div className="  border-gray-800">
          <div className=" py-3 flex justify-between items-center">
            {/* Left Side */}
            <div className="">
              <article className="text-[40px] font-bold font-monumentUltraBold">{title}</article>
              <article className="text-sm">{description}</article>
            </div>
          </div>
        </div>
      </div>
        {children}
    </div>
  );
};

export default FeaturesLayout;
