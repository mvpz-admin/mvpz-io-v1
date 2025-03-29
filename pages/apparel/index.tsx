import React, { useEffect, useState } from "react";
import ProductSale from "../../core/Components/apparel/ProductSale";
import { callAPI } from "../../lib/utils";
import { useRouter } from "next/router";
import ApparelProductCardV1 from "../../core/Components/apparel/ApparelProductCardV1";

const Index = () => {
  const router = useRouter();
  const [pageData, setPageData] = useState<any>([]);
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [pageError, setPageError] = useState(false); // TODO : Later change

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: "/v1/apparel/home",
      });

      setPageData(response?.data);
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false);
  };

  useEffect(() => {
    handleFetchPageData();
  }, [router.pathname]);

  return (
    <div className="relative w-full h-screen bg-secondary overflow-y-auto md:pt-[128px] pt-[20px]">
      {/* silder  */}
      <div className="md:px-[100px] px-[5px] grid md:grid-cols-3 grid-cols-2 md:gap-20 gap-5">
        {
          pageData?.map((prd,idx) => {
            return (
              <ApparelProductCardV1  product={prd} loading={pageDataLoading}/>
            )
          })
        }
      </div>
    </div>
  );
};

export default Index;
