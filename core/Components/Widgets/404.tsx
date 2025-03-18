import React from "react";
import Footer from "./Footer";

const PageNotFound = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center px-2 space-y-5">
        <article className="md:text-4xl text-2xl">Page Not Found</article>
        <article className="md:text-xs text-[10px] font-inter opacity-50">
          Foul! This page didn’t make the cut.
        </article>
        <div className="w-auto">
          <button
            className={`relative flex-1 px-4 py-3 md:text-sm text-xs font-semibold rounded-lg transition-all duration-300 text-white bg-white bg-opacity-10 hover:bg-opacity-20  `}
          >
            Head Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
