import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { downloadFile } from "../../../lib/utils";
import { Skeleton } from "@mantine/core";
import { FaUser } from "react-icons/fa";
import { log } from "node:console";

interface ImageUrl {
  authorizationToken: string;
  downloadUrl: string;
}

interface TribeAthleteCardProps {
  athlete: any;
  imageUrl: ImageUrl;
  orgColor: any;
}

const TribeAthleteCard: React.FC<TribeAthleteCardProps> = ({
  athlete,
  imageUrl,
  orgColor,
}) => {
  console.log({
    orgColor,
  });

  const router = useRouter();
  const [images, setImages] = useState<{
    profileImage: string;
    cardImage: string;
  }>({
    profileImage: "",
    cardImage: "",
  });
  const [loading, setLoading] = useState(false);

  // Helper function to download user images
  const downloadUserImages = async (
    _user: any,
    authToken: string,
    url: string
  ) => {
    setLoading(true);
    const downloadedImages: { profileImage?: string } = {};

    if (_user?.image) {
      downloadedImages.profileImage = _user.image.includes("http")
        ? _user.image
        : ((await downloadFile(
            `${url}/file/mvpz-user-private/${_user.image}`,
            authToken
          )) as string); // Assert type here
    }

    setImages((prev) => ({ ...prev, ...downloadedImages }));
    setLoading(false);
  };

  useEffect(() => {
    downloadUserImages(
      athlete,
      imageUrl.authorizationToken,
      imageUrl.downloadUrl
    );
  }, [athlete, imageUrl]);

  // Memoized component for profile image
  const profileImageComponent = useMemo(() => {
    if (loading) {
      return <Skeleton className="w-full h-full" />;
    }
    if (images.profileImage) {
      return (
        <Image
          src={images.profileImage}
          alt="tribe athlete"
          width={500}
          height={500}
          className="relative w-full h-full object-cover"
        />
      );
    }
    return <FaUser size={60} className="opacity-50" />;
  }, [loading, images.profileImage]);

  return (
    <div
      className="relative space-y-4 flex flex-col justify-center items-center"
      onClick={() =>
        router.push(`/fanzone/tribe/profile/athlete/${athlete.username}`)
      }
    >
      <div
        className="relative w-[150px] h-[200px] bg-secondary rounded-md overflow-hidden flex justify-center items-center"
        title="Athlete"
      >
        <div className="relative w-full h-full flex justify-center items-center z-0">
          {profileImageComponent}
        </div>
        {athlete?.isMascot && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-transparent to-transparent p-3">
          <article className="text-[10px] font-extrabold z-10" >
            #Mascot
          </article></div>}
    
      </div>
      <article
        className={`text-xs font-bold text-center `}
        style={{
          color: athlete?.isMascot
            ? orgColor?.organisation?.primaryColorHex
            : "#fff",
        }}
      >
        {athlete?.name?.split(" ")[0]}
        <br />
        {athlete?.name?.split(" ")[1]}
      </article>
    </div>
  );
};

export default TribeAthleteCard;
