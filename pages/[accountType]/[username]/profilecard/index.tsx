import React, { useEffect, useState } from "react";
import FlipCard from "../../../../core/Atoms/Card/FlipCard";
import Image from "next/image";
import ReactQRCode from "react-qr-code";
import { callAPI } from "../../../../lib/utils";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import Skeleton from "../../../../core/Atoms/Others/Skeleton";
import { formatNumber } from "../../../../utils/global/formating";
import { BsFillPatchCheckFill } from "react-icons/bs";

const Index = () => {
  let router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  let username = router.query.username;

  const handleFetchProfileData = async ({ username }) => {
    setLoading(true);
    let response = await callAPI({
      endpoint: `/v1/profiles/user/${username}`,
    });

    if (response.success) {
      setUser(response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (username) {
      handleFetchProfileData({ username });
    }
  }, [username]);
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <FlipCard
        flip={!loading}
        frontComp={() => (
          <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-secondary">
            <div className="relative z-0 w-full h-[200px] bg-ternary">
              <Image
                src={user?.bannerImage || "/images/Future.svg"}
                alt={user?.name}
                width={500}
                height={500}
                className={`relative w-full h-full object-cover ${
                  !user?.bannerDisplayImage && "brightness-75"
                }`}
              />
            </div>
            <div className="md:w-[250px] w-[200px] md:h-[250px] h-[200px] mx-auto rounded-full overflow-hidden border-[10px] border-secondary relative  -mt-[75px] flex justify-center items-center bg-ternary  ">
              {user?.profileImage ? (
                <Image
                  src={user?.profileImage}
                  alt={user?.name}
                  width={500}
                  height={500}
                  className="relative w-full h-full object-cover"
                />
              ) : (
                <FaUser size={100} className="opacity-50" />
              )}
            </div>

            <article className=" text-center mt-2  font-graffiti  text-primary ">
              {user?.role == "User" ? "#SportsFan" : "#Athlete"}
            </article>

            <div className="flex flex-col justify-center items-center mt-4  space-y-1">
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[100px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <span className="text-[14px] font-inter">{user?.username}</span>
              )}
              {loading ? (
                <Skeleton
                  className={`bg-secondary w-[250px] h-[18px] rounded-md mb-1`}
                />
              ) : (
                <div className="flex  justify-start items-center">
                  <article className="text-2xl font-inter font-semibold">
                    {user?.name}
                  </article>
                  {user?.isVerified && (
                    <BsFillPatchCheckFill
                      size={18}
                      className="text-indigo-500 ml-1"
                    />
                  )}
                </div>
              )}
              <div className="flex justify-start items-center gap-4 font-inter text-[12px] font-bold">
                {loading ? (
                  <Skeleton
                    className={`bg-secondary w-[50px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex justify-start gap-2">
                    <span>{formatNumber(user?._count?.followers)}</span>
                    <span className="font-semibold opacity-50">Followers</span>
                  </div>
                )}
                {loading ? (
                  <Skeleton
                    className={`bg-secondary  w-[50px] h-[18px] rounded-md mb-1`}
                  />
                ) : (
                  <div className="flex justify-start gap-2">
                    <span>{formatNumber(user?._count?.following)}</span>
                    <span className="font-semibold opacity-50">Following</span>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute top-5 left-5 ">
              <Image
                src={"/images/logos/logo-transparent.png"}
                alt="mvpz"
                width={500}
                height={500}
                className="relative h-[20px] object-contain"
              />
            </div>
          </div>
        )}
        backComp={() => (
          <div
            className=" relative w-full h-full rounded-[30px] flex flex-col justify-center items-center "
            style={{
              background: `linear-gradient(to top right, #8A2387, #E94057, #F27121)`,
            }}
          >
            <ReactQRCode
              value={`${process.env.NEXT_PUBLIC_APP_URL}/${
                user?.role === "User" ? "p" : "a"
              }/${user?.username}`}
              bgColor="transparent"
              fgColor="#fff"
              className="w-[225px] h-[225x]"
            />
            <article className="md:mt-10 mt-5 font-monumentUltraBold text-2xl -rotate-2">
              {user?.username}
            </article>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <Image
                src={"/images/mvpz-logo-purple.png"}
                alt="mvpz"
                width={500}
                height={500}
                className="relative w-[80px] object-contain"
              />
            </div>
          </div>
        )}
        cardHeight={
          user?.athleteCard
            ? "md:h-[480px] h-[420px]"
            : "md:h-[550px] h-[500px]"
        }
        cardWidth="md:w-[350px] w-[300px]"
      />
    </div>
  );
};

export default Index;
