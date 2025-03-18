import { useState } from "react";

interface Tab {
  id: string | number;
  icon: React.ElementType;
}


const ToggleIconSwitch = ({
  tabs,
  defaultSelected = 1,
  onChange = (value : any) => {},
}) => {
  const [active, setActive] = useState(tabs[defaultSelected - 1]?.id || null);

  const handleSelect = (tab: Tab) => {
    setActive(tab.id);
    onChange(tab);
  };

  return (
    <div className="relative flex bg-white h-full bg-opacity-10 p-1 rounded-lg w-fit">
      {/* Tabs */}
      {tabs?.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            className={`relative flex-1 h-full px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              active === tab.id ? "text-white bg-white bg-opacity-10" : "text-gray-400"
            }`}
            onClick={() => handleSelect(tab)}
          >
            <IconComponent size={18} />
          </button>
        );
      })}
    </div>
  );
};

export default ToggleIconSwitch;
