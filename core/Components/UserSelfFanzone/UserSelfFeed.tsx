// import React, { useEffect, useState } from "react";
// import Post from "../../Atoms/Feed/Post";
// import { callAPI } from "../../../lib/utils";
// import { Loader } from "@mantine/core";
// import PostLoadingCard from "../../Atoms/LoadingsLayout/PostLoadingCard";
// import PostMessageField from "../../Atoms/Feed/PostMessageField";
// import UploadPostLoading from "../../Atoms/Feed/UploadPostLoading";
// import { useSession } from "next-auth/react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { log } from "node:console";
// import { useRouter } from "next/router";

// const UserSelfFeed = () => {
//   const [fetchPostList, setFetchPostList] = useState([]);
//   const [dowloadImageCred, setDowloadImageCred] = useState();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [postTribes, setPostTribes] = useState([]);
//   const [activePostTribe, setActivePostTribe] = useState([]);
//   const router = useRouter();
//   const [uploadPostLoading, setUploadPostLoading] = useState<Boolean>(false);
//   const { data: session } = useSession();
 

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
//     try {
//       setLoading(true);
//       setFetchPostList([]);
//       let response = await callAPI({
//         endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/publicFeed`,
//       });

//       const newPosts = response?.data?.posts || [];

//       if (newPosts?.length > 0) {
//         setFetchPostList(() => [...fetchPostList, ...newPosts]);
//         setDowloadImageCred(response?.data?.imageDownload);
//       }

//       await handleFetchTribes();

//       setLoading(false);

//       return response;
//     } catch (error) {
//       setFetchPostList([]);
//       console.error(error);
//     }
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

  
//   useEffect(() => {
//     console.log('Updated post list:', fetchPostList); // Log the updated list when it changes
//   }, [fetchPostList]); // This will run whenever the fetchPostList changes
  

  
//   return (
//     <div className="relative w-full z-10">
//       {session?.user?.role !== "Athlete" && (
//         <div className="mb-10 md:block hidden">
//           <PostMessageField
//             onClickPost={handlePost}
//             theme={"#8c52ff"}
//           postTribeList={postTribes}
//           activePostTribe={activePostTribe}
//           />
//         </div>
//       )}
//       {uploadPostLoading ? (
//         <div className="mb-10">
//           <UploadPostLoading />
//         </div>
//       ) : (
//         false
//       )}

//       {fetchPostList?.map((post, idx) => {
//         return (
//           <Post
//             key={idx + "post"}
//             post={post}
//             dowloadImageCred={dowloadImageCred}
//             theme={"#8c52ff"}
//             postType="Public Post"
//           />
//         );
//       })}

//       {loading && (
//         <div className="w-full space-y-10">
//           {Array(5)
//             ?.fill(0)
//             ?.map((_) => {
//               return <PostLoadingCard />;
//             })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserSelfFeed;
