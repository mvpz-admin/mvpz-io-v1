export const checkIsLargeImage = async (width = 400, url) => {
  const img = new Image();
  img.src = url;
  await img.decode();
  const maxImageDimension = Math.max(img.width, img.height);
  const threshold = width * 0.5;

  return maxImageDimension >= threshold;
};

export function parseColorString(colorString) {
  // Parse the string into an array using JSON.parse
  try {
    return JSON.parse(colorString);
  } catch (error) {
    console.error("Error parsing color string:", error);
    return [];
  }
}

// export function convertTextToHTML(text) {
//   // Regex for detecting URLs
//   const urlRegex = /(https?:\/\/[^\s]+)/g;

//   // Regex for hashtags
//   const hashtagRegex = /#(\w+)/g;

//   // Replace URLs with `<a>` tags
//   const withLinks = text.replace(urlRegex, (url) =>
//     `<a href="${url}" target="_blank" class="text-primary">${url}</a>`
//   );

//   // Replace hashtags with styled `<span>` tags
//   const withHashtags = withLinks.replace(hashtagRegex, (hashtag) =>
//     `<span class="text-primary">${hashtag}</span>`
//   );

//   return withHashtags;
// }

export function convertTextToHTML(text) {
  // Regex for detecting URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Regex for hashtags
  const hashtagRegex = /#(\w+)/g;

  // Variable to store the first link found
  let firstLink = null;

  // Replace URLs with `<a>` tags
  const withLinks = text.replace(urlRegex, (url, offset) => {
    if (!firstLink) {
      firstLink = url; // Store the first link found
    }
    return `<a href="${url}" target="_blank" class="text-primary">${url}</a>`;
  });

  // Replace hashtags with styled `<span>` tags
  const withHashtags = withLinks.replace(
    hashtagRegex,
    (hashtag) => `<span class="text-primary">${hashtag}</span>`
  );

  // Return the message with hashtags and links, and the first link found
  return {
    message: withHashtags,
    link: firstLink,
  };
}

export function isValidObjectId(value: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(value);
}

// import PreviewImage from "next/image";
// import { useState, useEffect } from "react";

// interface LinkPreviewProps {
//   url: string;
// }

// const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
//   const [preview, setPreview] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchPreview = async () => {
//       try {
//         const res = await fetch(
//           `/api/getLinkPreview?url=${encodeURIComponent(url)}`
//         );
//         if (!res.ok) {
//           throw new Error("Failed to fetch preview");
//         }
//         const data = await res.json();
//         setPreview(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPreview();
//   }, [url]);

//   if (loading) return <></> ;
//   if (!preview || !preview) return <></>;

//   return (
//     <div className="flex justify-start items-center max-h-[150px] border rounded-md p-4">
//       <div className="flex-[0.4] w-full h-full ">
//         <PreviewImage
//           src={preview?.image}
//           alt={preview?.url}
//           width={500}
//           height={500}
//           className="relative w-full h-full object-cover rounded-l-md"
//         />
//       </div>
//       <div className="flex justify-start">
//         <a href={preview.url} target="_blank" rel="noopener noreferrer">
//           <h3>{preview.title}</h3>
//         </a>
//         <p>{preview.description}</p>
//       </div>
//     </div>
//   );
// };

// export default LinkPreview;

import { useState, useEffect } from "react";
import { downloadFile } from "../lib/utils";

interface LinkPreviewProps {
  url: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch(
          `/api/getLinkPreview?url=${encodeURIComponent(url)}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch preview");
        }
        const data = await res.json();
        setPreview(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [url]);

  if (loading) return <></>;
  if (!preview?.image) return <></>;

  return (
    <div className="flex justify-start items-center h-[150px] border border-white border-opacity-50 rounded-md p-4 space-x-5">
      <div className="flex-[0.3] w-full h-full  ">
        <img
          src={preview?.image}
          alt={preview?.url}
          className="relative w-full h-full object-cover rounded-l-md"
        />
      </div>
      <div className="flex-[0.7] w-full">
        <div className="flex justify-start items-center gap-1">
          <img
            src={preview?.favicon}
            alt={preview?.url}
            className="relative w-3 h-3 object-cover "
          />
          <article className="text-[10px] object-contain">
            {preview?.siteName}
          </article>
        </div>
        <a href={preview.url} target="_blank" rel="noopener noreferrer">
          <h3 className="md:text-[14px] text-[12px] text-primary mb-1">
            {preview.title?.length > 80
              ? preview.title?.substring(0, 80) + "..."
              : preview.title}{" "}
          </h3>
        </a>
        <p className="text-[10px] md:block hidden opacity-50">
          {preview.description?.length > 100
            ? preview.description?.substring(0, 100) + "..."
            : preview.description}
        </p>
      </div>
    </div>
  );
};

export default LinkPreview;


export const getImageOrientation = async (imageUrl: string): Promise<"portrait" | "landscape" | "square" | null> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      if (img.naturalWidth > img.naturalHeight) {
        resolve("landscape");
      } else if (img.naturalWidth < img.naturalHeight) {
        resolve("portrait");
      } else {
        resolve("square");
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
};

export const getMedalHexCode = (medalType: 'Base' | 'Enhance 1' | 'Enhance 2' | '1 of 1'): string => {
  const medalColors: Record<string, string> = {
      'Base': '#CD7F32',      // Bronze
      'Enhance 1': '#CD7F32', // Bronze
      'Enhance 2': '#C0C0C0', // Silver
      '1 of 1': '#FFD700'       // Gold
  };

  return medalColors[medalType] || '#fff'; // Default to black if not found
}

