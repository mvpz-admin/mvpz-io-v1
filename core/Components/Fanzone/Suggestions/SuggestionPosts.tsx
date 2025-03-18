import React from "react";
import PostSuggestion from "../PostSuggestion";

const SuggestionPosts = ({ pageData, pageDataLoading, postType }) => {
  return (
    <div className="relative w-full space-y-2 ">
      <article className="font-inter text-[14px] font-bold">
        Related Posts
      </article>
      <div className="relative w-full space-y-4">
        {pageData?.posts?.map((post) => {
            return <PostSuggestion loading={pageDataLoading} post={post} postType={postType} />
        })}
      </div>
    </div>
  );
};

export default SuggestionPosts;
