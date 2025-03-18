// import { useSession } from 'next-auth/react';
// import React, { useEffect, useState } from 'react'
// import { callAPI } from '../../../lib/utils';
// import { Loader } from '@mantine/core';
// import MediaCard from '../../Atoms/Feed/MediaCard';

// const UserProfileMedia = () => {
//   const [mediaList, setMediaList] = useState<[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const { data: session } = useSession();

//   const fetchPost = async () => {
//     if (session?.user?.id) {
//       try {
//         setLoading(true);
//         let response = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/media/${session?.user?.id}`,
//         });
//         setMediaList(response[0]?.media);
//         setLoading(false);
//       } catch (error) {
//         setMediaList([]);
//         console.error(error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [session?.user?.id]);


//   return (
//     <div className='w-full space-y-10'>
//       <div className="relative py-5 ">
//         <article className="md:text-2xl text-lg">Media</article>
//         <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
//       </div>
//       {mediaList?.length > 0 && <div className='w-full h-auto min-h-[600px] bg-secondary rounded-md p-5 grid md:grid-cols-3 grid-cols-2 gap-4'>
//         {
//           mediaList?.map((media,idx) => {
//             return (
//               <div key={idx} className='w-full md:h-[300px] h-[250px] bg-ternary overflow-hidden'>
//                 <MediaCard mediaCon={media} />
//               </div>
//             )
//           }
//           )
//         }
//       </div>}
//       {loading ? (
//           <div className="flex justify-center items-center w-full h-[400px]">
//             <Loader />
//           </div>
//         ) : null}
//         {!loading && mediaList?.length == 0 ? (
//           <div className="flex justify-center items-center w-full md:h-[400px] h-[300px] bg-secondary rounded-md">
//             <article className="text-xl opacity-50">No Media Posted Yet!</article>
//           </div>
//         ) : null}
//     </div>
//   )
// }

// export default UserProfileMedia