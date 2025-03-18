import React from "react";
import { useState } from "react";
import ImagePreview from "./ImagePreview";
import Image from "next/image";

const MediaImageCard: React.FC<{ url: string }> = ({
    url,
  }) => (
    <Image
      src={url}
      alt="Post 01"
      width={500}
      height={500}
      className={`relative w-full h-full  object-cover z-0`}
    />
  );
  
  const MediaVideoCard: React.FC<{
    url: string;
    showControls: boolean;
  }> = ({ url, showControls }) => (
    <video
      src={url}
      width={500}
      height={500}
      controls={showControls}
      className={`relative w-full object-cover h-full`}
    />
  );

const MediaCard = ({mediaCon}) => {
  const [imagePreview, setImagePreview] = useState(false);
  const [imagePreviewURL, setImagePreviewURL] = useState({
    url: "",
    slideNo: 0,
  });

  function handleOpenPreview(previewURL) {
    setImagePreview(true);
    setImagePreviewURL(previewURL);
  }

  function handleClosePreview(){
    setImagePreview(false)
    setImagePreviewURL(null)
  }
  
  return (
   <>
    <div
      className="relative w-full h-full rounded-xl overflow-hidden bg-secondary shadow-xl brightness-90"
      key={mediaCon.id}
      onClick={() =>
        handleOpenPreview({
          url: mediaCon.url,
          slideNo: 1,
        })
      }
    >
      {mediaCon.mediaType === "image" ? (
        <MediaImageCard url={mediaCon.url}  />
      ) : (
        <MediaVideoCard
          url={mediaCon.url}
          showControls={true}
        />
      )}
    </div>
     {
      imagePreview && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-50" >
          <ImagePreview mediaCon={[mediaCon]} media={imagePreviewURL} handleClose={handleClosePreview} />
        </div>
      )
    }
   </>
  );
};

export default MediaCard;
