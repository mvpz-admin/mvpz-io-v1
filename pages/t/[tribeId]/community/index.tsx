import React, { useEffect, useState } from "react";
import FanzoneLayout from "../../../../core/Layout/FanzoneLayout";
import { useRouter } from "next/router";
import { callAPI } from "../../../../lib/utils";
import TProfileBar from "../../../../core/Components/t/TProfileBar";
import TCommunity from "../../../../core/Components/t/TCommunity";

const Index = () => {
  const router = useRouter();
  const tribeId = router.query.tribeId;
  const [pageData, setPageData] = useState<any>();
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [pageError, setPageError] = useState(false); // TODO : Later change

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: `/v1/profiles/tribe/${tribeId}`,
      });

      setPageData(response?.data);
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false);
  };

  useEffect(() => {
    if (tribeId) {
      handleFetchPageData();
    }
  }, [tribeId]);

  return (
    <FanzoneLayout>
      <TProfileBar tribeId={tribeId} pageData={pageData} pageDataLoading={pageDataLoading} community={true}>
        {/* Community */}
        <TCommunity tribeId={tribeId} />
      </TProfileBar>
    </FanzoneLayout>
  );
};

export default Index;
