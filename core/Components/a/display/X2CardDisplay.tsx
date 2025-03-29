import React from "react";
import { DisplayCard } from "./DisplayCard";

const X2CardDisplay = ({ cards, loading, openFilter, sectionActive }) => {
  return (
    <div
      className={`relative w-full ${
        true ? "overflow-y-auto" : "overflow-y-hidden"
      } grid ${
        openFilter ? "grid-cols-4" : "grid-cols-5"
      } gap-5 p-5 h-full cursor-pointer`}
    >
      {loading
        ? Array(6)
            ?.fill(0)
            ?.map((_, idx) => (
              <DisplayCard
                height={openFilter ? "h-[325px]" : "h-[350px]"}
                loading={loading}
                type={"X2CardDisplay"}
                card={_}
                key={idx}
              />
            ))
        : cards?.map((card, idx) => (
            <DisplayCard
              height={openFilter ? "h-[325px]" : "h-[350px]"}
              loading={loading}
              type={"X2CardDisplay"}
              card={card}
              key={idx}
            />
          ))}
    </div>
  );
};

export default X2CardDisplay;
