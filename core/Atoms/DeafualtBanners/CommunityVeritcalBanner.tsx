import React from "react";
import VSpot from "./CommunityVertical.tsx/vSpot";
import VLine from "./CommunityVertical.tsx/vLine";
import VTagLine from "./CommunityVertical.tsx/vTagLine";

const CommunityVeritcalBanner = ({ primaryColor, secondaryColor }) => {
  return (
    <div
      className="relative w-full h-[600px] z-0"
      style={{
        background: primaryColor || "#8c52ff",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <VSpot />
      </div>
      <div className="absolute top-0 left-0 w-full  overflow-hidden z-5">
        <VLine color={secondaryColor} />
      </div>
      <div className='absolute top-0 left-0 w-full  overflow-hidden z-10'>
        <VTagLine />
    </div> 
    </div>
  );
};

export default CommunityVeritcalBanner;
