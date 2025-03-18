import React from "react";
import HeaderV1 from "../Components/Widgets/Header";

const BeforeLoginLayout = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed top-0 left-0 w-full z-10">
        <HeaderV1 />
      </div>
      {children}
    </div>
  );
};

export default BeforeLoginLayout;
