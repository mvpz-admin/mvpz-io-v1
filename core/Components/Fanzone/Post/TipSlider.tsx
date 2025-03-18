import { useState, useRef, useEffect } from "react";

const tipValues = [1, 2, 5, 8, 10, 15, 20];

export default function TipSlider({ onChange }) {
  const [value, setValue] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const calculatePosition = (clientX: number) => {
    if (!sliderRef.current) return 0;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    let percent = (clientX - left) / width;
    percent = Math.max(0, Math.min(1, percent));
    
    const position = percent * (tipValues[tipValues.length - 1] - tipValues[0]) + tipValues[0];
    const closest = tipValues.reduce((prev, curr) =>
      Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev
    );
    
    return closest;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const newValue = calculatePosition(e.clientX);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newValue = calculatePosition(e.clientX);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const getThumbPosition = () => {
    const index = tipValues.indexOf(value);
    return `${(index / (tipValues.length - 1)) * 100}%`;
  };

  const getTrackBackground = () => {
    const percent = (tipValues.indexOf(value) / (tipValues.length - 1)) * 100;
    return `linear-gradient(to right, #8A2387 0%, #E94057, #F27121 ${percent}%, #2C2C2C ${percent}%, #2C2C2C 100%)`;
  };

  return (
    <div className="flex flex-col items-center w-full p-4">

      <div className="relative w-full ">
        {/* Container for track and interaction */}
        <div 
          ref={sliderRef}
          className="absolute w-full h-[25px] cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Track background with gradient */}
          <div 
            className="absolute w-full h-full rounded-full"
            style={{ background: getTrackBackground() }}
          >
            {/* Snap circles */}
            <div className="absolute w-full flex justify-between top-1/2 -translate-y-1/2 pointer-events-none">
              {tipValues.map((amount) => (
                <div key={amount} className="w-3 h-3 bg-[#ccc] rounded-full" />
              ))}
            </div>
          </div>

          {/* Thumb */}
          <div
            ref={thumbRef}
            className="absolute w-8 h-8 bg-[#EF4444] rounded-full border-[3px] border-white shadow-lg top-1/2 -translate-y-1/2"
            style={{ 
              left: getThumbPosition(),
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>

        {/* Labels */}
        {/* <div className="absolute w-full flex justify-between mt-12 font-inter font-semibold">
          {tipValues.map((amount) => (
            <span key={amount} className="text-[#666666] text-xl ">
              ${amount}
            </span>
          ))}
        </div> */}
      </div>
    </div>
  );
}