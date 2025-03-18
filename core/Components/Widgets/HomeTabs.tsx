import React from "react";
import { HomePagesTab } from "../../../utils/global/global";
import { useRouter } from "next/router";

const HomeTabs = ({
    setShowAnimation,
    setGradient
}) => {
    const router = useRouter()
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap scroller-hidden">
      <div className="md:flex hidden justify-start items-center gap-2">
        {HomePagesTab.map((item, idx) => (
          <div
            key={idx}
            className={`flex justify-center px-4 py-2 rounded-full bg-white ${
              item?.gradient == 0 ? "bg-opacity-20" : "bg-opacity-0"
            } hover:bg-opacity-10 border border-white border-opacity-0 font-inter font-semibold cursor-pointer text-sm`}
            onMouseEnter={() => {
              if (item.gradient) {
                setShowAnimation(false);
                setGradient(item.gradient);
              }
            }}
            onMouseLeave={() => {
              if (item.gradient) {
                setShowAnimation(true);
                setGradient(0);
              }
            }}
            onClick={() => item && router.push(item.url)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="md:hidden flex justify-start items-center gap-5">
        {HomePagesTab.map((item, idx) => (
          <div
            key={idx}
            className={`flex justify-center  text-white ${
              item?.gradient == 0 ? "text-opacity-100" : "text-opacity-50"
            }  font-inter font-semibold cursor-pointer text-sm`}
            onMouseEnter={() => {
              if (item.gradient) {
                setShowAnimation(false);
                setGradient(item.gradient);
              }
            }}
            onMouseLeave={() => {
              if (item.gradient) {
                setShowAnimation(true);
                setGradient(0);
              }
            }}
            onClick={() => item && router.push(item.url)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTabs;
