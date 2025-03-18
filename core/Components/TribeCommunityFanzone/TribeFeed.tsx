// import React, { useEffect, useState } from "react";
// import Post from "../../Atoms/Feed/Post";
// import { mediaType } from "../../Atoms/Feed/PostEnum";
// import PostMessageField from "../../Atoms/Feed/PostMessageField";
// import { Loader } from "@mantine/core";
// import { useSession } from "next-auth/react";
// import UploadPostLoading from "../../Atoms/Feed/UploadPostLoading";
// import PostLoadingCard from "../../Atoms/LoadingsLayout/PostLoadingCard";
// import { callAPI } from "../../../lib/utils";
// import { useRouter } from "next/router";

// const TribeFeed = ({ tribe, session }) => {
//   const [postList, setFetchPostList] = useState([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [render, setRender] = useState<number>(0);
//   const [uploadPostLoading, setUploadPostLoading] = useState<Boolean>(false);
//   const [availableToPost, setAvailabelToPost] = useState(false);
//   const [postTribes, setPostTribes] = useState([]);
//   const [activePostTribe, setActivePostTribe] = useState([]);
//   const router = useRouter();

//   const [imageDownload, setImageDownload] = useState<any>();

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
//     let response = await callAPI({
//       endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/post/list`,
//       method: "POST",
//       body: {
//         tribeId: tribe?.id,
//       },
//     });

//     if (response) {
//       await handleFetchTribes();
//       setFetchPostList(response?.posts);
//       setImageDownload(response?.imageDownload);
//       setAvailabelToPost(response?.accessToPost);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [tribe]);

//   const handlePost = async (response) => {
//     // console.log(response); // Log the response to inspect its structure
//     if (response?.data?.post) {
//       // console.log("Received post:", response.data.post); // Log the actual post
//       // setFetchPostList((prevPostList) => {
//       //   console.log("Previous post list:", prevPostList);
//       //   const updatedList = [response.data.post, ...prevPostList]; // Add the new post at the beginning of the list
//       //   console.log("Updated post list:", updatedList); // Log the updated list
//       //   return updatedList;
//       // });

//       // fetchPosts()
//       router.reload()
//     } else {
//       console.error("Post data is missing in the response");
//     }
//   };

//   return (
//     <div className="relative w-full z-50 gap-y-10">
//       <div className="relative w-full ">
//         {availableToPost && (
//           <div className="mb-10 md:block hidden">
//             <PostMessageField
//               onClickPost={handlePost}
//               theme="#8c52ff"
//               shout={session?.user?.iduser?.role === "Athlete" ? true : false}
//               postTribeList={postTribes}
//               activePostTribe={activePostTribe}
//             />
//           </div>
//         )}
//         <div className="relative w-full gap-y-10">
//           <article className="md:text-2xl text-lg mb-10">Tribe Posts</article>
//           {uploadPostLoading ? <UploadPostLoading /> : false}

//           {loading ? (
//             Array(5)
//               ?.fill(0)
//               ?.map((_) => {
//                 return <PostLoadingCard />;
//               })
//           ) : postList?.length > 0 ? (
//             postList?.map((post, idx) => {
//               // return <></>
//               return (
//                 <Post
//                   key={idx + "post"}
//                   post={post}
//                   theme={"#8c52ff"}
//                   dowloadImageCred={imageDownload}
//                   isTribe={true}
//                   tribeId={tribe?.id}
//                   postType="Tribe Post"
//                 />
//               );
//             })
//           ) : (
//             <div className="w-full md:h-[400px] h-[300px] flex justify-center items-center rounded-md bg-secondary">
//               <article className="text-xl opacity-50">No Post Yet!</article>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TribeFeed;
