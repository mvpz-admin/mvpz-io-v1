import React, { useEffect, useState } from "react";
import { formatNumber } from "../../../../utils/global/formating";
import { IoClose, IoFilter } from "react-icons/io5";
import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Loader } from "@mantine/core";
import LineLoadingEffect from "../../../Atoms/Loading/LineLoading";
import { callAPI } from "../../../../lib/utils";
import { useRouter } from "next/router";
import { FaAngleDown, FaEllipsisV } from "react-icons/fa";

const PostCommentsBar = ({
  commentDataLoading,
  pageData,
  user,
  postId,
  handleRefetchComment,
}) => {
  return (
    <div className="relative w-full  border border-white border-opacity-10 rounded-lg p-4 space-y-5">
      {/* header */}
      <div className="relative w-full flex justify-between items-center">
        <article className="font-inter font-bold">
          {formatNumber(pageData?._count?.comments)} Comments
        </article>
        <div className="flex justify-start items-center gap-2 opacity-50">
          <IoFilter size={20} />
          <article className="font-inter font-bold">Sort By</article>
        </div>
      </div>
      {/* editior & Comments */}
      <div className="relative w-full space-y-10">
        {/* editior */}
        <CommentEditior
          user={user}
          postId={postId}
          handleRefetchComment={handleRefetchComment}
        />
        {/* comments */}
        <div className="relative w-full ">
          {pageData?.comments?.map((comment) => {
            return (
              <CommentsBlock
                comment={comment}
                user={user}
                postId={postId}
                handleRefetchComment={handleRefetchComment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CommentEditior = ({ user, postId, handleRefetchComment }) => {
  const [content, setContent] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const [postFor, setPostFor] = useState<
    "publicpost" | "tribepost" | "shoutpost"
  >("publicpost");

  const handleSetPosFor = () => {
    switch (router.pathname) {
      case "/fanzone":
        user.role == "User"
          ? setPostFor("publicpost")
          : setPostFor("shoutpost");
        break;
      default:
        setPostFor("publicpost");
        break;
    }
  };

  useEffect(() => {
    if (router.pathname) {
      handleSetPosFor();
    }
  }, [router.pathname]);

  const handleEmojiClick = (emojiObject) => {
    setContent((prev) => `${prev}${emojiObject?.emoji}`);
  };

  const handleComment = async () => {
    setUploading(true);

    let response = await callAPI({
      endpoint: `/v1/post/${postFor}/${postId}/comment/add`,
      method: "PUT",
      body: {
        html: content,
      },
    });

    if (response?.success) {
      setContent("");
      handleRefetchComment();
    }

    setUploading(false);
  };

  return (
    <>
      <div className=" min-h-[50px] bg-secondary bg-opacity-10 border-b border-white border-opacity-10 rounded-md p-4 space-y-6">
        <div className="flex justify-start items-center gap-4">
          <div className="relative w-[55px] h-[55px] border-2 border-white border-opacity-30 rounded-full ">
            <div className="relative w-full h-full bg-secondary rounded-full">
              <Image
                src={user?.profileImage}
                alt="bg"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start ">
            <div className="flex  justify-start items-center">
              <article className="text-xs font-inter font-semibold">
                {user?.name}
              </article>
              {user?.isVerified && (
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              )}
            </div>

            <span className="text-[10px] font-inter ">{user?.username}</span>
          </div>
        </div>
        <div className="relative w-full h-full space-y-1">
          <textarea
            className="resize-none w-full outline-none border-none overflow-hidden border-b border-white border-opacity-10"
            placeholder="Add Your Comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={1}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
          <div className="relative flex justify-between items-center gap-4 border-t border-white border-opacity-10 pt-4">
            <div className="relative">
              <Image
                src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741554926/happy_rwzbtz.png`}
                alt="tip"
                width={500}
                height={500}
                className="relative w-5 h-5 cursor-pointer"
                onClick={() => setOpenEmoji(!openEmoji)}
              />
              {openEmoji && (
                <div className="absolute top-0 left-0 z-50 bg-ternary p-2 rounded-lg shadow-lg">
                  <div className="flex justify-end">
                    <button onClick={() => setOpenEmoji(false)}>
                      <IoClose className="mb-1 text-[18px]" />
                    </button>
                  </div>
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={Theme.DARK}
                  />
                </div>
              )}
            </div>
            <div
              className="px-3 py-2 rounded-full bg-primary font-inter font-semibold text-[12px] h-[35px] w-[100px] flex justify-center items-center"
              onClick={() => !uploading && handleComment()}
            >
              {!uploading ? (
                "Comment"
              ) : (
                <Loader color="white" variant="dots" size={22} />
              )}
            </div>
            {/* loading effect  */}
            {uploading && (
              <div className="absolute top-0 left-0 w-full">
                <LineLoadingEffect />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ReplyEditior = ({ comment, user, postId, handleRefetchComment }) => {
  const [content, setContent] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const [postFor, setPostFor] = useState<
    "publicpost" | "tribepost" | "shoutpost"
  >("publicpost");

  const handleSetPosFor = () => {
    switch (router.pathname) {
      case "/fanzone":
        user.role == "User"
          ? setPostFor("publicpost")
          : setPostFor("shoutpost");
        break;
      default:
        setPostFor("publicpost");
        break;
    }
  };

  useEffect(() => {
    if (router.pathname) {
      handleSetPosFor();
    }
  }, [router.pathname]);

  const handleEmojiClick = (emojiObject) => {
    setContent((prev) => `${prev}${emojiObject?.emoji}`);
  };

  const handleReply = async () => {
    setUploading(true);

    let response = await callAPI({
      endpoint: `/v1/post/${postFor}/${postId}/comment/${comment?.id}/reply`,
      method: "POST",
      body: {
        html: content,
      },
    });

    if (response?.success) {
      setContent("");
      handleRefetchComment();
    }

    setUploading(false);
  };

  return (
    <div className="flex justify-start items-center gap-2">
      <div className=" relative w-[50px] h-[50px] border-2 border-white border-opacity-30 rounded-full ">
        <div className="relative w-full h-full bg-secondary rounded-full">
          <Image
            src={user?.profileImage}
            alt="bg"
            width={500}
            height={500}
            className="relative w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-1 bg-secondary bg-opacity-10 border-b border-white border-opacity-10 rounded-md px-4 pt-4 pb-2 space-y-2 ">
        <div className="relative w-full h-full space-y-1">
          <textarea
            className="resize-none w-full outline-none border-none overflow-hidden border-b border-white border-opacity-10"
            placeholder={`Reply to ${comment?.postedBy?.username}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={1}
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />
          <div className="relative flex justify-between items-center gap-4 border-t border-white border-opacity-10 pt-2">
            <div className="relative">
              <Image
                src={`https://res.cloudinary.com/dv667zlni/image/upload/v1741554926/happy_rwzbtz.png`}
                alt="tip"
                width={500}
                height={500}
                className="relative w-5 h-5 cursor-pointer"
                onClick={() => setOpenEmoji(!openEmoji)}
              />
              {openEmoji && (
                <div className="absolute top-0 left-0 z-50 bg-ternary p-2 rounded-lg shadow-lg">
                  <div className="flex justify-end">
                    <button onClick={() => setOpenEmoji(false)}>
                      <IoClose className="mb-1 text-[18px]" />
                    </button>
                  </div>
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    theme={Theme.DARK}
                  />
                </div>
              )}
            </div>
            <div
              className="px-3 py-2 rounded-full bg-primary font-inter font-semibold text-[12px] h-[30px] w-[75px] flex justify-center items-center"
              onClick={() => !uploading && handleReply()}
            >
              {!uploading ? (
                "Reply"
              ) : (
                <Loader color="white" variant="dots" size={22} />
              )}
            </div>
            {/* loading effect  */}
            {uploading && (
              <div className="absolute top-0 left-0 w-full">
                <LineLoadingEffect />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentsBlock = ({ comment, user, postId, handleRefetchComment }) => {
  const [reply, setReply] = useState(false);
  const [showReply,setShowReply] = useState(false)
  return (
    <div className="relative w-full h-full  border-b  border-white border-opacity-10  pb-2 mb-4">
      {/* profle */}
      <div className="flex justify-between items-center mb-4 ">
        <div className="flex justify-start items-center gap-4">
          <div className="relative w-[50px] h-[50px] border-2 border-white border-opacity-30 rounded-full ">
            <div className="relative w-full h-full bg-secondary rounded-full">
              <Image
                src={comment?.postedBy?.profileImage}
                alt="bg"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start ">
            <div className="flex  justify-start items-center">
              <article className="text-xs font-inter font-semibold">
                {comment?.postedBy?.name}
              </article>
              {comment?.postedBy?.isVerified && (
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              )}
            </div>

            <span className="text-[10px] font-inter opacity-50 font-medium">
              {comment?.postedBy?.commentedOn}
            </span>
          </div>
        </div>
        <div className="relative">
          <FaEllipsisV size={14} opacity={0.8} />
        </div>
      </div>
      {/* comment */}
      <div
        className="relative w-full text-[14px] font-inter mb-2"
        dangerouslySetInnerHTML={{
          __html: comment?.comment,
        }}
      />
      {/* reply */}
      <div className="flex justify-start items-center gap-5  mb-4">
        <article
          className="text-[12px] font-inter  font-bold text-primary cursor-pointer"
          onClick={() => setReply(!reply)}
        >
          Reply
        </article>
        {comment?._count?.replies > 0 && (
          <div className="flex justify-start items-center gap-1 text-[12px] font-inter  font-bold text-white text-opacity-90 cursor-pointer">
           
            <article
            className=""
            onClick={() => setShowReply(!showReply)}
          >
           {formatNumber(comment?._count?.replies)} Replies 
          </article>
          <FaAngleDown  className={`transition-all duration-300 ${showReply ? "-rotate-180" : "rotate-0"}`}/>
          </div>
        )}
      </div>
      {/* Reply Editiors  & reply*/}
      <div className="relative w-full  space-y-4">
        {/* editior */}
        {reply && (
          <ReplyEditior
            comment={comment}
            postId={postId}
            user={user}
            handleRefetchComment={handleRefetchComment}
          />
        )}
        {/* replies */}
      {showReply &&  <div className="relative w-full">
          {
            comment?.replies?.map((reply, idx) => {
              return (
                <ReplyBlock  key={idx} reply={reply}/>
              )
            })
          }
        </div>}
      </div>
    </div>
  );
};

const ReplyBlock = ({reply}) => {
  return (
    <div className="relative w-full h-full space-y-2 border-b  border-white border-opacity-10  pb-2 mb-4 pl-2">
      {/* profle */}
      <div className="flex justify-between items-center ">
        <div className="flex justify-start items-center gap-4">
          <div className="relative w-[50px] h-[50px] border-2 border-white border-opacity-30 rounded-full ">
            <div className="relative w-full h-full bg-secondary rounded-full">
              <Image
                src={reply?.postedBy?.profileImage}
                alt="bg"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start ">
            <div className="flex  justify-start items-center">
              <article className="text-xs font-inter font-semibold">
                {reply?.postedBy?.name}
              </article>
              {reply?.postedBy?.isVerified && (
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              )}
            </div>

            {/* comment */}
      <div
        className="relative w-full text-[14px] font-inter "
        dangerouslySetInnerHTML={{
          __html: reply?.reply,
        }}
      />
          </div>
        </div>
        <div className="relative">
          <FaEllipsisV size={14} opacity={0.8} />
        </div>
      </div>
     
      
    </div>
  );
};

export default PostCommentsBar;
