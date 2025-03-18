import { useState } from "react";

const ToggleSwitch = ({ tabs, onToggle = (value: any) => {} }) => {
  const [active, setActive] = useState(tabs[0]?.id); // Default active tab

  const handleToggle = (tab) => {
    setActive(tab)
    onToggle(tab)
  }

  return (
    <div className="relative flex bg-white bg-opacity-10 p-1 rounded-lg w-fit">
      {/* Tabs */}
      {tabs?.map((tab) => (
        <button
          key={tab.id}
          className={`relative flex-1 px-4 py-2 md:text-sm text-xs font-semibold rounded-lg transition-all duration-300  ${
            active === tab.id
              ? "text-white bg-white bg-opacity-10 "
              : "text-gray-400 "
          }`}
          onClick={() => handleToggle(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleSwitch;
