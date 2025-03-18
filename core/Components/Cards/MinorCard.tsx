import Image from "next/image";
import React from "react";

const MinorCard = ({ badgeIcon, baseImage }) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={baseImage}
        alt="baseImage"
        width={500}
        height={500}
        className="relative w-full h-full object-cover z-0"
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[40%] h-[40%]">
        {badgeIcon && (
          <Image
            src={badgeIcon}
            alt="baseImage"
            width={500}
            height={500}
            className="relative w-full h-full object-cover z-0"
          />
        )}
      </div>
    </div>
  );
};

export default MinorCard;
