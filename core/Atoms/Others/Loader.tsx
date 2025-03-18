import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "@mantine/core";



const FlippingCardLoader = ({loadingMessages}) => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center  relative">
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-40 h-80 bg-blue-500 text-white flex items-center justify-center text-lg font-semibold rounded-lg shadow-xl"
        />
      </AnimatePresence> */}
    <Loader variant="dots"/>
      <p className="mt-4  font-medium text-center w-full">{loadingMessages[index]}</p>
    </div>
  );
};

export default FlippingCardLoader;