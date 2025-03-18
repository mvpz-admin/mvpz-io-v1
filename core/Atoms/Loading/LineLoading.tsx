import React from 'react';

const LineLoadingEffect = () => {
  return (
    <div className="w-full h-[2px] bg-secondary overflow-hidden rounded">
      <div className="h-full bg-primary animate-line-load"></div>
    </div>
  );
};

export default LineLoadingEffect;

/* Tailwind CSS */
/* Add this in your global.css or tailwind.config.js */
/*
.animate-line-load {
  animation: line-load 1.5s infinite;
}

@keyframes line-load {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
*/
