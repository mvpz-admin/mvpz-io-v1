import React from "react";
import APage from "../../../core/Components/a/APage";
import { useRouter } from "next/router";
import UPage from "../../../core/Components/u/UPage";
import PageNotFound from "../../../core/Components/Widgets/404";

const Index = () => {
  let router = useRouter();
  let accountType = router.query.accountType
  let username = router.query.username
  let tab = router.query.tab
  
  const GetComponent = () => {
    switch(accountType){
      case "p":
        return <UPage makeSelectedTab={tab || "collected"} username={username}/>
      case "a":
        return <APage makeSelectedTab={tab || "collections"} username={username}/>
      default:
        return <PageNotFound />
    }
  };
  return (
    <div className="relative w-full min-h-screen z-0">
      {accountType && <GetComponent />}
    </div>
  );
};

export default Index;
