import React, { useEffect, useState } from "react"
import { callAPI } from "../../../lib/utils";
import AthleteTribeCard from "../Fanzone/AthleteTribeCard";

const ATribes = ({ username }) => {
  const [tribesData, setTribesData] = useState([]);
  const [tribesDataLoading, setTribesDataLoading] = useState(false);

  const handleFetchCollectionData = async ({ username }) => {
    setTribesDataLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/athlete/${username}/tribes`,
    });

    if (response.success) {
      setTribesData(response?.data);
    }
    setTribesDataLoading(false);
  };

  useEffect(() => {
    if (username) {
      handleFetchCollectionData({ username });
    }
  }, [username]);
  return (
    <div className="relative w-full space-y-4 px-5 py-5 gap-5">
      {tribesDataLoading
        ? Array(1)
            .fill(0)
            ?.map((_, idx) => {
              return (
                <AthleteTribeCard
                  loading={tribesDataLoading}
                  tribe={_}
                  key={idx}
                />
              );
            })
        : tribesData?.map((tribeData, idx) => {
            return (
              <AthleteTribeCard
                loading={tribesDataLoading}
                tribe={tribeData}
                key={idx}
              />
            );
          })}
    </div>
  );
};

export default ATribes;
