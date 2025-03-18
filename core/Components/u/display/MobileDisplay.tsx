import React from "react";
import { DisplayCard } from "./DisplayCard";

const MobileDisplay = ({ cards, loading, sectionActive }) => {
  return (
    <div
      className={`relative w-full ${
        true ? "overflow-y-auto" : "overflow-y-hidden"
      }  grid grid-cols-2 gap-2 p-2 h-full cursor-pointer`}
    >
      {loading
        ? Array(6)
            ?.fill(0)
            ?.map((_, idx) => (
              <DisplayCard
                loading={loading}
                type={"MobileDisplay"}
                card={_}
                key={idx}
              />
            ))
        : cards?.map((card, idx) => (
            <DisplayCard
              loading={loading}
              type={"MobileDisplay"}
              card={card}
              key={idx}
            />
          ))}
    </div>
  );
};

export default MobileDisplay;
