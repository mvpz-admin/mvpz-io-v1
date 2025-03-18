import React, { useEffect, useState } from "react";
import { callAPI } from "../../../lib/utils";
import AthletePShouts from "../Fanzone/AthletePShouts";

const UPosts = ({ username }) => {
  const [postsData, setPostsData] = useState(null);
  const [postsDataLoading, setPostsDataLoading] = useState(false);

  const handleFetchCollectionData = async ({ username }) => {
    setPostsDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/user/${username}/posts`,
    });

    if (response.success) {
      setPostsData(response?.data);
    }
    setPostsDataLoading(false);
  };

  useEffect(() => {
    if (username) {
      handleFetchCollectionData({ username });
    }
  }, [username]);

  return (
    <div className="relative w-full grid md:grid-cols-4 grid-cols-1 gap-5 py-5 px-5">
      {postsDataLoading
        ? Array(8)
            ?.fill(0)
            ?.map((_, idx) => {
              return (
                <AthletePShouts
                  loading={postsDataLoading}
                  post={_}
                  postType="publicpost"
                  key={idx}
                  suggestion
                />
              );
            })
        : postsData?.map((shout, idx) => {
            return (
              <AthletePShouts
                loading={postsDataLoading}
                post={shout}
                postType="publicpost"
                key={idx}
                suggestion
              />
            );
          })}
    </div>
  );
};

export default UPosts;
