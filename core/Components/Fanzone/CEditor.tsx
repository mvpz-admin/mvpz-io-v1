"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { locales } from "@blocknote/core";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultStyleSpecs,
} from "@blocknote/core";
import { useEffect, useState } from "react";
import { IoIosClose, IoMdSend } from "react-icons/io";
import { MdImage, MdVideocam } from "react-icons/md";
import { BsFillCameraVideoFill, BsFillPatchCheckFill } from "react-icons/bs";
import Image from "next/image";
import { useAuthStore } from "../../../store/useAuthStore";
import LineLoadingEffect from "../../Atoms/Loading/LineLoading";
import { useFeedStore } from "../../../store/useOtherStore";
import { useRouter } from "next/router";
import { callAPI } from "../../../lib/utils";
import { getPostThumbnail } from "../../../utils/global/global";
import { Loader } from "@mantine/core";
import SelectField from "../../Atoms/Inputs/SelectFeild";

export default function CEditor({ handleCloseModel }) {
  const { audio, file, table, codeBlock, ...rest } = defaultBlockSpecs;
  const [html, setHtml] = useState("");
  const locale = locales["en"];
  const { user } = useAuthStore((state) => state);
  const [postFor, setPostFor] = useState<
    "publicpost" | "tribepost" | "shoutpost"
  >("publicpost");
  const [athletePostTo,setAthletePostTo] = useState<"all" | "followersOnly" | "membersOnly">("membersOnly")
  const { uploading, setUploading, setPublicFeed, setTribeFeed, setShoutFeed } =
    useFeedStore((state) => state);
  const router = useRouter();
  const tribeId = router.query.tribeId as string;
   const isLoggedIn = useAuthStore((state) => state.user);
   

  const handleSetPosFor = () => {
    switch (router.pathname) {
      case "/fanzone":
        user.role == "User"
          ? setPostFor("publicpost")
          : setPostFor("shoutpost");
        break;
      case "/t/[tribeId]/community":
        
        user.role == "User"
        ? setPostFor("tribepost")
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
      if(router.pathname == "/fanzone" && user?.role == "Athlete"){
        setAthletePostTo("all")
      }else{
        setAthletePostTo("membersOnly")
      }
    }
  }, [router.pathname]);

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        // We override the empty document placeholder
        emptyDocument: "What's Happning?",
        // We override the default placeholder
        default: "What's Happning?",
        // We override the heading placeholder
        heading: "What's Happning?",
      },
    },
    schema: BlockNoteSchema.create({
      blockSpecs: {
        ...rest,
      },
      styleSpecs: {
        backgroundColor: "red !important",
        ...defaultStyleSpecs,
      },
    }),
  });

  const onChange = async () => {
    const markdown = await editor.blocksToFullHTML(editor.document);
    setHtml(markdown);
  };

  useEffect(() => {
    onChange();
  }, []);

  const handlePost = async () => {
    setUploading(true);

    let response = await callAPI({
      endpoint: `/v1/post/${postFor}/create?athletePostTo=${athletePostTo}`,
      method: "POST",
      body: {
        html,
        thumbnail: getPostThumbnail({ htmlContent: html }),
        tribeId,
      },
    });

    if (response?.success) {
      const { pathname, query } = router;
      const cleanPath = pathname.replace(/\?.*$/, ""); // Remove queries
      router.replace(cleanPath, undefined, { shallow: true });
    }

    setUploading(false);
    handleCloseModel();
  };

  return (
    <div
      className={`relative md:w-[700px] w-full md:h-auto h-screen md:rounded-xl  backdrop-blur-xl bg-black bg-opacity-80 border border-white border-opacity-10 flex flex-col bg-ternary overflow-hidden`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center gap-2 p-5">
        {/* left */}
        <div className="flex justify-start items-center gap-2 ">
          <div className="relative w-[55px] h-[55px] border-2 border-white border-opacity-30 rounded-full p-[2px]">
            <div className="relative w-full h-full bg-secondary rounded-full">
              <Image
                src={user?.profileImage || ""}
                alt="bg"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start ">
            <div className="flex  justify-start items-center">
              <article className="text-sm font-inter font-semibold">
                {user?.name}
              </article>
              {user?.isVerified && (
                <BsFillPatchCheckFill
                  size={12}
                  className="text-indigo-500 ml-1"
                />
              )}
            </div>
            <span className="text-[10px] font-inter">{tribeId || "Public Feed"}</span>
          </div>
        </div>
        {/* right */}
        <div className="relative w-10 h-10 flex justify-center items-center bg-black bg-opacity-10 cursor-pointer border border-white border-opacity-10 rounded-full">
          {<IoIosClose size={30} onClick={handleCloseModel} />}
        </div>
      </div>
      <div className="w-full flex-1 ">
        <BlockNoteView
          editor={editor}
          tableHandles={false}
          onChange={onChange}
          className="font-inter text-[14px] md:h-[400px] w-full overflow-y-auto flex-1 h-auto "
        />
      </div>
      <div className="relative w-full border-t border-white border-opacity-10 py-3 px-4 flex justify-between items-center">
        <div className="flex justify-center items-start gap-2">
          <MdImage size={20} />
          <BsFillCameraVideoFill size={20} />
        </div>
        {/* right */}

       <div className="flex justify-end items-center gap-2">
       {isLoggedIn?.role === "Athlete" && <div className="w-[200px]">
        <SelectField  options={[
          {
            id : "membersOnly",
            label : "Members Only"
          },
          // {
          //   id : "followersOnly",
          //   label : "Followers Only"
          // },
          {
            id : "all",
            label : "ALL"
          }
        ]} onChange={(id) => setAthletePostTo(id)}>
      

        </SelectField>
        </div>}
       <div
          className="px-4 py-2 flex justify-center items-center gap-1 bg-primary rounded-full font-inter text-[14px] font-semibold h-[40px] w-[80px]"
          onClick={() => !uploading && handlePost()}
        >
          {!uploading ? (
            <>
              <article>Post</article>
              <IoMdSend />
            </>
          ) : (
            <Loader color="white" variant="dots" size={22} />
          )}
        </div>
       </div>
      </div>
      {/* loading effect  */}
      {uploading && (
        <div className="absolute top-0 left-0 w-full">
          <LineLoadingEffect />
        </div>
      )}
    </div>
  );
}
