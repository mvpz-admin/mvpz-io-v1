// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { callAPI } from "../../../lib/utils";
// import { Loader } from "@mantine/core";
// import OpenPost from "../../../core/Atoms/Feed/OpenPost";

// const Index = () => {
//   const router = useRouter();
//   const [postType, setPostType] = useState<any>();
//   const [postId, setPostId] = useState<any>();
//   const [tribeId, setTribeId] = useState<any>();
//   const { query } = router;


//   useEffect(() => {
//     console.log(router?.query?.postType);
    
//     if (router?.query?.postType) {
//       switch (router.query?.postType) {
//         case "public_post":
//           setPostType("Public Post");
//           break;
//         case "tribe_post":
//           setPostType("Tribe Post");
//           break;
//         case "shout_post":
//           setPostType("Shout Post");
//           break;
//       }

//      const {postId,tribeId} = router?.query

//      if(postId){
//       setPostId(postId)
//       setTribeId(tribeId)
//      }else{
//       router.push("/fanzone")
//      }
//     }
//   }, [router?.query?.postType]);



//   return (
//     <div className="h-[80vh] px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[200px] flex justify-center items-center">
//        <OpenPost post={postId} tribeId={tribeId} postType={postType} />
//     </div>
//   );
// };

// export default Index;


import React from 'react'

const Index = () => {
  return (
    <div>
      
    </div>
  )
}

export default Index
