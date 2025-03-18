// import { useSession } from 'next-auth/react';
// import React, { useEffect, useState } from 'react'
// import { callAPI } from '../../../lib/utils';
// import ActivityPost from '../../Atoms/Feed/ActivityPost';
// import { Loader } from '@mantine/core';
// import SigninRequired from '../Errors/SigninRequired';

// const AtheletActivity = ({isSearchAthlete = false, ath}) => {
//   const [postList, setFetchPostList] = useState<[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [dowloadImageCred, setDowloadImageCred] = useState();
//   const { data: session } = useSession();

//   const fetchPost = async () => {
//     if (session?.user?.id) {
//       try {
//         setLoading(true);
//         let post = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/activity/${ath?.id}`,
//         });
//         setFetchPostList(post?.activity);
//         setDowloadImageCred(post?.imageDownload)
//         setLoading(false);
//       } catch (error) {
//         setFetchPostList([]);
//         console.error(error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [session?.user?.id]);


//   return (
  
//     session?.user ?

//     <div className="w-full space-y-10">
//       <div className="relative py-5 ">
//         <article className="md:text-2xl text-base">{isSearchAthlete ? "Activities" : "My Activities"}</article>
//         <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
//       </div>
//       <div className="w-full">
//       {postList?.map((post, idx) => {
//           return (
//             <div className="w-full space-y-4 cursor-pointer">
//               <ActivityPost key={idx + "post"}  post={post}  dowloadImageCred={dowloadImageCred}/>
//             </div>
//           );
//         })}
//         {loading ? (
//           <div className="flex justify-center items-center w-full h-[400px]">
//             <Loader />
//           </div>
//         ) : null}
//         {!loading && postList?.length == 0 ? (
//           <div className="w-full h-[400px] flex justify-center items-center bg-secondary rounded-md">
//             <article className="text-xl opacity-50">No Activity Yet!</article>
//           </div>
//         ) : null}
//       </div>
//     </div>
//     :
//     <SigninRequired />
//   )
// }

// export default AtheletActivity
