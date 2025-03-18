// import React, { useEffect, useState } from "react";
// import PageUnderProgress from "../../Atoms/PageUnderProgress";
// import { useSession } from "next-auth/react";
// import PostLoadingCard from "../../Atoms/LoadingsLayout/PostLoadingCard";
// import Post from "../../Atoms/Feed/Post";
// import { callAPI } from "../../../lib/utils";
// import PostMessageField from "../../Atoms/Feed/PostMessageField";
// import UploadPostLoading from "../../Atoms/Feed/UploadPostLoading";
// import PostMessageFeildLoading from "../../Atoms/LoadingsLayout/PostMessageFeildLoading";
// import { useRouter } from "next/router";

// const UserSelfShout = () => {
//   const [postList, setFetchPostList] = useState([]);
//   const [dowloadImageCred, setDowloadImageCred] = useState();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [uploadPostLoading, setUploadPostLoading] = useState<Boolean>(false);
//   const { data: session } = useSession();
//   const [postTribes, setPostTribes] = useState([]);
//   const [activePostTribe, setActivePostTribe] = useState([]);
//     const router = useRouter();

//   const handleFetchTribes = async () => {
//     const activeTribePage =
//       router?.pathname === "/fanzone/tribe/community/[name]"
//         ? router?.query?.name
//         : null;

//     const response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/myTribes`,
//       method: "POST",
//       body: {
//         activeTribePage,
//       },
//     });

//     if (response?.success) {
//       setPostTribes(response?.data?.tribes);
//       setActivePostTribe(response?.data?.activeTribe);
//     }
//   };

//   const fetchPosts = async () => {
//     setLoading(true);
//     setFetchPostList([]);
//     const response = await await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/publicShouts`,
//     });

//     if (response) {
//       setFetchPostList(response?.posts);
//       setDowloadImageCred(response?.imageDownload);
//       await handleFetchTribes();
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handlePost = async (response) => {
//     // console.log(response); // Log the response to inspect its structure
//     if (response?.data?.post) {
//       router.reload()
//     } else {
//       console.error("Post data is missing in the response");
//     }
//   };

//   return (
//     <div className="relative z-50 w-full h-auto">
//       <div className="relative w-full space-y-10">
//         <div className="relative w-full ">
//           <div className="relative w-full  ">
//             <article className="md:text-2xl text-lg">Shouts</article>
//             <div className="w-full mt-10 md:block hidden">
//               {session?.user?.role === "Athlete" &&
//                 (loading ? (
//                   <PostMessageFeildLoading />
//                 ) : (
//                   <PostMessageField
//                     onClickPost={handlePost}
//                     theme="#8c52ff"
//                     shout={session?.user?.role === "Athlete" ? true : false}
//                     feedName={"Pulic Feed"}
//                     postTribeList={postTribes}
//                     activePostTribe={activePostTribe}
//                   />
//                 ))}
//             </div>
//             <div className="mt-10">
//               {uploadPostLoading ? (
//                 <div className="mb-10">
//                   <UploadPostLoading />
//                 </div>
//               ) : (
//                 false
//               )}
//               {loading ? (
//                 Array(5)
//                   ?.fill(0)
//                   ?.map((_) => {
//                     return <PostLoadingCard />;
//                   })
//               ) : postList?.length > 0 ? (
//                 postList?.map((post, idx) => {
//                   // return <></>
//                   return (
//                     <Post
//                       key={idx + "post"}
//                       post={post}
//                       theme={"#8c52ff"}
//                       dowloadImageCred={dowloadImageCred}
//                       postType="Shout Post"
//                     />
//                   );
//                 })
//               ) : (
//                 <div className="w-full md:h-[400px] h-[300px] flex justify-center items-center rounded-md bg-secondary">
//                   <article className="text-xl opacity-50">No Post Yet!</article>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSelfShout;
