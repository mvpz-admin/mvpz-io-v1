import React, { useEffect, useState } from "react";
import TribeMediaCard from "../../Atoms/TribeCard/TribeMediaCard";
import { callAPI } from "../../../lib/utils";
import TribeMediaLoadingCard from "../../Atoms/LoadingsLayout/TribeMediaLoadingCard";

const TribeMedia = ({ tribe, session }) => {
  const [media, setMedia] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchMedia = async () => {
    setLoading(true);
    const response = await callAPI({
      endpoint: `${process.env.NEXT_PUBLIC_APP_URL}/api/fanzone/tribe/media/list/${tribe?.id}`,
    });

    if (response) {
      setMedia(response?.tribe?.media);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetchMedia();
  }, [tribe]);

  return (
    <div className="relative w-full space-y-10">
      <div className="relative py-5 ">
        <article className="md:text-2xl text-lg">Media</article>
        <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-white bg-opacity-50"></div>
      </div>
      {media?.length > 0 ? (
        <div className="flex flex-wrap  md:justify-start justify-center items-center gap-x-5 gap-y-10 bg-secondary p-5">
          {loading
            ? Array(6)
                ?.fill(0)
                ?.map((_) => {
                  return <TribeMediaLoadingCard />;
                })
            : media?.map((media) => {
                return <TribeMediaCard key={media?.id} media={media} />;
              })}
        </div>
      ) : (
        <div className="w-full md:h-[400px] h-[300px] flex justify-center items-center rounded-md bg-secondary">
          <article className="text-xl opacity-50">No Media Yet!</article>
        </div>
      )}
    </div>
  );
};

export default TribeMedia;
