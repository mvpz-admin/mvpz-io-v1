
import React, { useEffect, useState } from "react";
import TPage from "../../../core/Components/t/Tpage";
import { useRouter } from "next/router";




const Index = () => {
  const router = useRouter();
  const tribeId = router.query.tribeId;



  return (
    <div className="relative w-full min-h-screen z-0">
      {/* Page */}
     <TPage tribeId={tribeId}/>
    </div>
  );
};

export default Index;
