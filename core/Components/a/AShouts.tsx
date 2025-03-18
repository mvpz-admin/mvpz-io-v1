import React, { useEffect, useState } from "react";
import { callAPI } from "../../../lib/utils";
import AthletePShouts from "../Fanzone/AthletePShouts";

const AShouts = ({ username }) => {
  const [shoutsData, setShoutsData] = useState(null);
  const [shoutsDataLoading, setShoutsDataLoading] = useState(false);

  const handleFetchCollectionData = async ({ username }) => {
    setShoutsDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/athlete/${username}/shouts`,
    });

    if (response.success) {
      setShoutsData(response?.data);
    }
    setShoutsDataLoading(false);
  };

  useEffect(() => {
    if (username) {
      handleFetchCollectionData({ username });
    }
  }, [username]);

  return (
    <div className="relative w-full grid md:grid-cols-4 grid-cols-1 gap-5 py-5">
      {shoutsData?.map((shout, idx) => {
        return (
          <AthletePShouts
            loading={shoutsDataLoading}
            post={shout}
            postType="shoutpost"
            key={idx}
            suggestion
          />
        );
      })}
    </div>
  );
};

export default AShouts;
