// import React, { useEffect, useState } from "react";
// import Post from "../../Atoms/Feed/Post";
// import { mediaType } from "../../Atoms/Feed/PostEnum";
// import PostMessageField from "../../Atoms/Feed/PostMessageField";
// import { callAPI } from "../../../lib/utils";
// import { Loader } from "@mantine/core";
// import { useSession } from "next-auth/react";
// import UploadPostLoading from "../../Atoms/Feed/UploadPostLoading";
// import PostLoadingCard from "../../Atoms/LoadingsLayout/PostLoadingCard";
// import { useRouter } from "next/router";

// const UserProfileFeed: React.FC<{ view?: string; user?: any }> = ({
//   view,
//   user,
// }) => {
//   const [postList, setFetchPostList] = useState<[]>([]);
//   const [dowloadImageCred, setDowloadImageCred] = useState();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [render, setRender] = useState<number>(0);
//   const [uploadPostLoading, setUploadPostLoading] = useState<Boolean>(false);
//   const { data: session } = useSession();
//   const [postTribes, setPostTribes] = useState([]);
//   const [activePostTribe, setActivePostTribe] = useState([]);
//   const router = useRouter();

//   const handleFetchTribes = async () => {
//       const activeTribePage =
//         router?.pathname === "/fanzone/tribe/community/[name]"
//           ? router?.query?.name
//           : null;
  
//       const response = await callAPI({
//         endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/myTribes`,
//         method: "POST",
//         body: {
//           activeTribePage,
//         },
//       });
  
//       if (response?.success) {
//         setPostTribes(response?.data?.tribes);
//         setActivePostTribe(response?.data?.activeTribe);
//       }
//     };

//   const fetchPosts = async () => {
//     if (session?.user?.id) {
//       try {
//         setLoading(true);
//         let post = await callAPI({
//           endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/user/post/${
//             user ? user?.id : session?.user?.id
//           }`,
//         });
//         await handleFetchTribes();
//         setFetchPostList(post?.posts);
//         setDowloadImageCred(post?.imageDownload);
//         setLoading(false);
//       } catch (error) {
//         setFetchPostList([]);
//         console.error(error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [session?.user?.id]);


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


//   return (
//     <div className="relative w-full ">
//       {view !== "user" && (
//         <div className="md:block hidden mb-10">
//           <PostMessageField
//             onClickPost={handlePost}
//             theme="#8c52ff"
//             postTribeList={postTribes}
//             activePostTribe={activePostTribe}
//           />
//         </div>
//       )}

//       <div className="relative w-full gap-y-10">
//         <div className="mb-10">
//           {view !== "user" ? (
//             <article className="md:text-2xl text-lg py-5">My Posts</article>
//           ) : (
//             <div className="relative py-5 ">
//               <article className="md:text-2xl text-lg">Posts</article>
//               <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
//             </div>
//           )}
//           {uploadPostLoading ? <UploadPostLoading /> : false}
//         </div>

//         {loading ? (
//           Array(10)
//             ?.fill(0)
//             ?.map((_) => {
//               return <PostLoadingCard />;
//             })
//         ) : postList?.length > 0 ? (
//           postList?.map((post, idx) => {
//             return (
//               <Post
//                 key={idx + "post"}
//                 post={post}
//                 dowloadImageCred={dowloadImageCred}
//                 theme={"#8c52ff"}
//                 postType="Public Post"
//               />
//             );
//           })
//         ) : (
//           <div className="flex justify-center items-center w-full md:h-[400px] h-[300px] bg-secondary rounded-md my-5">
//             <article className="text-xl opacity-50">No Post Yet!</article>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfileFeed;
