import React, { useEffect, useState } from "react";
import TAthletesCard from "./TAll/TAthletesCard";
import { callAPI } from "../../../lib/utils";
import TCards from "./TAll/TCards";

const TAthletes = ({ tribeId }) => {
  const [pageData, setPageData] = useState<any>();
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [pageError, setPageError] = useState(false); // TODO : Later change

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: `/v1/profiles/tribe/${tribeId}/all`,
      });

      setPageData(response?.data);
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false);
  };

  useEffect(() => {
    if(tribeId){
        handleFetchPageData();
    }
  }, [tribeId]);
  return (
    <div className="relative w-full px-2 overflow-hidden">
      <div className="relative w-full ">
        {/* Athlete */}
        <div className="relative w-full  space-y-4 mb-10">
         
          <TAthletesCard
            athletes={pageData?.topAthletes}
            loading={pageDataLoading}
          />
        </div>
       
      </div>
    </div>
  );
};

export default TAthletes;
