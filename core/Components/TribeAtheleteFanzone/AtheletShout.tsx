// import React, { useEffect, useState } from "react";
// import Post from "../../Atoms/Feed/Post";
// import { mediaType } from "../../Atoms/Feed/PostEnum";
// import { useSession } from "next-auth/react";
// import { callAPI } from "../../../lib/utils";
// import PostMessageField from "../../Atoms/Feed/PostMessageField";
// import UploadPostLoading from "../../Atoms/Feed/UploadPostLoading";
// import { Loader } from "@mantine/core";
// import PostLoadingCard from "../../Atoms/LoadingsLayout/PostLoadingCard";
// import PostMessageFeildLoading from "../../Atoms/LoadingsLayout/PostMessageFeildLoading";
// import SigninRequired from "../Errors/SigninRequired";
// import { useRouter } from "next/router";

// const AtheletShout = ({ isSearchAthlete = false, userId = null }) => {
//   const [postList, setFetchPostList] = useState([]);
//   const [dowloadImageCred, setDowloadImageCred] = useState();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [uploadPostLoading, setUploadPostLoading] = useState<Boolean>(false);
//   const { data: session } = useSession();
//    const [postTribes, setPostTribes] = useState([]);
//    const [activePostTribe, setActivePostTribe] = useState([]);
//    const router = useRouter();

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

//     let response;

//     if (isSearchAthlete && userId) {
//       response = await await callAPI({
//         endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/athlete/shout/${userId}`,
//       });
//     } else {
//       response = await await callAPI({
//         endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/athlete/shouts`,
//       });
//     }

//     if (response) {
//       await handleFetchTribes();
//       setFetchPostList(response?.posts);
//       setDowloadImageCred(response?.imageDownload);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handlePost = async (response) => {
//     // console.log(response); // Log the response to inspect its structure
//     if (response?.data?.post) {
//       // console.log('Received post:', response.data.post); // Log the actual post
//       // setFetchPostList((prevPostList) => {
//       //   console.log('Previous post list:', prevPostList);
//       //   const updatedList = [response.data.post, ...prevPostList]; // Add the new post at the beginning of the list
//       //   console.log('Updated post list:', updatedList); // Log the updated list
//       //   return updatedList;
//       // });

//       // fetchPosts()
//       router.reload()
//     } else {
//       console.error("Post data is missing in the response");
//     }
//   };

//   console.log({
//     pp: loading && !!session?.user,
//     loading,
//     ses: !!session?.user,
//   });

//   return session?.user ? (
//     <div className="w-full h-auto">
//       <div className="relative w-full gap-y-10">
//         <div className="relative w-full ">
//           <div className="md:block hidden mb-10">
//             {loading ? (
//               <PostMessageFeildLoading />
//             ) : (
//               session?.user?.role === "Athlete" &&
//               !isSearchAthlete && (
//                 <PostMessageField
//                   onClickPost={handlePost}
//                   theme="#8c52ff"
//                   shout={session?.user?.role === "Athlete" ? true : false}
//                   postTribeList={postTribes}
//                   activePostTribe={activePostTribe}
//                 />
//               )
//             )}
//           </div>
//           <div className="relative w-full ">
//             <article className="md:text-2xl text-base my-10">Shouts</article>
//             {uploadPostLoading ? (
//               <div className="mb-10">
//                 <UploadPostLoading />
//               </div>
//             ) : (
//               false
//             )}
//             {loading ? (
//               Array(5)
//                 ?.fill(0)
//                 ?.map((_) => {
//                   return <PostLoadingCard />;
//                 })
//             ) : postList?.length > 0 ? (
//               postList?.map((post, idx) => {
//                 // return <></>
//                 return (
//                   <Post
//                     key={idx + "post"}
//                     post={post}
//                     theme={"#8c52ff"}
//                     dowloadImageCred={dowloadImageCred}
//                     postType="Shout Post"
//                   />
//                 );
//               })
//             ) : (
//               <div className="w-full md:h-[400px] h-[300px] flex justify-center items-center rounded-md bg-secondary">
//                 <article className="text-xl opacity-50">No Post Yet!</article>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <SigninRequired />
//   );
// };

// export default AtheletShout;
