import React from "react";
import FeaturesLayout from "../../core/Layout/FeaturesLayout";
import { IoFileTrayOutline } from "react-icons/io5";

const Index = () => {
  return (
    <FeaturesLayout title="Blogs" description="">
      <div className="md:px-10 px-5">
        <div className="w-full h-[500px] flex flex-col justify-center items-center">
          <IoFileTrayOutline className="text-ternary md:text-[80px] text-[40px] mb-2" />
          <div className="text-secondary text-2xl font-bold opacity-50">
            No Blog Posts Yet!
          </div>
          <article className="text-sm text-secondary opacity-50">
            Blog posts will be available soon.
          </article>
        </div>
      </div>
    </FeaturesLayout>
  );
};

export default Index;
