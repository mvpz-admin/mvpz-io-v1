import React from "react";
import Skeleton from "../../../Atoms/Others/Skeleton";

const PostBody = ({pageDataLoading,pageData}) => {
  return (
    <div className="relative w-full  border border-white border-opacity-10 rounded-lg p-4">
      {pageDataLoading ? (
        <div className="relative w-full space-y-4">
          <div className="w-full h-[400px] bg-secondary" />
          <div className="w-full">
            <Skeleton
              className={`bg-secondary w-full h-[18px] rounded-md mb-1`}
            />
            <Skeleton
              className={`bg-secondary w-full h-[18px] rounded-md mb-1`}
            />
            <Skeleton
              className={`bg-secondary w-[50%] h-[18px] rounded-md mb-1`}
            />
          </div>
        </div>
      ) : (
        <div
          className="relative w-full overflow-hidden text-[14px] font-inter font-semibold flex flex-col justify-center items-center"
          dangerouslySetInnerHTML={{ __html: pageData?.message }}
        />
      )}
    </div>
  );
};

export default PostBody;
