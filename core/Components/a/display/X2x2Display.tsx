import React from "react";
import { DisplayCard } from "./DisplayCard";

const X2x2Display = ({ cards, loading, openFilter, sectionActive }) => {
  return (
    <div
      className={`relative w-full ${
        true ? "overflow-y-auto" : "overflow-y-hidden"
      }  grid ${
        openFilter ? "grid-cols-5" : "grid-cols-6"
      } gap-5 p-5 h-full cursor-pointer`}
    >
      {loading
        ? Array(6)
            ?.fill(0)
            ?.map((_, idx) => (
              <DisplayCard
                height={openFilter ? "h-[275px]" : "h-[300px]"}
                loading={loading}
                type={"X2x2Display"}
                card={_}
                key={idx}
              />
            ))
        : cards?.map((card, idx) => (
            <DisplayCard
              height={openFilter ? "h-[275px]" : "h-[300px]"}
              loading={loading}
              type={"X2x2Display"}
              card={card}
              key={idx}
            />
          ))}
    </div>
  );
};

export default X2x2Display;
