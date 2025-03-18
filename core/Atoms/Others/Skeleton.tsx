import React from "react";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse bg-ternary  ${className}`}
    ></div>
  );
};

export default Skeleton;
