import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { callAPI, downloadFile } from "../../../lib/utils";
import SharePost from "../../../core/Atoms/Feed/SharePost";
import ModelVr_O from "../../../core/Atoms/Models/ModelVr_O";
import { Skeleton } from "@mantine/core";
import { FaJoint, FaPlus, FaShare, FaUser } from "react-icons/fa";
import Image from "next/image";
import ReactQRCode from "react-qr-code";
import FlipCard from "../../../core/Atoms/Card/FlipCard";
import NotFound from "../../../core/Components/Errors/NotFound";

const Team = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { shortname } = router.query;
  const [loading, setLoading] = useState(false);
  const [teamcard, setTeamcard] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [organization, setOrganization] = useState(null);

  const [openShareModel, setOpenShareModel] = useState(false);

  async function downloadUserImages(_user, authToken, url) {
    if (_user?.cardImageNFT) {
      _user.cardDisplayImage = await downloadFile(
        `${url}/file/mvpz-nfts/${_user.cardImageNFT}`,
        authToken
      );
    }
    return _user;
  }

  const fetchTeamCard = async () => {
    setLoading(true);
    if (shortname) {
      const result = await callAPI({
        method: "GET",
        endpoint: `/api/team/card/${shortname}`,
      });

      if (!result.success) {
        setLoading(false);
        return setUserNotFound(true);
      }

      const team = await downloadUserImages(
        result.teamcard,
        result.imageDownload?.authorizationToken,
        result.imageDownload?.downloadUrl
      );

      setTeamcard(team);
      setOrganization(result.org);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchTeamCard();

    setLoading(false);
  }, [shortname]);

  const referralCode = router?.query?.referralCode;

  const handleProfile = () => {
    if (referralCode) {
      router.push(`/fanzone/tribe/${shortname}?referralCode=${referralCode}`);
    } else {
      router.push(`/fanzone/tribe/${shortname}`);
    }
  };

  const handleJoin = () => {
    if (session?.user) {
      router.push(`/fanzone/tribe/${shortname}?action=follow`);
    } else {
      localStorage.setItem(
        "redirectUrl",
        `/fanzone/tribe/${shortname}?action=follow`
      );
      if (referralCode) {
        router.push(`/auth/signin?referralCode=${referralCode}`);
      } else {
        router.push(`/auth/signin`);
      }
    }
  };

  const handleShare = () => {
    setOpenShareModel(true);
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      {userNotFound ? (
        <NotFound title="Team Not Found!" />
      ) : (
        <>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center backdrop-blur-2xl">
            {!organization ? (
              <div className="relative md:h-[550px] h-[450px] md:w-[350px] w-[300px] rounded-[30px] overflow-hidden bg-secondary">
                <div className="relative z-0 w-full h-[200px] bg-ternary">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="md:w-[250px] w-[200px] md:h-[250px] h-[200px] mx-auto rounded-full overflow-hidden border-[10px] border-secondary relative bg-secondary -mt-[75px] md:mb-10 mb-5">
                  <Skeleton className="w-full h-full" />
                </div>
                <Skeleton className="w-[100px] h-[30px] rounded-md mx-auto mb-5" />
                <Skeleton className="w-[200px] h-[20px] rounded-md mx-auto mb-2" />
                <Skeleton className="w-[200px] h-[20px] rounded-md mx-auto" />
              </div>
            ) : (
              <FlipCard
                flip={!loading}
                frontComp={() =>
                  teamcard ? (
                    <div className="relative w-full h-full overflow-hidden  flex justify-center items-center ">
                      <div className="rounded-xl w-full h-full overflow-hidden">
                        <Image
                          src={teamcard?.cardDisplayImage}
                          alt={teamcard?.name}
                          width={500}
                          height={500}
                          className="relative w-full h-full object-cover "
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-secondary">
                      <div className="relative z-0 w-full h-[200px] bg-ternary">
                        <Image
                          src={
                            organization?.tribe[0]?.tribeBanner ||
                            "/images/Future.svg"
                          }
                          alt={organization?.shortname}
                          width={500}
                          height={500}
                          className={`relative w-full h-full object-cover`}
                        />
                      </div>
                      <div className="md:w-[250px] w-[200px] md:h-[250px] h-[200px] mx-auto rounded-full overflow-hidden border-[10px] border-secondary relative bg-secondary -mt-[75px] ">
                        {organization?.tribe[0]?.tribeLogo ? (
                          <Image
                            src={organization?.tribe[0]?.tribeLogo}
                            alt={organization?.name}
                            width={500}
                            height={500}
                            className="relative w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex justify-center items-center rounded-full"
                            style={{
                              background: organization?.primaryColorHex,
                            }}
                          >
                            <article className="font-bold md:text-xl">
                              {organization?.shortName?.split(' ')[0]}
                            </article>
                          </div>
                        )}
                      </div>

                      <article className=" text-center mt-2  font-graffiti  text-primary ">
                        #Team
                      </article>

                      <article className="mt-2 text-center md:text-2xl text-base">
                        {organization?.shortName}
                      </article>

                      <article className="mt-2 text-[10px] text-center max-w-80 mb-2 px-12 mx-auto">
                        {organization?.name}
                      </article>

                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                        <Image
                          src={"/images/mvpz-logo.png"}
                          alt="mvpz"
                          width={500}
                          height={500}
                          className="relative h-[20px] object-contain"
                        />
                      </div>
                    </div>
                  )
                }
                backComp={() => (
                  <div
                    className=" relative w-full h-full rounded-[30px] flex flex-col justify-center items-center "
                    style={{
                      background: `linear-gradient(to top right, #8A2387, #E94057, #F27121)`,
                    }}
                  >
                    <ReactQRCode
                      value={
                        referralCode
                          ? `${process.env.NEXT_PUBLIC_APP_URL}/fanzone/tribe/${shortname}?referralCode=${referralCode}`
                          : `${process.env.NEXT_PUBLIC_APP_URL}/fanzone/tribe/${shortname}`
                      }
                      bgColor="transparent"
                      fgColor="#fff"
                      className="w-[225px] h-[225x]"
                    />
                    <article className="md:mt-10 mt-5 font-monumentUltraBold text-2xl -rotate-2">
                      @{organization?.shortName}
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
                  teamcard ? "md:h-[480px] h-[420px]" : "md:h-[550px] h-[500px]"
                }
                cardWidth="md:w-[350px] w-[300px]"
              />
            )}

            {organization ? (
              <>
                <div className="flex justify-center items-center mt-10 gap-10">
                  <div
                    className="flex flex-col justify-center items-center gap-1 cursor-pointer"
                    onClick={handleProfile}
                  >
                    <div className="w-[60px] h-[60px] rounded-full bg-secondary hover:bg-[#000] flex justify-center items-center mb-1">
                      <FaUser />
                    </div>
                    <article className="text-center text-xs">Profile</article>
                  </div>

                  <div
                    className="flex flex-col justify-center items-center gap-1 cursor-pointer"
                    onClick={handleJoin}
                  >
                    <div className="w-[60px] h-[60px] rounded-full bg-primary hover:brightness-125 flex justify-center items-center mb-1">
                      <FaPlus />
                    </div>
                    <article className="text-center text-xs">Join</article>
                  </div>

                  <div
                    className="flex flex-col justify-center items-center gap-1 cursor-pointer"
                    onClick={handleShare}
                  >
                    <div className="w-[60px] h-[60px] rounded-full bg-secondary hover:bg-[#000] flex justify-center items-center mb-1">
                      <FaShare />
                    </div>
                    <article className="text-center text-xs">Share</article>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center mt-10 gap-10">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <Skeleton className="w-full h-full object-cover opacity-50" />
                  </div>
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <Skeleton className="w-full h-full object-cover opacity-50" />
                  </div>
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <Skeleton className="w-full h-full object-cover opacity-50" />
                  </div>
                </div>
              </>
            )}
          </div>

          {openShareModel && (
            <ModelVr_O
              open={openShareModel}
              setHandleOpen={setOpenShareModel}
              extraClass="!z-50"
            >
              <SharePost
                pathname={`/fanzone/tribe/${shortname}${
                  referralCode ? `?referralCode=${referralCode}` : ""
                }`}
              />
            </ModelVr_O>
          )}
        </>
      )}
    </div>
  );
};

export default Team;
