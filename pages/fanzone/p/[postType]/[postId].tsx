import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import FanzoneLayout from "../../../../core/Layout/FanzoneLayout";
import { useRouter } from "next/router";
import { callAPI } from "../../../../lib/utils";
import { useAuthStore } from "../../../../store/useAuthStore";
import PostProfileBar from "../../../../core/Components/Fanzone/Post/PostProfileBar";
import PostBody from "../../../../core/Components/Fanzone/Post/PostBody";
import PostReactionsBar from "../../../../core/Components/Fanzone/Post/PostReactionsBar";
import PostCommentsBar from "../../../../core/Components/Fanzone/Post/PostCommentsBar";
import SuggestionPosts from "../../../../core/Components/Fanzone/Suggestions/SuggestionPosts";
import { useLoginProcessStore } from "../../../../store/useGlobalStore";

const Index = () => {
  const router = useRouter();
  const postType = router.query.postType;
  const postId = router.query.postId;
  const [bottomReached, setBottomReached] = useState(false);

  return (
    <FanzoneLayout>
      <div className="relative w-full min-h-screen">
        {/* bg-gradient */}
        <div className="absolute w-full h-[450px] z-0">
          <div className="absolute top-0 left-0 w-full h-full z-0 transition-all duration-500">
            <Image
              src={
                "https://res.cloudinary.com/dv667zlni/image/upload/v1740160071/5_xerhen.png"
              }
              alt="bg"
              width={500}
              height={500}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 opacity-100`}
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full z-5 bg-gradient-to-b from-transparent to-black"></div>
        </div>
        {/* bg-blur */}
        <div className="absolute top-0 left-0 w-full h-full z-5 backdrop-blur-3xl lg:px-10 md:px-5 px-2 pt-5 pb-24 md:pt-[125px] overflow-y-auto space-y-10 ">
          <div className="w-full  flex justify-center items-center   ">
            {/* left-side post details */}
            <>
              <PostDetails postId={postId} postType={postType} />
            </>
            {/* right-side other suggestions */}
            {/* <>
              <OtherSuggestions postId={postId} postType={postType} />
            </> */}
          </div>
        </div>
      </div>
    </FanzoneLayout>
  );
};

const PostDetails = ({ postType, postId }) => {
  const router = useRouter();
  const { user } = useAuthStore((state) => state);
  const [pageData, setPageData] = useState<any>();
  const [pageDataLoading, setPageDataLoading] = useState(true);
  const [commentDataLoading, setCommentDataLoading] = useState(false);
  const [pageError, setPageError] = useState(false); // TODO : Later change
  const [page, setPage] = useState(0);
  const isLoggedIn = useAuthStore((state) => state.user);

  const handleBack = () => {
    router.back();
  };

  const handleFetchPageData = async () => {
    setPageError(false);
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: `/v1/post/${postType}/${postId}`,
      });

      setPageData(response?.data);

      setPage(1);
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setPageDataLoading(false);
  };

  const handleRefetchComment = async () => {
    setPageError(false);
    setCommentDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: `/v1/post/${postType}/${postId}`,
      });

      setPageData((prev) => ({
        ...prev,
        comments: response?.data?.comments,
      }));
    } catch (error) {
      console.log({ error });
      setPageError(true);
    }
    setCommentDataLoading(false);
  };

  useEffect(() => {
    if (postId) handleFetchPageData();
  }, [postId]);

  return (
    <div className="w-full md:flex-[0.7] flex-1 h-full space-y-5 ">
      {/* back */}
      <div
        className="flex justify-start items-center gap-4 font-inter cursor-pointer"
        onClick={handleBack}
      >
        <FaArrowLeft />
        <article className="font-bold">Feed</article>
      </div>

      {/* profile */}
      <PostProfileBar pageData={pageData} pageDataLoading={pageDataLoading} />

      {/* conetent */}
      <PostBody pageData={pageData} pageDataLoading={pageDataLoading} />
      {/* Reactions */}
      {isLoggedIn?.token && <PostReactionsBar
        pageData={pageData}
        pageDataLoading={pageDataLoading}
        postType={postType}
      />}

      {/* Comments */}
      {isLoggedIn?.token && <PostCommentsBar
        pageData={pageData}
        postId={postId}
        user={user}
        handleRefetchComment={handleRefetchComment}
        commentDataLoading={commentDataLoading}
      />}

      {/* Spacer */}
      <div className="relative h-[100px]" />
    </div>
  );
};

const OtherSuggestions = ({ postType, postId }) => {
  const [pageData, setPageData] = useState<any>();
  const [pageDataLoading, setPageDataLoading] = useState(true);

  const handleFetchPageData = async () => {
    setPageDataLoading(true);
    try {
      let response = await callAPI({
        endpoint: `/v1/post/${postType}/${postId}/suggestions`,
      });

      setPageData(response?.data);
    } catch (error) {
      console.log({ error });
    }
    setPageDataLoading(false);
  };

  useEffect(() => {
    if (postId) handleFetchPageData();
  }, [postId]);
  return (
    <div className="md:sticky  md:top-0 relative w-full md:flex-[0.4] flex-1  md:h-screen md:overflow-y-auto space-y-4 scroller-hidden">
      {/* Related Posts */}
      <SuggestionPosts pageData={pageData} pageDataLoading={pageDataLoading} postType={postType}/>
    </div>
  );
};

export default Index;
